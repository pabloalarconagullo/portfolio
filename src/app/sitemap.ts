import type { MetadataRoute } from "next";

import { visibleProjects } from "@content/projects";
import { absolute } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absolute("/"), priority: 1 },
    { url: absolute("/proyectos"), priority: 0.8 },
    ...visibleProjects.map((p) => ({ url: absolute(`/proyectos/${p.slug}`), priority: 0.7 })),
    { url: absolute("/contacto"), priority: 0.6 },
    { url: absolute("/aviso-legal"), priority: 0.1 },
    { url: absolute("/privacidad"), priority: 0.1 },
  ];
}
