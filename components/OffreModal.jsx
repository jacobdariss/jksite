'use client'
import { useEffect } from 'react'

// Fallback statique — utilisé si les données Strapi sont incomplètes
const OFFRES = {
  racine: {
    name: 'Racine', sub: 'Votre premier site, zéro stress', seg: 'Startup', seg_color: '#E85D04',
    pitch_title: 'Votre présence en ligne, dès le premier jour.',
    pitch: "Vous lancez votre projet. Pas besoin de comprendre la technique — vous avez juste à publier. Jokko s'assure que ça tourne, dès le jour 1, avec un support humain basé à Dakar.",
    pitch_details: ["Activation en moins de 24h", "Accompagnement au démarrage inclus", "SSL, hébergement fiable, support local", "Évolution vers Simba puis Baobab sans jamais changer de prestataire"],
    price: '1 850 FCFA', psub: '/mois · Trim. 5 550 · Annuel 19 800 FCFA (-10%)',
    resources: ['1 vCPU', '1 Go RAM', '10 Go SSD', '100 Go trafic'],
    sla: 'Disponibilité 99,5% · Support email J+1 · Incidents traités sous 24h',
    addons_short: 'Papyrus Email · Oasis Backup · Onboarding Accompagné',
    pid: 142,
  },
  simba: {
    name: 'Simba', sub: 'WordPress optimisé, trafic garanti', seg: 'Startup', seg_color: '#E85D04',
    pitch_title: 'WordPress prêt. Rapide. Sécurisé. Vous publiez, on gère le moteur.',
    pitch: "Vous créez du contenu ou vendez en ligne. Votre WordPress est préinstallé, optimisé et boosté avec un CDN Afrique — pour que vos visiteurs restent et convertissent.",
    pitch_details: ["WordPress préinstallé et optimisé", "Cache LiteSpeed + CDN Afrique pour une vitesse maximale", "SEO technique intégré dès le démarrage", "Évolution vers Baobab sans migration — aucune interruption"],
    price: '3 950 FCFA', psub: '/mois · Trim. 11 850 · Annuel 42 600 FCFA (-10%)',
    resources: ['1 vCPU', '2 Go RAM', '20 Go NVMe', '200 Go trafic'],
    sla: 'Disponibilité 99,5% · Support email J+1 · Incidents sous 24h',
    addons_short: 'Tam-Tam Email Pro · Oasis Backup · Onboarding',
    pid: 143,
  },
  teranga: {
    name: 'Téranga', sub: 'Le cloud solidaire — ONG & Associations', seg: 'Startup', seg_color: '#E85D04',
    pitch_title: 'Votre mission est essentielle. Votre présence numérique aussi.',
    pitch: "Vous avez une mission sociale, un budget serré, et des projets multiples. Téranga protège votre présence numérique à un tarif solidaire — pour que vous vous concentriez sur ce qui compte vraiment : votre impact.",
    pitch_details: ["Multi-sites jusqu'à 3 projets sur un seul abonnement", "Tarif solidaire adapté aux structures ESS", "Support dédié qui comprend vos contraintes associatives", "Backups hebdomadaires — vos données sont en sécurité"],
    price: '4 500 FCFA', psub: '/mois · Trim. 13 500 · Annuel 48 600 FCFA (-10%)',
    resources: ['2 vCPU', '2 Go RAM', '30 Go SSD', '300 Go trafic'],
    sla: 'Disponibilité 99,5% · Support email J+1 · Incidents sous 24h',
    addons_short: 'Papyrus Email · Oasis Backup · Griot SMS',
    pid: 144,
  },
  baobab: {
    name: 'Baobab', sub: "L'hébergement pro souverain", seg: 'Entreprise', seg_color: '#E85D04',
    pitch_title: 'Votre entreprise mérite un hébergement à la hauteur de ses ambitions.',
    pitch: "Souverain, fiable, local. Votre site tourne sur une infrastructure 100% Sénégal avec un domaine .SN inclus, des backups quotidiens et un SLA contractuel. Un vrai partenaire, pas un ticket de support.",
    pitch_details: ["Hébergement 100% Sénégal — données souveraines", "Domaine .SN inclus sans frais cachés", "Backups quotidiens — votre business ne s'arrête jamais", "SLA contractuel avec engagement de disponibilité 99,9%"],
    price: '12 500 FCFA', psub: '/mois · Trim. 37 500 · Annuel 135 000 FCFA (-10%)',
    resources: ['2 vCPU dédiés', '4 Go RAM', '40 Go NVMe', '500 Go trafic'],
    sla: 'SLA 99,9% contractuel · Support Email+Tél 8h/5j · Incidents sous 4h ouvrées',
    addons_short: 'Tam-Tam Email · Oasis Backup · Support Priorité',
    pid: 145,
  },
  fondation: {
    name: 'Fondation', sub: 'Vos applications métier, zéro gestion infra', seg: 'Entreprise', seg_color: '#E85D04',
    pitch_title: "Vous déployez vos apps. On gère tout ce qu'il y a en dessous.",
    pitch: "Vous ne touchez jamais un serveur. PaaS managé multi-stacks, déploiement Git, SSL, backups — tout est géré. Fondation est l'alternative locale à Heroku et Render, avec la souveraineté en plus.",
    pitch_details: ["Multi-stacks Node.js, Python, PHP, Java — vous choisissez", "Déploiement Git intégré — push, c'est en ligne", "Alternative locale souveraine à Heroku / Render", "SLA contractuel — votre app ne dormira pas"],
    price: '35 000 FCFA', psub: '/mois · Trim. 75 000 · Annuel 270 000 FCFA (-10%)',
    resources: ['2 vCPU dédiés', '4 Go RAM', '50 Go NVMe', '500 Go trafic'],
    sla: 'SLA 99,9% contractuel · Support Email+Tél 8h/5j · Incidents sous 4h ouvrées',
    addons_short: 'Oasis Backup · PRA Essentiel · Support Priorité',
    pid: 146,
  },
  savane: {
    name: 'Savane', sub: 'Votre cloud privé, votre contrôle', seg: 'Entreprise', seg_color: '#E85D04',
    pitch_title: 'Vous grandissez vite. Votre infra doit suivre sans que vous gériez la complexité.',
    pitch: "Cloud privé isolé, firewall dédié, snapshots, scalable à la demande — avec un référent technique qui connaît votre contexte. Quand vous scalez, Savane suit.",
    pitch_details: ["VPC dédié isolé — vos données ne partagent rien", "Firewall dédié + snapshots à la demande", "Scalable à la demande sans migration", "Support prioritaire + référent technique dédié"],
    price: '65 000 FCFA', psub: '/mois · Trim. 135 000 · Annuel 486 000 FCFA (-10%)',
    resources: ['4 vCPU dédiés', '8 Go RAM', '100 Go NVMe', '1 To trafic'],
    sla: 'SLA 99,9% contractuel · Support Email+Tél 8h/5j · Incidents sous 4h ouvrées',
    addons_short: 'PRA Essentiel · Référent Dédié · Astreinte 24/7',
    pid: 147,
  },
  heritage: {
    name: 'Héritage', sub: 'VPS Haute Disponibilité', seg: 'Institution', seg_color: '#6B4C9A',
    pitch_title: 'Vos données restent au Sénégal. Chiffrées, répliquées, conformes.',
    pitch: "VPS dédié haute disponibilité — ressources non mutualisées. Réplication automatique, accès root complet, firewall dédié et snapshots quotidiens. Conformité APDP. Vous dormez tranquille — nous portons la responsabilité.",
    pitch_details: ["VPS dédié HA — ressources non mutualisées", "Réplication automatique — basculement transparent en cas d'incident", "Accès root complet — OS Linux ou Windows au choix", "Firewall dédié + snapshots quotidiens automatisés", "Conformité APDP vérifiée et documentée"],
    price: '35 000 FCFA', psub: '/mois · Trim. 105 000 · Annuel 378 000 FCFA (-10%)',
    resources: ['4 vCPU dédiés', '16 Go RAM', '200 Go NVMe', '1 To trafic/mois'],
    sla: 'SLA 99,95% + pénalités · Support 24/7 dédié · Incidents sous 1h',
    addons_short: 'Référent Dédié inclus · Revue Stratégique incluse · Conformité APDP · Expansion Stockage',
    pid: 148,
  },
  forteresse: {
    name: 'Forteresse', sub: 'VPS HA Renforcé + PRA intégré', seg: 'Institution', seg_color: '#6B4C9A',
    pitch_title: 'Votre système ne peut pas s\'arrêter. On s\'en porte garant, par contrat.',
    pitch: "VPS HA renforcé, architecture redondante. PRA intégré testé deux fois par an. RTO < 4h, RPO < 1h, basculement automatique, Monitoring Sentinelle intégré. Quand ça compte vraiment, Jokko est là.",
    pitch_details: ["VPS HA renforcé — ressources non mutualisées, architecture redondante", "PRA intégré — RTO < 4h / RPO < 1h — basculement automatique", "Basculement automatique en cas d'incident majeur", "Monitoring Sentinelle intégré — alertes et escalade proactive"],
    price: '65 000 FCFA', psub: '/mois · Trim. 195 000 · Annuel 702 000 FCFA (-10%)',
    resources: ['8 vCPU dédiés', '32 Go RAM', '500 Go NVMe', '3 To trafic/mois'],
    sla: 'SLA 99,95% + pénalités · Support 24/7 dédié · Incidents sous 1h',
    addons_short: 'Référent Dédié + Revue Stratégique inclus · Sentinelle inclus · Bouclier Zero Trust · Expansion Stockage',
    pid: 149,
  },
  kilimandjaro: {
    name: 'Kilimandjaro', sub: 'VDC ou Bare Metal — Infrastructure critique', seg: 'Institution', seg_color: '#6B4C9A',
    pitch_title: 'Vous exigez le maximum. Un environnement entièrement dédié, une disponibilité totale.',
    pitch: "Environnement entièrement dédié — zéro mutualisation. VDC : virtualisation complète, multi-VMs, isolation réseau. Bare Metal : accès direct matériel, performance maximale. SLA avec pénalités et Monitoring Sentinelle intégré.",
    pitch_details: ["Environnement entièrement dédié — zéro mutualisation", "VDC : virtualisation complète, multi-VMs, isolation réseau", "Bare Metal : accès direct matériel, performance maximale garantie", "SLA avec pénalités contractuelles — connectivité multi-opérateurs", "Monitoring Sentinelle intégré — surveillance systèmes et alertes proactives"],
    price: 'Sur devis', psub: 'À partir de 120 000 FCFA/mois — VDC ou Bare Metal selon vos besoins',
    resources: ['12 vCPU dédiés', '64 Go RAM', '1 To NVMe', 'Configuration sur mesure'],
    sla: 'SLA 99,95% + pénalités · Support 24/7 dédié · Incidents sous 1h',
    addons_short: 'Référent Dédié + Revue Stratégique inclus · Sentinelle inclus · Bouclier Zero Trust · Conformité APDP',
    pid: null, // → devis
  },
}

