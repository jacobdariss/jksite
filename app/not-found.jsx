import Link from 'next/link'

export const metadata = {
  title: '404 — Page introuvable | Jokko Pro Africa',
}

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #FFF8F0 0%, #FFF3E0 50%, #FFF8F0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      fontFamily: 'var(--fs)',
    }}>
      <div style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>

        {/* 404 illustré */}
        <div style={{ position: 'relative', marginBottom: 32 }}>
          <div style={{
            fontFamily: 'var(--fd)',
            fontSize: 'clamp(7rem, 18vw, 12rem)',
            fontWeight: 900,
            lineHeight: 1,
            background: 'linear-gradient(135deg, #E85D04, #FF9A3C)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            userSelect: 'none',
            letterSpacing: '-4px',
          }}>
            404
          </div>
          <div style={{
            position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
            background: '#fff', border: '2px solid var(--obg2)', borderRadius: 12,
            padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: '.72rem', fontWeight: 700, color: 'var(--o)', whiteSpace: 'nowrap',
            boxShadow: '0 4px 16px rgba(232,93,4,.12)',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
              <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
            </svg>
            Page introuvable
          </div>
        </div>

        {/* Titre + description */}
        <div style={{ marginTop: 40, marginBottom: 36 }}>
          <h1 style={{
            fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
            fontWeight: 700, color: '#0D0D0D', marginBottom: 12, lineHeight: 1.3,
          }}>
            Cette page n&apos;existe pas.
          </h1>
          <p style={{ fontSize: '.95rem', color: 'var(--bs)', lineHeight: 1.7, maxWidth: 400, margin: '0 auto' }}>
            Elle a peut-être été déplacée, renommée ou supprimée.
            Notre infrastructure, elle, fonctionne à <strong>99,95%</strong> — mais les URLs, c&apos;est votre responsabilité. 😄
          </p>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <Link href="/" className="btn btn-o btn-lg">← Retour à l&apos;accueil</Link>
          <Link href="/startup" className="btn btn-ol btn-lg">Voir nos offres</Link>
          <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" className="btn btn-lg"
            style={{ background: '#fff', border: '1.5px solid var(--bd)', color: 'var(--b)' }}>
            WhatsApp
          </a>
        </div>

        {/* Liens rapides */}
        <div style={{
          background: '#fff', border: '1px solid var(--bd)', borderRadius: 16,
          padding: '16px 24px', display: 'flex', flexWrap: 'nowrap', gap: '8px 20px',
          justifyContent: 'center', alignItems: 'center', overflowX: 'auto',
        }}>
          {[
            { label: 'Startup', href: '/startup' },
            { label: 'Entreprise', href: '/entreprise' },
            { label: 'Institution', href: '/institution' },
            { label: 'Services', href: '/services' },
            { label: 'Partenaires', href: '/partenaires' },
            { label: 'Blog', href: '/blog' },
            { label: 'À propos', href: '/apropos' },
          ].map(l => (
            <Link key={l.href} href={l.href}
              style={{ fontSize: '.84rem', fontWeight: 600, color: 'var(--o)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Footer minimaliste */}
        <p style={{ marginTop: 32, fontSize: '.72rem', color: 'var(--bm)' }}>
          © 2026 Jokko Pro Africa — DARISS CONSULTING SAS, Dakar, Sénégal
        </p>
      </div>
    </div>
  )
}
