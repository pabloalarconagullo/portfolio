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
                className={`rounded-[3px] border px-3 py-1.5 text-[0.95rem] transition-colors ${
                  pressed
                    ? "border-marker bg-marker text-on-marker"
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
                className="group grid gap-1 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-baseline md:gap-8"
              >
                <Title className="text-[1.45rem] font-bold leading-tight tracking-[-0.02em]">
                  <span className="link-mark no-underline group-hover:bg-[length:100%_0.42em] group-focus-visible:bg-[length:100%_0.42em]">
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
                  className={`col-start-1 row-start-1 h-auto w-full rounded-[4px] border border-rule transition-opacity duration-300 motion-reduce:transition-none ${
                    preview?.slug === p.slug ? "opacity-100" : "opacity-0"
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
