import { processSteps } from "@content/services";

import { Section } from "./section";

/**
 * Proceso de trabajo como una línea de tiempo: cada paso cuelga de un filete.
 * Aquí la numeración sí es información, porque es una secuencia.
 *
 * En escritorio y con movimiento, el bloque se queda fijo mientras se hace scroll: la línea superior
 * se rellena y cada paso se enciende al llegar su turno (MotionEffects, `data-process`).
 */
export function ProcessSection() {
  return (
    <Section id="proceso" title="Cómo trabajamos" aside="Sabes en cada paso qué recibes y qué viene después.">
      <div data-process="">
        <div data-process-sticky="">
          <div aria-hidden="true" className="process-track mb-10 h-1 overflow-hidden rounded-full bg-rule">
            <span data-process-fill="" className="block h-full origin-left bg-cobalt" />
          </div>
          <ol className="grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, i) => (
              <li
                key={step.title}
                data-reveal="rule"
                data-process-step=""
                className="process-step flex flex-col border-t-2 border-ink pt-6"
                style={{ ["--i" as string]: i * 2 }}
              >
                <span aria-hidden="true" className="num t-wide text-[clamp(3.5rem,2.8rem+2.4vw,5.5rem)] font-black leading-[0.85] tracking-[-0.06em] text-cobalt [--wdth:125]">
                  {i + 1}
                </span>
                <h3 className="t-wide mt-6 text-[1.35rem] font-extrabold tracking-[-0.03em] [--wdth:108]">
                  <span className="sr-only">Paso {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mb-6 mt-2 max-w-[34ch] grow text-graphite">{step.description}</p>
                <p className="rounded-[0.75rem] bg-paper-2 px-4 py-3 text-[0.95rem]">
                  <span className="text-graphite">Recibes: </span>
                  {step.outcome}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
