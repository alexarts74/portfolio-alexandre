"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import { projects } from "@/app/data/projects";
import { useLanguage } from "@/app/i18n/LanguageContext";

export default function FeaturedProject() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const featuredProject = projects.find((p) => p.featured);
  if (!featuredProject) return null;

  const projectTranslations = t.projectData[featuredProject.slug as keyof typeof t.projectData];
  const shortDesc = projectTranslations?.shortDescription || featuredProject.shortDescription;
  const displayedFeatures = (projectTranslations?.features || featuredProject.features).slice(0, 4);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const badge = sectionRef.current.querySelector(".featured-badge");
      const title = sectionRef.current.querySelector(".featured-title");
      const desc = sectionRef.current.querySelector(".featured-desc");
      const features = sectionRef.current.querySelectorAll(".featured-feature");
      const techBadges = sectionRef.current.querySelectorAll(".featured-tech");
      const cta = sectionRef.current.querySelector(".featured-cta");
      const browserMock = sectionRef.current.querySelector(".featured-browser");
      const phoneMock = sectionRef.current.querySelector(".featured-phone");

      const trigger = { trigger: sectionRef.current, start: "top 75%" };

      gsap.fromTo(
        [badge, title, desc],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out", scrollTrigger: trigger }
      );

      gsap.fromTo(
        features,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );

      gsap.fromTo(
        techBadges,
        { opacity: 0, x: -15 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        }
      );

      if (cta) {
        gsap.fromTo(
          cta,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 55%" },
          }
        );
      }

      if (browserMock) {
        gsap.fromTo(
          browserMock,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      }

      if (phoneMock) {
        gsap.fromTo(
          phoneMock,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="projets" data-section="featuredproject" className="bg-black text-white py-24 md:py-32 overflow-hidden scroll-mt-20">
      <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 lg:gap-20 items-center">

          {/* Left column — content */}
          <div className="md:col-span-5 flex flex-col">
            {/* Badge row */}
            <div className="featured-badge mb-8 flex items-center gap-3 flex-wrap">
              <span
                className="inline-block border border-white/20 px-3 py-1.5 text-[10px] font-light tracking-[0.3em] text-white/60 uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t.projects.featured}
              </span>
              <span
                className="text-[10px] font-light tracking-[0.2em] text-white/30 uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                SaaS · {featuredProject.year}
              </span>
            </div>

            {/* Title */}
            <h2
              className="featured-title text-5xl md:text-6xl lg:text-7xl font-light leading-none tracking-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {featuredProject.title}
            </h2>

            {/* Short description */}
            <p
              className="featured-desc text-base font-light text-white/55 leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {shortDesc}
            </p>

            {/* Features */}
            <ul className="mb-10 space-y-3">
              {displayedFeatures.map((feature, i) => (
                <li key={i} className="featured-feature flex items-start gap-3">
                  <span className="mt-[7px] w-1 h-1 rounded-full bg-white/40 shrink-0" />
                  <span
                    className="text-sm font-light text-white/65 leading-snug"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Tech badges */}
            <div className="mb-10 flex flex-wrap gap-2">
              {featuredProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="featured-tech px-3 py-1 text-[10px] font-light tracking-wider text-white/45 uppercase border border-white/15 rounded-full"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={`/projects/${featuredProject.slug}`}
              className="featured-cta inline-flex items-center gap-3 group w-fit"
            >
              <span
                className="text-sm font-light tracking-[0.15em] text-white/70 uppercase transition-colors duration-300 group-hover:text-white"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t.projects.viewProject}
              </span>
              <span className="w-8 h-px bg-white/35 transition-all duration-300 group-hover:w-12 group-hover:bg-white" />
              <svg
                className="w-3.5 h-3.5 text-white/45 transition-colors duration-300 group-hover:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Right column — mockups */}
          <div className="md:col-span-7">
            <div className="flex items-end gap-4 md:gap-6">
              {/* Browser frame (web screenshot) */}
              <div className="featured-browser flex-1 relative">
                {/* Browser chrome */}
                <div className="rounded-t-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  </div>
                  <div className="flex-1 ml-2 h-5 rounded-md bg-white/[0.06] border border-white/10" />
                </div>
                {/* Screenshot area */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-b-xl border border-white/10 border-t-0 bg-neutral-900">
                  <Image
                    src={featuredProject.images[0]}
                    alt={`${featuredProject.title} dashboard`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 55vw"
                  />
                </div>
              </div>

              {/* Phone frame (mobile screenshot) */}
              <div className="featured-phone w-[80px] md:w-[100px] lg:w-[120px] shrink-0 mb-4 md:mb-6">
                <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] border-2 border-white/15 bg-neutral-900">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-black rounded-b-lg z-10" />
                  <Image
                    src={featuredProject.images[3]}
                    alt={`${featuredProject.title} mobile`}
                    fill
                    className="object-cover object-top"
                    sizes="120px"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
