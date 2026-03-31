import PartenaireMarketplace from '@/components/PartenaireMarketplace'

export const metadata = {
  title: 'Marketplace Partenaires — Jokko Pro Africa',
  description: "Découvrez les offres et services proposés par les partenaires du réseau Jokko Pro Africa.",
}

export default function MarketplacePage() {
  return (
    <>
      <section style={{ padding: '64px 0 48px', background: 'linear-gradient(135deg,#FFF8ED,#FFF3E0)', borderBottom: '3px solid var(--o)' }}>
        <div className="container">
          <div className="reveal">
            <div style={{ fontSize: '.75rem', color: 'var(--bm)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <a href="/" style={{ color: 'var(--o)' }}>Accueil</a>
              <span style={{ color: '#ccc' }}>›</span>
              <a href="/partenaires" style={{ color: 'var(--o)' }}>Partenaires</a>
              <span style={{ color: '#ccc' }}>›</span>
              <strong>Marketplace</strong>
            </div>
            <div className="label">Marketplace</div>
            <h1 className="title">Les offres de nos partenaires.</h1>
            <p className="subtitle">Services, produits et bundles proposés par le réseau Jokko Pro Africa.</p>
          </div>
        </div>
      </section>
      <section style={{ padding: '64px 0', background: '#fff' }}>
        <div className="container">
          <PartenaireMarketplace defaultView="offers" />
        </div>
      </section>
    </>
  )
}
