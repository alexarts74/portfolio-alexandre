"use client";

import Link from "next/link";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { useInView } from "@/app/hooks/useInView";

export default function Footer() {
  const { t, locale } = useLanguage();
  const { ref: footerRef, isVisible } = useInView({ threshold: 0.1 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="w-full bg-black py-16 md:py-20 lg:py-24 text-white">
      <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
        {/* CTA Section */}
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h3
            className="text-3xl font-light tracking-wide md:text-4xl lg:text-5xl mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {locale === "en" ? "Have a project in mind?" : "Un projet en tête ?"}
          </h3>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 border border-white/30 px-8 py-4 text-sm font-light tracking-wider text-white uppercase transition-all duration-300 hover:bg-white hover:text-black"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {locale === "en" ? "Let's talk" : "Discutons"}
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10 mb-12" />

        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 md:gap-10">
          {/* Brand */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "0.1s" }}
          >
            <h4
              className="text-2xl font-light tracking-[0.1em] uppercase md:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Alexandre
            </h4>
            <p
              className="mt-4 max-w-md text-base font-light leading-relaxed text-white/70"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {locale === "en"
                ? "Full stack developer passionate about creating elegant and performant web applications. Available for freelance projects and collaborations."
                : "Développeur full stack passionné par la création d'applications web élégantes et performantes. Disponible pour des projets freelance et collaborations."}
            </p>
          </div>

          {/* Navigation */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <h4
              className="mb-4 text-sm font-light tracking-[0.2em] text-white/50 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-base font-light text-white/80 transition-all duration-300 hover:text-white hover:translate-x-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {locale === "en" ? "Home" : "Accueil"}
              </Link>
              <a
                href="#projets"
                className="text-base font-light text-white/80 transition-all duration-300 hover:text-white hover:translate-x-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t.footer.nav.projects}
              </a>
              <a
                href="#about"
                className="text-base font-light text-white/80 transition-all duration-300 hover:text-white hover:translate-x-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t.footer.nav.about}
              </a>
              <Link
                href="/contact"
                className="text-base font-light text-white/80 transition-all duration-300 hover:text-white hover:translate-x-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t.footer.nav.contact}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            <h4
              className="mb-4 text-sm font-light tracking-[0.2em] text-white/50 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t.footer.nav.contact}
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:artusalexandre74@gmail.com"
                className="text-base font-light text-white/80 transition-all duration-300 hover:text-white hover:translate-x-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                artusalexandre74@gmail.com
              </a>
              <a
                href="https://github.com/alexandreMusic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-light text-white/80 transition-all duration-300 hover:text-white hover:translate-x-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/alexandre-music"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-light text-white/80 transition-all duration-300 hover:text-white hover:translate-x-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`mt-12 md:mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/20 pt-6 md:flex-row transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          <p
            className="text-sm font-light text-white/50 tracking-wider uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            © {new Date().getFullYear()} Alexandre Design. {t.footer.rights}
          </p>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm font-light text-white/50 tracking-wider uppercase transition-all duration-300 hover:text-white"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {locale === "en" ? "Go Back To Top" : "Retour en haut"}
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
