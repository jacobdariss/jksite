import PageHero from '@/components/PageHero'
import OffresStartup from '@/components/OffresStartup'
import { getOffresBySegment, getSeoByPage } from '@/lib/strapi'
import PersonasSection from '@/components/PersonasSection'
import AddonsSection from '@/components/AddonsSection'

export async function generateMetadata() {
  const seo = await getSeoByPage('startup')
  return {
    title:       seo.title,
    description: seo.description,
    keywords:    seo.keywords,
    alternates:  { canonical: 'https://jokko.africa/startup' },
    openGraph: {
      title:       seo.ogTitle       || seo.title,
      description: seo.ogDescription || seo.description,
      url:         'https://jokko.africa/startup',
      images:      seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630 }] : [{ url: '/og-startup.png', width: 1200, height: 630 }],
    },
  }
}
import SlaSection from '@/components/SlaSection'
import TrajectoireSection from '@/components/TrajectoireSection'
import FaqSection from '@/components/FaqSection'
export const revalidate = 3600

const PERSONAS = [
  { title: 'Créateur / Freelance', desc: 'Vous lancez votre premier site vitrine ou portfolio.', iconPath: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>' },
  { title: 'Blogueur / Média', desc: 'Vous créez du contenu ou vendez en ligne avec WordPress.', iconPath: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>' },
  { title: 'ONG / Association', desc: 'Vous avez une mission sociale et un budget limité.', iconPath: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
  { title: 'E-commerce débutant', desc: 'Vous lancez une boutique WooCommerce.', iconPath: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>' },
]

const ADDONS = [
  { name: "Tam-Tam — Email Pro", desc: "Synchro IMAP/SMTP, CalDAV, antispam. Alternative locale à Google Workspace.", prix: "800 FCFA/utilisateur/mois", category: "Communication", pitch: "Votre équipe communique au quotidien. Chaque email doit arriver, chaque agenda doit être synchronisé. Alternative locale à Google Workspace — souverain, synchronisé, sécurisé.", features: ["Synchro IMAP/SMTP + CalDAV", "Antispam + antivirus", "Accès mobile natif", "Domaine personnalisé"], iconPath: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>' },
  { name: "Oasis — Backup Cloud", desc: "Backup quotidien, rétention 30 jours, restauration 1 clic, chiffrement AES-256.", prix: "2 000 FCFA/mois", category: "Sécurité", pitch: "Perdre vos données, c'est perdre votre activité. Oasis sauvegarde tout, automatiquement, chaque jour. Restauration en un clic.", features: ["Backup quotidien automatisé", "Rétention 30 jours", "Restauration self-service en 1 clic", "Chiffrement AES-256"], iconPath: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>' },
  { name: "Griot — SMS Pro", desc: "SMS marketing + transactionnel + OTP. API REST, dashboard analytics.", prix: "10 FCFA/SMS · Remise dès 5 000 SMS", category: "Communication", pitch: "98% de taux d'ouverture. Chaque SMS que vous envoyez est lu. API documentée, dashboard analytics, sender ID personnalisé.", features: ["API REST documentée", "SMS marketing + transactionnel + OTP", "Dashboard analytics", "Sender ID personnalisé"], iconPath: '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" stroke-width="2"/>' },
  { name: "Expansion — Stockage NVMe", desc: "Espace NVMe additionnel sans migration. Hébergé 100% au Sénégal. Blocs cumulables.", prix: "Bloc S (+20 Go) : 2 000 FCFA/mois · Bloc M (+50 Go) : 4 000 FCFA/mois", category: "Stockage", pitch: "L'espace disque n'est pas un luxe — c'est le carburant de votre activité. Expansion ajoute du stockage NVMe directement sur votre offre sans interruption.", features: ["Stockage NVMe haute performance", "Activation sans interruption", "Blocs cumulables", "Hébergement 100% Sénégal", "Résiliation mensuelle possible"], iconPath: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>' },
]

const SLA_STATS = [
  { value: '99,5%', label: 'Disponibilité', iconPath: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>' },
  { value: 'J+1', label: 'Support', iconPath: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' },
  { value: '24h', label: 'Incident', iconPath: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>' },
  { value: 'Hebdo', label: 'Sauvegarde', iconPath: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>' },
  { value: '24h', label: 'Restauration', iconPath: '<polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>' },
]

const TRAJECTOIRE = [
  { name: 'Racine', sub: '1 850 F', current: true, iconPath: '<circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="21"/><path d="M5 14h14"/>' },
  { name: 'Simba', sub: '3 950 F', current: true, iconPath: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>' },
  { name: 'Téranga', sub: '4 500 F', current: true, iconPath: '<path d="M17 20H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2z"/><path d="M12 7V4M9 4h6"/>' },
  { name: 'Baobab', sub: 'Entreprise', current: false, iconPath: '<rect x="2" y="3" width="20" height="5" rx="2"/><rect x="2" y="11" width="20" height="5" rx="2"/><circle cx="6" cy="5.5" r=".7" fill="currentColor"/><circle cx="6" cy="13.5" r=".7" fill="currentColor"/>' },
  { name: 'Savane', sub: 'Entreprise', current: false, iconPath: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>' },
]

const FAQS = [
  { q: "Quelle offre pour mon premier site ?", a: "<strong>Racine</strong> pour un site vitrine simple. <strong>Simba</strong> si vous utilisez WordPress ou WooCommerce." },
  { q: "Puis-je changer d'offre ensuite ?", a: "Oui. Racine → Simba → Baobab → Savane. Migration fluide, sans interruption." },
  { q: "WordPress est-il préinstallé ?", a: "Oui avec <strong>Simba</strong> : WordPress optimisé, cache LiteSpeed, CDN Afrique." },
  { q: "Je suis une ONG, quelle offre ?", a: "<strong>Téranga</strong> : tarif solidaire, multi-sites (3 projets), support dédié. 4 500 FCFA/mois." },
  { q: "Quels moyens de paiement ?", a: "Wave, Orange Money et +60 autres moyens dans 10 pays africains. Provisioning automatique." },
  { q: "Combien de temps pour activer ?", a: "Moins de 24h après paiement. Accès envoyés par email." },
]

export default async function StartupPage() {
  const offres = await getOffresBySegment('startup')
  return (
    <>
      <PageHero
        label="01 — Startup"
        title="Lancez votre projet."
        titleEm="On s'occupe du reste."
        desc="Budget serré, urgence de mise en ligne. Fiabilité dès le jour 1, prix adaptés, évolution garantie sans migration."
        img="/_assets/logos/equipe-reunion.png"
        badge="Startup B2C"
        color="var(--o)"
        bg="linear-gradient(135deg,#FFF5EB,#FFF0E0)"
        ctas={[
          { label: 'Voir les offres ↓', href: '#offres' },
          { label: 'Demander conseil', href: 'https://manage.jokko.africa/submitticket.php' },
        ]}
      />
      <PersonasSection personas={PERSONAS} color="var(--o)" title="Les offres Startup sont faites pour vous si…" />
      <OffresStartup offres={offres} />
      <AddonsSection addons={ADDONS} color="var(--o)" title="Enrichissez votre hébergement" cols={3} />
      <SlaSection stats={SLA_STATS} color="var(--o)" bg="linear-gradient(160deg,#FFF7EE,#FFE8D0,#FFD6B0)" title="Nos engagements Startup" badge="SLA 99.5% · Best effort" />
      <TrajectoireSection steps={TRAJECTOIRE} nextHref="/entreprise" nextLabel="Entreprise" color="var(--o)" />
      <FaqSection faqs={FAQS} color="var(--o)" />
      
    </>
  )
}
