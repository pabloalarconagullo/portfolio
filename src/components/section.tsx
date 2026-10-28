import type { ReactNode } from "react";

/**
 * Sección de portada: título en la columna principal y, opcionalmente,
 * una nota en el margen.
 */
export function Section({
  id,
  title,
  aside,
  children,
  className = "",
  hideMobileCta = false,
}: {
  id: string;
  title: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Oculta el botón fijo de contacto en móvil mientras la sección está en pantalla. */
  hideMobileCta?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      data-hide-mobile-cta={hideMobileCta ? "" : undefined}
      className={`py-20 md:py-28 ${className}`}
    >
      <div className="shell">
        <div className="with-margin mb-14 md:mb-20">
          <h2 id={`${id}-titulo`} data-split="lines" className="t-h2 max-w-[16ch]">
            {title}
          </h2>
          {aside && (
            <div data-reveal="" className="t-note self-end" style={{ ["--i" as string]: 3 }}>
              {aside}
            </div>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
