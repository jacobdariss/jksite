const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://api.jokko.africa'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

// Données statiques de fallback
const STATIC_OFFRES = {
  startup: [
    {
      slug: 'racine', nom: 'Racine', tagline: 'Votre premier site, zéro stress',
      pid: 142,
      prix: { mensuel: '2 000', annuel: '2 000' },
      periode: 'Engagement annuel — 24 000 FCFA/an',
      ressources: ['1 vCPU', '1 Go RAM', '10 Go SSD', '100 Go trafic'],
      features: ['Hébergement fiable avec support local', 'Certificat SSL inclus', 'Activation en moins de 24h', 'Accompagnement au démarrage'],
      sla: '99,5% | Support email J+1 | Incident 24h ouvrées',
      addons: [
        { nom: 'Papyrus (webmail simple)', prix: '750 FCFA/utilisateur/mois' },
        { nom: 'Oasis Backup', prix: '2 000 FCFA/mois' },
        { nom: 'Onboarding Accompagné', prix: '25 000 FCFA (forfait unique)' },
      ],
      badge: null, ordre: 1,
    },
    {
      slug: 'sahara', nom: 'Sahara', tagline: 'WordPress optimisé, trafic garanti',
      pid: 143,
      prix: { mensuel: '4 000', annuel: '4 000' },
      periode: 'Semestriel : 24 000 FCFA · Annuel : 48 000 FCFA/an',
      ressources: ['1 vCPU', '2 Go RAM', '20 Go NVMe', '200 Go trafic'],
      features: ['WordPress préinstallé et optimisé', 'Cache LiteSpeed + CDN Afrique', 'SEO technique intégré', 'Évolution vers Baobab sans migration'],
      sla: '99,5% | Support email J+1 | Incident 24h ouvrées',
      addons: [
        { nom: 'Tam-Tam (email pro)', prix: '1 000 FCFA/utilisateur/mois' },
        { nom: 'Oasis Backup', prix: '2 000 FCFA/mois' },
        { nom: 'Onboarding Accompagné', prix: '25 000 FCFA (forfait unique)' },
      ],
      badge: 'Populaire', ordre: 2,
    },
    {
      slug: 'teranga', nom: 'Téranga', tagline: 'Le cloud solidaire — ONG & Associations',
      pid: 144,
      prix: { mensuel: '5 000', annuel: '5 000' },
      periode: 'Engagement annuel — 60 000 FCFA/an',
      ressources: ['2 vCPU', '2 Go RAM', '30 Go SSD', '300 Go trafic'],
      features: ["Multi-sites (jusqu'à 3 projets)", 'Backups hebdomadaires', 'Support dédié ONG/ESS', 'Tarif solidaire'],
      sla: '99,5% | Support email J+1 | Incident 24h ouvrées',
      addons: [
        { nom: 'Papyrus (webmail simple)', prix: '750 FCFA/utilisateur/mois' },
        { nom: 'Oasis Backup', prix: '2 000 FCFA/mois' },
        { nom: 'Griot SMS', prix: '10 FCFA/SMS (remise dès 5 000 SMS)' },
      ],
      badge: 'Solidaire', ordre: 3,
    },
  ],
  entreprise: [
    {
      slug: 'baobab', nom: 'Baobab', tagline: "L'hébergement pro souverain",
      pid: 145,
      prix: { mensuel: '12 500', annuel: '12 500' },
      periode: 'Trim. : 37 500 FCFA · Sem. : 75 000 FCFA · Annuel : 150 000 FCFA',
      ressources: ['2 vCPU dédiés', '4 Go RAM', '40 Go NVMe', '500 Go trafic'],
      features: ['Hébergement pro 100% Sénégal', 'Domaine .SN inclus', 'Backups quotidiens', 'SLA contractuel', 'Évolution fluide vers Savane'],
      sla: '99,9% | Email+Tél 8h/5j | Incident 4h ouvrées | SLA contractuel',
      addons: [
        { nom: 'Tam-Tam (email pro)', prix: '1 000 FCFA/utilisateur/mois' },
        { nom: 'Oasis Backup', prix: '5 000 FCFA/mois' },
        { nom: 'Priorité (support < 2h)', prix: '25 000 FCFA/mois' },
        { nom: 'Onboarding Accompagné', prix: '50 000 FCFA (forfait unique)' },
      ],
      badge: null, ordre: 1,
    },
    {
      slug: 'fondation', nom: 'Fondation', tagline: 'Vos applications métier, zéro gestion infra',
      pid: 146,
      prix: { mensuel: '25 000', annuel: '20 000' },
      periode: 'Mensuel : 25 000 FCFA · Annuel : 20 000 FCFA/mois (-20%) = 240 000 FCFA/an',
      ressources: ['2 vCPU dédiés', '4 Go RAM', '50 Go NVMe', '500 Go trafic'],
      features: ['PaaS managé multi-stacks (Node, Python, PHP, Java)', 'Déploiement Git intégré', 'Backups quotidiens + SSL', 'SLA contractuel'],
      sla: '99,9% | Email+Tél 8h/5j | Incident 4h ouvrées | SLA contractuel',
      addons: [
        { nom: 'Oasis Backup', prix: '5 000 FCFA/mois' },
        { nom: 'PRA Essentiel', prix: '15 000 FCFA/mois' },
        { nom: 'Priorité (support < 2h)', prix: '25 000 FCFA/mois' },
        { nom: 'Onboarding Accompagné', prix: '50 000 FCFA (forfait unique)' },
      ],
      badge: 'Populaire', ordre: 2,
    },
    {
      slug: 'savane', nom: 'Savane', tagline: 'Votre cloud privé, votre contrôle',
      pid: 147,
      prix: { mensuel: '35 000', annuel: '28 000' },
      periode: 'Mensuel : 35 000 FCFA · Annuel : 28 000 FCFA/mois (-20%) = 336 000 FCFA/an',
      ressources: ['4 vCPU dédiés', '8 Go RAM', '100 Go NVMe', '1 To trafic'],
      features: ['Cloud privé isolé (VPC dédié)', 'Firewall dédié + snapshots', 'Scalable à la demande', 'Support prioritaire + référent'],
      sla: '99,9% | Email+Tél 8h/5j | Incident 4h ouvrées | SLA contractuel',
      addons: [
        { nom: 'PRA Essentiel', prix: '15 000 FCFA/mois' },
        { nom: 'Référent Dédié', prix: '25 000 FCFA/mois' },
        { nom: 'Astreinte 24/7', prix: '35 000 FCFA/mois' },
        { nom: 'Revue Stratégique', prix: '15 000 FCFA/mois' },
      ],
      badge: null, ordre: 3,
    },
  ],
  institution: [
    {
      slug: 'heritage', nom: 'Héritage', tagline: 'Archivage souverain certifié',
      pid: 148,
      prix: '25 000',
      periode: 'Engagement annuel — 300 000 FCFA/an',
      ressources: ['500 Go chiffré', 'Rétention 12 mois', 'Réplication auto'],
      features: ['Chiffrement AES-256 bout en bout', 'Réplication multi-site Sénégal', 'Conformité APDP', "Rapports d'audit trimestriels"],
      sla: '99,95% | Support 24/7 dédié | Incident < 1h | SLA + pénalités',
      addons: [
        { nom: 'Priorité, Référent Dédié, Astreinte 24/7, Revue Stratégique', prix: 'Inclus' },
        { nom: 'Conformité APDP (audit complet)', prix: 'Sur devis' },
        { nom: 'Onboarding Accompagné', prix: 'Sur devis' },
      ],
      badge: null, ordre: 1,
    },
    {
      slug: 'forteresse', nom: 'Forteresse', tagline: 'Plan de reprise certifié',
      pid: 149,
      prix: '45 000',
      periode: 'Engagement annuel — 540 000 FCFA/an',
      ressources: ['PRA complet', 'Monitoring IA', 'Tests bi-annuels'],
      features: ['PRA documenté et testé semestriellement', 'RTO < 4h / RPO < 1h', 'Basculement automatique', 'Monitoring 24/7 + référent dédié'],
      sla: '99,95% | Support 24/7 dédié | Incident < 1h | SLA + pénalités',
      addons: [
        { nom: 'Priorité, Référent Dédié, Astreinte 24/7, Revue Stratégique', prix: 'Inclus' },
        { nom: 'Bouclier Zero Trust', prix: 'Sur devis' },
        { nom: 'Sentinelle Monitoring', prix: 'Inclus' },
      ],
      badge: 'Recommandé', ordre: 2,
    },
    {
      slug: 'kilimandjaro', nom: 'Kilimandjaro', tagline: 'Puissance bare metal, zéro compromis',
      pid: 150,
      prix: '85 000',
      periode: 'Facturation mensuelle — Configurations sur mesure sur devis',
      ressources: ['8 CPU physiques', '32 Go ECC', '500 Go NVMe RAID', '5 To trafic'],
      features: ['Serveur physique dédié HA', 'VDC inclus', 'Support 24/7 prioritaire', 'SLA contractuel avec pénalités'],
      sla: '99,95% | Support 24/7 dédié | Incident < 1h | SLA + pénalités',
      addons: [
        { nom: 'Priorité, Référent Dédié, Astreinte 24/7, Revue Stratégique', prix: 'Inclus' },
        { nom: 'Bouclier Zero Trust', prix: 'Sur devis' },
        { nom: 'Conformité APDP', prix: 'Sur devis' },
      ],
      badge: null, ordre: 3,
    },
  ],
}

