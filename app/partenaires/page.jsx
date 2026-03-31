export const metadata = {
  title: 'Programme Partenaires — Jokko Pro Africa',
  description: 'Rejoignez le réseau de partenaires Jokko. 5 niveaux, commissions progressives, co-marketing. Affilié, Revendeur, Intégrateur ou Institutionnel.',
}

const TYPES = [
  {
    label: 'Revendeur', segments: 'Startup · Entreprise',
    desc: 'Vous prospectez et commercialisez les solutions Jokko auprès de vos clients. Vous facturez et gérez la relation client.',
    profil: 'Distributeur IT, commercial indépendant',
    icon: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
  },
  {
    label: 'Intégrateur / Technique', segments: 'Entreprise · Institution',
    desc: 'Vous déployez et intégrez les solutions Jokko chez vos clients. Votre valeur : la mise en œuvre technique.',
    profil: 'ESN, prestataire infra, DevOps',
    icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  },
  {
    label: 'Agence Digitale', segments: 'Startup · Entreprise',
    desc: 'Vous recommandez Jokko à vos clients et pilotez leurs projets numériques. Jokko devient votre infrastructure de référence.',
    profil: 'Agence digitale, conseil IT',
    icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
  },
  {
    label: 'Institutionnel & Stratégique', segments: 'Institution',
    desc: 'Distribution à grande échelle, co-branding, partenariats stratégiques. Pour les organisations à fort impact.',
    profil: 'Organisation publique, fédération, GIE',
    icon: '<path d="M3 22h18M6 18V10M10 18V10M14 18V10M18 18V10M2 10l10-7 10 7"/>',
  },
]

const NIVEAUX = [
  {
    n: '1', label: 'Affilié', color: '#888', ipp: '—',
    role: 'Génère des opportunités via lien ou code de parrainage',
    remun: 'Commission sur vente effective encaissée',
    avantages: ['Lien affilié personnel', 'Accès aux fiches offres', 'Commission après vente'],
  },
  {
    n: '2', label: 'Starter', color: '#E85D04', ipp: '—',
    role: 'Prospecte, facture et gère la relation client',
    remun: 'Marge standard + kit partenaire + bonus d\'activation',
    avantages: ['Kit commercial complet', 'Formation initiale produit', 'Badge Starter officiel', 'Bonus d\'activation bienvenue'],
  },
  {
    n: '3', label: 'Growth', color: '#E85D04', ipp: '≥ 65',
    role: 'Portefeuille élargi, prospection active',
    remun: 'Marge améliorée + bonus trimestriels + priorité opportunités',
    avantages: ['Marge supérieure', 'Bonus trimestriels CA', 'Priorité sur les opportunités entrantes', 'Webinaires exclusifs'],
  },
  {
    n: '4', label: 'Pro', color: '#C44D00', ipp: '≥ 75',
    role: 'Gestion avancée, faible taux d\'incidents',
    remun: 'Bonus renforcés + co-marketing + leads qualifiés + visibilité',
    avantages: ['Budget co-marketing', 'Leads qualifiés entrants', 'Visibilité sur jokko.africa', 'Accès anticipé nouveaux produits'],
  },
  {
    n: '5', label: 'Elite', color: '#7B1FA2', ipp: '≥ 85',
    role: 'Contribution majeure au CA indirect Jokko',
    remun: 'Conditions privilégiées + accès nouveautés + décisions stratégiques',
    avantages: ['Conditions commerciales privilégiées', 'Invitation événement annuel partenaires', 'Trophée annuel + classement', 'Participation aux décisions stratégiques'],
  },
]

const IPP = [
  { pilier: 'Performance commerciale', poids: '40 pts', desc: 'CA encaissé, atteinte objectifs, dépassement' },
  { pilier: 'Image & Branding', poids: '20 pts', desc: 'Respect charte, co-marketing, visibilité' },
  { pilier: 'Engagement', poids: '20 pts', desc: 'Formations, webinaires, implication réseau' },
  { pilier: 'Qualité & Satisfaction', poids: '20 pts', desc: 'Absence incidents, satisfaction client' },
]

const ETAPES = [
  { n: '01', title: 'Candidature', desc: 'En ligne pour les affiliés, prospection commerciale pour les partenaires' },
  { n: '02', title: 'Éligibilité', desc: 'Étude de votre profil, de vos capacités et de votre marché cible' },
  { n: '03', title: 'Entretien', desc: 'Qualification avec notre équipe commerciale partenaires' },
  { n: '04', title: 'Validation', desc: 'Validation interne + signature de la convention partenaire' },
  { n: '05', title: 'Activation', desc: 'Remise du kit officiel, accès plateforme, badge niveau attribué' },
]

