"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { translations, Locale, TranslationKeys } from "./translations";

const STORAGE_KEY = "locale";
const DEFAULT_LOCALE: Locale = "fr";

// The saved locale lives in localStorage, an external store: read it with
// useSyncExternalStore instead of copying it into state from an effect.
// memoryLocale keeps the switcher working when storage is unavailable.
let memoryLocale: Locale = DEFAULT_LOCALE;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "fr") return saved;
  } catch {
    // Storage blocked (private mode, disabled site data)
  }
  return memoryLocale;
}

function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

function saveLocale(locale: Locale) {
  memoryLocale = locale;
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Storage blocked: memoryLocale still holds the choice for this visit
  }
  listeners.forEach((listener) => listener());
}

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale: saveLocale,
        t: translations[locale],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
