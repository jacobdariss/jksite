import PageHero from '@/components/PageHero'
import OffresSection from '@/components/OffresSection'
import { getOffresBySegment } from '@/lib/strapi'

export const revalidate = 3600

export default async function StartupPage() {
  const offres = await getOffresBySegment('startup')

  return (
    <>
      <PageHero
        label="01 — Startup"
        title="Lancez votre projet."
        titleEm="On s'occupe du reste."
        desc="Fiabilité dès le jour 1, prix adaptés, évolution sans migration. Quand vous grandissez, vous montez de niveau — pas de prestataire."
        img="/_assets/logos/equipe-reunion.png"
        badge="Startup B2C"
        color="var(--o)"
        ctas={[
          { label: 'Voir les offres ↓', href: '#offres' },
          { label: 'Nous contacter', href: 'https://manage.jokko.africa/submitticket.php' },
        ]}
      />

      <OffresSection
        offres={offres}
        segment="startup"
        config={{
          title: '3 offres, un seul engagement : votre sérénité',
          color: 'var(--o)',
          hasPeriodToggle: true,
          ctaLabel: 'Commander',
          ctaHref: 'https://manage.jokko.africa/',
          ressourceBg: 'var(--obg2)',
          ressourceColor: 'var(--od)',
          checkColor: 'var(--o)',
        }}
      />

      <section style={{ padding: '64px 0', background: 'var(--ow)' }}>
        <div className="container">
          <div className="reveal" style={{ background: 'linear-gradient(135deg,var(--o),var(--ol))', borderRadius: 'var(--rx)', padding: '48px 40px', textAlign: 'center', color: '#fff' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, marginBottom: 10 }}>Prêt à lancer votre projet ?</h2>
            <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.85)', marginBottom: 24 }}>Activez votre hébergement en moins de 24h. <strong>Jokko assume.</strong></p>
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
