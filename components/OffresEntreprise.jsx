'use client'
import { useState } from 'react'
import { OffreModal } from './OffreModal'

const PRICING = {
  baobab: {
    m: { val: '12 500', label: 'FCFA / mois',      sub: 'Trimestriel ou annuel disponible' },
    t: { val: '37 500', label: 'FCFA / trimestre',  sub: 'soit 12 500 FCFA/mois' },
    a: { val: '150 000', label: 'FCFA / an',        sub: 'soit 12 500 FCFA/mois · 2 mois offerts' },
  },
  fondation: {
    m: { val: '25 000', label: 'FCFA / mois',      sub: 'Sans engagement minimum' },
    t: { val: '75 000', label: 'FCFA / trimestre',  sub: 'soit 25 000 FCFA/mois' },
    a: { val: '240 000', label: 'FCFA / an',        sub: 'soit 20 000 FCFA/mois — économie 60 000 FCFA', badge: '-20%' },
  },
  savane: {
    m: { val: '35 000', label: 'FCFA / mois',      sub: 'Sans engagement minimum' },
    t: { val: '105 000', label: 'FCFA / trimestre', sub: 'soit 35 000 FCFA/mois' },
    a: { val: '336 000', label: 'FCFA / an',        sub: 'soit 28 000 FCFA/mois — économie 84 000 FCFA', badge: '-20%' },
  },
}

const CARDS = [
  {
    slug: 'baobab',
    name: 'Baobab',
    tagline: "Hébergement pro souverain",
    bg: '#F2F4F8',
    popular: false,
    pid: 4,
    features: [
      '2 vCPU dédiés · 4 Go RAM · 40 Go NVMe',
      '500 Go trafic · Domaine .SN inclus',
      'Backups quotidiens · SSL',
      'SLA 99,9% · Support 8h/5j',
      'Évolution fluide vers Savane',
    ],
  },
  {
    slug: 'fondation',
    name: 'Fondation',
    tagline: 'PaaS managé, zéro gestion infra',
    bg: '#E8EBF4',
    popular: true,
    popularLabel: 'Recommandé',
    pid: 5,
    features: [
      '2 vCPU dédiés · 4 Go RAM · 50 Go NVMe',
      'Multi-stacks Node, Python, PHP, Java',
      'Déploiement Git intégré · SSL',
      'SLA 99,9% · Support 8h/5j',
      'Alternative locale à Heroku / Render',
    ],
  },
  {
    slug: 'savane',
    name: 'Savane',
    tagline: 'Cloud privé, votre contrôle',
    bg: '#F2F4F8',
    popular: false,
    pid: 6,
    features: [
      '4 vCPU dédiés · 8 Go RAM · 100 Go NVMe',
      '1 To trafic · VPC dédié isolé',
      'Firewall dédié + snapshots',
      'SLA 99,9% · Scalable à la demande',
      'Support prioritaire + référent technique',
    ],
  },
]

const CHECK = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const INFO = (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)

const PERIODS = [
  { key: 'm', label: 'Mensuel' },
  { key: 't', label: 'Trimestriel' },
  { key: 'a', label: 'Annuel' },
]

