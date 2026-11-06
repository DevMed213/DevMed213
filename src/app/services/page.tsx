import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { services } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Services",
  description: "Création de sites web, d’applications et de logiciels sur mesure par DevMed213.",
};

export default function ServicesPage() {
  return (
    <>
      <Container className="border-b border-black/10 py-16 md:py-24">
        <Eyebrow>Services</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
          Ce que nous construisons.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/65">
          Un site pour être trouvé, une application pour être utilisé, un logiciel pour faire tourner l’activité. Chaque mission commence par une commande, sans paiement en ligne.
        </p>
      </Container>

      {services.map((service) => (
        <section key={service.id} id={service.id} className="scroll-mt-24 border-b border-black/10">
          <Container className="grid gap-10 py-16 md:grid-cols-12 md:py-24">
            <Reveal className="md:col-span-5">
              <p className="font-mono text-xs text-black/40">{service.index}</p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">{service.title}</h2>
              <p className="mt-4 text-black/65">{service.lead}</p>
            </Reveal>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-lg leading-relaxed text-black/80">{service.text}</p>
              <ul className="mt-8 border-t border-black/10">
                {service.points.map((point) => (
                  <li key={point} className="flex items-center justify-between border-b border-black/10 py-3 text-sm">
                    {point}
                    <span className="text-black/30">→</span>
                  </li>
                ))}
              </ul>
              <ButtonLink href={`/commande?type=${service.kind}`} className="mt-8">
                {service.kind === "site"
                  ? "Commander un site"
                  : service.kind === "application"
                    ? "Commander une application"
                    : "Commander un logiciel"}
              </ButtonLink>
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
