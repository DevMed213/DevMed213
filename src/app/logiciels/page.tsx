import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { formatPrice, products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Logiciels prêts",
  description: "Catalogue de logiciels prêts à installer et à ajuster, proposés par DevMed213.",
};

export default function ProductsPage() {
  return (
    <Container className="py-16 md:py-24">
      <Eyebrow>Catalogue</Eyebrow>
      <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
        Logiciels prêts.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
        Des bases déjà conçues. Vous commandez, nous confirmons l’installation et les ajustements. Les prix sont indicatifs : rien n’est encaissé sur ce site.
      </p>

      <div className="mt-14 border-t border-white/15">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/logiciels/${product.slug}`}
            className="group grid items-center gap-4 border-b border-white/15 py-7 transition-colors hover:bg-white hover:text-black md:grid-cols-12 md:px-4"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-current/45 md:col-span-2">
              {product.category}
            </span>
            <span className="font-display text-3xl font-semibold tracking-tight md:col-span-3">{product.name}</span>
            <span className="text-sm leading-relaxed text-current/65 md:col-span-5">{product.summary}</span>
            <span className="text-sm md:col-span-2 md:text-right">
              {formatPrice(product.price)}
              <span className="ml-3 inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
