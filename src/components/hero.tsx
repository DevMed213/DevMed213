"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui";

const line = ["Sites web", "Applications", "Logiciels sur mesure", "Logiciels prêts", "En ligne", "Noir & blanc"];

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl items-end gap-10 px-5 pb-14 pt-16 md:grid-cols-12 md:px-8 md:pb-20 md:pt-24">
        <div className="md:col-span-8">
          <motion.p {...rise(0)} className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">
            Studio de programmation · en ligne
          </motion.p>
          <motion.h1
            {...rise(0.08)}
            className="mt-6 font-display text-[clamp(3.15rem,8.2vw,6.7rem)] font-semibold leading-[0.88] tracking-[-0.05em]"
          >
            On construit
            <br />
            le logiciel
            <br />
            de votre activité
            <span className="blink text-white/80">_</span>
          </motion.h1>
          <motion.p {...rise(0.16)} className="mt-8 max-w-xl text-lg leading-relaxed text-white/68">
            Sites web, applications et logiciels sur mesure. Des logiciels prêts à installer. Vous passez commande ici, sans paiement en ligne : nous confirmons chaque demande avec vous.
          </motion.p>
          <motion.div {...rise(0.24)} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/commande">Passer commande</ButtonLink>
            <ButtonLink href="/logiciels" variant="ghost">
              Voir les logiciels
            </ButtonLink>
          </motion.div>
        </div>
        <motion.div {...rise(0.18)} className="md:col-span-4 md:justify-self-end">
          <Image
            src="/brand/mark-white.png"
            alt="Symbole DevMed"
            width={540}
            height={600}
            priority
            className="ml-auto w-[180px] md:w-[250px]"
          />
        </motion.div>
      </div>
      <div className="relative overflow-hidden border-t border-white/10 py-3">
        <div className="marquee-track flex w-max gap-8 pr-8">
          {[0, 1].map((copy) => (
            <p key={copy} className="flex gap-8 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
              {line.map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center gap-8">
                  {item}
                  <span aria-hidden>·</span>
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
