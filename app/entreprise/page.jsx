'use client'
import { useState } from 'react'
import PageHero from '@/components/PageHero'
import { OffreModal } from '@/components/OffreModal'

const OFFRES = [
  {
    slug: 'baobab', nom: 'Baobab', tagline: 'L\'hébergement pro souverain',
    prix: { mensuel: '12 500', annuel: '12 500' },
    periode: 'Trim. : 37 500 FCFA · Sem. : 75 000 FCFA · Annuel : 150 000 FCFA',
    ressources: ['2 vCPU dédiés', '4 Go RAM', '40 Go NVMe', '500 Go trafic'],
    features: ['Hébergement pro 100% Sénégal', 'Domaine .SN inclus', 'Backups quotidiens', 'SLA contractuel', 'Évolution fluide vers Savane'],
  },
  {
    slug: 'fondation', nom: 'Fondation', tagline: 'Vos applications métier, zéro gestion infra',
    prix: { mensuel: '25 000', annuel: '20 000' },
    periode: 'Annuel : 20 000 FCFA/mois (-20%) = 240 000 FCFA/an',
    ressources: ['2 vCPU dédiés', '4 Go RAM', '50 Go NVMe', '500 Go trafic'],
    features: ['PaaS managé multi-stacks (Node, Python, PHP, Java)', 'Déploiement Git intégré', 'Backups quotidiens + SSL', 'SLA contractuel'],
    badge: 'Populaire',
  },
  {
    slug: 'savane', nom: 'Savane', tagline: 'Votre cloud privé, votre contrôle',
    prix: { mensuel: '35 000', annuel: '28 000' },
    periode: 'Annuel : 28 000 FCFA/mois (-20%) = 336 000 FCFA/an',
    ressources: ['4 vCPU dédiés', '8 Go RAM', '100 Go NVMe', '1 To trafic'],
    features: ['Cloud privé isolé (VPC dédié)', 'Firewall dédié + snapshots', 'Scalable à la demande', 'Support prioritaire + référent'],
  },
]

export default function EntreprisePage() {
  const [period, setPeriod] = useState('mensuel')
  const [modalSlug, setModalSlug] = useState(null)

  return (
    <>
      <PageHero
        label="02 — Entreprise"
        title="Votre activité tourne."
        titleEm="On garantit qu'elle ne s'arrête pas."
        desc="SLA contractuel, support réactif, infrastructure évolutive. Chaque minute d'arrêt vous coûte de l'argent et de la crédibilité. Pas avec Jokko."
        img="/_assets/logos/equipe-bureau.png"
        badge="Entreprise B2B"
        color="var(--b)"
        ctas={[
          { label: 'Voir les offres ↓', href: '#offres' },
          { label: 'Demander un devis', href: 'https://manage.jokko.africa/submitticket.php' },
        ]}
      />

      <section id="offres" style={{ padding: '72px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="label" style={{ justifyContent: 'center' }}>Nos offres Entreprise</div>
            <h2 className="title">Stabilité, production, zéro stress technique</h2>
            <div style={{ display: 'inline-flex', background: 'var(--obg)', borderRadius: 999, padding: 4, marginTop: 24, gap: 4 }}>
              {[{ key: 'mensuel', label: 'Mensuel' }, { key: 'annuel', label: 'Annuel -20%' }].map(p => (
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
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--b)', marginBottom: 4 }}>
                    {o.prix[period]} <span style={{ fontSize: '.9rem', fontWeight: 400, color: 'var(--bm)' }}>FCFA/mois</span>
                  </div>
                  {period === 'annuel' && <div style={{ fontSize: '.72rem', color: 'var(--o)', fontWeight: 700, marginBottom: 4 }}>-20% vs mensuel</div>}
                  <div style={{ fontSize: '.72rem', color: 'var(--bm)', marginBottom: 20 }}>{o.periode}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                    {o.ressources.map((r, i) => <span key={i} style={{ background: '#F0F0F0', color: 'var(--b)', fontSize: '.68rem', fontWeight: 700, padding: '3px 8px', borderRadius: 999 }}>{r}</span>)}
                  </div>
                  {o.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--b)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: '.84rem', color: 'var(--bs)' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '16px 24px 24px', display: 'flex', gap: 8 }}>
                  <a href="https://manage.jokko.africa/" target="_blank" rel="noreferrer" className="btn" style={{ flex: 1, justifyContent: 'center', background: 'var(--b)', color: '#fff', borderRadius: 999, padding: '10px 22px', fontSize: '.88rem', fontWeight: 700 }}>Commander</a>
                  <button onClick={() => setModalSlug(o.slug)} className="btn btn-ol" style={{ flexShrink: 0 }}>En savoir +</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){#offres .container [style*="repeat(3,1fr)"]{grid-template-columns:1fr!important}}`}</style>
      </section>

      <section style={{ padding: '64px 0', background: 'var(--ow)' }}>
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg,#0D0D0D,#1E2A3A)', borderRadius: 'var(--rx)', padding: '48px 40px', textAlign: 'center', color: '#fff' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, marginBottom: 10 }}>Votre infra ne sera plus jamais votre problème.</h2>
            <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.75)', marginBottom: 24 }}>SLA contractuel, support réactif, infrastructure évolutive. <strong style={{ color: '#fff' }}>Jokko assume.</strong></p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://manage.jokko.africa/" target="_blank" rel="noreferrer" className="btn btn-o btn-lg">Espace Client →</a>
              <a href="tel:+221338425735" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: '1.5px solid rgba(255,255,255,.2)' }}>+221 33 842 57 35</a>
              <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: '1.5px solid rgba(255,255,255,.2)' }}>WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {modalSlug && <OffreModal slug={modalSlug} onClose={() => setModalSlug(null)} />}
    </>
  )
}
