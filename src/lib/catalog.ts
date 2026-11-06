import type { Kind } from "@/lib/site";

export type Service = {
  id: string;
  kind: Kind;
  index: string;
  title: string;
  lead: string;
  text: string;
  points: string[];
};

export const services: Service[] = [
  {
    id: "sites-web",
    kind: "site",
    index: "01",
    title: "Sites web",
    lead: "Une présence nette, rapide, et faite pour être comprise.",
    text: "Vitrines, pages de lancement et boutiques. Nous structurons le contenu, le design et le formulaire de contact pour qu’un visiteur sache quoi faire.",
    points: [
      "Site vitrine et pages d’offre",
      "Boutique avec commande par formulaire",
      "Refonte d’un site existant",
      "Version mobile soignée",
    ],
  },
  {
    id: "applications",
    kind: "application",
    index: "02",
    title: "Applications",
    lead: "Un outil que vos clients ou vos équipes ouvrent vraiment.",
    text: "Applications web et mobiles : réservation, espace client, suivi d’activité, tableau de bord. Le parcours est simple, le reste reste en coulisse.",
    points: [
      "Application web",
      "Application mobile",
      "Espace client",
      "Tableau de bord",
    ],
  },
  {
    id: "logiciels",
    kind: "logiciel",
    index: "03",
    title: "Logiciels sur mesure",
    lead: "Le logiciel suit votre façon de travailler, pas l’inverse.",
    text: "Facturation, stock, suivi de dossiers, automatisation. Nous partons de vos étapes réelles, puis nous construisons l’outil qui les porte.",
    points: [
      "Outil métier",
      "Gestion interne",
      "Automatisation",
      "Reprise d’un outil existant",
    ],
  },
];

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  summary: string;
  description: string;
  includes: string[];
  forWhom: string;
  image: string;
  active: boolean;
};

export function formatPrice(value: number) {
  return `${new Intl.NumberFormat("fr-DZ").format(value)} DA`;
}
