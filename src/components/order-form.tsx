"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { getProduct, products } from "@/lib/catalog";
import { budgets, deadlines, kindLabels, kinds, type Kind } from "@/lib/site";

const field =
  "mt-2 w-full border border-white/15 bg-transparent px-4 text-sm outline-none transition-colors placeholder:text-white/30 focus:border-white";

export function OrderForm({ mode = "commande" }: { mode?: "commande" | "contact" }) {
  const router = useRouter();
  const params = useSearchParams();
  const presetKind = (mode === "contact" ? "contact" : params.get("type")) as Kind | null;
  const presetProduct = params.get("produit") ?? "";
  const product = getProduct(presetProduct);

  const initialKind: Kind =
    product ? "produit" : presetKind && kinds.includes(presetKind) ? presetKind : "site";

  const [kind, setKind] = useState<Kind>(initialKind);
  const [productSlug, setProductSlug] = useState(product?.slug ?? "");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const selected = useMemo(
    () => products.find((item) => item.slug === productSlug),
    [productSlug],
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !data.id) {
        setError(data.error ?? "La commande n’a pas pu être envoyée.");
        setPending(false);
        return;
      }
      router.push(`/commande/merci?ref=${data.id}`);
    } catch {
      setError("Connexion impossible. Réessayez dans un instant.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input type="hidden" name="kind" value={kind} />

      {mode === "commande" ? (
        <fieldset>
          <legend className="text-sm text-white/70">Type de demande</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {kinds
              .filter((item) => item !== "contact")
              .map((item) => (
                <label
                  key={item}
                  className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition-colors ${
                    kind === item ? "border-white bg-white text-black" : "border-white/15 hover:border-white/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="kind-choice"
                    className="sr-only"
                    checked={kind === item}
                    onChange={() => setKind(item)}
                  />
                  {kindLabels[item]}
                </label>
              ))}
          </div>
        </fieldset>
      ) : null}

      {kind === "produit" ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm text-white/70">
            Logiciel
            <select
              name="productSlug"
              value={productSlug}
              onChange={(event) => setProductSlug(event.target.value)}
              className={`${field} h-12`}
              required
            >
              <option value="" className="bg-black">
                Choisir
              </option>
              {products.map((item) => (
                <option key={item.slug} value={item.slug} className="bg-black">
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm text-white/70">
            Quantité
            <input name="quantity" type="number" min={1} max={99} defaultValue={1} className={`${field} h-12`} />
          </label>
          {selected ? (
            <p className="text-sm text-white/50 sm:col-span-2">
              {selected.summary} Prix indicatif : à confirmer avec vous.
            </p>
          ) : null}
        </div>
      ) : (
        <input type="hidden" name="productSlug" value="" />
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm text-white/70">
          Nom
          <input name="name" required autoComplete="name" className={`${field} h-12`} placeholder="Votre nom" />
        </label>
        <label className="block text-sm text-white/70">
          Téléphone
          <input name="phone" required autoComplete="tel" className={`${field} h-12`} placeholder="05 xx xx xx xx" />
        </label>
      </div>

      <label className="block text-sm text-white/70">
        E-mail
        <input name="email" type="email" required autoComplete="email" className={`${field} h-12`} placeholder="vous@email.com" />
      </label>

      {mode === "commande" ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm text-white/70">
            Délai souhaité
            <select name="deadline" defaultValue="" className={`${field} h-12`}>
              <option value="" className="bg-black">
                Non précisé
              </option>
              {deadlines.map((item) => (
                <option key={item} value={item} className="bg-black">
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm text-white/70">
            Budget indicatif
            <select name="budget" defaultValue="" className={`${field} h-12`}>
              <option value="" className="bg-black">
                Non précisé
              </option>
              {budgets.map((item) => (
                <option key={item} value={item} className="bg-black">
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : (
        <>
          <input type="hidden" name="deadline" value="" />
          <input type="hidden" name="budget" value="" />
        </>
      )}

      <label className="block text-sm text-white/70">
        {mode === "contact" ? "Message" : "Votre besoin"}
        <textarea
          name="message"
          required
          minLength={20}
          rows={6}
          className={`${field} py-3`}
          placeholder={
            mode === "contact"
              ? "Décrivez votre question ou votre projet."
              : "Activité, ce que le site ou le logiciel doit faire, et ce qui compte pour vous."
          }
        />
      </label>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-white/40">
          Aucun paiement n’est demandé. Nous vous contactons pour confirmer la commande.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center justify-center bg-paper px-6 text-sm font-medium text-black transition-colors hover:bg-white disabled:opacity-60"
        >
          {pending ? "Envoi…" : mode === "contact" ? "Envoyer" : "Envoyer la commande"}
        </button>
      </div>
    </form>
  );
}
