import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProject, visibleProjects } from "@content/projects";
import { AnnotatedFigure, projectNotes } from "@/components/annotated-figure";
import { AnnotationLayer } from "@/components/annotation-layer";
import { JsonLd } from "@/components/json-ld";
import { NoteList } from "@/components/notes";
import { kindsText, ProjectActions, StackList } from "@/components/project-links";
import { absolute, metaDescription } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return visibleProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const description = metaDescription([project.summary, project.problem]);
  return {
    title: project.title,
    description,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      title: project.title,
      description,
      ...(project.image && { images: [{ url: project.image.src.src, alt: project.image.alt }] }),
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = visibleProjects.indexOf(project);
  const next = visibleProjects[(index + 1) % visibleProjects.length];
  const notes = projectNotes(project);

  return (
    <article className="pb-24">
      <div className="read-progress" aria-hidden="true" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: project.title,
          description: project.summary,
          url: absolute(`/proyectos/${project.slug}`),
          applicationCategory: "BusinessApplication",
          ...(project.image && { screenshot: absolute(project.image.src.src) }),
        }}
      />

      <header className="shell pb-14 pt-10 md:pt-16">
        <nav aria-label="Ruta" className="mb-10 text-[0.95rem] text-graphite">
          <Link href="/proyectos" className="link-mark">
            Proyectos
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{project.title}</span>
        </nav>
        <div className="with-margin">
          <div>
            <p className="text-graphite">{kindsText(project)}</p>
            <h1 className="t-display mt-3">{project.title}</h1>
            <p className="t-lead mt-6 max-w-[46ch]">{project.summary}</p>
            {project.credit && <p className="mt-4 text-sm text-graphite">{project.credit}</p>}
            <div className="mt-10">
              <ProjectActions project={project} showCase={false} />
            </div>
          </div>
          <div className="self-end">
            <StackList project={project} />
          </div>
        </div>
      </header>

      {project.image && (
        <div className="shell">
          <AnnotationLayer>
            <AnnotatedFigure project={project} preload reveal={false} />
          </AnnotationLayer>
        </div>
      )}

      <div className="shell mt-20 flex flex-col gap-16">
        <section aria-labelledby="problema" data-reveal="" className="with-margin">
          <div>
            <h2 id="problema" className="text-[1.75rem] font-bold tracking-[-0.025em]">
              Para qué sirve
            </h2>
            <p className="mt-4 max-w-[62ch] text-[1.15rem] leading-relaxed">{project.problem}</p>
          </div>
        </section>

        {project.features.length > 0 && (
          <section aria-labelledby="funciones" data-reveal="" className="with-margin">
            <div>
              <h2 id="funciones" className="text-[1.75rem] font-bold tracking-[-0.025em]">
                Qué hace
              </h2>
              <ul className="mt-6 border-t border-rule">
                {project.features.map((f) => (
                  <li key={f} className="border-b border-rule py-3.5 text-[1.1rem]">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {!project.image && (
              <aside aria-label="Notas técnicas" className="margin:pt-16">
                <NoteList notes={notes} />
              </aside>
            )}
          </section>
        )}

        {!project.image && project.features.length === 0 && <NoteList notes={notes} />}

        <section aria-labelledby="siguiente-paso" data-reveal="" className="rounded-[4px] bg-ink p-8 text-paper md:p-12">
          <h2 id="siguiente-paso" className="t-h3 max-w-[20ch]">
            ¿Necesitas algo parecido?
          </h2>
          <p className="mt-4 max-w-[52ch] opacity-80">
            Cuéntame tu caso y te digo cómo lo plantearía, qué haría falta y cuánto costaría.
          </p>
          <Link href={`/contacto?proyecto=${project.slug}`} className="btn mt-8 bg-paper text-ink hover:bg-marker hover:text-on-marker">
            Quiero algo así
          </Link>
        </section>

        {next && next !== project && (
          <nav aria-label="Siguiente proyecto" className="border-t border-rule pt-10">
            <p className="text-graphite">Siguiente proyecto</p>
            <Link href={`/proyectos/${next.slug}`} className="t-h3 mt-2 inline-block hover:text-cobalt">
              {next.title}
            </Link>
          </nav>
        )}
      </div>
    </article>
  );
}
