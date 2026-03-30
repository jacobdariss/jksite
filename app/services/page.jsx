import Link from 'next/link'

export const metadata = {
  title: 'Services & Add-ons — Jokko Pro Africa',
  description: 'Email pro, SMS, sécurité, monitoring, support — des services qui s\'ajoutent à n\'importe quelle offre Jokko.',
}

const ADDONS = {
  communication: [
    { nom: 'Tam-Tam', tagline: 'Email pro synchronisé', prix: '1 000 FCFA/user/mois', features: ['Synchro IMAP/SMTP + CalDAV', 'Antispam + antivirus', 'Accès mobile natif', 'Domaine personnalisé'], ressource: '10 Go/utilisateur', icon: 'mail' },
    { nom: 'Papyrus', tagline: 'Webmail simple et efficace', prix: '750 FCFA/user/mois', features: ['Webmail Roundcube', 'Antispam intégré', 'Domaine personnalisé', 'Interface simple'], ressource: '5 Go/utilisateur', icon: 'doc' },
    { nom: 'Griot', tagline: 'SMS pro — marketing & transactionnel', prix: '10 FCFA/SMS', features: ['API REST documentée', 'SMS marketing + transactionnel + OTP', 'Dashboard analytics', 'Sender ID personnalisé'], ressource: 'Volume illimité · Remise dès 5 000 SMS', icon: 'sms' },
  ],
  securite: [
    { nom: 'Oasis Backup', tagline: 'Sauvegarde Cloud automatisée', prix: '2 000 à 8 000 FCFA/mois', features: ['Backup quotidien automatisé', 'Rétention 30 jours (extensible)', 'Restauration self-service en 1 clic', 'Chiffrement AES-256'], ressource: 'Stockage dédié backup · Réplication Sénégal', icon: 'shield' },
    { nom: 'PRA Essentiel', tagline: 'Plan de Reprise d\'Activité', prix: '15 000 FCFA/mois', features: ['PRA documenté et testé 2x/an', 'RTO < 4h / RPO < 1h', 'Basculement automatique', 'Référent technique dédié'], ressource: 'Infrastructure de reprise dédiée', icon: 'refresh' },
    { nom: 'Bouclier Zero Trust', tagline: 'Sécurité réseau avancée', prix: 'Sur devis', features: ['Architecture Zero Trust complète', 'Micro-segmentation réseau', 'MFA multi-facteurs', 'Journalisation centralisée'], ressource: 'Firewall avancé · Politique IAM · Logs SIEM', icon: 'lock' },
    { nom: 'Sentinelle', tagline: 'Monitoring & alerting 24/7', prix: '8 000 à 12 000 FCFA/mois', features: ['Monitoring 24/7 (infra + applicatif)', 'Alertes intelligentes (IA Ops)', 'Escalade automatique N1/N2/N3', 'Dashboard temps réel'], ressource: 'IA Ops intégrée · Alerting multi-canal', icon: 'eye' },
    { nom: 'Conformité APDP', tagline: 'Audit & mise en conformité', prix: 'Sur devis', features: ['Audit initial de conformité', 'Documentation réglementaire', 'Plan d\'action personnalisé', 'Suivi trimestriel'], ressource: 'Accompagnement sur mesure', icon: 'check' },
  ],
  support: [
    { nom: 'Priorité', tagline: 'Support réactif garanti', prix: '25 000 FCFA/mois', features: ['Temps de réponse garanti < 2h', 'Escalade accélérée N2/N3', 'Suivi en temps réel de chaque ticket', 'Canal dédié (email + téléphone)'], ressource: 'Disponible pour tous les segments', icon: 'zap' },
    { nom: 'Référent Dédié', tagline: 'Votre interlocuteur technique nommé', prix: '25 000 FCFA/mois', features: ['Interlocuteur technique nommé', 'Connaissance approfondie de votre environnement', 'Appels planifiés mensuels proactifs', 'Point d\'escalade direct en urgence'], ressource: 'Segments Entreprise et Institution', icon: 'user' },
    { nom: 'Astreinte 24/7', tagline: 'Couverture nuits, weekends et jours fériés', prix: '35 000 FCFA/mois', features: ['Couverture 24h/24, 7j/7, 365j/an', 'Intervention garantie < 1h (nuit/weekend)', 'Astreinte téléphonique dédiée', 'Rapport d\'astreinte mensuel'], ressource: 'Segments Entreprise et Institution', icon: 'clock' },
    { nom: 'Onboarding Accompagné', tagline: 'Migration + setup + formation', prix: 'Dès 25 000 FCFA (forfait unique)', features: ['Audit technique pré-migration', 'Migration zéro downtime', 'Configuration et optimisation', 'Formation équipe (2 sessions)', 'Suivi post-migration 30 jours'], ressource: 'Tous segments', icon: 'rocket' },
    { nom: 'Revue Stratégique', tagline: 'Bilan trimestriel + recommandations', prix: '15 000 FCFA/mois', features: ['Bilan trimestriel documenté', 'Analyse de performance', 'Recommandations d\'optimisation', 'Plan d\'évolution proposé'], ressource: 'Segments Entreprise et Institution', icon: 'chart' },
  ],
}

const SECTION_CONFIG = {
  communication: { label: 'Communication', color: '#2196F3', bg: '#E3F2FD', title: 'Email & SMS professionnels' },
  securite: { label: 'Sécurité', color: '#00897B', bg: '#E0F2F1', title: 'Protection, continuité et conformité' },
  support: { label: 'Support', color: '#7B1FA2', bg: '#F3E5F5', title: 'Accompagnement, réactivité et proximité' },
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
    chart: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
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
                <a href="#support" className="btn btn-lg" style={{ background: 'transparent', color: '#7B1FA2', border: '1.5px solid #7B1FA2' }}>Support</a>
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
      <div style={{ background: 'linear-gradient(135deg,var(--o),var(--ol))', padding: '14px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            {[['13', 'add-ons'], ['3', 'catégories'], ['100%', 'compatibles toutes offres'], ['Sénégal', 'hébergé']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center', color: '#fff' }}>
                <div style={{ fontFamily: 'var(--fd)', fontSize: '1.4rem', fontWeight: 700 }}>{v}</div>
                <div style={{ fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,.8)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
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
