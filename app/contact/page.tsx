"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/app/i18n/LanguageContext";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

export default function ContactPage() {
  const { t, locale } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      {/* Fixed Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
        <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24 flex justify-between items-center py-4">
          <Link
            href="/"
            className="group flex items-center gap-3 text-neutral-600 transition-colors hover:text-black"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform group-hover:-translate-x-1"
            >
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="text-xs font-light tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {locale === "en" ? "Back to home" : "Retour à l'accueil"}
            </span>
          </Link>
          <LanguageSwitcher className="text-neutral-600" />
        </div>
      </nav>

      <main className="min-h-screen bg-white pt-16">
        {/* Hero Section */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
            {/* Section Header */}
            <div className="mb-8 flex items-center gap-4">
              <span
                className="shrink-0 text-xs font-light tracking-[0.3em] text-neutral-400 uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {locale === "en" ? "Get in touch" : "Contact"}
              </span>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            {/* Title */}
            <h1
              className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {locale === "en" ? "Let's work" : "Travaillons"}
              <br />
              <span className="italic text-neutral-400">
                {locale === "en" ? "together" : "ensemble"}
              </span>
            </h1>

            <p
              className="max-w-xl text-lg font-light text-neutral-600 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {locale === "en"
                ? "Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing together."
                : "Vous avez un projet en tête ? J'aimerais en savoir plus. Envoyez-moi un message et créons quelque chose d'incroyable ensemble."}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-20 md:pb-28">
          <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Left - Contact Info */}
              <div>
                {/* Email */}
                <div className="mb-12">
                  <h3
                    className="mb-4 text-xs font-light tracking-[0.3em] text-neutral-400 uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Email
                  </h3>
                  <a
                    href="mailto:contact@alexandre-artus.com"
                    className="text-2xl md:text-3xl font-light tracking-tight transition-colors hover:text-neutral-500"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    contact@alexandre-artus.com
                  </a>
                </div>

                {/* Social Links */}
                <div className="mb-12">
                  <h3
                    className="mb-4 text-xs font-light tracking-[0.3em] text-neutral-400 uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {locale === "en" ? "Social" : "Réseaux"}
                  </h3>
                  <div className="flex flex-col gap-3">
                    <a
                      href="https://github.com/alexandreMusic"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 text-lg font-light transition-colors hover:text-neutral-500"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                      <svg
                        className="w-4 h-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com/in/alexandre-music"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 text-lg font-light transition-colors hover:text-neutral-500"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                      <svg
                        className="w-4 h-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3
                    className="mb-4 text-xs font-light tracking-[0.3em] text-neutral-400 uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {locale === "en" ? "Location" : "Localisation"}
                  </h3>
                  <p
                    className="text-lg font-light text-neutral-600"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Paris, France
                  </p>
                  <p
                    className="text-sm font-light text-neutral-400 mt-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {locale === "en"
                      ? "Available for remote work worldwide"
                      : "Disponible pour le travail à distance dans le monde entier"}
                  </p>
                </div>
              </div>

              {/* Right - Contact Form */}
              <div>
                {submitted ? (
                  <div className="bg-neutral-50 p-8 md:p-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-neutral-900 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3
                      className="text-2xl font-light mb-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {locale === "en" ? "Message sent!" : "Message envoyé !"}
                    </h3>
                    <p
                      className="text-neutral-600 font-light mb-6"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {locale === "en"
                        ? "Thank you for reaching out. I'll get back to you as soon as possible."
                        : "Merci de m'avoir contacté. Je vous répondrai dès que possible."}
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-sm font-light tracking-wider uppercase text-neutral-500 hover:text-black transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {locale === "en" ? "Send another message" : "Envoyer un autre message"}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-xs font-light tracking-[0.2em] text-neutral-400 uppercase"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {t.contact.form.name}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border-b border-neutral-300 bg-transparent py-3 text-lg font-light outline-none transition-colors focus:border-neutral-900"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-xs font-light tracking-[0.2em] text-neutral-400 uppercase"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {t.contact.form.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border-b border-neutral-300 bg-transparent py-3 text-lg font-light outline-none transition-colors focus:border-neutral-900"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block mb-2 text-xs font-light tracking-[0.2em] text-neutral-400 uppercase"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {t.contact.form.subject}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full border-b border-neutral-300 bg-transparent py-3 text-lg font-light outline-none transition-colors focus:border-neutral-900"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block mb-2 text-xs font-light tracking-[0.2em] text-neutral-400 uppercase"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {t.contact.form.message}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full border-b border-neutral-300 bg-transparent py-3 text-lg font-light outline-none transition-colors focus:border-neutral-900 resize-none"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full bg-neutral-900 px-8 py-4 text-sm font-light tracking-wider text-white uppercase transition-all duration-300 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-5 h-5 animate-spin\" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          {t.contact.form.sending}
                        </>
                      ) : (
                        <>
                          {t.contact.form.send}
                          <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-neutral-200 py-8">
          <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24 flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-sm font-light text-neutral-400 tracking-wider uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              © {new Date().getFullYear()} Alexandre Artus
            </p>
            <Link
              href="/"
              className="text-sm font-light text-neutral-400 tracking-wider uppercase hover:text-black transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {locale === "en" ? "Back to home" : "Retour à l'accueil"}
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
}
