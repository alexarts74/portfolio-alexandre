"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import Navigation from "@/app/components/Navigation";
import { ArrowIcon } from "@/app/components/PillButton";
import { SITE } from "@/app/data/site";

type FormState = { name: string; email: string; subject: string; message: string };
const EMPTY_FORM: FormState = { name: "", email: "", subject: "", message: "" };

// Netlify detects the form from public/__forms.html at deploy time; submissions are posted there.
const NETLIFY_FORM_NAME = "contact";

export default function ContactPage() {
  const { t, locale } = useLanguage();
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM);
  const [botField, setBotField] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const mainRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);

  // Entrance timeline (delayed so it plays after the page-transition wipe)
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.5 });
      tl.fromTo(".contact-line", { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.1, ease: "power4.out" })
        .fromTo(".contact-intro", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
        .fromTo(
          ".contact-card",
          { clipPath: "inset(8% 8% 8% 8% round 32px)", opacity: 0 },
          { clipPath: "inset(0% 0% 0% 0% round 32px)", opacity: 1, duration: 1, ease: "power4.inOut", clearProps: "clipPath" },
          "-=0.5"
        )
        .fromTo(".form-field", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.6");
    },
    { scope: mainRef }
  );

  useGSAP(
    () => {
      if (!submitted || !confirmationRef.current) return;
      gsap.fromTo(confirmationRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" });
      const checkPath = confirmationRef.current.querySelector<SVGPathElement>(".check-path");
      if (checkPath) {
        const length = checkPath.getTotalLength();
        gsap.fromTo(
          checkPath,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 0.6, delay: 0.3, ease: "power2.out" }
        );
      }
    },
    { scope: mainRef, dependencies: [submitted] }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    try {
      // Honeypot filled → silently pretend it worked
      if (!botField) {
        // Web3Forms sends the email notification (required to succeed).
        // FormData = "simple" CORS request, no preflight.
        const payload = new FormData();
        payload.append("access_key", SITE.web3formsKey);
        payload.append("subject", `Portfolio — ${formData.subject || "Nouveau message"}`);
        payload.append("from_name", "Portfolio Alexandre");
        payload.append("name", formData.name);
        payload.append("email", formData.email);
        payload.append("sujet", formData.subject);
        payload.append("message", formData.message);
        const mail = fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: payload,
        }).then(async (res) => {
          const json = await res.json().catch(() => null);
          if (!res.ok || !json?.success) throw new Error(`Web3Forms failed: ${res.status}`);
        });

        // Netlify Forms keeps a history in the dashboard (best effort)
        const archive = fetch("/__forms.html", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ "form-name": NETLIFY_FORM_NAME, "bot-field": botField, ...formData }).toString(),
        }).catch(() => undefined);

        await Promise.all([mail, archive]);
      }

      if (formRef.current) {
        await gsap.to(formRef.current, { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" });
      }
      setSubmitted(true);
      setFormData(EMPTY_FORM);
    } catch {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-transparent bg-white px-4 py-3.5 text-base text-ink outline-none transition-[border-color,box-shadow] placeholder:text-neutral-400 focus:border-accent focus:ring-4 focus:ring-accent/15";
  const labelClass = "mb-2 block text-sm font-semibold text-ink";

  return (
    <>
      <Navigation variant="minimal" />

      <main ref={mainRef} className="min-h-screen bg-cream pt-28 pb-10 md:pt-36">
        <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-24">
          {/* Heading */}
          <div className="mb-12 md:mb-16">
            <p className="mb-6 text-sm font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>
              <span className="text-accent">#</span>
              {locale === "en" ? "Get in touch" : "Contact"}
            </p>
            <h1
              className="text-[clamp(2.75rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="block overflow-y-clip pb-[0.05em]">
                <span className="contact-line block">{locale === "en" ? "Let's work" : "Travaillons"}</span>
              </span>
              <span className="block overflow-y-clip pb-[0.05em]">
                <span className="contact-line block text-accent">{locale === "en" ? "together." : "ensemble."}</span>
              </span>
            </h1>
            <p className="contact-intro mt-6 max-w-xl text-lg leading-relaxed text-neutral-600" style={{ fontFamily: "var(--font-body)" }}>
              {locale === "en"
                ? "Have a project in mind? I'd love to hear about it. Send me a message and let's build something great together."
                : "Vous avez un projet en tête ? J'aimerais en savoir plus. Envoyez-moi un message et construisons quelque chose de génial ensemble."}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-12">
            {/* Info card */}
            <aside
              data-dark
              className="contact-card hero-gradient flex flex-col justify-between gap-12 rounded-[2rem] p-8 text-white md:p-10 lg:col-span-5"
            >
              <div>
                <p className="mb-3 text-sm font-semibold text-white/70" style={{ fontFamily: "var(--font-display)" }}>
                  Email
                </p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-xl font-bold tracking-tight [overflow-wrap:anywhere] underline-offset-4 hover:underline sm:text-2xl lg:text-3xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {SITE.email}
                </a>
              </div>

              <div className="space-y-8" style={{ fontFamily: "var(--font-body)" }}>
                <div>
                  <p className="mb-3 text-sm font-semibold text-white/70" style={{ fontFamily: "var(--font-display)" }}>
                    {locale === "en" ? "Social" : "Réseaux"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { href: SITE.socials.github, label: "GitHub" },
                      { href: SITE.socials.linkedin, label: "LinkedIn" },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/40 px-4 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-accent"
                      >
                        {s.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold text-white/70" style={{ fontFamily: "var(--font-display)" }}>
                    {locale === "en" ? "Location" : "Localisation"}
                  </p>
                  <p className="text-base">
                    {SITE.location}
                    <span className="ml-2 text-white/60">· {locale === "en" ? "Available for remote work" : "Disponible en remote"}</span>
                  </p>
                </div>
              </div>
            </aside>

            {/* Form card */}
            <div className="contact-card rounded-[2rem] bg-ink/[0.04] p-6 md:p-10 lg:col-span-7">
              {submitted ? (
                <div ref={confirmationRef} className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                    <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path className="check-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="mb-2 text-2xl font-bold tracking-tight text-ink" style={{ fontFamily: "var(--font-display)" }}>
                    {locale === "en" ? "Message sent!" : "Message envoyé !"}
                  </h2>
                  <p className="mb-6 max-w-sm text-neutral-600" style={{ fontFamily: "var(--font-body)" }}>
                    {locale === "en"
                      ? "Thank you for reaching out. I'll get back to you as soon as possible."
                      : "Merci de m'avoir contacté. Je vous répondrai dès que possible."}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm font-semibold text-accent hover:underline"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {locale === "en" ? "Send another message" : "Envoyer un autre message"}
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  name={NETLIFY_FORM_NAME}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {/* Honeypot (hidden from humans) */}
                  <p className="hidden" aria-hidden>
                    <label>
                      Don&apos;t fill this out: <input name="bot-field" value={botField} onChange={(e) => setBotField(e.target.value)} tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>

                  <div className="form-field grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelClass} style={{ fontFamily: "var(--font-display)" }}>
                        {t.contact.form.name}
                      </label>
                      <input type="text" id="name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass} style={{ fontFamily: "var(--font-display)" }}>
                        {t.contact.form.email}
                      </label>
                      <input type="email" id="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required className={inputClass} />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="subject" className={labelClass} style={{ fontFamily: "var(--font-display)" }}>
                      {t.contact.form.subject}
                    </label>
                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className={inputClass} />
                  </div>

                  <div className="form-field">
                    <label htmlFor="message" className={labelClass} style={{ fontFamily: "var(--font-display)" }}>
                      {t.contact.form.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {error && (
                    <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                      {locale === "en" ? "Something went wrong. You can also email me directly at " : "Une erreur est survenue. Vous pouvez aussi m'écrire directement à "}
                      <a href={`mailto:${SITE.email}`} className="font-semibold underline">
                        {SITE.email}
                      </a>
                      .
                    </p>
                  )}

                  <div className="form-field pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex items-center gap-4 rounded-full bg-accent py-1.5 pl-6 pr-1.5 text-base font-semibold text-white transition-colors hover:bg-[#ff6d38] disabled:cursor-not-allowed disabled:opacity-60"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {isSubmitting ? t.contact.form.sending : t.contact.form.send}
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-accent transition-transform duration-300 group-hover:-rotate-45">
                        {isSubmitting ? (
                          <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden>
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : (
                          <ArrowIcon />
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
