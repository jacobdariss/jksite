import Link from 'next/link'

const LEGAL_LINKS = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/cgu', label: 'CGS' },
  { href: '/politique-confidentialite', label: 'Confidentialité' },
  { href: '/droits-domaine', label: 'Droits domaine' },
]

export default function LegalPage({ title, subtitle, children }) {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg,#FFF7EE,#FFE8D0)', padding: '48px 0 36px', borderBottom: '3px solid var(--o)' }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ fontSize: '.75rem', color: 'var(--bm)', marginBottom: 10 }}>
            <Link href="/" style={{ color: 'var(--o)' }}>Accueil</Link> / {title}
          </div>
          <div className="label">Documents légaux</div>
          <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 700, marginBottom: 8 }}>{title}</h1>
          {subtitle && <p style={{ fontSize: '.88rem', color: 'var(--bs)' }}>{subtitle}</p>}
        </div>
      </section>

      {/* Nav légale */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--bd)', position: 'sticky', top: 64, zIndex: 50 }}>
        <div className="container" style={{ maxWidth: 860, display: 'flex', gap: 0, overflowX: 'auto' }}>
          {LEGAL_LINKS.map(l => (
            <Link key={l.href} href={l.href} style={{
              padding: '12px 20px', fontSize: '.82rem', fontWeight: 600,
              color: 'var(--bm)', borderBottom: '2px solid transparent',
              whiteSpace: 'nowrap', transition: 'all .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--o)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--bm)'}
            >{l.label}</Link>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container legal-body" style={{ maxWidth: 860, padding: '48px 24px 80px' }}>
        {children}
      </div>

      {/* Contact block */}
      <div className="container" style={{ maxWidth: 860, paddingBottom: 64 }}>
        <div style={{ background: '#FFF7EE', borderRadius: 16, padding: '28px 24px', borderLeft: '4px solid var(--o)' }}>
          <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1rem', fontWeight: 700, color: 'var(--o)', marginBottom: 12 }}>Contact</h3>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: '.88rem', color: 'var(--bs)' }}>
            <a href="tel:+221338425735" style={{ color: 'var(--o)', fontWeight: 600 }}>+221 33 842 57 35</a>
            <a href="https://wa.me/221777003737" style={{ color: 'var(--o)', fontWeight: 600 }}>WhatsApp : +221 77 700 37 37</a>
            <a href="mailto:support@jokko.africa" style={{ color: 'var(--o)', fontWeight: 600 }}>support@jokko.africa</a>
            <span>Mermoz VDN Dakar, Immeuble Zanardo, Sénégal</span>
          </div>
        </div>
      </div>

      <style>{`
        .legal-body h2 { font-family: var(--fd); font-size: 1.15rem; font-weight: 700; color: var(--b); margin: 36px 0 12px; padding-bottom: 8px; border-bottom: 2px solid var(--bdl); }
        .legal-body h3 { font-size: .95rem; font-weight: 700; color: var(--o); margin: 20px 0 8px; }
        .legal-body p { font-size: .9rem; line-height: 1.8; color: #333; margin-bottom: 14px; }
        .legal-body ul { padding-left: 20px; margin-bottom: 14px; }
        .legal-body ul li { font-size: .9rem; line-height: 1.8; color: #333; margin-bottom: 6px; }
        .legal-body a { color: var(--o); text-decoration: underline; }
        .legal-body strong { color: var(--b); }
      `}</style>
    </>
  )
}
