import { Fragment, type ReactNode } from "react";

/**
 * Piezas compartidas del sistema de notas al margen.
 * Cada nota tiene un número; el mismo número aparece junto a lo anotado
 * (como superíndice en el texto o como marca sobre una captura), de modo que
 * en móvil, donde no hay líneas, la relación sigue siendo legible.
 */

export type Note = { id: string; text: string };

const ANCHOR = /\[([^\]]+)\]\(([\w-]+)\)/g;

/** Convierte `texto [anotado](id) texto` en texto con anclas numeradas. */
export function AnchoredText({ source, notes }: { source: string; notes: Note[] }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of source.matchAll(ANCHOR)) {
    const [whole, label, id] = match;
    const index = notes.findIndex((n) => n.id === id);
    parts.push(source.slice(last, match.index));
    parts.push(
      index === -1 ? (
        label
      ) : (
        <Fragment key={`${id}-${match.index}`}>
          <span data-anchor={id} aria-describedby={`nota-${id}`}>
            {label}
          </span>
          <sup className="ml-[0.08em] align-super text-[max(0.32em,0.7rem)] font-semibold text-cobalt">
            {index + 1}
          </sup>
        </Fragment>
      ),
    );
    last = (match.index ?? 0) + whole.length;
  }
  parts.push(source.slice(last));
  return <>{parts}</>;
}

/** Quita la marca de anclas para usos en texto plano (metadatos, etc.). */
export function plainText(source: string) {
  return source.replace(ANCHOR, "$1");
}

export function NoteList({
  notes,
  className = "",
  label,
}: {
  notes: Note[];
  className?: string;
  label?: string;
}) {
  if (notes.length === 0) return null;
  return (
    <ol
      aria-label={label}
      className={`flex flex-col gap-5 border-l border-cobalt/60 pl-4 margin:border-l-0 margin:pl-0 ${className}`}
    >
      {notes.map((note, i) => (
        <li key={note.id} id={`nota-${note.id}`} data-note={note.id} className="t-note flex gap-2.5">
          <span aria-hidden="true" className="num not-italic font-sans text-[0.75rem] font-bold leading-[1.9]">
            {i + 1}
          </span>
          <span>{note.text}</span>
        </li>
      ))}
    </ol>
  );
}
