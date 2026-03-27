'use client'
import { useState } from 'react'

// Données complètes des offres
const OFFRES = {
  // STARTUP
  racine: {
    nom: 'Racine', segment: 'Startup', color: '#E85D04',
    pitch: 'Vous lancez votre présence en ligne. On s\'assure que ça tourne, dès le premier jour.',
    ideal: 'Créateur qui se lance, association qui démarre, premier site vitrine.',
    prix: { mensuel: 2000, annuel: 2000 },
    periode: 'Engagement annuel — 24 000 FCFA/an',
    ressources: ['1 vCPU', '1 Go RAM', '10 Go SSD', '100 Go trafic'],
    sla: '99,5% · Email J+1 · Incident 24h',
    features: ['Hébergement fiable avec support local', 'Certificat SSL inclus', 'Activation en moins de 24h', 'Accompagnement au démarrage'],
    addons: ['Papyrus webmail — 750 FCFA/user/mois', 'Oasis Backup — 2 000 FCFA/mois', 'Onboarding Accompagné — 25 000 FCFA'],
  },
  sahara: {
    nom: 'Sahara', segment: 'Startup', color: '#E85D04',
    pitch: 'Vous créez du contenu ou vendez en ligne. On optimise votre WordPress pour que vos visiteurs restent.',
    ideal: 'Blogueur, média, boutique WooCommerce, créateur de contenu.',
    prix: { mensuel: 4000, annuel: 4000 },
    periode: 'Semestriel : 24 000 FCFA · Annuel : 48 000 FCFA',
    ressources: ['1 vCPU', '2 Go RAM', '20 Go NVMe', '200 Go trafic'],
    sla: '99,5% · Email J+1 · Incident 24h',
    features: ['WordPress préinstallé et optimisé', 'Cache LiteSpeed + CDN Afrique', 'SEO technique intégré', 'Évolution vers Baobab sans migration'],
    addons: ['Tam-Tam email pro — 1 000 FCFA/user/mois', 'Oasis Backup — 2 000 FCFA/mois', 'Onboarding Accompagné — 25 000 FCFA'],
  },
  teranga: {
    nom: 'Téranga', segment: 'Startup', color: '#E85D04',
    pitch: 'Vous avez une mission sociale. On protège votre présence numérique pour que vous puissiez vous concentrer sur votre impact.',
    ideal: 'ONG, association, collectif, structure ESS.',
    prix: { mensuel: 5000, annuel: 5000 },
    periode: 'Engagement annuel — 60 000 FCFA/an',
    ressources: ['2 vCPU', '2 Go RAM', '30 Go SSD', '300 Go trafic'],
    sla: '99,5% · Email J+1 · Incident 24h',
    features: ['Multi-sites (jusqu\'à 3 projets)', 'Backups hebdomadaires', 'Support dédié ONG/ESS', 'Tarif solidaire'],
    addons: ['Papyrus webmail — 750 FCFA/user/mois', 'Oasis Backup — 2 000 FCFA/mois', 'Griot SMS — 10 FCFA/SMS'],
  },
  // ENTREPRISE
  baobab: {
    nom: 'Baobab', segment: 'Entreprise', color: '#0D0D0D',
    pitch: 'Votre entreprise mérite un hébergement à la hauteur de ses ambitions. Souverain, fiable, local.',
    ideal: 'PME établie, agence, e-commerce en production.',
    prix: { mensuel: 12500, trimestriel: 37500, semestriel: 75000, annuel: 150000 },
    periode: 'Trim. : 37 500 FCFA · Sem. : 75 000 FCFA · Annuel : 150 000 FCFA',
    ressources: ['2 vCPU dédiés', '4 Go RAM', '40 Go NVMe', '500 Go trafic'],
    sla: '99,9% · Email+Tél 8h/5j · Incident 4h · SLA contractuel',
    features: ['Hébergement pro 100% Sénégal', 'Domaine .SN inclus', 'Backups quotidiens', 'SLA contractuel', 'Évolution fluide vers Savane'],
    addons: ['Tam-Tam email — 1 000 FCFA/user/mois', 'Oasis Backup — 5 000 FCFA/mois', 'Priorité support — 25 000 FCFA/mois'],
  },
  fondation: {
    nom: 'Fondation', segment: 'Entreprise', color: '#0D0D0D',
    pitch: 'Vous déployez vos apps. On gère tout ce qu\'il y a en dessous. Vous ne touchez jamais un serveur.',
    ideal: 'Startup SaaS, PME avec app métier, agence de développement.',
    prix: { mensuel: 25000, annuel: 20000 },
    periode: 'Mensuel : 25 000 FCFA · Annuel : 20 000 FCFA/mois (-20%) = 240 000 FCFA',
    ressources: ['2 vCPU dédiés', '4 Go RAM', '50 Go NVMe', '500 Go trafic'],
    sla: '99,9% · Email+Tél 8h/5j · Incident 4h · SLA contractuel',
    features: ['PaaS managé multi-stacks (Node, Python, PHP, Java)', 'Déploiement Git intégré', 'Backups quotidiens + SSL', 'SLA contractuel'],
    addons: ['Oasis Backup — 5 000 FCFA/mois', 'PRA Essentiel — 15 000 FCFA/mois', 'Référent Dédié — 25 000 FCFA/mois'],
  },
  savane: {
    nom: 'Savane', segment: 'Entreprise', color: '#0D0D0D',
    pitch: 'Vous grandissez vite. Votre infra doit suivre le rythme sans que vous gériez la complexité.',
    ideal: 'PME en forte croissance, startup à traction, plateforme à fort trafic.',
    prix: { mensuel: 35000, annuel: 28000 },
    periode: 'Mensuel : 35 000 FCFA · Annuel : 28 000 FCFA/mois (-20%) = 336 000 FCFA',
    ressources: ['4 vCPU dédiés', '8 Go RAM', '100 Go NVMe', '1 To trafic'],
    sla: '99,9% · Email+Tél 8h/5j · Incident 4h · SLA contractuel',
    features: ['Cloud privé isolé (VPC dédié)', 'Firewall dédié + snapshots', 'Scalable à la demande', 'Support prioritaire + référent'],
    addons: ['PRA Essentiel — 15 000 FCFA/mois', 'Référent Dédié — 25 000 FCFA/mois', 'Astreinte 24/7 — 35 000 FCFA/mois'],
  },
  // INSTITUTION
  heritage: {
    nom: 'Héritage', segment: 'Institution', color: '#6B4C9A',
    pitch: 'Vos données restent au Sénégal. Chiffrées, répliquées, conformes. Point final.',
    ideal: 'Institution publique, banque, entreprise soumise à obligations légales.',
    prix: { annuel: 25000 },
    periode: 'Engagement annuel — 300 000 FCFA/an',
    ressources: ['500 Go chiffré', 'Rétention 12 mois', 'Réplication auto'],
    sla: '99,95% · Support 24/7 dédié · Incident < 1h · SLA + pénalités',
    features: ['Chiffrement AES-256 bout en bout', 'Réplication multi-site Sénégal', 'Conformité APDP', 'Rapports d\'audit trimestriels'],
    addons: ['Conformité APDP audit complet — Sur devis', 'Onboarding Accompagné — Sur devis'],
  },
  forteresse: {
    nom: 'Forteresse', segment: 'Institution', color: '#6B4C9A',
    pitch: 'Votre système ne peut pas s\'arrêter. On s\'en porte garant, par contrat.',
    ideal: 'Système critique, infrastructure étatique, plateforme bancaire.',
    prix: { annuel: 45000 },
    periode: 'Engagement annuel — 540 000 FCFA/an',
    ressources: ['PRA complet', 'Monitoring IA', 'Tests bi-annuels'],
    sla: '99,95% · Support 24/7 dédié · Incident < 1h · SLA + pénalités',
    features: ['PRA documenté et testé semestriellement', 'RTO < 4h / RPO < 1h', 'Basculement automatique', 'Monitoring 24/7 + référent dédié'],
    addons: ['Bouclier Zero Trust — Sur devis', 'Sentinelle Monitoring — Inclus'],
  },
  kilimandjaro: {
    nom: 'Kilimandjaro', segment: 'Institution', color: '#6B4C9A',
    pitch: 'Vous exigez le maximum. Un serveur physique dédié, une disponibilité totale, un engagement sans faille.',
    ideal: 'Banque, opérateur télécom, hébergeur, institution critique.',
    prix: { mensuel: 85000 },
    periode: 'Facturation mensuelle — Configurations sur mesure sur devis',
    ressources: ['8 CPU physiques', '32 Go ECC', '500 Go NVMe RAID', '5 To trafic'],
    sla: '99,95% · Support 24/7 dédié · Incident < 1h · SLA + pénalités',
    features: ['Serveur physique dédié HA', 'VDC inclus', 'Support 24/7 prioritaire', 'SLA contractuel avec pénalités'],
    addons: ['Bouclier Zero Trust — Sur devis', 'Conformité APDP — Sur devis'],
  },
}

