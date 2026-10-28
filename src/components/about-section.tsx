import Image from "next/image";

import { site } from "@content/site";

import { Pending } from "./pending";
import { Section } from "./section";

export function AboutSection() {
  const { portrait, paragraphs } = site.about;

  return (
    <Section id="sobre-mi" title={site.name ? `Soy ${site.name}` : "Sobre mí"}>
      <div className="with-margin">
        <div className="max-w-[62ch] text-[1.15rem] leading-relaxed">
          {paragraphs.length > 0 ? (
            <div className="flex flex-col gap-5">
              {paragraphs.map((p, i) => (
                <p key={p} data-reveal="" style={{ ["--i" as string]: i }}>
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
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {site.profiles.map((profile) => (
                <li key={profile.href}>
                  <a href={profile.href} target="_blank" rel="noopener me" className="link-mark">
                    {profile.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div data-reveal="portrait" className="self-start">
          {portrait ? (
            <Image
              src={portrait.src}
              alt={portrait.alt}
              placeholder="blur"
              sizes="(min-width: 70rem) 17rem, 20rem"
              className="aspect-[4/5] h-auto w-full max-w-xs rounded-[4px] border border-rule object-cover object-[45%_30%]"
            />
          ) : (
            <div className="grid aspect-[4/5] w-full max-w-xs place-items-center rounded-[4px] border border-dashed border-cobalt p-6 text-center">
              <Pending what="tu retrato (opcional)" />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
