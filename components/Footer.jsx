'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const COLS = [
  {
    title: 'Navigation',
    links: [
      { label: 'Accueil', href: '/' },
      { label: 'Startup', href: '/startup' },
      { label: 'Entreprise', href: '/entreprise' },
      { label: 'Institution', href: '/institution' },
      { label: 'Services', href: '/services' },
      { label: 'Partenaires', href: '/partenaires' },
      { label: 'À propos', href: '/apropos' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Segments',
    links: [
      { label: 'Startup B2C', href: '/startup' },
      { label: 'Entreprise B2B', href: '/entreprise' },
      { label: 'Institution B2G', href: '/institution' },
    ],
  },
  {
    title: 'Add-ons',
    links: [
      { label: 'Communication', href: '/services#communication' },
      { label: 'Sécurité', href: '/services#securite' },
      { label: 'Support', href: '/services#support' },
    ],
  },
  {
    title: 'Espace Client',
    links: [
      { label: 'Mon Compte', href: 'https://manage.jokko.africa/', ext: true },
      { label: 'Ouvrir un Ticket', href: 'https://manage.jokko.africa/submitticket.php', ext: true },
      { label: 'Base de Connaissances', href: 'https://help.jokko.africa/fr/', ext: true },
      { label: 'Statut des services', href: '/statut' },
    ],
  },
]

const LEGAL = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'CGS', href: '/cgu' },
  { label: 'Confidentialité', href: '/politique-confidentialite' },
  { label: 'Droits domaine', href: '/droits-domaine' },
]

function FooterCol({ col }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="footer-col">
      {/* Desktop : titre statique */}
      <h4 className="footer-col-title-desktop">{col.title}</h4>

      {/* Mobile : accordéon */}
      <button className="footer-col-toggle" onClick={() => setOpen(!open)}>
        <span>{col.title}</span>
        <span style={{ transform: open ? 'rotate(180deg)' : '', transition: 'transform .25s', display: 'inline-block', fontSize: '.8rem' }}>▾</span>
      </button>

      <ul className={`footer-col-links${open ? ' open' : ''}`}>
        {col.links.map(l => (
          <li key={l.href}>
            {l.ext
              ? <a href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
              : <Link href={l.href}>{l.label}</Link>
            }
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', color: 'rgba(255,255,255,.55)' }}>
      <div className="container" style={{ padding: '48px 24px 32px' }}>

        {/* Brand + cols */}
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Image src="/_assets/logos/jokko-icon-white.png" alt="Jokko" width={34} height={34} style={{ objectFit: 'contain' }} />
              <div>
                <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.05rem', color: '#fff', lineHeight: 1 }}>
                  Jokko<span style={{ color: 'var(--o)' }}>Pro</span>
                </div>
                <div style={{ fontSize: '.55rem', color: 'rgba(255,255,255,.25)', fontWeight: 600, letterSpacing: '.8px', textTransform: 'uppercase' }}>
                  AFRICA · CLOUD SOUVERAIN
                </div>
              </div>
            </div>
            <p style={{ fontSize: '.84rem', lineHeight: 1.6, maxWidth: 240 }}>
              Le 1er Cloud 100% Sénégalais.<br/>Datacenter Tier III+ à Dakar.
            </p>
            {/* Contact mobile */}
            <div className="footer-contact-mobile">
              <a href="tel:+221338425735">+221 33 842 57 35</a>
              <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer">
                <Image src="/_assets/logos/logo-whatsapp.png" alt="WA" width={13} height={13} style={{ objectFit: 'contain', display: 'inline', marginRight: 4 }} />
                +221 77 700 37 37
              </a>
              <a href="mailto:support@jokko.africa">support@jokko.africa</a>
            </div>
          </div>

          {/* Cols */}
          {COLS.map(col => <FooterCol key={col.title} col={col} />)}
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 20, marginTop: 32 }}>
          <div className="footer-bottom">
            <span style={{ fontSize: '.72rem' }}>© Jokko Pro Africa 2026 · DARISS CONSULTING SAS · Dakar</span>
            <div className="footer-legal">
              {LEGAL.map(l => (
                <Link key={l.href} href={l.href} style={{ color: 'rgba(255,255,255,.35)', fontSize: '.72rem' }}>{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Grid desktop */
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr; gap: 40; margin-bottom: 0; }

        /* Col */
        .footer-col-title-desktop { color: #fff; font-size: .85rem; font-weight: 700; margin-bottom: 14px; }
        .footer-col-toggle { display: none; width: 100%; background: none; border: none; border-top: 1px solid rgba(255,255,255,.08); padding: 14px 0; color: #fff; font-size: .88rem; font-weight: 600; cursor: pointer; text-align: left; justify-content: space-between; align-items: center; }
        .footer-col-links { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .footer-col-links a { font-size: .82rem; color: rgba(255,255,255,.55); transition: color .2s; }
        .footer-col-links a:hover { color: #fff; }

        /* Contact mobile — caché desktop */
        .footer-contact-mobile { display: none; margin-top: 16px; display: flex; flex-direction: column; gap: 6px; }
        .footer-contact-mobile a { font-size: .82rem; color: rgba(255,255,255,.6); display: flex; align-items: center; }

        /* Bottom */
        .footer-bottom { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10; }
        .footer-legal { display: flex; gap: 16px; flex-wrap: wrap; }

        @media(max-width:900px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .footer-brand { padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,.08); margin-bottom: 0; }
          .footer-col-title-desktop { display: none; }
          .footer-col-toggle { display: flex !important; }
          .footer-col-links { max-height: 0; overflow: hidden; transition: max-height .3s ease; padding: 0; }
          .footer-col-links.open { max-height: 400px; padding-bottom: 14px; }
          .footer-contact-mobile { display: flex !important; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 8px; }
          .footer-legal { gap: 12px; }
        }
      `}</style>
    </footer>
  )
}
