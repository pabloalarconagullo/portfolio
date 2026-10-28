"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Capa de anotaciones con bolígrafo azul.
 * - Textos anotados (`[data-anchor="id"]`): se subrayan. No hay línea hasta la nota porque
 *   cruzaría la tipografía; la relación la da el número volado junto a la palabra.
 * - Marcas sobre una captura (`[data-anchor="id"][data-point]` dentro de `[data-figure]`):
 *   la nota (`[data-note="id"]`) se alinea a la altura de su marca y una guía la une con el
 *   borde de la imagen.
 *
 * Solo en pantallas anchas, donde existe el margen. En móvil las notas van numeradas
 * debajo del contenido y no hay líneas. Las notas son texto normal: sin JavaScript, la
 * página se lee igual.
 */

const WIDE = "(min-width: 70rem)";

type Stroke = { key: string; d: string; i: number };

/** Guía desde el borde de la captura hasta la nota: sale en horizontal y entra en horizontal. */
function connector(sx: number, sy: number, ex: number, ey: number) {
  const mid = (sx + ex) / 2;
  return `M ${sx} ${sy} C ${mid} ${sy}, ${mid} ${ey}, ${ex} ${ey}`;
}

function underline(x1: number, x2: number, y: number) {
  // Ligera curva, como un subrayado hecho con bolígrafo.
  return `M ${x1} ${y + 1} Q ${(x1 + x2) / 2} ${y + 4} ${x2} ${y}`;
}

export function AnnotationLayer({
  children,
  trigger = "view",
  baseDelay = 120,
  className = "",
}: {
  children: ReactNode;
  /** `mount`: se dibuja al cargar (hero). `view`: al entrar en pantalla. */
  trigger?: "mount" | "view";
  baseDelay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [visible, setVisible] = useState(false);
  const [drawn, setDrawn] = useState(false);

  // Medir y recalcular trazos cuando cambia el tamaño, la fuente o el punto de corte.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const wide = window.matchMedia(WIDE);
    let frame = 0;

    const layout = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const notes = Array.from(root.querySelectorAll<HTMLElement>("[data-note]"));
        notes.forEach((note) => (note.style.translate = ""));
        if (!wide.matches) {
          setStrokes([]);
          return;
        }
        const origin = root.getBoundingClientRect();
        const figure = root.querySelector<HTMLElement>("[data-figure]")?.getBoundingClientRect();
        const next: Stroke[] = [];
        const anchorOf = (note: HTMLElement) =>
          root.querySelector<HTMLElement>(`[data-anchor="${CSS.escape(note.dataset.note ?? "")}"]`);

        // Capturas: cada nota baja hasta la altura de su marca (sin solaparse con la anterior)
        // y una guía la une con el borde de la imagen. Ninguna línea pisa la captura.
        if (figure) {
          const placed = notes
            .map((note, i) => {
              const anchor = anchorOf(note);
              const r = note.getBoundingClientRect();
              const a = anchor?.dataset.point !== undefined ? anchor.getBoundingClientRect() : null;
              const target = a ? a.top - origin.top + a.height / 2 : Infinity;
              return { note, i, top: r.top - origin.top, height: r.height, target };
            })
            .sort((x, y) => x.target - y.target);

          let cursor = -Infinity;
          for (const item of placed) {
            const lineY = Number.isFinite(item.target) ? item.target : cursor + 14;
            const top = Math.max(lineY - 14, cursor);
            item.note.style.translate = `0 ${top - item.top}px`;
            cursor = top + item.height + 18;
            if (Number.isFinite(item.target)) {
              const n = item.note.getBoundingClientRect();
              next.push({
                key: `${item.note.dataset.note}-c`,
                d: connector(figure.right - origin.left + 8, item.target, n.left - origin.left - 12, top + 14),
                i: item.i,
              });
            }
          }
        }

        notes.forEach((note, i) => {
          const id = note.dataset.note ?? "";
          const anchor = anchorOf(note);
          if (!anchor || anchor.dataset.point !== undefined) return;

          const rects = Array.from(anchor.getClientRects());
          rects.forEach((r, j) => {
            // La caja del texto incluye el descendente: el trazo va algo por encima del borde inferior.
            const y = r.bottom - origin.top - r.height * 0.16;
            next.push({
              key: `${id}-u${j}`,
              d: underline(r.left - origin.left, r.right - origin.left, y),
              i,
            });
          });
        });

        setBox({ w: origin.width, h: origin.height });
        setStrokes(next);
      });
    };

    layout();
    const resize = new ResizeObserver(layout);
    resize.observe(root);
    wide.addEventListener("change", layout);
    document.fonts?.ready.then(layout);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      wide.removeEventListener("change", layout);
    };
  }, []);

  // Cuándo empieza a dibujarse.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (trigger === "mount") {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -25% 0px", threshold: 0 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [trigger]);

  // Esperar un fotograma con los trazos ya montados para que la transición se vea.
  useEffect(() => {
    if (!visible || drawn || strokes.length === 0) return;
    const frame = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(frame);
  }, [visible, drawn, strokes.length]);

  return (
    <div ref={ref} className={`relative ${drawn ? "ann-drawn" : ""} ${className}`}>
      {children}
      {strokes.length > 0 && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-visible"
          width={box.w}
          height={box.h}
          style={{ ["--base" as string]: `${baseDelay}ms` }}
        >
          {strokes.map((s) => (
            <path
              key={s.key}
              d={s.d}
              pathLength={1}
              className="ann-path"
              style={{ ["--i" as string]: s.i }}
            />
          ))}
        </svg>
      )}
    </div>
  );
}
