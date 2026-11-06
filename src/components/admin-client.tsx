"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";
import type { Order } from "@/lib/orders";
import { kindLabels } from "@/lib/site";

const field =
  "mt-2 w-full border border-white/15 bg-transparent px-3 text-sm outline-none focus:border-white";

type Draft = {
  originalSlug: string;
  slug: string;
  name: string;
  category: string;
  price: string;
  summary: string;
  description: string;
  includes: string;
  forWhom: string;
  active: boolean;
};

const emptyDraft = (): Draft => ({
  originalSlug: "",
  slug: "",
  name: "",
  category: "Logiciel",
  price: "",
  summary: "",
  description: "",
  includes: "",
  forWhom: "",
  active: true,
});

function toDraft(product: Product): Draft {
  return {
    originalSlug: product.slug,
    slug: product.slug,
    name: product.name,
    category: product.category,
    price: String(product.price),
    summary: product.summary,
    description: product.description,
    includes: product.includes.join("\n"),
    forWhom: product.forWhom,
    active: product.active,
  };
}

export function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password"),
      }),
    });
    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Connexion impossible.");
      setPending(false);
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm space-y-4">
      <label className="block text-sm text-white/70">
        Nom d’utilisateur
        <input name="username" required autoComplete="username" className={`${field} h-12`} />
      </label>
      <label className="block text-sm text-white/70">
        Mot de passe
        <input name="password" type="password" required autoComplete="current-password" className={`${field} h-12`} />
      </label>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center bg-paper px-5 text-sm font-medium text-black disabled:opacity-60"
      >
        {pending ? "Vérification…" : "Entrer"}
      </button>
    </form>
  );
}

