"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsap";
import { useLanguage } from "@/app/i18n/LanguageContext";

const SMALL = 14;
const BIG = 100;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const { locale } = useLanguage();

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(max-width: 767px)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const circle = circleRef.current;
    const text = textRef.current;
    if (!cursor || !circle || !text) return;

    // Hide default cursor on desktop
    document.documentElement.classList.add("hide-cursor");

    let mouseX = 0;
    let mouseY = 0;
    let isOverProject = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Smooth follow with GSAP ticker
    const followMouse = () => {
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.15,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const grow = () => {
      if (isOverProject) return;
      isOverProject = true;
      gsap.to(circle, {
        width: BIG,
        height: BIG,
        marginLeft: -BIG / 2,
        marginTop: -BIG / 2,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
      gsap.to(text, { opacity: 1, scale: 1, duration: 0.2, delay: 0.1 });
    };

    const shrink = () => {
      if (!isOverProject) return;
      isOverProject = false;
      gsap.to(circle, {
        width: SMALL,
        height: SMALL,
        marginLeft: -SMALL / 2,
        marginTop: -SMALL / 2,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.to(text, { opacity: 0, scale: 0, duration: 0.15 });
    };

    // Scroll safety: check if mouse is still over a project element
    const onScroll = () => {
      if (!isOverProject) return;
      const el = document.elementFromPoint(mouseX, mouseY);
      if (!el || !el.closest("[data-cursor-project]")) {
        shrink();
      }
    };

    // Hide/show dot when mouse leaves/enters viewport
    const onLeaveViewport = () => {
      gsap.to(circle, { opacity: 0, duration: 0.15 });
    };
    const onEnterViewport = () => {
      gsap.to(circle, { opacity: 1, duration: 0.15 });
    };

    // Attach project hover listeners
    const attachListeners = () => {
      const targets = document.querySelectorAll("[data-cursor-project]");
      targets.forEach((el) => {
        el.addEventListener("mouseenter", grow);
        el.addEventListener("mouseleave", shrink);
      });
      return targets;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveViewport);
    document.documentElement.addEventListener("mouseenter", onEnterViewport);
    gsap.ticker.add(followMouse);

    let targets = attachListeners();

    const observer = new MutationObserver(() => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
      targets = attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.documentElement.classList.remove("hide-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("mouseleave", onLeaveViewport);
      document.documentElement.removeEventListener("mouseenter", onEnterViewport);
      gsap.ticker.remove(followMouse);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center"
      style={{ willChange: "transform" }}
    >
      <div
        ref={circleRef}
        className="rounded-full flex items-center justify-center"
        style={{
          width: SMALL,
          height: SMALL,
          marginLeft: -SMALL / 2,
          marginTop: -SMALL / 2,
          background: "rgba(0, 0, 0, 0.85)",
          willChange: "width, height",
        }}
      >
        <span
          ref={textRef}
          className="text-[11px] font-light tracking-[0.25em] text-white uppercase"
          style={{
            fontFamily: "var(--font-body)",
            opacity: 0,
            transform: "scale(0)",
          }}
        >
          {locale === "en" ? "View" : "Voir"}
        </span>
      </div>
    </div>
  );
}
