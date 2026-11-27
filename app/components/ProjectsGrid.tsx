"use client";

import { useRef } from "react";
import { projects } from "@/app/data/projects";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import ProjectCard from "./ProjectCard";

function SplitChars({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={`zoom-char inline-block ${className || ""}`}
          style={char === " " ? { width: "0.3em" } : undefined}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

function SectionBlock({
  number,
  label,
  title,
  titleItalic,
  sectionRef,
}: {
  number: string;
  label: string;
  title: string;
  titleItalic: string;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={sectionRef} className="section-block mx-6 md:mx-12 lg:mx-16 xl:mx-24 mb-12">
      <div className="section-block-badge flex items-center gap-4 mb-4">
        <span
          className="text-sm font-bold text-ink"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="text-accent">#</span>{number}
        </span>
        <div className="h-px flex-1 bg-ink/10" />
        <span
          className="text-sm font-medium text-ink/50"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {label}
        </span>
      </div>
      <h3
        className="text-3xl md:text-5xl font-bold tracking-tight text-ink"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}{" "}
        <span className="text-accent">{titleItalic}</span>
      </h3>
    </div>
  );
}

function HorizontalHeader({
  number,
  label,
  title,
  titleItalic,
  headerRef,
}: {
  number: string;
  label: string;
  title: string;
  titleItalic: string;
  headerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={headerRef} className="section-block mx-6 md:mx-12 lg:mx-16 xl:mx-24 pt-10 pb-6 shrink-0">
      <div className="section-block-badge flex items-center gap-4 mb-4">
        <span
          className="text-sm font-bold text-ink"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="text-accent">#</span>{number}
        </span>
        <div className="h-px flex-1 bg-ink/10" />
        <span
          className="text-sm font-medium text-ink/50"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {label}
        </span>
      </div>
      <h3
        className="text-3xl md:text-5xl font-bold tracking-tight text-ink"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title} <span className="text-accent">{titleItalic}</span>
      </h3>
    </div>
  );
}

