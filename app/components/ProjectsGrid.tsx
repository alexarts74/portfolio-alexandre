"use client";

import { useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import ProjectsRibbon from "./ProjectsRibbon";

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
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bigNumberRef = useRef<HTMLDivElement>(null);
  const zoomSectionRef = useRef<HTMLDivElement>(null);
  const titleZoomRef = useRef<HTMLHeadingElement>(null);

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
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="tous-les-projets" className="w-full scroll-mt-20">
      {/* Header Section — pinned zoom */}
      <div ref={zoomSectionRef} className="bg-white relative h-screen overflow-hidden flex items-center">
        <div
          ref={bigNumberRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] md:text-[28rem] lg:text-[35rem] font-extrabold tracking-tighter text-ink/[0.04] leading-none pointer-events-none select-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          02
        </div>

        <div ref={headerRef} className="relative w-full flex flex-col items-center text-center">
          <div className="section-badge mb-6">
            <span
              className="inline-block rounded-full border border-ink/15 bg-ink/[0.03] px-4 py-2 text-xs font-semibold text-ink backdrop-blur-sm"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.projects.section}
            </span>
          </div>

          <h2
            ref={titleZoomRef}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1] tracking-[-0.03em] text-ink origin-center"
            style={{ fontFamily: "var(--font-display)", willChange: "transform" }}
          >
            <SplitChars text={t.projects.title} />
            <br />
            <span className="text-ink/30">
              <SplitChars text={t.projects.titleItalic} />
            </span>
          </h2>

          <div className="section-line mt-10 h-1 w-16 rounded-full bg-accent origin-center mx-auto" />
        </div>
      </div>

      {/* All projects: 3D ribbon */}
      <ProjectsRibbon />
    </section>
  );
}
