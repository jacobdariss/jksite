import PageHero from '@/components/PageHero'
import OffresSection from '@/components/OffresSection'
import PersonasSection from '@/components/PersonasSection'
import AddonsSection from '@/components/AddonsSection'
import SlaSection from '@/components/SlaSection'
import FaqSection from '@/components/FaqSection'
import { getOffresBySegment } from '@/lib/strapi'

export const revalidate = 3600

const PERSONAS = [
  { title: 'Institution publique', desc: 'Conformité APDP, données souveraines, audit trimestriel.', iconPath: '<path d="M3 22h18M6 18V10M10 18V10M14 18V10M18 18V10M2 10l10-7 10 7"/>' },
  { title: 'Banque / Fintech', desc: 'Continuité de service critique, SLA à pénalités.', iconPath: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
  { title: 'Opérateur / Hébergeur', desc: 'Bare metal dédié, 5 To trafic, haute disponibilité.', iconPath: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>' },
  { title: 'Projet gouvernemental IA', desc: 'GPU dédié, environnement isolé, données au Sénégal.', iconPath: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>' },
]

const ADDONS = [
  { name: 'Bouclier Zero Trust', desc: 'Architecture Zero Trust, micro-segmentation, MFA, contrôle d\'accès granulaire.', prix: 'Sur devis', category: 'Sécurité', pitch: "Ne faites confiance à rien ni personne par défaut. Chaque accès est vérifié, chaque connexion est contrôlée. Architecture Zero Trust pour le plus haut niveau de protection.", features: ['Architecture Zero Trust complète', 'Micro-segmentation réseau', 'MFA (authentification multi-facteurs)', 'Contrôle d\'accès granulaire', 'Journalisation centralisée'], iconPath: '<path d="M12 3l8 4v5c0 5-4 9-8 10C8 21 4 17 4 12V7z"/><polyline points="9 12 11 14 15 10"/>' },
  { name: 'Conformité APDP', desc: 'Audit initial, documentation réglementaire, suivi trimestriel, rapports exportables.', prix: 'Sur devis', category: 'Conformité', pitch: "La conformité n\'est pas un luxe. C\'est une obligation. On vous aide à la respecter sans douleur. Audit de conformité APDP, documentation, recommandations.", features: ['Audit initial de conformité', 'Documentation réglementaire', 'Plan d\'action personnalisé', 'Suivi trimestriel', 'Rapports exportables'], iconPath: '<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><polyline points="9 12 11 14 15 10"/>' },
  { name: 'Sentinelle Monitoring', desc: 'Monitoring 24/7 IA Ops, alertes intelligentes, escalade automatique N1/N2/N3.', prix: 'Inclus Institution', category: 'Monitoring', pitch: "Vous ne devriez jamais découvrir un problème par vos clients. Sentinelle le détecte avant eux. Monitoring proactif, alertes intelligentes, escalade automatique.", features: ['Monitoring 24/7 (infra + applicatif)', 'Alertes intelligentes (IA Ops)', 'Escalade automatique N1/N2/N3', 'Dashboard temps réel', 'Rapports mensuels d\'incidents'], iconPath: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>' },
]

const SLA_STATS = [
  { value: '99,95%', label: 'Disponibilité', iconPath: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>' },
  { value: '24/7', label: 'Support dédié', iconPath: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18C1.61 2.09 2.5 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l.73-.74a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>' },
  { value: '< 1h', label: 'Incident', iconPath: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>' },
  { value: '12 mois', label: 'Rétention data', iconPath: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>' },
  { value: 'APDP', label: 'Conformité', iconPath: '<path d="M12 3l8 4v5c0 5-4 9-8 10C8 21 4 17 4 12V7z"/><polyline points="9 12 11 14 15 10"/>' },
]

const FAQS = [
  { q: 'Quelle offre pour une institution publique ?', a: '<strong>Héritage</strong> pour l'archivage souverain certifié APDP. <strong>Forteresse</strong> si vous avez un plan de continuité à respecter. <strong>Kilimandjaro</strong> pour une infrastructure critique bare metal.' },
  { q: 'Qu'est-ce que la conformité APDP ?', a: "L'APDP est l'Autorité de Protection des Données Personnelles du Sénégal. Toutes nos offres Institution incluent la conformité APDP de base. L'add-on Conformité APDP couvre l'audit complet." },
  { q: 'Les données quittent-elles le Sénégal ?', a: '100% non. Datacenter Tier III+ à Dakar. Réplication multi-site uniquement sur le territoire sénégalais. Données jamais hors du territoire national.' },
  { q: "Le SLA inclut-il des pénalités financières ?", a: "Oui. Le segment Institution inclut des SLA avec pénalités contractuelles : crédit de 10% par tranche de 0,1% sous le seuil de disponibilité." },
  { q: 'Quel délai pour une mise en production Institution ?', a: 'Comptez 5 à 15 jours selon la complexité. Notre équipe réalise l'audit technique, la migration zéro downtime et la formation de vos équipes.' },
  { q: 'Peut-on avoir un référent dédié nommé ?', a: 'Oui, le référent dédié est inclus dans toutes les offres Institution. Il anticipe vos besoins, connaît votre historique, et intervient avant que vous n'appeliez.' },
]

export default async function InstitutionPage() {
  const offres = await getOffresBySegment('institution')
  return (
    <>
      <PageHero
        label="03 — Institution"
        title="Vos obligations sont"
        titleEm="non négociables."
        desc="Souveraineté totale des données, SLA avec pénalités, PRA documenté et testé, support 24/7 dédié. Notre engagement aussi."
        img="/_assets/logos/datacenter.jpg"
        badge="Institution B2G"
        color="var(--p)"
        ctas={[
          { label: 'Voir les offres ↓', href: '#offres' },
          { label: 'Demande de devis', href: 'https://manage.jokko.africa/submitticket.php' },
        ]}
      />
      <PersonasSection personas={PERSONAS} color="var(--p)" title="Les offres Institution sont faites pour vous si…" />
      <OffresSection offres={offres} segment="institution" config={{ title: 'Souveraineté, conformité, continuité garantie', color: 'var(--p)', hasPeriodToggle: false, ctaLabel: 'Demander un devis', ctaHref: 'https://manage.jokko.africa/submitticket.php', ressourceBg: 'rgba(107,76,154,.1)', ressourceColor: 'var(--p)', checkColor: 'var(--p)', showInclusLabel: true }} />
      <AddonsSection addons={ADDONS} color="var(--p)" title="Sécurité & conformité avancées" cols={3} />
      <SlaSection stats={SLA_STATS} color="var(--p)" bg="linear-gradient(160deg,#F3F0FA,#EDE8F5,#E2D9F0)" title="Nos engagements Institution" badge="SLA 99.95% · Pénalités contractuelles" />
      <FaqSection faqs={FAQS} color="var(--p)" />
      <section style={{ padding: '64px 0', background: 'var(--ow)' }}>
        <div className="container">
          <div className="reveal" style={{ background: 'linear-gradient(135deg,#6B4C9A,#8B6FBF)', borderRadius: 'var(--rx)', padding: '48px 40px', textAlign: 'center', color: '#fff' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, marginBottom: 10 }}>La même exigence que vous.</h2>
            <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.85)', marginBottom: 24 }}>SLA à pénalités. Support 24/7 dédié. Données 100% Sénégal. <strong>Jokko assume.</strong></p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://manage.jokko.africa/submitticket.php" target="_blank" rel="noreferrer" className="btn btn-w btn-lg">Demander un devis →</a>
              <a href="tel:+221338425735" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.3)' }}>+221 33 842 57 35</a>
              <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.25)' }}>WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
