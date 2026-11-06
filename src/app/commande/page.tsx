import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderForm } from "@/components/order-form";
import { Container, Eyebrow } from "@/components/ui";
import { readPublicProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Commander",
  description: "Passez commande pour un site, une application ou un logiciel. Sans paiement en ligne.",
};

export default function OrderPage() {
  return (
    <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-24">
      <div className="md:col-span-5">
        <Eyebrow>Commande</Eyebrow>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
          Dites-nous ce qu’il faut construire.
        </h1>
        <p className="mt-6 text-black/65">
          Site, application, logiciel sur mesure ou logiciel du catalogue. Nous lisons la demande et nous vous contactons pour la confirmer.
        </p>
        <ol className="mt-10 space-y-4 text-sm text-black/55">
          <li>01 — Vous envoyez la commande</li>
          <li>02 — Nous confirmons le périmètre et le prix</li>
          <li>03 — Le travail commence après votre accord</li>
        </ol>
      </div>
      <div className="border border-black/10 bg-white p-5 md:col-span-7 md:p-8">
        <Suspense fallback={<p className="text-sm text-black/50">Chargement du formulaire…</p>}>
          <OrderFields />
        </Suspense>
      </div>
    </Container>
  );
}

async function OrderFields() {
  const products = await readPublicProducts();
  return <OrderForm products={products} />;
}
