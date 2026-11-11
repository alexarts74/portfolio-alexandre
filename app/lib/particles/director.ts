// Particle director — inspired by stamen/director.ts.
// Scroll position is the master clock: playhead = scrollY + vh*0.5.
// All zone parameters blend proportionally to where the viewport center sits
// between section midpoints — scroll backward = animation goes backward.

import * as THREE from 'three'
import { lerp, clamp, smoother, mulberry32 } from './util'

// ─── Zone definitions ────────────────────────────────────────────────────────

interface ZoneParams {
  opacity: number       // particle + line opacity
  connectionDist: number // NDC units; 0.22 = dense network, 0.01 = none
  driftSpeed: number    // velocity multiplier
  pointSize: number     // base point size (CSS px)
}

// Dramatic contrast between sections makes scroll transitions obvious
const ZONES: Record<string, ZoneParams> = {
  hero:            { opacity: 0.72, connectionDist: 0.14, driftSpeed: 0.25, pointSize: 4.0 },
  presentation:    { opacity: 0.00, connectionDist: 0.00, driftSpeed: 0.05, pointSize: 1.8 },
  featuredproject: { opacity: 0.00, connectionDist: 0.00, driftSpeed: 0.05, pointSize: 1.8 },
  projectsgrid:    { opacity: 0.00, connectionDist: 0.00, driftSpeed: 0.05, pointSize: 1.8 },
  skills:          { opacity: 0.00, connectionDist: 0.00, driftSpeed: 0.05, pointSize: 1.8 },
  footer:          { opacity: 0.00, connectionDist: 0.00, driftSpeed: 0.05, pointSize: 1.8 },
}

// ─── Shaders ─────────────────────────────────────────────────────────────────

const POINT_VERT = /* glsl */`
  uniform float uOpacity;
  uniform float uDpr;
  uniform float uPointSize;
  varying float vOpacity;
  void main() {
    vOpacity = uOpacity;
    gl_PointSize = uPointSize * uDpr;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const POINT_FRAG = /* glsl */`
  varying float vOpacity;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    float alpha = smoothstep(0.5, 0.35, d) * vOpacity;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
  }
