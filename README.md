# Jokko Pro Africa — Site Next.js 14

## Stack
- Next.js 14 (App Router)
- Tailwind CSS v3
- Hébergement : VPS Jokko (Plesk) + PM2

## Développement local

```bash
# 1. Cloner le repo
git clone https://github.com/jacobdariss/jksite.git
cd jksite

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.local.example .env.local
# Éditer .env.local avec ta clé Crisp

# 4. Lancer le serveur de dev
npm run dev
# → http://localhost:3000
```

## Déploiement sur Plesk (VPS Jokko)

### Prérequis sur le serveur
```bash
# Vérifier Node.js (>= 18)
node -v

# Installer PM2 globalement
npm install -g pm2
```

### Premier déploiement
```bash
# Sur le serveur, dans le dossier du site
cd /var/www/vhosts/jokko.africa/httpdocs

git clone https://github.com/jacobdariss/jksite.git .
npm install
cp .env.local.example .env.local
# Éditer .env.local

npm run build

# Démarrer avec PM2
pm2 start npm --name "jokko-web" -- start
pm2 save
pm2 startup
```

### Mise à jour (déploiement continu)
```bash
cd /var/www/vhosts/jokko.africa/httpdocs
git pull
npm install
npm run build
pm2 restart jokko-web
```

### Configuration Plesk (Reverse Proxy)
Dans Plesk > Domaine > Apache & Nginx :
```nginx
# Nginx — proxy vers Next.js port 3000
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

## Structure
```
app/              Pages (App Router)
components/       Composants réutilisables
content/blog/     Articles Markdown (.md / .mdx)
lib/              Utilitaires (blog reader, etc.)
public/           Assets statiques
```

## Ajouter un article de blog
Créer un fichier `content/blog/mon-article.md` :

```markdown
---
title: "Titre de l'article"
excerpt: "Description courte"
date: "2026-03-27"
category: "Cloud & Souveraineté"
author: "Équipe Jokko"
readTime: "5 min de lecture"
---

Contenu en Markdown...
```

## Variables d'environnement
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_CRISP_WEBSITE_ID` | ID du widget Crisp Chat |
| `NEXT_PUBLIC_BASE_URL` | URL de base du site |
