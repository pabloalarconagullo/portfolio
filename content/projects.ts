import type { StaticImageData } from "next/image";

import actasShot from "@/assets/projects/actas.png";
import clasificadorShot from "@/assets/projects/clasificador.png";
import elementosEsencialesShot from "@/assets/projects/elementos-esenciales.png";
import graduadoSocialRedShot from "@/assets/projects/graduado-social-red.png";
import jarvisShot from "@/assets/projects/jarvis.png";
import jobpilotShot from "@/assets/projects/jobpilot.png";
import jurisprudenciaShot from "@/assets/projects/jurisprudencia.png";
import lexlaboralShot from "@/assets/projects/lexlaboral.png";
import localpdfShot from "@/assets/projects/localpdf.png";
import miDiaShot from "@/assets/projects/mi-dia.png";
import pabloAlarconShot from "@/assets/projects/pablo-alarcon.png";
import pablokuShot from "@/assets/projects/pabloku.png";
import panelVisitasShot from "@/assets/projects/panel-visitas.png";
import pdfStudioShot from "@/assets/projects/pdf-studio.png";
import all4plansShot from "@/assets/projects/all4plans.png";
import pricepilotShot from "@/assets/projects/pricepilot.png";
import reaccionInversaShot from "@/assets/projects/reaccion-inversa.png";
import tradingSimulatorShot from "@/assets/projects/trading-simulator-pro.png";
import webBodaShot from "@/assets/projects/web-boda.png";

/**
 * Proyectos del portfolio.
 *
 * Los textos salen de los README de cada carpeta en X:\PABLO\PROYECTO; las capturas son
 * las que generaron sus propias pruebas o, si no había, se sacaron arrancando cada app con
 * datos de ejemplo ficticios (nunca datos reales de clientes). No hay fechas, clientes ni cifras de uso porque
 * no constan en ningún sitio: añádelos tú si quieres mostrarlos.
 *
 * - `visible: false` oculta un proyecto en toda la web (y en el sitemap).
 * - `featured: true` lo muestra a página completa en la portada (necesita `image`).
 * - `notes[].at` coloca la nota sobre la captura (porcentaje desde la esquina superior izquierda).
 */

export type ProjectKind = "web" | "escritorio" | "local" | "pwa" | "juego" | "movil";

