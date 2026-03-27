#!/bin/bash
# deploy.sh — Jokko Pro Africa Next.js
# Usage : bash deploy.sh

set -e

echo "🚀 Déploiement Jokko Next.js sur beta.jokko.africa"
echo "=================================================="

# Vérifications
echo "📋 Node.js : $(node -v)"
echo "📋 npm : $(npm -v)"

# PM2
if ! command -v pm2 &> /dev/null; then
  echo "📦 Installation PM2..."
  npm install -g pm2
fi
echo "📋 PM2 : $(pm2 -v)"

# Dossier de travail
SITE_DIR="/var/www/vhosts/beta.jokko.africa/nextjs"

if [ -d "$SITE_DIR" ]; then
  echo "🔄 Mise à jour du repo..."
  cd "$SITE_DIR"
  git pull
else
  echo "📥 Clonage du repo..."
  mkdir -p "$SITE_DIR"
  git clone https://github.com/jacobdariss/jksite.git "$SITE_DIR"
  cd "$SITE_DIR"
fi

# Variables d'environnement
if [ ! -f ".env.local" ]; then
  echo "⚙️  Création .env.local..."
  cat > .env.local << 'EOF'
NEXT_PUBLIC_CRISP_WEBSITE_ID=a2f90394-99bf-4142-95bb-bf350650f6f9
NEXT_PUBLIC_BASE_URL=https://beta.jokko.africa
EOF
fi

echo "📦 Installation des dépendances..."
npm install

echo "🔨 Build Next.js..."
npm run build

echo "🟢 Démarrage PM2..."
pm2 stop jokko-beta 2>/dev/null || true
pm2 start npm --name "jokko-beta" -- start
pm2 save

echo ""
echo "✅ Déployé ! Site disponible sur port 3000"
echo "👉 Configure le reverse proxy Plesk vers localhost:3000"
echo ""
pm2 status jokko-beta
