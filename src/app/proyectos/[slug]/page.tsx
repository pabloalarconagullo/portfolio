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
            <h2 id="problema" className="t-wide text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] font-extrabold tracking-[-0.035em]">
              Para qué sirve
            </h2>
            <p className="mt-4 max-w-[62ch] text-[1.15rem] leading-relaxed">{project.problem}</p>
          </div>
        </section>

        {project.features.length > 0 && (
          <section aria-labelledby="funciones" data-reveal="" className="with-margin">
            <div>
              <h2 id="funciones" className="t-wide text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] font-extrabold tracking-[-0.035em]">
                Qué hace
              </h2>
              <ul className="mt-6 border-t border-rule">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-4 border-b border-rule py-4 text-[1.1rem]">
                    <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 rotate-45 bg-cobalt" />
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

        <section aria-labelledby="siguiente-paso" data-reveal="" className="blue-field rounded-[1.75rem] p-8 md:p-14">
          <h2 id="siguiente-paso" className="t-h3 max-w-[20ch]">
            ¿Necesitas algo parecido?
          </h2>
          <p className="mt-4 max-w-[52ch] text-white/85">
            Cuéntame tu caso y te digo cómo lo plantearía, qué haría falta y cuánto costaría.
          </p>
          <Link href={`/contacto?proyecto=${project.slug}`} className="btn btn-on-blue mt-8">
            Quiero algo así
          </Link>
        </section>

        {next && next !== project && (
          <nav aria-label="Siguiente proyecto" className="border-t border-rule pt-10">
            <p className="text-graphite">Siguiente proyecto</p>
            <Link href={`/proyectos/${next.slug}`} className="group t-h3 mt-2 inline-block">
              <span className="stretch-hover [--wdth:110] group-hover:text-cobalt">{next.title}</span>
            </Link>
          </nav>
        )}
      </div>
    </article>
  );
}
