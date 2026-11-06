import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderForm } from "@/components/order-form";
import { Container, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter DevMed213 pour un site, une application ou un logiciel.",
};

export default function ContactPage() {
  return (
    <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-24">
      <div className="md:col-span-5">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
          Écrivez-nous.
        </h1>
        <p className="mt-6 text-white/65">
          Une question avant de commander, ou un projet encore flou. Le message arrive au même endroit que les commandes.
        </p>
        <a href={`mailto:${site.email}`} className="mt-8 inline-block text-lg hover:underline">
          {site.email}
        </a>
        <p className="mt-2 text-sm text-white/40">Réponse par e-mail ou téléphone.</p>
      </div>
      <div className="border border-white/15 p-5 md:col-span-7 md:p-8">
        <Suspense fallback={<p className="text-sm text-white/50">Chargement du formulaire…</p>}>
          <OrderForm mode="contact" />
        </Suspense>
      </div>
    </Container>
  );
}
