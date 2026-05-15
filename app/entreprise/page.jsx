import PageHero from '@/components/PageHero'
import OffresEntreprise from '@/components/OffresEntreprise'
import { getOffresBySegment, getSeoByPage } from '@/lib/strapi'
import PersonasSection from '@/components/PersonasSection'
import AddonsSection from '@/components/AddonsSection'

export async function generateMetadata() {
  const seo = await getSeoByPage('entreprise')
  return {
    title:       seo.title,
    description: seo.description,
    keywords:    seo.keywords,
    alternates:  { canonical: 'https://jokko.africa/entreprise' },
    openGraph: {
      title:       seo.ogTitle       || seo.title,
      description: seo.ogDescription || seo.description,
      url:         'https://jokko.africa/entreprise',
      images:      seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630 }] : [{ url: '/og-entreprise.png', width: 1200, height: 630 }],
    },
  }
}
import SlaSection from '@/components/SlaSection'
import TrajectoireSection from '@/components/TrajectoireSection'
import FaqSection from '@/components/FaqSection'

export const revalidate = 3600

const PERSONAS = [
  { title: 'PME établie', desc: "Vous avez une équipe, des clients, et vous avez besoin de stabilité.", iconPath: '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 3v18"/>' },
  { title: 'E-commerce en production', desc: "Votre boutique en ligne génère du CA et ne peut pas tomber.", iconPath: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>' },
  { title: 'SaaS / App métier', desc: "Vous déployez des applications et avez besoin d'un PaaS managé.", iconPath: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>' },
  { title: 'Forte croissance', desc: "Vous scalez vite et votre infra doit suivre le rythme.", iconPath: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>' },
]

const ADDONS = [
  { name: "PRA Essentiel", desc: "Plan de reprise, RTO < 4h, testé 2x/an.", prix: "15 000 FCFA/mois", category: "Sécurité", pitch: "Votre activité ne peut pas s'arrêter ? PRA Essentiel garantit la reprise en moins de 4 heures. PRA documenté, testé semestriellement, basculement automatique.", features: ["PRA documenté et testé 2x/an", "RTO < 4h / RPO < 1h", "Basculement automatique", "Référent technique dédié"], iconPath: '<path d="M12 3l8 4v5c0 5-4 9-8 10C8 21 4 17 4 12V7z"/><polyline points="9 12 11 14 15 10"/>' },
  { name: "Référent Dédié", desc: "Interlocuteur technique nommé, appels mensuels.", prix: "25 000 FCFA/mois", category: "Support", pitch: "Fini les transferts sans fin. Vous avez un nom, un numéro, quelqu'un qui connaît votre contexte par coeur.", features: ["Interlocuteur technique nommé", "Connaissance approfondie de votre environnement", "Appels planifiés mensuels proactifs", "Point d'escalade direct en cas d'urgence"], iconPath: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
  { name: "Astreinte 24/7", desc: "Couverture nuits, weekends, jours fériés.", prix: "35 000 FCFA/mois", category: "Support", pitch: "Votre activité ne s'arrête pas à 18h. Votre support non plus. Intervention garantie en moins d'une heure, même à 3h du matin.", features: ["Couverture 24h/24, 7j/7, 365j/an", "Intervention garantie < 1h (nuit/weekend)", "Astreinte téléphonique dédiée", "Rapport d'astreinte mensuel"], iconPath: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>' },
  { name: "Revue Stratégique", desc: "Bilan trimestriel, recommandations, prévisions.", prix: "15 000 FCFA/mois", category: "Support", pitch: "Un bon partenaire ne se contente pas de répondre aux problèmes. Il anticipe les opportunités. Bilan trimestriel documenté.", features: ["Bilan trimestriel documenté", "Analyse de performance", "Recommandations d'optimisation", "Plan d'évolution proposé"], iconPath: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>' },
,
  { name: "Sentinelle — Monitoring 24/7", desc: "Monitoring proactif, alertes intelligentes, escalade automatique. Détection avant vos clients.", prix: "8 000 FCFA/mois", category: "Sécurité", pitch: "Vous ne devriez jamais découvrir un problème par vos clients. Sentinelle le détecte avant eux. Monitoring proactif par l'IA Ops Jokko.", features: ["Monitoring 24/7 proactif", "Alertes intelligentes multi-canaux", "Escalade automatique", "Dashboard temps réel"], iconPath: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>' },
  { name: "Expansion — Stockage NVMe", desc: "Espace NVMe additionnel sans migration. Blocs S, M et L disponibles. 100% Sénégal.", prix: "Bloc S (+20 Go) : 1 500 FCFA/mois · Bloc M (+50 Go) : 3 000 FCFA/mois · Bloc L (+100 Go) : 7 500 FCFA/mois", category: "Stockage", pitch: "L'espace disque grandit avec vous. Expansion ajoute du stockage NVMe directement sur votre offre sans interruption, sans migration.", features: ["NVMe haute performance", "Activation sans interruption", "Blocs S, M et L disponibles", "Hébergement 100% Sénégal", "Résiliation mensuelle"], iconPath: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>' },
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
        desc="Chaque minute d'arrêt vous coûte de l'argent, des clients, de la crédibilité. Votre infra ne sera plus jamais votre problème."
        img="/_assets/logos/equipe-bureau.png"
        badge="Entreprise B2B"
        color="var(--b)"
        ctaPrimaryColor="#0D0D0D"
        bg="linear-gradient(135deg,#F0F2F8,#E8ECF4)"
        ctas={[
          { label: 'Voir les offres ↓', href: '#offres' },
          { label: 'Demander conseil', href: 'https://manage.jokko.africa/submitticket.php' },
        ]}
      />
      <PersonasSection personas={PERSONAS} color="var(--o)" title="Les offres Entreprise sont faites pour vous si…" />
      <OffresEntreprise offres={offres} />
      <AddonsSection addons={ADDONS} color="var(--o)" title="Renforcez votre infrastructure" cols={4} />

      {/* Services Managés */}
      <section style={{ padding: '60px 0', background: '#F5F5F3' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="label" style={{ justifyContent: 'center', color: 'var(--o)' }}>Services Managés</div>
            <h2 className="title">Votre IT géré par des experts locaux</h2>
            <p style={{ fontSize: '.95rem', color: 'var(--bs)', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>Gérer un serveur ne devrait pas être votre problème. Kora et Jokko Manage s&apos;en chargent — 100% souverain, 100% Sénégal.</p>
          </div>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 860, margin: '0 auto' }}>
            {[
              { name: 'Kora', sub: 'Virtualisation d\'applications Windows', desc: 'Vos logiciels Windows accessibles depuis n\'importe quel navigateur, sans installation, sans VPN. Compatible PC, Mac, tablette, smartphone.', prix: 'Starter (≤5 users) : 20 000 FCFA/user/mois · Business : 16 000 FCFA/user/mois', icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>' },
              { name: 'Jokko Manage', sub: 'Infogérance souveraine clé en main', desc: 'Administration OS, supervision, gestion BDD, sauvegardes, conseil stratégique. Vous gérez votre métier — on gère votre IT.', prix: 'Essentiel (1 serveur) : 55 000 FCFA/mois · Pro (3 serveurs) : 120 000 FCFA/mois', icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
            ].map((s, i) => (
              <div key={i} className="hover-lift" style={{ background: '#fff', border: '1px solid var(--bd)', borderRadius: 16, padding: '28px 24px', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, minWidth: 48, borderRadius: 12, background: 'var(--obg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--o)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: s.icon }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.05rem', fontWeight: 700, marginBottom: 2 }}>{s.name}</h3>
                    <div style={{ fontSize: '.78rem', color: 'var(--bm)' }}>{s.sub}</div>
                  </div>
                </div>
                <p style={{ fontSize: '.88rem', color: 'var(--bs)', lineHeight: 1.7, marginBottom: 14 }}>{s.desc}</p>
                <div style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--o)', borderTop: '1px solid var(--bd)', paddingTop: 12 }}>{s.prix}</div>
                <div style={{ marginTop: 14 }}>
                  <a href="https://manage.jokko.africa/submitticket.php" target="_blank" rel="noreferrer" className="btn btn-o" style={{ fontSize: '.82rem' }}>Demander un devis →</a>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '.78rem', color: 'var(--bm)', marginTop: 20 }}>B2B et B2G uniquement · SLA contractuel · 100% Sénégal</p>
        </div>
      </section>
      <SlaSection stats={SLA_STATS} color="var(--b)" bg="linear-gradient(160deg,#F0F2F8,#E8ECF4,#DEE4F0)" title="Nos engagements Entreprise" badge="SLA 99.9% · Contractuel" />
      <TrajectoireSection steps={TRAJECTOIRE} nextHref="/institution" nextLabel="Institution" color="var(--o)" />
      <FaqSection faqs={FAQS} color="var(--b)" />
      
    </>
  )
}
