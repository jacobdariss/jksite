'use client'
// Section SLA — 5 stats cards
export default function SlaSection({ stats, color, bg, title, badge }) {
  return (
    <section style={{ background: bg || 'linear-gradient(160deg,#FFF7EE,#FFE8D0,#FFD6B0)', padding: '80px 0' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="label" style={{ justifyContent: 'center', color }}>Engagements</div>
          <h2 className="title">{title}</h2>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 999, background: `${color}20`, color, fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 20 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />
            {badge}
          </div>
        </div>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12, marginTop: 20 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: '#fff', border: `1px solid ${color}20`, borderRadius: 16, padding: '24px 16px', textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', color, marginBottom: 8 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: s.iconPath }} />
              </div>
              <div style={{ fontFamily: 'var(--fd)', fontSize: '1.3rem', fontWeight: 700, color }}>{s.value}</div>
              <div style={{ fontSize: '.7rem', color: 'var(--bm)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){section .container [style*="repeat(5,1fr)"]{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  )
}
