"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import type { Project } from "@/app/data/projects";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
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

  const mainRef = useRef<HTMLElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const mobileMockupsRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const shortDescRef = useRef<HTMLParagraphElement>(null);
  const contextSectionRef = useRef<HTMLDivElement>(null);
  const clientBenefitRef = useRef<HTMLDivElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);
  const technicalSectionRef = useRef<HTMLDivElement>(null);
  const featuresSectionRef = useRef<HTMLElement>(null);
  const nextProjectRef = useRef<HTMLElement>(null);
  const nextProjectImageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!mainRef.current) return;

      const mm = gsap.matchMedia();

      // --- Hero Section ---
      if (project.type === "web") {
        // Web hero parallax
        mm.add("(min-width: 768px)", () => {
          if (heroMediaRef.current && heroSectionRef.current) {
            gsap.fromTo(
              heroMediaRef.current,
              { y: 0 },
              {
                y: 80,
                scrollTrigger: {
                  trigger: heroSectionRef.current,
                  start: "top top",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }
          // Overlay intensifies
          if (heroOverlayRef.current && heroSectionRef.current) {
            gsap.fromTo(
              heroOverlayRef.current,
              { opacity: 0.4 },
              {
                opacity: 0.6,
                scrollTrigger: {
                  trigger: heroSectionRef.current,
                  start: "top top",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }
        });
      } else {
        // Mobile mockups stagger entrance
        if (mobileMockupsRef.current) {
          const mockups = mobileMockupsRef.current.querySelectorAll(".mockup-item");
          gsap.fromTo(
            mockups,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: { each: 0.15, from: "center" },
              ease: "power3.out",
              delay: 0.3,
            }
          );

          // Subtle floating on side mockups
          mm.add("(min-width: 768px)", () => {
            const sideMockups = mobileMockupsRef.current!.querySelectorAll(".mockup-side");
            sideMockups.forEach((mockup, i) => {
              gsap.to(mockup, {
                y: i % 2 === 0 ? -8 : 8,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.3,
              });
            });
          });
        }
      }

      // --- Project Header ---
      const headerTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: project.type === "mobile" ? 0.6 : 0.3,
      });

      // Meta info fade-in + slide-right
      if (metaRef.current) {
        const metaItems = metaRef.current.children;
        headerTl.fromTo(
          metaItems,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 }
        );
      }

      // Title character reveal
      if (titleRef.current) {
        const text = titleRef.current.textContent || "";
        titleRef.current.innerHTML = "";
        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char;
          span.style.display = "inline-block";
          titleRef.current!.appendChild(span);
        });

        const chars = titleRef.current.querySelectorAll("span");
        headerTl.fromTo(
          chars,
          { opacity: 0, rotateX: -90, y: 30 },
          {
            opacity: 1,
            rotateX: 0,
            y: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: "back.out(1.2)",
          },
          "-=0.3"
        );
      }

      // Short description slide-up
      if (shortDescRef.current) {
        headerTl.fromTo(
          shortDescRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );
      }

      // --- Content Sections with ScrollTrigger ---

      // Context section
      if (contextSectionRef.current) {
        const label = contextSectionRef.current.querySelector(".section-label");
        const text = contextSectionRef.current.querySelector(".section-text");
        const techTags = contextSectionRef.current.querySelectorAll(".tech-tag");
        const links = contextSectionRef.current.querySelectorAll(".project-link");

        if (label) {
          gsap.fromTo(
            label,
            { opacity: 0, x: -30, clipPath: "inset(0 100% 0 0)" },
            {
              opacity: 1,
              x: 0,
              clipPath: "inset(0 0% 0 0)",
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: contextSectionRef.current,
                start: "top 80%",
              },
            }
          );
        }
        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: contextSectionRef.current,
                start: "top 75%",
              },
            }
          );
        }
        if (techTags.length) {
          gsap.fromTo(
            techTags,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: contextSectionRef.current,
                start: "top 70%",
              },
            }
          );
        }
        if (links.length) {
          gsap.fromTo(
            links,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: contextSectionRef.current,
                start: "top 65%",
              },
            }
          );
        }
      }

      // Client benefit section
      if (clientBenefitRef.current) {
        const label = clientBenefitRef.current.querySelector(".section-label");
        const text = clientBenefitRef.current.querySelector(".section-text");

        if (label) {
          gsap.fromTo(
            label,
            { opacity: 0, x: -30, clipPath: "inset(0 100% 0 0)" },
            {
              opacity: 1,
              x: 0,
              clipPath: "inset(0 0% 0 0)",
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: clientBenefitRef.current,
                start: "top 80%",
              },
            }
          );
        }
        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: clientBenefitRef.current,
                start: "top 75%",
              },
            }
          );
        }
      }

      // Separator line
      if (separatorRef.current) {
        gsap.fromTo(
          separatorRef.current,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: separatorRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Technical section
      if (technicalSectionRef.current) {
        const label = technicalSectionRef.current.querySelector(".section-label");
        const items = technicalSectionRef.current.querySelectorAll(".tech-item");

        if (label) {
          gsap.fromTo(
            label,
            { opacity: 0, x: -30, clipPath: "inset(0 100% 0 0)" },
            {
              opacity: 1,
              x: 0,
              clipPath: "inset(0 0% 0 0)",
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: technicalSectionRef.current,
                start: "top 80%",
              },
            }
          );
        }
        if (items.length) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: technicalSectionRef.current,
                start: "top 75%",
              },
            }
          );
        }
      }

      // Features section
      if (featuresSectionRef.current) {
        const label = featuresSectionRef.current.querySelector(".section-label");
        const items = featuresSectionRef.current.querySelectorAll(".feature-item");
        const bullets = featuresSectionRef.current.querySelectorAll(".feature-bullet");

        if (label) {
          gsap.fromTo(
            label,
            { opacity: 0, x: -30, clipPath: "inset(0 100% 0 0)" },
            {
              opacity: 1,
              x: 0,
              clipPath: "inset(0 0% 0 0)",
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: featuresSectionRef.current,
                start: "top 80%",
              },
            }
          );
        }
        if (bullets.length) {
          gsap.fromTo(
            bullets,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              stagger: 0.08,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: featuresSectionRef.current,
                start: "top 75%",
              },
            }
          );
        }
        if (items.length) {
          gsap.fromTo(
            items,
            { opacity: 0, x: 20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: featuresSectionRef.current,
                start: "top 75%",
              },
            }
          );
        }
      }

      // --- Next Project Section ---
      if (nextProjectRef.current) {
        const nextLabel = nextProjectRef.current.querySelector(".next-label");
        const nextTitle = nextProjectRef.current.querySelector(".next-title");
        const nextCta = nextProjectRef.current.querySelector(".next-cta");

        if (nextLabel) {
          gsap.fromTo(
            nextLabel,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.5,
              scrollTrigger: {
                trigger: nextProjectRef.current,
                start: "top 80%",
              },
            }
          );
        }
        if (nextTitle) {
          gsap.fromTo(
            nextTitle,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: nextProjectRef.current,
                start: "top 75%",
              },
            }
          );
        }
        if (nextCta) {
          gsap.fromTo(
            nextCta,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: nextProjectRef.current,
                start: "top 70%",
              },
            }
          );
        }
        if (nextProjectImageRef.current) {
          gsap.fromTo(
            nextProjectImageRef.current,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: nextProjectRef.current,
                start: "top 70%",
              },
            }
          );
        }
      }

      // Refresh ScrollTrigger after everything is set up
      ScrollTrigger.refresh();
    },
    { scope: mainRef }
  );

  return (
    <>
      {/* Fixed Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
        <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24 flex justify-between items-center py-4">
          <Link
            href="/#projets"
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

      <main ref={mainRef} className="min-h-screen bg-white">
        {/* Hero Section - Different layout for mobile vs web */}
        {project.type === "mobile" ? (
          /* Mobile Hero - Phone mockups */
          <section ref={heroSectionRef} className="relative py-12 md:py-16 lg:py-20 w-full overflow-hidden bg-gradient-to-b from-neutral-100 to-white">
            <div ref={mobileMockupsRef} className="flex justify-center items-end gap-4 md:gap-6 lg:gap-8 px-6">
              {project.images.slice(0, 3).map((img, index) => (
                <div
                  key={index}
                  className={`mockup-item relative flex-shrink-0 rounded-[2rem] overflow-hidden bg-neutral-900 shadow-2xl ${
                    index === 1
                      ? "w-[180px] md:w-[220px] lg:w-[260px] aspect-[9/19.5] z-10"
                      : "mockup-side w-[140px] md:w-[180px] lg:w-[220px] aspect-[9/19.5] opacity-80 hidden md:block"
                  }`}
                  style={{
                    opacity: 0,
                    boxShadow: index === 1
                      ? "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.1)"
                      : "0 15px 30px -8px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  {/* Phone frame effect */}
                  <div className="absolute inset-0 rounded-[2rem] border border-neutral-700/50 pointer-events-none z-10" />
                  {/* Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 md:w-20 h-5 md:h-6 bg-neutral-900 rounded-full z-20" />
                  <Image
                    src={img}
                    alt={`${project.title} - Screen ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 1}
                  />
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* Web Hero - vidéo ou image + overlay */
          <section ref={heroSectionRef} className="relative w-full overflow-hidden h-[70vh] md:h-[80vh] lg:h-[90vh]">
            {project.video ? (
              <>
                <div ref={heroMediaRef} className="absolute inset-0">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                </div>
                <div ref={heroOverlayRef} className="absolute inset-0 bg-black/40 pointer-events-none" aria-hidden />
              </>
            ) : heroError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
                <div
                  className="text-[20vw] font-light text-neutral-200"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {project.title.charAt(0)}
                </div>
              </div>
            ) : (
              <>
                <div ref={heroMediaRef} className="absolute inset-0">
                  <Image
                    src={project.images?.[0] ?? project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                    onError={() => setHeroError(true)}
                  />
                </div>
                <div ref={heroOverlayRef} className="absolute inset-0 bg-black/40 pointer-events-none" aria-hidden />
              </>
            )}
          </section>
        )}

        {/* Project Header */}
        <section
          className={`relative z-10 ${
            project.type === "mobile"
              ? "-mt-12 md:-mt-16"
              : "-mt-72 md:-mt-80 lg:-mt-88"
          }`}
        >
          <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
            <div className={`max-w-4xl ${project.type === "web" ? "mb-16 md:mb-20 lg:mb-24" : ""}`}>
              {/* Meta info */}
              <div ref={metaRef} className="flex items-center gap-4 mb-6">
                <span
                  className={`text-xs font-light tracking-[0.3em] uppercase ${project.type === "web" ? "text-white/80" : "text-neutral-500"}`}
                  style={{ fontFamily: "var(--font-body)", opacity: 0 }}
                >
                  {project.year}
                </span>
                <div className={`h-px w-8 ${project.type === "web" ? "bg-white/40" : "bg-neutral-300"}`} style={{ opacity: 0 }} />
                <span
                  className={`text-xs font-light tracking-[0.3em] uppercase ${project.type === "web" ? "text-white/80" : "text-neutral-500"}`}
                  style={{ fontFamily: "var(--font-body)", opacity: 0 }}
                >
                  {project.type === "mobile" ? "Mobile" : "Web"}
                </span>
              </div>

              {/* Title */}
              <h1
                ref={titleRef}
                className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight mb-8 ${project.type === "web" ? "text-white" : ""}`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.title}
              </h1>

              {/* Short Description */}
              <p
                ref={shortDescRef}
                className={`text-xl md:text-2xl lg:text-3xl font-light leading-relaxed max-w-2xl ${project.type === "web" ? "text-white/95" : "text-neutral-600"}`}
                style={{ fontFamily: "var(--font-body)", opacity: 0 }}
              >
                {projectTranslations?.shortDescription || project.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content - Editorial Layout */}
        <section className={project.type === "web" ? "pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-24 lg:pb-32" : "py-16 md:py-24 lg:py-32"}>
          <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
            {/* Context + Technologies Row */}
            <div ref={contextSectionRef} className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-20 md:mb-28">
              {/* Context - Takes more space */}
              <div className="lg:col-span-7">
                <h2
                  className="section-label text-sm font-light tracking-[0.2em] text-neutral-400 uppercase mb-6"
                  style={{ fontFamily: "var(--font-body)", opacity: 0 }}
                >
                  {locale === "en" ? "Context" : "Contexte"}
                </h2>
                <p
                  className="section-text text-lg md:text-xl font-light leading-[1.8] text-neutral-700"
                  style={{ fontFamily: "var(--font-body)", opacity: 0 }}
                >
                  {projectTranslations?.context || project.context}
                </p>
              </div>

              {/* Technologies + Links - Sidebar */}
              <div className="lg:col-span-5 lg:pl-8 lg:border-l border-neutral-200">
                <div className="lg:sticky lg:top-32 space-y-10">
                  {/* Technologies */}
                  <div>
                    <h3
                      className="section-label text-sm font-light tracking-[0.2em] text-neutral-400 uppercase mb-4"
                      style={{ fontFamily: "var(--font-body)", opacity: 0 }}
                    >
                      {t.projectDetails.technologies}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="tech-tag bg-neutral-100 px-4 py-2 text-sm font-light tracking-wide text-neutral-700"
                          style={{ fontFamily: "var(--font-body)", opacity: 0 }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  {(project.liveUrl || project.githubUrl) && (
                    <div className="flex flex-wrap gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link group inline-flex items-center gap-2 bg-neutral-900 px-5 py-2.5 text-sm font-light tracking-wider text-white uppercase transition-all duration-300 hover:bg-neutral-800"
                          style={{ fontFamily: "var(--font-body)", opacity: 0 }}
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
                          className="project-link inline-flex items-center gap-2 border border-neutral-300 px-5 py-2.5 text-sm font-light tracking-wider text-neutral-700 uppercase transition-all duration-300 hover:border-neutral-900 hover:text-neutral-900"
                          style={{ fontFamily: "var(--font-body)", opacity: 0 }}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Client Benefit */}
            <div ref={clientBenefitRef} className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-20 md:mb-28">
              <div className="lg:col-span-4">
                <h2
                  className="section-label text-sm font-light tracking-[0.2em] text-neutral-400 uppercase mb-2 lg:sticky lg:top-32"
                  style={{ fontFamily: "var(--font-body)", opacity: 0 }}
                >
                  {t.projectDetails.clientBenefit}
                </h2>
              </div>
              <div className="lg:col-span-8">
                <p
                  className="section-text text-lg md:text-xl font-light leading-[1.8] text-neutral-700"
                  style={{ fontFamily: "var(--font-body)", opacity: 0 }}
                >
                  {projectTranslations?.clientBenefit || project.clientBenefit}
                </p>
              </div>
            </div>

            {/* Separator */}
            <div
              ref={separatorRef}
              className="w-24 h-px bg-neutral-200 mb-20 md:mb-28"
              style={{ transform: "scaleX(0)", transformOrigin: "left" }}
            />

            {/* Missions */}
            <div ref={technicalSectionRef} className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-20 md:mb-28">
              <div className="lg:col-span-4">
                <h2
                  className="section-label text-sm font-light tracking-[0.2em] text-neutral-400 uppercase mb-2 lg:sticky lg:top-32"
                  style={{ fontFamily: "var(--font-body)", opacity: 0 }}
                >
                  {locale === "en" ? "Technical" : "Technique"}
                </h2>
              </div>
              <div className="lg:col-span-8">
                <ul className="space-y-6">
                  {(projectTranslations?.technical || project.technical).map((item, index) => (
                    <li
                      key={index}
                      className="tech-item flex items-baseline gap-6 group"
                      style={{ opacity: 0 }}
                    >
                      <span
                        className="flex-shrink-0 text-2xl md:text-3xl font-light text-neutral-300 tabular-nums"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p
                        className="text-base md:text-lg font-light leading-relaxed text-neutral-700 group-hover:text-neutral-900 transition-colors"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* Learnings */}
        <section ref={featuresSectionRef} className="py-16 md:py-24">
          <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <h2
                  className="section-label text-sm font-light tracking-[0.2em] text-neutral-400 uppercase mb-2 lg:sticky lg:top-32"
                  style={{ fontFamily: "var(--font-body)", opacity: 0 }}
                >
                  {locale === "en" ? "Features" : "Fonctionnalités"}
                </h2>
              </div>
              <div className="lg:col-span-8">
                <ul className="space-y-6">
                  {(projectTranslations?.features || project.features).map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 group"
                    >
                      <span className="feature-bullet flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-neutral-300 group-hover:bg-neutral-900 transition-colors" style={{ transform: "scale(0)" }} />
                      <p
                        className="feature-item text-base md:text-lg font-light leading-relaxed text-neutral-600 group-hover:text-neutral-800 transition-colors"
                        style={{ fontFamily: "var(--font-body)", opacity: 0 }}
                      >
                        {feature}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
            <h2
              className="text-sm font-light tracking-[0.2em] text-neutral-400 uppercase mb-10"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {locale === "en" ? "Gallery" : "Galerie"}
            </h2>
            <ProjectGallery
              images={
                [
                  ...(
                    project.type === "web"
                      ? (project.images.length > 1 ? project.images.slice(1) : project.images)
                      : project.images
                  )
                ].reverse()
              }
              title={project.title}
              isMobile={project.type === "mobile"}
            />
          </div>
        </section>

        {/* Next Project */}
        <section ref={nextProjectRef} className="bg-neutral-900">
          <Link href={`/projects/${nextProject.slug}`} className="group block">
            <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24 py-12 md:py-16">
              <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-center">
                {/* Text */}
                <div>
                  <span
                    className="next-label text-xs font-light tracking-[0.3em] text-neutral-500 uppercase mb-3 block"
                    style={{ fontFamily: "var(--font-body)", opacity: 0 }}
                  >
                    {locale === "en" ? "Next project" : "Projet suivant"}
                  </span>
                  <h2
                    className="next-title text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white transition-all duration-500 group-hover:tracking-wide"
                    style={{ fontFamily: "var(--font-display)", opacity: 0 }}
                  >
                    {nextProject.title}
                  </h2>
                  <div className="next-cta mt-5 flex items-center gap-3 text-neutral-500 transition-colors group-hover:text-white" style={{ opacity: 0 }}>
                    <span
                      className="text-sm font-light tracking-wider uppercase"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {t.projects.viewProject}
                    </span>
                    <svg
                      className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Image */}
                <div
                  ref={nextProjectImageRef}
                  className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-800"
                  style={{ clipPath: "inset(0 100% 0 0)" }}
                >
                  {nextError ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-700 transition-all duration-500 group-hover:scale-105">
                      <div className="text-5xl font-light text-neutral-600" style={{ fontFamily: "var(--font-display)" }}>
                        {nextProject.title.charAt(0)}
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={nextProject.image}
                      alt={nextProject.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
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
