"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import type { FocusFrame, Ribbon } from "@/app/lib/ribbon";
import { getProjectCategory, projects, projectTypeLabels } from "@/app/data/projects";
import { useLanguage } from "@/app/i18n/LanguageContext";
import PillButton, { ArrowIcon } from "./PillButton";
import ProjectCard from "./ProjectCard";

/** Scroll length of one card, and the pause after the last one, in screens. */
const SCROLL_STEP = 0.55;
const SCROLL_HOLD = 0.2;
const SCREENS = (projects.length - 1) * SCROLL_STEP + SCROLL_HOLD + 1;
const ACCENT = "#ff5a1f";

const pad = (n: number) => String(n).padStart(2, "0");
const smallCover = (src: string) => src.replace(/\.webp$/, "-sm.webp");

// prefers-reduced-motion, read as an external store (no state copy in an effect)
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;
const getServerReducedMotion = () => false;

/** Title repeated enough times to loop seamlessly with the -50% keyframe. */
function MarqueeWords({ title, className = "" }: { title: string; className?: string }) {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <span key={i} className={`flex shrink-0 items-center ${className}`}>
          <span className="marquee-word">{title}</span>
          <span className="mx-[0.35em] inline-block h-[0.14em] w-[0.14em] rounded-full bg-accent" />
        </span>
      ))}
    </>
  );
}

