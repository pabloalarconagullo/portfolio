"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef, useState } from "react";

import { sendContact } from "@/app/actions";
import { summarize, type ContactField, type ContactState } from "@/lib/contact";

type Option = { value: string; label: string };

export function ContactForm({
  email,
  services,
  budgets,
  timelines,
  reference,
  plan,
}: {
  email: string | null;
  services: string[];
  budgets: string[];
  timelines: string[];
  /** Proyecto desde el que llega la persona («Quiero algo así»). */
  reference: Option | null;
  /** Plan de precios elegido («Elegir este plan»). */
  plan: Option | null;
}) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const [linked, setLinked] = useState(reference);
  const [chosenPlan, setChosenPlan] = useState(plan);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  // Tras enviar: foco en el primer campo con error o en el mensaje de resultado.
  useEffect(() => {
    if (state.status === "invalid") {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    } else if (state.status !== "idle") {
      resultRef.current?.focus();
    }
  }, [state]);

  if (state.status === "sent") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-[1.25rem] border-2 border-cobalt p-8">
        <p className="text-2xl font-bold tracking-[-0.02em]">Enviado.</p>
        <p className="mt-2 text-graphite">He recibido tu mensaje y te responderé al correo que has indicado.</p>
      </div>
    );
  }

  const values = state.status === "idle" ? {} : state.values;
  const errors = state.status === "invalid" ? state.errors : {};
  const fieldId = (f: string) => `${uid}-${f}`;
  const describe = (f: ContactField | "privacidad") => (errors[f] ? `${fieldId(f)}-error` : undefined);
  const mailto =
    email &&
    `mailto:${email}?subject=${encodeURIComponent("Solicitud de presupuesto")}&body=${encodeURIComponent(summarize(values))}`;

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-6" noValidate>
      {(state.status === "not_configured" || state.status === "error") && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="rounded-[1.25rem] border-2 border-cobalt p-5">
          <p className="font-semibold">
            {state.status === "not_configured"
              ? "El envío del formulario aún no está conectado: no se ha enviado nada."
              : "No se ha podido enviar el mensaje. Inténtalo de nuevo en unos minutos."}
          </p>
          {mailto ? (
            <p className="mt-2">
              Puedes{" "}
              <a href={mailto} className="link-mark font-semibold">
                enviarlo desde tu correo
              </a>{" "}
              con lo que has escrito ya incluido, o escribir a {email}.
            </p>
          ) : (
            <p className="mt-2">
              <span className="pending">Pendiente: correo de contacto (site.email)</span>
            </p>
          )}
        </div>
      )}

      {linked && (
        <div className="flex flex-wrap items-center gap-3 rounded-[0.75rem] bg-marker px-4 py-3 text-on-marker">
          <input type="hidden" name="proyecto" value={linked.value} />
          <span>
            Quieres algo como <strong>{linked.label}</strong>.
          </span>
          <button type="button" onClick={() => setLinked(null)} className="underline underline-offset-2">
            Quitar referencia
          </button>
        </div>
      )}

      {chosenPlan && (
        <div className="flex flex-wrap items-center gap-3 rounded-[0.75rem] bg-marker px-4 py-3 text-on-marker">
          <input type="hidden" name="plan" value={chosenPlan.value} />
          <span>
            Te interesa el plan <strong>{chosenPlan.label}</strong>.
          </span>
          <button type="button" onClick={() => setChosenPlan(null)} className="underline underline-offset-2">
            Quitar plan
          </button>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Field id={fieldId("nombre")} label="Nombre" error={errors.nombre}>
          <input
            id={fieldId("nombre")}
            name="nombre"
            autoComplete="name"
            required
            defaultValue={values.nombre}
            aria-invalid={!!errors.nombre}
            aria-describedby={describe("nombre")}
            className="field"
          />
        </Field>
        <Field id={fieldId("email")} label="Correo" error={errors.email}>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={values.email}
            aria-invalid={!!errors.email}
            aria-describedby={describe("email")}
            className="field"
          />
        </Field>
      </div>

      <div className={`grid gap-6 ${budgets.length > 0 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        <Field id={fieldId("tipo")} label="Qué necesitas" optional>
          <Select id={fieldId("tipo")} name="tipo" options={[...services, "Otra cosa"]} value={values.tipo} />
        </Field>
        {budgets.length > 0 && (
          <Field id={fieldId("presupuesto")} label="Presupuesto orientativo" optional>
            <Select id={fieldId("presupuesto")} name="presupuesto" options={budgets} value={values.presupuesto} />
          </Field>
        )}
        <Field id={fieldId("plazo")} label="Plazo" optional>
          <Select id={fieldId("plazo")} name="plazo" options={timelines} value={values.plazo} />
        </Field>
      </div>

      <Field id={fieldId("mensaje")} label="Cuéntame el proyecto" error={errors.mensaje}>
        <textarea
          id={fieldId("mensaje")}
          name="mensaje"
          rows={6}
          required
          minLength={20}
          maxLength={4000}
          defaultValue={values.mensaje}
          aria-invalid={!!errors.mensaje}
          aria-describedby={[`${fieldId("mensaje")}-hint`, describe("mensaje")].filter(Boolean).join(" ")}
          className="field resize-y"
        />
        <p id={`${fieldId("mensaje")}-hint`} className="mt-1.5 text-sm text-graphite">
          Qué haces hoy, qué te gustaría que cambiara y quién lo usaría.
        </p>
      </Field>

      {/* Trampa para bots: invisible para personas y lectores de pantalla. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          Web
          <input name="web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="privacidad"
            value="si"
            required
            aria-invalid={!!errors.privacidad}
            aria-describedby={describe("privacidad")}
            className="mt-0.5 size-5 shrink-0 accent-[var(--cobalt)]"
          />
          <span className="text-[0.95rem]">
            Acepto que uses estos datos solo para responder a mi solicitud, según la{" "}
            <Link href="/privacidad" className="link-mark">
              política de privacidad
            </Link>
            .
          </span>
        </label>
        {errors.privacidad && <FieldError id={`${fieldId("privacidad")}-error`} text={errors.privacidad} />}
      </div>

      <div>
        <button type="submit" className="btn btn-primary min-w-48" disabled={pending}>
          {pending ? "Enviando…" : "Enviar"}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-semibold">
        {label}
        {optional && <span className="font-normal text-graphite"> (opcional)</span>}
      </label>
      {children}
      {error && <FieldError id={`${id}-error`} text={error} />}
    </div>
  );
}

function FieldError({ id, text }: { id: string; text: string }) {
  return (
    <p id={id} className="mt-1.5 text-[0.95rem] font-semibold text-cobalt">
      {text}
    </p>
  );
}

function Select({ id, name, options, value }: { id: string; name: string; options: string[]; value?: string }) {
  return (
    // La clave fuerza a aplicar el valor devuelto por el servidor (React no reaplica defaultValue en select).
    <select key={value ?? ""} id={id} name={name} defaultValue={value ?? ""} className="field">
      <option value="">Elige una opción</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
