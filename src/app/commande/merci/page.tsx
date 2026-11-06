import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Commande reçue",
  robots: { index: false, follow: false },
};

export default function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  return (
    <Suspense fallback={<Container className="py-24"><p>Chargement…</p></Container>}>
      <Thanks searchParams={searchParams} />
    </Suspense>
  );
}

async function Thanks({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;

  return (
    <Container className="py-24 md:py-32">
      <Eyebrow>Commande reçue</Eyebrow>
      <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
        C’est noté.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-black/70">
        {ref ? (
          <>
            Votre référence est <span className="font-medium text-black">{ref}</span>. Gardez-la : nous vous contactons pour confirmer la commande.
          </>
        ) : (
          "Nous vous contactons pour confirmer la commande."
        )}
      </p>
      <p className="mt-4 max-w-xl text-sm text-black/45">Aucun paiement n’a été demandé.</p>
      <Link href="/" className="mt-10 inline-flex h-12 items-center bg-black px-5 text-sm font-medium text-white">
        Retour à l’accueil
      </Link>
    </Container>
  );
}
