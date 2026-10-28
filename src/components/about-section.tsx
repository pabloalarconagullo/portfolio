import Image from "next/image";

import { site } from "@content/site";

import { Pending } from "./pending";
import { Section } from "./section";

export function AboutSection() {
  const { portrait, paragraphs } = site.about;
  const [first, ...rest] = paragraphs;

  return (
    <Section id="sobre-mi" title={site.name ? `Soy ${site.name}` : "Sobre mí"}>
      <div className="grid gap-10 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-16 margin:grid-cols-[18rem_minmax(0,1fr)] margin:gap-24">
        <div data-reveal="portrait" className="self-start md:sticky md:top-[calc(var(--header-h)+2rem)]">
          {portrait ? (
            // La foto es un 15 % más alta que su marco y se desplaza con el scroll (data-parallax).
            <div className="relative aspect-[4/5] w-full max-w-[15rem] margin:max-w-[18rem] overflow-hidden rounded-[1.75rem] bg-paper-2">
              <Image
                data-parallax="5"
                src={portrait.src}
                alt={portrait.alt}
                placeholder="blur"
                sizes="(min-width: 70rem) 18rem, 15rem"
                className="h-[115%] w-full -translate-y-[6%] object-cover object-[45%_30%]"
              />
            </div>
          ) : (
            <div className="grid aspect-[4/5] w-full max-w-[15rem] margin:max-w-[18rem] place-items-center rounded-[1.75rem] border border-dashed border-cobalt p-6 text-center">
              <Pending what="tu retrato (opcional)" />
            </div>
          )}
        </div>

        <div className="max-w-[60ch]">
          {first ? (
            <div className="flex flex-col gap-6 text-[1.15rem] leading-relaxed">
              <p data-reveal="" className="t-wide text-[clamp(1.35rem,1.1rem+0.9vw,1.85rem)] font-semibold leading-[1.3] tracking-[-0.02em] [--wdth:104]">
                {first}
              </p>
              {rest.map((p, i) => (
                <p key={p} data-reveal="" className="text-graphite" style={{ ["--i" as string]: i + 1 }}>
                  {p}
                </p>
              ))}
            </div>
          ) : (
            <p>
              <Pending what="tu presentación (site.about.paragraphs)" />
            </p>
          )}
          {site.profiles.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-3">
              {site.profiles.map((profile) => (
                <li key={profile.href}>
                  <a href={profile.href} target="_blank" rel="noopener me" className="btn btn-quiet">
                    {profile.label}
                    <span className="sr-only"> (se abre en otra pestaña)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}
