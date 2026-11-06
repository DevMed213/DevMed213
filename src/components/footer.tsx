import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-12 md:px-8">
        <div className="md:col-span-6">
          <Image
            src="/brand/logo-cropped.png"
            alt="DevMed — sites web, applications, logiciels"
            width={680}
            height={331}
            className="h-auto w-full max-w-sm invert"
          />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-black/55">
            Studio de programmation en ligne. Sites, applications et logiciels, conçus puis livrés après confirmation de votre commande.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/40">Pages</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-black/75 hover:text-black">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/commande" className="text-black/75 hover:text-black">
                Commander
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/40">Contact</p>
          <a href={`mailto:${site.email}`} className="mt-4 block text-sm text-black/75 hover:text-black">
            {site.email}
          </a>
          <p className="mt-3 text-sm text-black/45">Algérie · à distance</p>
          <Link href="/admin" className="mt-8 inline-block text-xs text-black/30 hover:text-black/70">
            Administration
          </Link>
        </div>
      </div>
      <div className="border-t border-black/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-black/35 md:flex-row md:justify-between md:px-8">
          <p>© 2026 {site.name}</p>
          <p>Pas de paiement en ligne. Chaque commande est confirmée avec vous.</p>
        </div>
      </div>
    </footer>
  );
}
