/**
 * Servicios y proceso de trabajo.
 *
 * PROPUESTO: redactado a partir de los proyectos que hay en tu disco. Cambia nombres,
 * entregables y pasos para que describan exactamente cómo trabajas.
 * `examples` enlaza con proyectos de content/projects.ts (por su `slug`); solo se
 * muestran los que estén visibles.
 */

export type Service = {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  examples: string[];
};

export const services: Service[] = [
  {
    id: "aplicaciones",
    title: "Aplicaciones web a medida",
    description:
      "Cuando una hoja de cálculo o un programa genérico ya no da más de sí: una aplicación pensada para tu forma de trabajar.",
    deliverables: [
      "Análisis del flujo de trabajo actual",
      "Diseño de pantallas y prototipo",
      "Aplicación publicada con su documentación",
    ],
    examples: ["lexlaboral", "jobpilot"],
  },
  {
    id: "herramientas",
    title: "Herramientas internas y automatización",
    description:
      "Lo repetitivo, automatizado: clasificar documentos, calcular plazos, generar escritos o consultar un archivo propio.",
    deliverables: [
      "Automatización de una tarea concreta",
      "Interfaz sencilla para quien la usa a diario",
      "Registro de lo que hace la herramienta",
    ],
    examples: ["clasificador", "elementos-esenciales", "jurisprudencia"],
  },
  {
    id: "local",
    title: "Software privado que funciona en tu equipo",
    description:
      "Para datos que no deben salir de la oficina: aplicaciones que trabajan sin nube, sin cuentas y sin telemetría.",
    deliverables: [
      "Aplicación de escritorio o web local",
      "Instalador o acceso directo",
      "Copias de seguridad bajo tu control",
    ],
    examples: ["pdf-studio", "localpdf"],
  },
  {
    id: "webs",
    title: "Webs profesionales",
    description:
      "Una web rápida y clara que explique lo que haces y convierta visitas en contactos.",
    deliverables: [
      "Estructura y textos orientados a captar clientes",
      "SEO técnico y rendimiento medidos",
      "Formulario de contacto conectado",
    ],
    examples: [],
  },
];

export type ProcessStep = {
  title: string;
  description: string;
  /** Lo que la persona recibe al terminar el paso. */
  outcome: string;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Conversación",
    description: "Hablamos del problema, de quién usará la herramienta y de qué pasa hoy sin ella.",
    outcome: "Un resumen por escrito de lo hablado.",
  },
  {
    title: "Propuesta",
    description: "Defino el alcance, lo que queda fuera, los plazos y el precio.",
    outcome: "Una propuesta que puedes aceptar, ajustar o rechazar.",
  },
  {
    title: "Construcción por entregas",
    description: "Construyo por partes que puedes probar mientras avanzan, no todo al final.",
    outcome: "Versiones intermedias funcionando.",
  },
  {
    title: "Puesta en marcha",
    description: "Publico o instalo la aplicación, explico su uso y ajusto lo que surja.",
    outcome: "La herramienta en uso y su documentación.",
  },
];