const CHECK = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--o)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`

export default function PartenairesPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section style={{ padding: '64px 0 48px', background: 'linear-gradient(135deg,#FFF8ED,#FFF3E0)', borderBottom: '3px solid var(--o)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="p-hero-grid">
            <div className="reveal">
              <div style={{ fontSize: '.75rem', color: 'var(--bm)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <a href="/" style={{ color: 'var(--o)' }}>Accueil</a>
                <span style={{ color: '#ccc' }}>›</span>
                <strong>Partenaires</strong>
              </div>
              <div className="label">Programme Partenaires 2026</div>
              <h1 className="title">Un partenaire Jokko n&apos;est pas un revendeur. <em style={{ color: 'var(--o)', fontStyle: 'italic' }}>C&apos;est une extension de notre promesse.</em></h1>
              <p className="subtitle">Rejoignez un réseau de distribution structuré autour d&apos;une seule exigence : la continuité numérique de chaque client.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="/partenaires/candidature" className="btn btn-o btn-lg">Devenir partenaire →</a>
                <a href="#niveaux" className="btn btn-ol btn-lg">Voir les niveaux</a>
              </div>
            </div>
            <div className="reveal reveal-delay-2" style={{ position: 'relative', borderRadius: 'var(--rx)', overflow: 'hidden', boxShadow: 'var(--shl)' }}>
              <img src="/_assets/logos/equipe-jokko.png" alt="Partenaires Jokko" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--o)', color: '#fff', fontSize: '.72rem', fontWeight: 700, padding: '5px 14px', borderRadius: 999 }}>
                Programme 2026
              </div>
              <div style={{ position: 'absolute', bottom: -16, left: -16, background: '#fff', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shl)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,var(--o),var(--ol))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: '.8rem', fontWeight: 700 }}>Affilié → Elite</div>
                  <div style={{ fontSize: '.68rem', color: 'var(--bm)' }}>5 niveaux · Commission progressive</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){ .p-hero-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ═══ STATS BAND ═══ */}
      <div style={{ background: 'linear-gradient(135deg,var(--o),var(--od))', padding: '16px 0' }}>
        <div className="container">
          <div className="p-stats-band">
            {[['5', 'Niveaux'], ['4', 'Types de partenaires'], ['3', 'Segments clients'], ['100%', 'Performance mesurée'], ['Trimestriel', 'Suivi & accompagnement']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center', color: '#fff', padding: '4px 0', borderRight: '1px solid rgba(255,255,255,.15)' }}>
                <div style={{ fontFamily: 'var(--fd)', fontSize: '1.3rem', fontWeight: 700, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,.8)', marginTop: 5 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`.p-stats-band { display: grid; grid-template-columns: repeat(5,1fr); } .p-stats-band > div:last-child { border-right: none; } @media(max-width:700px){ .p-stats-band { grid-template-columns: repeat(2,1fr); gap: 16px; } .p-stats-band > div { border-right: none !important; } }`}</style>
      </div>

      {/* ═══ AFFILIÉ vs PARTENAIRE ═══ */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="label" style={{ justifyContent: 'center' }}>Deux parcours</div>
            <h2 className="title">Affilié ou Partenaire ?</h2>
            <p className="subtitle" style={{ margin: '0 auto' }}>Deux statuts différents, deux niveaux d&apos;engagement, deux modèles de rémunération.</p>
          </div>
          <div className="reveal p-deux-parcours">
            {[
              {
                title: 'Affilié', badge: 'Niveau 1', bg: 'var(--ow)', border: 'var(--bd)',
                desc: 'Vous générez des opportunités via votre réseau ou votre audience. Jokko facture directement le client.',
                items: ['Lien affilié ou code personnel', 'Pas de structure légale requise', 'Commission après encaissement', 'Zéro gestion contractuelle'],
                note: 'Idéal pour démarrer sans engagement',
              },
              {
                title: 'Partenaire', badge: 'Niveaux 2 → 5', bg: '#FFF7EE', border: 'var(--obg2)',
                desc: 'Vous prospectez, vendez, facturez et gérez la relation client. Vous portez la promesse Jokko.',
                items: ['Structure légale obligatoire', 'Facturation client en direct', 'Marge + bonus volume + bonus stratégique', 'Suivi IPP trimestriel'],
                note: 'Pour les professionnels qui veulent scaler',
              },
            ].map((c, i) => (
              <div key={c.title} className="hover-lift" style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 'var(--rx)', padding: '32px 28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.3rem', fontWeight: 700 }}>{c.title}</h3>
                  <span style={{ background: 'var(--obg2)', color: 'var(--od)', fontSize: '.68rem', fontWeight: 800, padding: '4px 10px', borderRadius: 999 }}>{c.badge}</span>
                </div>
                <p style={{ fontSize: '.88rem', color: 'var(--bs)', lineHeight: 1.7, marginBottom: 20 }}>{c.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                  {c.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--o)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: '.84rem', color: 'var(--bs)' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'rgba(232,93,4,.08)', borderRadius: 8, padding: '10px 14px', fontSize: '.78rem', color: 'var(--od)', fontWeight: 600 }}>
                  💡 {c.note}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`.p-deux-parcours { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; } @media(max-width:768px){ .p-deux-parcours { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ═══ TYPES ═══ */}
      <section style={{ padding: '80px 0', background: 'var(--ow)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="label" style={{ justifyContent: 'center' }}>Types de partenaires</div>
            <h2 className="title">Quel partenaire êtes-vous ?</h2>
            <p className="subtitle" style={{ margin: '0 auto' }}>Chaque type de partenaire intervient selon son mode d&apos;action et ses segments cibles.</p>
          </div>
          <div className="p-types-grid">
            {TYPES.map((t, i) => (
              <div key={t.label} className={`hover-lift reveal reveal-delay-${i % 4}`} style={{ background: '#fff', border: '1px solid var(--bd)', borderRadius: 'var(--rx)', padding: '28px 24px' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--obg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--o)', marginBottom: 16 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: t.icon }} />
                </div>
                <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>{t.label}</h3>
                <p style={{ fontSize: '.84rem', color: 'var(--bs)', lineHeight: 1.6, marginBottom: 14 }}>{t.desc}</p>
                <div style={{ fontSize: '.72rem', color: 'var(--bm)', marginBottom: 10 }}>
                  <strong style={{ color: 'var(--b)' }}>Profil :</strong> {t.profil}
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {t.segments.split(' · ').map(s => (
                    <span key={s} style={{ background: 'var(--obg)', color: 'var(--od)', fontSize: '.68rem', fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`.p-types-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; } @media(max-width:700px){ .p-types-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ═══ NIVEAUX ═══ */}
      <section id="niveaux" style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="label" style={{ justifyContent: 'center' }}>Progression</div>
            <h2 className="title">5 niveaux, une progression par la performance</h2>
            <p className="subtitle" style={{ margin: '0 auto' }}>Le passage d&apos;un niveau à un autre dépend exclusivement du CA généré et de l&apos;IPP (Indice de Performance Partenaire).</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {NIVEAUX.map((n, i) => (
              <div key={n.label} className="reveal hover-lift" style={{ display: 'grid', gridTemplateColumns: '56px 1fr auto', gap: 20, alignItems: 'center', background: i === 0 ? 'var(--ow)' : '#FFF7EE', border: `1.5px solid ${i === 0 ? 'var(--bd)' : 'var(--obg2)'}`, borderRadius: 16, padding: '20px 24px' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: n.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 800, color: '#fff', flexShrink: 0 }}>{n.n}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1rem' }}>{n.label}</span>
                    {n.ipp !== '—' && <span style={{ background: 'var(--obg2)', color: 'var(--od)', fontSize: '.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: 999 }}>IPP {n.ipp}</span>}
                  </div>
                  <p style={{ fontSize: '.82rem', color: 'var(--bm)', marginBottom: 8 }}>{n.role}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {n.avantages.map((a, j) => (
                      <span key={j} style={{ fontSize: '.72rem', color: 'var(--bs)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ color: 'var(--o)' }}>✓</span> {a}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: 'right', maxWidth: 200 }}>
                  <div style={{ fontSize: '.78rem', color: 'var(--bs)', lineHeight: 1.5, fontStyle: 'italic' }}>{n.remun}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){ #niveaux [style*="56px 1fr auto"] { grid-template-columns: 40px 1fr !important; } #niveaux [style*="56px 1fr auto"] > div:last-child { display: none; } }`}</style>
      </section>

      {/* ═══ IPP ═══ */}
      <section style={{ padding: '80px 0', background: 'var(--ow)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }} className="p-ipp-grid">
            <div className="reveal">
              <div className="label">Scoring</div>
              <h2 className="title">L&apos;IPP — Indice de Performance Partenaire</h2>
              <p style={{ fontSize: '.95rem', color: 'var(--bs)', lineHeight: 1.7, marginBottom: 24 }}>
                L&apos;IPP mesure la performance globale sur 100 points par trimestre. Il détermine l&apos;éligibilité aux bonus et conditionne le passage de niveau.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {IPP.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ minWidth: 52, background: 'var(--obg2)', color: 'var(--od)', fontSize: '.75rem', fontWeight: 800, padding: '4px 8px', borderRadius: 8, textAlign: 'center' }}>{item.poids}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '.88rem', marginBottom: 2 }}>{item.pilier}</div>
                      <div style={{ fontSize: '.82rem', color: 'var(--bm)' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <div style={{ background: '#fff', borderRadius: 'var(--rx)', padding: '28px', border: '1px solid var(--bd)', boxShadow: 'var(--sh)' }}>
                <div style={{ fontWeight: 700, fontSize: '.85rem', marginBottom: 20, color: 'var(--b)' }}>Seuils de qualification</div>
                {[
                  { score: '< 60', label: 'Sous performance', desc: 'Plan d\'amélioration obligatoire', color: '#EF4444' },
                  { score: '60–74', label: 'Conforme', desc: 'Maintien du niveau actuel', color: '#F59E0B' },
                  { score: '75–84', label: 'Performant', desc: 'Éligible progression niveau supérieur', color: '#10B981' },
                  { score: '≥ 85', label: 'Excellence', desc: 'Priorité stratégique & bonus premium', color: '#6B4C9A' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: i < 3 ? '1px solid var(--bdl)' : 'none' }}>
                    <div style={{ width: 48, height: 28, borderRadius: 6, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.72rem', fontWeight: 800, color: s.color, flexShrink: 0 }}>{s.score}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '.84rem', color: s.color }}>{s.label}</div>
                      <div style={{ fontSize: '.75rem', color: 'var(--bm)' }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){ .p-ipp-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ═══ INTÉGRATION ═══ */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="label" style={{ justifyContent: 'center' }}>Comment rejoindre</div>
            <h2 className="title">5 étapes pour intégrer le programme</h2>
          </div>
          <div className="p-steps-grid">
            {ETAPES.map((e, i) => (
              <div key={e.n} className={`hover-lift reveal reveal-delay-${i % 4}`} style={{ background: 'var(--ow)', border: '1px solid var(--bd)', borderRadius: 'var(--rx)', padding: '28px 20px', textAlign: 'center', position: 'relative' }}>
                <div style={{ fontFamily: 'var(--fd)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--o)', marginBottom: 8 }}>{e.n}</div>
                <h3 style={{ fontWeight: 700, fontSize: '.95rem', marginBottom: 8 }}>{e.title}</h3>
                <p style={{ fontSize: '.82rem', color: 'var(--bs)', lineHeight: 1.6 }}>{e.desc}</p>
                {i < ETAPES.length - 1 && (
                  <div style={{ position: 'absolute', right: -14, top: '50%', transform: 'translateY(-50%)', color: 'var(--o)', fontSize: '1.2rem', fontWeight: 700, zIndex: 1 }} className="step-arrow">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <style>{`.p-steps-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 28px; position: relative; } .step-arrow { display: block; } @media(max-width:900px){ .p-steps-grid { grid-template-columns: repeat(2,1fr) !important; } .step-arrow { display: none !important; } } @media(max-width:500px){ .p-steps-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ padding: '64px 0', background: 'var(--ow)' }}>
        <div className="container">
          <div className="reveal" style={{ background: 'linear-gradient(135deg,var(--o),var(--ol))', borderRadius: 'var(--rx)', padding: '56px 40px', textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,.07)' }} />
            <div style={{ position: 'absolute', bottom: -30, left: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,.05)' }} />
            <div style={{ fontSize: '.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,.7)', marginBottom: 12 }}>Programme Partenaires 2026</div>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.5rem,2.5vw,2.2rem)', fontWeight: 700, marginBottom: 12 }}>Prêt à rejoindre l&apos;écosystème ?</h2>
            <p style={{ fontSize: '.98rem', color: 'rgba(255,255,255,.85)', marginBottom: 32, maxWidth: 480, margin: '0 auto 28px' }}>
              De l&apos;affiliation jusqu&apos;au statut Elite — votre croissance, mesurée et récompensée.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/partenaires/candidature" className="btn btn-w btn-lg">Candidater maintenant →</a>
              <a href="/partenaires/marketplace" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.3)' }}>Explorer le marketplace</a>
              <a href="tel:+221338425735" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.3)' }}>+221 33 842 57 35</a>
              <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.25)' }}>WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
