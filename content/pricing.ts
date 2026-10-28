/**
 * Tarifas que se muestran en la sección «Precios» de la portada.
 *
 * Importes y contenido de cada plan indicados por ti (tomados como referencia de websbybaltuki.com).
 * Antes de publicar, revisa que puedes cumplir todo lo que incluye cada plan (hosting y dominio
 * incluidos, soporte 24/7, horas de desarrollo…) y si los precios llevan IVA.
 *
 * - `price: null` muestra «Hablemos» en lugar de una cifra.
 * - `featured: true` marca el plan como «Más popular» (uno por grupo).
 */

export type Plan = {
  id: string;
  name: string;
  description: string;
  /** Importe en euros. `null`: se acuerda tras hablar. */
  price: number | null;
  /** Periodo que se añade al precio, p. ej. «año». */
  per?: string;
  features: string[];
  featured?: boolean;
};

export type PlanGroup = {
  id: string;
  label: string;
  plans: Plan[];
};

export const pricing = {
  /**
   * Aclaración fiscal bajo los precios, p. ej. «Precios sin IVA (21 %)» o «IVA incluido».
   * Mientras sea `null` se muestra «Pendiente».
   */
  taxNote: null as string | null,
  groups: [
    {
      id: "diseno",
      label: "Diseño y desarrollo",
      plans: [
        {
          id: "diseno-basico",
          name: "Básico",
          description: "Perfecto para pequeñas empresas y proyectos personales.",
          price: 350,
          features: [
            "Hasta 5 páginas",
            "Diseño atractivo",
            "Configuración SEO básica",
            "Formulario de contacto",
            "Mantenimiento trimestral por 1 año",
            "Incluye hosting por 1 año",
            "Dominio gratis por 1 año",
          ],
        },
        {
          id: "diseno-profesional",
          name: "Profesional",
          description: "Ideal para empresas en crecimiento que necesitan más funciones.",
          price: 500,
          featured: true,
          features: [
            "Hasta 15 páginas",
            "Animaciones avanzadas",
            "Optimización SEO completa",
            "Formulario de contacto avanzado",
            "Mantenimiento mensual por 1 año",
            "Incluye hosting por 1 año",
            "Dominio gratis por 1 año",
          ],
        },
        {
          id: "diseno-empresarial",
          name: "Empresarial",
          description: "Hablamos primero y definimos el alcance.",
          price: null,
          features: [
            "Páginas ilimitadas",
            "Funcionalidad personalizada",
            "Integraciones avanzadas",
            "Optimización de rendimiento",
            "Soporte prioritario",
            "Revisiones ilimitadas",
            "Mantenimiento mensual por 1 año",
          ],
        },
      ],
    },
    {
      id: "mantenimiento",
      label: "Hosting y mantenimiento",
      plans: [
        {
          id: "mantenimiento-basico",
          name: "Básico",
          description: "Mantenimiento esencial para sitios pequeños.",
          price: 200,
          per: "año",
          features: [
            "Actualizaciones de seguridad",
            "Modificaciones menores trimestrales",
            "Copias de seguridad semanales",
            "Monitorización de disponibilidad",
            "Analíticas básicas",
            "Soporte por correo",
          ],
        },
        {
          id: "mantenimiento-profesional",
          name: "Profesional",
          description: "Cuidado integral para webs de empresa.",
          price: 350,
          per: "año",
          featured: true,
          features: [
            "Todo lo del plan Básico",
            "Actualizaciones de contenido",
            "Monitorización del rendimiento",
            "Informes mensuales",
            "Soporte prioritario",
            "2 horas de desarrollo al mes",
          ],
        },
        {
          id: "mantenimiento-empresarial",
          name: "Empresarial",
          description: "Gestión completa del servicio.",
          price: null,
          per: "año",
          features: [
            "Todo lo del plan Profesional",
            "Gestor dedicado",
            "Soporte 24/7",
            "Seguridad avanzada",
            "8 horas de desarrollo al mes",
            "Consultoría estratégica",
          ],
        },
      ],
    },
  ] satisfies PlanGroup[] as PlanGroup[],
};

const euros = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export function formatPrice(plan: Plan) {
  return plan.price === null ? "Hablemos" : euros.format(plan.price);
}

/** Plan por id, con el nombre de su grupo (para el formulario de contacto). */
export function getPlan(id: string) {
  for (const group of pricing.groups) {
    const plan = group.plans.find((p) => p.id === id);
    if (plan) return { ...plan, group: group.label };
  }
  return undefined;
}

export function planLabel(plan: Plan & { group: string }) {
  const price = plan.price === null ? "" : ` (${formatPrice(plan)}${plan.per ? `/${plan.per}` : ""})`;
  return `${plan.name} · ${plan.group}${price}`;
}
