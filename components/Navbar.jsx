'use client'
import { useState, useEffect } from 'react'
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
]

const MOBILE_EXTRA = [
  { href: '/apropos', label: 'À propos' },
  { href: '/blog', label: 'Blog' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Fermer le menu sur changement de route
  useEffect(() => { setOpen(false) }, [pathname])

  // Bloquer le scroll body quand menu ouvert
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--bdl)',
        height: 64,
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
          <div className="nav-desktop">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} className={`nav-link${pathname === l.href ? ' active' : ''}`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA desktop */}
          <div className="nav-cta">
            <a href="https://manage.jokko.africa/" target="_blank" rel="noreferrer" className="btn btn-ol btn-sm">Espace Client</a>
            <a href="https://connect.jokko.africa/" target="_blank" rel="noreferrer" className="btn btn-o btn-sm">Jokko Connect</a>
          </div>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} className="hamburger" aria-label="Menu">
            <span className={`ham-line${open ? ' open-0' : ''}`} />
            <span className={`ham-line${open ? ' open-1' : ''}`} />
            <span className={`ham-line${open ? ' open-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div className={`mobile-overlay${open ? ' visible' : ''}`} onClick={() => setOpen(false)} />

      {/* Panel */}
      <div className={`mobile-panel${open ? ' open' : ''}`}>
        {/* Header panel */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid var(--bdl)' }}>
          <Link href="/" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Image src="/_assets/logos/jokko-icon.png" alt="Jokko" width={30} height={30} style={{ objectFit: 'contain' }} />
            <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1rem' }}>
              Jokko<span style={{ color: 'var(--o)' }}>Pro</span>
            </span>
          </Link>
          <button onClick={() => setOpen(false)} style={{ background: '#F4F4F6', border: 'none', cursor: 'pointer', width: 32, height: 32, borderRadius: '50%', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>✕</button>
        </div>

        {/* Nav links */}
        {NAV_LINKS.map(l => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
            style={{ display: 'block', padding: '13px 0', fontSize: '.95rem', fontWeight: 500, color: pathname === l.href ? 'var(--o)' : '#444', borderBottom: '1px solid var(--bdl)' }}>
            {l.label}
          </Link>
        ))}
        {MOBILE_EXTRA.map(l => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
            style={{ display: 'block', padding: '13px 0', fontSize: '.95rem', fontWeight: 500, color: pathname === l.href ? 'var(--o)' : '#888', borderBottom: '1px solid var(--bdl)' }}>
            {l.label}
          </Link>
        ))}

        {/* CTAs */}
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="https://manage.jokko.africa/" target="_blank" rel="noreferrer" className="btn btn-ol" style={{ textAlign: 'center', justifyContent: 'center' }}>Espace Client</a>
          <a href="https://connect.jokko.africa/" target="_blank" rel="noreferrer" className="btn btn-o" style={{ textAlign: 'center', justifyContent: 'center' }}>Jokko Connect</a>
        </div>

        {/* Contact */}
        <div style={{ marginTop: 20, padding: '16px 20px', background: 'var(--obg)', borderRadius: 16 }}>
          <a href="tel:+221338425735" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', fontSize: '.85rem', color: 'var(--o)', fontWeight: 600 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18C1.61 2.09 2.5 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l.74-.74a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +221 33 842 57 35
          </a>
          <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', fontSize: '.85rem', color: 'var(--o)', fontWeight: 600 }}>
            <Image src="/_assets/logos/logo-whatsapp.png" alt="WA" width={14} height={14} style={{ objectFit: 'contain' }} />
            +221 77 700 37 37
          </a>
          <a href="mailto:support@jokko.africa" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', fontSize: '.85rem', color: 'var(--o)', fontWeight: 600 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            support@jokko.africa
          </a>
        </div>
      </div>

      <style>{`
        /* Desktop */
        .nav-desktop { display: flex; align-items: center; gap: 4px; }
        .nav-cta { display: flex; align-items: center; gap: 8px; }
        .nav-link { font-size: .85rem; font-weight: 500; padding: 6px 12px; border-radius: 999px; color: #444; transition: all .2s; }
        .nav-link:hover, .nav-link.active { color: var(--o); background: var(--obg); }

        /* Hamburger */
        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; flex-direction: column; gap: 5px; }
        .ham-line { display: block; width: 24px; height: 2.5px; background: #0D0D0D; border-radius: 2px; transition: .3s; }
        .open-0 { transform: rotate(45deg) translate(5px, 5px); }
        .open-1 { transform: scaleX(0); opacity: 0; }
        .open-2 { transform: rotate(-45deg) translate(5px, -5px); }

        /* Overlay */
        .mobile-overlay { display: none; position: fixed; inset: 0; z-index: 199; background: rgba(0,0,0,.45); opacity: 0; transition: opacity .3s; }
        .mobile-overlay.visible { opacity: 1; }

        /* Panel */
        .mobile-panel { display: none; position: fixed; top: 0; right: 0; width: 300px; max-width: 85vw; height: 100%; background: #fff; z-index: 200; padding: 20px 24px 32px; overflow-y: auto; box-shadow: -4px 0 32px rgba(0,0,0,.15); transform: translateX(100%); transition: transform .35s cubic-bezier(.4,0,.2,1); }
        .mobile-panel.open { transform: translateX(0); }

        /* Mobile breakpoint */
        @media(max-width:900px) {
          .nav-desktop, .nav-cta { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-overlay { display: block; pointer-events: none; }
          .mobile-overlay.visible { pointer-events: auto; }
          .mobile-panel { display: block; }
        }
      `}</style>
    </>
  )
}
