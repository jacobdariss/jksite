const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://api.jokko.africa'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

// Données statiques de fallback — utilisées quand Strapi est vide
const STATIC_OFFRES = {
  startup: [
    {
      slug: 'racine', nom: 'Racine', tagline: 'Votre premier site, zéro stress',
      prix: { mensuel: '2 000', annuel: '2 000' },
      periode: 'Engagement annuel — 24 000 FCFA/an',
      ressources: ['1 vCPU', '1 Go RAM', '10 Go SSD', '100 Go trafic'],
      features: ['Hébergement fiable avec support local', 'Certificat SSL inclus', 'Activation en moins de 24h', 'Accompagnement au démarrage'],
      badge: null, ordre: 1,
    },
    {
      slug: 'sahara', nom: 'Sahara', tagline: 'WordPress optimisé, trafic garanti',
      prix: { mensuel: '4 000', annuel: '4 000' },
      periode: 'Semestriel : 24 000 FCFA · Annuel : 48 000 FCFA',
      ressources: ['1 vCPU', '2 Go RAM', '20 Go NVMe', '200 Go trafic'],
      features: ['WordPress préinstallé et optimisé', 'Cache LiteSpeed + CDN Afrique', 'SEO technique intégré', 'Évolution vers Baobab sans migration'],
      badge: 'Populaire', ordre: 2,
    },
    {
      slug: 'teranga', nom: 'Téranga', tagline: 'Le cloud solidaire — ONG & Associations',
      prix: { mensuel: '5 000', annuel: '5 000' },
      periode: 'Engagement annuel — 60 000 FCFA/an',
      ressources: ['2 vCPU', '2 Go RAM', '30 Go SSD', '300 Go trafic'],
      features: ["Multi-sites (jusqu'à 3 projets)", 'Backups hebdomadaires', 'Support dédié ONG/ESS', 'Tarif solidaire'],
      badge: 'Solidaire', ordre: 3,
    },
  ],
  entreprise: [
    {
      slug: 'baobab', nom: 'Baobab', tagline: "L'hébergement pro souverain",
      prix: { mensuel: '12 500', annuel: '12 500' },
      periode: 'Trim. : 37 500 FCFA · Sem. : 75 000 FCFA · Annuel : 150 000 FCFA',
      ressources: ['2 vCPU dédiés', '4 Go RAM', '40 Go NVMe', '500 Go trafic'],
      features: ['Hébergement pro 100% Sénégal', 'Domaine .SN inclus', 'Backups quotidiens', 'SLA contractuel', 'Évolution fluide vers Savane'],
      badge: null, ordre: 1,
    },
    {
      slug: 'fondation', nom: 'Fondation', tagline: 'Vos applications métier, zéro gestion infra',
      prix: { mensuel: '25 000', annuel: '20 000' },
      periode: 'Annuel : 20 000 FCFA/mois (-20%) = 240 000 FCFA/an',
      ressources: ['2 vCPU dédiés', '4 Go RAM', '50 Go NVMe', '500 Go trafic'],
      features: ['PaaS managé multi-stacks (Node, Python, PHP, Java)', 'Déploiement Git intégré', 'Backups quotidiens + SSL', 'SLA contractuel'],
      badge: 'Populaire', ordre: 2,
    },
    {
      slug: 'savane', nom: 'Savane', tagline: 'Votre cloud privé, votre contrôle',
      prix: { mensuel: '35 000', annuel: '28 000' },
      periode: 'Annuel : 28 000 FCFA/mois (-20%) = 336 000 FCFA/an',
      ressources: ['4 vCPU dédiés', '8 Go RAM', '100 Go NVMe', '1 To trafic'],
      features: ['Cloud privé isolé (VPC dédié)', 'Firewall dédié + snapshots', 'Scalable à la demande', 'Support prioritaire + référent'],
      badge: null, ordre: 3,
    },
  ],
  institution: [
    {
      slug: 'heritage', nom: 'Héritage', tagline: 'Archivage souverain certifié',
      prix: '25 000',
      periode: 'Engagement annuel — 300 000 FCFA/an',
      ressources: ['500 Go chiffré', 'Rétention 12 mois', 'Réplication auto'],
      features: ['Chiffrement AES-256 bout en bout', 'Réplication multi-site Sénégal', 'Conformité APDP', "Rapports d'audit trimestriels"],
      badge: null, ordre: 1,
    },
    {
      slug: 'forteresse', nom: 'Forteresse', tagline: 'Plan de reprise certifié',
      prix: '45 000',
      periode: 'Engagement annuel — 540 000 FCFA/an',
      ressources: ['PRA complet', 'Monitoring IA', 'Tests bi-annuels'],
      features: ['PRA documenté et testé semestriellement', 'RTO < 4h / RPO < 1h', 'Basculement automatique', 'Monitoring 24/7 + référent dédié'],
      badge: 'Recommandé', ordre: 2,
    },
    {
      slug: 'kilimandjaro', nom: 'Kilimandjaro', tagline: 'Puissance bare metal, zéro compromis',
      prix: '85 000',
      periode: 'Facturation mensuelle — Configurations sur mesure sur devis',
      ressources: ['8 CPU physiques', '32 Go ECC', '500 Go NVMe RAID', '5 To trafic'],
      features: ['Serveur physique dédié HA', 'VDC inclus', 'Support 24/7 prioritaire', 'SLA contractuel avec pénalités'],
      badge: null, ordre: 3,
    },
  ],
}

async function fetchStrapi(endpoint) {
  try {
    const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: 3600 },
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
  return Number(amount).toLocaleString('fr-FR')
}

function normalizeOffer(item) {
  const a = item.attributes || item
  const segmentName = a.segment?.data?.attributes?.name?.toLowerCase() || ''

  // billingOptions peut contenir {mensuel, annuel} ou être null
  const billing = a.billingOptions || {}
  const prixMensuel = formatPrice(billing.mensuel || a.priceAmount)
  const prixAnnuel = formatPrice(billing.annuel || billing.mensuel || a.priceAmount)

  return {
    slug: a.slug,
    nom: a.name,
    tagline: a.subtitle || '',
    prix: segmentName === 'institution'
      ? prixMensuel
      : { mensuel: prixMensuel, annuel: prixAnnuel },
    periode: a.pricePeriod || '',
    ressources: Array.isArray(a.ressources) ? a.ressources : [],
    features: Array.isArray(a.features) ? a.features : [],
    badge: a.badge || null,
    ordre: a.order || 0,
  }
}

export async function getOffresBySegment(segment) {
  const data = await fetchStrapi(
    `/offers?filters[segment][name][$containsi]=${segment}&populate=*&sort=order:asc`
  )

  if (data?.data?.length > 0) {
    return data.data.map(normalizeOffer)
  }

  // Fallback static
  return STATIC_OFFRES[segment.toLowerCase()] || []
}

export async function getPartners() {
  const data = await fetchStrapi('/partners?populate=*&sort=order:asc')
  if (data?.data?.length > 0) return data.data
  return []
}
