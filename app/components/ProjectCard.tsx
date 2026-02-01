"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/app/data/projects";
import { useLanguage } from "@/app/i18n/LanguageContext";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { t } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const projectTranslations = t.projectData[project.slug as keyof typeof t.projectData];

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-300 transition-all duration-700 group-hover:scale-105">
            <div className="text-center">
              <div className="text-5xl font-light text-neutral-400" style={{ fontFamily: "var(--font-display)" }}>
                {project.title.charAt(0)}
              </div>
              <p className="mt-2 text-xs text-neutral-400 tracking-widest uppercase">{project.title}</p>
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
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/40" />

        {/* Tech Stack Tags */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-light tracking-wider text-neutral-800 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links - Using buttons to avoid nested <a> */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
          {project.githubUrl && (
            <button
              onClick={(e) => handleExternalLink(e, project.githubUrl!)}
              className="flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm transition-colors hover:bg-white"
              aria-label="View on GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </button>
          )}
          {project.liveUrl && (
            <button
              onClick={(e) => handleExternalLink(e, project.liveUrl!)}
              className="flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm transition-colors hover:bg-white"
              aria-label="View live site"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          )}
        </div>

        {/* View Project Button - Desktop */}
        <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100 pointer-events-none">
          <span
            className="border border-white px-5 py-2.5 text-xs font-light tracking-[0.3em] text-white uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {t.projects.viewProject}
          </span>
        </div>
      </div>

      {/* Text Content */}
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-[10px] font-light tracking-[0.2em] text-neutral-400 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {project.year}
          </span>
          <span className="text-neutral-300">•</span>
          <span
            className="text-[10px] font-light tracking-[0.2em] text-neutral-400 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {project.type === "mobile" ? "Mobile" : "Web"}
          </span>
        </div>
        <h3
          className="text-lg font-light tracking-wide transition-all duration-300 group-hover:tracking-wider"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.title}
        </h3>
        <p
          className="mt-1.5 text-sm font-light text-neutral-500 line-clamp-2 transition-colors duration-300 group-hover:text-neutral-700"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {projectTranslations?.shortDescription || project.shortDescription}
        </p>
      </div>
    </Link>
  );
}
