import { revalidatePath, revalidateTag } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { parseProduct, readProducts, writeProducts } from "@/lib/products";

function refresh(slugs: string[]) {
  revalidateTag("products", { expire: 0 });
  revalidatePath("/");
  revalidatePath("/logiciels");
  revalidatePath("/commande");
  for (const slug of slugs) revalidatePath(`/logiciels/${slug}`);
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Non autorisé." }, { status: 401 });
  const body = await request.json().catch(() => null);
  const { product, error } = parseProduct(body);
  if (!product) return Response.json({ error }, { status: 400 });

  const products = await readProducts();
  if (products.some((item) => item.slug === product.slug)) {
    return Response.json({ error: "Cet identifiant existe déjà." }, { status: 400 });
  }
  products.push(product);
  await writeProducts(products);
  refresh([product.slug]);
  return Response.json({ ok: true });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Non autorisé." }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { originalSlug?: string } | null;
  const { product, error } = parseProduct(body);
  if (!product || !body) return Response.json({ error }, { status: 400 });

  const originalSlug = String(body.originalSlug ?? product.slug);
  const products = await readProducts();
  const index = products.findIndex((item) => item.slug === originalSlug);
  if (index < 0) return Response.json({ error: "Logiciel introuvable." }, { status: 404 });
  if (products.some((item, itemIndex) => item.slug === product.slug && itemIndex !== index)) {
    return Response.json({ error: "Cet identifiant existe déjà." }, { status: 400 });
  }
  products[index] = product;
  await writeProducts(products);
  refresh([originalSlug, product.slug]);
  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Non autorisé." }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { slug?: string } | null;
  const slug = String(body?.slug ?? "");
  if (!slug) return Response.json({ error: "Logiciel introuvable." }, { status: 400 });

  const products = await readProducts();
  await writeProducts(products.filter((product) => product.slug !== slug));
  refresh([slug]);
  return Response.json({ ok: true });
}
