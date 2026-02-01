"use client";

import { useLanguage } from "@/app/i18n/LanguageContext";
import { useEffect, useState } from "react";

export default function Hero() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/header-video.mp4" type="video/mp4" />
      </video>

      {/* Content - Top section */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 via-black/40 to-transparent pt-28 md:pt-32 pb-20 px-6 md:px-12 lg:px-16 xl:px-24">
        <div
          className={`flex flex-wrap items-start justify-between gap-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          {/* Name & Title */}
          <div>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Alexandre Artus
            </h1>
            <p
              className="text-lg md:text-xl text-white/60 mt-2"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t.hero.subtitle}
            </p>
          </div>

          {/* Right side - Description */}
          <div className="hidden lg:block max-w-sm">
            <p
              className="text-base font-light text-white/60 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t.hero.description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom section - Buttons + Scroll */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20 pb-8 px-6 md:px-12 lg:px-16 xl:px-24">
        <div
          className={`flex items-end justify-between gap-6 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#projets"
              className="group inline-flex items-center gap-3 bg-white px-6 py-3 text-sm font-light tracking-wider text-black uppercase transition-all duration-300 hover:bg-white/90"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t.hero.cta.projects}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 border border-white/40 px-6 py-3 text-sm font-light tracking-wider text-white uppercase transition-all duration-300 hover:border-white hover:bg-white/10"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t.hero.cta.contact}
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="hidden md:flex flex-col items-center gap-2">
            <span
              className="text-[10px] font-light tracking-[0.2em] text-white/40 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Scroll
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
