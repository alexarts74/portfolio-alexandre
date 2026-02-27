"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { projects } from "@/app/data/projects";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import ProjectCard from "./ProjectCard";

function FeaturedProject({ project }: { project: typeof projects[0] }) {
  const { t, locale } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const projectTranslations = t.projectData[project.slug as keyof typeof t.projectData];

  const getProjectTypeLabel = (projectType: string) => {
    if (locale === "fr") {
      switch (projectType) {
        case "professional":
          return "CDI Professionnel";
        case "freelance":
          return "Freelance";
        case "personal":
          return "Personnel";
        default:
          return projectType;
      }
    } else {
      switch (projectType) {
        case "professional":
          return "Professional";
        case "freelance":
          return "Freelance";
        case "personal":
          return "Personal";
        default:
          return projectType;
      }
    }
  };

  return (
    <Link href={`/projects/${project.slug}`} className="group block" data-cursor-project>
      <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
        {/* Image */}
        <div className="featured-image relative aspect-[4/3] md:aspect-[3/2] w-full overflow-hidden bg-neutral-200">
          {imageError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-300 transition-all duration-700 group-hover:scale-105">
              <div className="text-center">
                <div className="text-6xl font-light text-neutral-400" style={{ fontFamily: "var(--font-display)" }}>
                  {project.title.charAt(0)}
                </div>
              </div>
            </div>
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          )}
          <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/20" />

          {/* Featured Badge */}
          <div className="absolute top-4 left-4">
            <span
              className="bg-black text-white px-3 py-1.5 text-[10px] font-light tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {locale === "en" ? "Featured" : "À la une"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="featured-content flex flex-col justify-center">
          <span
            className="text-xs font-light tracking-[0.3em] text-neutral-400 uppercase mb-3"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {project.year} — {project.type === "mobile" ? "Mobile" : "Web"} — {getProjectTypeLabel(project.projectType)}
          </span>
          <h3
            className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide transition-all duration-300 group-hover:tracking-wider"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.title}
          </h3>
          <p
            className="mt-4 text-base font-light text-neutral-500 leading-relaxed transition-colors duration-300 group-hover:text-neutral-700"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {projectTranslations?.shortDescription || project.shortDescription}
          </p>

          {/* Technologies */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="border border-neutral-200 px-2.5 py-1 text-[10px] font-light tracking-wider text-neutral-500 uppercase transition-colors duration-300 group-hover:border-neutral-400 group-hover:text-neutral-700"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-6">
            <span
              className="inline-flex items-center gap-2 text-sm font-light tracking-wider text-neutral-900 uppercase transition-all duration-300 group-hover:gap-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t.projects.viewProject}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

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

export default function ProjectsGrid() {
  const { t, locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bigNumberRef = useRef<HTMLDivElement>(null);
  const zoomSectionRef = useRef<HTMLDivElement>(null);
  const titleZoomRef = useRef<HTMLHeadingElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileGridRef = useRef<HTMLDivElement>(null);

  const featuredProject = projects[0];
  const allOtherProjects = projects.slice(1);
  const mobileProjects = allOtherProjects
    .filter(p => p.type === "mobile")
    .sort((a, b) => parseInt(b.year) - parseInt(a.year));
  const webProjects = allOtherProjects
    .filter(p => p.type === "web")
    .sort((a, b) => parseInt(b.year) - parseInt(a.year));

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
              end: "+=200%",
              pin: true,
              scrub: 0.5,
              anticipatePin: 1,
            },
          });

          // Phase 1: Entrance (0-20%)
          tl.fromTo(badge, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.08 }, 0);
          tl.fromTo(titleZoomRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.1, ease: "power3.out" }, 0.02);
          tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.08, ease: "power2.out" }, 0.06);
          if (bigNum) {
            tl.fromTo(bigNum, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.1 }, 0);
          }

          // Phase 2: Hold (20-30%) — pause to read

          // Phase 3: Zoom (30-70%)
          tl.to(titleZoomRef.current, { scale: 4, duration: 0.4, ease: "power2.in" }, 0.3);
          tl.to(badge, { opacity: 0, duration: 0.15 }, 0.3);
          tl.to(line, { opacity: 0, duration: 0.15 }, 0.3);
          if (bigNum) {
            tl.to(bigNum, { opacity: 0, duration: 0.15 }, 0.3);
          }

          // Phase 4: Letters scatter (70-100%)
          tl.to(chars, {
            x: () => gsap.utils.random(-60, 60),
            y: () => gsap.utils.random(-50, 50),
            rotation: () => gsap.utils.random(-15, 15),
            opacity: 0,
            duration: 0.3,
            stagger: { each: 0.005, from: "center" },
            ease: "power2.out",
          }, 0.7);
        });

        mm.add("(max-width: 767px)", () => {
          const chars = titleZoomRef.current!.querySelectorAll(".zoom-char");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: zoomSectionRef.current,
              start: "top top",
              end: "+=150%",
              pin: true,
              scrub: 0.5,
              anticipatePin: 1,
            },
          });

          // Phase 1: Entrance (0-20%)
          tl.fromTo(badge, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.08 }, 0);
          tl.fromTo(titleZoomRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.1, ease: "power3.out" }, 0.02);
          tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.08, ease: "power2.out" }, 0.06);
          if (bigNum) {
            tl.fromTo(bigNum, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.1 }, 0);
          }

          // Phase 3: Zoom (30-70%)
          tl.to(titleZoomRef.current, { scale: 3, duration: 0.4, ease: "power2.in" }, 0.3);
          tl.to(badge, { opacity: 0, duration: 0.15 }, 0.3);
          tl.to(line, { opacity: 0, duration: 0.15 }, 0.3);
          if (bigNum) {
            tl.to(bigNum, { opacity: 0, duration: 0.15 }, 0.3);
          }

          // Phase 4: Letters scatter (70-100%)
          tl.to(chars, {
            x: () => gsap.utils.random(-40, 40),
            y: () => gsap.utils.random(-35, 35),
            rotation: () => gsap.utils.random(-15, 15),
            opacity: 0,
            duration: 0.3,
            stagger: { each: 0.005, from: "center" },
            ease: "power2.out",
          }, 0.7);
        });
      }

      // --- Featured project reveal ---
      if (featuredRef.current) {
        const featuredImage = featuredRef.current.querySelector(".featured-image");
        const featuredContent = featuredRef.current.querySelector(".featured-content");

        const featuredTl = gsap.timeline({
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        if (featuredImage) {
          featuredTl.fromTo(
            featuredImage,
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power3.inOut" }
          );
        }

        if (featuredContent) {
          featuredTl.fromTo(
            featuredContent,
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
            "-=0.5"
          );
        }
      }

      // --- Desktop: horizontal scroll ---
      mm.add("(min-width: 768px)", () => {
        if (!horizontalRef.current || !trackRef.current) return;

        const track = trackRef.current;
        const cards = track.querySelectorAll(".h-scroll-card");

        // Calculate total scroll distance
        const getScrollWidth = () => track.scrollWidth - window.innerWidth;

        const scrollTween = gsap.to(track, {
          x: () => -getScrollWidth(),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${getScrollWidth()}`,
            invalidateOnRefresh: true,
          },
        });

        // Animate each card as it enters
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

        // Labels in the track
        const labels = track.querySelectorAll(".h-scroll-label");
        labels.forEach((label) => {
          gsap.fromTo(
            label,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              scrollTrigger: {
                trigger: label,
                containerAnimation: scrollTween,
                start: "left 85%",
                end: "left 65%",
                scrub: true,
              },
            }
          );
        });

        return () => {
          scrollTween.kill();
          ScrollTrigger.getAll().forEach(st => {
            if (st.vars.containerAnimation === scrollTween) st.kill();
          });
        };
      });

      // --- Mobile: vertical staggered fade-in ---
      mm.add("(max-width: 767px)", () => {
        if (!mobileGridRef.current) return;

        const cards = mobileGridRef.current.querySelectorAll(".mobile-card");
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
              trigger: mobileGridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="projets" className="w-full scroll-mt-20">
      {/* Dark Header Section — pinned zoom */}
      <div ref={zoomSectionRef} className="relative bg-black h-screen overflow-hidden flex items-center">
        {/* Background Large Number */}
        <div
          ref={bigNumberRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] md:text-[28rem] lg:text-[35rem] font-light text-white/[0.03] leading-none pointer-events-none select-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          02
        </div>

        <div ref={headerRef} className="relative w-full flex flex-col items-center text-center">
          {/* Section Label */}
          <div className="section-badge mb-6">
            <span
              className="inline-block border border-white/20 px-4 py-2 text-[10px] font-light tracking-[0.3em] text-white/60 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t.projects.section}
            </span>
          </div>

          {/* Title */}
          <h2
            ref={titleZoomRef}
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight text-white origin-center"
            style={{ fontFamily: "var(--font-display)", willChange: "transform" }}
          >
            <SplitChars text={t.projects.title} />
            <br />
            <span className="italic text-white/40">
              <SplitChars text={t.projects.titleItalic} />
            </span>
          </h2>

          {/* Decorative line */}
          <div className="section-line mt-10 h-px w-24 bg-white/30 origin-center mx-auto" />
        </div>
      </div>

      {/* Projects Content */}
      <div className="bg-neutral-50 py-16 md:py-20 lg:py-24">
        <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
          {/* Featured Project */}
          <div ref={featuredRef} className="mb-16 md:mb-20">
            <FeaturedProject project={featuredProject} />
          </div>

          {/* Divider */}
          <div className="mb-12 md:mb-16 flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-200" />
            <span
              className="text-xs font-light tracking-[0.3em] text-neutral-400 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t.projects.more || "More Projects"}
            </span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>
        </div>

        {/* Desktop: Horizontal Scroll Section */}
        <div ref={horizontalRef} className="hidden md:flex items-center h-screen overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-center gap-8 px-6 md:px-12 lg:px-16 xl:px-24"
          >
            {/* Mobile Projects Label */}
            {mobileProjects.length > 0 && (
              <div className="h-scroll-label shrink-0 flex items-center self-center">
                <span
                  className="text-sm font-light tracking-[0.2em] text-neutral-400 uppercase"
                  style={{
                    fontFamily: "var(--font-display)",
                    writingMode: "vertical-lr",
                    transform: "rotate(180deg)",
                  }}
                >
                  {locale === "fr" ? "Projets mobiles" : "Mobile Projects"}
                </span>
              </div>
            )}

            {/* Mobile Project Cards */}
            {mobileProjects.map((project, index) => (
              <div key={project.slug} className="h-scroll-card shrink-0 w-[230px] lg:w-[250px]">
                <ProjectCard project={project} index={index + 1} />
              </div>
            ))}

            {/* Web Projects Label */}
            {webProjects.length > 0 && (
              <div className="h-scroll-label shrink-0 flex items-center self-center ml-4">
                <span
                  className="text-sm font-light tracking-[0.2em] text-neutral-400 uppercase"
                  style={{
                    fontFamily: "var(--font-display)",
                    writingMode: "vertical-lr",
                    transform: "rotate(180deg)",
                  }}
                >
                  {locale === "fr" ? "Projets web" : "Web Projects"}
                </span>
              </div>
            )}

            {/* Web Project Cards */}
            {webProjects.map((project, index) => (
              <div key={project.slug} className="h-scroll-card shrink-0 w-[380px] lg:w-[420px]">
                <ProjectCard project={project} index={index + mobileProjects.length + 1} />
              </div>
            ))}

            {/* Spacer to ensure last card is visible */}
            <div className="shrink-0 w-24" />
          </div>
        </div>

        {/* Mobile: Vertical Grid */}
        <div ref={mobileGridRef} className="md:hidden mx-6">
          {/* Mobile Projects */}
          {mobileProjects.length > 0 && (
            <div className="mb-12">
              <h3
                className="mb-6 text-xl font-light tracking-wide text-neutral-700"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {locale === "fr" ? "Projets" : "Projects"}{" "}
                <span className="italic text-neutral-400">
                  {locale === "fr" ? "mobiles" : "mobile"}
                </span>
              </h3>
              <div className="grid gap-8">
                {mobileProjects.map((project, index) => (
                  <div key={project.slug} className="mobile-card">
                    <ProjectCard project={project} index={index + 1} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Web Projects */}
          {webProjects.length > 0 && (
            <div>
              <h3
                className="mb-6 text-xl font-light tracking-wide text-neutral-700"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {locale === "fr" ? "Projets" : "Projects"}{" "}
                <span className="italic text-neutral-400">web</span>
              </h3>
              <div className="grid gap-8">
                {webProjects.map((project, index) => (
                  <div key={project.slug} className="mobile-card">
                    <ProjectCard project={project} index={index + mobileProjects.length + 1} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
