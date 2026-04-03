#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# JOKKO PRO AFRICA — Création collection Announcement dans Strapi v5
# Usage : bash scripts/create-announcement-schema.sh
#
# Ce script :
# 1. Crée le dossier et schema.json de la collection Announcement
# 2. Crée les fichiers routes/controllers/services
# 3. Redémarre Strapi (via Plesk)
#
# À exécuter sur le serveur en SSH :
#   cd /var/www/vhosts/jokko.africa/api.jokko.africa/backend
#   bash /chemin/vers/create-announcement-schema.sh
# ═══════════════════════════════════════════════════════════════════

STRAPI_DIR="/var/www/vhosts/jokko.africa/api.jokko.africa/backend"
STRAPI_USER="jokko.africa_f45czx71qri"
STRAPI_GROUP="psaserv"
COLLECTION="announcement"

echo "🚀 Création de la collection Announcement dans Strapi v5..."

# ── 1. Créer les dossiers ─────────────────────────────────────────
mkdir -p "${STRAPI_DIR}/src/api/${COLLECTION}/content-types/${COLLECTION}"
mkdir -p "${STRAPI_DIR}/src/api/${COLLECTION}/controllers"
mkdir -p "${STRAPI_DIR}/src/api/${COLLECTION}/routes"
mkdir -p "${STRAPI_DIR}/src/api/${COLLECTION}/services"

echo "✅ Dossiers créés"

# ── 2. schema.json ────────────────────────────────────────────────
cat > "${STRAPI_DIR}/src/api/${COLLECTION}/content-types/${COLLECTION}/schema.json" << 'SCHEMA'
{
  "kind": "collectionType",
  "collectionName": "announcements",
  "info": {
    "singularName": "announcement",
    "pluralName": "announcements",
    "displayName": "Announcement",
    "description": "Annonces et promotions affichées en modal sur la homepage"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "message": {
      "type": "text",
      "required": true
    },
    "cta_label": {
      "type": "string"
    },
    "cta_url": {
      "type": "string"
    },
    "active": {
      "type": "boolean",
      "default": false
    },
    "start_date": {
      "type": "datetime"
    },
    "end_date": {
      "type": "datetime"
    },
    "color": {
      "type": "enumeration",
      "enum": ["orange", "navy", "violet", "green"],
      "default": "orange"
    },
    "show_once": {
      "type": "boolean",
      "default": true
    }
  }
}
SCHEMA

echo "✅ schema.json créé"

# ── 3. Controller ─────────────────────────────────────────────────
cat > "${STRAPI_DIR}/src/api/${COLLECTION}/controllers/${COLLECTION}.js" << 'CTRL'
'use strict';
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::announcement.announcement');
CTRL

echo "✅ controller créé"

# ── 4. Routes ─────────────────────────────────────────────────────
cat > "${STRAPI_DIR}/src/api/${COLLECTION}/routes/${COLLECTION}.js" << 'ROUTES'
'use strict';
const { createCoreRouter } = require('@strapi/strapi').factories;
module.exports = createCoreRouter('api::announcement.announcement');
ROUTES

echo "✅ routes créées"

# ── 5. Service ────────────────────────────────────────────────────
cat > "${STRAPI_DIR}/src/api/${COLLECTION}/services/${COLLECTION}.js" << 'SVC'
'use strict';
const { createCoreService } = require('@strapi/strapi').factories;
module.exports = createCoreService('api::announcement.announcement');
SVC

echo "✅ service créé"

# ── 6. Permissions (chown) ────────────────────────────────────────
chown -R "${STRAPI_USER}:${STRAPI_GROUP}" "${STRAPI_DIR}/src/api/${COLLECTION}"

echo "✅ Permissions appliquées"

# ── 7. Rebuild Strapi ─────────────────────────────────────────────
echo ""
echo "🔨 Rebuild Strapi..."
cd "${STRAPI_DIR}"
rm -rf .cache dist
export PATH="/opt/plesk/node/22/bin:$PATH"
npm run build 2>&1 | tail -5

echo ""
echo "✅ Collection Announcement créée avec succès !"
echo ""
echo "📋 Prochaines étapes :"
echo "  1. Plesk → api.jokko.africa → Node.js → Restart App"
echo "  2. Strapi Admin → Settings → Roles → Public → Announcement → cocher 'find'"
echo "  3. Strapi Admin → Content Manager → Announcement → créer une annonce"
