"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/app/data/projects";
import { useLanguage } from "@/app/i18n/LanguageContext";
import ProjectGallery from "./ProjectGallery";
import LanguageSwitcher from "./LanguageSwitcher";

interface ProjectDetailProps {
  project: Project;
  nextProject: Project;
}

export default function ProjectDetail({ project, nextProject }: ProjectDetailProps) {
  const { t, locale } = useLanguage();
  const [heroError, setHeroError] = useState(false);
  const [nextError, setNextError] = useState(false);
  const projectTranslations = t.projectData[project.slug as keyof typeof t.projectData];

  return (
    <>
      {/* Fixed Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
        <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24 flex justify-between items-center py-4">
          <Link
            href="/"
            className="group flex items-center gap-3 text-neutral-600 transition-colors hover:text-black"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform group-hover:-translate-x-1"
            >
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="text-xs font-light tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t.projectDetails.backToProjects}
            </span>
          </Link>
          <LanguageSwitcher className="text-neutral-600" />
        </div>
      </nav>

      <main className="min-h-screen bg-white pt-16">
        {/* Hero Section - Split Layout */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              {/* Left - Project Info */}
              <div className="order-2 lg:order-1 lg:sticky lg:top-32">
                {/* Project Number & Type */}
                <div className="flex items-center gap-4 mb-6">
                  <span
                    className="text-xs font-light tracking-[0.3em] text-neutral-400 uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {project.year}
                  </span>
                  <div className="h-px w-8 bg-neutral-300" />
                  <span
                    className="text-xs font-light tracking-[0.3em] text-neutral-400 uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {project.type === "mobile"
                      ? locale === "en" ? "Mobile" : "Mobile"
                      : locale === "en" ? "Web" : "Web"}
                  </span>
                </div>

                {/* Title */}
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {project.title}
                </h1>

                {/* Short Description */}
                <p
                  className="text-xl md:text-2xl font-light text-neutral-600 leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {projectTranslations?.shortDescription || project.shortDescription}
                </p>

                {/* Links */}
                <div className="flex flex-wrap gap-4 mb-10">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 bg-neutral-900 px-6 py-3 text-sm font-light tracking-wider text-white uppercase transition-all duration-300 hover:bg-neutral-800"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {t.projectDetails.viewLive}
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-neutral-300 px-6 py-3 text-sm font-light tracking-wider text-neutral-700 uppercase transition-all duration-300 hover:border-neutral-900 hover:text-neutral-900"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  )}
                </div>

                {/* Technologies */}
                <div>
                  <h3
                    className="mb-4 text-xs font-light tracking-[0.3em] text-neutral-400 uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {t.projectDetails.technologies}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="border border-neutral-200 px-3 py-1.5 text-xs font-light tracking-wider text-neutral-600"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right - Hero Image */}
              <div className="order-1 lg:order-2">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  {heroError ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
                      <div className="text-center">
                        <div className="text-8xl font-light text-neutral-300" style={{ fontFamily: "var(--font-display)" }}>
                          {project.title.charAt(0)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority
                      onError={() => setHeroError(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Full Description */}
        <section className="py-12 md:py-16 bg-neutral-50">
          <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
            <div className="max-w-3xl">
              <h2
                className="mb-6 text-xs font-light tracking-[0.3em] text-neutral-400 uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {locale === "en" ? "About the project" : "À propos du projet"}
              </h2>
              <p
                className="text-lg md:text-xl font-light leading-relaxed text-neutral-700"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {projectTranslations?.fullDescription || project.fullDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
            <h2
              className="mb-8 text-xs font-light tracking-[0.3em] text-neutral-400 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {locale === "en" ? "Gallery" : "Galerie"}
            </h2>
            <ProjectGallery images={project.images} title={project.title} />
          </div>
        </section>

        {/* Next Project */}
        <section className="border-t border-neutral-200">
          <Link href={`/projects/${nextProject.slug}`} className="group block">
            <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24 py-16 md:py-20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Text */}
                <div>
                  <span
                    className="text-xs font-light tracking-[0.3em] text-neutral-400 uppercase mb-4 block"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {locale === "en" ? "Next project" : "Projet suivant"}
                  </span>
                  <h2
                    className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight transition-all duration-300 group-hover:tracking-wide"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {nextProject.title}
                  </h2>
                  <div className="mt-6 flex items-center gap-2 text-neutral-600 transition-colors group-hover:text-black">
                    <span
                      className="text-sm font-light tracking-wider uppercase"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {t.projects.viewProject}
                    </span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  {nextError ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 transition-all duration-500 group-hover:scale-105">
                      <div className="text-5xl font-light text-neutral-300" style={{ fontFamily: "var(--font-display)" }}>
                        {nextProject.title.charAt(0)}
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={nextProject.image}
                      alt={nextProject.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                      onError={() => setNextError(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </Link>
        </section>
      </main>
    </>
  );
}