export function AdminPanel({ orders, products }: { orders: Order[]; products: Product[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<"commandes" | "logiciels">("commandes");

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex border border-white/15">
          {(
            [
              ["commandes", "Commandes"],
              ["logiciels", "Logiciels"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`h-11 px-4 text-sm ${tab === id ? "bg-white text-black" : "text-white/70"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <button type="button" onClick={logout} className="text-sm text-white/60 underline-offset-4 hover:underline">
          Quitter
        </button>
      </div>
      <div className="mt-8">
        {tab === "commandes" ? <OrdersList orders={orders} /> : <ProductManager products={products} />}
      </div>
    </div>
  );
}

function OrdersList({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState("");

  async function remove(id: string) {
    setPendingId(id);
    await fetch("/api/admin/orders", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setPendingId("");
    router.refresh();
  }

  if (orders.length === 0) return <p className="text-white/55">Aucune commande pour le moment.</p>;

  return (
    <ul className="divide-y divide-white/10 border-y border-white/10">
      {orders.map((order) => (
        <li key={order.id} className="grid gap-3 py-6 md:grid-cols-[160px_1fr_auto]">
          <div>
            <p className="font-mono text-sm">{order.id}</p>
            <p className="mt-1 text-xs text-white/40">
              {new Intl.DateTimeFormat("fr-DZ", { dateStyle: "medium", timeStyle: "short" }).format(
                new Date(order.createdAt),
              )}
            </p>
          </div>
          <div className="text-sm">
            <p className="font-medium">
              {order.name} · {kindLabels[order.kind]}
              {order.productName ? ` · ${order.productName}` : ""}
              {order.quantity > 1 ? ` × ${order.quantity}` : ""}
            </p>
            <p className="mt-1 text-white/55">
              {order.email} · {order.phone}
            </p>
            <p className="mt-2 whitespace-pre-wrap text-white/75">{order.message}</p>
            {order.deadline || order.budget ? (
              <p className="mt-2 text-xs text-white/40">{[order.deadline, order.budget].filter(Boolean).join(" · ")}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => remove(order.id)}
            disabled={pendingId === order.id}
            className="h-fit text-left text-xs text-white/40 hover:text-white"
          >
            Retirer
          </button>
        </li>
      ))}
    </ul>
  );
}

function ProductManager({ products }: { products: Product[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft) return;
    setPending(true);
    setError("");
    const creating = !draft.originalSlug;
    const response = await fetch("/api/admin/products", {
      method: creating ? "POST" : "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        originalSlug: draft.originalSlug,
        slug: draft.slug || draft.name,
        name: draft.name,
        category: draft.category,
        price: Number(draft.price),
        summary: draft.summary,
        description: draft.description,
        includes: draft.includes,
        forWhom: draft.forWhom,
        active: draft.active,
      }),
    });
    const data = (await response.json()) as { error?: string };
    setPending(false);
    if (!response.ok) {
      setError(data.error ?? "Enregistrement impossible.");
      return;
    }
    setDraft(null);
    router.refresh();
  }

  async function remove(slug: string) {
    if (!window.confirm("Supprimer ce logiciel du catalogue ?")) return;
    await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    router.refresh();
  }

  async function toggle(product: Product) {
    await fetch("/api/admin/products", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...product,
        originalSlug: product.slug,
        includes: product.includes.join("\n"),
        active: !product.active,
      }),
    });
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-white/50">{products.length} logiciel{products.length > 1 ? "s" : ""}</p>
        <button type="button" onClick={() => { setDraft(emptyDraft()); setError(""); }} className="h-11 bg-paper px-4 text-sm font-medium text-black">
          Nouveau logiciel
        </button>
      </div>

      {draft ? (
        <form onSubmit={save} className="mt-6 grid gap-4 border border-white/15 p-5">
          <p className="font-display text-2xl">{draft.originalSlug ? "Modifier" : "Nouveau logiciel"}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-white/70">
              Nom
              <input required value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} className={`${field} h-11`} />
            </label>
            <label className="text-sm text-white/70">
              Identifiant
              <input value={draft.slug} onChange={(event) => setDraft({ ...draft, slug: event.target.value })} placeholder="auto depuis le nom" className={`${field} h-11`} />
            </label>
            <label className="text-sm text-white/70">
              Catégorie
              <input required value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} className={`${field} h-11`} />
            </label>
            <label className="text-sm text-white/70">
              Prix indicatif (DA)
              <input required type="number" min={0} value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} className={`${field} h-11`} />
            </label>
          </div>
          <label className="text-sm text-white/70">
            Résumé
            <input required value={draft.summary} onChange={(event) => setDraft({ ...draft, summary: event.target.value })} className={`${field} h-11`} />
          </label>
          <label className="text-sm text-white/70">
            Description
            <textarea required rows={4} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} className={`${field} py-3`} />
          </label>
          <label className="text-sm text-white/70">
            Inclus, une ligne par élément
            <textarea required rows={4} value={draft.includes} onChange={(event) => setDraft({ ...draft, includes: event.target.value })} className={`${field} py-3`} />
          </label>
          <label className="text-sm text-white/70">
            Pour qui
            <input value={draft.forWhom} onChange={(event) => setDraft({ ...draft, forWhom: event.target.value })} className={`${field} h-11`} />
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" checked={draft.active} onChange={(event) => setDraft({ ...draft, active: event.target.checked })} />
            Visible sur le site
          </label>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <div className="flex gap-3">
            <button type="submit" disabled={pending} className="h-11 bg-paper px-4 text-sm font-medium text-black disabled:opacity-60">
              {pending ? "Enregistrement…" : "Enregistrer"}
            </button>
            <button type="button" onClick={() => setDraft(null)} className="h-11 border border-white/20 px-4 text-sm">
              Annuler
            </button>
          </div>
        </form>
      ) : null}

      <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
        {products.map((product) => (
          <li key={product.slug} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">
                {product.name}{" "}
                <span className="text-sm text-white/40">{product.active ? "" : "· masqué"}</span>
              </p>
              <p className="mt-1 text-sm text-white/50">
                {product.category} · {formatPrice(product.price)}
              </p>
            </div>
            <div className="flex gap-4 text-sm">
              <button type="button" onClick={() => { setDraft(toDraft(product)); setError(""); }} className="text-white/80 hover:text-white">
                Modifier
              </button>
              <button type="button" onClick={() => toggle(product)} className="text-white/50 hover:text-white">
                {product.active ? "Masquer" : "Publier"}
              </button>
              <button type="button" onClick={() => remove(product.slug)} className="text-white/40 hover:text-white">
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
