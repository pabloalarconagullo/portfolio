import Link from "next/link";

import { site } from "@content/site";

import { AnnotationLayer } from "./annotation-layer";
import { AnchoredText, NoteList } from "./notes";
import { Pending } from "./pending";

/**
 * Primera pantalla: quién, titular anotado, entradilla y llamadas a la acción.
 * En escritorio las notas van al margen; en móvil van después de los botones, para que la
 * llamada a la acción se vea sin hacer scroll.
 */
export function Hero() {
  const { headline, intro, notes } = site.hero;

  return (
    <section aria-labelledby="hero-titulo" className="shell pb-14 pt-6 md:pb-20 md:pt-10 margin:pt-12">
      <AnnotationLayer trigger="mount" baseDelay={650}>
        <div className="with-margin margin:gap-y-0">
          <div className="margin:col-start-1 margin:row-start-1">
            <div className="hero-ink mb-7 flex items-center gap-3.5 md:mb-9" style={{ ["--d" as string]: "100ms" }}>
              <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-cobalt">
                <span className="size-3 rotate-45 bg-marker" />
              </span>
              <p className="text-[0.95rem] leading-snug">
                <span className="block font-semibold">
                  {site.name ?? <Pending what="tu nombre" />}
                  {site.location && <span className="font-normal text-graphite">, {site.location}</span>}
                </span>
                <span className="block text-graphite">{site.role ?? <Pending what="tu rol" />}</span>
              </p>
              {site.availability && (
                <p className="ml-2 hidden rounded-full bg-marker px-3 py-1 text-sm font-semibold text-on-marker sm:block">
                  {site.availability}
                </p>
              )}
            </div>

            <h1 id="hero-titulo" data-split="words" className="t-display">
              <AnchoredText source={headline} notes={notes} />
            </h1>
          </div>

          <div className="mt-2 margin:col-start-1 margin:row-start-2 margin:mt-10">
            <p className="t-lead max-w-[46ch]">
              <AnchoredText source={intro} notes={notes} />
            </p>

            <div
              data-hide-mobile-cta=""
              className="hero-ink mt-8 flex flex-wrap gap-3"
              style={{ ["--d" as string]: "250ms" }}
            >
              {/* El envoltorio es el que se mueve (data-magnetic): el botón conserva su propia transición. */}
              <span data-magnetic="" className="inline-block w-full sm:w-auto">
                <Link href="/contacto" className="btn btn-primary w-full sm:w-auto">
                  Cuéntame tu proyecto
                </Link>
              </span>
              <span data-magnetic="" className="inline-block w-full sm:w-auto">
                <Link href="/#proyectos" className="btn btn-quiet w-full sm:w-auto">
                  Ver proyectos
                </Link>
              </span>
            </div>
          </div>

          <aside
            aria-label="Notas al margen"
            className="hero-ink mt-6 margin:col-start-2 margin:row-span-2 margin:row-start-1 margin:mt-0 margin:pt-24"
            style={{ ["--d" as string]: "700ms" }}
          >
            <NoteList notes={notes} />
          </aside>
        </div>
      </AnnotationLayer>
    </section>
  );
}
