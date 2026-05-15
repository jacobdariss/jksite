import Link from 'next/link'
import { getSeoByPage } from '@/lib/strapi'

export async function generateMetadata() {
  const seo = await getSeoByPage('services')
  return {
    title: seo.title, description: seo.description, keywords: seo.keywords,
    alternates: { canonical: 'https://jokko.africa/services' },
    openGraph: { title: seo.ogTitle || seo.title, description: seo.ogDescription || seo.description, url: 'https://jokko.africa/services', images: seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630 }] : [{ url: '/og-image.png', width: 1200, height: 630 }] },
  }
}

const ADDONS = {
  communication: [
    { nom: 'Tam-Tam', tagline: 'Suite collaborative souveraine (Jokko Connect)', prix: 'Essentiel : 800 FCFA/user/mois · Pro : 1 200 FCFA/user/mois · Souverain : 1 800 FCFA/user/mois', features: ['Synchro IMAP/SMTP + CalDAV', 'Antispam + antivirus', 'Accès mobile natif', 'Domaine personnalisé', 'Alternative locale à Google Workspace'], ressource: 'Essentiel 10 Go · Pro 30 Go · Souverain 50 Go / utilisateur', icon: 'mail' },
    { nom: 'Griot', tagline: 'SMS pro — marketing & transactionnel', prix: '10 FCFA/SMS · Remise dès 5 000 SMS/mois', features: ['API REST documentée', 'SMS marketing + transactionnel + OTP', 'Dashboard analytics', 'Sender ID personnalisé', 'Webhooks + callbacks'], ressource: 'Volume illimité', icon: 'sms' },
  ],
  securite: [
    { nom: 'Oasis Backup', tagline: 'Sauvegarde Cloud automatisée', prix: 'Startup : 2 000 FCFA/mois · Entreprise : 5 000 FCFA/mois · Institution : 8 000 FCFA/mois', features: ['Backup quotidien automatisé', 'Rétention longue durée', 'Restauration self-service en 1 clic', 'Chiffrement AES-256'], ressource: 'Stockage dédié backup · Réplication Sénégal', icon: 'shield' },
    { nom: 'PRA Essentiel', tagline: 'Plan de Reprise d\'Activité', prix: '15 000 FCFA/mois (Entreprise uniquement)', features: ['PRA documenté et testé 2x/an', 'RTO < 4h / RPO < 1h', 'Basculement automatique', 'Référent technique dédié'], ressource: 'Infrastructure de reprise dédiée', icon: 'refresh' },
    { nom: 'Bouclier Zero Trust', tagline: 'Sécurité réseau avancée', prix: 'Sur devis', features: ['Architecture Zero Trust complète', 'Micro-segmentation réseau', 'MFA (authentification multi-facteurs)', 'Contrôle accès granulaire', 'Journalisation centralisée SIEM'], ressource: 'Firewall avancé · Politique IAM · Logs SIEM', icon: 'lock' },
    { nom: 'Sentinelle', tagline: 'Monitoring & alerting 24/7', prix: 'Entreprise : 8 000 FCFA/mois · Institution : Inclus Forteresse + Kilimandjaro', features: ['Monitoring 24/7 proactif', 'Alertes intelligentes IA Ops Jokko', 'Escalade automatique N1/N2/N3', 'Dashboard temps réel'], ressource: 'IA Ops intégrée · Alerting multi-canal', icon: 'eye' },
    { nom: 'Conformité APDP', tagline: 'Audit & mise en conformité', prix: 'Sur devis', features: ['Audit initial de conformité', 'Documentation réglementaire', 'Plan d\'action personnalisé', 'Suivi trimestriel', 'Rapports exportables'], ressource: 'Accompagnement sur mesure', icon: 'check' },
  ],
  stockage: [
    { nom: 'Expansion', tagline: 'Stockage NVMe additionnel souverain', prix: 'Bloc S (+20 Go) : dès 1 500 FCFA/mois · Bloc M (+50 Go) : dès 3 000 FCFA/mois · Bloc L (+100 Go) : 7 500 FCFA/mois · Bloc XL (+200 Go) : 14 000 FCFA/mois', features: ['Stockage NVMe haute performance', 'Activation sans interruption de service', 'Blocs cumulables selon vos besoins', 'Hébergement 100% Sénégal — données sous droit sénégalais', 'Monitoring inclus · Résiliation mensuelle possible'], ressource: 'Compatible toutes offres d\'hébergement · Non applicable à Tam-Tam', icon: 'db' },
  ],
  support: [
    { nom: 'Priorité', tagline: 'Support réactif garanti', prix: 'Startup : 5 000 FCFA/mois · Entreprise : 8 000 FCFA/mois · Institution : 10 000 FCFA/mois', features: ['Temps de réponse garanti < 2h', 'Escalade accélérée N2/N3', 'Suivi en temps réel de chaque ticket', 'Canal dédié (email + téléphone)'], ressource: 'Disponible pour tous les segments', icon: 'zap' },
    { nom: 'Référent Dédié', tagline: 'Votre interlocuteur technique nommé', prix: 'Entreprise : 25 000 FCFA/mois · Institution : Inclus par défaut', features: ['Interlocuteur technique nommé', 'Connaissance approfondie de votre environnement', 'Appels planifiés mensuels proactifs', 'Point d\'escalade direct en urgence'], ressource: 'Segments Entreprise et Institution', icon: 'user' },
    { nom: 'Onboarding Accompagné', tagline: 'Migration + setup + formation', prix: 'Startup : 25 000 FCFA · Entreprise : 50 000 FCFA · Institution : Sur devis', features: ['Audit technique pré-migration', 'Migration zéro downtime', 'Configuration et optimisation', 'Formation équipe incluse', 'Suivi post-migration 30 jours'], ressource: 'Tous segments', icon: 'rocket' },
    { nom: 'Revue Stratégique', tagline: 'Bilan trimestriel + recommandations', prix: 'Entreprise : 15 000 FCFA/mois · Institution : Inclus par défaut', features: ['Bilan trimestriel documenté', 'Analyse de performance', 'Recommandations d\'optimisation', 'Plan d\'évolution proposé'], ressource: 'Segments Entreprise et Institution', icon: 'chart' },
  ],
  manages: [
    { nom: 'Kora', tagline: 'Virtualisation d\'applications Windows', prix: 'Starter (≤5 users) : 20 000 FCFA/user/mois · Business (6–15) : 16 000 FCFA/user/mois · Entreprise (16–25) : 13 000 FCFA/user/mois · Institution (26+) : Sur devis', features: ['Serveur Windows dédié hébergé datacenter Jokko', 'Accès HTML5 navigateur — aucun logiciel à installer', 'Compatible PC, Mac, tablette, smartphone', 'Impression à distance incluse', 'Sauvegarde quotidienne de l\'environnement Windows'], ressource: 'Serveur Windows dédié Jokko · Licences applicatives à la charge du client', icon: 'monitor' },
    { nom: 'Jokko Manage', tagline: 'Infogérance souveraine clé en main', prix: 'Essentiel (1 serveur, SLA 8h) : 55 000 FCFA/mois · Pro (3 serveurs, SLA 4h) : 120 000 FCFA/mois · Souverain (5 serveurs, SLA 2h) : À partir de 200 000 FCFA/mois', features: ['Administration OS Linux / Windows', 'Supervision & monitoring proactif', 'Gestion de bases de données', 'Gestion applicative (déploiement, maintenance)', 'Sauvegardes opérationnelles vérifiées', 'Conseil & planification IT'], ressource: '1 à 5 serveurs selon niveau · SLA contractuel · Rapport mensuel · 100% Sénégal', icon: 'settings' },
  ],
}

