import type { MetadataRoute } from "next";

import { site } from "@content/site";
import { absolute } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Sin dominio configurado no se permite indexar (evita publicar una versión provisional).
  if (!site.url) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: absolute("/sitemap.xml") };
}
