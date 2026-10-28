import type { StaticImageData } from "next/image";

import graduadoSocialRedShot from "@/assets/projects/graduado-social-red.png";
import jurisprudenciaShot from "@/assets/projects/jurisprudencia.png";
import pabloAlarconShot from "@/assets/projects/pablo-alarcon.png";
import pablokuShot from "@/assets/projects/pabloku.png";
import pdfStudioShot from "@/assets/projects/pdf-studio.png";

/**
 * Proyectos del portfolio.
 *
 * Los textos salen de los README de cada carpeta en X:\PABLO\PROYECTO; las capturas son
 * las que generaron sus propias pruebas. No hay fechas, clientes ni cifras de uso porque
 * no constan en ningún sitio: añádelos tú si quieres mostrarlos.
 *
 * - `visible: false` oculta un proyecto en toda la web (y en el sitemap).
 * - `featured: true` lo muestra a página completa en la portada (necesita `image`).
 * - `notes[].at` coloca la nota sobre la captura (porcentaje desde la esquina superior izquierda).
 */

export type ProjectKind = "web" | "escritorio" | "local" | "pwa" | "juego";

export const kindLabels: Record<ProjectKind, string> = {
  web: "Web",
  escritorio: "Escritorio",
  local: "Funciona en local",
  pwa: "Instalable (PWA)",
  juego: "Juego",
};

export type ProjectNote = {
  text: string;
  at?: { x: number; y: number };
};

export type Project = {
  slug: string;
  title: string;
  kinds: ProjectKind[];
  /** Una línea: qué es. */
  summary: string;
  /** Qué problema resuelve y para quién. */
  problem: string;
  features: string[];
  stack: string[];
  /** Notas técnicas que van al margen. */
  notes: ProjectNote[];
  image?: { src: StaticImageData; alt: string };
  links: { label: string; href: string }[];
  /** Crédito o aclaración obligatoria que se muestra junto al proyecto. */
  credit?: string;
  featured?: boolean;
  visible: boolean;
};

