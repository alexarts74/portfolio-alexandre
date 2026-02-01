"use client";

import { useLanguage } from "@/app/i18n/LanguageContext";
import { useInView } from "@/app/hooks/useInView";

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
    skills: ["Figma", "Notion", "VS Code", "Cursor", "Linear"],
  },
];

export default function Skills() {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useInView({ threshold: 0.1 });
  const { ref: skillsRef, isVisible: skillsVisible } = useInView({ threshold: 0.1 });

  const getLabel = (key: string, label?: string) => {
    if (label) return label;
    const categories = t.skills.categories as Record<string, string>;
    return categories[key] || key;
  };

  return (
    <section id="skills" className="w-full bg-white py-16 md:py-20 lg:py-24">
      <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`mb-8 md:mb-10 flex items-center gap-4 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span
            className="shrink-0 text-xs font-light tracking-[0.3em] text-neutral-400 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {t.skills.number}
          </span>
          <div
            className={`h-px flex-1 bg-neutral-200 transition-transform duration-1000 origin-left ${
              headerVisible ? "scale-x-100" : "scale-x-0"
            }`}
            style={{ transitionDelay: "0.2s" }}
          />
          <span
            className="shrink-0 text-xs font-light tracking-[0.3em] text-neutral-400 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {t.skills.section}
          </span>
        </div>

        {/* Title */}
        <h2
          className={`mb-8 text-3xl font-light leading-tight tracking-wide md:text-4xl transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ fontFamily: "var(--font-display)", transitionDelay: "0.1s" }}
        >
          {t.skills.title} <span className="italic">{t.skills.titleItalic}</span>
        </h2>

        {/* Skills Grid - 2 columns on desktop */}
        <div
          ref={skillsRef}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.key}
              className={`transition-all duration-500 ${
                skillsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${0.05 * catIndex}s` }}
            >
              <h3
                className="mb-3 text-xs font-light tracking-[0.2em] text-neutral-400 uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {getLabel(category.key, category.label)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, index) => (
                  <span
                    key={skill}
                    className={`group relative overflow-hidden border px-3 py-1.5 text-xs font-light tracking-wider transition-all duration-300 cursor-default ${
                      category.highlight
                        ? "border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-white"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-neutral-900"
                    } ${
                      skillsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}
                    style={{
                      fontFamily: "var(--font-body)",
                      transitionDelay: `${0.1 + 0.03 * index}s`
                    }}
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
