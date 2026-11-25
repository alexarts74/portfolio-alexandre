"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { TransitionLink } from "./PageTransition";

type Tone = "light" | "accent" | "dark";

interface PillButtonProps {
  href: string;
  children: ReactNode;
  tone?: Tone;
  /** Use the page-transition wipe (internal routes only). */
  transition?: boolean;
  external?: boolean;
  size?: "md" | "lg";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const TONES: Record<Tone, { pill: string; dot: string }> = {
  light: { pill: "bg-white text-ink hover:bg-white/90", dot: "bg-accent text-white" },
  accent: { pill: "bg-accent text-white hover:bg-[#ff6d38]", dot: "bg-white text-accent" },
  dark: { pill: "bg-ink text-white hover:bg-ink-2", dot: "bg-accent text-white" },
};

export function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
    </svg>
  );
}

export default function PillButton({
  href,
  children,
  tone = "light",
  transition = false,
  external = false,
  size = "md",
  className = "",
  onClick,
}: PillButtonProps) {
  const t = TONES[tone];
  const sizing =
    size === "lg"
      ? "pl-7 pr-2 py-2 gap-5 text-base"
      : "pl-5 pr-1.5 py-1.5 gap-4 text-sm";
  const dotSize = size === "lg" ? "w-12 h-12" : "w-9 h-9";

  const classes = `group inline-flex items-center rounded-full font-semibold transition-colors duration-300 ${sizing} ${t.pill} ${className}`;
  const content = (
    <>
      <span style={{ fontFamily: "var(--font-display)" }}>{children}</span>
      <span
        className={`flex items-center justify-center rounded-full transition-transform duration-300 group-hover:-rotate-45 ${dotSize} ${t.dot}`}
      >
        <ArrowIcon />
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }
  if (transition) {
    return (
      <TransitionLink href={href} className={classes}>
        {content}
      </TransitionLink>
    );
  }
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {content}
    </Link>
  );
}
