"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const euros = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

/**
 * Importe que cuenta desde el valor anterior (o desde 0) hasta el nuevo al aparecer o al cambiar.
 * El texto final está siempre en el HTML; los lectores de pantalla leen solo ese.
 */
export function AnimatedPrice({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      shown.current = value;
      return;
    }
    const counter = { n: shown.current };
    let tween: gsap.core.Tween | undefined;
    const run = () => {
      tween = gsap.to(counter, {
        n: value,
        duration: 1.4,
        ease: "power3.out",
        snap: { n: 1 },
        onUpdate: () => {
          el.textContent = euros.format(counter.n);
          shown.current = counter.n;
        },
      });
    };
    // Arranca desde el valor anterior (0 la primera vez) y espera a que el precio entre en pantalla.
    el.textContent = euros.format(counter.n);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      run();
    });
    io.observe(el);
    return () => {
      io.disconnect();
      tween?.kill();
    };
  }, [value]);

  return (
    <>
      {/* key: si cambia el valor, React crea un nodo nuevo en vez de tocar el texto que anima GSAP. */}
      <span key={value} ref={ref} aria-hidden="true">
        {euros.format(value)}
      </span>
      <span className="sr-only">{euros.format(value)}</span>
    </>
  );
}
