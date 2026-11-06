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
};

export const products: Product[] = [
  {
    slug: "vitrine-pro",
    name: "Vitrine Pro",
    category: "Site",
    price: 45000,
    summary: "Site vitrine prêt : pages, formulaire et mise en page mobile.",
    description:
      "Une base de site pour présenter une activité, des services et un moyen de contact. Nous remplaçons les textes, les images et les couleurs, puis nous mettons le site en ligne.",
    includes: [
      "Pages accueil, offre, à propos et contact",
      "Formulaire de contact",
      "Adaptation mobile",
      "Mise en ligne accompagnée",
    ],
    forWhom: "Commerce, cabinet, artisan ou activité qui a besoin d’une présence claire.",
  },
  {
    slug: "boutique-express",
    name: "Boutique Express",
    category: "Site",
    price: 90000,
    summary: "Catalogue en ligne et commandes reçues sans paiement intégré.",
    description:
      "Vos produits sont présentés avec photo, prix et fiche. Le client compose sa commande. Vous la recevez et vous confirmez le paiement et la livraison de votre côté.",
    includes: [
      "Catalogue de produits",
      "Fiches produit",
      "Panier et envoi de commande",
      "Espace simple pour mettre à jour les produits",
    ],
    forWhom: "Vendeur qui veut prendre des commandes en ligne sans ouvrir un compte de paiement tout de suite.",
  },
  {
    slug: "resa",
    name: "Résa",
    category: "Logiciel",
    price: 65000,
    summary: "Prise de rendez-vous en ligne, avec créneaux et confirmations.",
    description:
      "Vos clients choisissent un créneau. Vous voyez l’agenda, vous confirmez, et le rendez-vous est noté. Les rappels partent par e-mail.",
    includes: [
      "Page de réservation",
      "Créneaux selon vos horaires",
      "Liste des rendez-vous",
      "E-mail de confirmation",
    ],
    forWhom: "Cabinet, salon, coach ou toute activité sur rendez-vous.",
  },
  {
    slug: "facture-atelier",
    name: "Facture Atelier",
    category: "Logiciel",
    price: 40000,
    summary: "Devis et factures, clients et numérotation, export PDF.",
    description:
      "Un logiciel léger pour établir un devis, le transformer en facture et garder l’historique des clients. Les documents sortent en PDF, prêts à envoyer.",
    includes: [
      "Fiches clients",
      "Devis et factures",
      "Numérotation",
      "Export PDF",
    ],
    forWhom: "Indépendant ou petite structure qui facture régulièrement.",
  },
  {
    slug: "stock-leger",
    name: "Stock Léger",
    category: "Logiciel",
    price: 55000,
    summary: "Produits, entrées, sorties et seuil d’alerte.",
    description:
      "Vous suivez ce qui entre et ce qui sort, sans un gros logiciel de gestion. Une alerte signale les articles qui passent sous le seuil que vous fixez.",
    includes: [
      "Fiches articles",
      "Mouvements de stock",
      "Seuil d’alerte",
      "Recherche rapide",
    ],
    forWhom: "Boutique, atelier ou dépôt avec un catalogue encore maîtrisable à la main.",
  },
  {
    slug: "crm-atelier",
    name: "CRM Atelier",
    category: "Logiciel",
    price: 75000,
    summary: "Suivi des clients, des échanges et des relances.",
    description:
      "Chaque client a une fiche : coordonnées, demandes, statut et prochaine action. L’objectif est de ne plus perdre un suivi dans les messages.",
    includes: [
      "Fiches clients",
      "Historique des échanges",
      "Statuts de suivi",
      "Relances à faire",
    ],
    forWhom: "Équipe commerciale légère ou activité qui suit des dossiers dans la durée.",
  },
];

export function formatPrice(value: number) {
  return `${new Intl.NumberFormat("fr-DZ").format(value)} DA`;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
