/**
 * JOKKO PRO AFRICA — Script de seed Strapi
 * Usage : node scripts/seed-strapi.mjs
 * Requires: STRAPI_URL et STRAPI_TOKEN dans .env.local
 *
 * Ce script :
 * 1. Crée les 3 segments (startup, entreprise, institution) si absents
 * 2. Crée/met à jour les 9 offres principales avec toutes les données
 *
 * Prérequis Strapi : champs ressources (JSON), sla (text), addons (JSON)
 * doivent être ajoutés à la collection Offer (voir README ci-dessous).
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))

// --- Charger .env.local manuellement (pas de dotenv requis)
function loadEnv() {
  try {
    const envPath = resolve(__dir, '../.env.local')
    const lines = readFileSync(envPath, 'utf-8').split('\n')
    for (const line of lines) {
      const m = line.match(/^([^#=]+)=(.*)$/)
      if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '')
    }
  } catch {
    // pas de .env.local — utiliser les variables d'environnement existantes
  }
}

loadEnv()

const BASE = (process.env.NEXT_PUBLIC_STRAPI_URL || 'https://api.jokko.africa') + '/api'
const TOKEN = process.env.STRAPI_API_TOKEN

if (!TOKEN) {
  console.error('❌  STRAPI_API_TOKEN manquant dans .env.local')
  process.exit(1)
}

const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function api(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: HEADERS,
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json()
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status} : ${JSON.stringify(json?.error)}`)
  }
  return json
}

async function findOrCreate(collection, findQuery, createData) {
  const existing = await api('GET', `/${collection}?${findQuery}`)
  if (existing.data?.length > 0) {
    console.log(`  ↩  ${collection} existe déjà : "${createData.data?.name || createData.data?.slug}"`)
    return existing.data[0].id
  }
  const created = await api('POST', `/${collection}`, createData)
  console.log(`  ✓  ${collection} créé : "${createData.data?.name || createData.data?.slug}"`)
  return created.data.id
}

async function upsertOffer(offer, segmentId) {
  const existing = await api('GET', `/offers?filters[slug][$eq]=${offer.slug}`)
  const payload = {
    data: {
      ...offer,
      segment: segmentId,
    },
  }
  if (existing.data?.length > 0) {
    const id = existing.data[0].id
    await api('PUT', `/offers/${id}`, payload)
    console.log(`  ↩  Offre mise à jour : ${offer.name}`)
  } else {
    await api('POST', `/offers`, payload)
    console.log(`  ✓  Offre créée : ${offer.name}`)
  }
}

// ─── Données des offres ───────────────────────────────────────────────────────

const SEGMENTS = [
  { name: 'Startup', slug: 'startup' },
  { name: 'Entreprise', slug: 'entreprise' },
  { name: 'Institution', slug: 'institution' },
]

const OFFRES = {
  startup: [
    {
      name: 'Racine',
      slug: 'racine',
      subtitle: 'Votre premier site, zéro stress',
      description: "Vous lancez votre présence en ligne. On s'assure que ça tourne, dès le premier jour. Vous n'avez pas à comprendre la technique. Vous avez juste à publier.",
      target: 'Créateur qui se lance, association qui démarre, premier site vitrine.',
      priceAmount: 2000,
      priceUnit: 'FCFA',
      pricePeriod: 'Engagement annuel — 24 000 FCFA/an',
      billingOptions: { mensuel: 2000, annuel: 2000 },
      features: [
        'Hébergement fiable avec support local',
        'Certificat SSL inclus',
        'Activation en moins de 24h',
        'Accompagnement au démarrage',
        'Évolution vers Sahara puis Baobab sans migration',
      ],
      ressources: ['1 vCPU', '1 Go RAM', '10 Go SSD', '100 Go trafic'],
      sla: '99,5% | Support email J+1 | Incident 24h ouvrées',
      addons: [
        { nom: 'Papyrus (webmail simple)', prix: '750 FCFA/utilisateur/mois' },
        { nom: 'Oasis Backup', prix: '2 000 FCFA/mois' },
        { nom: 'Onboarding Accompagné', prix: '25 000 FCFA (forfait unique)' },
      ],
      badge: null,
      popular: false,
      order: 1,
    },
    {
      name: 'Sahara',
      slug: 'sahara',
      subtitle: 'WordPress optimisé, trafic garanti',
      description: 'Vous créez du contenu ou vendez en ligne. On optimise votre WordPress pour que vos visiteurs restent. WordPress prêt, rapide, sécurisé — vous publiez, on gère le moteur.',
      target: 'Blogueur, média, boutique WooCommerce, créateur de contenu.',
      priceAmount: 4000,
      priceUnit: 'FCFA',
      pricePeriod: 'Semestriel : 24 000 FCFA · Annuel : 48 000 FCFA/an',
      billingOptions: { mensuel: 4000, annuel: 4000 },
      features: [
        'WordPress préinstallé et optimisé',
        'Cache LiteSpeed + CDN Afrique',
        'SEO technique intégré',
        'Évolution vers Baobab sans migration',
      ],
      ressources: ['1 vCPU', '2 Go RAM', '20 Go NVMe', '200 Go trafic'],
      sla: '99,5% | Support email J+1 | Incident 24h ouvrées',
      addons: [
        { nom: 'Tam-Tam (email pro)', prix: '1 000 FCFA/utilisateur/mois' },
        { nom: 'Oasis Backup', prix: '2 000 FCFA/mois' },
        { nom: 'Onboarding Accompagné', prix: '25 000 FCFA (forfait unique)' },
      ],
      badge: 'Populaire',
      popular: true,
      order: 2,
    },
    {
      name: 'Téranga',
      slug: 'teranga',
      subtitle: 'Le cloud solidaire — ONG & Associations',
      description: 'Vous avez une mission sociale. On protège votre présence numérique pour que vous puissiez vous concentrer sur votre impact. Multi-sites, tarif solidaire, support dédié au monde associatif.',
      target: 'ONG, association, collectif, structure ESS.',
      priceAmount: 5000,
      priceUnit: 'FCFA',
      pricePeriod: 'Engagement annuel — 60 000 FCFA/an',
      billingOptions: { mensuel: 5000, annuel: 5000 },
      features: [
        "Multi-sites (jusqu'à 3 projets)",
        'Backups hebdomadaires',
        'Support dédié ONG/ESS',
        'Tarif solidaire',
      ],
      ressources: ['2 vCPU', '2 Go RAM', '30 Go SSD', '300 Go trafic'],
      sla: '99,5% | Support email J+1 | Incident 24h ouvrées',
      addons: [
        { nom: 'Papyrus (webmail simple)', prix: '750 FCFA/utilisateur/mois' },
        { nom: 'Oasis Backup', prix: '2 000 FCFA/mois' },
        { nom: 'Griot SMS', prix: '10 FCFA/SMS (remise dès 5 000 SMS)' },
      ],
      badge: 'Solidaire',
      popular: false,
      order: 3,
    },
  ],

  entreprise: [
    {
      name: 'Baobab',
      slug: 'baobab',
      subtitle: "L'hébergement pro souverain",
      description: "Votre entreprise mérite un hébergement à la hauteur de ses ambitions. Souverain, fiable, local. Domaine .SN inclus. Backups quotidiens. Un vrai partenaire, pas un ticket de support.",
      target: 'PME établie, agence, e-commerce en production.',
      priceAmount: 12500,
      priceUnit: 'FCFA',
      pricePeriod: 'Trim. : 37 500 FCFA · Sem. : 75 000 FCFA · Annuel : 150 000 FCFA',
      billingOptions: { mensuel: 12500, annuel: 12500 },
      features: [
        'Hébergement pro 100% Sénégal',
        'Domaine .SN inclus',
        'Backups quotidiens',
        'SLA contractuel',
        'Évolution fluide vers Savane',
      ],
      ressources: ['2 vCPU dédiés', '4 Go RAM', '40 Go NVMe', '500 Go trafic'],
      sla: '99,9% | Email+Tél 8h/5j | Incident 4h ouvrées | SLA contractuel',
      addons: [
        { nom: 'Tam-Tam (email pro)', prix: '1 000 FCFA/utilisateur/mois' },
        { nom: 'Oasis Backup', prix: '5 000 FCFA/mois' },
        { nom: 'Priorité (support < 2h)', prix: '25 000 FCFA/mois' },
        { nom: 'Onboarding Accompagné', prix: '50 000 FCFA (forfait unique)' },
      ],
      badge: null,
      popular: false,
      order: 1,
    },
    {
      name: 'Fondation',
      slug: 'fondation',
      subtitle: 'Vos applications métier, zéro gestion infra',
      description: "Vous déployez vos apps. On gère tout ce qu'il y a en dessous. Vous ne touchez jamais un serveur. Alternative locale à Heroku et Render. Multi-stacks, Git, SSL, backups. Tout est managé.",
      target: 'Startup SaaS, PME avec app métier, agence qui développe pour ses clients.',
      priceAmount: 25000,
      priceUnit: 'FCFA',
      pricePeriod: 'Mensuel : 25 000 FCFA · Annuel : 20 000 FCFA/mois (-20%) = 240 000 FCFA/an',
      billingOptions: { mensuel: 25000, annuel: 20000 },
      features: [
        'PaaS managé multi-stacks (Node, Python, PHP, Java)',
        'Déploiement Git intégré',
        'Backups quotidiens + SSL',
        'SLA contractuel',
      ],
      ressources: ['2 vCPU dédiés', '4 Go RAM', '50 Go NVMe', '500 Go trafic'],
      sla: '99,9% | Email+Tél 8h/5j | Incident 4h ouvrées | SLA contractuel',
      addons: [
        { nom: 'Oasis Backup', prix: '5 000 FCFA/mois' },
        { nom: 'PRA Essentiel', prix: '15 000 FCFA/mois' },
        { nom: 'Priorité (support < 2h)', prix: '25 000 FCFA/mois' },
        { nom: 'Onboarding Accompagné', prix: '50 000 FCFA (forfait unique)' },
      ],
      badge: 'Populaire',
      popular: true,
      order: 2,
    },
    {
      name: 'Savane',
      slug: 'savane',
      subtitle: 'Votre cloud privé, votre contrôle',
      description: 'Vous grandissez vite. Votre infra doit suivre le rythme sans que vous gériez la complexité. Cloud privé isolé, scalable à la demande, avec un référent technique dédié.',
      target: 'PME en forte croissance, startup à traction, plateforme à fort trafic.',
      priceAmount: 35000,
      priceUnit: 'FCFA',
      pricePeriod: 'Mensuel : 35 000 FCFA · Annuel : 28 000 FCFA/mois (-20%) = 336 000 FCFA/an',
      billingOptions: { mensuel: 35000, annuel: 28000 },
      features: [
        'Cloud privé isolé (VPC dédié)',
        'Firewall dédié + snapshots',
        'Scalable à la demande',
        'Support prioritaire + référent',
      ],
      ressources: ['4 vCPU dédiés', '8 Go RAM', '100 Go NVMe', '1 To trafic'],
      sla: '99,9% | Email+Tél 8h/5j | Incident 4h ouvrées | SLA contractuel',
      addons: [
        { nom: 'PRA Essentiel', prix: '15 000 FCFA/mois' },
        { nom: 'Référent Dédié', prix: '25 000 FCFA/mois' },
        { nom: 'Astreinte 24/7', prix: '35 000 FCFA/mois' },
        { nom: 'Revue Stratégique', prix: '15 000 FCFA/mois' },
      ],
      badge: null,
      popular: false,
      order: 3,
    },
  ],

  institution: [
    {
      name: 'Héritage',
      slug: 'heritage',
      subtitle: 'Archivage souverain certifié',
      description: 'Vos données restent au Sénégal. Chiffrées, répliquées, conformes. Point final. Rapports d\'audit trimestriels fournis. Vous dormez tranquille.',
      target: "Institution publique, banque, entreprise soumise à des obligations légales de conservation.",
      priceAmount: 25000,
      priceUnit: 'FCFA',
      pricePeriod: 'Engagement annuel — 300 000 FCFA/an',
      billingOptions: { mensuel: 25000, annuel: 25000 },
      features: [
        'Chiffrement AES-256 bout en bout',
        'Réplication multi-site Sénégal',
        'Conformité APDP',
        "Rapports d'audit trimestriels",
      ],
      ressources: ['500 Go chiffré', 'Rétention 12 mois', 'Réplication auto'],
      sla: '99,95% | Support 24/7 dédié | Incident < 1h | SLA + pénalités',
      addons: [
        { nom: 'Priorité, Référent Dédié, Astreinte 24/7, Revue Stratégique', prix: 'Inclus' },
        { nom: 'Conformité APDP (audit complet)', prix: 'Sur devis' },
        { nom: 'Onboarding Accompagné', prix: 'Sur devis' },
      ],
      badge: null,
      popular: false,
      order: 1,
    },
    {
      name: 'Forteresse',
      slug: 'forteresse',
      subtitle: 'Plan de reprise certifié',
      description: "Votre système ne peut pas s'arrêter. On s'en porte garant, par contrat. PRA testé deux fois par an. RTO < 4h. Monitoring 24/7. Référent dédié nommé.",
      target: "Système critique, infrastructure étatique, plateforme bancaire.",
      priceAmount: 45000,
      priceUnit: 'FCFA',
      pricePeriod: 'Engagement annuel — 540 000 FCFA/an',
      billingOptions: { mensuel: 45000, annuel: 45000 },
      features: [
        'PRA documenté et testé semestriellement',
        'RTO < 4h / RPO < 1h',
        'Basculement automatique',
        'Monitoring 24/7 + référent dédié',
      ],
      ressources: ['PRA complet', 'Monitoring IA', 'Tests bi-annuels'],
      sla: '99,95% | Support 24/7 dédié | Incident < 1h | SLA + pénalités',
      addons: [
        { nom: 'Priorité, Référent Dédié, Astreinte 24/7, Revue Stratégique', prix: 'Inclus' },
        { nom: 'Bouclier Zero Trust', prix: 'Sur devis' },
        { nom: 'Sentinelle Monitoring', prix: 'Inclus' },
      ],
      badge: 'Recommandé',
      popular: true,
      order: 2,
    },
    {
      name: 'Kilimandjaro',
      slug: 'kilimandjaro',
      subtitle: 'Puissance bare metal, zéro compromis',
      description: "Vous exigez le maximum. Un serveur physique dédié, une disponibilité totale, un engagement sans faille. La puissance d'un datacenter dédié avec le support Jokko 24/7 et des SLA à pénalités.",
      target: "Banque, opérateur télécom, hébergeur, institution critique.",
      priceAmount: 85000,
      priceUnit: 'FCFA',
      pricePeriod: 'Facturation mensuelle — Configurations sur mesure sur devis',
      billingOptions: { mensuel: 85000, annuel: 85000 },
      features: [
        'Serveur physique dédié HA',
        'VDC inclus',
        'Support 24/7 prioritaire',
        'SLA contractuel avec pénalités',
      ],
      ressources: ['8 CPU physiques', '32 Go ECC', '500 Go NVMe RAID', '5 To trafic'],
      sla: '99,95% | Support 24/7 dédié | Incident < 1h | SLA + pénalités',
      addons: [
        { nom: 'Priorité, Référent Dédié, Astreinte 24/7, Revue Stratégique', prix: 'Inclus' },
        { nom: 'Bouclier Zero Trust', prix: 'Sur devis' },
        { nom: 'Conformité APDP', prix: 'Sur devis' },
      ],
      badge: null,
      popular: false,
      order: 3,
    },
  ],
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🚀  Seed Strapi → ${BASE}\n`)

  // 1. Créer les segments
  console.log('📂  Segments...')
  const segmentIds = {}
  for (const seg of SEGMENTS) {
    const id = await findOrCreate(
      'segments',
      `filters[slug][$eq]=${seg.slug}`,
      { data: { name: seg.name, slug: seg.slug } }
    )
    segmentIds[seg.slug] = id
  }

  // 2. Créer les offres
  for (const [segSlug, offres] of Object.entries(OFFRES)) {
    console.log(`\n💼  Offres ${segSlug}...`)
    const segId = segmentIds[segSlug]
    for (const offre of offres) {
      await upsertOffer(offre, segId)
    }
  }

  console.log('\n✅  Seed terminé avec succès !\n')
}

main().catch(err => {
  console.error('\n❌  Erreur :', err.message)
  process.exit(1)
})
