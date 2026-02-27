# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio personnel d'Alexandre Artus, développeur full stack. Design minimaliste inspiré de portfolios artistiques avec des animations au scroll et support multilingue (FR/EN).

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
├── layout.tsx           # Root layout with fonts (Cormorant Garamond + Inter)
├── page.tsx             # Home page assembling all sections
├── globals.css          # Tailwind + custom animations
├── lib/
│   └── gsap.ts          # GSAP setup (registers ScrollTrigger + ScrollToPlugin)
├── components/
│   ├── Navigation.tsx   # Fixed header with GSAP mobile menu (clip-path reveal)
│   ├── Hero.tsx         # Full-screen hero with GSAP entrance + parallax
│   ├── Presentation.tsx # About section with stats
│   ├── ProjectsGrid.tsx # Projects showcase (horizontal scroll on desktop via GSAP)
│   ├── ProjectCard.tsx  # Individual project card
│   ├── ProjectDetail.tsx # Full project page with GSAP scroll animations
│   ├── ProjectGallery.tsx # Image gallery component
│   ├── Skills.tsx       # Skills/technologies section
│   ├── Footer.tsx       # Footer with GSAP scroll-triggered animations
│   ├── PageTransition.tsx # GSAP page transition (fade on route change via usePathname)
│   ├── CustomCursor.tsx # Custom cursor (desktop only)
│   └── LanguageSwitcher.tsx
├── hooks/               # (currently empty — useInView removed, replaced by GSAP ScrollTrigger)
├── i18n/
│   ├── LanguageContext.tsx  # Language provider (FR/EN)
│   └── translations.ts     # All translations
├── data/
│   └── projects.ts      # Project data with images, videos, tech stacks
└── contact/
    └── page.tsx         # Contact page with GSAP entrance animations
```

### Animation Strategy

- **GSAP is the single animation library** — do not introduce Framer Motion, CSS View Transitions API, or other animation libs
- `app/lib/gsap.ts` registers plugins once; import `{ gsap, ScrollTrigger }` from there
- Use `useGSAP` hook from `@gsap/react` for component-scoped animations (auto-cleanup)
- Page transitions: `PageTransition.tsx` wraps children in layout, detects route changes via `usePathname()`, fades new page in with GSAP
- All internal navigation uses standard `<Link>` from `next/link` — no custom TransitionLink needed

### Styling

- **Fonts**: Cormorant Garamond (display) + Inter (body) via `next/font`
- **Colors**: Minimalist black/white/neutral palette
- **Animations**: GSAP for all interactive/scroll animations, CSS keyframes only for simple infinite loops (scroll marquee, blob floats, cursor pulse)

### Customization

To personalize the portfolio:
1. Update `app/data/projects.ts` with your projects
2. Update `app/i18n/translations.ts` with your content
3. Add images to `public/images/`:
   - `portrait.jpg` - Your photo
   - `projects/*.jpg` - Project screenshots
4. Update contact info in `app/components/Footer.tsx`
5. Modify skills in `app/components/Skills.tsx`
