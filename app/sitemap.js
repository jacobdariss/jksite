const BASE = 'https://jokko.africa'

export default function sitemap() {
  const now = new Date().toISOString()

  return [
    // Pages principales — haute priorité
    { url: `${BASE}/`,            lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/startup`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/entreprise`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/institution`, lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/services`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/partenaires`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/partenaires/candidature`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/apropos`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },

    // Pages légales — basse priorité (déjà noindex mais on les inclut quand même)
    { url: `${BASE}/cgu`,                        lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/mentions-legales`,           lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/politique-confidentialite`,  lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/droits-domaine`,             lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
