"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { projects } from "@/app/data/projects";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import PillButton from "./PillButton";

// Clients = every non-personal project
const CLIENTS = projects
  .filter((p) => p.projectType !== "personal")
  .map((p) => p.title.replace(/^Portfolio\s+/i, ""));

// Generic glyphs standing in for client logos
const GLYPHS = [
  <svg key="ring" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="3.5" /></svg>,
  <svg key="hourglass" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden><path d="M4 3h16l-8 9 8 9H4l8-9z" fill="currentColor" /></svg>,
  <svg key="half" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="2.5" /><path d="M12 2.5a9.5 9.5 0 0 0 0 19z" fill="currentColor" /></svg>,
  <svg key="double" viewBox="0 0 32 24" className="h-6 w-8" aria-hidden><circle cx="10" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="3" /><circle cx="22" cy="12" r="9" fill="currentColor" /></svg>,
];

export default function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          card,
          { clipPath: "inset(6% 4% 6% 4% round 40px)" },
          { clipPath: "inset(0% 0% 0% 0% round 40px)", duration: 1.2, ease: "power4.inOut", clearProps: "clipPath" }
        )
          .fromTo(portraitRef.current, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "power2.out" }, 0)
          .fromTo(".hero-greeting", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
          .fromTo(".hero-line", { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.12, ease: "power4.out" }, 0.65)
          .fromTo(".hero-side > *", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.9)
          .fromTo(".hero-service", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 1.05)
          .fromTo(".hero-band", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.1);

        // Scroll: portrait drifts slower than the page, content lifts and fades
        const scroll = { trigger: card, start: "top top", end: "bottom top", scrub: true };
        gsap.to(parallaxRef.current, { yPercent: 6, ease: "none", scrollTrigger: scroll });
        gsap.to(contentRef.current, { y: -80, opacity: 0.15, ease: "none", scrollTrigger: scroll });
      });
    },
    { scope: sectionRef }
  );

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    gsap.to(window, { scrollTo: { y: "#projets", offsetY: 72 }, duration: 1, ease: "power2.inOut" });
  };

  return (
    <section ref={sectionRef} className="relative bg-white p-2 md:p-3">
      {/* Ink card */}
      <div
        ref={cardRef}
        data-dark
        className="relative flex bg-ink min-h-[calc(100svh-1rem)] flex-col overflow-hidden rounded-[2rem] md:min-h-[calc(100svh-1.5rem)] md:rounded-[2.5rem]"
      >
        {/* Duotone portrait: B&W photo darkened by an ink layer, blended inside the masked group */}
        <div
          ref={parallaxRef}
          className="hero-portrait pointer-events-none absolute inset-x-0 -top-[8%] h-[116%] md:left-[26%] md:right-auto md:w-[48vw] lg:left-[28%] lg:w-[44vw]"
        >
          <div ref={portraitRef} className="absolute inset-0 isolate">
            <Image
              src="/images/portrait.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 48vw"
              className="duotone object-cover object-[50%_20%]"
            />
            <div className="absolute inset-0 bg-ink/45 mix-blend-multiply" aria-hidden />
          </div>
        </div>

        {/* Readability veils */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-ink/25 md:hidden" aria-hidden />

        {/* Content */}
        <div
          ref={contentRef}
          className="relative z-10 flex flex-1 flex-col px-4 pt-28 pb-8 md:px-9 md:pt-36 md:pb-12 lg:px-13 xl:px-21"
        >
          <div className="grid flex-1 items-center gap-10 md:grid-cols-12">
            {/* Title */}
            <div className="md:col-span-7">
              <p
                className="hero-greeting mb-4 text-xl font-semibold text-white md:text-2xl lg:text-3xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.hero.greeting}
              </p>
              <h1
                className="text-[clamp(3rem,12vw,8rem)] md:text-[clamp(3rem,8.2vw,8rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="block overflow-x-visible overflow-y-clip pb-[0.06em]">
                  <span className="hero-line block">{t.hero.titleLine1}</span>
                </span>
                <span className="block overflow-x-visible overflow-y-clip pb-[0.06em]">
                  <span className="hero-line block">{t.hero.titleLine2}</span>
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <div className="hero-side md:col-span-4 md:col-start-9 md:self-center">
              <h2
                className="text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.hero.tagline}
              </h2>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-white/70" style={{ fontFamily: "var(--font-body)" }}>
                {t.hero.description}
              </p>
              <div className="mt-7">
                <PillButton href="#projets" onClick={scrollToProjects}>
                  {t.hero.cta.projects}
                </PillButton>
              </div>
            </div>
          </div>

          {/* Services */}
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 md:mt-16 md:grid-cols-4">
            {t.hero.services.map((service, i) => (
              <li key={service} className="hero-service">
                <span className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                  <span className="text-accent">#</span>0{i + 1}
                </span>
                <p className="mt-2 text-sm text-white/80 md:text-base" style={{ fontFamily: "var(--font-body)" }}>
                  {service}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Clients band */}
      <div className="hero-band mt-2 flex flex-col gap-6 overflow-hidden rounded-[2rem] border border-ink/10 bg-white px-4 py-8 md:mt-3 md:flex-row md:items-center md:gap-12 md:rounded-[2.5rem] md:px-9 md:py-10 lg:px-13 xl:px-21">
        <p
          className="shrink-0 text-sm font-semibold leading-snug text-ink md:w-36"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t.hero.trustedBy}
        </p>
        <div
          className="relative min-w-0 flex-1 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <ul className="animate-scroll flex w-max items-center gap-14 pr-14">
            {[...CLIENTS, ...CLIENTS].map((name, i) => (
              <li
                key={`${name}-${i}`}
                aria-hidden={i >= CLIENTS.length}
                className="flex shrink-0 items-center gap-3 text-2xl font-bold tracking-tight text-ink/80"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-ink/30">{GLYPHS[i % GLYPHS.length]}</span>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
