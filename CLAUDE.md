# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio personnel d'Alexandre Artus, développeur full stack. Palette blanc / noir / orange en 60-30-10 (hero en carte noire avec portrait N&B, dégradé orange → bordeaux réservé à la section finale de chaque page), titres sans-serif bold, animations GSAP au scroll, ruban 3D three.js pour les projets et support multilingue (FR/EN).

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint

node scripts/covers/render.mjs [slug...]   # Regenerate project covers (all, or the given slugs)
```

## Architecture

- **Next.js 16** with App Router (file-based routing in `app/`)
- **React 19** with client components for interactivity
- **TypeScript** with strict mode and path alias `@/*` mapping to root
- **Tailwind CSS 4** via PostCSS plugin
- **GSAP** (GreenSock) for all animations: scroll-triggered reveals, parallax, page transitions, mobile menu
- **three.js** only for the WebGL projects ribbon on the home page (see Animation Strategy)

### Project Structure

```
app/
├── layout.tsx           # Root layout: fonts (Plus Jakarta Sans + Inter), LanguageProvider, TransitionProvider
├── page.tsx             # Home: Hero → Presentation → FeaturedProject → ProjectsGrid → Skills
├── globals.css          # Tailwind theme tokens + custom classes/keyframes
├── lib/
│   ├── gsap.ts          # GSAP setup (registers ScrollTrigger + ScrollToPlugin)
│   └── ribbon.ts        # three.js engine of the projects ribbon (loaded with a dynamic import)
├── components/
│   ├── Navigation.tsx   # Fixed header (variant "home" | "minimal") + GSAP mobile menu
│   ├── PageTransition.tsx # TransitionProvider + TransitionLink: ink overlay wipe between pages
│   ├── PillButton.tsx   # Shared pill CTA with round accent arrow (+ ArrowIcon)
│   ├── Hero.tsx         # Ink card hero, duotone portrait, services, clients marquee
│   ├── Presentation.tsx # About section with stats
│   ├── FeaturedProject.tsx # "Projets phares" carousel (projects with `featured: true`)
│   ├── ProjectsGrid.tsx # Pinned zoom-title intro + ProjectsRibbon
│   ├── ProjectsRibbon.tsx # All projects on a 3D helical ribbon (sticky stage, scroll-driven)
│   ├── ProjectCard.tsx  # Cover card (ribbon fallback grid: reduced motion / no WebGL)
│   ├── ProjectDetail.tsx # Full project page with GSAP scroll animations
│   ├── ProjectGallery.tsx # Image gallery component
│   ├── Skills.tsx       # Skills/technologies section
│   ├── Footer.tsx       # Footer with GSAP scroll-triggered animations
│   ├── CustomCursor.tsx # Custom cursor (desktop only)
│   └── LanguageSwitcher.tsx
├── i18n/
│   ├── LanguageContext.tsx  # Language provider (FR/EN), saved locale read with useSyncExternalStore
│   └── translations.ts     # All translations (+ per-project texts in `projectData`)
├── data/
│   ├── projects.ts      # Project data + getProjectCategory() and projectTypeLabels helpers
│   └── site.ts          # Email, location, social links (single source of truth)
├── projects/
│   └── [slug]/page.tsx  # Dynamic project detail page
└── contact/
    └── page.tsx         # Contact page — Netlify Forms (detected via public/__forms.html)

scripts/covers/          # Project cover generator (see "Project covers")
├── render.mjs           # Headless Chrome screenshot of template.html → sharp → webp
├── template.html        # 1600×1000 stage: background + 3D rig of browser / phone frames
├── covers.config.json   # Per-slug layout, tint, background and screenshots
└── bg/<slug>.jpg        # AI-generated backgrounds

public/images/projects/
├── <slug-ish>/          # Real screenshots used by project pages and covers
└── covers/              # Generated covers: <slug>.webp (1600×1000) + <slug>-sm.webp (800×500)
```

### Animation Strategy

- **GSAP is the single animation library** — do not introduce Framer Motion, CSS View Transitions API, or other animation libs
- `app/lib/gsap.ts` registers plugins once; import `{ gsap, ScrollTrigger }` from there
- Use `useGSAP` hook from `@gsap/react` for component-scoped animations (auto-cleanup)
- Internal navigation uses `<Link>` from `next/link`. `TransitionLink` (and `PillButton transition`) adds the GSAP ink wipe; the navigation uses it
- **Exception — three.js** renders the projects ribbon only (`app/lib/ribbon.ts`, imported dynamically so it stays out of the main bundle). GSAP still drives everything around it: ScrollTrigger progress, the ticker loop, hover tweens. Don't use three.js elsewhere

### Projects on the home page

- **FeaturedProject**: horizontal carousel of the projects flagged `featured: true` (native scroll-snap + arrows / dots)
- **ProjectsGrid**: white pinned intro (title zooms then bursts into letters), then `<ProjectsRibbon />` with every project in `projects.ts` order
- **ProjectsRibbon**:
  - Tall `data-dark` block (`SCREENS` × 100svh) with a `sticky top-0 h-svh` stage — not a ScrollTrigger pin, so it can't fight the intro pin. Its ScrollTriggers are created after the dynamic import with `refreshPriority: -1`
  - Layers: giant marquee title of the active project (DOM, behind) → transparent three.js canvas → `<Link data-cursor-project>` laid over the hovered (flattened) card each frame → UI bars (counter, meta, `PillButton`, progress segments)
  - Engine API (`Ribbon` class): `setProgress`, `setRunning` (renders only while on screen), `loadTextures` (one screen ahead, `-sm` covers under 768px), `pickAt` (GPU picking, used for taps), `destroy`; callbacks `onActive(index, direction)` and `onFocusFrame(frame | null)`
  - Tuning: `DESKTOP` / `MOBILE` params at the top of `ribbon.ts` (card size, tilt, arc = curvature, fov, hover scale…) and `SCROLL_STEP` / `SCROLL_HOLD` in `ProjectsRibbon.tsx`
  - Falls back to a static grid of `ProjectCard` when `prefers-reduced-motion: reduce` or WebGL is unavailable. A `sr-only` list keeps every project link in the DOM
- Category shown in the meta comes from `getProjectCategory()`: Webflow tech → `webflow`, else mobile → `mobile`, else `showcase: true` → `showcase`, else `webapp`. Labels live in `translations.projects.categories`

### Styling

- **Fonts**: Plus Jakarta Sans 400–800 (display, `--font-display`) + Inter (body) via `next/font`
- **Colors — 60 / 30 / 10 rule**: white (~60 %, light section backgrounds) / `ink` (~30 %, #0f0f10 — never pure `#000`/`bg-black`) / `accent` (~10 %, #ff5a1f). Tokens in `globals.css` `@theme` → `accent`, `ink`, `ink-2`. Orange is for highlights only: CTA arrow dots, `#` markers, the highlighted word in section titles, small badges, hover/active states. Neutral light surfaces use `bg-ink/5`-style tints, not cream or orange tints
- **`.hero-gradient`** (orange→burgundy) is reserved for the **closing section of each page**: the footer CTA card (home) and the "Next project" block (project pages). Don't use it for heroes, cards, overlays or transitions — those are `bg-ink`
- **Hero**: `bg-ink` card on a white frame; the portrait uses `.duotone` plus a `bg-ink/45 mix-blend-multiply` layer
- **Dark sections** carry a `data-dark` attribute (the custom cursor is ink on light sections, white on `[data-dark]`, accent only for the "View" bubble)
- **Cursor "View" bubble**: any element with `data-cursor-project` (project cards, the ribbon hover link). The cursor listens to `mouseenter` / `mouseleave` and re-attaches on DOM changes
- **Animations**: GSAP for all interactive/scroll animations, CSS keyframes only for simple infinite loops (`.animate-scroll`: client marquee, ribbon title marquees)

### Project covers

The 16:10 covers in `public/images/projects/covers/` are generated, not hand-made. Each cover is a background plus the real screenshots in browser / phone frames, tilted in 3D, rendered with headless Chrome + sharp.

- Background, in this order: `scripts/covers/bg/<slug>.jpg` (AI-generated), else `bg` in the config (path from `public/`, e.g. a real photo), else the main screenshot blurred
- Layouts: `web` (one window), `web-duo` (two windows), `web-phone` (window + phone), `phones` (three phones)
- Per screenshot: `cropTop` (hide a macOS menu bar…), `aspect` (visible window ratio), `framed` (the screenshot already includes its phone frame)
- Edit `covers.config.json` and re-run `node scripts/covers/render.mjs <slug>` instead of editing the images. Needs Google Chrome (`CHROME_PATH` to override)
- In `projects.ts`, `image` is the cover (`/images/projects/covers/<slug>.webp`): used by the ribbon, the fallback cards and the "Next project" block. `images[0]` stays the project page hero

### Customization

To personalize the portfolio:
1. Add the project to `app/data/projects.ts` (screenshots in `public/images/projects/<folder>/`), then add its slug to `scripts/covers/covers.config.json` and render its cover
2. Update `app/i18n/translations.ts` with your content (`projectData.<slug>` for per-project texts)
3. Put your photo at `public/images/portrait.png`
4. Update contact info in `app/data/site.ts`
5. Modify skills in `app/components/Skills.tsx`
