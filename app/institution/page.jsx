'use client'
import { useState } from 'react'
import PageHero from '@/components/PageHero'
import { OffreModal } from '@/components/OffreModal'

const OFFRES = [
  {
    slug: 'heritage', nom: 'Héritage', tagline: 'Archivage souverain certifié',
    prix: '25 000', periode: 'Engagement annuel — 300 000 FCFA/an',
    ressources: ['500 Go chiffré', 'Rétention 12 mois', 'Réplication auto'],
    features: ['Chiffrement AES-256 bout en bout', 'Réplication multi-site Sénégal', 'Conformité APDP', 'Rapports d\'audit trimestriels'],
  },
  {
    slug: 'forteresse', nom: 'Forteresse', tagline: 'Plan de reprise certifié',
    prix: '45 000', periode: 'Engagement annuel — 540 000 FCFA/an',
    ressources: ['PRA complet', 'Monitoring IA', 'Tests bi-annuels'],
    features: ['PRA documenté et testé semestriellement', 'RTO < 4h / RPO < 1h', 'Basculement automatique', 'Monitoring 24/7 + référent dédié'],
    badge: 'Recommandé',
  },
  {
    slug: 'kilimandjaro', nom: 'Kilimandjaro', tagline: 'Puissance bare metal, zéro compromis',
    prix: '85 000', periode: 'Facturation mensuelle — Configurations sur mesure sur devis',
    ressources: ['8 CPU physiques', '32 Go ECC', '500 Go NVMe RAID', '5 To trafic'],
    features: ['Serveur physique dédié HA', 'VDC inclus', 'Support 24/7 prioritaire', 'SLA contractuel avec pénalités'],
  },
]

export default function InstitutionPage() {
  const [modalSlug, setModalSlug] = useState(null)

  return (
    <>
      <PageHero
        label="03 — Institution"
        title="Vos obligations sont"
        titleEm="non négociables."
        desc="Souveraineté totale des données, SLA avec pénalités, PRA documenté et testé, support 24/7 dédié. La même exigence que vous avez envers vous-même."
        img="/_assets/logos/datacenter.jpg"
        badge="Institution B2G"
        color="#6B4C9A"
        ctas={[
          { label: 'Voir les offres ↓', href: '#offres' },
          { label: 'Demander un devis', href: 'https://manage.jokko.africa/submitticket.php' },
        ]}
      />

      {/* SLA Banner */}
      <section style={{ background: '#6B4C9A', padding: '20px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            {[
              { v: '99,95%', l: 'Disponibilité' },
              { v: '< 1h', l: 'Intervention' },
              { v: '24/7', l: 'Support dédié' },
              { v: 'SLA', l: '+ Pénalités' },
            ].map(s => (
              <div key={s.l} style={{ textAlign: 'center', color: '#fff' }}>
                <div style={{ fontFamily: 'var(--fd)', fontSize: '1.4rem', fontWeight: 700 }}>{s.v}</div>
                <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.65)', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offres */}
      <section id="offres" style={{ padding: '72px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="label" style={{ justifyContent: 'center', color: '#6B4C9A' }}>Nos offres Institution</div>
            <h2 className="title">Souveraineté, conformité, continuité garantie</h2>
            <p className="subtitle" style={{ margin: '0 auto' }}>Engagement annuel · Support 24/7 dédié · SLA avec pénalités contractuelles</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {OFFRES.map(o => (
              <div key={o.slug} style={{ background: '#fff', border: '2px solid', borderColor: o.badge ? '#6B4C9A' : 'var(--bd)', borderRadius: 'var(--rx)', overflow: 'hidden', position: 'relative', transition: 'all .3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(107,76,154,.15)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}>
                {o.badge && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#6B4C9A' }} />}
                {o.badge && <div style={{ position: 'absolute', top: 16, right: 12, background: '#6B4C9A', color: '#fff', fontSize: '.65rem', fontWeight: 800, padding: '3px 10px', borderRadius: 999 }}>{o.badge}</div>}
                <div style={{ padding: '28px 24px 20px', paddingTop: o.badge ? 32 : 28 }}>
                  <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.3rem', fontWeight: 700, marginBottom: 4 }}>{o.nom}</h3>
                  <p style={{ fontSize: '.82rem', color: 'var(--bm)', marginBottom: 20 }}>{o.tagline}</p>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '2.2rem', fontWeight: 700, color: '#6B4C9A', marginBottom: 4 }}>
                    {o.prix} <span style={{ fontSize: '.9rem', fontWeight: 400, color: 'var(--bm)' }}>FCFA/mois</span>
                  </div>
                  <div style={{ fontSize: '.72rem', color: 'var(--bm)', marginBottom: 20 }}>{o.periode}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                    {o.ressources.map((r, i) => <span key={i} style={{ background: 'rgba(107,76,154,.08)', color: '#6B4C9A', fontSize: '.68rem', fontWeight: 700, padding: '3px 8px', borderRadius: 999 }}>{r}</span>)}
                  </div>
                  {o.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B4C9A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: '.84rem', color: 'var(--bs)' }}>{f}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 16, padding: '10px 14px', background: 'rgba(107,76,154,.06)', borderRadius: 8, fontSize: '.75rem', color: '#6B4C9A', fontWeight: 600 }}>
                    ✓ Priorité · Référent Dédié · Astreinte 24/7 · Revue Stratégique inclus
                  </div>
                </div>
                <div style={{ padding: '16px 24px 24px', display: 'flex', gap: 8 }}>
                  <a href="https://manage.jokko.africa/submitticket.php" target="_blank" rel="noreferrer" className="btn" style={{ flex: 1, justifyContent: 'center', background: '#6B4C9A', color: '#fff', borderRadius: 999, padding: '10px 22px', fontSize: '.88rem', fontWeight: 700 }}>Demander un devis</a>
                  <button onClick={() => setModalSlug(o.slug)} className="btn" style={{ flexShrink: 0, background: 'transparent', color: '#6B4C9A', border: '1.5px solid #6B4C9A', borderRadius: 999, padding: '10px 16px', fontSize: '.88rem', fontWeight: 700, cursor: 'pointer' }}>En savoir +</button>
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
          <div style={{ background: 'linear-gradient(135deg,#6B4C9A,#8B6FBF)', borderRadius: 'var(--rx)', padding: '48px 40px', textAlign: 'center', color: '#fff' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, marginBottom: 10 }}>La même exigence que vous avez envers vous-même.</h2>
            <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.85)', marginBottom: 24 }}>Souveraineté, conformité, continuité garantie. <strong>Jokko assume.</strong></p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://manage.jokko.africa/submitticket.php" target="_blank" rel="noreferrer" className="btn btn-w btn-lg">Demander un devis →</a>
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
