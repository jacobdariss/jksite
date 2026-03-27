import Link from 'next/link'

export const metadata = {
  title: 'Programme Partenaires — Jokko Pro Africa',
  description: 'Rejoignez l\'écosystème Jokko. Commissions 10-25%. Affilié, Revendeur, Intégrateur ou Institutionnel.',
}

const NIVEAUX = [
  { n: '1', label: 'Affilié', desc: 'Génération d\'opportunités via lien/code', remun: 'Commission sur vente effective', color: '#888' },
  { n: '2', label: 'Starter', desc: 'Premiers volumes d\'affaires', remun: 'Marge standard + kit partenaire + bonus', color: '#E85D04' },
  { n: '3', label: 'Growth', desc: 'Croissance régulière', remun: 'Marge améliorée + bonus trimestriels', color: '#E85D04' },
  { n: '4', label: 'Pro', desc: 'Structuré et autonome', remun: 'Bonus renforcés + co-marketing + leads', color: '#E85D04' },
  { n: '5', label: 'Elite', desc: 'Stratégique, fort impact', remun: 'Conditions privilégiées + accès nouveautés', color: '#E85D04' },
]

const TYPES = [
  { label: 'Revendeur', desc: 'Prospecte et commercialise les solutions Jokko', segments: 'Startup, Entreprise', icon: 'cart' },
  { label: 'Intégrateur / Technique', desc: 'Déploie et intègre les solutions chez le client', segments: 'Entreprise, Institution', icon: 'settings' },
  { label: 'Agence', desc: 'Recommande Jokko et pilote les projets clients', segments: 'Startup, Entreprise', icon: 'palette' },
  { label: 'Institutionnel & Stratégique', desc: 'Distribution à grande échelle, co-branding', segments: 'Institution', icon: 'building' },
]

const AVANTAGES = [
  'Commissions 10 à 25% sur chaque vente',
  'Kit commercial complet (fiches offres, argumentaires)',
  'Formation produit initiale + webinaires trimestriels',
  'Support dédié partenaire',
  'Dashboard de suivi des performances',
  'Badge officiel par niveau',
  'Co-marketing et visibilité sur jokko.africa',
  'Accès anticipé aux nouveaux produits',
]

export default function PartenairesPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ padding: '72px 0 56px', background: 'linear-gradient(160deg,#FFF7EE 0%,#FFE8D0 100%)', borderBottom: '3px solid var(--o)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="label">Programme Partenaires</div>
              <h1 className="title">Le marché vend pour nous. <em style={{ color: 'var(--o)' }}>C&apos;est le modèle le plus scalable.</em></h1>
              <p className="subtitle">Un partenaire Jokko n&apos;est pas un revendeur. C&apos;est une extension de notre promesse client.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="https://manage.jokko.africa/submitticket.php?step=2&deptid=1&subject=Candidature%20Partenaire" target="_blank" rel="noreferrer" className="btn btn-o btn-lg">Candidater →</a>
                <a href="#niveaux" className="btn btn-ol btn-lg">Voir les niveaux</a>
              </div>
            </div>
            <div style={{ borderRadius: 'var(--rx)', overflow: 'hidden', boxShadow: 'var(--shl)' }}>
              <img src="/_assets/logos/equipe-jokko.png" alt="Partenaires Jokko" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){section .container [style*="1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* Avantages */}
      <section style={{ padding: '72px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="label" style={{ justifyContent: 'center' }}>Pourquoi rejoindre</div>
            <h2 className="title">Ce que Jokko apporte à ses partenaires</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {AVANTAGES.map((a, i) => (
              <div key={i} style={{ background: 'var(--obg)', border: '1px solid var(--obg2)', borderRadius: 12, padding: '16px 18px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--o)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: '.84rem', color: 'var(--bs)', lineHeight: 1.5 }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){section .container [style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </section>

      {/* Types de partenaires */}
      <section style={{ padding: '72px 0', background: 'var(--ow)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="label" style={{ justifyContent: 'center' }}>Types de partenaires</div>
            <h2 className="title">Quel partenaire êtes-vous ?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
            {TYPES.map(t => (
              <div key={t.label} style={{ background: '#fff', border: '1px solid var(--bd)', borderRadius: 'var(--rx)', padding: '24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, minWidth: 44, borderRadius: 12, background: 'var(--obg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--o)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {t.icon === 'cart' && <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></>}
                    {t.icon === 'settings' && <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>}
                    {t.icon === 'palette' && <circle cx="12" cy="12" r="10"/>}
                    {t.icon === 'building' && <><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 3v18"/></>}
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1rem', fontWeight: 700, marginBottom: 6 }}>{t.label}</h3>
                  <p style={{ fontSize: '.84rem', color: 'var(--bs)', lineHeight: 1.6, marginBottom: 8 }}>{t.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {t.segments.split(', ').map(s => <span key={s} className="pill pill-o">{s}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){section .container [style*="repeat(2,1fr)"]{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* Niveaux */}
      <section id="niveaux" style={{ padding: '72px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="label" style={{ justifyContent: 'center' }}>Progression</div>
            <h2 className="title">5 niveaux, une progression par la performance</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 700, margin: '0 auto' }}>
            {NIVEAUX.map((n, i) => (
              <div key={n.label} style={{ display: 'flex', alignItems: 'center', gap: 20, background: i === 0 ? 'var(--ow)' : 'var(--obg)', border: `1px solid ${i === 0 ? 'var(--bd)' : 'var(--obg2)'}`, borderRadius: 12, padding: '16px 20px' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: n.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.85rem', fontWeight: 800, color: '#fff', flexShrink: 0 }}>{n.n}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '.92rem', marginBottom: 2 }}>{n.label}</div>
                  <div style={{ fontSize: '.8rem', color: 'var(--bm)' }}>{n.desc}</div>
                </div>
                <div style={{ fontSize: '.78rem', color: 'var(--bs)', textAlign: 'right', maxWidth: 200 }}>{n.remun}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 0', background: 'var(--ow)' }}>
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg,var(--o),var(--ol))', borderRadius: 'var(--rx)', padding: '48px 40px', textAlign: 'center', color: '#fff' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, marginBottom: 10 }}>Un partenaire Jokko n&apos;est pas un revendeur.</h2>
            <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.85)', marginBottom: 24 }}>C&apos;est une extension de notre promesse client. <strong>Rejoignez l&apos;écosystème.</strong></p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://manage.jokko.africa/submitticket.php?step=2&deptid=1&subject=Candidature%20Partenaire" target="_blank" rel="noreferrer" className="btn btn-w btn-lg">Candidater →</a>
              <a href="tel:+221338425735" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.3)' }}>+221 33 842 57 35</a>
              <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.25)' }}>WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
