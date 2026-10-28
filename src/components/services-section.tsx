import Link from "next/link";

import { getProject } from "@content/projects";
import { services } from "@content/services";

import { Section } from "./section";

export function ServicesSection() {
  return (
    <Section
      id="servicios"
      title="Qué puedo construir para ti"
      aside="Cada servicio enlaza con un proyecto real que lo demuestra, cuando lo hay."
    >
      <ul className="border-t-2 border-ink">
        {services.map((service) => {
          const examples = service.examples.map(getProject).filter((p) => p !== undefined);
          return (
            <li key={service.id} data-reveal="" className="group with-margin border-b border-rule py-10 md:py-14">
              <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
                <div>
                  <h3 className="stretch-hover text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] font-extrabold leading-[1.02] tracking-[-0.035em] [--wdth:108]">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-[48ch] text-graphite">{service.description}</p>
                </div>
                <div>
                  <h4 className="text-sm text-graphite">Qué recibes</h4>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 rotate-45 bg-cobalt" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="t-note">
                {examples.length > 0 ? (
                  <>
                    {examples.length > 1 ? "Ejemplos reales:" : "Ejemplo real:"}{" "}
                    {examples.map((p, i) => (
                      <span key={p.slug}>
                        {i > 0 && (i === examples.length - 1 ? " y " : ", ")}
                        <Link href={`/proyectos/${p.slug}`} className="underline decoration-1 underline-offset-[0.2em] hover:decoration-2">
                          {p.title}
                        </Link>
                      </span>
                    ))}
                    .
                  </>
                ) : (
                  <span className="text-graphite">Sin ejemplo publicado todavía.</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
