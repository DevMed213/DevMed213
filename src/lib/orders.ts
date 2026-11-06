import { randomBytes } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { readCollection, syncCollection } from "@/lib/firestore-store";
import { readPublicProducts } from "@/lib/products";
import { deadlines, kinds, type Kind, budgets } from "@/lib/site";

export type Order = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  kind: Kind;
  productSlug: string;
  productName: string;
  quantity: number;
  deadline: string;
  budget: string;
  message: string;
};

const filePath = path.join(process.cwd(), "data", "orders.json");

async function readLocalOrders(): Promise<Order[]> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as Order[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function readOrders(): Promise<Order[]> {
  const local = await readLocalOrders();
  try {
    const remote = await readCollection<Order>("orders");
    const merged = new Map<string, Order>();
    for (const order of [...remote, ...local]) merged.set(order.id, order);
    return [...merged.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (error) {
    console.error("Firestore commandes indisponible.", error);
    return local;
  }
}

async function writeLocalOrders(orders: Order[]) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const temp = `${filePath}.tmp`;
  await writeFile(temp, JSON.stringify(orders, null, 2));
  await rename(temp, filePath);
}

export async function saveOrders(orders: Order[]) {
  let saved = false;
  try {
    await syncCollection("orders", orders);
    saved = true;
  } catch (error) {
    console.error("Envoi Firestore des commandes impossible.", error);
  }
  try {
    await writeLocalOrders(orders);
    saved = true;
  } catch (error) {
    console.error("Enregistrement local des commandes impossible.", error);
  }
  if (!saved) throw new Error("La commande n’a pas pu être enregistrée.");
}

function clean(value: unknown, max: number) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

export async function parseOrder(body: unknown): Promise<{ order?: Order; error?: string }> {
  if (!body || typeof body !== "object") return { error: "Demande invalide." };
  const data = body as Record<string, unknown>;

  if (clean(data.company, 80)) return { error: "Demande refusée." };

  const name = clean(data.name, 120);
  const email = clean(data.email, 160).toLowerCase();
  const phone = clean(data.phone, 40);
  const kind = clean(data.kind, 20) as Kind;
  const message = String(data.message ?? "").trim().slice(0, 4000);
  const deadline = clean(data.deadline, 40);
  const budget = clean(data.budget, 40);
  const productSlug = clean(data.productSlug, 80);
  const quantity = Number(data.quantity ?? 1);

  if (name.length < 2) return { error: "Indiquez votre nom." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Indiquez un e-mail valide." };
  if (phone.replace(/\D/g, "").length < 8) return { error: "Indiquez un téléphone valide." };
  if (!kinds.includes(kind)) return { error: "Choisissez un type de demande." };
  if (message.length < 20) return { error: "Décrivez votre besoin en quelques phrases." };
  if (deadline && !deadlines.includes(deadline as (typeof deadlines)[number])) {
    return { error: "Délai invalide." };
  }
  if (budget && !budgets.includes(budget as (typeof budgets)[number])) {
    return { error: "Budget invalide." };
  }

  const catalog = await readPublicProducts();
  const product = productSlug ? catalog.find((item) => item.slug === productSlug) : undefined;
  if (kind === "produit" && !product) return { error: "Choisissez un logiciel du catalogue." };
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    return { error: "Quantité invalide." };
  }

  const order: Order = {
    id: `DM-${randomBytes(3).toString("hex").toUpperCase()}`,
    createdAt: new Date().toISOString(),
    name,
    email,
    phone,
    kind,
    productSlug: product?.slug ?? "",
    productName: product?.name ?? "",
    quantity: kind === "produit" ? quantity : 1,
    deadline,
    budget,
    message,
  };

  return { order };
}
