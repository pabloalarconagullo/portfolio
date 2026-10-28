"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Botón fijo de contacto en móvil (en pantallas mayores ya está en la cabecera). No aparece en la
 * página de contacto, y se oculta mientras están en pantalla los botones del hero o el formulario
 * (`[data-hide-mobile-cta]`), para no repetir la misma llamada a la acción.
 */
export function MobileCta() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-hide-mobile-cta]");
    if (targets.length === 0) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setHidden(visible.size > 0);
      },
      { threshold: 0 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  if (pathname === "/contacto") return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:hidden ${
        hidden ? "translate-y-full" : ""
      }`}
      aria-hidden={hidden}
    >
      <Link href="/contacto" className="btn btn-primary w-full shadow-[0_12px_30px_-8px_rgb(29_47_214/0.6)]" tabIndex={hidden ? -1 : undefined}>
        Pedir presupuesto
      </Link>
    </div>
  );
}
