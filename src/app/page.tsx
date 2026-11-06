import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { ProductPhoto } from "@/components/product-photo";
import { formatPrice, services } from "@/lib/catalog";
import { readPublicProducts } from "@/lib/products";
import { steps } from "@/lib/site";

export default async function Home() {
  const products = (await readPublicProducts()).slice(0, 3);
  return (
    <>
      <Hero />

      <section className="border-b border-black/10 bg-white text-black">
        <Container className="grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <Reveal className="md:col-span-4">
            <Eyebrow light>01 — Services</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Trois métiers, une même exigence.
            </h2>
          </Reveal>
          <div className="md:col-span-7 md:col-start-6">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 0.06}>
                <Link
                  href={`/services#${service.id}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 border-t border-black/15 py-6"
                >
                  <span className="font-mono text-xs text-black/40">{service.index}</span>
                  <span>
                    <span className="block font-display text-2xl font-semibold tracking-tight">{service.title}</span>
                    <span className="mt-1 block text-sm text-black/60">{service.lead}</span>
                  </span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-black/10">
        <Container className="py-20 md:py-28">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>02 — Logiciels prêts</Eyebrow>
              <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
                Déjà conçus. Ajustés pour vous.
              </h2>
            </div>
            <ButtonLink href="/logiciels" variant="ghost">
              Tout le catalogue
            </ButtonLink>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <Reveal key={product.slug} delay={index * 0.05}>
                <Link href={`/logiciels/${product.slug}`} className="flex h-full flex-col border border-black/10 bg-white transition-colors hover:border-black">
                  <ProductPhoto src={product.image} alt="" className="aspect-[16/10] w-full" />
                  <span className="flex flex-1 flex-col p-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/45">{product.category}</span>
                    <span className="mt-4 font-display text-3xl font-semibold tracking-tight">{product.name}</span>
                    <span className="mt-3 flex-1 text-sm leading-relaxed text-black/60">{product.summary}</span>
                    <span className="mt-8 text-sm">À partir de {formatPrice(product.price)}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-black/10">
        <Container className="py-20 md:py-28">
          <Reveal>
            <Eyebrow>03 — Déroulement</Eyebrow>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
              De la commande à la livraison.
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-4 md:grid-cols-5">
            {steps.map((step) => (
              <li key={step.n} className="border border-black/10 bg-white p-5">
                <span className="font-mono text-xs text-black/40">{step.n}</span>
                <h3 className="mt-6 font-display text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/55">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section>
        <Container className="grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <Reveal className="md:col-span-4">
            <Eyebrow>04 — Questions</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight">Avant de commander.</h2>
          </Reveal>
          <div className="md:col-span-7 md:col-start-6">
            <FaqList />
          </div>
        </Container>
      </section>

      <section className="border-t border-black/10">
        <Container className="flex flex-col items-start justify-between gap-8 py-20 md:flex-row md:items-end md:py-24">
          <h2 className="max-w-xl font-display text-4xl font-semibold leading-none tracking-tight md:text-6xl">
            Décrivez le projet. Nous revenons vers vous.
          </h2>
          <ButtonLink href="/commande">Passer commande</ButtonLink>
        </Container>
      </section>
    </>
  );
}
