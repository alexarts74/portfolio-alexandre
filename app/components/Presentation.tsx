"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function Presentation() {
  const { t } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headerLeftRef = useRef<HTMLSpanElement>(null);
  const headerRightRef = useRef<HTMLSpanElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const mm = gsap.matchMedia();

      // --- Header animation ---
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
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

      // --- Portrait reveal ---
      mm.add("(min-width: 768px)", () => {
        if (imageContainerRef.current) {
          gsap.fromTo(
            imageContainerRef.current,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: imageContainerRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );

          gsap.to(imageContainerRef.current, {
            y: -40,
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      mm.add("(max-width: 767px)", () => {
        if (imageContainerRef.current) {
          gsap.fromTo(
            imageContainerRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: imageContainerRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      // --- Title slide-up ---
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // --- Paragraphs stagger ---
      if (paragraphsRef.current) {
        const paragraphs = paragraphsRef.current.querySelectorAll("p");
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: paragraphsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // --- Stats counter animation ---
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll("[data-stat]");

        statItems.forEach((item) => {
          const valueEl = item.querySelector("[data-stat-value]");
          const labelEl = item.querySelector("[data-stat-label]");
          const targetText = (valueEl as HTMLElement)?.dataset.statValue || "";

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });

          // Counter animation
          if (valueEl && targetText) {
            const numericPart = parseFloat(targetText);
            const suffix = targetText.replace(/[\d.]/g, "");

            if (!isNaN(numericPart)) {
              const counter = { val: 0 };
              // Set initial text
              (valueEl as HTMLElement).textContent = `0${suffix}`;

              tl.fromTo(valueEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 });
              tl.to(
                counter,
                {
                  val: numericPart,
                  duration: 1.5,
                  ease: "power2.out",
                  snap: { val: numericPart % 1 === 0 ? 1 : 0.1 },
                  onUpdate: () => {
                    (valueEl as HTMLElement).textContent = `${
                      numericPart % 1 === 0
                        ? Math.round(counter.val)
                        : counter.val.toFixed(1)
                    }${suffix}`;
                  },
                },
                "-=0.1"
              );
            }
          }

          // Label fade in
          if (labelEl) {
            tl.fromTo(
              labelEl,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.4 },
              "-=1.0"
            );
          }
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="about" className="w-full bg-white py-20 md:py-28 lg:py-36">
      <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
        {/* Section Header */}
        <div className="mb-10 md:mb-12 flex items-center gap-4">
          <span
            ref={headerLeftRef}
            className="shrink-0 text-xs font-light tracking-[0.3em] text-neutral-400 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {t.presentation.number}
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
            {t.presentation.section}
          </span>
        </div>

        {/* Content Grid */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Image */}
          <div>
            <div
              ref={imageContainerRef}
              className="relative aspect-[3/4] w-full max-w-lg overflow-hidden bg-neutral-200"
            >
              {imageError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-300">
                  <div className="text-center">
                    <div className="text-6xl font-light text-neutral-400" style={{ fontFamily: "var(--font-display)" }}>A</div>
                    <p className="mt-2 text-xs text-neutral-400 tracking-widest uppercase">Portrait</p>
                  </div>
                </div>
              ) : (
                <Image
                  src="/images/portrait.png"
                  alt="Portrait d'Alexandre"
                  fill
                  className="object-cover transition-[filter,transform] duration-1000 ease-in-out hover:grayscale"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center">
            <h2
              ref={titleRef}
              className="mb-6 text-3xl font-light leading-tight tracking-wide md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.presentation.title}
              <br />
              <span className="italic">{t.presentation.titleItalic}</span>
            </h2>

            <div
              ref={paragraphsRef}
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
                { value: "2.5", label: t.presentation.stats.experience },
                { value: "10+", label: t.presentation.stats.projects },
                { value: "100%", label: t.presentation.stats.satisfaction },
              ].map((stat) => (
                <div key={stat.label} data-stat>
                  <span
                    data-stat-value={stat.value}
                    className="text-2xl font-light md:text-3xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </span>
                  <p
                    data-stat-label
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
