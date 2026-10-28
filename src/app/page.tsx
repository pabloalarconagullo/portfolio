import Link from "next/link";

import { featuredProjects, visibleProjects } from "@content/projects";
import { displayName, site } from "@content/site";
import { AboutSection } from "@/components/about-section";
import { ContactBlock } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { plainText } from "@/components/notes";
import { PricingSection } from "@/components/pricing-section";
import { ProcessSection } from "@/components/process-section";
import { ProjectIndex } from "@/components/project-index";
import { ProjectSpread } from "@/components/project-spread";
import { Section } from "@/components/section";
import { ServicesSection } from "@/components/services-section";
import { StackMarquee } from "@/components/stack-marquee";
import { baseUrl } from "@/lib/seo";

export default function Home() {
  const rest = visibleProjects.filter((p) => !featuredProjects.includes(p));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: displayName,
          url: baseUrl,
          description: plainText(site.hero.intro),
          inLanguage: "es",
          ...(site.name && {
            author: {
              "@type": "Person",
              name: site.name,
              ...(site.role && { jobTitle: site.role }),
              ...(site.profiles.length > 0 && { sameAs: site.profiles.map((p) => p.href) }),
            },
          }),
        }}
      />

      <div className="read-progress" aria-hidden="true" />
      <Hero />
      <StackMarquee />

      <Section
        id="proyectos"
        title="Proyectos"
        aside="Capturas reales. Los números sobre cada imagen corresponden a las notas del margen."
      >
        {featuredProjects.map((project) => (
          <ProjectSpread key={project.slug} project={project} />
        ))}

        {rest.length > 0 && (
          <div className="border-t border-rule pt-16 md:pt-24">
            <h3 className="t-h3 mb-10">Más proyectos</h3>
            <ProjectIndex projects={rest} />
            <p className="mt-8">
              <Link href="/proyectos" className="link-mark font-semibold">
                Ver los {visibleProjects.length} proyectos juntos
              </Link>
            </p>
          </div>
        )}
      </Section>

      <ServicesSection />
      <PricingSection />
      <ProcessSection />
      <AboutSection />

      <Section id="contacto" title={site.contact.title} aside={site.contact.intro} hideMobileCta>
        <ContactBlock />
      </Section>
    </>
  );
}
