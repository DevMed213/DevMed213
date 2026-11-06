import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "À propos",
  description: "DevMed213, studio de programmation en ligne : sites web, applications et logiciels.",
};

const principles = [
  {
    title: "Clair avant d’être décoré",
    text: "Le noir et le blanc ne sont pas une mode. Ils forcent le contenu, le parcours et le logiciel à être lisibles.",
  },
  {
    title: "Utile avant d’être complet",
    text: "Nous livrons ce qui sert tout de suite, puis nous ajoutons ce qui a vraiment une place.",
  },
  {
    title: "Confirmé avant d’être lancé",
    text: "Une commande n’est pas un paiement. Elle ouvre la discussion sur le prix, le délai et le résultat.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Container className="py-16 md:py-24">
        <Eyebrow>À propos</Eyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
          Un studio en ligne, pour des outils concrets.
        </h1>
        <div className="mt-10 grid gap-8 text-lg leading-relaxed text-white/70 md:grid-cols-2">
          <p>
            DevMed213 conçoit des sites web, des applications et des logiciels. Le 213 est l’indicatif de l’Algérie : le travail se fait à distance, avec des clients ici et ailleurs.
          </p>
          <p>
            Le symbole reprend un curseur. C’est le geste du métier : écrire, avancer, livrer. Pas un catalogue de promesses, un interlocuteur qui construit ce dont l’activité a besoin.
          </p>
        </div>
      </Container>
      <section className="border-y border-white/10 bg-paper text-black">
        <Container className="grid gap-10 py-16 md:grid-cols-3 md:py-20">
          {principles.map((item, index) => (
            <article key={item.title}>
              <p className="font-mono text-xs text-black/40">0{index + 1}</p>
              <h2 className="mt-4 font-display text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-black/65">{item.text}</p>
            </article>
          ))}
        </Container>
      </section>
      <Container className="flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
        <p className="max-w-lg text-white/70">Un projet en tête, ou un logiciel du catalogue à installer.</p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/commande">Passer commande</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Écrire
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
