# Strapi — Champs manquants à ajouter avant le seed

## 1. Ajouter les champs à la collection `Offer`

Dans Strapi Admin → Content-Type Builder → Offer → Add another field :

| Champ     | Type          | Config                          |
|-----------|---------------|---------------------------------|
| ressources | JSON         | Optionnel                       |
| sla        | Text (Short)  | Optionnel                       |
| addons     | JSON          | Optionnel                       |

Sauvegarder → Strapi redémarre automatiquement.

## 2. Vérifier les permissions (déjà fait normalement)

Strapi Admin → Settings → Users & Permissions → Roles → Public :
- Offer : find ✓, findOne ✓
- Segment : find ✓, findOne ✓
- Partner : find ✓, findOne ✓

## 3. Lancer le seed

Sur le serveur dans `/var/www/vhosts/jokko.africa/beta.jokko.africa/` :

```bash
# Copier le script
cp scripts/seed-strapi.mjs /tmp/

# Lancer avec Node 22
PATH=/opt/plesk/node/22/bin:$PATH node /tmp/seed-strapi.mjs
```

Ou directement depuis le repo :
```bash
cd /var/www/vhosts/jokko.africa/beta.jokko.africa
PATH=/opt/plesk/node/22/bin:$PATH node scripts/seed-strapi.mjs
```

## 4. Variables d'environnement requises dans .env.local

```
NEXT_PUBLIC_STRAPI_URL=https://api.jokko.africa
STRAPI_API_TOKEN=<votre-token-full-access>
```
