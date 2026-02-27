"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  const navRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hamburgerTopRef = useRef<HTMLSpanElement>(null);
  const hamburgerMidRef = useRef<HTMLSpanElement>(null);
  const hamburgerBotRef = useRef<HTMLSpanElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const langSwitcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Build the GSAP timeline for the mobile menu
  useGSAP(
    () => {
      if (!overlayRef.current || !linksRef.current) return;

      const links = linksRef.current.querySelectorAll(".menu-link");
      const tl = gsap.timeline({ paused: true });

      // Overlay clip-path reveal from hamburger position
      tl.fromTo(
        overlayRef.current,
        { clipPath: "circle(0% at 90% 5%)", visibility: "visible" as const },
        {
          clipPath: "circle(150% at 90% 5%)",
          duration: 0.7,
          ease: "power3.inOut",
        }
      );

      // Stagger links in
      tl.fromTo(
        links,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.3"
      );

      // Language switcher fade-in
      if (langSwitcherRef.current) {
        tl.fromTo(
          langSwitcherRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
          "-=0.2"
        );
      }

      menuTimelineRef.current = tl;
    },
    { scope: navRef }
  );

  // Play / reverse the timeline when isMenuOpen changes
  useEffect(() => {
    if (!menuTimelineRef.current) return;

    if (isMenuOpen) {
      menuTimelineRef.current.timeScale(1).play();
      // Animate hamburger bars to X
      gsap.to(hamburgerTopRef.current, {
        rotation: 45,
        y: 9,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(hamburgerMidRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: "power2.inOut",
      });
      gsap.to(hamburgerBotRef.current, {
        rotation: -45,
        y: -9,
        duration: 0.3,
        ease: "power2.inOut",
      });
    } else {
      menuTimelineRef.current.timeScale(1.5).reverse();
      // Animate hamburger bars back to lines
      gsap.to(hamburgerTopRef.current, {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(hamburgerMidRef.current, {
        opacity: 1,
        duration: 0.15,
        delay: 0.1,
        ease: "power2.inOut",
      });
      gsap.to(hamburgerBotRef.current, {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Smooth scroll handler for anchor links
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("#")) {
        e.preventDefault();
        closeMenu();
        // Small delay to let menu close before scrolling
        setTimeout(() => {
          gsap.to(window, {
            scrollTo: { y: href, offsetY: 80 },
            duration: 1,
            ease: "power2.inOut",
          });
        }, isMenuOpen ? 400 : 0);
      }
    },
    [closeMenu, isMenuOpen]
  );

  const navLinks = [
    { href: "#projets", label: t.nav.projects },
    { href: "#skills", label: t.nav.skills },
    { href: "#about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <div ref={navRef}>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white border-b border-neutral-200"
            : "bg-transparent"
        }`}
      >
        <div className="mx-6 flex items-center justify-between py-5 md:mx-12 md:py-6 lg:mx-16 xl:mx-24">
          <Link
            href="/"
            className={`text-sm font-light tracking-[0.3em] uppercase transition-colors duration-500 z-50 ${
              isMenuOpen
                ? "text-white hover:opacity-60"
                : isScrolled
                  ? "text-neutral-900 hover:text-neutral-500"
                  : "text-white hover:opacity-60"
            }`}
            onClick={closeMenu}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Alexandre
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isAnchor = link.href.startsWith("#");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-light tracking-[0.2em] uppercase transition-colors duration-500 ${
                    isScrolled
                      ? "text-neutral-400 hover:text-neutral-900"
                      : "text-white/60 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                  onClick={isAnchor ? (e: React.MouseEvent<HTMLAnchorElement>) => handleAnchorClick(e, link.href) : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            <LanguageSwitcher
              className={`transition-colors duration-500 ${
                isScrolled ? "text-neutral-400" : "text-white/60"
              }`}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50 relative w-6 h-5 flex flex-col justify-between"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
          >
            <span
              ref={hamburgerTopRef}
              className={`block h-[1px] w-full origin-center ${
                isMenuOpen
                  ? "bg-white"
                  : isScrolled
                    ? "bg-neutral-900"
                    : "bg-white"
              }`}
            />
            <span
              ref={hamburgerMidRef}
              className={`block h-[1px] w-full ${
                isMenuOpen
                  ? "bg-white"
                  : isScrolled
                    ? "bg-neutral-900"
                    : "bg-white"
              }`}
            />
            <span
              ref={hamburgerBotRef}
              className={`block h-[1px] w-full origin-center ${
                isMenuOpen
                  ? "bg-white"
                  : isScrolled
                    ? "bg-neutral-900"
                    : "bg-white"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black md:hidden"
        style={{ visibility: "hidden", clipPath: "circle(0% at 90% 5%)" }}
      >
        <div ref={linksRef} className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => {
            const isAnchor = link.href.startsWith("#");
            return (
              <Link
                key={link.href}
                href={link.href}
                className="menu-link text-white text-2xl font-light tracking-[0.3em] uppercase hover:opacity-60 transition-opacity"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (isAnchor) {
                    handleAnchorClick(e, link.href);
                  } else {
                    closeMenu();
                  }
                }}
                style={{ opacity: 0 }}
              >
                {link.label}
              </Link>
            );
          })}
          <div ref={langSwitcherRef} className="mt-8" style={{ opacity: 0 }}>
            <LanguageSwitcher className="text-white text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
