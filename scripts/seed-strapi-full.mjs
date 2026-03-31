/**
 * JOKKO PRO AFRICA — Seed Strapi complet
 * Collections : Segment, Offer, Testimonial, Partner, BlogPost
 * Usage : node scripts/seed-strapi-full.mjs
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))

function loadEnv() {
  try {
    const lines = readFileSync(resolve(__dir, '../.env.local'), 'utf-8').split('\n')
    for (const line of lines) {
      const m = line.match(/^([^#=]+)=(.*)$/)
      if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '')
    }
  } catch {}
}
loadEnv()

const BASE = (process.env.NEXT_PUBLIC_STRAPI_URL || 'https://api.jokko.africa') + '/api'
const TOKEN = process.env.STRAPI_API_TOKEN

if (!TOKEN) { console.error('❌ STRAPI_API_TOKEN manquant'); process.exit(1) }

const H = { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` }

async function api(method, path, body) {
  const res = await fetch(`${BASE}${path}`, { method, headers: H, body: body ? JSON.stringify(body) : undefined })
  const json = await res.json()
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${JSON.stringify(json?.error)}`)
  return json
}

async function upsert(collection, filterKey, filterVal, data) {
  const existing = await api('GET', `/${collection}?filters[${filterKey}][$eq]=${encodeURIComponent(filterVal)}`)
  if (existing.data?.length > 0) {
    await api('PUT', `/${collection}/${existing.data[0].id}`, { data })
    console.log(`  ↩  ${collection} mis à jour : ${filterVal}`)
    return existing.data[0].id
  }
  const created = await api('POST', `/${collection}`, { data })
  console.log(`  ✓  ${collection} créé : ${filterVal}`)
  return created.data.id
}

// ─── SEGMENTS ────────────────────────────────────────────────────────────────
const SEGMENTS = [
  { name: 'Startup', slug: 'startup' },
  { name: 'Entreprise', slug: 'entreprise' },
  { name: 'Institution', slug: 'institution' },
]

// ─── OFFRES ──────────────────────────────────────────────────────────────────
const OFFRES = {
  startup: [
    {
      name: 'Racine', slug: 'racine', subtitle: 'Votre premier site, zéro stress',
      description: "Vous lancez votre présence en ligne. On s'assure que ça tourne, dès le premier jour.",
      target: 'Créateur qui se lance, association qui démarre, premier site vitrine.',
      priceAmount: 2000, priceUnit: 'FCFA', pricePeriod: 'Engagement annuel — 24 000 FCFA/an',
      billingOptions: { mensuel: 2000, annuel: 2000 },
      features: ['Hébergement fiable avec support local', 'Certificat SSL inclus', 'Activation en moins de 24h', 'Accompagnement au démarrage'],
      ressources: ['1 vCPU', '1 Go RAM', '10 Go SSD', '100 Go trafic'],
      sla: '99,5% | Support email J+1 | Incident 24h ouvrées',
      addons: [{ nom: 'Papyrus (webmail)', prix: '750 FCFA/user/mois' }, { nom: 'Oasis Backup', prix: '2 000 FCFA/mois' }],
      badge: null, popular: false, order: 1,
    },
    {
      name: 'Sahara', slug: 'sahara', subtitle: 'WordPress optimisé, trafic garanti',
      description: 'Vous créez du contenu ou vendez en ligne. On optimise votre WordPress pour que vos visiteurs restent.',
      target: 'Blogueur, média, boutique WooCommerce, créateur de contenu.',
      priceAmount: 4000, priceUnit: 'FCFA', pricePeriod: 'Semestriel : 24 000 FCFA · Annuel : 48 000 FCFA/an',
      billingOptions: { mensuel: 4000, annuel: 4000 },
      features: ['WordPress préinstallé et optimisé', 'Cache LiteSpeed + CDN Afrique', 'SEO technique intégré', 'Évolution vers Baobab sans migration'],
      ressources: ['1 vCPU', '2 Go RAM', '20 Go NVMe', '200 Go trafic'],
      sla: '99,5% | Support email J+1 | Incident 24h ouvrées',
      addons: [{ nom: 'Tam-Tam (email pro)', prix: '1 000 FCFA/user/mois' }, { nom: 'Oasis Backup', prix: '2 000 FCFA/mois' }],
      badge: 'Populaire', popular: true, order: 2,
    },
    {
      name: 'Téranga', slug: 'teranga', subtitle: 'Le cloud solidaire — ONG & Associations',
      description: "Vous avez une mission sociale. On protège votre présence numérique pour que vous puissiez vous concentrer sur votre impact.",
      target: 'ONG, association, collectif, structure ESS.',
      priceAmount: 5000, priceUnit: 'FCFA', pricePeriod: 'Engagement annuel — 60 000 FCFA/an',
      billingOptions: { mensuel: 5000, annuel: 5000 },
      features: ["Multi-sites (jusqu'à 3 projets)", 'Backups hebdomadaires', 'Support dédié ONG/ESS', 'Tarif solidaire'],
      ressources: ['2 vCPU', '2 Go RAM', '30 Go SSD', '300 Go trafic'],
      sla: '99,5% | Support email J+1 | Incident 24h ouvrées',
      addons: [{ nom: 'Papyrus (webmail)', prix: '750 FCFA/user/mois' }, { nom: 'Griot SMS', prix: '10 FCFA/SMS' }],
      badge: 'Solidaire', popular: false, order: 3,
    },
  ],
  entreprise: [
    {
      name: 'Baobab', slug: 'baobab', subtitle: "L'hébergement pro souverain",
      description: "Votre entreprise mérite un hébergement à la hauteur de ses ambitions. Souverain, fiable, local.",
      target: 'PME établie, agence, e-commerce en production.',
      priceAmount: 12500, priceUnit: 'FCFA', pricePeriod: 'Trim. : 37 500 FCFA · Sem. : 75 000 FCFA · Annuel : 150 000 FCFA',
      billingOptions: { mensuel: 12500, annuel: 12500 },
      features: ['Hébergement pro 100% Sénégal', 'Domaine .SN inclus', 'Backups quotidiens', 'SLA contractuel', 'Évolution fluide vers Savane'],
      ressources: ['2 vCPU dédiés', '4 Go RAM', '40 Go NVMe', '500 Go trafic'],
      sla: '99,9% | Email+Tél 8h/5j | Incident 4h ouvrées | SLA contractuel',
      addons: [{ nom: 'Tam-Tam', prix: '1 000 FCFA/user/mois' }, { nom: 'Priorité support', prix: '25 000 FCFA/mois' }],
      badge: null, popular: false, order: 1,
    },
    {
      name: 'Fondation', slug: 'fondation', subtitle: 'Vos applications métier, zéro gestion infra',
      description: "Vous déployez vos apps. On gère tout ce qu'il y a en dessous. Vous ne touchez jamais un serveur.",
      target: 'Startup SaaS, PME avec app métier, agence de développement.',
      priceAmount: 25000, priceUnit: 'FCFA', pricePeriod: 'Mensuel : 25 000 FCFA · Annuel : 20 000 FCFA/mois (-20%)',
      billingOptions: { mensuel: 25000, annuel: 20000 },
      features: ['PaaS managé multi-stacks (Node, Python, PHP, Java)', 'Déploiement Git intégré', 'Backups quotidiens + SSL', 'SLA contractuel'],
      ressources: ['2 vCPU dédiés', '4 Go RAM', '50 Go NVMe', '500 Go trafic'],
      sla: '99,9% | Email+Tél 8h/5j | Incident 4h ouvrées | SLA contractuel',
      addons: [{ nom: 'PRA Essentiel', prix: '15 000 FCFA/mois' }, { nom: 'Référent Dédié', prix: '25 000 FCFA/mois' }],
      badge: 'Populaire', popular: true, order: 2,
    },
    {
      name: 'Savane', slug: 'savane', subtitle: 'Votre cloud privé, votre contrôle',
      description: 'Vous grandissez vite. Votre infra doit suivre le rythme sans que vous gériez la complexité.',
      target: 'PME en forte croissance, startup à traction, plateforme à fort trafic.',
      priceAmount: 35000, priceUnit: 'FCFA', pricePeriod: 'Mensuel : 35 000 FCFA · Annuel : 28 000 FCFA/mois (-20%)',
      billingOptions: { mensuel: 35000, annuel: 28000 },
      features: ['Cloud privé isolé (VPC dédié)', 'Firewall dédié + snapshots', 'Scalable à la demande', 'Support prioritaire + référent'],
      ressources: ['4 vCPU dédiés', '8 Go RAM', '100 Go NVMe', '1 To trafic'],
      sla: '99,9% | Email+Tél 8h/5j | Incident 4h ouvrées | SLA contractuel',
      addons: [{ nom: 'Astreinte 24/7', prix: '35 000 FCFA/mois' }, { nom: 'Revue Stratégique', prix: '15 000 FCFA/mois' }],
      badge: null, popular: false, order: 3,
    },
  ],
  institution: [
    {
      name: 'Héritage', slug: 'heritage', subtitle: 'Archivage souverain certifié',
      description: "Vos données restent au Sénégal. Chiffrées, répliquées, conformes. Point final.",
      target: 'Institution publique, banque, entreprise soumise à des obligations légales.',
      priceAmount: 25000, priceUnit: 'FCFA', pricePeriod: 'Engagement annuel — 300 000 FCFA/an',
      billingOptions: { mensuel: 25000, annuel: 25000 },
      features: ['Chiffrement AES-256 bout en bout', 'Réplication multi-site Sénégal', 'Conformité APDP', "Rapports d'audit trimestriels"],
      ressources: ['500 Go chiffré', 'Rétention 12 mois', 'Réplication auto'],
      sla: '99,95% | Support 24/7 dédié | Incident < 1h | SLA + pénalités',
      addons: [{ nom: 'Conformité APDP audit', prix: 'Sur devis' }],
      badge: null, popular: false, order: 1,
    },
    {
      name: 'Forteresse', slug: 'forteresse', subtitle: 'Plan de reprise certifié',
      description: "Votre système ne peut pas s'arrêter. On s'en porte garant, par contrat.",
      target: 'Système critique, infrastructure étatique, plateforme bancaire.',
      priceAmount: 45000, priceUnit: 'FCFA', pricePeriod: 'Engagement annuel — 540 000 FCFA/an',
      billingOptions: { mensuel: 45000, annuel: 45000 },
      features: ['PRA documenté et testé semestriellement', 'RTO < 4h / RPO < 1h', 'Basculement automatique', 'Monitoring 24/7 + référent dédié'],
      ressources: ['PRA complet', 'Monitoring IA', 'Tests bi-annuels'],
      sla: '99,95% | Support 24/7 dédié | Incident < 1h | SLA + pénalités',
      addons: [{ nom: 'Bouclier Zero Trust', prix: 'Sur devis' }, { nom: 'Sentinelle Monitoring', prix: 'Inclus' }],
      badge: 'Recommandé', popular: true, order: 2,
    },
    {
      name: 'Kilimandjaro', slug: 'kilimandjaro', subtitle: 'Puissance bare metal, zéro compromis',
      description: "Vous exigez le maximum. Un serveur physique dédié, une disponibilité totale, un engagement sans faille.",
      target: 'Banque, opérateur télécom, hébergeur, institution critique.',
      priceAmount: 85000, priceUnit: 'FCFA', pricePeriod: 'Facturation mensuelle — Configurations sur mesure sur devis',
      billingOptions: { mensuel: 85000, annuel: 85000 },
      features: ['Serveur physique dédié HA', 'VDC inclus', 'Support 24/7 prioritaire', 'SLA contractuel avec pénalités'],
      ressources: ['8 CPU physiques', '32 Go ECC', '500 Go NVMe RAID', '5 To trafic'],
      sla: '99,95% | Support 24/7 dédié | Incident < 1h | SLA + pénalités',
      addons: [{ nom: 'Bouclier Zero Trust', prix: 'Sur devis' }, { nom: 'Conformité APDP', prix: 'Sur devis' }],
      badge: null, popular: false, order: 3,
    },
  ],
}

// ─── TÉMOIGNAGES ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'Amadou Diallo', role: 'DG — Agence Digitale Dakar', segment: 'Entreprise', rating: 5, color: '#E85D04', order: 1,
    text: "Depuis que nous sommes chez Jokko, zéro souci technique. L'équipe est réactive et comprend nos besoins locaux." },
  { name: 'Fatou Ndiaye', role: 'DSI — Institution Publique', segment: 'Institution', rating: 5, color: '#6B4C9A', order: 2,
    text: "La souveraineté de nos données était non négociable. Jokko est le seul à offrir ça avec un SLA à pénalités." },
  { name: 'Moussa Ba', role: 'CTO — Startup SaaS', segment: 'Startup', rating: 5, color: '#0D0D0D', order: 3,
    text: "Migration depuis OVH en 48h, zéro downtime. Le support local fait toute la différence." },
]

// ─── ARTICLES BLOG ───────────────────────────────────────────────────────────
const ARTICLES = [
  {
    title: "Pourquoi héberger au Sénégal plutôt qu'en Europe en 2026",
    slug: "heberger-senegal-vs-europe-2026",
    excerpt: "Souveraineté des données, latence, conformité APDP, coûts réels — le comparatif complet pour les entreprises sénégalaises.",
    category: "Hébergement",
    readTime: 6,
    publishedAt: "2026-02-15",
    content: "Le choix d'un hébergeur est stratégique. Pour une entreprise sénégalaise, héberger localement n'est plus seulement une question de performance — c'est une obligation réglementaire et un avantage concurrentiel...",
  },
  {
    title: "SLA contractuel vs best effort : quelle différence pour votre activité ?",
    slug: "sla-contractuel-vs-best-effort",
    excerpt: "Un SLA avec pénalités, c'est quoi concrètement ? Ce que ça change pour votre continuité numérique.",
    category: "Cloud",
    readTime: 4,
    publishedAt: "2026-02-28",
    content: "Le SLA (Service Level Agreement) est l'engagement de disponibilité formalisé dans votre contrat. Mais toutes les garanties ne se valent pas...",
  },
  {
    title: "Migration vers le cloud souverain : guide pratique pour les PME",
    slug: "migration-cloud-souverain-pme",
    excerpt: "De l'audit technique à la mise en production — les 5 étapes pour migrer sans downtime ni perte de données.",
    category: "Migration",
    readTime: 8,
    publishedAt: "2026-03-10",
    content: "La migration vers un cloud souverain est souvent perçue comme risquée. En réalité, avec une méthodologie structurée, elle peut se faire en 48h...",
  },
]

// ─── MAIN ────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🚀  Seed Strapi complet → ${BASE}\n`)

  // 1. Segments
  console.log('📂  Segments...')
  const segmentIds = {}
  for (const seg of SEGMENTS) {
    segmentIds[seg.slug] = await upsert('segments', 'slug', seg.slug, seg)
  }

  // 2. Offres
  for (const [segSlug, offres] of Object.entries(OFFRES)) {
    console.log(`\n💼  Offres ${segSlug}...`)
    for (const offre of offres) {
      await upsert('offers', 'slug', offre.slug, { ...offre, segment: segmentIds[segSlug] })
    }
  }

  // 3. Témoignages
  console.log('\n⭐  Témoignages...')
  for (const t of TESTIMONIALS) {
    await upsert('testimonials', 'name', t.name, t)
  }

  // 4. Articles blog
  console.log('\n📝  Articles blog...')
  for (const a of ARTICLES) {
    await upsert('articles', 'slug', a.slug, a)
  }

  console.log('\n✅  Seed complet terminé !\n')
}

main().catch(err => { console.error('\n❌  Erreur :', err.message); process.exit(1) })
