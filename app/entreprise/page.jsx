import PageHero from '@/components/PageHero'
import OffresSection from '@/components/OffresSection'
import PersonasSection from '@/components/PersonasSection'
import AddonsSection from '@/components/AddonsSection'
import SlaSection from '@/components/SlaSection'
import TrajectoireSection from '@/components/TrajectoireSection'
import FaqSection from '@/components/FaqSection'
import { getOffresBySegment } from '@/lib/strapi'

export const revalidate = 3600

const PERSONAS = [
  { title: 'PME établie', desc: "Vous avez une équipe, des clients, et vous avez besoin de stabilité.", iconPath: '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 3v18"/>' },
  { title: 'E-commerce en production', desc: "Votre boutique en ligne génère du CA et ne peut pas tomber.", iconPath: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>' },
  { title: 'SaaS / App métier', desc: "Vous déployez des applications et avez besoin d'un PaaS managé.", iconPath: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>' },
  { title: 'Forte croissance', desc: "Vous scalez vite et votre infra doit suivre le rythme.", iconPath: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>' },
]

const ADDONS = [
  { name: 'PRA Essentiel', desc: 'Plan de reprise, RTO < 4h, testé 2x/an.', prix: '15 000 FCFA/mois', category: 'Sécurité', pitch: "Votre activité ne peut pas s'arrêter ? PRA Essentiel garantit la reprise en moins de 4 heures. PRA documenté, testé semestriellement, basculement automatique.", features: ['PRA documenté et testé 2x/an', 'RTO < 4h / RPO < 1h', 'Basculement automatique', 'Référent technique dédié'], iconPath: '<path d="M12 3l8 4v5c0 5-4 9-8 10C8 21 4 17 4 12V7z"/><polyline points="9 12 11 14 15 10"/>' },
  { name: 'Référent Dédié', desc: 'Interlocuteur technique nommé, appels mensuels.', prix: '25 000 FCFA/mois', category: 'Support', pitch: "Fini les transferts sans fin. Vous avez un nom, un numéro, quelqu'un qui connaît votre contexte par cœur.", features: ['Interlocuteur technique nommé', 'Connaissance approfondie de votre environnement', 'Appels planifiés mensuels proactifs', 'Point d\'escalade direct en cas d\'urgence'], iconPath: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
  { name: 'Astreinte 24/7', desc: 'Couverture nuits, weekends, jours fériés.', prix: '35 000 FCFA/mois', category: 'Support', pitch: "Votre activité ne s'arrête pas à 18h. Votre support non plus. Intervention garantie en moins d\'une heure, même à 3h du matin.", features: ['Couverture 24h/24, 7j/7, 365j/an', 'Intervention garantie < 1h (nuit/weekend)', 'Astreinte téléphonique dédiée', 'Rapport d\'astreinte mensuel'], iconPath: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>' },
  { name: 'Revue Stratégique', desc: 'Bilan trimestriel, recommandations, prévisions.', prix: '15 000 FCFA/mois', category: 'Support', pitch: "Un bon partenaire ne se contente pas de répondre aux problèmes. Il anticipe les opportunités. Bilan trimestriel documenté.", features: ['Bilan trimestriel documenté', 'Analyse de performance', 'Recommandations d\'optimisation', 'Plan d'évolution proposé'], iconPath: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>' },
]

const SLA_STATS = [
  { value: '99,9%', label: 'Disponibilité', iconPath: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>' },
  { value: '8h/5j', label: 'Support', iconPath: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18C1.61 2.09 2.5 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l.73-.74a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>' },
  { value: '< 4h', label: 'Incident', iconPath: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>' },
  { value: 'Quotidien', label: 'Sauvegarde', iconPath: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>' },
  { value: '< 2h', label: 'Restauration', iconPath: '<polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>' },
]

const TRAJECTOIRE = [
  { name: 'Baobab', sub: '12 500 F', current: true, iconPath: '<rect x="2" y="3" width="20" height="5" rx="2"/><rect x="2" y="11" width="20" height="5" rx="2"/><circle cx="6" cy="5.5" r=".7" fill="currentColor"/>' },
  { name: 'Fondation', sub: '25 000 F', current: true, iconPath: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>' },
  { name: 'Savane', sub: '35 000 F', current: true, iconPath: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>' },
  { name: 'Héritage', sub: 'Institution', current: false, iconPath: '<path d="M3 22h18M6 18V10M10 18V10M14 18V10M18 18V10M2 10l10-7 10 7"/>' },
  { name: 'Kilimandjaro', sub: 'Institution', current: false, iconPath: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>' },
]

const FAQS = [
  { q: "Quelle différence entre Baobab et Fondation ?", a: "<strong>Baobab</strong> = hébergement web classique avec domaine .SN. <strong>Fondation</strong> = PaaS managé pour déployer des apps (Node, Python, PHP, Java) via Git." },
  { q: "Puis-je évoluer vers Institution ?", a: "Oui. La trajectoire Jokko : Startup → Entreprise → Institution. Migration sans interruption, sans perte de données." },
  { q: "Le SLA inclut-il des pénalités ?", a: "Oui pour le segment Entreprise : SLA contractuel formalisé. Pour les pénalités avec sanctions financières, voir le segment Institution." },
  { q: "Comment fonctionne le support 8h/5j ?", a: "Par email et téléphone, du lundi au vendredi, de 8h à 18h GMT. Temps de réponse garanti < 4h ouvrées." },
  { q: "Savane inclut un référent dédié ?", a: "Oui, Savane inclut un support prioritaire avec référent technique. L'add-on Référent Dédié formalise davantage la relation avec des appels proactifs mensuels." },
  { q: "Puis-je tester avant de m'engager ?", a: "Contactez-nous pour une démonstration. Nos offres Entreprise sont annuelles ou mensuelles selon le plan choisi." },
]

export default async function EntreprisePage() {
  const offres = await getOffresBySegment('entreprise')
  return (
    <>
      <PageHero
        label="02 — Entreprise"
        title="Votre activité tourne."
        titleEm="On garantit qu'elle ne s'arrête pas."
        desc="Stabilité garantie, SLA contractuel, support réactif, infrastructure évolutive. Votre infra ne sera plus jamais votre problème."
        img="/_assets/logos/equipe-bureau.png"
        badge="Entreprise B2B"
        color="var(--b)"
        ctas={[
          { label: 'Voir les offres ↓', href: '#offres' },
          { label: 'Nous contacter', href: 'https://manage.jokko.africa/submitticket.php' },
        ]}
      />
      <PersonasSection personas={PERSONAS} color="var(--o)" title="Les offres Entreprise sont faites pour vous si…" />
      <OffresSection offres={offres} segment="entreprise" config={{ title: 'Stabilité, production, zéro stress technique', color: 'var(--b)', hasPeriodToggle: true, periodLabel: 'Annuel (-20%)', ctaLabel: 'Commander', ctaHref: 'https://manage.jokko.africa/', ressourceBg: '#F0F2F8', ressourceColor: 'var(--b)', checkColor: 'var(--o)' }} />
      <AddonsSection addons={ADDONS} color="var(--o)" title="Renforcez votre infrastructure" cols={4} />
      <SlaSection stats={SLA_STATS} color="var(--b)" bg="linear-gradient(160deg,#F0F2F8,#E8ECF4,#DEE4F0)" title="Nos engagements Entreprise" badge="SLA 99.9% · Contractuel" />
      <TrajectoireSection steps={TRAJECTOIRE} nextHref="/institution" nextLabel="Institution" color="var(--o)" />
      <FaqSection faqs={FAQS} color="var(--b)" />
      <section style={{ padding: '64px 0', background: 'var(--ow)' }}>
        <div className="container">
          <div className="reveal" style={{ background: 'linear-gradient(135deg,#0D0D0D,#1E2A3A)', borderRadius: 'var(--rx)', padding: '48px 40px', textAlign: 'center', color: '#fff' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, marginBottom: 10 }}>Votre infra ne sera plus jamais votre problème.</h2>
            <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.85)', marginBottom: 24 }}>SLA contractuel. Support réactif. <strong>Jokko assume.</strong></p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://manage.jokko.africa/" target="_blank" rel="noreferrer" className="btn btn-w btn-lg">Espace Client →</a>
              <a href="tel:+221338425735" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.3)' }}>+221 33 842 57 35</a>
              <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.25)' }}>WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
