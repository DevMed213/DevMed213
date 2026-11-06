# DevMed213

Site vitrine du studio : services, catalogue de logiciels prêts, et commandes sans paiement en ligne.

```bash
npm run dev
```

Le site s’ouvre sur [http://localhost:3000](http://localhost:3000).

## Modifier le contenu

- Coordonnées, textes de méthode et FAQ : `src/lib/site.ts`
- Services : `src/lib/catalog.ts`
- Logiciels du catalogue : panneau `/admin`, enregistrés dans `data/products.json`
- E-mail affiché : `site.email` dans `src/lib/site.ts`

Les six logiciels du catalogue sont des exemples. Remplacez-les par vos vrais produits.

## Commandes

Chaque commande est enregistrée dans `data/orders.json`.

L’espace interne est sur `/admin` : commandes reçues et gestion des logiciels. Identifiants dans `.env.local` (`ADMIN_USER` et `ADMIN_PASSWORD`).

Sur un hébergement éphémère, le fichier des commandes peut ne pas être conservé. Dans ce cas, renseignez `ORDER_WEBHOOK_URL` pour recevoir chaque commande en JSON.
