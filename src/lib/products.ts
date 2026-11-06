import { cacheTag } from "next/cache";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Product } from "@/lib/catalog";
import { readCollection, syncCollection } from "@/lib/firestore-store";
import seed from "../../data/products.json";

const filePath = path.join(process.cwd(), "data", "products.json");

function normalize(item: Partial<Product>): Product {
  return {
    slug: String(item.slug ?? ""),
    name: String(item.name ?? ""),
    category: String(item.category ?? "Logiciel"),
    price: Number(item.price) || 0,
    summary: String(item.summary ?? ""),
    description: String(item.description ?? ""),
    includes: Array.isArray(item.includes) ? item.includes.map((line) => String(line)) : [],
    forWhom: String(item.forWhom ?? ""),
    active: item.active !== false,
  };
}

async function readLocalProducts(): Promise<Product[]> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<Product>[];
    return Array.isArray(parsed) ? parsed.map(normalize) : [];
  } catch {
    return [];
  }
}

export const seedProducts: Product[] = (seed as Partial<Product>[]).map(normalize);

export async function readProducts(): Promise<Product[]> {
  const local = await readLocalProducts();
  // Firestore uses network IO. Next.js rejects that while prerendering pages.
  if (process.env.NEXT_PHASE === "phase-production-build") return local.length > 0 ? local : seedProducts;
  try {
    const remote = (await readCollection<Partial<Product>>("products")).map(normalize);
    if (remote.length > 0) return remote;
  } catch (error) {
    console.error("Firestore produits indisponible.", error);
  }
  return local.length > 0 ? local : seedProducts;
}

export async function readPublicProducts() {
  "use cache";
  cacheTag("products");
  const products = await readProducts();
  return products.filter((product) => product.active);
}

async function writeLocalProducts(products: Product[]) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const temp = `${filePath}.tmp`;
  await writeFile(temp, JSON.stringify(products, null, 2));
  await rename(temp, filePath);
}

export async function writeProducts(products: Product[]) {
  let saved = false;
  try {
    await syncCollection("products", products);
    saved = true;
  } catch (error) {
    console.error("Envoi Firestore des produits impossible.", error);
  }
  try {
    await writeLocalProducts(products);
    saved = true;
  } catch (error) {
    console.error("Enregistrement local des produits impossible.", error);
  }
  if (!saved) throw new Error("Le catalogue n’a pas pu être enregistré.");
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function parseProduct(body: unknown): { product?: Product; error?: string } {
  if (!body || typeof body !== "object") return { error: "Logiciel invalide." };
  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim().slice(0, 80);
  const slug = slugify(String(data.slug ?? name));
  const category = String(data.category ?? "").trim().slice(0, 40);
  const summary = String(data.summary ?? "").trim().slice(0, 180);
  const description = String(data.description ?? "").trim().slice(0, 2000);
  const forWhom = String(data.forWhom ?? "").trim().slice(0, 240);
  const price = Number(data.price);
  const includes = String(data.includes ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 12);

  if (name.length < 2) return { error: "Indiquez le nom du logiciel." };
  if (!slug) return { error: "Indiquez un identifiant." };
  if (!category) return { error: "Indiquez une catégorie." };
  if (!Number.isFinite(price) || price < 0) return { error: "Indiquez un prix valide." };
  if (summary.length < 8) return { error: "Ajoutez un résumé court." };
  if (description.length < 20) return { error: "Décrivez le logiciel." };
  if (includes.length === 0) return { error: "Ajoutez au moins un élément inclus." };

  return {
    product: {
      slug,
      name,
      category,
      price: Math.round(price),
      summary,
      description,
      includes,
      forWhom,
      active: data.active !== false && data.active !== "false",
    },
  };
}
