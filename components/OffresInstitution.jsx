'use client'
import { useState } from 'react'
import { OffreModal } from './OffreModal'

const P = '#6B4C9A'

const PRICING = {
  heritage: {
    m: { val: '25 000', label: 'FCFA / mois',     sub: 'Engagement annuel · 300 000 FCFA/an' },
    t: { val: '75 000', label: 'FCFA / trimestre', sub: 'soit 25 000 FCFA/mois' },
    a: { val: '300 000', label: 'FCFA / an',       sub: 'soit 25 000 FCFA/mois · 2 mois offerts' },
  },
  forteresse: {
    m: { val: '45 000', label: 'FCFA / mois',     sub: 'Engagement annuel · 540 000 FCFA/an' },
    t: { val: '135 000', label: 'FCFA / trimestre', sub: 'soit 45 000 FCFA/mois' },
    a: { val: '540 000', label: 'FCFA / an',       sub: 'soit 45 000 FCFA/mois · 2 mois offerts' },
  },
  kilimandjaro: {
    m: { val: '85 000', label: 'FCFA / mois',     sub: 'Config. sur mesure — devis personnalisé' },
    t: { val: 'Sur devis', label: '',              sub: 'Configuration sur mesure' },
    a: { val: 'Sur devis', label: '',              sub: 'Configuration sur mesure' },
  },
}

const CARDS = [
  {
    slug: 'heritage',
    name: 'Héritage',
    tagline: 'Archivage souverain certifié',
    bg: '#F8F4FF',
    popular: false,
    cta: { label: 'Commander Héritage', href: 'https://manage.jokko.africa/cart.php?a=add&pid=7' },
    features: [
      '500 Go chiffré AES-256',
      'Réplication multi-site Sénégal',
      'Conformité APDP',
      "Rapports d'audit trimestriels",
      'SLA 99,95% + pénalités · 24/7',
    ],
  },
  {
    slug: 'forteresse',
    name: 'Forteresse',
    tagline: 'Plan de reprise certifié',
    bg: '#F0E8FF',
    popular: true,
    cta: { label: 'Commander Forteresse', href: 'https://manage.jokko.africa/cart.php?a=add&pid=8' },
    features: [
      'PRA documenté et testé 2×/an',
      'RTO < 4h / RPO < 1h',
      'Basculement automatique',
      'Monitoring 24/7 + IA Ops',
      'Référent dédié nommé',
    ],
  },
  {
    slug: 'kilimandjaro',
    name: 'Kilimandjaro',
    tagline: 'Bare metal, zéro compromis',
    bg: '#F8F4FF',
    popular: false,
    cta: { label: 'Demander un devis', href: 'https://manage.jokko.africa/submitticket.php?step=2&deptid=1&subject=Demande%20Kilimandjaro' },
    features: [
      '8 CPU physiques · 32 Go ECC RAM',
      '500 Go NVMe RAID · 5 To trafic',
      'Serveur physique dédié HA',
      'VDC inclus · Support 24/7',
      'SLA 99,95% + pénalités',
    ],
  },
]

const PERIODS = [
  { key: 'm', label: 'Mensuel' },
  { key: 't', label: 'Trimestriel' },
  { key: 'a', label: 'Annuel' },
]

const Check = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)

export default function OffresInstitution() {
  const [period, setPeriod] = useState('m')
  const [modalSlug, setModalSlug] = useState(null)

  return (
    <>
      <section id="offres" style={{ padding: '72px 0', background: 'var(--ow)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 4 }}>
            <div className="label" style={{ justifyContent: 'center', color: P }}>Nos offres</div>
            <h2 className="title">3 offres pour la souveraineté totale</h2>
            <p style={{ fontSize: '.92rem', color: 'var(--bs)', maxWidth: 500, margin: '8px auto 0' }}>
              SLA avec pénalités, PRA testé, support 24/7 dédié.
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

          <div className="institution-cards-grid">
            {CARDS.map(card => {
              const pr = PRICING[card.slug][period]
              return (
                <div key={card.slug} style={{ position: 'relative' }}>
                  <div style={{
                    border: card.popular ? `2px solid ${P}` : 'none',
                    borderRadius: card.popular ? 18 : 0,
                  }}>
                    {card.popular && (
                      <div style={{
                        position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                        background: P, color: '#fff', fontSize: '.62rem', fontWeight: 800,
                        textTransform: 'uppercase', letterSpacing: '1px',
                        padding: '4px 14px', borderRadius: 20, whiteSpace: 'nowrap', zIndex: 2,
                      }}>Recommandé</div>
                    )}
                    <div className="hover-lift" style={{
                      background: card.bg, borderRadius: 16, padding: '28px 24px',
                      display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box',
                      boxShadow: '0 4px 24px rgba(0,0,0,.08), 0 1px 4px rgba(0,0,0,.04)',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
                        <button onClick={() => setModalSlug(card.slug)} style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          background: `${P}12`, border: `1px solid ${P}30`,
                          color: P, fontSize: '.72rem', fontWeight: 700,
                          padding: '5px 12px', borderRadius: 20, cursor: 'pointer',
                        }}><InfoIcon /> En savoir +</button>
                      </div>

                      <div style={{ marginBottom: 18 }}>
                        <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.25rem', fontWeight: 700, color: '#0D0D0D', margin: '0 0 4px' }}>{card.name}</h3>
                        <div style={{ fontSize: '.8rem', color: '#888' }}>{card.tagline}</div>
                      </div>

                      <div style={{ marginBottom: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: 'var(--fd)', fontSize: '2rem', fontWeight: 700, color: P, lineHeight: 1 }}>{pr.val}</span>
                          {pr.label && <span style={{ fontSize: '.82rem', fontWeight: 600, color: '#888' }}>{pr.label}</span>}
                        </div>
                        <div style={{ fontSize: '.75rem', color: '#aaa', marginTop: 4 }}>{pr.sub}</div>
                      </div>

                      <div style={{ flex: 1, padding: '16px 0', borderTop: '1px solid rgba(0,0,0,.08)', marginTop: 12, marginBottom: 16 }}>
                        {card.features.map((f, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 0', borderBottom: '1px solid rgba(0,0,0,.05)' }}>
                            <Check />
                            <span style={{ fontSize: '.84rem', color: '#333', lineHeight: 1.4 }}>{f}</span>
                          </div>
                        ))}
                      </div>

                      <a href={card.cta.href} target="_blank" rel="noreferrer"
                        style={{ display: 'block', textAlign: 'center', padding: '13px 20px', background: P, color: '#fff', fontWeight: 700, fontSize: '.88rem', borderRadius: 10, textDecoration: 'none' }}>
                        {card.cta.label}
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <style>{`
          .institution-cards-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; align-items: stretch; }
          @media(max-width:900px) { .institution-cards-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {modalSlug && <OffreModal slug={modalSlug} onClose={() => setModalSlug(null)} />}
    </>
  )
}
