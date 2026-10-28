import type { Metadata } from "next";

import { visibleProjects } from "@content/projects";
import { ProjectIndex } from "@/components/project-index";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Índice de webs, aplicaciones y herramientas, con filtro por tipo.",
  alternates: { canonical: "/proyectos" },
};

export default function ProjectsPage() {
  return (
    <div className="shell pb-24 pt-14 md:pt-20">
      <div className="with-margin mb-12">
        <h1 className="t-display">Proyectos</h1>
        <p className="t-note self-end">Cada proyecto tiene su página con lo que hace y cómo está construido.</p>
      </div>
      <ProjectIndex projects={visibleProjects} headingLevel={2} />
    </div>
  );
}
