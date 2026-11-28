"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import LanguageSwitcher from "./LanguageSwitcher";
import { TransitionLink } from "./PageTransition";
import PillButton from "./PillButton";

interface NavigationProps {
  /** "home": anchor links + CTA. "minimal": logo, back link and language (contact & project pages). */
  variant?: "home" | "minimal";
  backHref?: string;
  backLabel?: string;
}

export default function Navigation({ variant = "home", backHref = "/", backLabel }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();
  const isHome = variant === "home";

  const navRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hamburgerTopRef = useRef<HTMLSpanElement>(null);
  const hamburgerBotRef = useRef<HTMLSpanElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Mobile menu timeline
  useGSAP(
    () => {
      if (!overlayRef.current || !linksRef.current) return;

      const items = linksRef.current.querySelectorAll(".menu-item");
      const tl = gsap.timeline({ paused: true });

      tl.fromTo(
        overlayRef.current,
        { clipPath: "circle(0% at 92% 4%)", visibility: "visible" as const },
        { clipPath: "circle(150% at 92% 4%)", duration: 0.7, ease: "power3.inOut" }
      );
      tl.fromTo(
        items,
        { opacity: 0, yPercent: 60 },
        { opacity: 1, yPercent: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" },
        "-=0.3"
      );

      menuTimelineRef.current = tl;
    },
    { scope: navRef }
  );

  useEffect(() => {
    const tl = menuTimelineRef.current;
    if (!tl) return;

    if (isMenuOpen) {
      tl.timeScale(1).play();
      gsap.to(hamburgerTopRef.current, { rotation: 45, y: 4, duration: 0.3, ease: "power2.inOut" });
      gsap.to(hamburgerBotRef.current, { rotation: -45, y: -4, duration: 0.3, ease: "power2.inOut" });
    } else {
      tl.timeScale(1.5).reverse();
      gsap.to([hamburgerTopRef.current, hamburgerBotRef.current], {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      const wasOpen = isMenuOpen;
      closeMenu();
      setTimeout(() => {
        gsap.to(window, {
          scrollTo: { y: href, offsetY: 72 },
          duration: 1,
          ease: "power2.inOut",
        });
      }, wasOpen ? 400 : 0);
    },
    [closeMenu, isMenuOpen]
  );

  const anchorLinks = [
    { href: "#projets", label: t.nav.projects },
    { href: "#about", label: t.nav.about },
    { href: "#skills", label: t.nav.skills },
  ];

  // Floating pill once the page scrolls (always on inner pages); flat and wide over the hero
  const floating = (!isHome || isScrolled) && !isMenuOpen;

  return (
    <div ref={navRef}>
      <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
        <div
          className={`pointer-events-auto mx-auto flex items-center justify-between rounded-full border transition-[max-width,padding,background-color,border-color,box-shadow,margin] duration-500 ease-out ${
            floating
              ? "max-w-5xl border-white/10 bg-ink/85 py-1.5 pl-5 pr-1.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl md:py-2 md:pl-7 md:pr-2"
              : "max-w-[100rem] border-transparent bg-transparent px-3 py-2 md:mt-2 md:px-6 lg:px-10 xl:px-[4.5rem]"
          }`}
        >
          <TransitionLink
            href="/"
            className="z-50 text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-70"
            onClick={closeMenu}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Alexandre<span className="text-accent">.</span>
          </TransitionLink>

          {isHome ? (
            <>
              {/* Desktop */}
              <div className="hidden md:flex items-center gap-6 lg:gap-8">
                {anchorLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[15px] text-white/80 transition-colors duration-300 hover:text-white"
                    style={{ fontFamily: "var(--font-body)" }}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleAnchorClick(e, link.href)}
                  >
                    {link.label}
                  </Link>
                ))}
                <LanguageSwitcher className="text-white/80" />
                <PillButton href="/contact" transition>
                  {t.nav.cta}
                </PillButton>
              </div>

              {/* Mobile button */}
              <button
                className="md:hidden z-50 relative flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full bg-white/10 backdrop-blur-sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={isMenuOpen}
              >
                <span ref={hamburgerTopRef} className="block h-[2px] w-5 rounded-full bg-white origin-center" />
                <span ref={hamburgerBotRef} className="block h-[2px] w-5 rounded-full bg-white origin-center" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-6 py-2.5 pr-4 md:pr-5">
              <TransitionLink
                href={backHref}
                className="group flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:-translate-x-1" aria-hidden>
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="hidden sm:inline">{backLabel ?? t.nav.back}</span>
              </TransitionLink>
              <LanguageSwitcher className="text-white/80" />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isHome && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40 bg-ink md:hidden"
          style={{ visibility: "hidden", clipPath: "circle(0% at 92% 4%)" }}
        >
          <div ref={linksRef} className="flex h-full flex-col justify-between px-6 pt-28 pb-10">
            <div className="flex flex-col gap-2">
              {anchorLinks.map((link, i) => (
                <div key={link.href} className="overflow-hidden">
                  <Link
                    href={link.href}
                    className="menu-item flex items-baseline gap-3 text-[2.6rem] leading-tight font-bold tracking-tight text-white"
                    style={{ fontFamily: "var(--font-display)", opacity: 0 }}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleAnchorClick(e, link.href)}
                  >
                    <span className="text-sm font-semibold text-white/50">#0{i + 1}</span>
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
            <div className="menu-item flex items-center justify-between" style={{ opacity: 0 }}>
              <PillButton href="/contact" transition>
                {t.nav.cta}
              </PillButton>
              <LanguageSwitcher className="text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