export function useModal() {
  const [open, setOpen] = useState(false)
  const [slug, setSlug] = useState(null)
  const openModal = (s) => { setSlug(s); setOpen(true) }
  const closeModal = () => setOpen(false)
  return { open, slug, openModal, closeModal }
}

export function OffreModal({ slug, onClose }) {
  const o = OFFRES[slug]
  if (!o) return null

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 20, width: '100%', maxWidth: 600,
        maxHeight: '90vh', overflow: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,.2)',
      }}>
        {/* Header */}
        <div style={{ padding: '28px 28px 20px', borderBottom: '1px solid var(--bd)', position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: o.color, marginBottom: 4 }}>{o.segment}</div>
              <h2 style={{ fontFamily: 'var(--fd)', fontSize: '1.6rem', fontWeight: 700, marginBottom: 6 }}>{o.nom}</h2>
              <p style={{ fontSize: '.88rem', color: 'var(--bs)', lineHeight: 1.6, maxWidth: 420 }}>« {o.pitch} »</p>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--bm)', padding: 8, borderRadius: 8, lineHeight: 1 }}>✕</button>
          </div>
        </div>

        <div style={{ padding: '24px 28px' }}>
          {/* Idéal pour */}
          <div style={{ background: 'var(--obg)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: '.85rem', color: 'var(--bs)' }}>
            <strong style={{ color: 'var(--o)' }}>Idéal pour :</strong> {o.ideal}
          </div>

          {/* Features */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--bm)', marginBottom: 12 }}>Ce que vous obtenez</div>
            {o.features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={o.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: '.88rem', color: 'var(--bs)' }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Ressources */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {o.ressources.map((r, i) => (
              <span key={i} style={{ background: 'var(--obg2)', color: 'var(--od)', fontSize: '.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: 999 }}>{r}</span>
            ))}
          </div>

          {/* SLA */}
          <div style={{ background: '#F8F8F8', borderRadius: 10, padding: '10px 16px', marginBottom: 20, fontSize: '.8rem', color: 'var(--bs)' }}>
            <strong>SLA :</strong> {o.sla}
          </div>

          {/* Add-ons */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--bm)', marginBottom: 10 }}>Add-ons recommandés</div>
            {o.addons.map((a, i) => (
              <div key={i} style={{ fontSize: '.82rem', color: 'var(--bs)', padding: '4px 0', borderBottom: '1px solid var(--bdl)' }}>+ {a}</div>
            ))}
          </div>
        </div>

        {/* Footer prix + CTA */}
        <div style={{ padding: '20px 28px', background: 'var(--ow)', borderTop: '1px solid var(--bd)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontFamily: 'var(--fd)', fontSize: '1.6rem', fontWeight: 700, color: o.color }}>
              {Object.values(o.prix)[0].toLocaleString('fr-FR')} FCFA<span style={{ fontSize: '.8rem', fontWeight: 400, color: 'var(--bm)' }}>/mois</span>
            </div>
            <div style={{ fontSize: '.72rem', color: 'var(--bm)' }}>{o.periode}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="https://manage.jokko.africa/" target="_blank" rel="noreferrer" className="btn btn-o">Commander →</a>
            <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" className="btn btn-ol">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export { OFFRES }
