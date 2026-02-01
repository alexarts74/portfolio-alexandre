import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export const metadata: Metadata = {
  title: {
    default: "Alexandre Artus | Développeur Full Stack",
    template: "%s | Alexandre Artus",
  },
  description:
    "Portfolio d'Alexandre Artus, développeur full stack passionné. Découvrez mes projets, compétences et expériences en développement web et mobile.",
  keywords: [
    "développeur",
    "full stack",
    "web",
    "react",
    "next.js",
    "typescript",
    "frontend",
    "backend",
    "developer",
  ],
  authors: [{ name: "Alexandre Artus" }],
  creator: "Alexandre Artus",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    siteName: "Alexandre Artus",
    title: "Alexandre Artus | Développeur Full Stack",
    description:
      "Portfolio d'Alexandre Artus, développeur full stack passionné.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexandre Artus | Développeur Full Stack",
    description:
      "Portfolio d'Alexandre Artus, développeur full stack passionné.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable} scroll-smooth overscroll-none`}>
      <body className="min-h-screen w-full overflow-x-hidden bg-white text-black antialiased leading-relaxed">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
