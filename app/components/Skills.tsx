"use client";

import { useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";

const skillCategories = [
  {
    key: "frontend",
    skills: ["React", "TypeScript", "Svelte", "Tailwind CSS", "Next.js"],
  },
  {
    key: "backend",
    skills: ["Node.js", "Ruby", "Python", "SQL", "PostgreSQL", "MongoDB"],
  },
  {
    key: "ai",
    label: "AI & Automation",
    skills: ["Claude Code", "Claude API", "OpenAI", "Prompt Engineering", "RAG", "n8n", "Make"],
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
      if (!sectionRef.current || !gridRef.current) return;

      const mm = gsap.matchMedia();

      // --- Header animation (same for both) ---
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

      // --- Desktop: pinned cascade ---
      mm.add("(min-width: 768px)", () => {
        const categories = gridRef.current!.querySelectorAll(".skill-category");
        const totalCategories = categories.length;

        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${totalCategories * 120}`,
            scrub: 0.5,
            pin: true,
          },
        });

        categories.forEach((cat, i) => {
          const label = cat.querySelector(".category-label");
          const tags = cat.querySelectorAll(".skill-tag");
          const progress = i / totalCategories;

          if (label) {
            pinTl.fromTo(
              label,
              { clipPath: "inset(0 100% 0 0)", opacity: 0 },
              { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.15, ease: "power2.out" },
              progress
            );
          }

          if (tags.length) {
            tags.forEach((tag) => {
              const randomX = (Math.random() - 0.5) * 80;
              const randomRotation = (Math.random() - 0.5) * 30;
              gsap.set(tag, {
                opacity: 0,
                y: -40,
                x: randomX,
                rotation: randomRotation,
                scale: 0.6,
              });
            });

            pinTl.to(
              tags,
              {
                opacity: 1,
                y: 0,
                x: 0,
                rotation: 0,
                scale: 1,
                duration: 0.15,
                stagger: 0.02,
                ease: "back.out(1.4)",
              },
              progress + 0.05
            );
          }
        });
      });

      // --- Mobile: independent triggers per category ---
      mm.add("(max-width: 767px)", () => {
        const categories = gridRef.current!.querySelectorAll(".skill-category");

        categories.forEach((cat) => {
          const label = cat.querySelector(".category-label");
          const tags = cat.querySelectorAll(".skill-tag");

          if (label) {
            gsap.fromTo(
              label,
              { clipPath: "inset(0 100% 0 0)", opacity: 0 },
              {
                clipPath: "inset(0 0% 0 0)",
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: cat,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          if (tags.length) {
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
                scrollTrigger: {
                  trigger: cat,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    // Ink wrapper: fills the GSAP pin-spacer below the pinned section (the body is white)
    <div data-dark className="bg-ink">
      <section ref={sectionRef} id="skills" data-dark className="w-full bg-ink text-white py-16 md:py-20 lg:py-24">
        <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
          {/* Section Header */}
          <div className="mb-8 md:mb-10 flex items-center gap-4">
            <span
              ref={headerLeftRef}
              className="shrink-0 text-sm font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-accent">#</span>{t.skills.number}
            </span>
            <div
              ref={lineRef}
              className="h-px flex-1 bg-white/10 origin-left"
            />
            <span
              ref={headerRightRef}
              className="shrink-0 text-sm font-medium text-white/50"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t.skills.section}
            </span>
          </div>

          {/* Title */}
          <h2
            ref={titleRef}
            className="mb-10 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.skills.title} <span className="text-accent">{t.skills.titleItalic}</span>
          </h2>

          {/* Skills Grid */}
          <div
            ref={gridRef}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {skillCategories.map((category) => (
              <div
                key={category.key}
                className={`skill-category rounded-3xl p-6 ${
                  category.highlight ? "bg-ink-2 border border-accent/40" : "bg-ink-2 border border-white/5"
                }`}
              >
                <h3
                  className={`category-label mb-4 text-lg font-bold ${category.highlight ? "text-white" : "text-white/90"}`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {getLabel(category.key, category.label)}
                </h3>
                <div className="skill-tags flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`skill-tag rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-300 cursor-default ${
                        category.highlight
                          ? "border-accent/40 text-white hover:border-accent hover:bg-accent"
                          : "border-white/15 text-white/70 hover:border-accent hover:bg-accent hover:text-white"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
