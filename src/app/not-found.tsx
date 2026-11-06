import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/40">404</p>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight">Cette page n’existe pas.</h1>
      <ButtonLink href="/" className="mt-8">
        Retour à l’accueil
      </ButtonLink>
    </Container>
  );
}
