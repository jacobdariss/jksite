// Section Trajectoire — chemin d'évolution entre offres
export default function TrajectoireSection({ steps, nextHref, nextLabel, color = 'var(--o)' }) {
  return (
    <section style={{ padding: '60px 0', background: '#fff' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
          <div className="label" style={{ justifyContent: 'center', color }}>Trajectoire</div>
          <h2 className="title">Vous grandissez ? Votre offre aussi.</h2>
          <p style={{ fontSize: '.92rem', color: 'var(--bs)', maxWidth: 480, margin: '8px auto 0' }}>Migration fluide, sans interruption, sans perte de données.</p>
        </div>
        <div className="reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, flexWrap: 'wrap' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                background: s.current ? 'var(--obg2)' : 'var(--ow)',
                border: `2px ${s.current ? 'solid' : 'dashed'} ${s.current ? color : 'var(--bd)'}`,
                borderRadius: 16, padding: '18px 24px', textAlign: 'center', minWidth: 120,
                opacity: s.current ? 1 : .65,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6, color: s.current ? color : 'var(--bm)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: s.iconPath }} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '.88rem' }}>{s.name}</div>
                <div style={{ fontSize: '.7rem', color: 'var(--bm)' }}>{s.sub}</div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ fontSize: '1.2rem', color: steps[i + 1].current ? color : 'var(--bd)', padding: '0 6px' }}>→</div>
              )}
            </div>
          ))}
        </div>
        {nextHref && (
          <p style={{ textAlign: 'center', fontSize: '.84rem', color: 'var(--bm)', marginTop: 20 }}>
            Prochaine étape : <a href={nextHref} style={{ color, fontWeight: 600 }}>{nextLabel} →</a>
          </p>
        )}
      </div>
    </section>
  )
}
