"use client";

import Link from "next/link";
import { useState } from "react";

import { formatPrice, pricing } from "@content/pricing";

import { Pending } from "./pending";
import { Section } from "./section";

/** Tarifas en tres columnas, con selector entre «Diseño y desarrollo» y «Hosting y mantenimiento». */
export function PricingSection() {
  const [groupId, setGroupId] = useState(pricing.groups[0].id);
  const group = pricing.groups.find((g) => g.id === groupId) ?? pricing.groups[0];

  return (
    <Section id="precios" title="Precios" aside="Elige si necesitas que haga tu web o que la mantenga en marcha.">
      <div role="group" aria-label="Tipo de servicio" className="mb-12 inline-flex rounded-[4px] border border-ink p-1">
        {pricing.groups.map((g) => {
          const pressed = g.id === group.id;
          return (
            <button
              key={g.id}
              type="button"
              aria-pressed={pressed}
              aria-controls="planes"
              onClick={() => setGroupId(g.id)}
              className={`min-h-11 rounded-[3px] px-4 font-semibold transition-colors sm:px-5 ${
                pressed ? "bg-ink text-paper" : "text-ink hover:bg-paper-2"
              }`}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      <ul id="planes" className="grid gap-6 lg:grid-cols-3 lg:gap-0">
        {group.plans.map((plan, i) => (
          // Las columnas se mantienen al cambiar de grupo; solo su contenido se sustituye (y se anima).
          <li
            key={i}
            data-reveal=""
            style={{ ["--i" as string]: i * 2 }}
            className={`flex rounded-[4px] ${
              plan.featured ? "bg-ink text-paper lg:-my-6" : "border-t-2 border-ink lg:rounded-none"
            }`}
          >
            <div key={plan.id} className="plan-swap flex w-full flex-col p-7 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-2xl font-bold tracking-[-0.02em]">{plan.name}</h3>
                {plan.featured && (
                  <span className="rounded-[3px] bg-marker px-2.5 py-1 text-sm font-semibold text-on-marker">
                    Más popular
                  </span>
                )}
              </div>
              <p className={`mt-2 ${plan.featured ? "opacity-80" : "text-graphite"}`}>{plan.description}</p>

              <p className="num mt-8 flex items-baseline gap-1.5">
                <span className="text-[clamp(2.75rem,2.2rem+2vw,3.75rem)] font-extrabold leading-none tracking-[-0.04em]">
                  {formatPrice(plan)}
                </span>
                {plan.price !== null && plan.per && (
                  <span className={plan.featured ? "opacity-80" : "text-graphite"}>/{plan.per}</span>
                )}
              </p>

              <ul className="mb-9 mt-8 flex grow flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-[0.7em] h-0.5 w-3 shrink-0 ${plan.featured ? "bg-marker" : "bg-ink"}`}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={`/contacto?plan=${plan.id}`}
                aria-label={`${plan.price === null ? "Hablemos" : "Elegir este plan"}: ${plan.name}, ${group.label.toLowerCase()}`}
                className={`btn w-full ${
                  plan.featured ? "bg-marker text-on-marker hover:bg-paper hover:text-ink" : "btn-quiet"
                }`}
              >
                {plan.price === null ? "Hablemos" : "Elegir este plan"}
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-sm text-graphite lg:mt-14">
        {pricing.taxNote ?? <Pending what="si los precios incluyen IVA (pricing.taxNote)" />}
      </p>
    </Section>
  );
}
