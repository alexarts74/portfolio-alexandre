"use client";

/**
 * WebGL engine of the projects ribbon (home page).
 *
 * One 16:10 card per project, laid on a strip that is wound around a horizontal
 * axis: the strip is tilted, then wrapped on a thin cylinder, so the cards spiral
 * across the screen like a twisted ribbon. Scroll progress moves the cards along
 * the strip; scroll speed bends it. Hovering a card peels it off the ribbon and
 * flattens it, enlarged, in front of the camera.
 *
 * Plain class, no React: the component drives it (progress, visibility) and reads
 * back the active / focused card through callbacks. Loaded with a dynamic import so
 * three.js stays out of the main bundle.
 */
import {
  Color,
  DoubleSide,
  MathUtils,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  TextureLoader,
  Vector2,
  Vector4,
  WebGLRenderTarget,
  WebGLRenderer,
  type Texture,
} from "three";
import { gsap } from "@/app/lib/gsap";

const CARD_RATIO = 1.6;
/** Corner radius, as a fraction of the card height. */
const CORNER = 0.03;
/** Device pixels budget for the canvas (keeps 4K / high-dpr screens affordable). */
const MAX_PIXELS = 8_000_000;

interface Params {
  /** Card height, as a fraction of the stage height. */
  cardHeight: number;
  /** Max card width, as a fraction of the stage width. */
  maxWidth: number;
  /** Space between cards, as a fraction of the card width. */
  gap: number;
  /** Tilt of the strip around the cylinder (degrees). */
  tilt: number;
  /** Curvature: angle covered by one card height on the cylinder (degrees). */
  arc: number;
  fov: number;
  /** Idle ripple amplitude (px for a 300px card). */
  wave: number;
  /** How much the strip bends with scroll speed. */
  bend: number;
  /** Brightness of the cards' back face. */
  back: number;
  /** Lerp factor (per 60fps frame) of the strip towards the scroll position. */
  follow: number;
  hoverScale: number;
  /** Peel effect: the flattening sweeps across the card instead of moving it as a block. */
  peel: number;
  /** Brightness of the other cards while one is hovered. */
  dim: number;
  /** Above this speed (cards / s), hovering is ignored. */
  hoverSpeed: number;
}

const DESKTOP: Params = {
  cardHeight: 0.27,
  maxWidth: 0.42,
  gap: 0.18,
  tilt: 30,
  arc: 60,
  fov: 35,
  wave: 14,
  bend: 1.2,
  back: 0.2,
  follow: 0.1,
  hoverScale: 1.55,
  peel: 0.5,
  dim: 0.35,
  hoverSpeed: 2,
};

const MOBILE: Params = {
  ...DESKTOP,
  cardHeight: 0.22,
  maxWidth: 0.62,
  tilt: 26,
  arc: 60,
  fov: 40,
};

