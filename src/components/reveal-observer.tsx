"use client";

import { useEffect } from "react";

/**
 * Activa las entradas de los elementos marcados con `data-reveal` cuando llegan a la pantalla.
 *
 * Todo es visible por defecto: solo se oculta (`data-pending`) lo que está fuera de la pantalla
 * y aún no ha entrado. Así no parpadea nada al cargar ni al volver atrás, y sin JavaScript o con
 * «reducir movimiento» la página se ve entera desde el principio.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const seen = new WeakSet<Element>();
    const show = (el: Element) => {
      el.removeAttribute("data-pending");
      el.setAttribute("data-in", "");
    };
    // threshold 0 + margen negativo: funciona también con elementos más altos que la pantalla.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    const watch = () => {
      for (const el of document.querySelectorAll("[data-reveal]")) {
        if (seen.has(el)) continue;
        seen.add(el);
        // Solo se anima lo que queda entero por debajo de la pantalla; lo visible o ya pasado se queda
        // como está (si no, algo asomando al borde podría quedarse esperando sin que nadie haga scroll).
        if (el.getBoundingClientRect().top > window.innerHeight) {
          el.setAttribute("data-pending", "");
          io.observe(el);
        } else {
          show(el);
        }
      }
    };

    // Se mide un fotograma después de cada cambio, cuando el navegador ya ha restaurado el scroll.
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => requestAnimationFrame(watch));
    };

    watch();
    document.documentElement.setAttribute("data-reveal-ready", "");
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      mo.disconnect();
      document.documentElement.removeAttribute("data-reveal-ready");
      for (const el of document.querySelectorAll("[data-pending]")) show(el);
    };
  }, []);

  return null;
}
