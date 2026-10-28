import type { ReactNode } from "react";

/** Plantilla de las páginas legales. */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="shell pb-24 pt-14 md:pt-20">
      <div className="with-margin">
        <div>
          <h1 className="t-h2">{title}</h1>
          <div className="mt-10 flex max-w-[66ch] flex-col gap-5 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-[-0.02em]">
            {children}
          </div>
        </div>
        <p className="t-note">
          Texto provisional redactado como punto de partida. Revísalo y adáptalo a tu situación antes de publicar.
        </p>
      </div>
    </div>
  );
}
