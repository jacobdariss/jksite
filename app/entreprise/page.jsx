import PageHero from '@/components/PageHero'
import OffresSection from '@/components/OffresSection'
import { getOffresBySegment } from '@/lib/strapi'

export const revalidate = 3600

export default async function EntreprisePage() {
  const offres = await getOffresBySegment('entreprise')

  return (
    <>
      <PageHero
        label="02 — Entreprise"
        title="Votre activité tourne."
        titleEm="On garantit qu'elle ne s'arrête pas."
        desc="SLA contractuel, support réactif, infrastructure évolutive. Chaque minute d'arrêt vous coûte de l'argent et de la crédibilité. Pas avec Jokko."
        img="/_assets/logos/equipe-bureau.png"
        badge="Entreprise B2B"
        color="var(--b)"
        ctas={[
          { label: 'Voir les offres ↓', href: '#offres' },
          { label: 'Demander un devis', href: 'https://manage.jokko.africa/submitticket.php' },
        ]}
      />

      <OffresSection
        offres={offres}
        segment="entreprise"
        config={{
          title: 'Stabilité, production, zéro stress technique',
          color: 'var(--b)',
          hasPeriodToggle: true,
          periodLabel: 'Annuel -20%',
          ctaLabel: 'Commander',
          ctaHref: 'https://manage.jokko.africa/',
          ressourceBg: '#F0F0F0',
          ressourceColor: 'var(--b)',
          checkColor: 'var(--b)',
        }}
      />

      <section style={{ padding: '64px 0', background: 'var(--ow)' }}>
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg,#0D0D0D,#1E2A3A)', borderRadius: 'var(--rx)', padding: '48px 40px', textAlign: 'center', color: '#fff' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, marginBottom: 10 }}>Votre infra ne sera plus jamais votre problème.</h2>
            <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.75)', marginBottom: 24 }}>SLA contractuel, support réactif, infrastructure évolutive. <strong style={{ color: '#fff' }}>Jokko assume.</strong></p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://manage.jokko.africa/" target="_blank" rel="noreferrer" className="btn btn-o btn-lg">Espace Client →</a>
              <a href="tel:+221338425735" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: '1.5px solid rgba(255,255,255,.2)' }}>+221 33 842 57 35</a>
              <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: '1.5px solid rgba(255,255,255,.2)' }}>WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
