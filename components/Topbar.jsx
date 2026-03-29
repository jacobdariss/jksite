'use client'
import Link from 'next/link'
import { IconPhone, IconEmail, IconWhatsApp } from './ContactIcons'

export default function Topbar() {
  return (
    <div style={{ background: 'var(--o)', color: 'rgba(255,255,255,.9)', fontSize: '.72rem', padding: '7px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
          {/* Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href="tel:+221338425735" className="topbar-link">
              <IconPhone size={11} /> +221 33 842 57 35
            </a>
            <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" className="topbar-link">
              <IconWhatsApp size={11} /> +221 77 700 37 37
            </a>
            <a href="mailto:support@jokko.africa" className="topbar-link">
              <IconEmail size={11} /> support@jokko.africa
            </a>
          </div>
          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a href="https://statut.jokko.africa" target="_blank" rel="noreferrer" className="topbar-pill">
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
        .topbar-link { color: rgba(255,255,255,.85); font-weight: 500; transition: color .2s; display: inline-flex; align-items: center; gap: 5px; }
        .topbar-link:hover { color: #fff; }
        .topbar-pill { color: rgba(255,255,255,.85); font-weight: 500; padding: 3px 10px; border-radius: 999px; border: 1px solid rgba(255,255,255,.3); font-size: .7rem; transition: all .2s; white-space: nowrap; display: inline-flex; align-items: center; }
        .topbar-pill:hover { background: rgba(255,255,255,.15); color: #fff; }
        @media(max-width:900px) { .topbar-link:nth-child(3) { display: none !important; } }
        @media(max-width:580px) { .topbar-link { display: none !important; } }
      `}</style>
    </div>
  )
}
