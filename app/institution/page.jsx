import PageHero from '@/components/PageHero'
import OffresInstitution from '@/components/OffresInstitution'
import { getOffresBySegment, getSeoByPage } from '@/lib/strapi'
import PersonasSection from '@/components/PersonasSection'
import AddonsSection from '@/components/AddonsSection'

export async function generateMetadata() {
  const seo = await getSeoByPage('institution')
  return {
    title:       seo.title,
    description: seo.description,
    keywords:    seo.keywords,
    alternates:  { canonical: 'https://jokko.africa/institution' },
    openGraph: {
      title:       seo.ogTitle       || seo.title,
      description: seo.ogDescription || seo.description,
      url:         'https://jokko.africa/institution',
      images:      seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630 }] : [{ url: '/og-institution.png', width: 1200, height: 630 }],
    },
  }
}
import SlaSection from '@/components/SlaSection'
import FaqSection from '@/components/FaqSection'
export const revalidate = 3600

const PERSONAS = [
  { title: 'Institution publique', desc: 'Conformité APDP, données souveraines, audit trimestriel.', iconPath: '<path d="M3 22h18M6 18V10M10 18V10M14 18V10M18 18V10M2 10l10-7 10 7"/>' },
  { title: 'Banque / Fintech', desc: 'Continuité de service critique, SLA à pénalités.', iconPath: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
  { title: 'Opérateur / Hébergeur', desc: 'Bare metal dédié, 5 To trafic, haute disponibilité.', iconPath: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>' },
  { title: 'Projet gouvernemental IA', desc: 'GPU dédié, environnement isolé, données au Sénégal.', iconPath: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>' },
]

const ADDONS = [
  { name: "Bouclier Zero Trust", desc: "Architecture Zero Trust, micro-segmentation, MFA, contrôle d'accès granulaire.", prix: "Sur devis", category: "Sécurité", pitch: "Ne faites confiance à rien ni personne par défaut. Chaque accès est vérifié, chaque connexion est contrôlée. Architecture Zero Trust pour le plus haut niveau de protection.", features: ["Architecture Zero Trust complète", "Micro-segmentation réseau", "MFA (authentification multi-facteurs)", "Contrôle d'accès granulaire", "Journalisation centralisée"], iconPath: '<path d="M12 3l8 4v5c0 5-4 9-8 10C8 21 4 17 4 12V7z"/><polyline points="9 12 11 14 15 10"/>' },
  { name: "Conformité APDP", desc: "Audit initial, documentation réglementaire, suivi trimestriel, rapports exportables.", prix: "Sur devis", category: "Conformité", pitch: "La conformité n'est pas un luxe. C'est une obligation. On vous aide à la respecter sans douleur. Audit de conformité APDP, documentation, recommandations.", features: ["Audit initial de conformité", "Documentation réglementaire", "Plan d'action personnalisé", "Suivi trimestriel", "Rapports exportables"], iconPath: '<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><polyline points="9 12 11 14 15 10"/>' },
  { name: "Sentinelle Monitoring", desc: "Monitoring 24/7 IA Ops, alertes intelligentes, escalade automatique N1/N2/N3.", prix: "Inclus Institution", category: "Monitoring", pitch: "Vous ne devriez jamais découvrir un problème par vos clients. Sentinelle le détecte avant eux. Monitoring proactif, alertes intelligentes, escalade automatique.", features: ["Monitoring 24/7 (infra + applicatif)", "Alertes intelligentes (IA Ops)", "Escalade automatique N1/N2/N3", "Dashboard temps réel", "Rapports mensuels d'incidents"], iconPath: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>' },
]

const SLA_STATS = [
  { value: '99,95%', label: 'Disponibilité', iconPath: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>' },
  { value: '24/7', label: 'Support dédié', iconPath: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18C1.61 2.09 2.5 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l.73-.74a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>' },
  { value: '< 1h', label: 'Incident', iconPath: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>' },
  { value: '12 mois', label: 'Rétention data', iconPath: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>' },
  { value: 'APDP', label: 'Conformité', iconPath: '<path d="M12 3l8 4v5c0 5-4 9-8 10C8 21 4 17 4 12V7z"/><polyline points="9 12 11 14 15 10"/>' },
]

const FAQS = [
  { q: "Quelle offre pour une institution publique ?", a: "<strong>Héritage</strong> pour l'archivage souverain certifié APDP. <strong>Forteresse</strong> si vous avez un plan de continuité à respecter. <strong>Kilimandjaro</strong> pour une infrastructure critique bare metal." },
  { q: "Qu'est-ce que la conformité APDP ?", a: "L'APDP est l'Autorité de Protection des Données Personnelles du Sénégal. Toutes nos offres Institution incluent la conformité APDP de base. L'add-on Conformité APDP couvre l'audit complet." },
  { q: "Les données quittent-elles le Sénégal ?", a: "100% non. Datacenter Tier III+ à Dakar. Réplication multi-site uniquement sur le territoire sénégalais. Données jamais hors du territoire national." },
  { q: "Le SLA inclut-il des pénalités financières ?", a: "Oui. Le segment Institution inclut des SLA avec pénalités contractuelles : crédit de 10% par tranche de 0,1% sous le seuil de disponibilité." },
  { q: "Quel délai pour une mise en production Institution ?", a: "Comptez 5 à 15 jours selon la complexité. Notre équipe réalise l'audit technique, la migration zéro downtime et la formation de vos équipes." },
  { q: "Peut-on avoir un référent dédié nommé ?", a: "Oui, le référent dédié est inclus dans toutes les offres Institution. Il anticipe vos besoins, connaît votre historique, et intervient avant que vous n'appeliez." },
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
        img="/_assets/logos/datacenter-institution.jpg"
        badge="Institution B2G"
        color="var(--p)"
        bg="linear-gradient(135deg,#F3EFF8,#EDE6F5)"
        ctas={[
          { label: 'Voir les offres ↓', href: '#offres' },
          { label: 'Demander conseil', href: 'https://manage.jokko.africa/submitticket.php' },
        ]}
      />
      <PersonasSection personas={PERSONAS} color="var(--p)" title="Les offres Institution sont faites pour vous si…" />
      <OffresInstitution offres={offres} />
      <AddonsSection addons={ADDONS} color="var(--p)" title="Sécurité & conformité avancées" cols={3} />

      {/* Services Managés */}
      <section style={{ padding: '60px 0', background: '#F5F5F3' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="label" style={{ justifyContent: 'center', color: 'var(--p)' }}>Services Managés</div>
            <h2 className="title">Votre IT géré par des experts souverains</h2>
            <p style={{ fontSize: '.95rem', color: 'var(--bs)', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>Kora virtualise vos applications Windows. Jokko Manage administre votre infrastructure. 100% Sénégal, SLA contractuel.</p>
          </div>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 860, margin: '0 auto' }}>
            {[
              { name: 'Kora', sub: 'Virtualisation d\'applications Windows', desc: 'Serveur Windows dédié datacenter Jokko. Accès HTML5 navigateur — aucun logiciel à installer. Compatible PC, Mac, tablette. Sauvegarde quotidienne incluse.', prix: 'Entreprise (16–25 users) : 13 000 FCFA/user/mois · Institution (26+) : Sur devis', icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>' },
              { name: 'Jokko Manage', sub: 'Infogérance souveraine clé en main', desc: 'Administration OS, supervision proactive, gestion BDD, sauvegardes opérationnelles vérifiées, conseil et planification IT. SLA 2h sur formule Souverain.', prix: 'Pro (3 serveurs) : 120 000 FCFA/mois · Souverain (5 serveurs) : À partir de 200 000 FCFA/mois', icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
            ].map((sv, i) => (
              <div key={i} className="hover-lift" style={{ background: '#fff', border: '1px solid var(--bd)', borderRadius: 16, padding: '28px 24px', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, minWidth: 48, borderRadius: 12, background: '#6B4C9A18', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--p)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: sv.icon }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.05rem', fontWeight: 700, marginBottom: 2 }}>{sv.name}</h3>
                    <div style={{ fontSize: '.78rem', color: 'var(--bm)' }}>{sv.sub}</div>
                  </div>
                </div>
                <p style={{ fontSize: '.88rem', color: 'var(--bs)', lineHeight: 1.7, marginBottom: 14 }}>{sv.desc}</p>
                <div style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--p)', borderTop: '1px solid var(--bd)', paddingTop: 12 }}>{sv.prix}</div>
                <div style={{ marginTop: 14 }}>
                  <a href="https://manage.jokko.africa/submitticket.php" target="_blank" rel="noreferrer" className="btn" style={{ fontSize: '.82rem', background: 'var(--p)', color: '#fff' }}>Demander un devis →</a>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '.78rem', color: 'var(--bm)', marginTop: 20 }}>B2B et B2G uniquement · SLA contractuel · Hors astreinte 24/7</p>
        </div>
      </section>
      <SlaSection stats={SLA_STATS} color="var(--p)" bg="linear-gradient(160deg,#F3F0FA,#EDE8F5,#E2D9F0)" title="Nos engagements Institution" badge="SLA 99.95% · Pénalités contractuelles" />
      <FaqSection faqs={FAQS} color="var(--p)" />
      
    </>
  )
}