export const kindLabels: Record<ProjectKind, string> = {
  web: "Web",
  escritorio: "Escritorio",
  local: "Funciona en local",
  pwa: "Instalable (PWA)",
  juego: "Juego",
  movil: "App móvil",
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
    summary: "Mi web como Graduado Social en Elche y Alicante, con calculadoras de despido y finiquito y un asistente de plazos.",
    problem:
      "Explicar a trabajadores y empresas, sin letra pequeña, en qué puedo ayudarles con contratos, nóminas, despidos o una inspección, y facilitar que cuenten su caso.",
    features: [
      "Páginas de servicio: despido, reclamación de cantidad, sanciones, Inspección de Trabajo…",
      "Calculadora de indemnización por despido improcedente u objetivo",
      "Calculadora de finiquito y una página específica para empresas",
      "Asistente «¿Qué hago con mi caso?» que orienta sobre plazos y el siguiente paso",
      "Formulario de contacto con el asunto ya elegido desde cada servicio",
      "Preguntas frecuentes y datos estructurados para buscadores",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Lenis", "Motion", "Resend"],
    notes: [
      { text: "La cifra se calcula en el navegador: no se envía ningún dato.", at: { x: 75, y: 21 } },
      {
        text: "Tramo de 45 días antes del 12/02/2012 y topes de 720 y 1.260 días (art. 56 y DT 11.ª ET).",
        at: { x: 80, y: 41 },
      },
      { text: "El botón abre el formulario con el asunto «Despido» ya elegido.", at: { x: 63.6, y: 49 } },
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
    title: "Caso Dodi",
    kinds: ["juego", "web", "pwa"],
    summary: "Juego web de deducción con aspecto de expediente policial: colocas a cada sospechoso en el plano y descubres al culpable.",
    problem:
      "Un puzle de lógica para jugar en el navegador, también sin conexión, con un caso nuevo cada día y clasificación opcional.",
    features: [
      "Casos por épocas con distintos niveles de dificultad",
      "Modos clásico, contrarreloj y práctica, y el especial «Un testigo miente»",
      "Pistas con coste en la puntuación y modo notas",
      "Caso del día con clasificación opcional",
      "Funciona sin conexión e instalable como aplicación",
    ],
    stack: ["React", "TypeScript", "Vite", "Zustand", "Tailwind CSS", "Supabase", "Vitest", "Playwright"],
    notes: [
      { text: "Cada pista resta puntuación: el jugador decide cuándo pedirla.", at: { x: 89.5, y: 25 } },
      { text: "El tablero lo valida un motor de reglas propio, con pruebas unitarias.", at: { x: 54, y: 43 } },
      { text: "La clasificación del caso del día se valida en el servidor." },
    ],
    image: {
      src: pablokuShot,
      alt: "Partida de Caso Dodi: fichas de sospechosos a la izquierda, plano de la escena en el centro, con sus casillas y objetos, y a la derecha los controles de pistas, notas y validación.",
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
    image: {
      src: lexlaboralShot,
      alt: "Expediente abierto en LEXLABORAL: fases de la tramitación a la izquierda y la entrevista inicial con el cliente, con las preguntas disponibles, a la derecha.",
    },
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
    image: {
      src: localpdfShot,
      alt: "Portada de LocalPDF con el titular «Todas tus herramientas PDF en un solo lugar» y una zona para soltar archivos que se leen en el propio navegador.",
    },
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
    image: {
      src: jobpilotShot,
      alt: "Portada de JobPilot AI con un ejemplo de análisis de compatibilidad entre un CV y una oferta: puntuación, requisitos demostrados, por confirmar y ausentes.",
    },
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
    image: {
      src: clasificadorShot,
      alt: "Bandeja de notificaciones con datos ficticios: contadores por urgencia y una lista ordenada por vencimiento con organismo, expediente y qué hay que hacer.",
    },
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
    image: {
      src: actasShot,
      alt: "Reunión de ejemplo en Actas: notas del profesional a la izquierda y el acta generada a la derecha, con plazos, tareas y puntos clave.",
    },
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
    image: {
      src: miDiaShot,
      alt: "Pantalla de inicio de Mi Día con datos de ejemplo: agenda del día, recordatorios y racha de deporte.",
    },
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
    image: {
      src: elementosEsencialesShot,
      alt: "Panel de cumplimiento con datos de ejemplo: contadores de empresas, contratos e incidencias y la lista de tareas y alertas por persona.",
    },
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
  {
    slug: "jarvis",
    featured: true,
    title: "JARVIS",
    kinds: ["pwa", "local"],
    summary: "Asistente personal que corre en mi ordenador y se usa desde el móvil como app instalable.",
    problem:
      "Tener en un solo sitio la agenda, las finanzas, los documentos y el correo, con un asistente que trabaja en local: un modelo instalado en el propio ordenador, y la nube solo si la activo.",
    features: [
      "Chat por voz y por texto con un modelo local (Ollama)",
      "Memoria revisable: lo que deduce del chat queda «sin confirmar» hasta que lo aprueba",
      "Agenda, tareas, viajes y lista de la compra",
      "Finanzas con importación de extractos en CSV o Excel y vista previa antes de guardar",
      "Documentos con OCR local y búsqueda dentro del texto",
      "Correo y Telegram: enviar siempre lo confirma el usuario",
      "Copias de seguridad nocturnas que se comprueban",
    ],
    stack: ["Python", "FastAPI", "SQLite", "React", "TypeScript", "Vite", "Ollama", "Tailscale"],
    notes: [
      { text: "Pulsa el núcleo para hablar o escribe: Jarvis responde hablando y vuelve a escuchar.", at: { x: 45.5, y: 31 } },
      { text: "Estado del servidor y de la base de datos, siempre a la vista.", at: { x: 80.5, y: 42 } },
      { text: "Cada cuenta se crea desde la consola: no hay registro público." },
    ],
    image: {
      src: jarvisShot,
      alt: "Inicio de JARVIS en modo oscuro con un usuario de demostración: saludo, núcleo de voz para hablar con el asistente, campo para escribir, accesos a agenda y finanzas y el estado del servidor.",
    },
    links: [],
    visible: true,
  },
  {
    slug: "reaccion-inversa",
    featured: true,
    title: "Reacción inversa",
    kinds: ["web"],
    summary: "Puzle diario para el navegador: adivina qué bola se lanzó para provocar la reacción en cadena.",
    problem:
      "Un puzle de lógica con un reto nuevo cada día, en tres intentos, y un generador que comprueba que solo un lanzamiento produce el tablero final.",
    features: [
      "Reto diario con racha y opción de compartir el resultado",
      "Modo práctica para seguir jugando fuera del reto",
      "Bolas que chocan, muros, flechas, hoyos y bombas que explotan en cadena",
    ],
    stack: ["JavaScript", "HTML", "CSS", "Node.js (node:test)"],
    notes: [
      { text: "Sin dependencias: HTML, CSS y módulos de JavaScript." },
      { text: "La semilla de cada puzle es la fecha del reto, así todos juegan el mismo tablero." },
      { text: "Las pruebas del motor comprueban las reglas y que cada puzle tenga solución única." },
    ],
    image: {
      src: reaccionInversaShot,
      alt: "Reto del día de Reacción inversa: arriba, cómo acabó el tablero con las bolas y los huecos; abajo, el tablero inicial, donde hay que tocar la bola que se movió.",
    },
    links: [],
    visible: true,
  },
  {
    slug: "panel-visitas",
    featured: true,
    title: "Panel de visitas de la web",
    kinds: ["local"],
    summary: "Panel personal que cruza Google Search Console y Analytics para ver cómo llegan visitas a la web y qué publicar después.",
    problem:
      "Saber cada día si la web aparece en Google, qué páginas conviene publicar o mejorar y si una caída coincide con una tanda de publicaciones, sin entrar en varios paneles distintos.",
    features: [
      "Evolución diaria de las veces que la web aparece en Google",
      "Páginas del sitemap publicadas cada día frente a las caídas",
      "Lista «Qué hacer ahora»: publicar, mejorar o revisar, por rentabilidad",
      "Origen de las visitas y aviso de caída",
    ],
    stack: ["Node.js", "Google Search Console", "Google Analytics", "HTML"],
    notes: [
      { text: "Genera una página HTML que se abre en el navegador, sin servidor propio." },
      { text: "Las cifras reales se leen con una cuenta de servicio de Google; la captura usa datos de ejemplo." },
    ],
    image: {
      src: panelVisitasShot,
      alt: "Panel de visitas con datos de ejemplo: titular con los clics desde Google, tres cifras clave, un aviso de datos de ejemplo y la gráfica diaria de apariciones en Google con las publicaciones del sitemap debajo.",
    },
    links: [],
    visible: true,
  },
  {
    slug: "trading-simulator-pro",
    featured: true,
    title: "Trading Simulator Pro",
    kinds: ["web", "pwa"],
    summary: "Simulador de bolsa personal con dinero ficticio: órdenes, cartera, estadísticas y precios de fuentes gratuitas.",
    problem:
      "Practicar la compra y venta de activos sin arriesgar nada. Cada operación se ejecuta de forma virtual, y el precio y la calidad del dato se muestran siempre a la vista.",
    features: [
      "Órdenes de mercado, límite, stop, Stop Loss y Take Profit",
      "Cartera, historial y estadísticas de rendimiento y riesgo",
      "Gráficos con temporalidades de 1 minuto a 1 mes e indicadores",
      "Calidad del dato visible: tiempo real, retrasado u obsoleto; lo obsoleto nunca se opera",
      "Alertas, noticias, calendario de mercados, backtesting y repetición de sesiones",
    ],
    stack: ["TypeScript", "React", "Vite", "Cloudflare Workers", "Hono", "Supabase", "decimal.js", "Vitest", "Playwright"],
    notes: [
      {
        text: "Captura del modo local: los precios son de prueba. En la versión real salen de fuentes gratuitas.",
        at: { x: 35, y: 23 },
      },
      { text: "El navegador nunca envía el precio de una ejecución: lo obtiene el servidor en ese momento.", at: { x: 74, y: 17 } },
      { text: "Todo el efectivo y las posiciones se mueven en una función SQL con bloqueo; todas las tablas tienen RLS." },
    ],
    image: {
      src: tradingSimulatorShot,
      alt: "Ficha de Apple (AAPL) en Trading Simulator Pro: precio, compra y venta, botones Comprar y Vender y gráfico de velas diario con volumen. Datos de prueba del modo local.",
    },
    links: [],
    visible: true,
  },
  {
    slug: "pricepilot",
    featured: true,
    title: "PricePilot",
    kinds: ["movil"],
    summary: "Comparador de precios para Android: «Nunca compres caro».",
    problem:
      "Saber si un precio es buena oferta de verdad. Compara un producto entre tiendas y, cuando hay datos suficientes, puntúa la oferta; si no los hay, lo dice en lugar de inventar una comparación.",
    features: [
      "Búsqueda por texto o por descripción, y escaneo de códigos",
      "Categorías, mejores oportunidades y favoritos",
      "Puntuación de la oferta frente a su historial de precios",
      "Versión de demostración: productos y precios no son reales hasta conectar fuentes de verdad",
    ],
    stack: ["Expo", "React Native", "TypeScript", "Supabase", "Vitest"],
    notes: [
      { text: "Los datos de demostración van marcados en pantalla; una compilación de producción no los carga.", at: { x: 35, y: 21 } },
      { text: "El plan descarta rastrear webs de tiendas: solo fuentes oficiales, feeds de afiliación y datos abiertos." },
      { text: "Sin historial suficiente no hay puntuación: el detector se abstiene y lo dice." },
    ],
    image: {
      src: pricepilotShot,
      alt: "Inicio de PricePilot en modo oscuro: buscador, aviso de datos de demostración, categorías y las mejores oportunidades con su puntuación.",
    },
    links: [],
    visible: true,
  },
  {
    slug: "all4plans",
    featured: true,
    title: "All4Plans",
    kinds: ["movil"],
    summary: "App móvil para organizar planes y viajes en grupo, con el reparto de gastos incluido.",
    problem:
      "Organizar un plan o un viaje entre varias personas sin hojas de cálculo: itinerario, listas y logística en un sitio, y cada gasto repartido entre el grupo.",
    features: [
      "Itinerario, listas y logística del plan",
      "Reparto de gastos estilo Tricount: quién debe a quién",
      "Invitaciones por enlace y entrada con Google o con correo",
      "Anotar gastos y ver el plan también sin cobertura",
    ],
    stack: ["Expo", "React Native", "TypeScript", "Supabase", "Vitest"],
    notes: [
      { text: "«Apuntar un gasto» funciona sin correo gracias a la entrada como invitado." },
      { text: "Las migraciones y las reglas de seguridad por filas se prueban contra un Postgres real." },
    ],
    image: {
      src: all4plansShot,
      alt: "Pantalla de acceso de All4Plans: el titular «Los planes del grupo y las cuentas, en el mismo sitio», entrada con Google o con correo y los accesos a itinerario, listas, cuentas y coches.",
    },
    links: [],
    credit: "Proyecto en colaboración con otro desarrollador.",
    visible: true,
  },
  {
    slug: "web-boda",
    featured: true,
    title: "Web de boda",
    kinds: ["web"],
    summary: "Web de boda con invitación, cuenta atrás, confirmación de asistencia y panel para los novios.",
    problem:
      "Dar a los invitados todo lo de la boda en un solo sitio —el día, la finca, las mesas y la confirmación— y a los novios, un panel con el estado de las respuestas, los menús y las alergias.",
    features: [
      "Invitación con cuenta atrás, historia, horarios y finca, en español e inglés",
      "Enlace personal por invitado: lo saluda por su nombre y le marca su mesa",
      "Confirmación de asistencia con menú, alergias, niños y autobús",
      "Subida de fotos desde un código QR en las mesas",
      "Panel de los novios con resumen, invitados, mesas y exportación a Excel y PDF para el catering",
      "Modo sin conexión",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "framer-motion"],
    notes: [
      { text: "Los invitados de la captura son datos de prueba ficticios.", at: { x: 36, y: 53 } },
      { text: "De momento funciona solo en local: los datos se guardan en el navegador del equipo." },
    ],
    image: {
      src: webBodaShot,
      alt: "Panel de los novios con datos de prueba: total de invitados, confirmados, pendientes, niños y autobuses, menús, alergias y últimas respuestas.",
    },
    links: [],
    visible: true,
  },
];

export const visibleProjects = projects.filter((p) => p.visible);
export const featuredProjects = visibleProjects.filter((p) => p.featured && p.image);

export function getProject(slug: string) {
  return visibleProjects.find((p) => p.slug === slug);
}
