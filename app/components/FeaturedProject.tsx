"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PillButton, { ArrowIcon } from "./PillButton";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import { projects, type Project } from "@/app/data/projects";
import { useLanguage } from "@/app/i18n/LanguageContext";

// Same side gutter as the rest of the page, applied as padding (and scroll padding
// for snapping) so the carousel can bleed to the viewport edges.
const GUTTER = "px-6 scroll-pl-6 md:px-12 md:scroll-pl-12 lg:px-16 lg:scroll-pl-16 xl:px-24 xl:scroll-pl-24";

const projectTypeLabels = {
  fr: { professional: "Pro", freelance: "Freelance", personal: "Perso" },
  en: { professional: "Pro", freelance: "Freelance", personal: "Personal" },
} as const;

function FeaturedCard({ project }: { project: Project }) {
  const { t, locale } = useLanguage();

  const projectTranslations = t.projectData[project.slug as keyof typeof t.projectData];
  const shortDesc = projectTranslations?.shortDescription || project.shortDescription;
  const displayedFeatures = (projectTranslations?.features || project.features).slice(0, 3);
  const phoneImage = project.mobileImages?.[1] ?? project.mobileImages?.[0];

  return (
    <article className="featured-card flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-ink-2">
      {/* Mockups */}
      <div className="relative px-6 pt-8 md:px-10 md:pt-10">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(60%_70%_at_50%_0%,rgb(255_90_31/0.15),transparent_70%)] blur-2xl"
          aria-hidden
        />
        <div className="relative flex items-end gap-4 md:gap-5">
          {/* Browser frame (web screenshot) */}
          <div className="flex-1">
            <div className="flex items-center gap-2 rounded-t-xl border border-white/10 bg-ink px-3 py-2">
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-white/15" />
                <div className="h-2 w-2 rounded-full bg-white/15" />
                <div className="h-2 w-2 rounded-full bg-white/15" />
              </div>
              <div className="ml-2 h-4 flex-1 rounded-md border border-white/10 bg-white/[0.06]" />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-b-xl border border-t-0 border-white/10 bg-neutral-900">
              <Image
                src={project.images[0]}
                alt={`${project.title} dashboard`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 85vw, 50vw"
              />
            </div>
          </div>

          {/* Phone frame — only for projects with a mobile app */}
          {phoneImage && (
            <div className="mb-3 w-[64px] shrink-0 md:mb-5 md:w-[88px] lg:w-[100px]">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[1.25rem] border-2 border-white/15 bg-neutral-900">
                <div className="absolute left-1/2 top-0 z-10 h-3 w-8 -translate-x-1/2 rounded-b-lg bg-ink" />
                <Image
                  src={phoneImage}
                  alt={`${project.title} mobile`}
                  fill
                  className="object-cover object-top"
                  sizes="100px"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 md:p-10">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span
            className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.projects.featured} · {projectTypeLabels[locale][project.projectType]}
          </span>
          <span className="text-xs font-medium text-white/40" style={{ fontFamily: "var(--font-body)" }}>
            SaaS · {project.year}
          </span>
        </div>

        <h3
          className="mb-4 text-4xl font-extrabold leading-none tracking-[-0.03em] md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.title}
        </h3>

        <p className="mb-6 text-base leading-relaxed text-white/60" style={{ fontFamily: "var(--font-body)" }}>
          {shortDesc}
        </p>

        <ul className="mb-8 space-y-2.5">
          {displayedFeatures.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-sm leading-snug text-white/75" style={{ fontFamily: "var(--font-body)" }}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="mb-8 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <PillButton href={`/projects/${project.slug}`}>{t.projects.viewProject}</PillButton>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedProject() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const featuredProjects = projects.filter((p) => p.featured);
  const count = featuredProjects.length;

  // Section reveal
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const trigger = { trigger: sectionRef.current, start: "top 75%" };

      gsap.fromTo(
        ".featured-head",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out", scrollTrigger: trigger }
      );
      gsap.fromTo(
        ".featured-slide",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", scrollTrigger: trigger }
      );
    },
    { scope: sectionRef }
  );

  // Dim the card that is not in focus
  useEffect(() => {
    const cards = trackRef.current?.querySelectorAll(".featured-card");
    cards?.forEach((card, i) => {
      gsap.to(card, { opacity: i === active ? 1 : 0.45, duration: 0.4, ease: "power2.out" });
    });
  }, [active]);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    const maxScroll = track.scrollWidth - track.clientWidth;

    // At the end of the track the last card can't reach the left edge: treat it as active
    if (track.scrollLeft >= maxScroll - 4) {
      setActive(slides.length - 1);
      return;
    }

    const padding = parseFloat(getComputedStyle(track).paddingLeft);
    const distance = (slide: HTMLElement) => Math.abs(slide.offsetLeft - padding - track.scrollLeft);
    let closest = 0;
    slides.forEach((slide, i) => {
      if (distance(slide) < distance(slides[closest])) closest = i;
    });
    setActive(closest);
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const padding = parseFloat(getComputedStyle(track).paddingLeft);
    // Scroll snapping fights a tweened scroll: disable it for the duration of the tween
    track.style.scrollSnapType = "none";
    gsap.to(track, {
      scrollTo: { x: Math.min(slide.offsetLeft - padding, maxScroll) },
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => {
        track.style.scrollSnapType = "";
      },
    });
  };

  if (count === 0) return null;

  const arrowClass =
    "flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:bg-accent disabled:pointer-events-none disabled:opacity-30";

  return (
    <section
      ref={sectionRef}
      id="projets"
      data-dark
      className="relative bg-ink text-white py-24 md:py-32 overflow-hidden scroll-mt-20"
    >
      <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
        {/* Header + controls */}
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <h2
            className="featured-head text-4xl font-extrabold leading-none tracking-[-0.03em] md:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.projects.featuredTitle}
          </h2>

          {count > 1 && (
            <div className="featured-head flex items-center gap-3">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                disabled={active === 0}
                aria-label={t.projects.previous}
                className={arrowClass}
              >
                <ArrowIcon className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                disabled={active === count - 1}
                aria-label={t.projects.next}
                className={arrowClass}
              >
                <ArrowIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Track: bleeds to the viewport edges, native swipe on touch, arrows/dots on desktop */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className={`no-scrollbar relative flex snap-x snap-mandatory gap-5 overflow-x-auto md:gap-8 ${GUTTER}`}
      >
        {featuredProjects.map((project) => (
          <div
            key={project.slug}
            className="featured-slide w-[86%] shrink-0 snap-start md:w-[58%] lg:w-[50%]"
          >
            <FeaturedCard project={project} />
          </div>
        ))}
      </div>

      <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
        {/* Dots */}
        {count > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {featuredProjects.map((project, i) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => goTo(i)}
                aria-label={project.title}
                aria-current={i === active}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-accent" : "w-2 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
