"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { kindLabels, type Project, type ProjectKind } from "@content/projects";

type Filter = ProjectKind | "todos";

/**
 * Índice de proyectos como lista tipográfica con filtro por tipo.
 * Al pasar el ratón (o enfocar) una fila, su captura aparece en el margen si existe.
 */
export function ProjectIndex({ projects, headingLevel = 3 }: { projects: Project[]; headingLevel?: 2 | 3 }) {
  const [filter, setFilter] = useState<Filter>("todos");
  const [hovered, setHovered] = useState<string | null>(null);

  const kinds = useMemo(() => {
    const counts = new Map<ProjectKind, number>();
    for (const p of projects) for (const k of p.kinds) counts.set(k, (counts.get(k) ?? 0) + 1);
    return (Object.keys(kindLabels) as ProjectKind[])
      .filter((k) => counts.has(k))
      .map((k) => ({ kind: k, count: counts.get(k) ?? 0 }));
  }, [projects]);

  const shown = filter === "todos" ? projects : projects.filter((p) => p.kinds.includes(filter));
  const preview = shown.find((p) => p.slug === hovered && p.image);
  const Title = `h${headingLevel}` as const;
  const hasImages = projects.some((p) => p.image);

  return (
    <div className="with-margin">
      <div>
        <div role="group" aria-label="Filtrar proyectos por tipo" className="flex flex-wrap gap-2">
          {[{ kind: "todos" as const, count: projects.length }, ...kinds].map(({ kind, count }) => {
            const pressed = filter === kind;
            return (
              <button
                key={kind}
                type="button"
                aria-pressed={pressed}
                onClick={() => setFilter(kind)}
                className={`min-h-10 rounded-full border px-4 py-1.5 text-[0.95rem] font-medium transition-colors ${
                  pressed
                    ? "border-ink bg-ink text-paper"
                    : "border-rule hover:border-ink"
                }`}
              >
                {kind === "todos" ? "Todos" : kindLabels[kind]} <span className="num text-[0.8em] opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="sr-only">
          {shown.length === 1 ? "1 proyecto" : `${shown.length} proyectos`}
        </p>

        <ul className="mt-8 border-t border-rule">
          {shown.map((project, i) => (
            <li key={project.slug} data-reveal="" className="border-b border-rule" style={{ ["--i" as string]: Math.min(i, 5) }}>
              <Link
                href={`/proyectos/${project.slug}`}
                onMouseEnter={() => setHovered(project.slug)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(project.slug)}
                onBlur={() => setHovered(null)}
                className="group grid gap-1 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-baseline md:gap-8"
              >
                <Title className="text-[clamp(1.4rem,1.1rem+1vw,2rem)] font-extrabold leading-tight tracking-[-0.03em]">
                  <span className="stretch-hover [--wdth:100] group-hover:text-cobalt group-focus-visible:text-cobalt">
                    {project.title}
                  </span>
                </Title>
                <span className="text-graphite">
                  {project.summary}
                  <span className="mt-1 block text-sm">{project.kinds.map((k) => kindLabels[k]).join(", ")}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {hasImages && (
        <div aria-hidden="true" className="hidden margin:block">
          {/* Todas las miniaturas cargadas y apiladas: al pasar por una fila solo cambia la opacidad. */}
          <div className="sticky top-[calc(var(--header-h)+2rem)] grid">
            <p
              className={`t-note col-start-1 row-start-1 transition-opacity duration-300 ${preview ? "opacity-0" : "opacity-100"}`}
            >
              Pasa por un proyecto para ver su captura, si la tiene.
            </p>
            {projects.map((p) =>
              p.image ? (
                <Image
                  key={p.slug}
                  src={p.image.src}
                  alt=""
                  sizes="17rem"
                  loading="eager"
                  className={`shot-shadow col-start-1 row-start-1 h-auto w-full rounded-[0.75rem] transition-[opacity,scale,rotate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    preview?.slug === p.slug ? "scale-100 rotate-0 opacity-100" : "scale-95 -rotate-2 opacity-0"
                  }`}
                />
              ) : null,
            )}
          </div>
        </div>
      )}
    </div>
  );
}
