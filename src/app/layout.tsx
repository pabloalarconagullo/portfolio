import type { Metadata, Viewport } from "next";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";

import { displayName, site } from "@content/site";
import { MobileCta } from "@/components/mobile-cta";
import { RevealObserver } from "@/components/reveal-observer";
import { plainText } from "@/components/notes";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { baseUrl } from "@/lib/seo";

import "./globals.css";

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  weight: "400",
  variable: "--font-newsreader",
  display: "swap",
});

const description = plainText(site.hero.intro);

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: site.role ? `${displayName}, ${site.role.toLowerCase()}` : displayName,
    template: `%s · ${displayName}`,
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: displayName,
    title: displayName,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  // Mientras no haya dominio configurado, que no se indexe una URL provisional.
  robots: site.url ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edeff1" },
    { media: "(prefers-color-scheme: dark)", color: "#141a26" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${grotesk.variable} ${newsreader.variable}`}>
      <body className="min-h-dvh antialiased">
        <SiteHeader name={site.name} />
        <main id="contenido" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <MobileCta />
        <RevealObserver />
      </body>
    </html>
  );
}
