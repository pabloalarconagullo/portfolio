import { site } from "@content/site";

/**
 * URL base del sitio. Mientras `site.url` no esté configurado se usa localhost,
 * así que las URL absolutas (sitemap, Open Graph) no son válidas en producción.
 */
export const baseUrl = site.url ?? "http://localhost:3000";

export function absolute(path: string) {
  return new URL(path, baseUrl).toString();
}

/** Descripción para buscadores: une las frases y corta en una palabra sin pasar de `max` caracteres. */
export function metaDescription(parts: string[], max = 160) {
  const text = parts.join(" ").replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:]$/, "") + "…";
}
