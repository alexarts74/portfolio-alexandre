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
      {/* Mobile Background - Animated geometric design */}
      <div className="absolute inset-0 md:hidden overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black" />

        {/* Animated lines */}
        <div className="absolute inset-0">
          {/* Diagonal line 1 */}
          <div
            className="absolute w-[1px] h-[200%] bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse"
            style={{
              left: '20%',
              top: '-50%',
              transform: 'rotate(25deg)',
              animationDuration: '3s'
            }}
          />
          {/* Diagonal line 2 */}
          <div
            className="absolute w-[1px] h-[200%] bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse"
            style={{
              left: '60%',
              top: '-50%',
              transform: 'rotate(25deg)',
              animationDuration: '4s',
              animationDelay: '1s'
            }}
          />
          {/* Diagonal line 3 */}
          <div
            className="absolute w-[1px] h-[200%] bg-gradient-to-b from-transparent via-white/15 to-transparent animate-pulse"
            style={{
              left: '85%',
              top: '-50%',
              transform: 'rotate(25deg)',
              animationDuration: '3.5s',
              animationDelay: '0.5s'
            }}
          />
        </div>

        {/* Floating circles */}
        <div
          className="absolute w-64 h-64 rounded-full border border-white/5"
          style={{
            right: '-5rem',
            top: '15%',
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full border border-white/5"
          style={{
            left: '-8rem',
            bottom: '10%',
            animation: 'float 10s ease-in-out infinite reverse'
          }}
        />
        <div
          className="absolute w-32 h-32 rounded-full bg-white/5"
          style={{
            right: '20%',
            bottom: '25%',
            animation: 'float 6s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />

      </div>

      {/* Video Background - Desktop only */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
      >
        <source src="/videos/header-v20.mp4" type="video/mp4" />
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
        </div>
      </div>
    </section>
  );
}
