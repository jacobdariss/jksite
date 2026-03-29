'use client'
import { useState } from 'react'

function AddonModal({ addon, onClose, color }) {
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 480, maxHeight: '90vh', overflow: 'auto', boxShadow: '0 32px 80px rgba(0,0,0,.25)' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--bd)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color, marginBottom: 2 }}>{addon.category}</div>
            <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.15rem', fontWeight: 700 }}>{addon.name}</h3>
          </div>
          <button onClick={onClose} style={{ background: '#F4F4F6', border: 'none', cursor: 'pointer', width: 32, height: 32, borderRadius: '50%', fontSize: '.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>
        <div style={{ padding: '20px 24px' }}>
          <p style={{ fontSize: '.9rem', color: 'var(--bs)', lineHeight: 1.7, marginBottom: 20 }}>{addon.pitch}</p>
          {addon.features?.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              {addon.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ fontSize: '.84rem', color: 'var(--bs)' }}>{f}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--bd)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'var(--fd)', fontSize: '1.2rem', fontWeight: 700, color }}>{addon.prix}</div>
          <a href="https://manage.jokko.africa/submitticket.php" target="_blank" rel="noreferrer"
            className="btn" style={{ background: color, color: '#fff' }}>Ajouter cet add-on →</a>
        </div>
      </div>
    </div>
  )
}

export default function AddonsSection({ addons, color = 'var(--o)', title = 'Renforcez votre infrastructure', cols = 3 }) {
  const [active, setActive] = useState(null)
  const layout = cols === 2 ? '1fr 1fr' : cols === 4 ? 'repeat(4,1fr)' : 'repeat(3,1fr)'

  return (
    <>
      <section style={{ padding: '60px 0', background: '#fff' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="label" style={{ justifyContent: 'center', color }}>Add-ons</div>
            <h2 className="title">{title}</h2>
          </div>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: layout, gap: 14 }}>
            {addons.map((a, i) => (
              <div key={i} onClick={() => setActive(a)}
                className="hover-lift"
                style={{ border: '1px solid var(--bdl)', borderRadius: 16, padding: '20px 24px', display: 'flex', cursor: 'pointer', gap: 14, alignItems: 'flex-start', background: 'var(--ow)', boxShadow: '0 4px 24px rgba(0,0,0,.06)' }}>
                <div style={{ width: 44, height: 44, minWidth: 44, borderRadius: 12, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: a.iconPath }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '.92rem', fontWeight: 700, marginBottom: 3 }}>{a.name}</h4>
                  <p style={{ fontSize: '.82rem', color: 'var(--bs)', lineHeight: 1.5, marginBottom: 6 }}>{a.desc}</p>
                  <span style={{ fontSize: '.78rem', fontWeight: 700, color }}>{a.prix}</span>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: 14, paddingTop: 11, borderTop: '1px solid rgba(0,0,0,.07)' }}>
                    <span style={{ fontSize: '.75rem', fontWeight: 700, color, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                      En savoir +
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){section .container [style*="repeat(3"]{grid-template-columns:1fr 1fr!important}@media(max-width:600px){grid-template-columns:1fr!important}}`}</style>
      </section>
      {active && <AddonModal addon={active} onClose={() => setActive(null)} color={color} />}
    </>
  )
}
