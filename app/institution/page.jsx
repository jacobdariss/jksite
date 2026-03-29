import PageHero from '@/components/PageHero'
import OffresSection from '@/components/OffresSection'
import { getOffresBySegment } from '@/lib/strapi'

export const revalidate = 3600

export default async function InstitutionPage() {
  const offres = await getOffresBySegment('institution')

  return (
    <>
      <PageHero
        label="03 — Institution"
        title="Vos obligations sont"
        titleEm="non négociables."
        desc="Souveraineté totale des données, SLA avec pénalités, PRA documenté et testé, support 24/7 dédié. La même exigence que vous avez envers vous-même."
        img="/_assets/logos/datacenter.jpg"
        badge="Institution B2G"
        color="#6B4C9A"
        ctas={[
          { label: 'Voir les offres ↓', href: '#offres' },
          { label: 'Demander un devis', href: 'https://manage.jokko.africa/submitticket.php' },
        ]}
      />

      {/* SLA Banner */}
      <section style={{ background: '#6B4C9A', padding: '20px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            {[
              { v: '99,95%', l: 'Disponibilité' },
              { v: '< 1h', l: 'Intervention' },
              { v: '24/7', l: 'Support dédié' },
              { v: 'SLA', l: '+ Pénalités' },
            ].map(s => (
              <div key={s.l} style={{ textAlign: 'center', color: '#fff' }}>
                <div style={{ fontFamily: 'var(--fd)', fontSize: '1.4rem', fontWeight: 700 }}>{s.v}</div>
                <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.65)', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OffresSection
        offres={offres}
        segment="institution"
        config={{
          title: 'Souveraineté, conformité, continuité garantie',
          subtitle: 'Engagement annuel · Support 24/7 dédié · SLA avec pénalités contractuelles',
          color: '#6B4C9A',
          hasPeriodToggle: false,
          ctaLabel: 'Demander un devis',
          ctaHref: 'https://manage.jokko.africa/submitticket.php',
          ressourceBg: 'rgba(107,76,154,.08)',
          ressourceColor: '#6B4C9A',
          checkColor: '#6B4C9A',
          showInclusLabel: true,
        }}
      />

      <section style={{ padding: '64px 0', background: 'var(--ow)' }}>
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg,#6B4C9A,#8B6FBF)', borderRadius: 'var(--rx)', padding: '48px 40px', textAlign: 'center', color: '#fff' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, marginBottom: 10 }}>La même exigence que vous avez envers vous-même.</h2>
            <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.85)', marginBottom: 24 }}>Souveraineté, conformité, continuité garantie. <strong>Jokko assume.</strong></p>
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