async function fetchStrapi(endpoint) {
  try {
    const headers = { 'Content-Type': 'application/json' }
    if (STRAPI_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`
    
    const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
      headers,
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  } catch (e) {
    console.warn(`[Strapi] fetch failed for ${endpoint}:`, e.message)
    return null
  }
}

function formatPrice(amount) {
  if (!amount) return null
  // Utiliser espace normale (pas espace fine de toLocaleString)
  return String(Math.round(Number(amount))).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function normalizeOffer(item) {
  const a = item.attributes || item
  const segmentName = a.segment?.data?.attributes?.name?.toLowerCase() || ''

  const billing = a.billingOptions || {}
  const prixMensuel = formatPrice(billing.mensuel || a.priceAmount)
  const prixAnnuel = formatPrice(billing.annuel || billing.mensuel || a.priceAmount)

  return {
    slug: a.slug,
    nom: a.name,
    tagline: a.subtitle || '',
    description: a.description || '',
    target: a.target || '',
    pid: a.pid ?? null,
    prix: segmentName === 'institution'
      ? prixMensuel
      : { mensuel: prixMensuel, annuel: prixAnnuel },
    periode: a.pricePeriod || '',
    ressources: Array.isArray(a.ressources) ? a.ressources : [],
    features: Array.isArray(a.features) ? a.features : [],
    sla: a.sla || '',
    addons: Array.isArray(a.addons) ? a.addons : [],
    badge: a.badge || null,
    popular: a.popular || false,
    ordre: a.order || 0,
  }
}

export async function getOffresBySegment(segment) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://api.jokko.africa'
  const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || ''

  // Fetch direct sans token (Public permissions activées)
  try {
    const headers = { 'Content-Type': 'application/json' }
    if (STRAPI_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`

    const url = `${STRAPI_URL}/api/offers?filters[segment][slug][$eq]=${segment}&populate=*&sort=order:asc`
    console.log(`[Strapi] Fetching: ${url}`)

    const res = await fetch(url, { headers, cache: 'no-store' })
    const data = await res.json()

    console.log(`[Strapi] ${segment}: ${data?.data?.length || 0} offres`)

    if (data?.data?.length > 0) {
      return data.data.map(normalizeOffer)
    }
  } catch (e) {
    console.error(`[Strapi] Error for ${segment}:`, e.message)
  }

  console.log(`[Strapi] Fallback statique pour ${segment}`)
  return STATIC_OFFRES[segment.toLowerCase()] || []
}

// ─── SEO ─────────────────────────────────────────────────────────────────────

// Fallbacks statiques par page — utilisés si Strapi ne répond pas ou entrée vide
const SEO_FALLBACK = {
  home: {
    title: 'Jokko Pro Africa — Le 1er Cloud 100% Sénégalais',
    description: 'Hébergement cloud souverain pour Startups, Entreprises et Institutions. Datacenter Tier III+ à Dakar. Dès 2 000 FCFA/mois.',
    keywords: 'hébergement sénégal, cloud souverain, datacenter dakar, jokko pro africa',
  },
  startup: {
    title: 'Hébergement Startup Sénégal — Racine, Sahara, Téranga | Jokko Pro Africa',
    description: 'Lancez votre site ou projet en ligne dès 2 000 FCFA/mois. Hébergement cloud souverain pour créateurs, blogueurs et ONG au Sénégal. Activation en moins de 24h.',
    keywords: 'hébergement startup sénégal, hébergement pas cher dakar, cloud startup afrique, wordpress sénégal',
  },
  entreprise: {
    title: 'Hébergement Entreprise Sénégal — Baobab, Fondation, Savane | Jokko Pro Africa',
    description: 'Hébergement cloud pro souverain pour PME, agences et e-commerce au Sénégal. SLA contractuel, backups quotidiens, support Email+Tél. Dès 12 500 FCFA/mois.',
    keywords: 'hébergement PME sénégal, cloud entreprise dakar, hébergement pro afrique, SLA sénégal',
  },
  institution: {
    title: 'Cloud Souverain Institutions Sénégal — Héritage, Forteresse, Kilimandjaro | Jokko Pro Africa',
    description: 'Infrastructure cloud souveraine pour institutions publiques, banques et opérateurs au Sénégal. Conformité APDP, SLA avec pénalités, support 24/7 dédié.',
    keywords: 'cloud souverain sénégal, hébergement institution publique, conformité APDP, datacenter dakar',
  },
  services: {
    title: 'Services Cloud & Add-ons | Jokko Pro Africa',
    description: 'Email pro, backup cloud, monitoring, PRA, Zero Trust — tous les services cloud souverains Jokko pour compléter votre hébergement.',
    keywords: 'services cloud sénégal, email pro dakar, backup cloud afrique, monitoring sénégal',
  },
  partenaires: {
    title: 'Programme Partenaires | Jokko Pro Africa',
    description: 'Rejoignez le réseau de partenaires Jokko Pro Africa. Revendeurs, intégrateurs, agences — distribuez le premier cloud souverain du Sénégal.',
    keywords: 'partenaires jokko, revendeur cloud sénégal, programme partenaires afrique',
  },
  apropos: {
    title: 'À propos de Jokko Pro Africa — Le 1er Cloud Souverain du Sénégal',
    description: "Découvrez Jokko Pro Africa : notre mission, nos valeurs et notre équipe. Premier hébergeur cloud 100% sénégalais, basé à Dakar.",
    keywords: 'jokko pro africa, cloud sénégal, hébergeur local dakar, souveraineté numérique afrique',
  },
  blog: {
    title: 'Blog — Actualités Cloud & Digital | Jokko Pro Africa',
    description: 'Conseils, actualités et guides sur le cloud souverain, la cybersécurité et la transformation numérique en Afrique.',
    keywords: 'blog cloud sénégal, actualités digital afrique, cybersécurité sénégal',
  },
}

export async function getSeoByPage(page) {
  try {
    const data = await fetchStrapi(`/page-seos?filters[page][$eq]=${page}&populate=ogImage`)
    const item = data?.data?.[0]
    if (!item) return SEO_FALLBACK[page] || {}

    const a = item.attributes || item
    const ogImageUrl = a.ogImage?.data?.attributes?.url
      ? `${STRAPI_URL}${a.ogImage.data.attributes.url}`
      : null

    return {
      title:         a.title       || SEO_FALLBACK[page]?.title       || '',
      description:   a.description || SEO_FALLBACK[page]?.description || '',
      keywords:      a.keywords    || SEO_FALLBACK[page]?.keywords    || '',
      ogTitle:       a.ogTitle     || a.title       || SEO_FALLBACK[page]?.title       || '',
      ogDescription: a.ogDescription || a.description || SEO_FALLBACK[page]?.description || '',
      ogImage:       ogImageUrl,
    }
  } catch (e) {
    console.warn(`[Strapi] getSeoByPage(${page}) failed:`, e.message)
    return SEO_FALLBACK[page] || {}
  }
}

// ─── ARTICLES ─────────────────────────────────────────────────────────────────

const STATIC_ARTICLES = [
  {
    id: 1,
    title: "Pourquoi héberger au Sénégal plutôt qu'en Europe en 2026",
    slug: 'heberger-senegal-vs-europe-2026',
    excerpt: "Souveraineté des données, latence, conformité APDP, coûts réels — le comparatif complet pour les entreprises sénégalaises.",
    category: 'Hébergement',
    readTime: 6,
    publishedAt: '2026-02-15',
    cover: null,
  },
  {
    id: 2,
    title: "SLA contractuel vs best effort : quelle différence pour votre activité ?",
    slug: 'sla-contractuel-vs-best-effort',
    excerpt: "Un SLA avec pénalités, c'est quoi concrètement ? Ce que ça change pour votre continuité numérique.",
    category: 'Cloud',
    readTime: 4,
    publishedAt: '2026-02-28',
    cover: null,
  },
  {
    id: 3,
    title: "Migration vers le cloud souverain : guide pratique pour les PME",
    slug: 'migration-cloud-souverain-pme',
    excerpt: "De l'audit technique à la mise en production — les 5 étapes pour migrer sans downtime ni perte de données.",
    category: 'Migration',
    readTime: 8,
    publishedAt: '2026-03-10',
    cover: null,
  },
]

function normalizeArticle(item) {
  const a = item.attributes || item
  const coverUrl = a.cover?.data?.attributes?.url
    ? `${STRAPI_URL}${a.cover.data.attributes.url}`
    : (a.coverUrl || null)
  return {
    id: item.id || a.id,
    title:       a.title       || '',
    slug:        a.slug        || '',
    excerpt:     a.excerpt     || '',
    category:    a.category    || '',
    readTime:    a.readTime    || a.read_time || 5,
    publishedAt: a.publishedAt || a.published_at || '',
    cover:       coverUrl,
  }
}

export async function getArticles() {
  const data = await fetchStrapi('/articles?sort=publishedAt:desc&populate=*')
  if (data?.data?.length > 0) return data.data.map(normalizeArticle)
  console.log('[Strapi] Fallback statique pour articles')
  return STATIC_ARTICLES
}

// ─── PARTNERS ─────────────────────────────────────────────────────────────────

const STATIC_PARTNERS = []  // pas de fallback — on n'affiche rien si Strapi est down

function normalizePartner(item) {
  const a = item.attributes || item
  const logoUrl = a.logo?.data?.attributes?.url
    ? `${STRAPI_URL}${a.logo.data.attributes.url}`
    : (a.logoUrl || null)
  return {
    id:      item.id || a.id,
    name:    a.name    || '',
    website: a.website || '',
    logo:    logoUrl,
    order:   a.order   || 0,
  }
}

export async function getPartners() {
  const data = await fetchStrapi('/partners?populate=*&sort=order:asc')
  if (data?.data?.length > 0) return data.data.map(normalizePartner)
  return STATIC_PARTNERS
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

const STATIC_TESTIMONIALS = [
  { id: 1, text: "Depuis que nous sommes chez Jokko, zéro souci technique. L'équipe est réactive et comprend nos besoins.", name: 'Amadou Diallo', role: 'DG — Agence Digitale Dakar', color: '#E85D04' },
  { id: 2, text: "La souveraineté de nos données était non négociable. Jokko est le seul à offrir ça avec un SLA à pénalités.", name: 'Fatou Ndiaye', role: 'DSI — Institution Publique', color: '#6B4C9A' },
  { id: 3, text: "Migration depuis OVH en 48h, zéro downtime. Le support local fait toute la différence.", name: 'Moussa Ba', role: 'CTO — Startup SaaS', color: '#0D0D0D' },
]

function normalizeTestimonial(item) {
  const a = item.attributes || item
  return {
    id:    item.id || a.id,
    text:  a.text  || '',
    name:  a.name  || '',
    role:  a.role  || '',
    color: a.color || '#E85D04',
  }
}

export async function getTestimonials() {
  const data = await fetchStrapi('/testimonials?sort=order:asc&populate=*')
  if (data?.data?.length > 0) return data.data.map(normalizeTestimonial)
  console.log('[Strapi] Fallback statique pour testimonials')
  return STATIC_TESTIMONIALS
}
