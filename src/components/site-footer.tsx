import Link from "next/link";

import { site } from "@content/site";
import { navItems } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="blue-field relative overflow-hidden pb-28 pt-20 sm:pb-10 md:pt-28">
      <div className="shell grid gap-14 md:grid-cols-[minmax(0,1fr)_auto] md:gap-20">
        <div>
          <p className="t-h2 max-w-[13ch]">¿Tienes algo entre manos?</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <span data-magnetic="" className="inline-block">
              <Link href="/contacto" className="btn btn-on-blue">
                Pedir presupuesto
              </Link>
            </span>
            {site.email && (
              <a href={`mailto:${site.email}`} className="py-2 font-semibold underline decoration-white/40 underline-offset-[0.25em] hover:decoration-marker">
                {site.email}
              </a>
            )}
          </div>
        </div>
        <nav aria-label="Pie de página" className="grid grid-cols-2 gap-x-12 gap-y-8 text-[0.95rem] md:flex md:flex-col">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="footer-link inline-block py-1">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/proyectos" className="footer-link inline-block py-1">
                Todos los proyectos
              </Link>
            </li>
          </ul>
          {site.profiles.length > 0 && (
            <ul className="flex flex-col">
              {site.profiles.map((profile) => (
                <li key={profile.href}>
                  <a href={profile.href} target="_blank" rel="noopener me" className="footer-link inline-block py-1">
                    {profile.label}
                    <span className="sr-only"> (se abre en otra pestaña)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          <ul className="flex flex-col text-white/80">
            <li>
              <Link href="/aviso-legal" className="footer-link inline-block py-1">
                Aviso legal
              </Link>
            </li>
            <li>
              <Link href="/privacidad" className="footer-link inline-block py-1">
                Privacidad
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {site.name && (
        // Firma gigante: decorativa (el nombre ya está en la cabecera); el scroll la ensancha.
        <p aria-hidden="true" data-stretch="" className="wordmark mt-20 select-none px-2 text-center text-[11.5vw] text-white md:mt-28">
          {site.name}
        </p>
      )}

      <div className="shell mt-10 flex flex-wrap justify-between gap-4 border-t border-white/20 pt-6 text-sm text-white/80">
        <p>
          © {new Date().getFullYear()} {site.name ?? site.legal.owner ?? "Portfolio"}
        </p>
        <p>Diseñado y programado a mano.</p>
      </div>
    </footer>
  );
}
