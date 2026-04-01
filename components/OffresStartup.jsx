'use client'
import { useState } from 'react'
import { OffreModal } from './OffreModal'

const PRICING = {
  racine: {
    m:  { val: '2 000', label: 'FCFA / mois',      sub: 'Engagement mensuel · résiliable' },
    t:  { val: '6 000', label: 'FCFA / trimestre',  sub: 'soit 2 000 FCFA/mois' },
    a:  { val: '24 000', label: 'FCFA / an',        sub: 'soit 2 000 FCFA/mois · 2 mois offerts' },
  },
  sahara: {
    m:  { val: '4 000', label: 'FCFA / mois',      sub: 'Sans engagement minimum' },
    t:  { val: '12 000', label: 'FCFA / trimestre', sub: 'soit 4 000 FCFA/mois' },
    a:  { val: '48 000', label: 'FCFA / an',        sub: 'soit 4 000 FCFA/mois · 2 mois offerts' },
  },
  teranga: {
    m:  { val: '5 000', label: 'FCFA / mois',      sub: 'Engagement annuel' },
    t:  { val: '15 000', label: 'FCFA / trimestre', sub: 'soit 5 000 FCFA/mois' },
    a:  { val: '60 000', label: 'FCFA / an',        sub: 'soit 5 000 FCFA/mois · 2 mois offerts' },
  },
}

