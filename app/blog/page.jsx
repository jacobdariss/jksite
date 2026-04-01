import Link from 'next/link'
import { getSeoByPage } from '@/lib/strapi'

export async function generateMetadata() {
  const seo = await getSeoByPage('blog')
  return {
    title: seo.title, description: seo.description, keywords: seo.keywords,
    alternates: { canonical: 'https://jokko.africa/blog' },
    openGraph: { title: seo.ogTitle || seo.title, description: seo.ogDescription || seo.description, url: 'https://jokko.africa/blog', images: seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630 }] : [{ url: '/og-image.png', width: 1200, height: 630 }] },
  }
}

async function getArticles() {
  try {
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://api.jokko.africa'
    const res = await fetch(`${STRAPI_URL}/api/articles?sort=publishedAt:desc&populate=*`, {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('fetch failed')
    const data = await res.json()
    return data.data || []
  } catch {
    return STATIC_ARTICLES
  }
}

const STATIC_ARTICLES = [
  {
    id: 1,
    attributes: {
      title: "Pourquoi héberger au Sénégal plutôt qu'en Europe en 2026",
      slug: 'heberger-senegal-vs-europe-2026',
      excerpt: "Souveraineté des données, latence, conformité APDP, coûts réels — le comparatif complet pour les entreprises sénégalaises.",
      category: 'Hébergement',
      readTime: 6,
      publishedAt: '2026-02-15',
    },
  },
  {
    id: 2,
    attributes: {
      title: "SLA contractuel vs best effort : quelle différence pour votre activité ?",
      slug: 'sla-contractuel-vs-best-effort',
      excerpt: "Un SLA avec pénalités, c'est quoi concrètement ? Ce que ça change pour votre continuité numérique.",
      category: 'Cloud',
      readTime: 4,
      publishedAt: '2026-02-28',
    },
  },
  {
    id: 3,
    attributes: {
      title: "Migration vers le cloud souverain : guide pratique pour les PME",
      slug: 'migration-cloud-souverain-pme',
      excerpt: "De l'audit technique à la mise en production — les 5 étapes pour migrer sans downtime ni perte de données.",
      category: 'Migration',
      readTime: 8,
      publishedAt: '2026-03-10',
    },
  },
]

const CATEGORY_COLORS = {
  'Hébergement': { bg: '#FFF7EE', color: '#E85D04' },
  'Cloud': { bg: '#F0F2F8', color: '#1E2A3A' },
  'Migration': { bg: '#F3EFF8', color: '#6B4C9A' },
  'Sécurité': { bg: '#F0FFF4', color: '#16A34A' },
}

export default async function BlogPage() {
  const articles = await getArticles()

  return (
    <>
      {/* Hero */}
      <section style={{ padding: '64px 0 48px', background: 'linear-gradient(135deg,#FFF7EE,#FFE8D0)', borderBottom: '3px solid var(--o)' }}>
        <div className="container">
          <div className="reveal">
            <div style={{ fontSize: '.75rem', color: 'var(--bm)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <a href="/" style={{ color: 'var(--o)' }}>Accueil</a>
              <span style={{ color: '#ccc' }}>›</span>
              <strong>Blog</strong>
            </div>
            <div className="label">Blog & Ressources</div>
            <h1 className="title">Actualités, guides et<br /><em style={{ color: 'var(--o)', fontStyle: 'italic' }}>conseils cloud souverain.</em></h1>
            <p className="subtitle">Hébergement, sécurité, conformité APDP, migration — les ressources pour votre continuité numérique.</p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section style={{ padding: '72px 0', background: '#fff' }}>
        <div className="container">
          <div className="blog-grid">
            {articles.map((a, i) => {
              const attr = a.attributes || a
              const cat = CATEGORY_COLORS[attr.category] || { bg: '#F5F5F5', color: '#444' }
              const date = new Date(attr.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
              return (
                <Link key={a.id} href={`/blog/${attr.slug}`} className={`hover-lift reveal reveal-delay-${i % 3}`}
                  style={{ background: '#fff', border: '1px solid var(--bd)', borderRadius: 'var(--rx)', overflow: 'hidden', display: 'block', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ height: 8, background: `linear-gradient(90deg,var(--o),var(--ol))` }} />
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                      <span style={{ background: cat.bg, color: cat.color, fontSize: '.65rem', fontWeight: 800, padding: '3px 10px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {attr.category}
                      </span>
                      <span style={{ fontSize: '.72rem', color: 'var(--bm)' }}>{attr.readTime} min de lecture</span>
                    </div>
                    <h2 style={{ fontFamily: 'var(--fd)', fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.35, marginBottom: 12, color: 'var(--b)' }}>{attr.title}</h2>
                    <p style={{ fontSize: '.84rem', color: 'var(--bs)', lineHeight: 1.6, marginBottom: 20 }}>{attr.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '.72rem', color: 'var(--bm)' }}>{date}</span>
                      <span style={{ fontSize: '.82rem', color: 'var(--o)', fontWeight: 700 }}>Lire l'article →</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
        <style>{`.blog-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; } @media(max-width:900px){ .blog-grid { grid-template-columns: 1fr 1fr !important; } } @media(max-width:600px){ .blog-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* CTA newsletter */}
      <section style={{ padding: '64px 0', background: 'var(--ow)' }}>
        <div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
          <div className="reveal">
            <div className="label" style={{ justifyContent: 'center' }}>Restez informé</div>
            <h2 className="title">Des ressources pour votre continuité numérique</h2>
            <p style={{ fontSize: '.92rem', color: 'var(--bs)', marginBottom: 24 }}>Questions sur l&apos;hébergement souverain ? Notre équipe répond.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://manage.jokko.africa/submitticket.php" target="_blank" rel="noreferrer" className="btn btn-o btn-lg">Contacter l&apos;équipe →</a>
              <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" className="btn btn-ol btn-lg">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
