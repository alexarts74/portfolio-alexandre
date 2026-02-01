"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { useInView } from "@/app/hooks/useInView";

export default function Presentation() {
  const { t } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const { ref: sectionRef, isVisible } = useInView({ threshold: 0.1 });
  const { ref: imageRef, isVisible: imageVisible } = useInView({ threshold: 0.2 });
  const { ref: textRef, isVisible: textVisible } = useInView({ threshold: 0.2 });
  const { ref: statsRef, isVisible: statsVisible } = useInView({ threshold: 0.3 });

  return (
    <section id="about" className="w-full bg-white py-20 md:py-28 lg:py-36">
      <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
        {/* Section Header */}
        <div
          ref={sectionRef}
          className={`mb-10 md:mb-12 flex items-center gap-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span
            className="shrink-0 text-xs font-light tracking-[0.3em] text-neutral-400 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {t.presentation.number}
          </span>
          <div
            className={`h-px flex-1 bg-neutral-200 transition-transform duration-1000 origin-left ${
              isVisible ? "scale-x-100" : "scale-x-0"
            }`}
            style={{ transitionDelay: "0.2s" }}
          />
          <span
            className="shrink-0 text-xs font-light tracking-[0.3em] text-neutral-400 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {t.presentation.section}
          </span>
        </div>

        {/* Content Grid */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Image */}
          <div
            ref={imageRef}
            className={`transition-all duration-700 ${
              imageVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-200">
              {imageError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-300">
                  <div className="text-center">
                    <div className="text-6xl font-light text-neutral-400" style={{ fontFamily: "var(--font-display)" }}>A</div>
                    <p className="mt-2 text-xs text-neutral-400 tracking-widest uppercase">Portrait</p>
                  </div>
                </div>
              ) : (
                <Image
                  src="/images/portrait.jpg"
                  alt="Portrait d'Alexandre"
                  fill
                  className="object-cover grayscale transition-[filter,transform] duration-1000 ease-in-out hover:grayscale-0 hover:scale-105"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          </div>

          {/* Text */}
          <div
            ref={textRef}
            className={`flex flex-col justify-center transition-all duration-700 ${
              textVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <h2
              className="mb-6 text-3xl font-light leading-tight tracking-wide md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.presentation.title}
              <br />
              <span className="italic">{t.presentation.titleItalic}</span>
            </h2>

            <div
              className="space-y-4 text-base font-light leading-relaxed text-neutral-600"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <p>{t.presentation.paragraph1}</p>
              <p>{t.presentation.paragraph2}</p>
              <p>{t.presentation.paragraph3}</p>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="mt-8 grid grid-cols-3 gap-4 border-t border-neutral-200 pt-8"
            >
              {[
                { value: "3+", label: t.presentation.stats.experience },
                { value: "20+", label: t.presentation.stats.projects },
                { value: "15+", label: t.presentation.stats.technologies },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`transition-all duration-500 ${
                    statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${0.1 * (index + 1)}s` }}
                >
                  <span
                    className="text-2xl font-light md:text-3xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </span>
                  <p
                    className="mt-1 text-[10px] font-light tracking-wider text-neutral-500 uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
