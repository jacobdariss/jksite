'use client'
import { useState } from 'react'
import { OffreModal } from './OffreModal'

export default function OffresSection({ offres, config }) {
  const [period, setPeriod] = useState('mensuel')
  const [modalSlug, setModalSlug] = useState(null)

  const {
    title, subtitle, color, hasPeriodToggle, periodLabel,
    ctaLabel, ctaHref, ressourceBg, ressourceColor, checkColor,
    showInclusLabel,
  } = config

  const getPrix = (o) => {
    if (!hasPeriodToggle) return o.prix
    return typeof o.prix === 'object' ? (o.prix[period] || o.prix.mensuel) : o.prix
  }

  const delays = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3']

  return (
    <>
      <section id="offres" style={{ padding: '72px 0', background: '#fff' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="label" style={{ justifyContent: 'center', color }}>Nos offres</div>
            <h2 className="title">{title}</h2>
            {subtitle && <p className="subtitle" style={{ margin: '0 auto' }}>{subtitle}</p>}

            {hasPeriodToggle && (
              <div style={{ display: 'inline-flex', background: 'var(--obg)', borderRadius: 999, padding: 4, marginTop: 24, gap: 4 }}>
                {[
                  { key: 'mensuel', label: 'Mensuel' },
                  { key: 'annuel', label: periodLabel || 'Annuel' },
                ].map(p => (
                  <button key={p.key} onClick={() => setPeriod(p.key)} style={{
                    padding: '8px 20px', borderRadius: 999, border: 'none', cursor: 'pointer',
                    fontSize: '.85rem', fontWeight: 600,
                    background: period === p.key ? '#fff' : 'transparent',
                    color: period === p.key ? 'var(--b)' : 'var(--bm)',
                    boxShadow: period === p.key ? '0 2px 8px rgba(0,0,0,.08)' : 'none',
                    transition: 'all .2s',
                  }}>{p.label}</button>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {offres.map((o, idx) => {
              const prix = getPrix(o)
              const isRecommended = o.badge === 'Recommandé'

              return (
                <div key={o.slug}
                  className={`hover-lift reveal ${delays[idx] || ''}`}
                  style={{
                    background: '#fff',
                    border: `${isRecommended ? 2 : 1}px solid`,
                    borderColor: isRecommended ? color : 'var(--bd)',
                    borderRadius: 'var(--rx)',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  {isRecommended && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: color }} />}
                  {o.badge && (
                    <div style={{
                      position: 'absolute', top: isRecommended ? 16 : 12, right: 12,
                      background: color, color: '#fff',
                      fontSize: '.65rem', fontWeight: 800, padding: '3px 10px', borderRadius: 999,
                    }}>{o.badge}</div>
                  )}

                  <div style={{ padding: '28px 24px 20px', paddingTop: isRecommended ? 32 : 28 }}>
                    <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.3rem', fontWeight: 700, marginBottom: 4 }}>{o.nom}</h3>
                    <p style={{ fontSize: '.82rem', color: 'var(--bm)', marginBottom: 20 }}>{o.tagline}</p>

                    <div style={{ fontFamily: 'var(--fd)', fontSize: '2.2rem', fontWeight: 700, color, marginBottom: 4 }}>
                      {prix} <span style={{ fontSize: '.9rem', fontWeight: 400, color: 'var(--bm)' }}>FCFA/mois</span>
                    </div>
                    {hasPeriodToggle && period === 'annuel' && (
                      <div style={{ fontSize: '.72rem', color: 'var(--o)', fontWeight: 700, marginBottom: 4 }}>-20% vs mensuel</div>
                    )}
                    <div style={{ fontSize: '.72rem', color: 'var(--bm)', marginBottom: 20 }}>{o.periode}</div>

                    {o.ressources?.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                        {o.ressources.map((r, i) => (
                          <span key={i} style={{ background: ressourceBg, color: ressourceColor, fontSize: '.68rem', fontWeight: 700, padding: '3px 8px', borderRadius: 999 }}>{r}</span>
                        ))}
                      </div>
                    )}

                    {o.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={checkColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        <span style={{ fontSize: '.84rem', color: 'var(--bs)' }}>{f}</span>
                      </div>
                    ))}

                    {showInclusLabel && (
                      <div style={{ marginTop: 16, padding: '10px 14px', background: `${color}14`, borderRadius: 8, fontSize: '.75rem', color, fontWeight: 600 }}>
                        ✓ Priorité · Référent Dédié · Astreinte 24/7 · Revue Stratégique inclus
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '16px 24px 24px', display: 'flex', gap: 8 }}>
                    <a href={ctaHref} target="_blank" rel="noreferrer"
                      className="btn"
                      style={{ flex: 1, justifyContent: 'center', background: color, color: '#fff', borderRadius: 999, padding: '10px 22px', fontSize: '.88rem', fontWeight: 700 }}>
                      {ctaLabel}
                    </a>
                    <button onClick={() => setModalSlug(o.slug)}
                      className="btn"
                      style={{ flexShrink: 0, background: 'transparent', color, border: `1.5px solid ${color}`, borderRadius: 999, padding: '10px 16px', fontSize: '.88rem', fontWeight: 700, cursor: 'pointer' }}>
                      En savoir +
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <style>{`@media(max-width:900px){#offres .container>div:last-child{grid-template-columns:1fr!important}}`}</style>
      </section>

      {modalSlug && <OffreModal slug={modalSlug} onClose={() => setModalSlug(null)} />}
    </>
  )
}
