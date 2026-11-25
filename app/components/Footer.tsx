"use client";

import { useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { SITE } from "@/app/data/site";
import PillButton from "./PillButton";

export default function Footer() {
  const { t, locale } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);
  const ctaCardRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollTo = (target: string | number) => {
    gsap.to(window, {
      scrollTo: { y: target, offsetY: typeof target === "string" ? 72 : 0, autoKill: false },
      duration: 1.2,
      ease: "power3.inOut",
    });
  };

  const onAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
  };

  useGSAP(
    () => {
      if (!footerRef.current) return;

      const trigger = (start: string) => ({
        trigger: footerRef.current,
        start,
        toggleActions: "play none none none",
      });

      if (ctaCardRef.current) {
        gsap.fromTo(
          ctaCardRef.current,
          { clipPath: "inset(10% 6% 10% 6% round 40px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 40px)",
            duration: 1.1,
            ease: "power4.inOut",
            clearProps: "clipPath",
            scrollTrigger: trigger("top 85%"),
          }
        );
        gsap.fromTo(
          ctaCardRef.current.querySelectorAll(".cta-line"),
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.1, ease: "power4.out", delay: 0.3, scrollTrigger: trigger("top 85%") }
        );
        gsap.fromTo(
          ctaCardRef.current.querySelector(".cta-button"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: "power3.out", scrollTrigger: trigger("top 85%") }
        );
      }

      if (columnsRef.current) {
        gsap.fromTo(
          columnsRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: trigger("top 40%") }
        );
      }

      if (bottomRef.current) {
        gsap.fromTo(bottomRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, scrollTrigger: trigger("top 30%") });
      }
    },
    { scope: footerRef }
  );

  const linkClass =
    "text-base text-white/70 transition-colors duration-300 hover:text-accent w-fit";

  return (
    <footer ref={footerRef} data-dark className="w-full bg-ink p-2 pb-0 text-white md:p-3 md:pb-0">
      {/* CTA card */}
      <div
        ref={ctaCardRef}
        className="hero-gradient relative overflow-hidden rounded-[2rem] px-4 py-16 md:rounded-[2.5rem] md:px-9 md:py-24 lg:px-13 xl:px-21"
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <h3
            className="text-[clamp(2.75rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-[-0.04em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="block overflow-y-clip pb-[0.05em]">
              <span className="cta-line block">{locale === "en" ? "Have a project" : "Un projet"}</span>
            </span>
            <span className="block overflow-y-clip pb-[0.05em]">
              <span className="cta-line block">{locale === "en" ? "in mind?" : "en tête ?"}</span>
            </span>
          </h3>
          <div className="cta-button shrink-0">
            <PillButton href="/contact" transition size="lg">
              {locale === "en" ? "Let's talk" : "Discutons-en"}
            </PillButton>
          </div>
        </div>
      </div>

      <div className="mx-4 py-16 md:mx-9 md:py-20 lg:mx-13 xl:mx-21">
        <div ref={columnsRef} className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              Alexandre<span className="text-accent">.</span>
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/60" style={{ fontFamily: "var(--font-body)" }}>
              {locale === "en"
                ? "Full stack developer passionate about creating elegant and performant web applications. Available for freelance projects and collaborations."
                : "Développeur full stack passionné par la création d'applications web élégantes et performantes. Disponible pour des projets freelance et collaborations."}
            </p>
          </div>

          {/* Navigation */}
          <div style={{ fontFamily: "var(--font-body)" }}>
            <p className="mb-4 text-sm font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Navigation
            </p>
            <nav className="flex flex-col gap-3">
              <a href="#projets" className={linkClass} onClick={(e) => onAnchor(e, "#projets")}>
                {t.footer.nav.projects}
              </a>
              <a href="#about" className={linkClass} onClick={(e) => onAnchor(e, "#about")}>
                {t.footer.nav.about}
              </a>
              <a href="#skills" className={linkClass} onClick={(e) => onAnchor(e, "#skills")}>
                {t.nav.skills}
              </a>
              <Link href="/contact" className={linkClass}>
                {t.footer.nav.contact}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div style={{ fontFamily: "var(--font-body)" }}>
            <p className="mb-4 text-sm font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
              {t.footer.nav.contact}
            </p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${SITE.email}`} className={`${linkClass} break-all`}>
                {SITE.email}
              </a>
              <a href={SITE.socials.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                GitHub
              </a>
              <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          ref={bottomRef}
          className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 md:flex-row"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <p className="text-sm text-white/40" suppressHydrationWarning>
            © {new Date().getFullYear()} {SITE.name}. {t.footer.rights}
          </p>
          <button
            onClick={() => scrollTo(0)}
            className="group flex items-center gap-2 text-sm text-white/50 transition-colors duration-300 hover:text-white"
          >
            {locale === "en" ? "Back to top" : "Retour en haut"}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-accent">
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-6 6m6-6l6 6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