const vertexShader = /* glsl */ `
  uniform float uOffset;
  uniform float uStep;
  uniform float uTilt;
  uniform float uRadius;
  uniform float uHeight;
  uniform float uTime;
  uniform float uVelocity;
  uniform float uWave;
  uniform float uBend;
  uniform float uHover;
  uniform float uFocusX;
  uniform float uPeel;
  uniform float uPick;
  uniform vec2 uFlat;
  uniform vec4 uCover;

  varying vec2 vUv;
  varying vec2 vRaw;
  varying float vHover;
  varying float vShade;

  void main() {
    vRaw = uv;
    vUv = uv * uCover.xy + uCover.zw;

    // Position along the strip; top and bottom edges lag behind when it moves fast
    float edge = position.y / uHeight;
    float along = uOffset * uStep + position.x;
    along += uVelocity * uBend * uStep * edge * edge * 0.24;

    // Tilt the strip, then wind it around the horizontal axis
    float c = cos(uTilt);
    float s = sin(uTilt);
    float axial = along * c - position.y * s;
    float around = along * s + position.y * c;

    float ripple = sin(along / uStep * 1.7 + uTime * 0.9) * 0.6 + sin(edge * 5.0 - uTime * 0.7) * 0.4;
    float radius = uRadius + ripple * uWave + abs(uVelocity) * uBend * uRadius * 0.03;
    float angle = around / uRadius;
    vec3 ribbon = vec3(axial, sin(angle) * radius, cos(angle) * radius);

    // Hovered: peel off the ribbon into a flat, enlarged card facing the camera
    float hover = clamp(uHover * (1.0 + uPeel) - uv.x * uPeel, 0.0, 1.0) * (1.0 - uPick);
    hover = hover * hover * (3.0 - 2.0 * hover);
    vec3 flatPos = vec3(uFocusX + position.x * uFlat.x, position.y * uFlat.x, uFlat.y);

    vHover = hover;
    vShade = mix(0.5, 1.0, cos(angle) * 0.5 + 0.5);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(mix(ribbon, flatPos, hover), 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D map;
  uniform float uLoaded;
  uniform vec3 uBlank;
  uniform float uBack;
  uniform float uDim;
  uniform float uPick;
  uniform float uId;

  varying vec2 vUv;
  varying vec2 vRaw;
  varying float vHover;
  varying float vShade;

  void main() {
    // Rounded corners, in card space (width ${CARD_RATIO}, height 1)
    vec2 size = vec2(${(CARD_RATIO / 2).toFixed(3)}, 0.5);
    vec2 q = abs(vRaw - 0.5) * size * 2.0 - size + ${CORNER.toFixed(3)};
    if (length(max(q, 0.0)) > ${CORNER.toFixed(3)}) discard;

    // Picking pass: write the card id, nothing else
    if (uPick > 0.5) {
      gl_FragColor = vec4(uId, 0.0, 0.0, 1.0);
      return;
    }

    vec3 color = mix(uBlank, texture2D(map, vUv).rgb, uLoaded);
    float light = mix(vShade, 1.0, vHover);
    if (!gl_FrontFacing) light *= mix(uBack, 1.0, vHover);
    light *= mix(uDim, 1.0, vHover);

    gl_FragColor = vec4(color * light, 1.0);
    #include <colorspace_fragment>
  }
`;

export interface FocusFrame {
  index: number;
  /** Rectangle of the flattened card, in px relative to the stage. */
  x: number;
  y: number;
  width: number;
  height: number;
  /** Corner radius, px. */
  radius: number;
  /** 0 → 1 while the card flattens. */
  progress: number;
}

export interface RibbonOptions {
  /** Element the canvas is appended to; its size is the stage size. */
  container: HTMLElement;
  /** Element whose pointer moves drive the hover (defaults to `container`). */
  eventTarget?: HTMLElement;
  /** One image per card. */
  images: string[];
  /** Scroll length of one card and the pause after the last one, in screens. */
  scrollStep: number;
  scrollHold: number;
  onActive?: (index: number, direction: 1 | -1) => void;
  /** Called every frame while a card is focused, then once with null. */
  onFocusFrame?: (frame: FocusFrame | null) => void;
}

type CardMaterial = ShaderMaterial & {
  uniforms: {
    uOffset: { value: number };
    uHover: { value: number };
    uFocusX: { value: number };
    uCover: { value: Vector4 };
    uLoaded: { value: number };
    map: { value: Texture | null };
  };
};

interface Card {
  mesh: Mesh<PlaneGeometry, CardMaterial>;
  hover: { value: number };
  texture: Texture | null;
}

interface FocusBox {
  /** Centre of the flattened card, px from the stage centre. */
  x: number;
  /** Where the card sits on the ribbon, px from the stage centre. */
  slot: number;
  halfW: number;
  halfH: number;
}

export class Ribbon {
  private readonly opts: RibbonOptions;
  private readonly renderer: WebGLRenderer;
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(DESKTOP.fov, 1, 1, 10_000);
  private readonly pickTarget = new WebGLRenderTarget(1, 1);
  private readonly pickBuffer = new Uint8Array(4);
  private readonly resizeObserver: ResizeObserver;
  private readonly hoverEnabled: boolean;

  private readonly shared = {
    uStep: { value: 1 },
    uTilt: { value: 0 },
    uRadius: { value: 1 },
    uHeight: { value: 1 },
    uTime: { value: 0 },
    uVelocity: { value: 0 },
    uWave: { value: 0 },
    uBend: { value: 0 },
    uBack: { value: 0.2 },
    uFlat: { value: new Vector2(1, 0) },
    uPeel: { value: 0.5 },
    uPick: { value: 0 },
    uDim: { value: 1 },
  };

  private params: Params = DESKTOP;
  private geometry: PlaneGeometry | null = null;
  private cards: Card[] = [];
  private metrics = { width: 1, height: 1, cardW: 1, cardH: 1, radius: 1, distance: 1, depth: 1, scale: 1 };

  private progress = 0;
  private position = 0;
  private target = 0;
  private active = -1;
  private focus = -1;
  private focusBox: FocusBox | null = null;
  private focusEmitted = false;

