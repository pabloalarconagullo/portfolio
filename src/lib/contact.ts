export const contactFields = ["nombre", "email", "tipo", "presupuesto", "plazo", "mensaje", "proyecto", "plan"] as const;

export type ContactField = (typeof contactFields)[number];
export type ContactValues = Partial<Record<ContactField, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<ContactField | "privacidad", string>>; values: ContactValues }
  | { status: "not_configured"; values: ContactValues }
  | { status: "error"; values: ContactValues }
  | { status: "sent" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function readValues(form: FormData): ContactValues {
  const values: ContactValues = {};
  for (const field of contactFields) {
    const raw = form.get(field);
    if (typeof raw === "string" && raw.trim()) values[field] = raw.trim().slice(0, 4000);
  }
  return values;
}

export function validate(values: ContactValues, privacyAccepted: boolean) {
  const errors: Partial<Record<ContactField | "privacidad", string>> = {};
  if (!values.nombre) errors.nombre = "Escribe tu nombre.";
  if (!values.email) errors.email = "Escribe tu correo para poder responderte.";
  else if (!EMAIL.test(values.email)) errors.email = "Revisa el correo: falta algo, por ejemplo la @ o el dominio.";
  if (!values.mensaje) errors.mensaje = "Cuéntame brevemente qué necesitas.";
  else if (values.mensaje.length < 20) errors.mensaje = "Añade un poco más de detalle (al menos 20 caracteres).";
  if (!privacyAccepted) errors.privacidad = "Necesito tu consentimiento para usar estos datos y responderte.";
  return errors;
}

export const fieldLabels: Record<ContactField, string> = {
  nombre: "Nombre",
  email: "Correo",
  tipo: "Qué necesitas",
  presupuesto: "Presupuesto orientativo",
  plazo: "Plazo",
  mensaje: "Mensaje",
  proyecto: "Proyecto de referencia",
  plan: "Plan",
};

/** Texto de la solicitud, igual para el correo enviado y para el enlace mailto de respaldo. */
export function summarize(values: ContactValues) {
  return contactFields
    .filter((f) => values[f] && f !== "mensaje")
    .map((f) => `${fieldLabels[f]}: ${values[f]}`)
    .concat(values.mensaje ? ["", values.mensaje] : [])
    .join("\n");
}
