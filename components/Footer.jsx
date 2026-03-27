'use client'
import Link from 'next/link'
import Image from 'next/image'

const FOOTER_NAV = [
  { label: 'Accueil', href: '/' },
  { label: 'Startup', href: '/startup' },
  { label: 'Entreprise', href: '/entreprise' },
  { label: 'Institution', href: '/institution' },
  { label: 'Services', href: '/services' },
  { label: 'Partenaires', href: '/partenaires' },
  { label: 'À propos', href: '/apropos' },
  { label: 'Blog', href: '/blog' },
]

const ADDONS = [
  { label: 'Communication', href: '/services#communication' },
  { label: 'Sécurité', href: '/services#securite' },
  { label: 'Support', href: '/services#support' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', color: 'rgba(255,255,255,.55)', marginTop: 'auto' }}>
      <div className="container" style={{ padding: '56px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
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
            <p style={{ fontSize: '.84rem', lineHeight: 1.6, maxWidth: 250 }}>
              Le 1er Cloud 100% Sénégalais. Datacenter Tier III+ à Dakar.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '.85rem', fontWeight: 700, marginBottom: 14 }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {FOOTER_NAV.map(l => (
                <li key={l.href}>
                  <Link href={l.href} style={{ fontSize: '.82rem', transition: 'color .2s' }}
                    onMouseEnter={e => e.target.style.color = '#fff'}
                    onMouseLeave={e => e.target.style.color = ''}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Segments */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '.85rem', fontWeight: 700, marginBottom: 14 }}>Segments</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Startup','Entreprise','Institution'].map(s => (
                <li key={s}><Link href={`/${s.toLowerCase()}`} style={{ fontSize: '.82rem' }}>{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Add-ons */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '.85rem', fontWeight: 700, marginBottom: 14 }}>Add-ons</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ADDONS.map(a => (
                <li key={a.label}><Link href={a.href} style={{ fontSize: '.82rem' }}>{a.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '.85rem', fontWeight: 700, marginBottom: 14 }}>Espace Client</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li><a href="https://manage.jokko.africa/" target="_blank" rel="noreferrer" style={{ fontSize: '.82rem' }}>Mon Compte</a></li>
              <li><a href="https://manage.jokko.africa/submitticket.php" target="_blank" rel="noreferrer" style={{ fontSize: '.82rem' }}>Ouvrir un Ticket</a></li>
              <li><a href="https://help.jokko.africa/fr/" target="_blank" rel="noreferrer" style={{ fontSize: '.82rem' }}>Base de Connaissances</a></li>
              <li><a href="/statut" style={{ fontSize: '.82rem' }}>Statut des services</a></li>
              <li><a href="tel:+221338425735" style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.55)' }}>+221 33 842 57 35</a></li>
              <li>
                <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" style={{ fontSize: '.82rem', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Image src="/_assets/logos/logo-whatsapp.png" alt="WA" width={13} height={13} style={{ objectFit: 'contain' }} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: '.75rem' }}>© Jokko Pro Africa 2026 · DARISS CONSULTING SAS · Mermoz VDN Dakar, Immeuble Zanardo</span>
          <span style={{ display: 'flex', gap: 16, fontSize: '.75rem' }}>
            {[
              { label: 'Mentions légales', href: '/mentions-legales' },
              { label: 'CGS', href: '/cgu' },
              { label: 'Confidentialité', href: '/politique-confidentialite' },
              { label: 'Droits domaine', href: '/droits-domaine' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ color: 'rgba(255,255,255,.35)' }}>{l.label}</Link>
            ))}
          </span>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          footer .container > div:first-child{grid-template-columns:1fr 1fr!important}
        }
        @media(max-width:580px){
          footer .container > div:first-child{grid-template-columns:1fr!important}
        }
      `}</style>
    </footer>
  )
}