`
const LINE_VERT = /* glsl */`
  attribute float aOpacity;
  varying float vOpacity;
  void main() {
    vOpacity = aOpacity;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const LINE_FRAG = /* glsl */`
  varying float vOpacity;
  void main() {
    if (vOpacity < 0.01) discard;
    gl_FragColor = vec4(1.0, 1.0, 1.0, vOpacity);
  }
`

// ─── Types ────────────────────────────────────────────────────────────────────

interface Particle {
  x: number; y: number
  vx: number; vy: number
  phase: number
}

interface SectionBox {
  mid: number      // vertical centre of the section in document px
  params: ZoneParams
}

const MAX_CONNECTIONS = 8000

// ─── Main ─────────────────────────────────────────────────────────────────────

export function createParticleDirector(
  canvas: HTMLCanvasElement,
  onReady?: () => void,
): { destroy(): void } {
  const phone = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches
  const N = phone ? 200 : 400
  const dpr = Math.min(window.devicePixelRatio || 1, 2)

  // ── Renderer ─────────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(dpr)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0)

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
  camera.position.z = 1

  // ── Particles geometry ───────────────────────────────────────────────────
  const rand = mulberry32(42)
  const particles: Particle[] = Array.from({ length: N }, () => ({
    x: rand() * 2 - 1,
    y: rand() * 2 - 1,
    vx: (rand() - 0.5) * 0.18,
    vy: (rand() - 0.5) * 0.18,
    phase: rand() * Math.PI * 2,
  }))

  const ptPositions = new Float32Array(N * 3)
  const ptGeo = new THREE.BufferGeometry()
  const ptPosAttr = new THREE.BufferAttribute(ptPositions, 3)
  ptPosAttr.setUsage(THREE.DynamicDrawUsage)
  ptGeo.setAttribute('position', ptPosAttr)

  const ptMat = new THREE.ShaderMaterial({
    vertexShader: POINT_VERT,
    fragmentShader: POINT_FRAG,
    uniforms: {
      uOpacity: { value: 0.72 },
      uDpr: { value: dpr },
      uPointSize: { value: 4.0 },
    },
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  })
  const points = new THREE.Points(ptGeo, ptMat)
  scene.add(points)

  // ── Lines geometry ───────────────────────────────────────────────────────
  const linePositions = new Float32Array(MAX_CONNECTIONS * 2 * 3)
  const lineOpacities  = new Float32Array(MAX_CONNECTIONS * 2)

  const lineGeo = new THREE.BufferGeometry()
  const linePosAttr = new THREE.BufferAttribute(linePositions, 3)
  linePosAttr.setUsage(THREE.DynamicDrawUsage)
  const lineOpaAttr = new THREE.BufferAttribute(lineOpacities, 1)
  lineOpaAttr.setUsage(THREE.DynamicDrawUsage)
  lineGeo.setAttribute('position', linePosAttr)
  lineGeo.setAttribute('aOpacity', lineOpaAttr)
  lineGeo.setDrawRange(0, 0)

  const lineMat = new THREE.ShaderMaterial({
    vertexShader: LINE_VERT,
    fragmentShader: LINE_FRAG,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  })
  const lines = new THREE.LineSegments(lineGeo, lineMat)
  scene.add(lines)

  // ── State ────────────────────────────────────────────────────────────────
  let sections: SectionBox[] = []

  // Live zone — blends toward the scroll-proportional target each frame
  const zone: ZoneParams = { ...ZONES.hero }

  let mouseX = -10
  let mouseY = -10
  let time = 0
  let lastNow = performance.now()
  let lastScrollY = window.scrollY
  let rafId = 0
  let firstFrame = true
  let disposed = false

  // ── Scroll-proportional zone blend (stamen-style) ────────────────────────
  function blendParams(a: ZoneParams, b: ZoneParams, t: number): ZoneParams {
    return {
      opacity:        lerp(a.opacity,        b.opacity,        t),
      connectionDist: lerp(a.connectionDist, b.connectionDist, t),
      driftSpeed:     lerp(a.driftSpeed,     b.driftSpeed,     t),
      pointSize:      lerp(a.pointSize,      b.pointSize,      t),
    }
  }

  function getTargetZone(): ZoneParams {
    if (sections.length === 0) return ZONES.hero
    const playhead = window.scrollY + window.innerHeight * 0.5

    let idx = 0
    for (let i = 1; i < sections.length; i++) {
      if (sections[i].mid <= playhead) idx = i
    }

    const a = sections[idx]
    const b = sections[Math.min(idx + 1, sections.length - 1)]
    if (a === b) return a.params

    const t = smoother(clamp((playhead - a.mid) / (b.mid - a.mid)))
    return blendParams(a.params, b.params, t)
  }

  // ── Build section map ────────────────────────────────────────────────────
  function build() {
    sections = []
    document.querySelectorAll<HTMLElement>('[data-section]').forEach((el) => {
      const name = (el.dataset.section ?? '').toLowerCase().replace(/\s/g, '')
      let top = 0
      let curr: HTMLElement | null = el
      while (curr) {
        top += curr.offsetTop
        curr = curr.offsetParent as HTMLElement | null
      }
      const height = el.offsetHeight
      const mid = top + height * 0.5
      const params = ZONES[name] ?? ZONES.hero
      sections.push({ mid, params })
    })
    sections.sort((a, b) => a.mid - b.mid)
  }

  // ── RAF tick ─────────────────────────────────────────────────────────────
  function tick(now: number) {
    if (disposed) return
    rafId = requestAnimationFrame(tick)

    const dtMs = Math.min(50, now - lastNow)
    lastNow = now
    const dt = dtMs / 1000

    time += dt

    // Scroll velocity → particle impulse (immediate tactile response to scroll)
    const scrollDelta = window.scrollY - lastScrollY
    lastScrollY = window.scrollY
    const scrollForce = scrollDelta * 0.00012

    // Zone target from scroll position (proportional, not time-based)
    const target = getTargetZone()
    // Small lerp to prevent flicker on jagged scroll, while staying scroll-driven
    zone.opacity        = target.opacity === 0 ? lerp(zone.opacity, 0, 0.18) : lerp(zone.opacity, target.opacity, 0.10)
    if (zone.opacity < 0.005) zone.opacity = 0
    zone.connectionDist = lerp(zone.connectionDist, target.connectionDist, 0.10)
    zone.driftSpeed     = lerp(zone.driftSpeed,     target.driftSpeed,     0.10)
    zone.pointSize      = lerp(zone.pointSize,      target.pointSize,      0.10)

    // ── Update particles ─────────────────────────────────────────────────
    for (let i = 0; i < N; i++) {
      const p = particles[i]

      // Velocity damping (prevents scroll impulse from accumulating)
      p.vx *= 0.998
      p.vy *= 0.998

      // Scroll impulse: scroll down pushes particles up (like inertia)
      p.vy -= scrollForce

      // Drift + wind oscillation (from stamen petal physics)
      p.x += p.vx * dt * zone.driftSpeed
      p.y += p.vy * dt * zone.driftSpeed * 0.6
      p.x += Math.sin(time * 0.7 + p.phase * 9) * dt * 0.04

      // Mouse repulsion (desktop only)
      if (!phone) {
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dd = Math.sqrt(dx * dx + dy * dy)
        if (dd < 0.15 && dd > 0.001) {
          const push = ((0.15 - dd) / 0.15) * 2.5 * dt
          p.x += (dx / dd) * push
          p.y += (dy / dd) * push
        }
      }

      // Wrap
      if (p.x > 1.1)  p.x -= 2.2
      else if (p.x < -1.1) p.x += 2.2
      if (p.y > 1.1)  p.y -= 2.2
      else if (p.y < -1.1) p.y += 2.2

      const base = i * 3
      ptPositions[base]     = p.x
      ptPositions[base + 1] = p.y
      ptPositions[base + 2] = 0
    }
    ptPosAttr.needsUpdate = true
    ptMat.uniforms.uOpacity.value   = zone.opacity
    ptMat.uniforms.uPointSize.value = zone.pointSize

    // ── Update connections ───────────────────────────────────────────────
    const dist  = zone.connectionDist
    const dist2 = dist * dist
    let connCount = 0

    if (dist > 0.02) {
      for (let i = 0; i < N && connCount < MAX_CONNECTIONS; i++) {
        for (let j = i + 1; j < N && connCount < MAX_CONNECTIONS; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < dist2) {
            const opa = (1 - Math.sqrt(d2) / dist) * zone.opacity * 0.35
            const vb  = connCount * 6
            linePositions[vb]     = particles[i].x
            linePositions[vb + 1] = particles[i].y
            linePositions[vb + 2] = 0
            linePositions[vb + 3] = particles[j].x
            linePositions[vb + 4] = particles[j].y
            linePositions[vb + 5] = 0
            lineOpacities[connCount * 2]     = opa
            lineOpacities[connCount * 2 + 1] = opa
            connCount++
          }
        }
      }
    }

    linePosAttr.needsUpdate = true
    lineOpaAttr.needsUpdate = true
    lineGeo.setDrawRange(0, connCount * 2)

    renderer.render(scene, camera)

    if (firstFrame) {
      firstFrame = false
      onReady?.()
    }
  }

  // ── Events ───────────────────────────────────────────────────────────────
  function onMouseMove(e: MouseEvent) {
    mouseX =  (e.clientX / window.innerWidth)  * 2 - 1
    mouseY = -((e.clientY / window.innerHeight) * 2 - 1)
  }

  function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    build()
  }

  if (!phone) window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })

  // Delay build so sections are painted with real heights
  setTimeout(build, 150)
  rafId = requestAnimationFrame(tick)

  return {
    destroy() {
      disposed = true
      cancelAnimationFrame(rafId)
      if (!phone) window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      ptGeo.dispose()
      ptMat.dispose()
      lineGeo.dispose()
      lineMat.dispose()
    },
  }
}
