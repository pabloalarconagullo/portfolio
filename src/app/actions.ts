"use server";

import { getPlan, planLabel } from "@content/pricing";
import { getProject } from "@content/projects";
import { site } from "@content/site";

import { readValues, summarize, validate, type ContactState } from "@/lib/contact";

/**
 * Envía la solicitud de contacto con la API de Resend.
 * Si faltan las variables de entorno, no finge el envío: devuelve `not_configured`
 * y el formulario ofrece escribir por correo.
 */
export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  const values = readValues(form);

  // Trampa para bots: un campo oculto que una persona no ve ni rellena. Nunca se finge el envío.
  if (form.get("web")) return { status: "error", values };

  if (values.proyecto && !getProject(values.proyecto)) delete values.proyecto;
  // El plan llega como id; en el correo se lee mejor con nombre y precio.
  const plan = values.plan ? getPlan(values.plan) : undefined;
  if (plan) values.plan = planLabel(plan);
  else delete values.plan;

  const errors = validate(values, form.get("privacidad") === "si");
  if (Object.keys(errors).length > 0) return { status: "invalid", errors, values };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return { status: "not_configured", values };

  const reference = values.proyecto ? getProject(values.proyecto)?.title : undefined;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Solicitud desde ${site.url ?? "el portfolio"}: ${values.nombre}${reference ? ` (como ${reference})` : ""}`,
        text: summarize(values),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("Resend respondió", response.status, await response.text());
      return { status: "error", values };
    }
  } catch (error) {
    console.error("No se pudo contactar con Resend", error);
    return { status: "error", values };
  }

  return { status: "sent" };
}
