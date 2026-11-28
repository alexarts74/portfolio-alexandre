"use client";

import Image from "next/image";
import { useState } from "react";
import { projectTypeLabels, type Project } from "@/app/data/projects";
import Link from "next/link";
import { useLanguage } from "@/app/i18n/LanguageContext";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t, locale } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const projectTranslations = t.projectData[project.slug as keyof typeof t.projectData];
  const isMobile = project.type === "mobile";

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const imageContent = imageError ? (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-300">
      <div className="text-center">
        <div
          className="text-4xl font-light text-neutral-400"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.title.charAt(0)}
        </div>
      </div>
    </div>
  ) : (
    <Image
      src={project.image}
      alt={project.title}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover transition-transform duration-700 group-hover:scale-105"
      onError={() => setImageError(true)}
    />
  );

  return (
    <Link href={`/projects/${project.slug}`} className="group block" data-cursor-project>
      {/* Cover */}
      <div className="relative">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink/5">
          {imageContent}
          <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
        </div>

        {/* External links */}
        <div className="absolute right-3 top-3 z-10 flex gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
          {project.githubUrl && (
            <button
              onClick={(e) => handleExternalLink(e, project.githubUrl!)}
              className="flex items-center justify-center w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full transition-colors hover:bg-white shadow-sm"
              aria-label="View on GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </button>
          )}
          {project.liveUrl && (
            <button
              onClick={(e) => handleExternalLink(e, project.liveUrl!)}
              className="flex items-center justify-center w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full transition-colors hover:bg-white shadow-sm"
              aria-label="View live site"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Text Content */}
      <div className="mt-5">
        <div className="flex items-center gap-2 mb-2">
          {/* Type badge */}
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-ink/[0.05] text-ink/70"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {isMobile ? (
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <line x1="12" y1="18" x2="12" y2="18.01" />
              </svg>
            ) : (
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            )}
            {isMobile ? "Mobile" : "Web"}
          </span>
          <span className="text-neutral-300">·</span>
          <span
            className="text-xs text-neutral-500"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {project.year}
          </span>
          <span className="text-neutral-300">·</span>
          <span
            className="text-xs text-neutral-500"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {projectTypeLabels[locale][project.projectType]}
          </span>
        </div>
        <h3
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.title}
          <svg className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.25} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
          </svg>
        </h3>
        <p
          className="mt-1.5 text-sm text-neutral-500 line-clamp-2 transition-colors duration-300 group-hover:text-neutral-700"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {projectTranslations?.shortDescription || project.shortDescription}
        </p>

        {/* Tech tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-[11px] text-neutral-500 border border-ink/10 rounded-full transition-colors duration-300 group-hover:border-ink/20 group-hover:text-ink"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
