"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { projects } from "@/app/data/projects";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { useInView } from "@/app/hooks/useInView";
import ProjectCard from "./ProjectCard";

function FeaturedProject({ project }: { project: typeof projects[0] }) {
  const { t, locale } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const projectTranslations = t.projectData[project.slug as keyof typeof t.projectData];

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
        {/* Image */}
        <div className="relative aspect-[4/3] md:aspect-[3/2] w-full overflow-hidden bg-neutral-200">
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
        <div className="flex flex-col justify-center">
          <span
            className="text-xs font-light tracking-[0.3em] text-neutral-400 uppercase mb-3"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {project.year} — {project.type === "mobile" ? "Mobile" : "Web"}
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

export default function ProjectsGrid() {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useInView({ threshold: 0.1 });
  const { ref: titleRef, isVisible: titleVisible } = useInView({ threshold: 0.1 });
  const { ref: featuredRef, isVisible: featuredVisible } = useInView({ threshold: 0.1 });
  const { ref: gridRef, isVisible: gridVisible } = useInView({ threshold: 0.05 });

  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <section id="projets" className="w-full scroll-mt-20">
      {/* Dark Header Section */}
      <div className="relative bg-black py-20 md:py-28 lg:py-32 overflow-hidden">
        {/* Background Large Number */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] md:text-[28rem] lg:text-[35rem] font-light text-white/[0.03] leading-none pointer-events-none select-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          02
        </div>

        <div className="relative mx-6 md:mx-12 lg:mx-16 xl:mx-24">
          {/* Section Label */}
          <div
            ref={headerRef}
            className={`mb-6 transition-all duration-700 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span
              className="inline-block border border-white/20 px-4 py-2 text-[10px] font-light tracking-[0.3em] text-white/60 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t.projects.section}
            </span>
          </div>

          {/* Title */}
          <div
            ref={titleRef}
            className={`transition-all duration-700 ${
              titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "0.1s" }}
          >
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.projects.title}
              <br />
              <span className="italic text-white/40">{t.projects.titleItalic}</span>
            </h2>
          </div>

          {/* Decorative line */}
          <div
            className={`mt-10 h-px w-24 bg-white/30 transition-all duration-1000 ${
              titleVisible ? "opacity-100 w-24" : "opacity-0 w-0"
            }`}
            style={{ transitionDelay: "0.3s" }}
          />
        </div>
      </div>

      {/* Projects Content */}
      <div className="bg-neutral-50 py-16 md:py-20 lg:py-24">
        <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">

        {/* Featured Project */}
        <div
          ref={featuredRef}
          className={`mb-16 md:mb-20 transition-all duration-700 ${
            featuredVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
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

        {/* Other Projects Grid */}
        <div ref={gridRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {otherProjects.map((project, index) => (
            <div
              key={project.slug}
              className={`transition-all duration-700 ${
                gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${0.1 * index}s` }}
            >
              <ProjectCard project={project} index={index + 1} />
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