// Segments et couleurs
const SEG_COLORS = { startup: '#E85D04', entreprise: '#1E2A3A', institution: '#6B4C9A' }

const CHECK = (color) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

// Construire les données du modal depuis une offre Strapi normalisée + fallback statique
function buildModalData(offre, slug) {
  const fb = OFFRES[slug] || {}

  // Couleur du segment
  const segName = offre?.target ? '' : ''
  const segColor = fb.seg_color || '#E85D04'

  // Prix depuis Strapi
  let price = fb.price
  let psub  = fb.psub
  if (offre?.prix) {
    if (typeof offre.prix === 'string') {
      price = `${offre.prix} FCFA`
    } else if (offre.prix.mensuel) {
      price = `${offre.prix.mensuel} FCFA`
      if (offre.prix.annuel && offre.prix.annuel !== offre.prix.mensuel) {
        psub = `/mois · Annuel ${offre.prix.annuel} FCFA/mois`
      } else {
        psub = fb.psub
      }
    }
  }

  // Ressources depuis Strapi
  const resources = (Array.isArray(offre?.ressources) && offre.ressources.length > 0)
    ? offre.ressources
    : fb.resources || []

  // SLA depuis Strapi
  const sla = offre?.sla || fb.sla || ''

  // Add-ons depuis Strapi
  let addons_short = fb.addons_short || ''
  if (Array.isArray(offre?.addons) && offre.addons.length > 0) {
    addons_short = offre.addons.map(a => a.nom || a).join(' · ')
  }

  // Features → pitch_details
  const pitch_details = (Array.isArray(offre?.features) && offre.features.length > 0)
    ? offre.features
    : fb.pitch_details || []

  // PID → href
  const pid = offre?.pid ?? fb.pid
  const href = pid
    ? `https://manage.jokko.africa/cart.php?a=add&pid=${pid}`
    : 'https://manage.jokko.africa/submitticket.php?step=2&deptid=1&subject=Demande%20offre'
  const btn = pid ? `Commander ${offre?.nom || fb.name || ''}` : 'Demander un devis'

  return {
    name:          offre?.nom         || fb.name         || slug,
    sub:           offre?.tagline     || fb.sub          || '',
    seg:           fb.seg             || '',
    seg_color:     segColor,
    pitch_title:   fb.pitch_title     || offre?.tagline  || '',
    pitch:         offre?.description || fb.pitch        || '',
    pitch_details,
    price,
    psub,
    resources,
    sla,
    addons_short,
    href,
    btn,
  }
}

