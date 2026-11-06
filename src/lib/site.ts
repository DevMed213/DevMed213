export const site = {
  name: "DevMed213",
  email: "contact@devmed213.com",
  tagline: "Sites web · Applications · Logiciels",
  description:
    "DevMed213 conçoit des sites web, des applications et des logiciels sur mesure, et propose des logiciels prêts à mettre en place. Commande en ligne, sans paiement sur le site.",
};

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/logiciels", label: "Logiciels" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
] as const;

export const kinds = ["site", "application", "logiciel", "produit", "contact"] as const;
export type Kind = (typeof kinds)[number];

export const kindLabels: Record<Kind, string> = {
  site: "Site web",
  application: "Application",
  logiciel: "Logiciel sur mesure",
  produit: "Logiciel prêt",
  contact: "Question",
};

export const budgets = [
  "Moins de 50 000 DA",
  "50 000 – 150 000 DA",
  "150 000 – 400 000 DA",
  "Plus de 400 000 DA",
  "À définir ensemble",
] as const;

export const deadlines = [
  "Dès que possible",
  "Sous 2 semaines",
  "Sous 1 mois",
  "Sous 3 mois",
  "Pas de date fixe",
] as const;

export const steps = [
  {
    n: "01",
    title: "Commande",
    text: "Vous décrivez le site, l’application ou le logiciel. Aucun paiement n’est demandé à cette étape.",
  },
  {
    n: "02",
    title: "Échange",
    text: "Nous revenons vers vous pour préciser le besoin, le délai et le prix.",
  },
  {
    n: "03",
    title: "Conception",
    text: "Structure, écrans et fonctionnement sont posés avant d’écrire le code.",
  },
  {
    n: "04",
    title: "Réalisation",
    text: "Développement, ajustements et tests, avec des points d’étape clairs.",
  },
  {
    n: "05",
    title: "Livraison",
    text: "Mise en ligne ou installation, puis un suivi pour que l’outil serve vraiment.",
  },
] as const;

export const faqs = [
  {
    q: "Peut-on payer sur le site ?",
    a: "Non. Le site sert à passer commande. Nous confirmons le périmètre et les modalités de paiement directement avec vous.",
  },
  {
    q: "Que se passe-t-il après une commande ?",
    a: "Vous recevez une référence. Nous vous contactons par e-mail ou téléphone pour valider la demande avant de lancer le travail.",
  },
  {
    q: "Les logiciels prêts sont-ils modifiables ?",
    a: "Oui. Chaque logiciel du catalogue est une base prête. Nous l’installons et l’ajustons à votre activité.",
  },
  {
    q: "Travaillez-vous seulement en Algérie ?",
    a: "Le studio est en ligne. Nous travaillons avec des clients en Algérie et ailleurs, à distance.",
  },
  {
    q: "Combien de temps faut-il ?",
    a: "Un site vitrine simple se compte souvent en semaines. Une application ou un logiciel métier dépend du périmètre, fixé ensemble après la commande.",
  },
] as const;
