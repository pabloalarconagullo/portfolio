"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { navItems } from "@/lib/nav";

export function SiteHeader({ name }: { name: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sección visible en la portada, para marcarla en la navegación.
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      io.disconnect();
      setActive(null);
    };
  }, [pathname]);

  // Menú móvil: Esc cierra, el foco entra en el panel y vuelve al botón.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 bg-paper/95 backdrop-blur-sm transition-[border-color] ${
        scrolled || open ? "border-b border-rule" : "border-b border-transparent"
      }`}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Saltar al contenido
      </a>
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" className="text-[1.05rem] font-extrabold tracking-[-0.02em]" onClick={close}>
          {name ?? <span className="pending">Pendiente: tu nombre</span>}
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.95rem]">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="link-mark inline-block py-2 no-underline"
                  aria-current={active === item.id ? "true" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contacto" className="btn btn-primary hidden min-h-10 px-4 py-2 text-[0.95rem] sm:inline-flex" onClick={close}>
            Pedir presupuesto
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="btn btn-quiet min-h-10 px-4 py-2 text-[0.95rem] lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </div>

      <div
        id="menu-movil"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-rule bg-paper lg:hidden"
      >
        <nav aria-label="Menú móvil" className="shell py-8">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.id} className="border-b border-rule">
                <Link href={item.href} onClick={close} className="block py-4 text-3xl font-bold tracking-[-0.03em]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contacto" onClick={close} className="btn btn-primary mt-8 w-full">
            Pedir presupuesto
          </Link>
        </nav>
      </div>
    </header>
  );
}