const CARDS = [
  {
    slug: 'racine',
    name: 'Racine',
    tagline: 'Votre premier site, zéro stress',
    bg: '#FFF7EE',
    popular: false,
    pid: 142,
    features: [
      '1 vCPU · 1 Go RAM · 10 Go SSD',
      '100 Go trafic · SSL inclus',
      'Activation en moins de 24h',
      'Support email J+1 · SLA 99,5%',
      'Évolution vers Sahara sans migration',
    ],
  },
  {
    slug: 'sahara',
    name: 'Sahara',
    tagline: 'WordPress optimisé, trafic garanti',
    bg: '#FFF0DC',
    popular: true,
    pid: 143,
    features: [
      '1 vCPU · 2 Go RAM · 20 Go NVMe',
      '200 Go trafic · WordPress préinstallé',
      'Cache LiteSpeed + CDN Afrique',
      'SEO technique intégré',
      'Évolution vers Baobab sans migration',
    ],
  },
  {
    slug: 'teranga',
    name: 'Téranga',
    tagline: 'Cloud solidaire — ONG & Associations',
    bg: '#FFF7EE',
    popular: false,
    pid: 144,
    features: [
      '2 vCPU · 2 Go RAM · 30 Go SSD',
      '300 Go trafic · Multi-sites (3 projets)',
      'Backups hebdomadaires',
      'Support dédié ONG/ESS',
      'Tarif solidaire',
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


// Merge données Strapi avec données statiques
function formatPrix(n) {
  if (!n) return null
  return Number(n).toLocaleString('fr-FR')
}

function mergeCards(staticCards, offres, PRICING) {
  if (!offres || offres.length === 0) return { cards: staticCards, pricing: PRICING }
  
  const newPricing = { ...PRICING }
  
  const cards = staticCards.map(card => {
    // Matcher par slug (stable) plutôt que par nom (peut changer)
    const o = offres.find(o => o.slug === card.slug)
    if (!o) return card
    
    // Mise à jour des prix dans PRICING
    if (o.prix && newPricing[card.slug]) {
      const mensuel = o.prix.mensuel
      const annuel  = o.prix.annuel
      if (mensuel) {
        newPricing[card.slug] = {
          ...newPricing[card.slug],
          m: { ...newPricing[card.slug].m, val: mensuel },
          t: { ...newPricing[card.slug].t },
          a: { ...newPricing[card.slug].a, val: annuel || mensuel },
        }
      }
    }
    
    return {
      ...card,
      name:     o.nom     || card.name,
      tagline:  o.tagline || card.tagline,
      features: Array.isArray(o.features) && o.features.length ? o.features : card.features,
      pid: o.pid ?? card.pid,
    }
  })
  
  return { cards, pricing: newPricing }
}

export default function OffresStartup({ offres = [] }) {
  const [period, setPeriod] = useState('m')
  const { cards: MERGED_CARDS, pricing: MERGED_PRICING } = mergeCards(CARDS, offres, PRICING)
  const [modalSlug, setModalSlug] = useState(null)
  const [modalOffre, setModalOffre] = useState(null)

  const PERIODS = [
    { key: 'm', label: 'Mensuel' },
    { key: 't', label: 'Trimestriel' },
    { key: 'a', label: 'Annuel' },
  ]

  return (
    <>
      <section id="offres" style={{ padding: '72px 0', background: '#FAFAF8' }}>
        <div className="container">
          {/* Header */}
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 4 }}>
            <div className="label" style={{ justifyContent: 'center', color: 'var(--o)' }}>Nos offres</div>
            <h2 className="title">3 offres pour lancer et grandir</h2>
            <p style={{ fontSize: '.92rem', color: 'var(--bs)', maxWidth: 500, margin: '8px auto 0' }}>
              Zéro stress technique. Concentrez-vous sur votre activité.
            </p>
          </div>

          {/* Toggle */}
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

          {/* Cards */}
          <div className="startup-cards-grid">
            {MERGED_CARDS.map(card => {
              const p = MERGED_PRICING[card.slug]?.[period] || PRICING[card.slug][period]
              return (
                <div key={card.slug} style={{ position: 'relative' }}>
                  {/* Popular border wrapper */}
                  <div style={{
                    border: card.popular ? '2px solid #E85D04' : 'none',
                    borderRadius: card.popular ? 18 : 0,
                    overflow: card.popular ? 'visible' : 'visible',
                  }}>
                    {card.popular && (
                      <div style={{
                        position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                        background: '#E85D04', color: '#fff', fontSize: '.62rem', fontWeight: 800,
                        textTransform: 'uppercase', letterSpacing: '1px',
                        padding: '4px 14px', borderRadius: 20, whiteSpace: 'nowrap', zIndex: 2,
                      }}>Populaire</div>
                    )}

                    <div className="hover-lift" style={{
                      background: card.bg,
                      borderRadius: card.popular ? 16 : 16,
                      padding: '28px 24px',
                      display: 'flex', flexDirection: 'column',
                      height: '100%', boxSizing: 'border-box',
                      boxShadow: '0 4px 24px rgba(0,0,0,.08), 0 1px 4px rgba(0,0,0,.04)',
                    }}>
                      {/* En savoir + */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
                        <button onClick={() => { setModalSlug(card.slug); setModalOffre(card) }} style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          background: '#E85D0412', border: '1px solid #E85D0430',
                          color: '#E85D04', fontSize: '.72rem', fontWeight: 700,
                          padding: '5px 12px', borderRadius: 20, cursor: 'pointer',
                        }}>
                          {INFO} En savoir +
                        </button>
                      </div>

                      {/* Title */}
                      <div style={{ marginBottom: 18 }}>
                        <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.25rem', fontWeight: 700, color: '#0D0D0D', margin: '0 0 4px' }}>{card.name}</h3>
                        <div style={{ fontSize: '.8rem', color: '#888' }}>{card.tagline}</div>
                      </div>

                      {/* Price */}
                      <div style={{ marginBottom: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: 'var(--fd)', fontSize: '2rem', fontWeight: 700, color: '#E85D04', lineHeight: 1 }}>{p.val}</span>
                          <span style={{ fontSize: '.82rem', fontWeight: 600, color: '#888' }}>{p.label}</span>
                        </div>
                        <div style={{ fontSize: '.75rem', color: '#aaa', marginTop: 4 }}>{p.sub}</div>
                      </div>

                      {/* Features */}
                      <div style={{ flex: 1, padding: '16px 0', borderTop: '1px solid rgba(0,0,0,.08)', marginTop: 12, marginBottom: 16 }}>
                        {card.features.map((f, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 0', borderBottom: '1px solid rgba(0,0,0,.05)' }}>
                            {CHECK}
                            <span style={{ fontSize: '.84rem', color: '#333', lineHeight: 1.4 }}>{f}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
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
          .startup-cards-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; align-items: stretch; }
          @media(max-width:900px) { .startup-cards-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {modalSlug && <OffreModal slug={modalSlug} offre={modalOffre} onClose={() => { setModalSlug(null); setModalOffre(null) }} />}
    </>
  )
}
