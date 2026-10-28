/**
 * Datos personales y textos generales del portfolio.
 *
 * Todo lo que vale `null` es un dato que solo tú conoces: mientras no lo rellenes,
 * la web muestra una marca visible «Pendiente» en su lugar (o lo oculta si es opcional).
 *
 * Los textos marcados con «PROPUESTO» los he redactado yo a partir de tus proyectos:
 * revísalos y cámbialos por tus palabras.
 */

import type { StaticImageData } from "next/image";

import portrait from "@/assets/retrato.jpeg";

export type HeroNote = {
  /** Debe coincidir con la marca `[texto](id)` del titular. */
  id: string;
  text: string;
};

export type ContactChannel = {
  label: string;
  href: string;
  /** Texto visible, p. ej. el correo o el teléfono. */
  value: string;
};

export const site = {
  /** Tu nombre tal y como quieres que aparezca. */
  name: "Pablo Alarcón Agulló" as string | null,
  /** Cómo te presentas en una línea. PROPUESTO. */
  role: "Graduado Social y desarrollador web" as string | null,
  /** Ciudad o zona desde la que trabajas. Opcional. */
  location: "Elche, Alicante" as string | null,
  /** Dominio definitivo, sin barra final. Se usa para SEO, sitemap y redes sociales. */
  url: null as string | null,
  /** Idioma principal del sitio. */
  locale: "es_ES",

  /** Correo de contacto público. Si es `null`, no se ofrece contacto por correo. */
  email: null as string | null,
  /** Otros canales opcionales (WhatsApp, teléfono, agenda de citas…). */
  channels: [] as ContactChannel[],
  /** Perfiles públicos opcionales (GitHub, LinkedIn…). */
  profiles: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/alarconagullopablo/" }] as {
    label: string;
    href: string;
  }[],

  /**
   * Disponibilidad para nuevos proyectos, p. ej. «Disponible desde enero».
   * Si es `null`, no se muestra.
   */
  availability: null as string | null,

  hero: {
    /**
     * PROPUESTO. Las partes `[texto](id)` se anotan al margen con la nota del mismo id.
     */
    headline:
      "[Construyo](pruebas) aplicaciones web para el trabajo de cada día: [documentos](local), plazos y datos que no pueden fallar.",
    /** PROPUESTO. */
    intro:
      "Webs, herramientas internas y [aplicaciones](plataformas) a medida, diseñadas y programadas de principio a fin: de la primera conversación a la puesta en marcha.",
    /** PROPUESTO, a partir de lo que hacen tus proyectos. */
    notes: [
      {
        id: "pruebas",
        text: "Con pruebas automáticas en un navegador real (Playwright) en varios de los proyectos.",
      },
      {
        id: "local",
        text: "Varias aplicaciones procesan los archivos en tu propio equipo, sin subirlos a ningún servidor.",
      },
      {
        id: "plataformas",
        text: "Web, escritorio (Electron) y móvil instalable (PWA).",
      },
    ] satisfies HeroNote[],
  },

  about: {
    /** Tu retrato (importado de src/assets). Opcional. */
    portrait: {
      src: portrait,
      alt: "Pablo Alarcón Agulló sentado en su puesto de trabajo, con dos monitores con código detrás.",
    } as { src: StaticImageData; alt: string } | null,
    /**
     * Párrafos sobre ti. PROPUESTOS: redactados solo con datos de tu web profesional y de tus
     * proyectos (sin años de experiencia, clientes ni cifras). Cámbialos por tus palabras.
     */
    paragraphs: [
      "Soy Graduado Social en Elche (Alicante), especializado en Derecho del Trabajo y de la Seguridad Social. Contratos, nóminas, despidos y plazos son mi trabajo diario, y de ahí salen muchas de las herramientas que ves en esta web.",
      "Diseño y programo cada proyecto de principio a fin: webs profesionales como la mía o Graduado Social Red, aplicaciones de escritorio, herramientas que funcionan sin conexión y hasta un juego de deducción.",
      "Conozco por dentro el trabajo de un despacho: notificaciones con plazos que no pueden pasarse, documentos con datos personales y sentencias que hay que citar con exactitud. Por eso construyo herramientas que se pueden comprobar, que no sacan los datos del equipo cuando no hace falta y que se explican sin letra pequeña.",
      "Si en tu despacho o en tu empresa hay una tarea que te roba horas cada semana, cuéntamela.",
    ] as string[],
  },

  contact: {
    /** PROPUESTO. */
    title: "Cuéntame qué necesitas",
    /** PROPUESTO. */
    intro:
      "Explícame el problema con tus palabras, aunque aún no sepas cómo resolverlo. Te contesto con preguntas concretas o con una primera propuesta.",
    /**
     * Rangos de presupuesto que ofreces en el formulario, p. ej. ["Menos de 2.000 €", "2.000–5.000 €"].
     * Si la lista está vacía, el campo no aparece.
     */
    budgets: [] as string[],
    timelines: ["Lo antes posible", "En los próximos 1–3 meses", "Sin fecha, estoy explorando"],
  },

  legal: {
    /** Titular de la web (nombre y apellidos o razón social). */
    owner: "Pablo Alarcón Agulló" as string | null,
    /** NIF/NIE del titular. */
    taxId: null as string | null,
    /** Dirección postal a efectos legales. */
    address: null as string | null,
  },
};

/** Nombre que se usa en títulos cuando aún no has configurado el tuyo. */
export const displayName = site.name ?? "Portfolio";