export function OffreModal({ slug, offre, onClose }) {
  // offre = données Strapi normalisées (optionnel) — fallback sur statique
  const d = buildModalData(offre, slug)
  if (!d.name) return null

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const cc = d.seg_color

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{
      position: 'fixed', inset: 0, zIndex: 3000,
      background: 'rgba(15,15,20,.65)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
    }}>
      <div style={{
        background: '#fff', borderRadius: 20, width: '100%', maxWidth: 520,
        maxHeight: '92vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        boxShadow: '0 32px 80px rgba(0,0,0,.25)',
      }}>
        {/* HEADER */}
        <div style={{ padding: '22px 24px 18px', flexShrink: 0, borderBottom: `3px solid ${cc}22` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              {d.seg && (
                <div style={{ display: 'inline-block', background: `${cc}18`, color: cc, fontSize: '.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px', padding: '4px 10px', borderRadius: 20, marginBottom: 10 }}>
                  {d.seg}
                </div>
              )}
              <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.5rem', fontWeight: 700, color: '#0D0D0D', margin: '0 0 2px', lineHeight: 1.2 }}>{d.name}</h3>
              <div style={{ fontSize: '.8rem', color: '#aaa' }}>{d.sub}</div>
            </div>
            <button onClick={onClose} style={{ background: '#F4F4F6', border: 'none', cursor: 'pointer', width: 32, height: 32, minWidth: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', flexShrink: 0 }}>✕</button>
          </div>
        </div>

        {/* SCROLL BODY */}
        <div style={{ overflowY: 'auto', flex: 1 }}>

          {/* PITCH */}
          <div style={{ padding: '22px 24px 18px', borderBottom: '1px solid #F0F0F2' }}>
            {d.pitch_title && (
              <h4 style={{ fontFamily: 'var(--fd)', fontSize: '1.05rem', fontWeight: 700, color: cc, lineHeight: 1.4, margin: '0 0 10px', fontStyle: 'italic' }}>{d.pitch_title}</h4>
            )}
            {d.pitch && (
              <p style={{ fontSize: '.88rem', lineHeight: 1.75, color: '#555', margin: '0 0 16px' }}>{d.pitch}</p>
            )}
            {d.pitch_details.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {d.pitch_details.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                    {CHECK(cc)}
                    <span style={{ fontSize: '.84rem', color: '#333', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RESSOURCES */}
          {d.resources.length > 0 && (
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #F0F0F2' }}>
              <div style={{ fontSize: '.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px', color: '#BBBBC0', marginBottom: 10 }}>Ressources techniques</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {d.resources.map((r, i) => (
                  <span key={i} style={{ background: `${cc}12`, color: cc, fontSize: '.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: 999 }}>{r}</span>
                ))}
              </div>
            </div>
          )}

          {/* SLA */}
          {d.sla && (
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #F0F0F2' }}>
              <div style={{ fontSize: '.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px', color: '#BBBBC0', marginBottom: 8 }}>Engagements SLA</div>
              <div style={{ fontSize: '.82rem', color: '#555', lineHeight: 1.6 }}>{d.sla}</div>
            </div>
          )}

          {/* ADD-ONS */}
          {d.addons_short && (
            <div style={{ padding: '16px 24px 20px' }}>
              <div style={{ fontSize: '.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px', color: '#BBBBC0', marginBottom: 8 }}>Add-ons courants</div>
              <div style={{ fontSize: '.8rem', color: '#888', lineHeight: 1.7 }}>{d.addons_short}</div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #F0F0F2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexShrink: 0, background: '#FAFAFA' }}>
          <div>
            <div style={{ fontFamily: 'var(--fd)', fontSize: '1.4rem', fontWeight: 700, color: cc, lineHeight: 1 }}>{d.price}</div>
            <div style={{ fontSize: '.72rem', color: '#999', marginTop: 4 }}>{d.psub}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href={d.href} target="_blank" rel="noreferrer"
              style={{ padding: '11px 22px', background: cc, color: '#fff', fontWeight: 700, fontSize: '.84rem', borderRadius: 10, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              {d.btn} →
            </a>
            <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer"
              style={{ padding: '11px 16px', background: '#F4F4F6', color: '#333', fontWeight: 700, fontSize: '.84rem', borderRadius: 10, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