/** Static grid when motion is reduced or WebGL is unavailable. */
function RibbonFallback() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".fallback-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    },
    { scope: gridRef }
  );

  return (
    <div ref={gridRef} className="bg-white px-6 pb-20 pt-16 md:px-12 md:pb-28 md:pt-24 lg:px-16 xl:px-24">
      <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
        {projects.map((project) => (
          <div key={project.slug} className="fallback-card">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsRibbon() {
  const { t, locale } = useLanguage();
  const router = useRouter();

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const hitRef = useRef<HTMLAnchorElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const ribbonRef = useRef<Ribbon | null>(null);
  const progressTriggerRef = useRef<ScrollTrigger | null>(null);

  const [active, setActive] = useState(0);
  const [focus, setFocus] = useState<number | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerReducedMotion);
  const fallback = reducedMotion || webglFailed;

  const count = projects.length;
  const project = projects[active];
  const focused = projects[focus ?? active];

  useEffect(() => {
    if (fallback) return;
    const root = rootRef.current;
    const stage = stageRef.current;
    const container = canvasRef.current;
    if (!root || !stage || !container) return;

    let cancelled = false;
    let ribbon: Ribbon | null = null;
    const triggers: ScrollTrigger[] = [];
    let lastFocus: number | null = null;

    // Giant title behind the cards: slides out / in vertically, in the scroll direction
    const swapMarquee = (index: number, direction: 1 | -1) => {
      const line = marqueeRef.current;
      if (!line || line.dataset.index === String(index)) return;
      const first = line.dataset.index === undefined;
      line.dataset.index = String(index);
      const setText = () =>
        line.querySelectorAll(".marquee-word").forEach((el) => (el.textContent = projects[index].title));

      gsap.killTweensOf(line);
      if (first) {
        setText();
        return;
      }
      gsap
        .timeline()
        .to(line, { yPercent: -110 * direction, opacity: 0, duration: 0.25, ease: "power2.in" })
        .call(setText)
        .fromTo(
          line,
          { yPercent: 110 * direction, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
        );
    };

    // Link laid over the flattened card: real navigation + the cursor's "View" bubble
    const onFocusFrame = (frame: FocusFrame | null) => {
      const hit = hitRef.current;
      if (!hit) return;
      if (!frame) {
        hit.style.visibility = "hidden";
        hit.style.pointerEvents = "none";
        hit.dispatchEvent(new MouseEvent("mouseleave"));
        lastFocus = null;
        setFocus(null);
        return;
      }
      hit.style.visibility = "visible";
      hit.style.pointerEvents = "auto";
      hit.style.width = `${frame.width}px`;
      hit.style.height = `${frame.height}px`;
      hit.style.borderRadius = `${frame.radius}px`;
      hit.style.transform = `translate3d(${frame.x}px, ${frame.y}px, 0)`;
      hit.style.setProperty("--card-h", `${frame.height}px`);
      hit.style.setProperty("--p", frame.progress.toFixed(3));
      if (frame.index !== lastFocus) {
        lastFocus = frame.index;
        setFocus(frame.index);
      }
    };

    import("@/app/lib/ribbon")
      .then(({ Ribbon }) => {
        if (cancelled) return;
        const small = window.matchMedia("(max-width: 767px)").matches;
        try {
          ribbon = new Ribbon({
            container,
            eventTarget: stage,
            images: projects.map((p) => (small ? smallCover(p.image) : p.image)),
            scrollStep: SCROLL_STEP,
            scrollHold: SCROLL_HOLD,
            onActive: (index, direction) => {
              setActive(index);
              swapMarquee(index, direction);
            },
            onFocusFrame,
          });
        } catch {
          setWebglFailed(true);
          return;
        }
        ribbonRef.current = ribbon;
        const engine = ribbon;

        // Created after the intro pin above (child effects run first): refresh last
        const progress = ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          refreshPriority: -1,
          onUpdate: (self) => engine.setProgress(self.progress),
        });
        engine.setProgress(progress.progress);
        progressTriggerRef.current = progress;

        triggers.push(
          progress,
          // Render only while on screen
          ScrollTrigger.create({
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            refreshPriority: -1,
            onToggle: (self) => engine.setRunning(self.isActive),
          }),
          // Fetch the covers one screen ahead
          ScrollTrigger.create({
            trigger: root,
            start: "top bottom+=100%",
            end: "bottom top-=100%",
            refreshPriority: -1,
            onToggle: (self) => self.isActive && engine.loadTextures(),
          })
        );
        triggers.forEach((trigger) => {
          if (trigger.isActive) trigger.vars.onToggle?.(trigger);
        });
      })
      .catch(() => {
        if (!cancelled) setWebglFailed(true);
      });

    return () => {
      cancelled = true;
      triggers.forEach((trigger) => trigger.kill());
      progressTriggerRef.current = null;
      ribbon?.destroy();
      ribbonRef.current = null;
    };
  }, [fallback]);

  // Counter flash on change
  useEffect(() => {
    if (!counterRef.current) return;
    gsap.fromTo(counterRef.current, { color: ACCENT }, { color: "#ffffff", duration: 0.6, ease: "power2.out" });
  }, [active]);

  // UI reveal when the stage enters
  useGSAP(
    () => {
      if (fallback || !rootRef.current) return;
      gsap.fromTo(
        ".ribbon-ui",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 60%" },
        }
      );
    },
    { scope: rootRef, dependencies: [fallback] }
  );

  // Taps (and clicks outside the hover link) open the card under the pointer
  const onStageClick = async (e: React.MouseEvent) => {
    if ((e.target as Element).closest("a, button")) return;
    const index = await ribbonRef.current?.pickAt(e.clientX, e.clientY);
    if (index != null) router.push(`/projects/${projects[index].slug}`);
  };

  // Segment → scroll to that card
  const goTo = (index: number) => {
    const trigger = progressTriggerRef.current;
    if (!trigger) return;
    const last = count - 1;
    const total = last * SCROLL_STEP;
    const p = (index / last) * (total / (total + SCROLL_HOLD));
    gsap.to(window, {
      scrollTo: { y: trigger.start + p * (trigger.end - trigger.start), autoKill: true },
      duration: 1,
      ease: "power2.inOut",
    });
  };

  if (fallback) return <RibbonFallback />;

  const category = t.projects.categories[getProjectCategory(project)];

  return (
    <div
      ref={rootRef}
      data-dark
      className="relative bg-ink text-white"
      style={{ height: `${SCREENS * 100}svh` }}
    >
      <div
        ref={stageRef}
        onClick={onStageClick}
        className="sticky top-0 h-svh overflow-hidden"
      >
        {/* Giant title of the active project, behind the cards */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none overflow-hidden"
        >
          <div ref={marqueeRef}>
            <div
              className="animate-scroll flex w-max whitespace-nowrap text-[clamp(4.5rem,13vw,12rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.04em] text-white/90"
              style={{ fontFamily: "var(--font-display)", animationDuration: "45s" }}
            >
              <MarqueeWords title={projects[0].title} />
            </div>
          </div>
        </div>

        {/* three.js canvas */}
        <div ref={canvasRef} className="absolute inset-0" />

        {/* Hover link over the flattened card, with the slit title band */}
        <Link
          ref={hitRef}
          href={`/projects/${focused.slug}`}
          data-cursor-project
          aria-hidden
          tabIndex={-1}
          className="absolute left-0 top-0 overflow-hidden"
          style={{ visibility: "hidden", pointerEvents: "none" }}
        >
          <span
            className="absolute inset-x-0 bottom-0 flex items-center overflow-hidden bg-ink/90 backdrop-blur-sm"
            style={{
              height: "calc(var(--card-h, 300px) * 0.15)",
              transform: "translateY(calc((1 - var(--p, 0)) * 101%))",
            }}
          >
            <span
              className="animate-scroll flex w-max whitespace-nowrap font-extrabold uppercase tracking-[-0.02em] text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "calc(var(--card-h, 300px) * 0.075)",
                animationDuration: "14s",
              }}
            >
              <MarqueeWords title={focused.title} />
            </span>
          </span>
        </Link>

        {/* Top bar */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between px-6 pt-24 md:px-12 md:pt-28 lg:px-16 xl:px-24">
          <span
            className="ribbon-ui text-sm font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-accent">#</span> {t.projects.allProjects}
          </span>
          <span
            className="ribbon-ui text-sm font-bold tabular-nums"
            style={{ fontFamily: "var(--font-display)" }}
            aria-live="polite"
          >
            <span ref={counterRef}>{pad(active + 1)}</span>
            <span className="text-white/40"> / {pad(count)}</span>
          </span>
        </div>

        {/* Keeps the bars readable over the cards */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink via-ink/75 to-transparent md:h-64"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 to-transparent"
        />

        {/* Bottom bar */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-6 md:px-12 md:pb-10 lg:px-16 xl:px-24">
          <div className="ribbon-ui mb-5 flex items-end justify-between gap-6 md:mb-7">
            <div className="min-w-0">
              <p className="mb-1.5 text-xs text-white/50 md:text-sm" style={{ fontFamily: "var(--font-body)" }}>
                {category} · {project.year} · {projectTypeLabels[locale][project.projectType]}
              </p>
              <h3
                className="truncate text-2xl font-extrabold tracking-[-0.03em] md:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.title}
              </h3>
            </div>
            <div className="hidden shrink-0 md:block">
              <PillButton href={`/projects/${project.slug}`}>{t.projects.viewProject}</PillButton>
            </div>
            <Link
              href={`/projects/${project.slug}`}
              aria-label={`${t.projects.viewProject} — ${project.title}`}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-ink md:hidden"
            >
              <ArrowIcon />
            </Link>
          </div>

          {/* Progress segments */}
          <div className="ribbon-ui flex gap-1 md:gap-1.5">
            {projects.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => goTo(i)}
                aria-label={p.title}
                aria-current={i === active}
                className="group flex-1 py-2"
              >
                <span
                  className={`block h-[3px] rounded-full transition-colors duration-300 ${
                    i === active ? "bg-accent" : i < active ? "bg-white/55" : "bg-white/15 group-hover:bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Plain list for screen readers and crawlers */}
      <ol className="sr-only" aria-label={t.projects.allProjects}>
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={`/projects/${p.slug}`}>
              {p.title} — {t.projects.categories[getProjectCategory(p)]}, {p.year}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
