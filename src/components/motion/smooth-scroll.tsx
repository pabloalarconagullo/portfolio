"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll suave con Lenis, sincronizado con el reloj de GSAP (un solo requestAnimationFrame)
 * para que las animaciones ligadas al scroll no tiemblen.
 *
 * No se monta con «reducir movimiento». En táctil Lenis deja el scroll nativo.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, autoRaf: false });
    lenisRef.current = lenis;
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    // Enlaces a secciones de la portada («/#precios»): desplazamiento suave con Lenis, compensando la cabecera.
    // El menú móvil se queda con el comportamiento normal (cierra el panel al navegar).
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest<HTMLAnchorElement>("a[href^='/#']");
      if (!link || link.closest("#menu-movil") || window.location.pathname !== "/") return;
      const id = link.getAttribute("href")!.slice(2);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      const header = parseFloat(getComputedStyle(document.documentElement).fontSize) * 5.75;
      lenis.scrollTo(target, { offset: -header, duration: 1.2 });
      history.pushState(null, "", `#${id}`);
    };
    window.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("click", onClick, true);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Página nueva: medidas nuevas para Lenis y para los ScrollTrigger.
  useEffect(() => {
    lenisRef.current?.resize();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
