import type { Project } from "@content/projects";
import { services } from "@content/services";
import { site } from "@content/site";

import { ContactForm } from "./contact-form";
import { Pending } from "./pending";

/** Bloque de contacto: formulario + canales directos en el margen. */
export function ContactBlock({
  reference = null,
  plan = null,
}: {
  reference?: Project | null;
  /** Plan de precios desde el que llega la persona. */
  plan?: { value: string; label: string } | null;
}) {
  return (
    <div className="with-margin">
      <ContactForm
        email={site.email}
        services={services.map((s) => s.title)}
        budgets={site.contact.budgets}
        timelines={site.contact.timelines}
        reference={reference ? { value: reference.slug, label: reference.title } : null}
        plan={plan}
      />
      <aside aria-label="Otras formas de contacto" className="flex flex-col gap-6">
        <dl className="flex flex-col gap-6">
          <div>
            <dt className="text-sm text-graphite">Correo</dt>
            <dd className="mt-1 break-words text-lg font-semibold">
              {site.email ? (
                <a href={`mailto:${site.email}`} className="link-mark">
                  {site.email}
                </a>
              ) : (
                <Pending what="tu correo" />
              )}
            </dd>
          </div>
          {site.channels.map((channel) => (
            <div key={channel.href}>
              <dt className="text-sm text-graphite">{channel.label}</dt>
              <dd className="mt-1 text-lg font-semibold">
                <a href={channel.href} className="link-mark" target="_blank" rel="noopener">
                  {channel.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
        <p className="t-note">Respondo personalmente a cada mensaje. Tus datos solo se usan para contestarte.</p>
      </aside>
    </div>
  );
}
