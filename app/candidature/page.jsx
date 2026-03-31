import CandidatureForm from '@/components/CandidatureForm'

export const metadata = {
  title: 'Devenir Partenaire — Jokko Pro Africa',
  description: 'Rejoignez le réseau de partenaires Jokko. Affilié, Revendeur, Intégrateur, Agence ou Institutionnel.',
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
            <div className="label">Programme Partenaires</div>
            <h1 className="title">Rejoignez le réseau Jokko.</h1>
            <p className="subtitle">Affilié, Revendeur, Intégrateur ou Institutionnel — choisissez votre niveau d&apos;engagement.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 0', background: '#fff' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <CandidatureForm />
        </div>
      </section>
    </>
  )
}
