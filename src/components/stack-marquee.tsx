import Image from "next/image";

import { visibleProjects } from "@content/projects";

/** Tecnologías usadas en los proyectos publicados, sin repetir, por orden de uso. */
function stackByUse() {
  const count = new Map<string, number>();
  for (const p of visibleProjects) for (const t of p.stack) count.set(t, (count.get(t) ?? 0) + 1);
  return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
}

/**
 * Franja ultramar bajo el hero: una tira de capturas reales que se desliza con el scroll
 * (`data-strip`) y una cinta continua con las tecnologías de los proyectos (`data-marquee`).
 * Sin movimiento, la tira queda quieta y la cinta se muestra como una lista que salta de línea.
 * La tira es decorativa: los mismos proyectos tienen su propia sección justo debajo.
 */
export function StackMarquee() {
  const stack = stackByUse();
  const shots = visibleProjects.filter((p) => p.image);
  const items = (hidden: boolean) =>
    stack.map((tech) => (
      <li key={tech} aria-hidden={hidden || undefined} className="flex items-center gap-8 pr-8">
        <span>{tech}</span>
        <span aria-hidden="true" className="size-2.5 rotate-45 bg-marker" />
      </li>
    ));

  return (
    <section aria-labelledby="tecnologias-titulo" className="blue-field relative overflow-hidden py-12 md:py-20">
      <h2 id="tecnologias-titulo" className="sr-only">
        Tecnologías que uso en estos proyectos
      </h2>

      {shots.length > 0 && (
        <div aria-hidden="true" className="strip-viewport py-4">
          <div data-strip="" className="strip-track flex w-max gap-4 px-5 md:gap-6 md:px-10">
            {shots.map((p, i) => (
              <div
                key={p.slug}
                className="strip-card aspect-[16/10] w-[17rem] shrink-0 overflow-hidden rounded-[0.75rem] bg-paper sm:w-[24rem] md:w-[32rem]"
                style={{ ["--tilt" as string]: i % 2 === 0 ? "-1.2deg" : "1.2deg" }}
              >
                <Image src={p.image!.src} alt="" sizes="(min-width: 48rem) 32rem, (min-width: 40rem) 24rem, 17rem" className="size-full object-cover object-top" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="marquee mt-10 overflow-hidden md:mt-16">
        <ul
          data-marquee=""
          className="marquee-track t-wide flex w-max text-[clamp(1.75rem,1.1rem+2.4vw,3.6rem)] font-extrabold tracking-[-0.04em]"
        >
          {items(false)}
          {/* Copia para cerrar el bucle sin salto; los lectores de pantalla la ignoran. */}
          {items(true)}
        </ul>
      </div>
    </section>
  );
}