  private pointer = { clientX: 0, clientY: 0, x: 0, y: 0, present: false, inside: false, moved: false };
  private lastPickPosition = 0;
  private picking = false;
  private pickId = 0;

  private running = false;
  private lastTime = 0;
  private texturesRequested = false;
  private destroyed = false;

  constructor(opts: RibbonOptions) {
    this.opts = opts;

    // Throws when WebGL is unavailable: the caller falls back to the static grid
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.setClearColor(0x000000, 0);
    const canvas = this.renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    opts.container.appendChild(canvas);

    this.hoverEnabled = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    this.createCards();
    this.layout();

    this.resizeObserver = new ResizeObserver(() => {
      if (this.destroyed) return;
      this.setFocus(-1);
      this.layout();
      if (!this.running) this.render();
    });
    this.resizeObserver.observe(opts.container);

    if (this.hoverEnabled) {
      const target = opts.eventTarget ?? opts.container;
      target.addEventListener("pointermove", this.onPointerMove);
      target.addEventListener("pointerleave", this.onPointerLeave);
    }
  }

  // ---------------------------------------------------------------- public API

  /** Scroll progress of the section, 0 → 1. */
  setProgress(progress: number) {
    this.progress = progress;
  }

  /** Starts / stops the render loop (only run while the section is on screen). */
  setRunning(running: boolean) {
    if (running === this.running || this.destroyed) return;
    this.running = running;
    if (running) {
      this.lastTime = gsap.ticker.time;
      gsap.ticker.add(this.tick);
    } else {
      gsap.ticker.remove(this.tick);
      this.setFocus(-1);
    }
  }

