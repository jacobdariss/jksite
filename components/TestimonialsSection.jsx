// Témoignages — données normalisées depuis lib/strapi.js (fallback inclus)

export default function TestimonialsSection({ testimonials = [] }) {
  return (
    <section style={{ padding: '80px 0', background: '#fff' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="label" style={{ justifyContent: 'center' }}>Témoignages</div>
          <h2 className="title">Ce que nos clients disent</h2>
        </div>
        <div className="testi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {testimonials.map((t, i) => {
            const initials = t.name?.split(' ').map(n => n[0]).join('') || '??'
            return (
              <div key={t.id || i} className="hover-lift" style={{ background: '#fff', border: '1px solid var(--bd)', borderRadius: 'var(--rx)', overflow: 'hidden' }}>
                <div style={{ height: 4, background: t.color }} />
                <div style={{ padding: 24 }}>
                  <div style={{ color: 'var(--o)', fontSize: '.82rem', letterSpacing: 1, marginBottom: 14 }}>★★★★★</div>
                  <p style={{ fontFamily: 'var(--fd)', fontSize: '.95rem', lineHeight: 1.6, color: 'var(--bs)', fontStyle: 'italic', marginBottom: 16 }}>« {t.text} »</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', fontWeight: 800, color: '#fff', flexShrink: 0 }}>
                      {initials}
                    </div>
                    <div>
                      <div style={{ fontSize: '.85rem', fontWeight: 700 }}>{t.name}</div>
                      <div style={{ fontSize: '.72rem', color: 'var(--bm)' }}>{t.role}</div>
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