export default function OffresEntreprise() {
  const [period, setPeriod] = useState('m')
  const [modalSlug, setModalSlug] = useState(null)

  return (
    <>
      <section id="offres" style={{ padding: '72px 0', background: 'var(--ow)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 4 }}>
            <div className="label" style={{ justifyContent: 'center', color: 'var(--b)' }}>Nos offres</div>
            <h2 className="title">3 offres pour produire en confiance</h2>
            <p style={{ fontSize: '.92rem', color: 'var(--bs)', maxWidth: 500, margin: '8px auto 0' }}>
              SLA contractuel, support réactif, zéro stress technique.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 36px' }}>
            <div style={{ display: 'inline-flex', background: '#F0F0F4', borderRadius: 30, padding: 4, gap: 2 }}>
              {PERIODS.map(p => (
                <button key={p.key} onClick={() => setPeriod(p.key)} style={{
                  padding: '8px 20px', borderRadius: 26, border: 'none', cursor: 'pointer',
                  fontSize: '.82rem', fontWeight: 600, transition: 'all .2s', whiteSpace: 'nowrap',
                  background: period === p.key ? '#fff' : 'transparent',
                  color: period === p.key ? '#0D0D0D' : '#888',
                  boxShadow: period === p.key ? '0 2px 8px rgba(0,0,0,.12)' : 'none',
                }}>{p.label}</button>
              ))}
            </div>
          </div>

          <div className="entreprise-cards-grid">
            {CARDS.map(card => {
              const p = PRICING[card.slug][period]
              return (
                <div key={card.slug} style={{ position: 'relative' }}>
                  <div style={{
                    border: card.popular ? '2px solid #E85D04' : 'none',
                    borderRadius: card.popular ? 18 : 0,
                  }}>
                    {card.popular && (
                      <div style={{
                        position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                        background: '#E85D04', color: '#fff', fontSize: '.62rem', fontWeight: 800,
                        textTransform: 'uppercase', letterSpacing: '1px',
                        padding: '4px 14px', borderRadius: 20, whiteSpace: 'nowrap', zIndex: 2,
                      }}>{card.popularLabel}</div>
                    )}
                    <div className="hover-lift" style={{
                      background: card.bg, borderRadius: 16, padding: '28px 24px',
                      display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box',
                      boxShadow: '0 4px 24px rgba(0,0,0,.08), 0 1px 4px rgba(0,0,0,.04)',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
                        <button onClick={() => setModalSlug(card.slug)} style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          background: '#E85D0412', border: '1px solid #E85D0430',
                          color: '#E85D04', fontSize: '.72rem', fontWeight: 700,
                          padding: '5px 12px', borderRadius: 20, cursor: 'pointer',
                        }}>{INFO} En savoir +</button>
                      </div>

                      <div style={{ marginBottom: 18 }}>
                        <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.25rem', fontWeight: 700, color: '#0D0D0D', margin: '0 0 4px' }}>{card.name}</h3>
                        <div style={{ fontSize: '.8rem', color: '#888' }}>{card.tagline}</div>
                      </div>

                      <div style={{ marginBottom: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: 'var(--fd)', fontSize: '2rem', fontWeight: 700, color: '#E85D04', lineHeight: 1 }}>{p.val}</span>
                          <span style={{ fontSize: '.82rem', fontWeight: 600, color: '#888' }}>{p.label}</span>
                          {p.badge && <span style={{ fontSize: '.65rem', fontWeight: 800, padding: '3px 8px', borderRadius: 20, background: '#E85D04', color: '#fff' }}>{p.badge}</span>}
                        </div>
                        <div style={{ fontSize: '.75rem', color: '#aaa', marginTop: 4 }}>{p.sub}</div>
                      </div>

                      <div style={{ flex: 1, padding: '16px 0', borderTop: '1px solid rgba(0,0,0,.08)', marginTop: 12, marginBottom: 16 }}>
                        {card.features.map((f, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 0', borderBottom: '1px solid rgba(0,0,0,.05)' }}>
                            {CHECK}
                            <span style={{ fontSize: '.84rem', color: '#333', lineHeight: 1.4 }}>{f}</span>
                          </div>
                        ))}
                      </div>

                      <a href={`https://manage.jokko.africa/cart.php?a=add&pid=${card.pid}`} target="_blank" rel="noreferrer"
                        style={{ display: 'block', textAlign: 'center', padding: '13px 20px', background: '#E85D04', color: '#fff', fontWeight: 700, fontSize: '.88rem', borderRadius: 10, textDecoration: 'none' }}>
                        Commander {card.name}
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <style>{`
          .entreprise-cards-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; align-items: stretch; }
          @media(max-width:900px) { .entreprise-cards-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {modalSlug && <OffreModal slug={modalSlug} onClose={() => setModalSlug(null)} />}
    </>
  )
}
