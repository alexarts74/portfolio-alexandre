"use client";

import { useLanguage } from "@/app/i18n/LanguageContext";

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={() => setLocale("en")}
        className={`text-xs font-light tracking-[0.15em] uppercase transition-opacity ${
          locale === "en" ? "opacity-100" : "opacity-50 hover:opacity-80"
        }`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        EN
      </button>
      <span className="text-xs opacity-30">/</span>
      <button
        onClick={() => setLocale("fr")}
        className={`text-xs font-light tracking-[0.15em] uppercase transition-opacity ${
          locale === "fr" ? "opacity-100" : "opacity-50 hover:opacity-80"
        }`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        FR
      </button>
    </div>
  );
}
