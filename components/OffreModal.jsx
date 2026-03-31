'use client'
import { useEffect } from 'react'

const OFFRES = {
  racine: {
    name: 'Racine', sub: 'Votre premier site, zéro stress', seg: 'Startup', seg_color: '#E85D04',
    pitch_title: 'Votre présence en ligne, dès le premier jour.',
    pitch: "Vous lancez votre projet. Pas besoin de comprendre la technique — vous avez juste à publier. Jokko s'assure que ça tourne, dès le jour 1, avec un support humain basé à Dakar.",
    pitch_details: ["Activation en moins de 24h", "Accompagnement au démarrage inclus", "SSL, hébergement fiable, support local", "Évolution vers Sahara puis Baobab sans jamais changer de prestataire"],
    price: '2 000 FCFA', psub: '/mois · Engagement annuel — 24 000 FCFA/an',
    resources: ['1 vCPU', '1 Go RAM', '10 Go SSD', '100 Go trafic'],
    sla: 'Disponibilité 99,5% · Support email J+1 · Incidents traités sous 24h',
    addons_short: 'Papyrus Email · Oasis Backup · Onboarding Accompagné',
    href: 'https://manage.jokko.africa/cart.php?a=add&pid=1', btn: 'Commander Racine',
  },
  sahara: {
    name: 'Sahara', sub: 'WordPress optimisé, trafic garanti', seg: 'Startup', seg_color: '#E85D04',
    pitch_title: 'WordPress prêt. Rapide. Sécurisé. Vous publiez, on gère le moteur.',
    pitch: "Vous créez du contenu ou vendez en ligne. Votre WordPress est préinstallé, optimisé et boosté avec un CDN Afrique — pour que vos visiteurs restent et convertissent.",
    pitch_details: ["WordPress préinstallé et optimisé", "Cache LiteSpeed + CDN Afrique pour une vitesse maximale", "SEO technique intégré dès le démarrage", "Évolution vers Baobab sans migration — aucune interruption"],
    price: '4 000 FCFA', psub: '/mois · Annuel 48 000 FCFA',
    resources: ['1 vCPU', '2 Go RAM', '20 Go NVMe', '200 Go trafic'],
    sla: 'Disponibilité 99,5% · Support email J+1 · Incidents sous 24h',
    addons_short: 'Tam-Tam Email Pro · Oasis Backup · Onboarding',
    href: 'https://manage.jokko.africa/cart.php?a=add&pid=2', btn: 'Commander Sahara',
  },
  teranga: {
    name: 'Téranga', sub: 'Le cloud solidaire — ONG & Associations', seg: 'Startup', seg_color: '#E85D04',
    pitch_title: 'Votre mission est essentielle. Votre présence numérique aussi.',
    pitch: "Vous avez une mission sociale, un budget serré, et des projets multiples. Téranga protège votre présence numérique à un tarif solidaire — pour que vous vous concentriez sur ce qui compte vraiment : votre impact.",
    pitch_details: ["Multi-sites jusqu'à 3 projets sur un seul abonnement", "Tarif solidaire adapté aux structures ESS", "Support dédié qui comprend vos contraintes associatives", "Backups hebdomadaires — vos données sont en sécurité"],
    price: '5 000 FCFA', psub: '/mois · Engagement annuel — 60 000 FCFA/an',
    resources: ['2 vCPU', '2 Go RAM', '30 Go SSD', '300 Go trafic'],
    sla: 'Disponibilité 99,5% · Support email J+1 · Incidents sous 24h',
    addons_short: 'Papyrus Email · Oasis Backup · Griot SMS',
    href: 'https://manage.jokko.africa/cart.php?a=add&pid=3', btn: 'Commander Téranga',
  },
  baobab: {
    name: 'Baobab', sub: "L'hébergement pro souverain", seg: 'Entreprise', seg_color: '#E85D04',
    pitch_title: 'Votre entreprise mérite un hébergement à la hauteur de ses ambitions.',
    pitch: "Souverain, fiable, local. Votre site tourne sur une infrastructure 100% Sénégal avec un domaine .SN inclus, des backups quotidiens et un SLA contractuel. Un vrai partenaire, pas un ticket de support.",
    pitch_details: ["Hébergement 100% Sénégal — données souveraines", "Domaine .SN inclus sans frais cachés", "Backups quotidiens — votre business ne s'arrête jamais", "SLA contractuel avec engagement de disponibilité 99,9%"],
    price: '12 500 FCFA', psub: '/mois · Trim. 37 500 · Annuel 150 000 FCFA',
    resources: ['2 vCPU dédiés', '4 Go RAM', '40 Go NVMe', '500 Go trafic'],
    sla: 'SLA 99,9% contractuel · Support Email+Tél 8h/5j · Incidents sous 4h ouvrées',
    addons_short: 'Tam-Tam Email · Oasis Backup · Support Priorité',
    href: 'https://manage.jokko.africa/cart.php?a=add&pid=4', btn: 'Commander Baobab',
  },
  fondation: {
    name: 'Fondation', sub: 'Vos applications métier, zéro gestion infra', seg: 'Entreprise', seg_color: '#E85D04',
    pitch_title: "Vous déployez vos apps. On gère tout ce qu'il y a en dessous.",
    pitch: "Vous ne touchez jamais un serveur. PaaS managé multi-stacks, déploiement Git, SSL, backups — tout est géré. Fondation est l'alternative locale à Heroku et Render, avec la souveraineté en plus.",
    pitch_details: ["Multi-stacks Node.js, Python, PHP, Java — vous choisissez", "Déploiement Git intégré — push, c'est en ligne", "Alternative locale souveraine à Heroku / Render", "SLA contractuel — votre app ne dormira pas"],
    price: '25 000 FCFA', psub: '/mois · Annuel 20 000 FCFA/mois (-20%) — 240 000 FCFA/an',
    resources: ['2 vCPU dédiés', '4 Go RAM', '50 Go NVMe', '500 Go trafic'],
    sla: 'SLA 99,9% contractuel · Support Email+Tél 8h/5j · Incidents sous 4h ouvrées',
    addons_short: 'Oasis Backup · PRA Essentiel · Support Priorité',
    href: 'https://manage.jokko.africa/cart.php?a=add&pid=5', btn: 'Commander Fondation',
  },
  savane: {
    name: 'Savane', sub: 'Votre cloud privé, votre contrôle', seg: 'Entreprise', seg_color: '#E85D04',
    pitch_title: 'Vous grandissez vite. Votre infra doit suivre sans que vous gériez la complexité.',
    pitch: "Cloud privé isolé, firewall dédié, snapshots, scalable à la demande — avec un référent technique qui connaît votre contexte. Quand vous scalez, Savane suit.",
    pitch_details: ["VPC dédié isolé — vos données ne partagent rien", "Firewall dédié + snapshots à la demande", "Scalable à la demande sans migration", "Support prioritaire + référent technique dédié"],
    price: '35 000 FCFA', psub: '/mois · Annuel 28 000 FCFA/mois (-20%) — 336 000 FCFA/an',
    resources: ['4 vCPU dédiés', '8 Go RAM', '100 Go NVMe', '1 To trafic'],
    sla: 'SLA 99,9% contractuel · Support Email+Tél 8h/5j · Incidents sous 4h ouvrées',
    addons_short: 'PRA Essentiel · Référent Dédié · Astreinte 24/7',
    href: 'https://manage.jokko.africa/cart.php?a=add&pid=6', btn: 'Commander Savane',
  },
  heritage: {
    name: 'Héritage', sub: 'Archivage souverain certifié', seg: 'Institution', seg_color: '#6B4C9A',
    pitch_title: 'Vos données restent au Sénégal. Chiffrées, répliquées, conformes.',
    pitch: "Point final. Chiffrement AES-256 bout en bout, réplication multi-site, conformité APDP et rapports d'audit trimestriels fournis. Vous dormez tranquille — nous portons la responsabilité.",
    pitch_details: ["AES-256 bout en bout — aucun accès non autorisé", "Réplication multi-site Sénégal — données jamais perdues", "Conformité APDP vérifiée et documentée", "Rapports d'audit trimestriels prêts pour vos obligations légales"],
    price: '25 000 FCFA', psub: '/mois · Engagement annuel — 300 000 FCFA/an',
    resources: ['500 Go chiffré', 'Rétention 12 mois', 'Réplication automatique'],
    sla: 'SLA 99,95% + pénalités · Support 24/7 dédié · Incidents sous 1h',
    addons_short: 'Conformité APDP audit · Onboarding Accompagné',
    href: 'https://manage.jokko.africa/cart.php?a=add&pid=7', btn: 'Commander Héritage',
  },
  forteresse: {
    name: 'Forteresse', sub: 'Plan de reprise certifié', seg: 'Institution', seg_color: '#6B4C9A',
    pitch_title: "Votre système ne peut pas s'arrêter. On s'en porte garant, par contrat.",
    pitch: "PRA documenté et testé deux fois par an. RTO inférieur à 4 heures. Monitoring 24/7. Référent dédié nommé. Basculement automatique. Pour les systèmes où l'arrêt n'est tout simplement pas une option.",
    pitch_details: ["PRA testé semestriellement — pas sur papier, en conditions réelles", "RTO < 4h / RPO < 1h — garanti par contrat avec pénalités", "Monitoring 24/7 par IA Ops — détection avant vos utilisateurs", "Référent technique dédié nommé — vous savez qui appeler"],
    price: '45 000 FCFA', psub: '/mois · Engagement annuel — 540 000 FCFA/an',
    resources: ['PRA complet', 'Monitoring IA', 'Tests bi-annuels', 'Basculement automatique'],
    sla: 'SLA 99,95% + pénalités · Support 24/7 dédié · Incidents sous 1h',
    addons_short: 'Bouclier Zero Trust · Sentinelle Monitoring (inclus)',
    href: 'https://manage.jokko.africa/cart.php?a=add&pid=8', btn: 'Commander Forteresse',
  },
  kilimandjaro: {
    name: 'Kilimandjaro', sub: 'Puissance bare metal, zéro compromis', seg: 'Institution', seg_color: '#6B4C9A',
    pitch_title: 'Vous exigez le maximum. Un serveur physique dédié, une disponibilité totale.',
    pitch: "La puissance d'un datacenter dédié avec le support Jokko 24/7 et des SLA à pénalités. 8 CPU physiques, 32 Go ECC, 500 Go NVMe RAID — rien n'est partagé, tout est pour vous.",
    pitch_details: ["Serveur physique dédié HA — ressources exclusives, jamais partagées", "VDC inclus — virtualisez à votre guise sur votre matériel", "Support 24/7 prioritaire avec SLA à pénalités contractuelles", "Configurations sur mesure disponibles sur devis"],
    price: '85 000 FCFA', psub: '/mois · Configurations sur mesure sur devis',
    resources: ['8 CPU physiques', '32 Go ECC RAM', '500 Go NVMe RAID', '5 To trafic'],
    sla: 'SLA 99,95% + pénalités · Support 24/7 dédié · Incidents sous 1h',
    addons_short: 'Bouclier Zero Trust · Conformité APDP',
    href: 'https://manage.jokko.africa/submitticket.php?step=2&deptid=1&subject=Demande%20Kilimandjaro', btn: 'Demander un devis',
  },
}

