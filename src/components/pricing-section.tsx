"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

import { formatPrice, pricing } from "@content/pricing";

import { AnimatedPrice } from "./motion/animated-price";
import { Pending } from "./pending";
import { Section } from "./section";

/** Tarifas en tres columnas, con selector entre «Diseño y desarrollo» y «Hosting y mantenimiento». */
export function PricingSection() {
  const [groupId, setGroupId] = useState(pricing.groups[0].id);
  const group = pricing.groups.find((g) => g.id === groupId) ?? pricing.groups[0];
  const groupRef = useRef<HTMLDivElement>(null);

  // La píldora del selector se desliza hasta el botón pulsado.
  useLayoutEffect(() => {
    const root = groupRef.current;
    if (!root) return;
    const place = () => {
      const button = root.querySelector<HTMLElement>("[aria-pressed='true']");
      if (!button) return;
      root.style.setProperty("--pill-x", `${button.offsetLeft}px`);
      root.style.setProperty("--pill-w", `${button.offsetWidth}px`);
    };
    place();
    const resize = new ResizeObserver(place);
    resize.observe(root);
    return () => resize.disconnect();
  }, [groupId]);

  return (
    <Section id="precios" title="Precios" aside="Elige si necesitas que haga tu web o que la mantenga en marcha.">
      <div
        ref={groupRef}
        role="group"
        aria-label="Tipo de servicio"
        className="relative mb-12 inline-flex max-w-full rounded-full bg-paper-2 p-1.5"
      >
        <span aria-hidden="true" className="slider-pill bg-ink [--pill-y:0.375rem] [--pill-h:calc(100%-0.75rem)]" />
        {pricing.groups.map((g) => {
          const pressed = g.id === group.id;
          return (
            <button
              key={g.id}
              type="button"
              aria-pressed={pressed}
              aria-controls="planes"
              onClick={() => setGroupId(g.id)}
              className={`relative z-10 min-h-11 rounded-full px-4 text-[0.95rem] font-semibold transition-colors duration-300 sm:px-6 ${
                pressed ? "text-paper" : "text-ink hover:text-cobalt"
              }`}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      <ul id="planes" className="grid gap-4 lg:grid-cols-3 lg:items-stretch">
        {group.plans.map((plan, i) => (
          // Las columnas se mantienen al cambiar de grupo; solo su contenido se sustituye (y se anima).
          <li
            key={i}
            data-reveal=""
            style={{ ["--i" as string]: i * 2 }}
            className={`flex min-w-0 rounded-[1.25rem] ${plan.featured ? "blue-field lg:-my-5" : "bg-paper-2"}`}
          >
            <div key={plan.id} className="plan-swap flex w-full flex-col p-7 md:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="t-wide text-2xl font-extrabold tracking-[-0.03em]">{plan.name}</h3>
                {plan.featured && (
                  <span className="rounded-full bg-marker px-3 py-1 text-sm font-semibold text-on-marker">
                    Más popular
                  </span>
                )}
              </div>
              <p className={`mt-2 ${plan.featured ? "text-white/85" : "text-graphite"}`}>{plan.description}</p>

              <p className="num mt-9 flex items-baseline gap-1.5">
                {/* «Hablemos» es mucho más ancho que una cifra: va algo más pequeño para caber en la columna. */}
                <span
                  className={`t-wide font-extrabold leading-none tracking-[-0.05em] ${
                    plan.price === null ? "text-[clamp(2.4rem,1.9rem+1.3vw,3.4rem)]" : "text-[clamp(3rem,2.3rem+2.4vw,4.5rem)]"
                  }`}
                >
                  {plan.price === null ? formatPrice(plan) : <AnimatedPrice value={plan.price} />}
                </span>
                {plan.price !== null && plan.per && (
                  <span className={plan.featured ? "text-white/85" : "text-graphite"}>/{plan.per}</span>
                )}
              </p>

              <ul
                className={`mb-9 mt-8 flex grow flex-col gap-2.5 border-t pt-7 ${
                  plan.featured ? "border-white/25" : "border-ink/15"
                }`}
              >
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-[0.55em] size-2 shrink-0 rotate-45 ${plan.featured ? "bg-marker" : "bg-cobalt"}`}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={`/contacto?plan=${plan.id}`}
                aria-label={`${plan.price === null ? "Hablemos" : "Elegir este plan"}: ${plan.name}, ${group.label.toLowerCase()}`}
                className={`btn w-full ${plan.featured ? "btn-on-blue" : "btn-quiet"}`}
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