export default function ProjectsGrid() {
  const { t, locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bigNumberRef = useRef<HTMLDivElement>(null);
  const zoomSectionRef = useRef<HTMLDivElement>(null);
  const titleZoomRef = useRef<HTMLHeadingElement>(null);

  // Section header refs
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

  // Mobile-only header refs for the horizontal sections
  const section2MobileRef = useRef<HTMLDivElement>(null);
  const section3MobileRef = useRef<HTMLDivElement>(null);

  // Grid refs
  const webflowGridRef = useRef<HTMLDivElement>(null);
  const mobileGridRef = useRef<HTMLDivElement>(null);

  // Horizontal scroll refs (desktop): showcase sites + SaaS
  const vitrineHorizontalRef = useRef<HTMLDivElement>(null);
  const vitrineTrackRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Mobile vertical grids for the horizontal sections
  const vitrineMobileRef = useRef<HTMLDivElement>(null);
  const saasMobileRef = useRef<HTMLDivElement>(null);

  // Divider refs
  const divider1Ref = useRef<HTMLDivElement>(null);
  const divider2Ref = useRef<HTMLDivElement>(null);
  const divider3Ref = useRef<HTMLDivElement>(null);

  // Project categorization
  const webflowProjects = projects.filter((p) => p.technologies.includes("Webflow"));
  const vitrineProjects = projects.filter(
    (p) => p.type === "web" && p.showcase && !p.technologies.includes("Webflow")
  );
  const saasProjects = projects.filter(
    (p) => p.type === "web" && !p.showcase && !p.technologies.includes("Webflow")
  );
  const mobileProjects = projects.filter((p) => p.type === "mobile");

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const mm = gsap.matchMedia();

      // --- Dark header: zoom title on scroll ---
      if (zoomSectionRef.current && headerRef.current && titleZoomRef.current) {
        const badge = headerRef.current.querySelector(".section-badge");
        const line = headerRef.current.querySelector(".section-line");
        const bigNum = bigNumberRef.current;

        mm.add("(min-width: 768px)", () => {
          const chars = titleZoomRef.current!.querySelectorAll(".zoom-char");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: zoomSectionRef.current,
              start: "top top",
              end: "+=120%",
              pin: true,
              scrub: 0.5,
              anticipatePin: 1,
            },
          });

          tl.fromTo(badge, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.08 }, 0);
          tl.fromTo(titleZoomRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.1, ease: "power3.out" }, 0.02);
          tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.08, ease: "power2.out" }, 0.06);
          if (bigNum) {
            tl.fromTo(bigNum, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.1 }, 0);
          }

          tl.to(titleZoomRef.current, { scale: 4, duration: 0.4, ease: "power2.in" }, 0.3);
          tl.to(badge, { opacity: 0, duration: 0.15 }, 0.3);
          tl.to(line, { opacity: 0, duration: 0.15 }, 0.3);
          if (bigNum) {
            tl.to(bigNum, { opacity: 0, duration: 0.15 }, 0.3);
          }

          tl.to(
            chars,
            {
              x: () => gsap.utils.random(-60, 60),
              y: () => gsap.utils.random(-50, 50),
              rotation: () => gsap.utils.random(-15, 15),
              opacity: 0,
              duration: 0.3,
              stagger: { each: 0.005, from: "center" },
              ease: "power2.out",
            },
            0.7
          );
        });

        mm.add("(max-width: 767px)", () => {
          const chars = titleZoomRef.current!.querySelectorAll(".zoom-char");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: zoomSectionRef.current,
              start: "top top",
              end: "+=100%",
              pin: true,
              scrub: 0.5,
              anticipatePin: 1,
            },
          });

          tl.fromTo(badge, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.08 }, 0);
          tl.fromTo(titleZoomRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.1, ease: "power3.out" }, 0.02);
          tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.08, ease: "power2.out" }, 0.06);
          if (bigNum) {
            tl.fromTo(bigNum, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.1 }, 0);
          }

          tl.to(titleZoomRef.current, { scale: 3, duration: 0.4, ease: "power2.in" }, 0.3);
          tl.to(badge, { opacity: 0, duration: 0.15 }, 0.3);
          tl.to(line, { opacity: 0, duration: 0.15 }, 0.3);
          if (bigNum) {
            tl.to(bigNum, { opacity: 0, duration: 0.15 }, 0.3);
          }

          tl.to(
            chars,
            {
              x: () => gsap.utils.random(-40, 40),
              y: () => gsap.utils.random(-35, 35),
              rotation: () => gsap.utils.random(-15, 15),
              opacity: 0,
              duration: 0.3,
              stagger: { each: 0.005, from: "center" },
              ease: "power2.out",
            },
            0.7
          );
        });
      }

      // --- Section header reveals ---
      [section1Ref, section2Ref, section2MobileRef, section3Ref, section3MobileRef, section4Ref].forEach((ref) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: ref.current, start: "top 80%" },
          }
        );
      });

      // --- Divider line animations ---
      [divider1Ref, divider2Ref, divider3Ref].forEach((ref) => {
        if (!ref.current) return;
        const line = ref.current.querySelector(".divider-line");
        if (!line) return;
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: ref.current, start: "top 90%" },
          }
        );
      });

      // --- Card grid stagger reveals (Webflow, Mobile) ---
      [webflowGridRef, mobileGridRef].forEach((gridRef) => {
        if (!gridRef.current) return;
        const cards = gridRef.current.querySelectorAll(".grid-card");
        if (cards.length === 0) return;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
          }
        );
      });

      // --- Desktop: pinned horizontal scroll (showcase sites, then SaaS) ---
      mm.add("(min-width: 768px)", () => {
        const tweens: gsap.core.Tween[] = [];

        // Created in page order so ScrollTrigger computes the pin offsets correctly
        [
          { wrap: vitrineHorizontalRef.current, track: vitrineTrackRef.current },
          { wrap: horizontalRef.current, track: trackRef.current },
        ].forEach(({ wrap, track }) => {
          if (!wrap || !track) return;

          const cards = track.querySelectorAll(".h-scroll-card");
          const getScrollWidth = () => Math.max(0, track.scrollWidth - window.innerWidth);

          // The fixed nav stays visible, so pin the block centred in the space below it
          // (or right under it when the block is taller than that space).
          const getPinTop = () => {
            const navH = document.querySelector("nav")?.getBoundingClientRect().height ?? 0;
            const free = window.innerHeight - navH;
            return Math.round(navH + Math.max(0, (free - wrap.offsetHeight) / 2));
          };

          const scrollTween = gsap.to(track, {
            x: () => -getScrollWidth(),
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              pin: true,
              scrub: 1,
              start: () => `top ${getPinTop()}px`,
              end: () => `+=${getScrollWidth()}`,
              invalidateOnRefresh: true,
            },
          });
          tweens.push(scrollTween);

          cards.forEach((card) => {
            gsap.fromTo(
              card,
              { scale: 0.9, opacity: 0.3 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTween,
                  start: "left 90%",
                  end: "left 60%",
                  scrub: true,
                },
              }
            );
          });
        });

        return () => {
          tweens.forEach((scrollTween) => {
            scrollTween.kill();
            ScrollTrigger.getAll().forEach((st) => {
              if (st.vars.containerAnimation === scrollTween) st.kill();
            });
          });
        };
      });

      // --- Mobile: stagger for showcase and SaaS grids ---
      mm.add("(max-width: 767px)", () => {
        [vitrineMobileRef, saasMobileRef].forEach((gridRef) => {
          if (!gridRef.current) return;
          const cards = gridRef.current.querySelectorAll(".mobile-card");
          gsap.fromTo(
            cards,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="tous-les-projets" className="w-full scroll-mt-20">
      {/* Dark Header Section — pinned zoom */}
      <div ref={zoomSectionRef} data-dark className="hero-gradient relative h-screen overflow-hidden flex items-center">
        <div
          ref={bigNumberRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] md:text-[28rem] lg:text-[35rem] font-extrabold tracking-tighter text-white/10 leading-none pointer-events-none select-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          02
        </div>

        <div ref={headerRef} className="relative w-full flex flex-col items-center text-center">
          <div className="section-badge mb-6">
            <span
              className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.projects.section}
            </span>
          </div>

          <h2
            ref={titleZoomRef}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1] tracking-[-0.03em] text-white origin-center"
            style={{ fontFamily: "var(--font-display)", willChange: "transform" }}
          >
            <SplitChars text={t.projects.title} />
            <br />
            <span className="text-ink/80">
              <SplitChars text={t.projects.titleItalic} />
            </span>
          </h2>

          <div className="section-line mt-10 h-1 w-16 rounded-full bg-white origin-center mx-auto" />
        </div>
      </div>

      {/* Projects Content */}
      <div className="bg-cream pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-10 lg:pb-12">

        {/* SECTION 1 — Webflow */}
        <SectionBlock
          number="01"
          label={t.projects.webflow}
          title="Sites"
          titleItalic="Webflow"
          sectionRef={section1Ref}
        />
        <div ref={webflowGridRef} className="mx-6 md:mx-12 lg:mx-16 xl:mx-24 mb-16 md:mb-20">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {webflowProjects.map((project, index) => (
              <div key={project.slug} className="grid-card">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Divider 1 */}
        <div ref={divider1Ref} className="mx-6 md:mx-12 lg:mx-16 xl:mx-24 mb-16 md:mb-20">
          <div className="divider-line h-px bg-ink/10 origin-left" />
        </div>

        {/* SECTION 2 — Sites vitrines (desktop: pinned horizontal scroll with header inside) */}
        <div ref={vitrineHorizontalRef} className="hidden md:flex flex-col overflow-hidden pb-10 mb-6 md:mb-10">
          <HorizontalHeader
            number="02"
            label={t.projects.vitrine}
            title={locale === "fr" ? "Sites" : "Showcase"}
            titleItalic={locale === "fr" ? "vitrines" : "sites"}
            headerRef={section2Ref}
          />

          {/* Scroll track */}
          <div className="flex items-start pt-4 overflow-hidden">
            <div
              ref={vitrineTrackRef}
              className="flex items-center gap-8 px-6 md:px-12 lg:px-16 xl:px-24"
            >
              {vitrineProjects.map((project, index) => (
                <div key={project.slug} className="h-scroll-card shrink-0 w-[380px] lg:w-[420px]">
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
              <div className="shrink-0 w-24" />
            </div>
          </div>
        </div>

        {/* Mobile: Section header + vertical grid for showcase sites */}
        <div className="md:hidden">
          <SectionBlock
            number="02"
            label={t.projects.vitrine}
            title={locale === "fr" ? "Sites" : "Showcase"}
            titleItalic={locale === "fr" ? "vitrines" : "sites"}
            sectionRef={section2MobileRef}
          />
        </div>
        <div ref={vitrineMobileRef} className="md:hidden mx-6 mb-16">
          <div className="grid gap-8">
            {vitrineProjects.map((project, index) => (
              <div key={project.slug} className="mobile-card">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Divider 2 */}
        <div ref={divider2Ref} className="mx-6 md:mx-12 lg:mx-16 xl:mx-24 mb-16 md:mb-20">
          <div className="divider-line h-px bg-ink/10 origin-left" />
        </div>

        {/* SECTION 3 — SaaS / Web apps (desktop: pinned horizontal scroll with header inside) */}
        <div ref={horizontalRef} className="hidden md:flex flex-col overflow-hidden pb-10">
          {/* Section header inside the pinned container */}
          <HorizontalHeader
            number="03"
            label={t.projects.saas}
            title="Web"
            titleItalic="apps"
            headerRef={section3Ref}
          />

          {/* Scroll track */}
          <div className="flex items-start pt-4 overflow-hidden">
            <div
              ref={trackRef}
              className="flex items-center gap-8 px-6 md:px-12 lg:px-16 xl:px-24"
            >
              {saasProjects.map((project, index) => (
                <div key={project.slug} className="h-scroll-card shrink-0 w-[380px] lg:w-[420px]">
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
              <div className="shrink-0 w-24" />
            </div>
          </div>
        </div>

        {/* Mobile: Section header + vertical grid */}
        <div className="md:hidden">
          <SectionBlock
            number="03"
            label={t.projects.saas}
            title="Web"
            titleItalic="apps"
            sectionRef={section3MobileRef}
          />
        </div>

        {/* Mobile: Vertical Grid for SaaS */}
        <div ref={saasMobileRef} className="md:hidden mx-6 mb-16">
          <div className="grid gap-8">
            {saasProjects.map((project, index) => (
              <div key={project.slug} className="mobile-card">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Divider 3 */}
        <div ref={divider3Ref} className="mx-6 md:mx-12 lg:mx-16 xl:mx-24 mb-16 md:mb-20">
          <div className="divider-line h-px bg-ink/10 origin-left" />
        </div>

        {/* SECTION 4 — Mobile */}
        <SectionBlock
          number="04"
          label={t.projects.mobile}
          title="Apps"
          titleItalic="mobile"
          sectionRef={section4Ref}
        />
        <div ref={mobileGridRef} className="mx-6 md:mx-12 lg:mx-16 xl:mx-24 mb-16 md:mb-20">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 md:max-w-2xl">
            {mobileProjects.map((project, index) => (
              <div key={project.slug} className="grid-card">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