export const projects: Project[] = [
  {
    slug: "pablo-alarcon",
    title: "Web profesional de Graduado Social",
    kinds: ["web"],
    summary: "Mi web como Graduado Social en Elche y Alicante, con calculadora de indemnización por despido.",
    problem:
      "Explicar a trabajadores y empresas, sin letra pequeña, en qué puedo ayudarles con contratos, nóminas, despidos o una inspección, y facilitar que cuenten su caso.",
    features: [
      "Once páginas de servicio: despido, reclamación de cantidad, sanciones, Inspección de Trabajo…",
      "Calculadora de indemnización por despido improcedente u objetivo",
      "Formulario de contacto con el asunto ya elegido desde cada servicio",
      "Preguntas frecuentes y datos estructurados para buscadores",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Lenis", "Motion", "Resend"],
    notes: [
      { text: "La cifra se calcula en el navegador: no se envía ningún dato.", at: { x: 62.4, y: 26.6 } },
      {
        text: "Tramo de 45 días antes del 12/02/2012 y topes de 720 y 1.260 días (art. 56 y DT 11.ª ET).",
        at: { x: 62.4, y: 50 },
      },
      { text: "El botón abre el formulario con el asunto «Despido» ya elegido.", at: { x: 62.4, y: 68.3 } },
    ],
    image: {
      src: pabloAlarconShot,
      alt: "Calculadora de indemnización por despido de la web: tipo de despido, fechas y salario a la izquierda y, a la derecha, la indemnización estimada con su desglose por tramos.",
    },
    links: [{ label: "Visitar la web", href: "https://pablo-alarcon.vercel.app" }],
    featured: true,
    visible: true,
  },
  {
    slug: "graduado-social-red",
    title: "Graduado Social Red",
    kinds: ["web"],
    summary: "Portal de divulgación laboral: calculadoras, convenios colectivos, sentencias comentadas y novedades del BOE.",
    problem:
      "Reunir en un solo sitio las herramientas y la actualidad que un despacho laboral consulta a diario, con modelos de escritos, checklists y guías listos para usar.",
    features: [
      "Calculadoras laborales: despido, plazos, sueldo neto, finiquito, paro…",
      "Modelos de escritos editables para descargar en Word",
      "Normativa, convenios colectivos y jurisprudencia comentada",
      "Blog con el resumen mensual de novedades",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "GitHub Actions"],
    notes: [
      { text: "Unas 600 páginas que un generador propio crea a partir de un único HTML maestro.", at: { x: 15.3, y: 20 } },
      { text: "Buscador y filtros por tipo de recurso dentro de la propia página.", at: { x: 8.4, y: 63.5 } },
      { text: "Cada publicación se despliega sola y solo sube los archivos que han cambiado." },
    ],
    image: {
      src: graduadoSocialRedShot,
      alt: "Página de recursos de Graduado Social Red: categorías de herramientas, modelos, checklists y guías, un buscador, filtros por tipo y las primeras calculadoras.",
    },
    links: [{ label: "Visitar la web", href: "https://graduadosocialred.es" }],
    featured: true,
    visible: true,
  },
  {
    slug: "pdf-studio",
    title: "PDF Studio Local",
    kinds: ["escritorio", "local"],
    summary: "Editor PDF de escritorio, local y privado.",
    problem:
      "Editar, firmar, convertir y proteger documentos con datos personales sin enviarlos a un servicio en la nube. Sin cuentas, sin nube y sin telemetría.",
    features: [
      "Edición directa del texto del PDF, anotaciones e imágenes",
      "Unir, separar, extraer, rotar y reordenar páginas",
      "Conversión a Word, Excel, PowerPoint, HTML e imágenes",
      "OCR local en español e inglés con PDF buscable",
      "Firma visual y firma digital con certificado .p12/.pfx",
      "Cifrado AES-256 y redacción permanente de datos sensibles",
      "Comparación de versiones y operaciones por lotes",
    ],
    stack: ["Electron", "React", "TypeScript", "Vite", "pdf-lib", "MuPDF", "PDF.js", "Tesseract.js", "Vitest"],
    notes: [
      { text: "OCR con Tesseract en local, en español e inglés.", at: { x: 3, y: 42.5 } },
      { text: "Separar, unir y reordenar páginas con pdf-lib y MuPDF.", at: { x: 88, y: 55 } },
      { text: "El documento se procesa en el equipo: nunca sale hacia un servidor.", at: { x: 11.5, y: 98 } },
    ],
    image: {
      src: pdfStudioShot,
      alt: "PDF Studio Local con un contrato de ejemplo abierto: miniaturas de páginas a la izquierda, documento en el centro y panel de organización de páginas a la derecha.",
    },
    links: [],
    featured: true,
    visible: true,
  },
  {
    slug: "jurisprudencia",
    title: "Jurisprudencia social",
    kinds: ["local"],
    summary: "Base de conocimiento privada sobre las crónicas de jurisprudencia de la Sala Cuarta del Tribunal Supremo.",
    problem:
      "Consultar años de crónicas en PDF sin perder la referencia exacta: cada respuesta lleva a la página del PDF con el pasaje resaltado, y lo que no consta en la fuente se dice.",
    features: [
      "Importación de colecciones de PDF sin modificar los originales",
      "Detección de resoluciones citadas, ECLI y citas normativas",
      "Búsqueda híbrida con explicación de cada resultado",
      "Asistente que responde solo con pasajes del corpus y citas verificables",
      "Revisión humana de los datos dudosos, con registro de decisiones",
      "Dosieres en DOCX, PDF y Markdown",
    ],
    stack: ["Python", "FastAPI", "PyMuPDF", "Búsqueda semántica local"],
    notes: [
      { text: "Lo dudoso va a una cola de revisión: nada se corrige sin intervención humana.", at: { x: 12.5, y: 39.5 } },
      { text: "Cada decisión queda registrada.", at: { x: 47.5, y: 44.7 } },
      { text: "Funciona sin Internet y sin conectores a fuentes externas.", at: { x: 10, y: 63 } },
    ],
    image: {
      src: jurisprudenciaShot,
      alt: "Pantalla de revisión de Jurisprudencia social con el menú lateral y tablas de incidencias detectadas en documentos, páginas y resoluciones.",
    },
    links: [],
    featured: true,
    visible: true,
  },
  {
    slug: "pabloku",
    title: "¿Quién ha matado a Dodi?",
    kinds: ["juego", "web", "pwa"],
    summary: "Juego web de deducción: colocas a cada sospechoso en el plano y descubres al culpable.",
    problem:
      "Un puzle de lógica para jugar en el navegador, también sin conexión, con un caso nuevo cada día y clasificación opcional.",
    features: [
      "Casos por épocas con distintos niveles de dificultad",
      "Pistas con coste en la puntuación y modo notas",
      "Caso del día con clasificación opcional",
      "Funciona sin conexión e instalable como aplicación",
    ],
    stack: ["React", "TypeScript", "Vite", "Zustand", "Tailwind CSS", "Supabase", "Vitest", "Playwright"],
    notes: [
      { text: "Cada pista resta puntuación: el jugador decide cuándo pedirla.", at: { x: 89.5, y: 20.5 } },
      { text: "El tablero lo valida un motor de reglas propio, con pruebas unitarias.", at: { x: 54, y: 43 } },
      { text: "La clasificación del caso del día se valida en el servidor." },
    ],
    image: {
      src: pablokuShot,
      alt: "Partida de «¿Quién ha matado a Dodi?»: fichas de sospechosos a la izquierda, plano de la escena en cuadrícula en el centro y controles de pistas a la derecha.",
    },
    links: [{ label: "Jugar", href: "https://quien-ha-matado-a-dodi.vercel.app" }],
    credit: "Basado en Murdoku, el puzle de asesinatos creado por Manuel Garand.",
    featured: true,
    visible: true,
  },
  {
    slug: "lexlaboral",
    title: "LEXLABORAL",
    kinds: ["web"],
    summary: "Simulador práctico de Derecho del Trabajo y Procedimiento Laboral.",
    problem:
      "Practicar con expedientes ficticios el trabajo profesional de un graduado social: entrevista, análisis, cálculos, prueba, conciliación, demanda, vista y sentencia simulada.",
    features: [
      "Doce expedientes completos con decisiones y consecuencias",
      "Motor de simulación local por fases",
      "Evaluación transparente sin IA, con rúbricas",
      "Modos aprendizaje, examen y estudio",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zod", "IndexedDB", "Vitest", "Playwright"],
    notes: [
      { text: "Sin claves ni servicios de IA en tiempo de ejecución: todo se evalúa en el navegador." },
      { text: "El progreso se guarda en el propio navegador (IndexedDB)." },
    ],
    links: [],
    visible: true,
  },
  {
    slug: "localpdf",
    title: "LocalPDF",
    kinds: ["web", "local"],
    summary: "Aplicación web local para unir, dividir, convertir, firmar y comprimir PDF.",
    problem:
      "Las operaciones habituales con PDF sin subir los documentos a Internet: casi todo ocurre en el navegador y el resto en un servidor local que solo escucha en el propio equipo.",
    features: [
      "Unir, dividir, organizar y comprimir",
      "Editar, firmar y proteger",
      "Lanzador con acceso directo en Windows",
    ],
    stack: ["Next.js", "React", "TypeScript", "pdf-lib", "MuPDF", "PDF.js", "Vitest"],
    notes: [{ text: "El servidor auxiliar solo escucha en 127.0.0.1." }],
    links: [],
    visible: true,
  },
  {
    slug: "jobpilot",
    title: "JobPilot AI",
    kinds: ["web"],
    summary: "Copiloto de búsqueda de empleo.",
    problem:
      "Analiza el currículum, importa ofertas, estima la compatibilidad, adapta el CV a cada oferta sin inventar datos y organiza las candidaturas.",
    features: [
      "Análisis de currículum y compatibilidad con ofertas",
      "Adaptación del CV sin inventar datos",
      "Borradores de cartas de presentación",
      "Seguimiento de candidaturas y recordatorios",
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Stripe", "Claude API", "Vitest", "Playwright"],
    notes: [{ text: "Interfaz preparada para varios idiomas." }],
    links: [],
    visible: true,
  },
  {
    slug: "clasificador",
    title: "Clasificador de notificaciones",
    kinds: ["local"],
    summary: "Lee notificaciones de LexNET, sedes electrónicas y correo, y calcula los plazos.",
    problem:
      "Extrae organismo, tipo de acto, cliente, expediente, plazo y señalamientos de cada notificación y los ordena por urgencia en una web local.",
    features: [
      "Entrada por arrastre, carpeta vigilada o correo IMAP",
      "Cálculo de vencimientos con festivos configurables",
      "Vista por cliente con su historial",
    ],
    stack: ["Node.js", "Claude API", "IMAP"],
    notes: [{ text: "El correo solo se lee: no marca mensajes como leídos ni borra nada." }],
    links: [],
    visible: true,
  },
  {
    slug: "actas",
    title: "Actas de reunión",
    kinds: ["pwa", "local"],
    summary: "Graba, transcribe y resume reuniones con clientes.",
    problem:
      "Convertir una reunión en un acta: el audio se transcribe en local y solo la transcripción y las notas se envían para redactar el resumen.",
    features: ["Grabación y transcripción local", "Acta estructurada a partir de la transcripción", "Instalable y con datos en el dispositivo"],
    stack: ["JavaScript", "Whisper en local", "IndexedDB", "Claude API"],
    notes: [{ text: "El audio del cliente no sale del equipo." }],
    links: [],
    visible: true,
  },
  {
    slug: "mi-dia",
    title: "Mi Día",
    kinds: ["pwa"],
    summary: "Aplicación personal para el móvil: calendario, tareas, finanzas, notas y un asistente.",
    problem:
      "Reunir en una sola app instalable lo que suele estar repartido en muchas: calendario sincronizado con Google, finanzas personales, notas, deporte y más.",
    features: [
      "Calendario sincronizado con Google Calendar",
      "Finanzas personales con importación de movimientos bancarios",
      "Sincronización entre dispositivos y copia en Google Drive",
      "Bloqueo con huella",
    ],
    stack: ["JavaScript", "PWA", "Google APIs", "Supabase", "Claude API"],
    notes: [{ text: "Sin compilación: HTML, CSS y JavaScript estáticos." }],
    links: [],
    visible: true,
  },
  {
    slug: "elementos-esenciales",
    title: "Elementos esenciales del contrato",
    kinds: ["local"],
    summary: "Herramienta para cumplir el deber de información del RD 723/2026.",
    problem:
      "Preparar el documento informativo de los elementos esenciales del contrato y avisar de los plazos de entrega, introduciendo los datos de cada empresa una sola vez.",
    features: [
      "Semáforo de cumplimiento por apartado",
      "Documento informativo y comunicación de modificaciones",
      "Funciona abriendo un archivo, sin instalación",
    ],
    stack: ["JavaScript", "HTML", "CSS"],
    notes: [{ text: "Los datos se guardan solo en el navegador del equipo." }],
    links: [],
    visible: true,
  },
  {
    slug: "cym-web",
    title: "Web corporativa de una asesoría",
    kinds: ["web"],
    summary: "Web corporativa de una asesoría fiscal, laboral y contable.",
    problem:
      "Renovar la web de una asesoría con décadas de trayectoria: contenido ordenado por áreas, equipo, actualidad y un formulario de contacto, sin perder las direcciones de la web anterior.",
    features: [
      "Páginas de servicio con preguntas frecuentes",
      "Equipo por departamentos y sección de actualidad",
      "Formulario con validación y protección frente a spam",
      "Redirecciones permanentes desde la web anterior",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zod", "Resend"],
    notes: [
      { text: "Analítica solo tras el consentimiento; sin él no se carga." },
      { text: "Transiciones entre páginas con View Transitions de React." },
    ],
    links: [],
    visible: true,
  },
];

export const visibleProjects = projects.filter((p) => p.visible);
export const featuredProjects = visibleProjects.filter((p) => p.featured && p.image);

export function getProject(slug: string) {
  return visibleProjects.find((p) => p.slug === slug);
}
