import { visibleProjects } from "@content/projects";

/** Tecnologías usadas en los proyectos publicados, sin repetir, por orden de uso. */
function stackByUse() {
  const count = new Map<string, number>();
  for (const p of visibleProjects) for (const t of p.stack) count.set(t, (count.get(t) ?? 0) + 1);
  return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
}

/**
 * Cinta continua con las tecnologías de los proyectos. La anima MotionEffects (`data-marquee`);
 * sin movimiento se muestra como una lista que salta de línea.
 */
export function StackMarquee() {
  const stack = stackByUse();
  const items = (hidden: boolean) =>
    stack.map((tech) => (
      <li key={tech} aria-hidden={hidden || undefined} className="flex items-center gap-8 pr-8">
        <span>{tech}</span>
        <span aria-hidden="true" className="size-2 rounded-full bg-cobalt" />
      </li>
    ));

  return (
    <section aria-labelledby="tecnologias-titulo" className="border-y border-rule py-6">
      <h2 id="tecnologias-titulo" className="sr-only">
        Tecnologías que uso en estos proyectos
      </h2>
      <div className="marquee overflow-hidden">
        <ul data-marquee="" className="marquee-track flex w-max text-[clamp(1.5rem,1.1rem+1.6vw,2.6rem)] font-bold tracking-[-0.03em]">
          {items(false)}
          {/* Copia para cerrar el bucle sin salto; los lectores de pantalla la ignoran. */}
          {items(true)}
        </ul>
      </div>
    </section>
  );
}
