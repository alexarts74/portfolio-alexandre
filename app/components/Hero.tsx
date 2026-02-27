"use client";

import { useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageContext";
import Link from "next/link";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";

const BLOBS = [
  { size: "60vw", color: "#1e3278", opacity: 0.9, blur: 120, top: "-5%", left: "5%",
    xTo: 70, xDur: 2, yTo: 60, yDur: 2.8, sTo: 1.15, sDur: 1.6 },
  { size: "55vw", color: "#28196e", opacity: 0.8, blur: 130, top: "10%", left: "55%",
    xTo: -60, xDur: 2.4, yTo: 70, yDur: 2, sTo: 0.85, sDur: 2.4 },
  { size: "50vw", color: "#0f3c6e", opacity: 0.85, blur: 110, top: "50%", left: "-10%",
    xTo: 80, xDur: 2.2, yTo: -50, yDur: 3.2, sTo: 1.1, sDur: 1.8 },
  { size: "45vw", color: "#192882", opacity: 0.75, blur: 100, top: "35%", left: "60%",
    xTo: -50, xDur: 3, yTo: 50, yDur: 2.2, sTo: 0.9, sDur: 2.6 },
  { size: "40vw", color: "#141464", opacity: 0.7, blur: 100, top: "70%", left: "25%",
    xTo: 60, xDur: 2, yTo: -60, yDur: 2.6, sTo: 1.12, sDur: 2.2 },
];

export default function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const topContentRef = useRef<HTMLDivElement>(null);
  const bottomContentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current || !containerRef.current) return;

      // --- 1. Ambient blob movement (Lissajous — x, y, scale on separate cycles) ---
      blobRefs.current.forEach((el, i) => {
        if (!el) return;
        const b = BLOBS[i];
        gsap.to(el, { xPercent: b.xTo, duration: b.xDur, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(el, { yPercent: b.yTo, duration: b.yDur, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(el, { scale: b.sTo, duration: b.sDur, repeat: -1, yoyo: true, ease: "sine.inOut" });
      });

      // --- 2. Scroll parallax ---
      gsap.to(containerRef.current, {
        scale: 1.08,
        y: 40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      blobRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: `+=${20 + i * 15}`,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // --- 3. Entrance timeline (plays once) ---
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

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
        tl.fromTo(
          chars,
          { opacity: 0, rotateX: -90, y: 40 },
          {
            opacity: 1,
            rotateX: 0,
            y: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "back.out(1.4)",
          }
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );
      }

      if (descriptionRef.current) {
        tl.fromTo(
          descriptionRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.6 },
          "-=0.3"
        );
      }

      if (buttonsRef.current) {
        const buttons = buttonsRef.current.querySelectorAll("a");
        tl.fromTo(
          buttons,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 },
          "-=0.3"
        );
      }

      // --- 4. Scroll content fade-out ---
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (topContentRef.current) {
          gsap.to(topContentRef.current, {
            opacity: 0,
            y: -40,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "20% top",
              end: "60% top",
              scrub: true,
            },
          });
        }

        if (bottomContentRef.current) {
          gsap.to(bottomContentRef.current, {
            opacity: 0,
            y: 40,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "20% top",
              end: "60% top",
              scrub: true,
            },
          });
        }
      });

      mm.add("(max-width: 767px)", () => {
        if (topContentRef.current) {
          gsap.to(topContentRef.current, {
            opacity: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "30% top",
              end: "70% top",
              scrub: true,
            },
          });
        }

        if (bottomContentRef.current) {
          gsap.to(bottomContentRef.current, {
            opacity: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "30% top",
              end: "70% top",
              scrub: true,
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] w-full overflow-hidden bg-black">
      {/* Mesh gradient — blobs with GSAP Lissajous movement */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden"
        style={{ background: "#08081a" }}
      >
        {BLOBS.map((b, i) => (
          <div
            key={i}
            ref={(el) => { blobRefs.current[i] = el; }}
            className="absolute rounded-full"
            style={{
              width: b.size,
              height: b.size,
              background: b.color,
              opacity: b.opacity,
              top: b.top,
              left: b.left,
              filter: `blur(${b.blur}px)`,
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* Content - Top section */}
      <div
        ref={topContentRef}
        className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 via-black/40 to-transparent pt-28 md:pt-32 pb-20 px-6 md:px-12 lg:px-16 xl:px-24"
      >
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <h1
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Alexandre Artus
            </h1>
            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-white/60 mt-2"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t.hero.subtitle}
            </p>
          </div>

          <div ref={descriptionRef} className="hidden lg:block max-w-sm">
            <p
              className="text-base font-light text-white/60 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t.hero.description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom section - Buttons */}
      <div
        ref={bottomContentRef}
        className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20 pb-8 px-6 md:px-12 lg:px-16 xl:px-24"
      >
        <div className="flex items-end justify-between gap-6">
          <div ref={buttonsRef} className="flex flex-wrap gap-4">
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
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-white/40 px-6 py-3 text-sm font-light tracking-wider text-white uppercase transition-all duration-300 hover:border-white hover:bg-white/10"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t.hero.cta.contact}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
