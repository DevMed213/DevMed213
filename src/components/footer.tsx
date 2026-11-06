import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-12 md:px-8">
        <div className="md:col-span-6">
          <Image
            src="/brand/logo-cropped.png"
            alt="DevMed — sites web, applications, logiciels"
            width={680}
            height={331}
            className="h-auto w-full max-w-sm"
          />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">
            Studio de programmation en ligne. Sites, applications et logiciels, conçus puis livrés après confirmation de votre commande.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">Pages</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/75 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/commande" className="text-white/75 hover:text-white">
                Commander
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">Contact</p>
          <a href={`mailto:${site.email}`} className="mt-4 block text-sm text-white/75 hover:text-white">
            {site.email}
          </a>
          <p className="mt-3 text-sm text-white/45">Algérie · à distance</p>
          <Link href="/admin" className="mt-8 inline-block text-xs text-white/30 hover:text-white/70">
            Espace commandes
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-white/35 md:flex-row md:justify-between md:px-8">
          <p>© 2026 {site.name}</p>
          <p>Pas de paiement en ligne. Chaque commande est confirmée avec vous.</p>
        </div>
      </div>
    </footer>
  );
}
