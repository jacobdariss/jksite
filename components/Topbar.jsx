'use client'
import Image from 'next/image'

export default function Topbar() {
  return (
    <div className="topbar" style={{ background: '#0D0D0D', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 36 }}>
          {/* Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a href="tel:+221338425735" style={{ color: 'rgba(255,255,255,.65)', fontSize: '.72rem', display: 'flex', alignItems: 'center', gap: 5 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18C1.61 2.09 2.5 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l.74-.74a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              +221 33 842 57 35
            </a>
            <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer"
              style={{ color: 'rgba(255,255,255,.65)', fontSize: '.72rem', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Image src="/_assets/logos/logo-whatsapp.png" alt="WhatsApp" width={12} height={12} style={{ objectFit: 'contain' }} />
              +221 77 700 37 37
            </a>
            <a href="mailto:support@jokko.africa" style={{ color: 'rgba(255,255,255,.65)', fontSize: '.72rem' }}>
              support@jokko.africa
            </a>
          </div>
          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href="/statut" style={{ color: 'rgba(255,255,255,.65)', fontSize: '.72rem', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', display: 'inline-block', boxShadow: '0 0 0 2px rgba(34,197,94,.25)' }} />
              Statut des services
            </a>
            <a href="https://help.jokko.africa/fr/" target="_blank" rel="noreferrer"
              style={{ color: 'rgba(255,255,255,.65)', fontSize: '.72rem' }}>
              Help
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
