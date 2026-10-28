import Link from "next/link";

import { site } from "@content/site";

import { AnnotationLayer } from "./annotation-layer";
import { AnchoredText, NoteList } from "./notes";
import { Pending } from "./pending";

export function Hero() {
  const { headline, intro, notes } = site.hero;

  return (
    <section aria-labelledby="hero-titulo" className="shell pb-20 pt-12 md:pb-28 md:pt-20">
      <AnnotationLayer trigger="mount" baseDelay={650}>
        <div className="with-margin">
          <div>
            <h1 id="hero-titulo" className="t-display max-w-[17ch]">
              <AnchoredText source={headline} notes={notes} />
            </h1>
            <p className="t-lead mt-8 max-w-[44ch]">
              <AnchoredText source={intro} notes={notes} />
            </p>

            <div
              data-hide-mobile-cta=""
              className="hero-ink mt-10 flex flex-wrap gap-3"
              style={{ ["--d" as string]: "250ms" }}
            >
              <Link href="/contacto" className="btn btn-primary w-full sm:w-auto">
                Cuéntame tu proyecto
              </Link>
              <Link href="/#proyectos" className="btn btn-quiet w-full sm:w-auto">
                Ver proyectos
              </Link>
            </div>

            <dl
              style={{ ["--d" as string]: "450ms" }}
              className="hero-ink mt-14 grid max-w-xl grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-[0.95rem]"
            >
              <dt className="text-graphite">Quién</dt>
              <dd>
                {site.name ?? <Pending what="tu nombre" />}
                {site.role ? `, ${site.role.toLowerCase()}` : <> <Pending what="tu rol" /></>}
              </dd>
              {site.location && (
                <>
                  <dt className="text-graphite">Dónde</dt>
                  <dd>{site.location}</dd>
                </>
              )}
              {site.availability && (
                <>
                  <dt className="text-graphite">Agenda</dt>
                  <dd>{site.availability}</dd>
                </>
              )}
            </dl>
          </div>

          <aside aria-label="Notas al margen" className="hero-ink margin:pt-6" style={{ ["--d" as string]: "700ms" }}>
            <NoteList notes={notes} />
          </aside>
        </div>
      </AnnotationLayer>
    </section>
  );
}
