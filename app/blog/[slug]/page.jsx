import { notFound } from 'next/navigation'
import Link from 'next/link'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://api.jokko.africa'

async function getArticle(slug) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`, {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      next: { revalidate: 3600 },
    })
    const data = await res.json()
    if (data.data?.length > 0) return data.data[0].attributes || data.data[0]
  } catch {}
  // Fallback statique
  const STATIC = {
    'heberger-senegal-vs-europe-2026': {
      title: "Pourquoi héberger au Sénégal plutôt qu'en Europe en 2026",
      category: 'Hébergement', readTime: 6, publishedAt: '2026-02-15',
      excerpt: "Souveraineté des données, latence, conformité APDP, coûts réels — le comparatif complet.",
      content: `<p>Le choix d'un hébergeur est stratégique. Pour une entreprise sénégalaise, héberger localement n'est plus seulement une question de performance — c'est une obligation réglementaire et un avantage concurrentiel.</p>
<h2>La conformité APDP</h2>
<p>La loi sénégalaise n° 2008-12 impose que les données personnelles des citoyens sénégalais soient hébergées sur le territoire national. Héberger en France ou en Irlande expose votre entreprise à des risques légaux croissants.</p>
<h2>La latence réseau</h2>
<p>Un datacenter à Dakar offre des latences de 1 à 5ms pour vos utilisateurs locaux, contre 80 à 120ms depuis l'Europe. Pour une application métier ou une boutique e-commerce, c'est la différence entre un utilisateur satisfait et un panier abandonné.</p>
<h2>Le coût réel</h2>
<p>Ramené à la parité de pouvoir d'achat, héberger au Sénégal revient souvent moins cher — surtout quand on intègre les frais de transfert de données internationaux et la complexité contractuelle avec des acteurs étrangers.</p>
<p>Jokko Pro Africa propose des offres dès 2 000 FCFA/mois avec datacenter Tier III+ à Dakar.</p>`,
    },
    'sla-contractuel-vs-best-effort': {
      title: "SLA contractuel vs best effort : quelle différence pour votre activité ?",
      category: 'Cloud', readTime: 4, publishedAt: '2026-02-28',
      excerpt: "Un SLA avec pénalités, c'est quoi concrètement ?",
      content: `<p>Un SLA (Service Level Agreement) est un engagement de disponibilité formalisé dans votre contrat. Mais toutes les garanties ne se valent pas.</p>
<h2>Le best effort</h2>
<p>Le best effort signifie que votre hébergeur fait de son mieux — sans engagement contractuel. En cas de panne, vous n'avez aucun recours financier.</p>
<h2>Le SLA contractuel</h2>
<p>Un SLA contractuel définit un taux de disponibilité garanti (ex : 99,9%) avec des pénalités financières si ce seuil n'est pas atteint. Chez Jokko, le segment Entreprise garantit 99,9% et le segment Institution 99,95% avec pénalités.</p>
<h2>Ce que ça change concrètement</h2>
<p>Avec un SLA à pénalités, votre hébergeur a un intérêt financier direct à maintenir votre service opérationnel. Sans SLA, une panne de 4 heures ne coûte rien à votre prestataire — mais elle vous coûte des clients.</p>`,
    },
    'migration-cloud-souverain-pme': {
      title: "Migration vers le cloud souverain : guide pratique pour les PME",
      category: 'Migration', readTime: 8, publishedAt: '2026-03-10',
      excerpt: "De l'audit technique à la mise en production — les 5 étapes pour migrer sans downtime.",
      content: `<p>La migration vers un cloud souverain est souvent perçue comme risquée. En réalité, avec une méthodologie structurée, elle peut se faire en 48h sans interruption de service.</p>
<h2>Étape 1 : Audit technique pré-migration</h2>
<p>Inventaire complet de vos services, bases de données, certificats SSL, DNS. Identification des dépendances critiques.</p>
<h2>Étape 2 : Préparation de l'environnement cible</h2>
<p>Configuration du serveur cible chez Jokko, installation des stacks techniques, tests de compatibilité.</p>
<h2>Étape 3 : Migration des données</h2>
<p>Transfert des données avec vérification d'intégrité. Mise en place d'une synchronisation temps réel pendant la période de bascule.</p>
<h2>Étape 4 : Bascule DNS</h2>
<p>Modification du pointage DNS avec TTL réduit. Période de propagation de 1 à 24h selon les registrars.</p>
<h2>Étape 5 : Validation et monitoring</h2>
<p>Tests complets post-migration, mise en place du monitoring, suivi pendant 30 jours.</p>
<p>L'Onboarding Accompagné Jokko couvre l'ensemble de ce processus dès 25 000 FCFA.</p>`,
    },
  }
  return STATIC[slug] || null
}

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  const date = new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <>
      <section style={{ padding: '56px 0 40px', background: 'linear-gradient(135deg,#FFF7EE,#FFE8D0)', borderBottom: '3px solid var(--o)' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ fontSize: '.75rem', color: 'var(--bm)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Link href="/" style={{ color: 'var(--o)' }}>Accueil</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href="/blog" style={{ color: 'var(--o)' }}>Blog</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span>{article.category}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ background: 'var(--obg2)', color: 'var(--od)', fontSize: '.65rem', fontWeight: 800, padding: '3px 10px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {article.category}
            </span>
            <span style={{ fontSize: '.72rem', color: 'var(--bm)' }}>{article.readTime} min de lecture</span>
            <span style={{ fontSize: '.72rem', color: 'var(--bm)' }}>· {date}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>{article.title}</h1>
          <p style={{ fontSize: '1rem', color: 'var(--bs)', lineHeight: 1.7 }}>{article.excerpt}</p>
        </div>
      </section>

      <section style={{ padding: '56px 0 80px', background: '#fff' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />
          <div style={{ marginTop: 48, padding: '28px 24px', background: 'var(--obg)', borderRadius: 'var(--rx)', borderLeft: '4px solid var(--o)' }}>
            <div style={{ fontFamily: 'var(--fd)', fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>Vous avez des questions ?</div>
            <p style={{ fontSize: '.88rem', color: 'var(--bs)', marginBottom: 16 }}>Notre équipe basée à Dakar répond en français, du lundi au vendredi.</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="https://manage.jokko.africa/submitticket.php" target="_blank" rel="noreferrer" className="btn btn-o">Contacter l&apos;équipe →</a>
              <a href="/blog" className="btn btn-ol">Voir tous les articles</a>
            </div>
          </div>
        </div>
        <style>{`.article-body h2 { font-family: var(--fd); font-size: 1.3rem; font-weight: 700; margin: 36px 0 14px; } .article-body p { font-size: .95rem; line-height: 1.8; color: #333; margin-bottom: 16px; }`}</style>
      </section>
    </>
  )
}
