import Link from "next/link";

import type { Project } from "@content/projects";

import { AnnotatedFigure } from "./annotated-figure";
import { AnnotationLayer } from "./annotation-layer";
import { kindsText, ProjectActions, StackList } from "./project-links";

/** Proyecto destacado a página completa: texto, captura anotada y notas técnicas al margen. */
export function ProjectSpread({ project }: { project: Project }) {
  return (
    <article aria-labelledby={`${project.slug}-titulo`} className="border-t border-rule py-16 first:border-t-0 first:pt-0 md:py-24">
      <div className="with-margin mb-10 md:mb-14">
        <div data-reveal="">
          <p className="text-graphite">{kindsText(project)}</p>
          <h3 id={`${project.slug}-titulo`} className="t-h3 mt-3">
            <Link href={`/proyectos/${project.slug}`} className="hover:text-cobalt">
              {project.title}
            </Link>
          </h3>
          <p className="t-lead mt-5 max-w-[46ch]">{project.summary}</p>
          <p className="mt-4 max-w-[62ch]">{project.problem}</p>
          {project.credit && <p className="mt-4 max-w-[62ch] text-sm text-graphite">{project.credit}</p>}
          <div className="mt-8">
            <ProjectActions project={project} />
          </div>
        </div>
        <div data-reveal="" className="self-end" style={{ ["--i" as string]: 2 }}>
          <StackList project={project} />
        </div>
      </div>

      <AnnotationLayer baseDelay={1100}>
        <AnnotatedFigure project={project} />
      </AnnotationLayer>
    </article>
  );
}