  loadTextures() {
    if (this.texturesRequested || this.destroyed) return;
    this.texturesRequested = true;

    const loader = new TextureLoader();
    const anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy());
    this.opts.images.forEach((src, i) => {
      loader.load(src, (texture) => {
        const card = this.cards[i];
        if (this.destroyed || !card) {
          texture.dispose();
          return;
        }
        texture.colorSpace = SRGBColorSpace;
        texture.anisotropy = anisotropy;
        card.texture = texture;

        const image = texture.image as { width: number; height: number };
        const u = card.mesh.material.uniforms;
        const r = image.width / image.height / CARD_RATIO;
        // Cover-fit the image in the card
        if (r > 1) u.uCover.value.set(1 / r, 1, (1 - 1 / r) / 2, 0);
        else u.uCover.value.set(1, r, 0, (1 - r) / 2);
        u.map.value = texture;
        this.renderer.initTexture(texture);
        gsap.to(u.uLoaded, { value: 1, duration: 0.5, ease: "power1.inOut" });
      });
    });
  }

  /** Card under a viewport point (touch taps), or null. */
  async pickAt(clientX: number, clientY: number): Promise<number | null> {
    const rect = this.opts.container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return null;
    return this.readPick(x, y);
  }

  destroy() {
    if (this.destroyed) return;
    this.setRunning(false);
    this.destroyed = true;

    gsap.killTweensOf([this.shared.uDim, ...this.cards.flatMap((c) => [c.hover, c.mesh.material.uniforms.uLoaded])]);
    this.resizeObserver.disconnect();
    const target = this.opts.eventTarget ?? this.opts.container;
    target.removeEventListener("pointermove", this.onPointerMove);
    target.removeEventListener("pointerleave", this.onPointerLeave);

    this.cards.forEach(({ mesh, texture }) => {
      texture?.dispose();
      mesh.material.dispose();
    });
    this.geometry?.dispose();
    this.pickTarget.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement.remove();
    this.cards = [];
  }

  // ---------------------------------------------------------------- setup

  private createCards() {
    const blank = new Color("#1d1d20");
    // Placeholder until layout() builds the real one
    const geometry = (this.geometry = new PlaneGeometry(1, 1));
    this.opts.images.forEach((_, i) => {
      const hover = { value: 0 };
      const material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        side: DoubleSide,
        uniforms: {
          ...this.shared,
          uOffset: { value: i },
          uHover: hover,
          uFocusX: { value: 0 },
          uCover: { value: new Vector4(1, 1, 0, 0) },
          uLoaded: { value: 0 },
          uBlank: { value: blank },
          uId: { value: (i + 1) / 255 },
          map: { value: null },
        },
      }) as CardMaterial;
      const mesh = new Mesh(geometry, material);
      mesh.frustumCulled = false;
      this.scene.add(mesh);
      this.cards.push({ mesh, hover, texture: null });
    });
  }

  private layout() {
    const { container } = this.opts;
    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    const p = (this.params = width < 768 ? MOBILE : DESKTOP);

    const cardH = Math.min(height * p.cardHeight, (width * p.maxWidth) / CARD_RATIO);
    const cardW = cardH * CARD_RATIO;
    const radius = cardH / MathUtils.degToRad(p.arc);
    const distance = height / 2 / Math.tan(MathUtils.degToRad(p.fov / 2));
    const wave = p.wave * (cardH / 300);
    // The flattened card floats just in front of the ribbon; `depth` compensates the
    // perspective so it appears exactly `scale` times bigger, centred where we want.
    const zFlat = Math.min(radius + wave + 0.05 * cardH, 0.6 * distance);
    const depth = (distance - zFlat) / distance;
    const scale = Math.min(p.hoverScale, (0.9 * width) / cardW, (0.8 * height) / cardH);
    this.metrics = { width, height, cardW, cardH, radius, distance, depth, scale };

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2, Math.sqrt(MAX_PIXELS / (width * height))));
    this.renderer.setSize(width, height, false);

    this.camera.fov = p.fov;
    this.camera.aspect = width / height;
    this.camera.position.set(0, 0, distance);
    this.camera.far = distance + radius * 4 + 1000;
    this.camera.updateProjectionMatrix();

    const s = this.shared;
    s.uStep.value = cardW * (1 + p.gap);
    s.uTilt.value = MathUtils.degToRad(p.tilt);
    s.uRadius.value = radius;
    s.uHeight.value = cardH;
    s.uWave.value = wave;
    s.uBend.value = p.bend;
    s.uBack.value = p.back;
    s.uFlat.value.set(scale * depth, zFlat);
    s.uPeel.value = p.peel;

    this.geometry?.dispose();
    this.geometry = new PlaneGeometry(cardW, cardH, 32, 12);
    this.cards.forEach(({ mesh }) => (mesh.geometry = this.geometry!));

    this.emitActive(Math.max(this.active, 0), 1, true);
  }

  // ---------------------------------------------------------------- loop

  private tick = (time: number) => {
    const dt = Math.min(time - this.lastTime, 0.1);
    this.lastTime = time;

    const free = this.getFree();
    const rounded = Math.round(free);
    if (rounded !== this.target) {
      const direction = rounded > this.target ? 1 : -1;
      this.target = rounded;
      if (this.focus < 0) this.emitActive(rounded, direction);
    }

    const previous = this.position;
    this.position += (free - this.position) * (1 - Math.pow(1 - this.params.follow, 60 * dt));
    const velocity = dt > 0 ? (this.position - previous) / dt : 0;
    this.shared.uVelocity.value += 0.12 * (velocity - this.shared.uVelocity.value);
    this.shared.uTime.value += dt;

    this.updateFocus();
    this.cards.forEach(({ mesh }, i) => (mesh.material.uniforms.uOffset.value = i - this.position));
    this.emitFocusFrame();
    this.render();
  };

  private render() {
    this.renderer.render(this.scene, this.camera);
  }

  /** Scroll progress → position on the strip (in cards), with a pause at the end. */
  private getFree() {
    const last = this.cards.length - 1;
    const { scrollStep, scrollHold } = this.opts;
    const total = last * scrollStep;
    return total > 0 ? Math.min((this.progress * (total + scrollHold)) / total, 1) * last : 0;
  }

  private emitActive(index: number, direction: 1 | -1, force = false) {
    if (index === this.active && !force) return;
    this.active = index;
    this.opts.onActive?.(index, direction);
  }

  // ---------------------------------------------------------------- hover

  private onPointerMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    this.pointer.clientX = e.clientX;
    this.pointer.clientY = e.clientY;
    this.pointer.present = true;
    this.pointer.moved = true;
  };

  private onPointerLeave = () => {
    this.pointer.present = false;
  };

  private locatePointer() {
    const pt = this.pointer;
    if (!pt.present) {
      pt.inside = false;
      return;
    }
    const rect = this.opts.container.getBoundingClientRect();
    pt.x = pt.clientX - rect.left;
    pt.y = pt.clientY - rect.top;
    pt.inside = pt.x >= 0 && pt.y >= 0 && pt.x <= rect.width && pt.y <= rect.height;
  }

  /** Where card `index` sits on screen, and the box it occupies once flattened. */
  private getFocusBox(index: number): FocusBox {
    const { width, cardW, cardH, radius, distance, scale } = this.metrics;
    const tilt = this.shared.uTilt.value;
    const along = (index - this.position) * this.shared.uStep.value;
    const z = Math.cos((along * Math.sin(tilt)) / radius) * radius;
    const slot = (along * Math.cos(tilt) * distance) / (distance - z);
    const halfW = (cardW * scale) / 2;
    const halfH = (cardH * scale) / 2;
    const limit = Math.max(width / 2 - halfW - 16, 0);
    return { x: MathUtils.clamp(slot, -limit, limit), slot, halfW, halfH };
  }

  private updateFocus() {
    if (!this.hoverEnabled) return;
    this.locatePointer();
    const pt = this.pointer;
    const speed = Math.abs(this.shared.uVelocity.value);

    if (!pt.inside || speed > this.params.hoverSpeed) {
      pt.moved = false;
      this.pickId++;
      this.setFocus(-1);
      return;
    }

    if (this.focus >= 0) this.followFocus();
    const box = this.focus >= 0 ? this.focusBox : null;
    if (box && Math.abs(box.slot) > this.metrics.width / 2 + box.halfW) {
      this.setFocus(-1);
      return;
    }

    const scrolled = Math.abs(this.position - this.lastPickPosition) > 0.002;
    if (this.picking || (!pt.moved && !scrolled)) return;
    pt.moved = false;
    this.lastPickPosition = this.position;

    const px = pt.x - this.metrics.width / 2;
    const py = pt.y - this.metrics.height / 2;
    const insideBox = !!box && Math.abs(px - box.x) < box.halfW && Math.abs(py) < box.halfH;
    if (insideBox) return;

    const id = ++this.pickId;
    this.picking = true;
    this.readPick(pt.x, pt.y)
      .then((index) => {
        if (this.destroyed || id !== this.pickId) return;
        this.setFocus(index ?? -1);
      })
      .catch(() => {})
      .finally(() => {
        this.picking = false;
      });
  }

  private followFocus() {
    const box = this.getFocusBox(this.focus);
    this.focusBox = box;
    this.cards[this.focus].mesh.material.uniforms.uFocusX.value = box.x * this.metrics.depth;
  }

  private setFocus(index: number) {
    if (index === this.focus) return;
    const { dim } = this.params;
    const previous = this.cards[this.focus];
    const next = this.cards[index];
    this.focus = next ? index : -1;

    if (previous) gsap.to(previous.hover, { value: 0, duration: 0.6, ease: "power2.out", overwrite: true });
    if (next) {
      this.followFocus();
      gsap.to(next.hover, { value: 1, duration: 0.6, ease: "power3.out", overwrite: true });
    }
    gsap.to(this.shared.uDim, { value: next ? dim : 1, duration: 0.6, ease: "power1.inOut", overwrite: true });

    const shown = next ? index : this.target;
    this.emitActive(shown, shown < this.active ? -1 : 1);
  }

  private emitFocusFrame() {
    const { onFocusFrame } = this.opts;
    if (!onFocusFrame) return;
    if (this.focus < 0 || !this.focusBox) {
      if (this.focusEmitted) onFocusFrame(null);
      this.focusEmitted = false;
      return;
    }
    const { width, height } = this.metrics;
    const box = this.focusBox;
    onFocusFrame({
      index: this.focus,
      x: width / 2 + box.x - box.halfW,
      y: height / 2 - box.halfH,
      width: box.halfW * 2,
      height: box.halfH * 2,
      radius: box.halfH * 2 * CORNER,
      progress: this.cards[this.focus].hover.value,
    });
    this.focusEmitted = true;
  }

  /** GPU picking: renders card ids into a 1×1 target under (x, y). */
  private async readPick(x: number, y: number): Promise<number | null> {
    const { width, height } = this.metrics;
    this.shared.uPick.value = 1;
    this.camera.setViewOffset(width, height, x, y, 1, 1);
    this.renderer.setRenderTarget(this.pickTarget);
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);
    this.camera.clearViewOffset();
    this.shared.uPick.value = 0;

    const buffer = this.pickBuffer;
    await this.renderer.readRenderTargetPixelsAsync(this.pickTarget, 0, 0, 1, 1, buffer);
    if (this.destroyed || buffer[3] === 0) return null;
    const index = buffer[0] - 1;
    return index >= 0 && index < this.cards.length ? index : null;
  }
}
