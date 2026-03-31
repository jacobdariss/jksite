// Témoignages — données depuis Strapi ou fallback statique
const STATIC = [
  { text: "Depuis que nous sommes chez Jokko, zéro souci technique. L'équipe est réactive et comprend nos besoins.", name: 'Amadou Diallo', role: 'DG — Agence Digitale Dakar', color: '#E85D04' },
  { text: "La souveraineté de nos données était non négociable. Jokko est le seul à offrir ça avec un SLA à pénalités.", name: 'Fatou Ndiaye', role: 'DSI — Institution Publique', color: '#6B4C9A' },
  { text: "Migration depuis OVH en 48h, zéro downtime. Le support local fait toute la différence.", name: 'Moussa Ba', role: 'CTO — Startup SaaS', color: '#0D0D0D' },
]

export default function TestimonialsSection({ testimonials }) {
  const items = testimonials?.length > 0 ? testimonials : STATIC

  return (
    <section style={{ padding: '80px 0', background: '#fff' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="label" style={{ justifyContent: 'center' }}>Témoignages</div>
          <h2 className="title">Ce que nos clients disent</h2>
        </div>
        <div className="testi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {items.map((t, i) => {
            const text = t.text || t.attributes?.text
            const name = t.name || t.attributes?.name
            const role = t.role || t.attributes?.role
            const color = t.color || t.attributes?.color || '#E85D04'
            const initials = name?.split(' ').map(n => n[0]).join('') || '??'
            return (
              <div key={i} className="hover-lift" style={{ background: '#fff', border: '1px solid var(--bd)', borderRadius: 'var(--rx)', overflow: 'hidden' }}>
                <div style={{ height: 4, background: color }} />
                <div style={{ padding: 24 }}>
                  <div style={{ color: 'var(--o)', fontSize: '.82rem', letterSpacing: 1, marginBottom: 14 }}>★★★★★</div>
                  <p style={{ fontFamily: 'var(--fd)', fontSize: '.95rem', lineHeight: 1.6, color: 'var(--bs)', fontStyle: 'italic', marginBottom: 16 }}>« {text} »</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', fontWeight: 800, color: '#fff', flexShrink: 0 }}>
                      {initials}
                    </div>
                    <div>
                      <div style={{ fontSize: '.85rem', fontWeight: 700 }}>{name}</div>
                      <div style={{ fontSize: '.72rem', color: 'var(--bm)' }}>{role}</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
