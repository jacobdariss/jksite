import Image from 'next/image'

export default function PageHero({ label, title, titleEm, desc, img, imgAlt, badge, ctas = [], color = 'var(--o)' }) {
  return (
    <section style={{ padding: '64px 0 48px', background: 'var(--ow)', borderBottom: '3px solid', borderColor: color }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: img ? '1fr 1fr' : '1fr', gap: 48, alignItems: 'center' }}>
          <div className="reveal">
            <div className="label">{label}</div>
            <h1 className="title">{title}{titleEm && <em style={{ color }}> {titleEm}</em>}</h1>
            <p className="subtitle">{desc}</p>
            {ctas.length > 0 && (
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {ctas.map((cta, i) => (
                  <a key={i} href={cta.href} className={`btn btn-lg ${i === 0 ? '' : 'btn-ol'}`}
                    style={i === 0 ? { background: color, color: '#fff' } : { color }}>
                    {cta.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          {img && (
            <div className="reveal reveal-delay-2" style={{ position: 'relative', borderRadius: 'var(--rx)', overflow: 'hidden', boxShadow: 'var(--shl)' }}>
              <img src={img} alt={imgAlt || ''} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
              {badge && (
                <div style={{ position: 'absolute', top: 12, left: 12, background: color, color: '#fff', fontSize: '.72rem', fontWeight: 700, padding: '5px 14px', borderRadius: 999 }}>
                  {badge}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <style>{`@media(max-width:900px){section .container>div[style*="grid"]{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