const CHECK = (color) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export function OffreModal({ slug, onClose }) {
  const d = OFFRES[slug]
  if (!d) return null

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
              <div style={{ display: 'inline-block', background: `${cc}18`, color: cc, fontSize: '.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px', padding: '4px 10px', borderRadius: 20, marginBottom: 10 }}>
                {d.seg}
              </div>
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
            <h4 style={{ fontFamily: 'var(--fd)', fontSize: '1.05rem', fontWeight: 700, color: cc, lineHeight: 1.4, margin: '0 0 10px', fontStyle: 'italic' }}>{d.pitch_title}</h4>
            <p style={{ fontSize: '.88rem', lineHeight: 1.75, color: '#555', margin: '0 0 16px' }}>{d.pitch}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {d.pitch_details.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                  {CHECK(cc)}
                  <span style={{ fontSize: '.84rem', color: '#333', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RESSOURCES */}
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #F0F0F2' }}>
            <div style={{ fontSize: '.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px', color: '#BBBBC0', marginBottom: 10 }}>Ressources techniques</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {d.resources.map((r, i) => (
                <span key={i} style={{ background: `${cc}12`, color: cc, fontSize: '.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: 999 }}>{r}</span>
              ))}
            </div>
          </div>

          {/* SLA */}
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #F0F0F2' }}>
            <div style={{ fontSize: '.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px', color: '#BBBBC0', marginBottom: 8 }}>Engagements SLA</div>
            <div style={{ fontSize: '.82rem', color: '#555', lineHeight: 1.6 }}>{d.sla}</div>
          </div>

          {/* ADD-ONS */}
          <div style={{ padding: '16px 24px 20px' }}>
            <div style={{ fontSize: '.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px', color: '#BBBBC0', marginBottom: 8 }}>Add-ons courants</div>
            <div style={{ fontSize: '.8rem', color: '#888', lineHeight: 1.7 }}>{d.addons_short}</div>
          </div>
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

      <style>{`@media(max-width:540px){ .offre-modal-box { border-radius: 20px 20px 0 0 !important; } }`}</style>
    </div>
  )
}
