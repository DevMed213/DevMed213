import type { Metadata } from "next";
import Link from "next/link";
import { ProductPhoto } from "@/components/product-photo";
import { Container, Eyebrow } from "@/components/ui";
import { formatPrice } from "@/lib/catalog";
import { readPublicProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Logiciels prêts",
  description: "Catalogue de logiciels prêts à installer et à ajuster, proposés par DevMed213.",
};

export default async function ProductsPage() {
  const products = await readPublicProducts();
  return (
    <Container className="py-16 md:py-24">
      <Eyebrow>Catalogue</Eyebrow>
      <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
        Logiciels prêts.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/60">
        Des bases déjà conçues. Vous commandez, nous confirmons l’installation et les ajustements. Les prix sont indicatifs : rien n’est encaissé sur ce site.
      </p>

      <div className="mt-14 border-t border-black/10">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/logiciels/${product.slug}`}
            className="group grid items-center gap-4 border-b border-black/10 py-5 transition-colors hover:bg-white md:grid-cols-12 md:px-4"
          >
            <ProductPhoto src={product.image} alt="" className="aspect-[16/10] w-full md:col-span-3" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/45 md:col-span-2">
              {product.category}
            </span>
            <span className="md:col-span-4">
              <span className="block font-display text-3xl font-semibold tracking-tight">{product.name}</span>
              <span className="mt-2 block text-sm leading-relaxed text-black/60">{product.summary}</span>
            </span>
            <span className="text-sm md:col-span-3 md:text-right">
              {formatPrice(product.price)}
              <span className="ml-3 inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
