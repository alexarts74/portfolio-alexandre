"use client";

import { useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";

const skillCategories = [
  {
    key: "frontend",
    skills: ["React", "TypeScript", "Angular", "Svelte", "Tailwind CSS", "Next.js"],
  },
  {
    key: "backend",
    skills: ["Node.js", "Ruby", "Python", "SQL", "PostgreSQL", "MongoDB"],
  },
  {
    key: "ai",
    label: "AI & LLM",
    skills: ["Claude Code", "Claude API", "OpenAI", "Prompt Engineering", "RAG"],
    highlight: true,
  },
  {
    key: "devops",
    skills: ["Git", "Docker", "GitHub Actions", "Scaleway", "Render", "Vercel"],
  },
  {
    key: "tools",
    skills: ["Figma", "Webflow", "Notion", "VS Code", "Cursor", "Linear"],
  },
];

export default function Skills() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headerLeftRef = useRef<HTMLSpanElement>(null);
  const headerRightRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const getLabel = (key: string, label?: string) => {
    if (label) return label;
    const categories = t.skills.categories as Record<string, string>;
    return categories[key] || key;
  };

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // --- Header animation ---
      // Use fromTo to guarantee correct initial+end states after pinned sections
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      if (headerLeftRef.current) {
        headerTl.fromTo(
          headerLeftRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5 }
        );
      }

      if (lineRef.current) {
        headerTl.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power2.out" },
          "-=0.3"
        );
      }

      if (headerRightRef.current) {
        headerTl.fromTo(
          headerRightRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5 },
          "-=0.3"
        );
      }

      // --- Title slide-up ---
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // --- Category labels + tags ---
      // Use fromTo instead of from to avoid stale-start issues after pinned sections
      if (gridRef.current) {
        const categoryLabels = gridRef.current.querySelectorAll(".category-label");
        categoryLabels.forEach((label, i) => {
          gsap.fromTo(
            label,
            { clipPath: "inset(0 100% 0 0)", opacity: 0 },
            {
              clipPath: "inset(0 0% 0 0)",
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              delay: i * 0.05,
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        const tagGroups = gridRef.current.querySelectorAll(".skill-tags");
        tagGroups.forEach((group, groupIndex) => {
          const tags = group.querySelectorAll(".skill-tag");
          gsap.fromTo(
            tags,
            { opacity: 0, y: 20, scale: 0.8 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: 0.04,
              ease: "back.out(1.7)",
              delay: groupIndex * 0.08,
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="skills" className="w-full bg-white py-16 md:py-20 lg:py-24">
      <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
        {/* Section Header */}
        <div className="mb-8 md:mb-10 flex items-center gap-4">
          <span
            ref={headerLeftRef}
            className="shrink-0 text-xs font-light tracking-[0.3em] text-neutral-400 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {t.skills.number}
          </span>
          <div
            ref={lineRef}
            className="h-px flex-1 bg-neutral-200 origin-left"
          />
          <span
            ref={headerRightRef}
            className="shrink-0 text-xs font-light tracking-[0.3em] text-neutral-400 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {t.skills.section}
          </span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="mb-8 text-3xl font-light leading-tight tracking-wide md:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t.skills.title} <span className="italic">{t.skills.titleItalic}</span>
        </h2>

        {/* Skills Grid */}
        <div
          ref={gridRef}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category) => (
            <div key={category.key}>
              <h3
                className="category-label mb-3 text-xs font-light tracking-[0.2em] text-neutral-400 uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {getLabel(category.key, category.label)}
              </h3>
              <div className="skill-tags flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`skill-tag group relative overflow-hidden border px-3 py-1.5 text-xs font-light tracking-wider transition-all duration-300 cursor-default ${
                      category.highlight
                        ? "border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-white"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-neutral-900"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <span className="relative z-10">{skill}</span>
                    {category.highlight && (
                      <span className="absolute inset-0 bg-neutral-900 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
