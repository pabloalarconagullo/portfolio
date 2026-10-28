import Image from "next/image";
import { ViewTransition } from "react";

import type { Project } from "@content/projects";

import { NoteList, type Note } from "./notes";

export function projectNotes(project: Project): Note[] {
  return project.notes.map((note, i) => ({ id: `${project.slug}-${i + 1}`, text: note.text }));
}

/**
 * Captura real de un proyecto con marcas numeradas sobre los puntos que comentan
 * las notas del margen. Debe ir dentro de una AnnotationLayer para que se dibujen las líneas.
 */
export function AnnotatedFigure({
  project,
  preload = false,
  reveal = true,
}: {
  project: Project;
  preload?: boolean;
  /** Revelar la captura al llegar a ella. En la cabecera del caso no: ahí llega por la transición de página. */
  reveal?: boolean;
}) {
  const notes = projectNotes(project);
  if (!project.image) return null;

  return (
    <div className="with-margin">
      <figure>
        {/* En móvil una captura de escritorio encogida no se lee: se muestra más grande y se desplaza en horizontal. */}
        <div
          tabIndex={0}
          role="region"
          aria-label={`Captura de ${project.title}`}
          className="stage overflow-x-auto px-4 py-5 md:overflow-visible md:p-8 margin:p-12"
        >
          <div data-reveal={reveal ? "figure" : undefined} className="relative min-w-[44rem] md:min-w-0">
            {/* Misma captura en la portada y en el caso: el navegador la traslada de una página a otra. */}
            <ViewTransition name={`captura-${project.slug}`} share="morph" default="none">
              <div data-figure="" className="shot-shadow overflow-hidden rounded-[0.75rem] bg-paper">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                placeholder="blur"
                preload={preload}
                sizes="(min-width: 82rem) 56rem, (min-width: 70rem) 62vw, (min-width: 48rem) calc(100vw - 5rem), 44rem"
                className="h-auto w-full"
                />
              </div>
            </ViewTransition>
            {project.notes.map((note, i) =>
              note.at ? (
                <span
                  key={i}
                  aria-hidden="true"
                  data-anchor={notes[i].id}
                  data-point=""
                  className="hotspot"
                  style={{ left: `${note.at.x}%`, top: `${note.at.y}%`, ["--hotspot" as string]: i }}
                >
                  {i + 1}
                </span>
              ) : null,
            )}
          </div>
        </div>
        <figcaption className="mt-4 text-sm text-graphite">
          Captura real del proyecto.<span className="md:hidden"> Desliza para verla entera.</span>
        </figcaption>
      </figure>
      <aside data-reveal="fade" aria-label={`Notas técnicas de ${project.title}`} style={{ ["--i" as string]: 8 }}>
        <NoteList notes={notes} />
      </aside>
    </div>
  );
}
