import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { formatPrice } from "@/lib/catalog";
import { readPublicProducts } from "@/lib/products";

export async function generateStaticParams() {
  const products = await readPublicProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const products = await readPublicProducts();
  const product = products.find((item) => item.slug === slug);
  if (!product) return { title: "Logiciel" };
  return { title: product.name, description: product.summary };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await readPublicProducts();
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const others = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <Container className="py-16 md:py-24">
      <Link href="/logiciels" className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45 hover:text-white">
        ← Catalogue
      </Link>
      <div className="mt-8 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <Eyebrow>{product.category}</Eyebrow>
          <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight md:text-7xl">{product.name}</h1>
          <p className="mt-6 text-lg leading-relaxed text-white/70">{product.description}</p>
          <p className="mt-6 text-sm text-white/50">Pour qui : {product.forWhom}</p>
          <ul className="mt-10 border-t border-white/15">
            {product.includes.map((item) => (
              <li key={item} className="border-b border-white/15 py-3 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit border border-white/15 p-6 md:col-span-4 md:col-start-9">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Prix indicatif</p>
          <p className="mt-3 font-display text-4xl font-semibold">{formatPrice(product.price)}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/55">
            Confirmé avec vous après la commande. Aucun paiement sur le site.
          </p>
          <ButtonLink href={`/commande?type=produit&produit=${product.slug}`} className="mt-6 w-full">
            Commander ce logiciel
          </ButtonLink>
        </aside>
      </div>

      <div className="mt-20 border-t border-white/15 pt-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">Autres logiciels</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map((item) => (
            <Link key={item.slug} href={`/logiciels/${item.slug}`} className="border border-white/15 p-5 hover:bg-white hover:text-black">
              <span className="font-display text-2xl font-semibold">{item.name}</span>
              <span className="mt-2 block text-sm text-current/60">{formatPrice(item.price)}</span>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
