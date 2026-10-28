import type { Metadata } from "next";

import { getPlan, planLabel } from "@content/pricing";
import { getProject } from "@content/projects";
import { site } from "@content/site";
import { ContactBlock } from "@/components/contact-section";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cuéntame qué necesitas y te respondo con preguntas concretas o una primera propuesta.",
  alternates: { canonical: "/contacto" },
};

export default async function ContactPage({ searchParams }: PageProps<"/contacto">) {
  const { proyecto, plan: planId } = await searchParams;
  const reference = typeof proyecto === "string" ? (getProject(proyecto) ?? null) : null;
  const plan = typeof planId === "string" ? getPlan(planId) : undefined;

  return (
    <div className="shell pb-24 pt-14 md:pt-20">
      <div className="with-margin mb-12 md:mb-16">
        <div>
          <h1 className="t-display max-w-[14ch]">{site.contact.title}</h1>
          <p className="t-lead mt-6 max-w-[48ch]">{site.contact.intro}</p>
        </div>
      </div>
      <ContactBlock reference={reference} plan={plan ? { value: plan.id, label: planLabel(plan) } : null} />
    </div>
  );
}
