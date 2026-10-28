import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";

import { displayName, site } from "@content/site";
import { MobileCta } from "@/components/mobile-cta";
import { MotionEffects } from "@/components/motion/motion-effects";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { RevealObserver } from "@/components/reveal-observer";
import { plainText } from "@/components/notes";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { baseUrl } from "@/lib/seo";

import "./globals.css";

// Una sola familia variable en tres anchuras: expandida para titulares, normal para leer y
// estrecha en cursiva para las notas del margen.
const archivo = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  variable: "--font-archivo",
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
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={archivo.variable}>
      <body className="min-h-dvh antialiased">
        <SiteHeader name={site.name} />
        <main id="contenido" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <MobileCta />
        <RevealObserver />
        <SmoothScroll />
        <MotionEffects />
      </body>
    </html>
  );
}
