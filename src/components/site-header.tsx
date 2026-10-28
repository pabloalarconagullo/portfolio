"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { navItems } from "@/lib/nav";

export function SiteHeader({ name }: { name: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Al bajar, la cabecera se aparta para dejar sitio al contenido; al subir, vuelve.
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 480);
        last = y;
      }
    };
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

  // La píldora de la navegación sigue al ratón y, si no, se queda en la sección visible.
  const target = hovered ?? active;
  useLayoutEffect(() => {
    const list = navRef.current;
    if (!list) return;
    const place = () => {
      const link = target ? list.querySelector<HTMLElement>(`[data-nav="${target}"]`) : null;
      list.style.setProperty("--pill-x", `${link?.offsetLeft ?? 0}px`);
      list.style.setProperty("--pill-w", `${link?.offsetWidth ?? 0}px`);
      list.style.setProperty("--pill-o", link ? "1" : "0");
    };
    place();
    const resize = new ResizeObserver(place);
    resize.observe(list);
    return () => resize.disconnect();
  }, [target]);

  const close = () => setOpen(false);

  return (
    <header
      data-hidden={hidden && !open ? "" : undefined}
      className={`site-header sticky top-0 z-50 bg-paper/85 backdrop-blur-md backdrop-saturate-150 ${
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
        <Link href="/" className="t-wide flex items-center gap-2.5 text-[1.05rem] font-extrabold tracking-[-0.03em] [--wdth:110]" onClick={close}>
          <span aria-hidden="true" className="size-3 rotate-45 bg-cobalt" />
          {name ?? <span className="pending">Pendiente: tu nombre</span>}
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <div ref={navRef} onMouseLeave={() => setHovered(null)} className="relative rounded-full bg-paper-2 p-1">
            <span aria-hidden="true" className="slider-pill bg-paper opacity-[var(--pill-o,0)] shadow-[0_2px_10px_-2px_rgb(15_20_32/0.18)] [--pill-y:0.25rem] [--pill-h:calc(100%-0.5rem)]" />
            <ul className="flex items-center text-[0.95rem]">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    data-nav={item.id}
                    onMouseEnter={() => setHovered(item.id)}
                    onFocus={() => setHovered(item.id)}
                    onBlur={() => setHovered(null)}
                    className={`relative z-10 inline-block rounded-full px-4 py-2 font-medium transition-colors ${
                      active === item.id ? "text-cobalt" : "text-ink"
                    }`}
                    aria-current={active === item.id ? "true" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contacto" className="btn btn-primary hidden min-h-11 px-5 py-2 text-[0.95rem] sm:inline-flex" onClick={close}>
            Pedir presupuesto
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="btn btn-quiet min-h-11 px-5 py-2 text-[0.95rem] lg:hidden"
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
        data-lenis-prevent=""
        hidden={!open}
        className="h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-rule bg-paper lg:hidden"
      >
        <nav aria-label="Menú móvil" className="shell py-8">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.id} className="border-b border-rule">
                <Link href={item.href} onClick={close} className="t-wide block py-4 text-[2.4rem] font-extrabold leading-none tracking-[-0.045em] hover:text-cobalt">
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
