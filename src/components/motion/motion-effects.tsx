"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/**
 * Efectos con GSAP que se declaran con atributos en el marcado, sin JavaScript en cada componente:
 *
 * - `data-split="words"`: las palabras aparecen desenfocadas y se enfocan en cascada (titular).
 * - `data-split="lines"`: cada línea sube desde detrás de una máscara al llegar (títulos de sección).
 * - `data-parallax="8"`: el elemento se desplaza ese porcentaje con el scroll, más despacio que la página.
 * - `data-marquee`: cinta continua que acelera y cambia de sentido con la velocidad del scroll.
 * - `data-magnetic`: el botón se deja atraer por el puntero.
 * - `data-process`: línea de tiempo fijada; el scroll rellena el progreso y enciende cada paso.
 *
 * Todo vive dentro de un `matchMedia` de «sin preferencia de movimiento»: con «reducir movimiento»
 * no se ejecuta nada y la página se ve estática. Los textos divididos se restauran al terminar,
 * para devolver a React el DOM tal y como lo dejó.
 */
export function MotionEffects() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = document.documentElement;
        root.setAttribute("data-motion", "");
        const cleanups: (() => void)[] = [];

        // Titular: palabras que se enfocan. Solo opacidad y desenfoque: no cambia la geometría,
        // así los subrayados del bolígrafo se miden bien.
        for (const el of gsap.utils.toArray<HTMLElement>("[data-split='words']")) {
          // Palabras en línea (.split-word): no cambian los saltos de línea ni separan los números de las notas.
          const split = SplitText.create(el, { type: "words", tag: "span", wordsClass: "split-word" });
          gsap.from(split.words, {
            opacity: 0,
            filter: "blur(10px)",
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.045,
            delay: 0.1,
            onComplete: () => split.revert(),
          });
        }

        // Títulos de sección: líneas que suben desde detrás de una máscara.
        for (const el of gsap.utils.toArray<HTMLElement>("[data-split='lines']")) {
          const split = SplitText.create(el, { type: "lines", mask: "lines" });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onComplete: () => split.revert(),
          });
        }

        // Parallax suave (solo transform).
        for (const el of gsap.utils.toArray<HTMLElement>("[data-parallax]")) {
          const amount = Number(el.dataset.parallax) || 8;
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }

        // Cinta de tecnologías: bucle infinito cuya velocidad sigue a la del scroll.
        for (const el of gsap.utils.toArray<HTMLElement>("[data-marquee]")) {
          const loop = gsap.to(el, { xPercent: -50, ease: "none", duration: 40, repeat: -1 });
          let direction = 1;
          ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              direction = self.direction;
              const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 300);
              gsap.to(loop, { timeScale: boost * direction, duration: 0.2, overwrite: true });
              gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.2, ease: "power2.out" });
            },
          });
          // Se para bajo el ratón para poder leerla.
          const pause = () => gsap.to(loop, { timeScale: 0, duration: 0.6, overwrite: true });
          const resume = () => gsap.to(loop, { timeScale: direction, duration: 0.6, overwrite: true });
          el.addEventListener("mouseenter", pause);
          el.addEventListener("mouseleave", resume);
          cleanups.push(() => {
            el.removeEventListener("mouseenter", pause);
            el.removeEventListener("mouseleave", resume);
          });
        }

        // Línea de tiempo del proceso: el bloque se queda fijo (sticky en CSS) mientras el scroll avanza.
        for (const el of gsap.utils.toArray<HTMLElement>("[data-process]")) {
          const fill = el.querySelector<HTMLElement>("[data-process-fill]");
          const steps = gsap.utils.toArray<HTMLElement>("[data-process-step]", el);
          if (fill) gsap.set(fill, { scaleX: 0 });
          ScrollTrigger.create({
            trigger: el,
            // De cuando el bloque se fija (mismo «top» que el sticky del CSS) a cuando se suelta.
            start: () => {
              const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
              return `top ${Math.max(4.25 * rem + 2 * rem, window.innerHeight / 2 - 13 * rem)}px`;
            },
            end: "bottom bottom",
            invalidateOnRefresh: true,
            scrub: true,
            onUpdate: (self) => {
              if (fill) gsap.set(fill, { scaleX: self.progress });
              const current = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
              steps.forEach((step, i) => step.toggleAttribute("data-active", i <= current));
            },
          });
        }

        return () => {
          cleanups.forEach((c) => c());
          root.removeAttribute("data-motion");
        };
      });

      // Botones magnéticos: solo con ratón (no en táctil).
      mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
        const cleanups: (() => void)[] = [];
        for (const el of gsap.utils.toArray<HTMLElement>("[data-magnetic]")) {
          const x = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
          const y = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            x((e.clientX - r.left - r.width / 2) * 0.3);
            y((e.clientY - r.top - r.height / 2) * 0.4);
          };
          const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        }
        return () => cleanups.forEach((c) => c());
      });

      // Las fuentes y las imágenes cambian alturas: se recalculan los disparadores al tenerlas.
      document.fonts.ready.then(() => ScrollTrigger.refresh());
      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
