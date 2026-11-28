#!/usr/bin/env node
/**
 * Rend les couvertures 16:10 des projets (public/images/projects/covers/).
 *
 *   node scripts/covers/render.mjs            # tous les projets
 *   node scripts/covers/render.mjs evera nerea
 *
 * Chaque couverture = un fond (scripts/covers/bg/<slug>.jpg, sinon `bg` du config,
 * sinon la capture principale floutée) + les vraies captures posées dans des cadres
 * navigateur / téléphone en perspective. Rendu par Chrome headless, puis sharp → webp.
 * CHROME_PATH permet de pointer vers un autre binaire Chrome/Chromium.
 */
import { readFile, writeFile, mkdir, mkdtemp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const run = promisify(execFile);

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");
const PUBLIC_DIR = path.join(ROOT, "public");
const SHOTS_DIR = path.join(PUBLIC_DIR, "images/projects");
const BG_DIR = path.join(HERE, "bg");
const OUT_DIR = path.join(PUBLIC_DIR, "images/projects/covers");

const W = 1600;
const H = 1000;
const SCALE = 2;
const CHROME =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const DEFAULT_VIEW_ASPECT = 1.6;

const fileUrl = (p) => pathToFileURL(p).href;

async function loadShot(shot) {
  const file = path.join(SHOTS_DIR, shot.src);
  const { width, height } = await sharp(file).metadata();
  return { ...shot, file, ratio: width / height };
}

/** Browser window showing the top of a screenshot (cover-fit, optional top crop). */
function windowHtml({ x, y, z = 0, w, shot, dim = 0 }) {
  const crop = shot.cropTop ?? 0;
  const aspect = shot.aspect ?? Math.max(shot.ratio / (1 - crop), DEFAULT_VIEW_ASPECT);
  const viewH = w / aspect;

  let imgW = w;
  let imgH = w / shot.ratio;
  // Scale up when the cropped screenshot is shorter than the view
  const needed = viewH / (1 - crop);
  if (imgH < needed) {
    imgH = needed;
    imgW = imgH * shot.ratio;
  }
  const left = -(imgW - w) / 2;
  const top = -crop * imgH;

  return `<div class="win" style="left:${x}px;top:${y}px;width:${w}px;transform:translateZ(${z}px)">
    <div class="bar"><i></i><i></i><i></i><span class="url"></span></div>
    <div class="view" style="height:${viewH}px">
      <img src="${fileUrl(shot.file)}" style="left:${left}px;top:${top}px;width:${imgW}px;height:${imgH}px">
      ${dim ? `<div class="dim" style="opacity:${dim}"></div>` : ""}
    </div>
  </div>`;
}

/** Phone: a drawn iPhone frame, or the screenshot as-is when it already has one. */
function phoneHtml({ x, y, z = 0, w, shot, rot = 0 }) {
  const transform = `translateZ(${z}px) rotateZ(${rot}deg)`;
  if (shot.framed) {
    const h = w / shot.ratio;
    return `<div class="framed" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:${w * 0.12}px;transform:${transform}">
      <img src="${fileUrl(shot.file)}">
    </div>`;
  }
  const pad = Math.round(w * 0.04);
  const screenW = w - pad * 2;
  const screenH = screenW / shot.ratio;
  const radius = w * 0.16;
  return `<div class="phone" style="left:${x}px;top:${y}px;width:${w}px;height:${screenH + pad * 2}px;padding:${pad}px;border-radius:${radius}px;transform:${transform}">
    <div class="screen" style="border-radius:${radius - pad}px">
      <div class="island"></div>
      <img src="${fileUrl(shot.file)}">
    </div>
  </div>`;
}

const LAYOUTS = {
  web: (c) => {
    const w = c.frontWidth ?? 1040;
    return {
      rig: { rx: 10, ry: -16, rz: 4, x: 30, y: 10 },
      html: windowHtml({ x: -w / 2, y: -w / 3.2, w, shot: c.front }),
    };
  },
  "web-duo": (c) => ({
    rig: { rx: 12, ry: -18, rz: 5, x: 20, y: 0 },
    html:
      windowHtml({ x: -760, y: -440, z: -220, w: 900, shot: c.back, dim: 0.28 }) +
      windowHtml({ x: -320, y: -250, w: 980, shot: c.front }),
  }),
  "web-phone": (c) => ({
    rig: { rx: 10, ry: -16, rz: 4, x: 40, y: 0 },
    html:
      windowHtml({ x: -470, y: -380, w: 1120, shot: c.front }) +
      phoneHtml({ x: -700, y: -250, z: 160, w: 300, shot: c.phone }),
  }),
  phones: (c) => {
    const [left, center, right] = c.phones;
    return {
      rig: { rx: 8, ry: -14, rz: 4, x: 0, y: 30 },
      html:
        phoneHtml({ x: -590, y: -330, z: -120, w: 300, shot: left, rot: -4 }) +
        phoneHtml({ x: 290, y: -330, z: -120, w: 300, shot: right, rot: 4 }) +
        phoneHtml({ x: -175, y: -400, z: 60, w: 350, shot: center }),
    };
  },
};

async function buildHtml(slug, cfg, template) {
  const c = { ...cfg };
  for (const key of ["front", "back", "phone"]) if (c[key]) c[key] = await loadShot(c[key]);
  if (c.phones) c.phones = await Promise.all(c.phones.map(loadShot));

  const layout = LAYOUTS[c.layout];
  if (!layout) throw new Error(`${slug}: unknown layout "${c.layout}"`);
  const { rig, html } = layout(c);

  const generated = path.join(BG_DIR, `${slug}.jpg`);
  const bgFile = existsSync(generated)
    ? generated
    : c.bg
      ? path.join(PUBLIC_DIR, c.bg)
      : null;
  const blurSource = c.front?.file ?? c.phones?.[1]?.file ?? c.phone?.file;
  const backdrop = bgFile
    ? `<img class="bg" src="${fileUrl(bgFile)}">`
    : `<img class="bg blur" src="${fileUrl(blurSource)}"><div class="tint" style="--tint-opacity:0.55"></div>`;

  const vars = [
    `--tint:${c.tint ?? "#0f0f10"}`,
    `--bg-pos:${c.bgPosition ?? "center"}`,
    `--rx:${rig.rx}deg`,
    `--ry:${rig.ry}deg`,
    `--rz:${rig.rz}deg`,
    `--rig-x:${rig.x}px`,
    `--rig-y:${rig.y}px`,
  ].join(";");

  return template
    .replace("/*VARS*/", vars)
    .replace("<!--BACKDROP-->", `${backdrop}<div class="glow"></div>`)
    .replace("<!--RIG-->", html);
}

async function render(slug, cfg, template, tmp) {
  const htmlPath = path.join(tmp, `${slug}.html`);
  const pngPath = path.join(tmp, `${slug}.png`);
  await writeFile(htmlPath, await buildHtml(slug, cfg, template));

  await run(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      "--allow-file-access-from-files",
      `--force-device-scale-factor=${SCALE}`,
      `--window-size=${W},${H}`,
      "--virtual-time-budget=5000",
      `--screenshot=${pngPath}`,
      fileUrl(htmlPath),
    ],
    { timeout: 90_000 }
  );

  const base = sharp(pngPath).resize(W, H, { fit: "cover" });
  await base.clone().webp({ quality: 82 }).toFile(path.join(OUT_DIR, `${slug}.webp`));
  await base.clone().resize(W / 2, H / 2).webp({ quality: 78 }).toFile(path.join(OUT_DIR, `${slug}-sm.webp`));
  console.log(`✓ ${slug}`);
}

async function main() {
  const { projects } = JSON.parse(await readFile(path.join(HERE, "covers.config.json"), "utf8"));
  const template = await readFile(path.join(HERE, "template.html"), "utf8");
  const only = process.argv.slice(2);
  const slugs = only.length ? only : Object.keys(projects);

  await mkdir(OUT_DIR, { recursive: true });
  const tmp = await mkdtemp(path.join(os.tmpdir(), "covers-"));
  try {
    for (const slug of slugs) {
      if (!projects[slug]) throw new Error(`Unknown slug: ${slug}`);
      await render(slug, projects[slug], template, tmp);
    }
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
