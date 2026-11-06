"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[4.5rem] md:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={site.name}>
          <Image src="/brand/mark-white.png" alt="" width={36} height={40} className="h-9 w-auto" />
          <span className="font-display text-lg font-semibold tracking-tight">
            DevMed<span className="text-white/45">213</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm transition-colors ${active ? "text-white" : "text-white/55 hover:text-white"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/commande"
            className="hidden h-10 items-center bg-paper px-4 text-sm font-medium text-black transition-colors hover:bg-white md:inline-flex"
          >
            Passer commande
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-white/20 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex w-4 flex-col gap-1.5">
              <span className={`h-px bg-white transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px bg-white transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-black md:hidden">
          <nav className="flex flex-col px-5 py-4" aria-label="Navigation mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 text-lg"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/commande"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex h-12 items-center justify-center bg-paper text-sm font-medium text-black"
            >
              Passer commande
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
