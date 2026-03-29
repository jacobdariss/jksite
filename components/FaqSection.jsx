'use client'
import { useState } from 'react'

export default function FaqSection({ faqs, color = 'var(--o)' }) {
  const [open, setOpen] = useState(null)
  return (
    <section style={{ padding: '60px 0', background: 'var(--ow)' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
          <div className="label" style={{ justifyContent: 'center', color }}>FAQ</div>
          <h2 className="title">Questions fréquentes</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxWidth: 900, margin: '0 auto' }}>
          {faqs.map((f, i) => (
            <div key={i} onClick={() => setOpen(open === i ? null : i)}
              style={{ border: '1px solid var(--bd)', borderRadius: 12, padding: '18px 20px', cursor: 'pointer', background: '#fff', transition: 'box-shadow .2s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--sh)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = ''}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, fontSize: '.92rem', gap: 12 }}>
                <span>{f.q}</span>
                <span style={{ color, fontSize: '1.2rem', flexShrink: 0, transform: open === i ? 'rotate(45deg)' : '', transition: 'transform .2s' }}>+</span>
              </div>
              {open === i && (
                <p style={{ fontSize: '.88rem', color: 'var(--bs)', lineHeight: 1.7, marginTop: 10 }} dangerouslySetInnerHTML={{ __html: f.a }} />
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){section .container [style*="1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
