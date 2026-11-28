# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio personnel d'Alexandre Artus, développeur full stack. Palette blanc / noir / orange en 60-30-10 (hero en carte noire avec portrait N&B, dégradé orange → bordeaux réservé à la section finale de chaque page), titres sans-serif bold, animations GSAP au scroll et support multilingue (FR/EN).

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

- **Next.js 16** with App Router (file-based routing in `app/`)
- **React 19** with client components for interactivity
- **TypeScript** with strict mode and path alias `@/*` mapping to root
- **Tailwind CSS 4** via PostCSS plugin
- **GSAP** (GreenSock) for all animations: scroll-triggered reveals, parallax, page transitions, mobile menu

### Project Structure

```
app/
├── layout.tsx           # Root layout with fonts (Plus Jakarta Sans + Inter)
├── page.tsx             # Home page assembling all sections
├── globals.css          # Tailwind + custom animations
├── lib/
│   └── gsap.ts          # GSAP setup (registers ScrollTrigger + ScrollToPlugin)
├── components/
│   ├── Navigation.tsx   # Fixed header (variant "home" | "minimal") + GSAP mobile menu
│   ├── PillButton.tsx   # Shared pill CTA with round accent arrow
│   ├── Hero.tsx         # Ink card hero, duotone portrait, services, clients marquee
│   ├── Presentation.tsx # About section with stats
│   ├── ProjectsGrid.tsx # Projects showcase (horizontal scroll on desktop via GSAP)
│   ├── ProjectCard.tsx  # Individual project card
│   ├── ProjectDetail.tsx # Full project page with GSAP scroll animations
│   ├── ProjectGallery.tsx # Image gallery component
│   ├── Skills.tsx       # Skills/technologies section
│   ├── Footer.tsx       # Footer with GSAP scroll-triggered animations
│   ├── CustomCursor.tsx # Custom cursor (desktop only)
│   └── LanguageSwitcher.tsx
├── i18n/
│   ├── LanguageContext.tsx  # Language provider (FR/EN)
│   └── translations.ts     # All translations
├── data/
│   ├── projects.ts      # Project data with images, videos, tech stacks
│   └── site.ts          # Email, location, social links (single source of truth)
├── projects/
│   └── [slug]/page.tsx  # Dynamic project detail page
└── contact/
    └── page.tsx         # Contact page — Netlify Forms (detected via public/__forms.html)
```

### Animation Strategy

- **GSAP is the single animation library** — do not introduce Framer Motion, CSS View Transitions API, or other animation libs
- `app/lib/gsap.ts` registers plugins once; import `{ gsap, ScrollTrigger }` from there
- Use `useGSAP` hook from `@gsap/react` for component-scoped animations (auto-cleanup)
- All internal navigation uses standard `<Link>` from `next/link`

### Styling

- **Fonts**: Plus Jakarta Sans 400–800 (display, `--font-display`) + Inter (body) via `next/font`
- **Colors — 60 / 30 / 10 rule**: white (~60 %, light section backgrounds) / `ink` (~30 %, #0f0f10 — never pure `#000`/`bg-black`) / `accent` (~10 %, #ff5a1f). Tokens in `globals.css` `@theme` → `accent`, `ink`, `ink-2`. Orange is for highlights only: CTA arrow dots, `#` markers, the highlighted word in section titles, small badges, hover/active states. Neutral light surfaces use `bg-ink/5`-style tints, not cream or orange tints
- **`.hero-gradient`** (orange→burgundy) is reserved for the **closing section of each page**: the footer CTA card (home) and the "Next project" block (project pages). Don't use it for heroes, cards, overlays or transitions — those are `bg-ink`
- **Hero**: `bg-ink` card on a white frame; the portrait uses `.duotone` plus a `bg-ink/45 mix-blend-multiply` layer
- **Dark sections** carry a `data-dark` attribute (the custom cursor is ink on light sections, white on `[data-dark]`, accent only for the "View" bubble on projects)
- **Animations**: GSAP for all interactive/scroll animations, CSS keyframes only for simple infinite loops (client marquee)

### Customization

To personalize the portfolio:
1. Update `app/data/projects.ts` with your projects
2. Update `app/i18n/translations.ts` with your content
3. Add images to `public/images/`:
   - `portrait.jpg` - Your photo
   - `projects/*.jpg` - Project screenshots
4. Update contact info in `app/data/site.ts`
5. Modify skills in `app/components/Skills.tsx`
