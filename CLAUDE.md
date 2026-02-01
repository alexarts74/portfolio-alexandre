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

### Project Structure

```
app/
├── layout.tsx           # Root layout with fonts (Cormorant Garamond + Inter)
├── page.tsx             # Home page assembling all sections
├── globals.css          # Tailwind + custom animations
├── components/          # React components
│   ├── Navigation.tsx   # Fixed header with mobile menu
│   ├── Hero.tsx         # Full-screen hero section
│   ├── Presentation.tsx # About section with stats
│   ├── ProjectsGrid.tsx # Projects showcase grid
│   ├── ProjectCard.tsx  # Individual project card
│   ├── Skills.tsx       # Skills/technologies section
│   ├── Footer.tsx       # Footer with contact info
│   └── LanguageSwitcher.tsx
├── hooks/
│   └── useInView.ts     # IntersectionObserver hook for scroll animations
├── i18n/
│   ├── LanguageContext.tsx  # Language provider
│   └── translations.ts      # EN/FR translations
└── data/
    └── projects.ts      # Project data
```

### Styling

- **Fonts**: Cormorant Garamond (display) + Inter (body) via `next/font`
- **Colors**: Minimalist black/white/neutral palette
- **Animations**: Custom keyframes in globals.css (fadeInUp, slideIn, lineExpand, etc.)
- **Scroll animations**: Triggered via `useInView` hook with IntersectionObserver

### Customization

To personalize the portfolio:
1. Update `app/data/projects.ts` with your projects
2. Update `app/i18n/translations.ts` with your content
3. Add images to `public/images/`:
   - `portrait.jpg` - Your photo
   - `projects/*.jpg` - Project screenshots
4. Update contact info in `app/components/Footer.tsx`
5. Modify skills in `app/components/Skills.tsx`
