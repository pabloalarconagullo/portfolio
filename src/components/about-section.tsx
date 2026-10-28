import { site } from "@content/site";

import { Pending } from "./pending";
import { Section } from "./section";

/** Presentación sin foto: el primer párrafo como entradilla y el resto al lado, con los perfiles. */
export function AboutSection() {
  const [first, ...rest] = site.about.paragraphs;

  return (
    <Section id="sobre-mi" title={site.name ? `Soy ${site.name}` : "Sobre mí"}>
      {first ? (
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 margin:gap-24">
          <p
            data-reveal=""
            className="t-wide max-w-[30ch] text-[clamp(1.45rem,1.1rem+1.2vw,2.15rem)] font-semibold leading-[1.25] tracking-[-0.025em] [--wdth:104]"
          >
            {first}
          </p>
          <div className="max-w-[60ch]">
            <div className="flex flex-col gap-6 text-[1.15rem] leading-relaxed text-graphite">
              {rest.map((p, i) => (
                <p key={p} data-reveal="" style={{ ["--i" as string]: i + 1 }}>
                  {p}
                </p>
              ))}
            </div>
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
      ) : (
        <p>
          <Pending what="tu presentación (site.about.paragraphs)" />
        </p>
      )}
    </Section>
  );
}
