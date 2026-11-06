"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Order } from "@/lib/orders";
import { kindLabels } from "@/lib/site";

export function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const password = String(new FormData(event.currentTarget).get("password") ?? "");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
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
    <form onSubmit={onSubmit} className="max-w-sm">
      <label className="block text-sm text-white/70">
        Mot de passe
        <input
          name="password"
          type="password"
          required
          className="mt-2 h-12 w-full border border-white/15 bg-transparent px-4 outline-none focus:border-white"
        />
      </label>
      {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex h-12 items-center bg-paper px-5 text-sm font-medium text-black disabled:opacity-60"
      >
        {pending ? "Vérification…" : "Entrer"}
      </button>
    </form>
  );
}

export function AdminOrders({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState("");

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

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

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-white/50">{orders.length} commande{orders.length > 1 ? "s" : ""}</p>
        <button type="button" onClick={logout} className="text-sm text-white/60 underline-offset-4 hover:underline">
          Quitter
        </button>
      </div>
      {orders.length === 0 ? (
        <p className="mt-10 text-white/55">Aucune commande pour le moment.</p>
      ) : (
        <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
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
                  <p className="mt-2 text-xs text-white/40">
                    {[order.deadline, order.budget].filter(Boolean).join(" · ")}
                  </p>
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
      )}
    </div>
  );
}
