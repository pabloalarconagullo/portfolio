import Link from "next/link";

import { kindLabels, type Project } from "@content/projects";

export function kindsText(project: Project) {
  return project.kinds.map((k) => kindLabels[k]).join(", ");
}

/** Acciones de un proyecto: ver el caso (opcional), enlaces públicos y pedir algo parecido. */
export function ProjectActions({ project, showCase = true }: { project: Project; showCase?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {showCase && (
        <Link href={`/proyectos/${project.slug}`} className="btn btn-quiet">
          Ver el caso
          <span className="sr-only">: {project.title}</span>
        </Link>
      )}
      {project.links.map((link) => (
        <a key={link.href} href={link.href} target="_blank" rel="noopener" className="btn btn-quiet">
          {link.label}
          <span className="sr-only"> {project.title} (se abre en otra pestaña)</span>
        </a>
      ))}
      <Link href={`/contacto?proyecto=${project.slug}`} className="link-mark ml-1 font-semibold">
        Quiero algo así
      </Link>
    </div>
  );
}

export function StackList({ project }: { project: Project }) {
  return (
    <div>
      {/* Etiqueta de la lista, no un encabezado: aparece bajo h1 y bajo h3 según la página. */}
      <p id={`${project.slug}-stack`} className="text-sm text-graphite">
        Construido con
      </p>
      <ul aria-labelledby={`${project.slug}-stack`} className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[0.95rem]">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </div>
  );
}
