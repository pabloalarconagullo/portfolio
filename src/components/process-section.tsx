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
                className="process-step flex flex-col border-t border-ink pt-5"
                style={{ ["--i" as string]: i * 2 }}
              >
                <span aria-hidden="true" className="num text-[3.25rem] font-extrabold leading-none tracking-[-0.04em] text-cobalt">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-[-0.02em]">
                  <span className="sr-only">Paso {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mb-6 mt-2 max-w-[34ch] grow text-graphite">{step.description}</p>
                <p className="border-l-2 border-marker pl-3 text-[0.95rem]">
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
