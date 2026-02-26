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
      {/* Mobile/Tablet Background - Aurora blobs */}
      <div className="absolute inset-0 md:hidden overflow-hidden bg-[#050510]">
        {/* Blob 1 - blue top right */}
        <div
          className="absolute rounded-full blur-[80px]"
          style={{
            width: '80vw',
            height: '80vw',
            background: '#1a3f6f',
            opacity: 0.6,
            top: '-20%',
            right: '-20%',
            animation: 'blobMove1 14s ease-in-out infinite',
          }}
        />
        {/* Blob 2 - purple center left */}
        <div
          className="absolute rounded-full blur-[80px]"
          style={{
            width: '90vw',
            height: '90vw',
            background: '#4a1a6b',
            opacity: 0.5,
            top: '20%',
            left: '-30%',
            animation: 'blobMove2 18s ease-in-out infinite',
          }}
        />
        {/* Blob 3 - teal bottom */}
        <div
          className="absolute rounded-full blur-[80px]"
          style={{
            width: '70vw',
            height: '70vw',
            background: '#0f4f5c',
            opacity: 0.55,
            bottom: '-15%',
            right: '-10%',
            animation: 'blobMove3 16s ease-in-out infinite',
          }}
        />
        {/* Blob 4 - indigo accent */}
        <div
          className="absolute rounded-full blur-[60px]"
          style={{
            width: '50vw',
            height: '50vw',
            background: '#2a1a5e',
            opacity: 0.5,
            top: '50%',
            left: '20%',
            animation: 'blobMove1 20s ease-in-out infinite reverse',
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
