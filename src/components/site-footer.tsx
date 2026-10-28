import Link from "next/link";

import { site } from "@content/site";
import { navItems } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule pb-28 pt-16 sm:pb-16">
      <div className="shell with-margin">
        <div>
          <p className="t-h3 max-w-[16ch]">¿Tienes algo entre manos?</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/contacto" className="btn btn-primary">
              Pedir presupuesto
            </Link>
            {site.email && (
              <a href={`mailto:${site.email}`} className="link-mark py-2 font-semibold">
                {site.email}
              </a>
            )}
          </div>
        </div>
        <nav aria-label="Pie de página" className="flex flex-col gap-8 text-[0.95rem]">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="link-mark inline-block py-1 no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/proyectos" className="link-mark inline-block py-1 no-underline">
                Todos los proyectos
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col text-graphite">
            <li>
              <Link href="/aviso-legal" className="link-mark inline-block py-1 no-underline">
                Aviso legal
              </Link>
            </li>
            <li>
              <Link href="/privacidad" className="link-mark inline-block py-1 no-underline">
                Privacidad
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="shell mt-16 flex flex-wrap justify-between gap-4 text-sm text-graphite">
        <p>
          © {new Date().getFullYear()} {site.legal.owner ?? site.name ?? "Portfolio"}
        </p>
        <p>Diseñado y programado a mano.</p>
      </div>
    </footer>
  );
}
