'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function Topbar() {
  return (
    <div style={{ background: 'var(--o)', color: 'rgba(255,255,255,.9)', fontSize: '.72rem', padding: '7px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
          {/* Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href="tel:+221338425735" className="topbar-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18C1.61 2.09 2.5 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l.74-.74a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              +221 33 842 57 35
            </a>
            <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" className="topbar-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Image src="/_assets/logos/logo-whatsapp.png" alt="WhatsApp" width={12} height={12} style={{ objectFit: 'contain' }} />
              +221 77 700 37 37
            </a>
            <a href="mailto:support@jokko.africa" className="topbar-link">support@jokko.africa</a>
          </div>
          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a href="/statut" className="topbar-pill">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', display: 'inline-block', marginRight: 4 }} />
              Statut des services
            </a>
            <a href="https://help.jokko.africa/fr/" target="_blank" rel="noreferrer" className="topbar-pill">Besoin d&apos;aide</a>
            <Link href="/apropos" className="topbar-pill">À propos</Link>
            <Link href="/blog" className="topbar-pill">Blog</Link>
          </div>
        </div>
      </div>
      <style>{`
        .topbar-link { color: rgba(255,255,255,.85); font-weight: 500; transition: color .2s; }
        .topbar-link:hover { color: #fff; }
        .topbar-pill { color: rgba(255,255,255,.85); font-weight: 500; padding: 3px 10px; border-radius: 999px; border: 1px solid rgba(255,255,255,.3); font-size: .7rem; transition: all .2s; white-space: nowrap; }
        .topbar-pill:hover { background: rgba(255,255,255,.15); color: #fff; }
        @media(max-width:768px) { .topbar-link:nth-child(3) { display: none; } }
        @media(max-width:580px) { .topbar-link { display: none !important; } }
      `}</style>
    </div>
  )
}