const SECTION_CONFIG = {
  communication: { label: 'Communication', color: '#2196F3', bg: '#E3F2FD', title: 'Email & SMS professionnels souverains' },
  securite: { label: 'Sécurité', color: '#00897B', bg: '#E0F2F1', title: 'Protection, continuité et conformité' },
  stockage: { label: 'Stockage', color: '#F57C00', bg: '#FFF3E0', title: 'Espace NVMe additionnel sans migration' },
  support: { label: 'Support', color: '#7B1FA2', bg: '#F3E5F5', title: 'Accompagnement, réactivité et proximité' },
  manages: { label: 'Services Managés', color: '#1E2A3A', bg: '#F0F2F5', title: 'Votre IT géré par des experts locaux souverains' },
}

function IconSVG({ name, color = 'currentColor' }) {
  const icons = {
    mail: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>,
    doc: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
    sms: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
    shield: <path d="M12 3l8 4v5c0 5-4 9-8 10C8 21 4 17 4 12V7z"/>,
    refresh: <><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    check: <><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    rocket: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    db: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
    monitor: <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  )
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ padding: '64px 0 48px', background: 'linear-gradient(135deg,#FFF7EE 0%,#FFE8D0 60%,#F8F4FF 100%)', borderBottom: '3px solid var(--o)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="services-hero-grid">
            {/* Texte */}
            <div className="reveal">
              <div style={{ fontSize: '.75rem', color: 'var(--bm)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <a href="/" style={{ color: 'var(--o)' }}>Accueil</a>
                <span style={{ color: '#ccc' }}>›</span>
                <strong>Nos Services</strong>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E85D0415', border: '1px solid #E85D0430', borderRadius: 6, padding: '5px 12px', marginBottom: 16 }}>
                <span style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--o)' }}>13 add-ons disponibles</span>
              </div>
              <div className="label" style={{ color: 'var(--o)' }}>Add-ons & Services</div>
              <h1 className="title">Des services qui s&apos;ajoutent<br /><em style={{ color: 'var(--o)', fontStyle: 'italic' }}>à n&apos;importe quelle offre.</em></h1>
              <p className="subtitle">Communication pro, sécurité renforcée, support premium — ajoutez les briques dont vous avez besoin, quand vous en avez besoin. Tous compatibles Startup, Entreprise et Institution.</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href="#communication" className="btn btn-lg btn-ol">Communication</a>
                <a href="#securite" className="btn btn-lg" style={{ background: 'transparent', color: '#00897B', border: '1.5px solid #00897B' }}>Sécurité</a>
                <a href="#stockage" className="btn btn-lg" style={{ background: 'transparent', color: '#F57C00', border: '1.5px solid #F57C00' }}>Stockage</a>
                <a href="#support" className="btn btn-lg" style={{ background: 'transparent', color: '#7B1FA2', border: '1.5px solid #7B1FA2' }}>Support</a>
                <a href="#manages" className="btn btn-lg" style={{ background: 'transparent', color: '#1E2A3A', border: '1.5px solid #1E2A3A' }}>Services Managés</a>
              </div>
            </div>
            {/* Image */}
            <div className="reveal reveal-delay-2" style={{ position: 'relative', borderRadius: 'var(--rx)', overflow: 'hidden', boxShadow: 'var(--shl)' }}>
              <img src="/_assets/logos/equipe-bureau.png" alt="Services Jokko" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--o)', color: '#fff', fontSize: '.72rem', fontWeight: 700, padding: '5px 14px', borderRadius: 999 }}>
                13 add-ons
              </div>
              <div style={{ position: 'absolute', bottom: -16, left: -16, background: '#fff', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shl)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,var(--o),var(--ol))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: '.8rem', fontWeight: 700 }}>100% compatibles</div>
                  <div style={{ fontSize: '.68rem', color: 'var(--bm)' }}>Startup · Entreprise · Institution</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`.services-hero-grid { } @media(max-width:900px){ .services-hero-grid { grid-template-columns: 1fr !important; } .services-hero-grid > div:last-child { margin-top: 32px; } }`}</style>
      </section>

      {/* Stats band */}
      <div style={{ background: 'linear-gradient(135deg,var(--o),var(--od))', padding: '16px 0' }}>
        <div className="container">
          <div className="stats-band">
            {[['13', 'Add-ons'], ['3', 'Catégories'], ['100%', 'Compatibles toutes offres'], ['Sénégal', 'Souveraineté'], ['Tier III+', 'Data Center']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center', color: '#fff', padding: '4px 0', borderRight: '1px solid rgba(255,255,255,.15)' }}>
                <div style={{ fontFamily: 'var(--fd)', fontSize: '1.4rem', fontWeight: 700, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,.8)', marginTop: 5 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`.stats-band { display: grid; grid-template-columns: repeat(5,1fr); gap: 0; align-items: center; } .stats-band > div:last-child { border-right: none; } @media(max-width:700px){ .stats-band { grid-template-columns: repeat(2,1fr); gap: 16px; } .stats-band > div { border-right: none !important; } }`}</style>
      </div>

      {/* Add-ons sections */}
      {Object.entries(ADDONS).map(([key, addons]) => {
        const cfg = SECTION_CONFIG[key]
        return (
          <section key={key} id={key} style={{ padding: '72px 0', background: key === 'securite' ? 'var(--ow)' : '#fff' }}>
            <div className="container">
              <div style={{ marginBottom: 48 }}>
                <span style={{ display: 'inline-block', background: cfg.bg, color: cfg.color, fontSize: '.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px', padding: '4px 14px', borderRadius: 999, marginBottom: 12 }}>{cfg.label}</span>
                <h2 className="title">{cfg.title}</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20 }}>
                {addons.map(addon => (
                  <div key={addon.nom} style={{ background: '#fff', border: '1px solid var(--bd)', borderRadius: 'var(--rx)', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                      <div style={{ width: 44, height: 44, minWidth: 44, borderRadius: 12, background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconSVG name={addon.icon} color={cfg.color} />
                      </div>
                      <div>
                        <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1rem', fontWeight: 700, marginBottom: 3 }}>{addon.nom}</h3>
                        <div style={{ fontSize: '.8rem', color: 'var(--bm)' }}>{addon.tagline}</div>
                      </div>
                    </div>
                    {addon.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={cfg.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        <span style={{ fontSize: '.82rem', color: 'var(--bs)' }}>{f}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--bdl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontFamily: 'var(--fd)', fontSize: '.95rem', fontWeight: 700, color: cfg.color }}>{addon.prix}</div>
                      <a href="https://manage.jokko.africa/submitticket.php" target="_blank" rel="noreferrer" style={{ fontSize: '.78rem', fontWeight: 700, color: cfg.color }}>Ajouter →</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section style={{ padding: '64px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg,var(--o),var(--ol))', borderRadius: 'var(--rx)', padding: '48px 40px', textAlign: 'center', color: '#fff' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, marginBottom: 10 }}>Un doute sur l&apos;add-on à choisir ?</h2>
            <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.85)', marginBottom: 24 }}>On vous guide vers la combinaison qui correspond à vos besoins réels.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+221338425735" className="btn btn-w btn-lg">+221 33 842 57 35</a>
              <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.3)' }}>WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
