'use client'
import { useState } from 'react'
import PageHero from '@/components/PageHero'
import { OffreModal } from '@/components/OffreModal'

const OFFRES = [
  {
    slug: 'racine', nom: 'Racine', tagline: 'Votre premier site, zéro stress',
    prix: { mensuel: '2 000', annuel: '2 000' },
    periode: 'Engagement annuel — 24 000 FCFA/an',
    ressources: ['1 vCPU', '1 Go RAM', '10 Go SSD', '100 Go trafic'],
    features: ['Hébergement fiable avec support local', 'Certificat SSL inclus', 'Activation en moins de 24h', 'Accompagnement au démarrage'],
    badge: null,
  },
  {
    slug: 'sahara', nom: 'Sahara', tagline: 'WordPress optimisé, trafic garanti',
    prix: { mensuel: '4 000', annuel: '4 000' },
    periode: 'Semestriel : 24 000 FCFA · Annuel : 48 000 FCFA',
    ressources: ['1 vCPU', '2 Go RAM', '20 Go NVMe', '200 Go trafic'],
    features: ['WordPress préinstallé et optimisé', 'Cache LiteSpeed + CDN Afrique', 'SEO technique intégré', 'Évolution vers Baobab sans migration'],
    badge: 'Populaire',
  },
  {
    slug: 'teranga', nom: 'Téranga', tagline: 'Le cloud solidaire — ONG & Associations',
    prix: { mensuel: '5 000', annuel: '5 000' },
    periode: 'Engagement annuel — 60 000 FCFA/an',
    ressources: ['2 vCPU', '2 Go RAM', '30 Go SSD', '300 Go trafic'],
    features: ['Multi-sites (jusqu\'à 3 projets)', 'Backups hebdomadaires', 'Support dédié ONG/ESS', 'Tarif solidaire'],
    badge: 'Solidaire',
  },
]

const PERIODS = [
  { key: 'mensuel', label: 'Mensuel' },
  { key: 'annuel', label: 'Annuel' },
]

export default function StartupPage() {
  const [period, setPeriod] = useState('mensuel')
  const [modalSlug, setModalSlug] = useState(null)

  return (
    <>
      <PageHero
        label="01 — Startup"
        title="Lancez votre projet."
        titleEm="On s'occupe du reste."
        desc="Fiabilité dès le jour 1, prix adaptés, évolution sans migration. Quand vous grandissez, vous montez de niveau — pas de prestataire."
        img="/_assets/logos/equipe-reunion.png"
        badge="Startup B2C"
        color="var(--o)"
        ctas={[
          { label: 'Voir les offres ↓', href: '#offres' },
          { label: 'Nous contacter', href: 'https://manage.jokko.africa/submitticket.php' },
        ]}
      />

      {/* Pricing */}
      <section id="offres" style={{ padding: '72px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="label" style={{ justifyContent: 'center' }}>Nos offres Startup</div>
            <h2 className="title">3 offres, un seul engagement : votre sérénité</h2>
            {/* Toggle */}
            <div style={{ display: 'inline-flex', background: 'var(--obg)', borderRadius: 999, padding: 4, marginTop: 24, gap: 4 }}>
              {PERIODS.map(p => (
                <button key={p.key} onClick={() => setPeriod(p.key)} style={{
                  padding: '8px 20px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: '.85rem', fontWeight: 600,
                  background: period === p.key ? '#fff' : 'transparent',
                  color: period === p.key ? 'var(--b)' : 'var(--bm)',
                  boxShadow: period === p.key ? '0 2px 8px rgba(0,0,0,.08)' : 'none',
                  transition: 'all .2s',
                }}>{p.label}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {OFFRES.map(o => (
              <div key={o.slug} style={{ background: '#fff', border: '1px solid var(--bd)', borderRadius: 'var(--rx)', overflow: 'hidden', position: 'relative', transition: 'all .3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shl)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}>
                {o.badge && <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--o)', color: '#fff', fontSize: '.65rem', fontWeight: 800, padding: '3px 10px', borderRadius: 999 }}>{o.badge}</div>}
                <div style={{ padding: '28px 24px 20px' }}>
                  <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.3rem', fontWeight: 700, marginBottom: 4 }}>{o.nom}</h3>
                  <p style={{ fontSize: '.82rem', color: 'var(--bm)', marginBottom: 20 }}>{o.tagline}</p>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--o)', marginBottom: 4 }}>
                    {o.prix[period]} <span style={{ fontSize: '.9rem', fontWeight: 400, color: 'var(--bm)' }}>FCFA/mois</span>
                  </div>
                  <div style={{ fontSize: '.72rem', color: 'var(--bm)', marginBottom: 20 }}>{o.periode}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                    {o.ressources.map((r, i) => <span key={i} style={{ background: 'var(--obg2)', color: 'var(--od)', fontSize: '.68rem', fontWeight: 700, padding: '3px 8px', borderRadius: 999 }}>{r}</span>)}
                  </div>
                  {o.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--o)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: '.84rem', color: 'var(--bs)' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '16px 24px 24px', display: 'flex', gap: 8 }}>
                  <a href="https://manage.jokko.africa/" target="_blank" rel="noreferrer" className="btn btn-o" style={{ flex: 1, justifyContent: 'center' }}>Commander</a>
                  <button onClick={() => setModalSlug(o.slug)} className="btn btn-ol" style={{ flexShrink: 0 }}>En savoir +</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){#offres .container [style*="repeat(3,1fr)"]{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 0', background: 'var(--ow)' }}>
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg,var(--o),var(--ol))', borderRadius: 'var(--rx)', padding: '48px 40px', textAlign: 'center', color: '#fff' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, marginBottom: 10 }}>Prêt à lancer votre projet ?</h2>
            <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.85)', marginBottom: 24 }}>Activez votre hébergement en moins de 24h. <strong>Jokko assume.</strong></p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://manage.jokko.africa/" target="_blank" rel="noreferrer" className="btn btn-w btn-lg">Espace Client →</a>
              <a href="tel:+221338425735" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.3)' }}>+221 33 842 57 35</a>
              <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.25)' }}>WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {modalSlug && <OffreModal slug={modalSlug} onClose={() => setModalSlug(null)} />}
    </>
  )
}
