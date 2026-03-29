'use client'
// Section "Idéal pour" — cartes personas avec hover
export default function PersonasSection({ personas, color = 'var(--o)', title }) {
  return (
    <section style={{ padding: '60px 0', background: '#fff' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="label" style={{ justifyContent: 'center', color }}>Pour qui ?</div>
          <h2 className="title">{title}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {personas.map((p, i) => (
            <div key={i} className={`hover-lift reveal reveal-delay-${i}`}
              style={{ background: 'var(--ow)', border: '1px solid var(--bdl)', borderRadius: 'var(--rx)', padding: '28px 20px', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: 14, background: 'var(--obg2)', margin: '0 auto 14px', color }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: p.iconPath }} />
              </div>
              <h4 style={{ fontFamily: 'var(--fd)', fontSize: '1rem', fontWeight: 700, marginBottom: 6 }}>{p.title}</h4>
              <p style={{ fontSize: '.84rem', color: 'var(--bs)', lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){section .container [style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:500px){section .container [style*="repeat(4,1fr)"]{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
