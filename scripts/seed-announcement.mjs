/**
 * JOKKO PRO AFRICA — Script de création collection Announcement
 * 
 * Ce script :
 * 1. Crée le schema de la collection Announcement dans Strapi
 * 2. Seed une première annonce de démonstration
 * 
 * Usage :
 *   export STRAPI_API_TOKEN=votre_token
 *   /opt/plesk/node/22/bin/node scripts/seed-announcement.mjs
 */

const STRAPI_URL   = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://api.jokko.africa'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

if (!STRAPI_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN manquant')
  process.exit(1)
}

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`,
}

async function strapiPost(path, data) {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(JSON.stringify(json))
  return json
}

async function strapiGet(path) {
  const res = await fetch(`${STRAPI_URL}/api${path}`, { headers })
  return res.json()
}

async function main() {
  console.log('🔍 Vérification de la collection Announcement...')

  // Vérifier si la collection existe déjà
  const check = await strapiGet('/announcements?pagination[limit]=1')

  if (check.error) {
    console.log('')
    console.log('❌ La collection "Announcement" n\'existe pas encore dans Strapi.')
    console.log('')
    console.log('📋 Crée-la manuellement dans Strapi Admin → Content-Type Builder :')
    console.log('')
    console.log('  Nom de la collection : Announcement')
    console.log('')
    console.log('  Champs à ajouter :')
    console.log('  ┌─────────────────┬──────────────┬──────────────────────────┐')
    console.log('  │ Nom             │ Type         │ Notes                    │')
    console.log('  ├─────────────────┼──────────────┼──────────────────────────┤')
    console.log('  │ title           │ Short text   │ Requis                   │')
    console.log('  │ message         │ Long text    │ Requis                   │')
    console.log('  │ cta_label       │ Short text   │ Optionnel                │')
    console.log('  │ cta_url         │ Short text   │ Optionnel                │')
    console.log('  │ active          │ Boolean      │ Défaut: false            │')
    console.log('  │ start_date      │ Datetime     │ Optionnel                │')
    console.log('  │ end_date        │ Datetime     │ Optionnel                │')
    console.log('  │ color           │ Short text   │ orange/navy/violet/green │')
    console.log('  │ show_once       │ Boolean      │ Défaut: true             │')
    console.log('  └─────────────────┴──────────────┴──────────────────────────┘')
    console.log('')
    console.log('  Puis activer les permissions Public → find (pas findOne)')
    console.log('  Puis relancer ce script pour seeder la première annonce.')
    process.exit(0)
  }

  console.log('✅ Collection Announcement trouvée')

  // Vérifier s'il y a déjà des entrées
  const existing = await strapiGet('/announcements?pagination[limit]=1')
  if (existing.data && existing.data.length > 0) {
    console.log(`ℹ️  ${existing.meta?.pagination?.total || 1} annonce(s) déjà présente(s) — pas de seed`)
    process.exit(0)
  }

  // Créer une annonce de démonstration
  console.log('📝 Création d\'une annonce de démonstration...')

  const now = new Date()
  const endDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // +7 jours

  const announcement = await strapiPost('/announcements', {
    data: {
      title: '🎉 Lancement officiel — Jokko Pro Africa',
      message: 'Premier Cloud 100% souverain du Sénégal. Profitez de nos offres de lancement dès 2 000 FCFA/mois.',
      cta_label: 'Découvrir les offres',
      cta_url: '/startup',
      active: true,
      start_date: now.toISOString(),
      end_date: endDate.toISOString(),
      color: 'orange',
      show_once: true,
    }
  })

  console.log('✅ Annonce créée — ID:', announcement.data?.id)
  console.log('')
  console.log('Tu peux maintenant gérer les annonces depuis :')
  console.log('  Strapi Admin → Content Manager → Announcement')
}

main().catch(err => {
  console.error('❌ Erreur:', err.message)
  process.exit(1)
})
