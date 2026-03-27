'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/startup', label: 'Startup' },
  { href: '/entreprise', label: 'Entreprise' },
  { href: '/institution', label: 'Institution' },
  { href: '/services', label: 'Services' },
  { href: '/partenaires', label: 'Partenaires' },
  { href: '/blog', label: 'Blog' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #EBEBEB',
        height: 64,
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Image src="/_assets/logos/jokko-icon.png" alt="Jokko" width={36} height={36} style={{ objectFit: 'contain' }} />
            <div>
              <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.1rem', lineHeight: 1 }}>
                Jokko<span style={{ color: 'var(--o)' }}>Pro</span>
              </div>
              <div style={{ fontSize: '.55rem', color: '#bbb', fontWeight: 600, letterSpacing: '.8px', textTransform: 'uppercase' }}>
                AFRICA · CLOUD SOUVERAIN
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="hidden-mobile">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} style={{
                fontSize: '.85rem', fontWeight: 500, padding: '6px 12px', borderRadius: 999,
                color: pathname === l.href ? 'var(--o)' : '#444',
                background: pathname === l.href ? 'var(--obg)' : 'transparent',
                transition: 'all .2s',
              }}>{l.label}</Link>
            ))}
            {/* Market Place */}
            <span style={{
              fontSize: '.85rem', fontWeight: 500, padding: '6px 12px', borderRadius: 999,
              color: '#bbb', cursor: 'default', display: 'flex', alignItems: 'center', gap: 5
            }}>
              Market Place
              <span style={{ fontSize: '.55rem', fontWeight: 800, background: 'var(--o)', color: '#fff', padding: '1px 6px', borderRadius: 8 }}>SOON</span>
            </span>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="hidden-mobile">
            <a href="https://manage.jokko.africa/" target="_blank" rel="noreferrer" className="btn btn-ol btn-sm">Espace Client</a>
            <a href="https://connect.jokko.africa/" target="_blank" rel="noreferrer" className="btn btn-o btn-sm">Jokko Connect</a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="show-mobile"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}
            aria-label="Menu"
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 2.5,
                background: '#0D0D0D', borderRadius: 2,
                transition: '.3s',
                transform: open ? (i===0 ? 'rotate(45deg) translate(5px,5px)' : i===2 ? 'rotate(-45deg) translate(5px,-5px)' : 'scaleX(0)') : 'none',
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(0,0,0,.4)' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'absolute', top: 0, right: 0, width: 300, maxWidth: '85vw',
              height: '100%', background: '#fff', padding: '80px 24px 32px',
              overflowY: 'auto', boxShadow: '-4px 0 24px rgba(0,0,0,.12)',
            }}
          >
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                display: 'block', padding: '12px 0', fontSize: '.95rem', fontWeight: 500,
                color: pathname === l.href ? 'var(--o)' : '#444',
                borderBottom: '1px solid #f3f3f3',
              }}>{l.label}</Link>
            ))}
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '2px solid #f3f3f3', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a href="https://manage.jokko.africa/" target="_blank" rel="noreferrer" className="btn btn-ol" style={{ textAlign: 'center' }}>Espace Client</a>
              <a href="https://connect.jokko.africa/" target="_blank" rel="noreferrer" className="btn btn-o" style={{ textAlign: 'center' }}>Jokko Connect</a>
            </div>
            <div style={{ marginTop: 20, padding: 16, background: 'var(--obg)', borderRadius: 16 }}>
              <a href="tel:+221338425735" style={{ display: 'block', padding: '8px 0', fontSize: '.85rem', color: 'var(--o)', fontWeight: 600 }}>+221 33 842 57 35</a>
              <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" style={{ display: 'block', padding: '8px 0', fontSize: '.85rem', color: 'var(--o)', fontWeight: 600 }}>
                <Image src="/_assets/logos/logo-whatsapp.png" alt="WA" width={14} height={14} style={{ display: 'inline', marginRight: 4, objectFit: 'contain' }} />
                +221 77 700 37 37
              </a>
              <a href="mailto:support@jokko.africa" style={{ display: 'block', padding: '8px 0', fontSize: '.85rem', color: 'var(--o)', fontWeight: 600 }}>support@jokko.africa</a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:900px){.hidden-mobile{display:none!important}}
        @media(min-width:901px){.show-mobile{display:none!important}}
      `}</style>
    </>
  )
}
