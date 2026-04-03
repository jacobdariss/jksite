'use client'
import { useState } from 'react'

export default function FaqSection({ faqs, color = 'var(--o)', ctaTitle, ctaDesc, ctaHref }) {
  const [open, setOpen] = useState(null)
  return (
    <>
      {/* FAQ — fond gris */}
      <section style={{ padding: '72px 0', background: '#F5F5F3' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="label" style={{ justifyContent: 'center', color }}>FAQ</div>
            <h2 className="title">Questions fréquentes</h2>
          </div>
          <div className="faq-segment-grid">
            {faqs.map((f, i) => (
              <div key={i} onClick={() => setOpen(open === i ? null : i)}
                style={{ border: '1px solid var(--bd)', borderRadius: 14, padding: '18px 20px', cursor: 'pointer', background: '#fff', transition: 'box-shadow .2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--sh)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = ''}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, fontSize: '.92rem', gap: 12 }}>
                  <span>{f.q}</span>
                  <span style={{ width: 28, height: 28, minWidth: 28, borderRadius: '50%', background: 'var(--obg2)', color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0, transform: open === i ? 'rotate(45deg)' : '', transition: 'transform .2s' }}>+</span>
                </div>
                {open === i && (
                  <p style={{ fontSize: '.88rem', color: 'var(--bs)', lineHeight: 1.7, marginTop: 10, marginBottom: 0 }} dangerouslySetInnerHTML={{ __html: f.a }} />
                )}
              </div>
            ))}
          </div>
        </div>
        <style>{`.faq-segment-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:900px;margin:0 auto} @media(max-width:768px){.faq-segment-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* CTA Orange */}
      <section style={{ padding: '64px 0', background: '#F5F5F3' }}>
        <div className="container">
          <div className="reveal" style={{ background: 'linear-gradient(135deg,var(--o),var(--ol))', borderRadius: 'var(--rx)', padding: '56px 48px', textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,.08)' }} />
            <div style={{ position: 'absolute', bottom: -30, left: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(0,0,0,.06)' }} />
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, marginBottom: 10, position: 'relative' }}>
              {ctaTitle || "Prêt à lancer votre projet ?"}
            </h2>
            <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.85)', marginBottom: 28, position: 'relative' }}>
              Activez votre hébergement en moins de 24h. <strong>Jokko assume.</strong>
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <a href={ctaHref || "https://manage.jokko.africa/"} target="_blank" rel="noreferrer" className="btn btn-w btn-lg">Espace Client →</a>
              <a href="tel:+221338425735" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.3)' }}>+221 33 842 57 35</a>
              <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.25)' }}>WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
