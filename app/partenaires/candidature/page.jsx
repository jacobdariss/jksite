import PartenaireCandidatureForm from '@/components/PartenaireCandidatureForm'

export const metadata = {
  title: 'Devenir Partenaire — Jokko Pro Africa',
  description: "Rejoignez le réseau de partenaires Jokko. Affilié, Revendeur, Intégrateur ou Institutionnel. Formulaire de candidature en ligne.",
}

export default function CandidaturePage() {
  return (
    <>
      <section style={{ padding: '64px 0 48px', background: 'linear-gradient(135deg,#FFF8ED,#FFF3E0)', borderBottom: '3px solid var(--o)' }}>
        <div className="container">
          <div className="reveal">
            <div style={{ fontSize: '.75rem', color: 'var(--bm)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <a href="/" style={{ color: 'var(--o)' }}>Accueil</a>
              <span style={{ color: '#ccc' }}>›</span>
              <a href="/partenaires" style={{ color: 'var(--o)' }}>Partenaires</a>
              <span style={{ color: '#ccc' }}>›</span>
              <strong>Candidature</strong>
            </div>
            <div className="label">Devenir Partenaire</div>
            <h1 className="title">Rejoignez l&apos;écosystème Jokko.</h1>
            <p className="subtitle">Remplissez le formulaire ci-dessous. Notre équipe vous contacte sous 48h.</p>
          </div>
        </div>
      </section>
      <section style={{ padding: '64px 0', background: 'var(--ow)' }}>
        <div className="container">
          <PartenaireCandidatureForm />
        </div>
      </section>
    </>
  )
}
