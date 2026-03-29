'use client'
import Link from 'next/link'

const SEGMENTS = [
  {
    href: '/startup', num: '01', label: 'Startup', color: '#E85D04',
    desc: 'Lancer vite, tester, évoluer',
    sub: 'Fiabilité dès le jour 1, prix adaptés, évolution sans migration.',
    pills: ['Racine', 'Sahara', 'Téranga'], pillClass: 'pill-o',
    img: '/_assets/logos/equipe-reunion.png',
  },
  {
    href: '/entreprise', num: '02', label: 'Entreprise', color: '#0D0D0D',
    desc: 'Stabilité, production, zéro stress',
    sub: 'SLA contractuel, support réactif, infrastructure évolutive.',
    pills: ['Baobab', 'Fondation', 'Savane'], pillClass: 'pill-b',
    img: '/_assets/logos/equipe-bureau.png',
  },
  {
    href: '/institution', num: '03', label: 'Institution', color: '#6B4C9A',
    desc: 'Souveraineté, conformité, continuité',
    sub: 'SLA à pénalités, PRA documenté, support 24/7 dédié.',
    pills: ['Héritage', 'Forteresse', 'Kilimandjaro'], pillClass: 'pill-p',
    img: '/_assets/logos/datacenter.jpg',
  },
]

export default function SegmentCards() {
  return (
    <>
      <div className="seg-grid">
        {SEGMENTS.map((s, i) => (
          <Link key={s.href} href={s.href} className={`seg-card reveal reveal-delay-${i}`}>
            <div style={{ position:'relative', height:200 }}>
              <img src={s.img} alt={s.label} style={{ width:'100%',height:'100%',objectFit:'cover' }} />
              <span style={{ position:'absolute',top:12,left:12,background:s.color,color:'#fff',fontSize:'.68rem',fontWeight:700,padding:'3px 10px',borderRadius:999 }}>
                {s.num} — {s.label}
              </span>
            </div>
            <div style={{ padding:'20px 22px' }}>
              <h3 style={{ fontFamily:'var(--fd)',fontSize:'1.1rem',fontWeight:700,marginBottom:4 }}>{s.label}</h3>
              <div style={{ fontSize:'.8rem',color:'var(--bm)',marginBottom:10 }}>{s.desc}</div>
              <p style={{ fontSize:'.84rem',color:'var(--bs)',lineHeight:1.55,marginBottom:14 }}>{s.sub}</p>
              <div style={{ display:'flex',gap:6,flexWrap:'wrap' }}>
                {s.pills.map(p => <span key={p} className={`pill ${s.pillClass}`}>{p}</span>)}
              </div>
              <div style={{ fontSize:'.82rem',color:'var(--o)',fontWeight:600,marginTop:14 }}>Voir les offres {s.label} →</div>
            </div>
          </Link>
        ))}
      </div>
      <style>{`
        .seg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .seg-card{background:#fff;border:1px solid var(--bd);border-radius:var(--rx);overflow:hidden;transition:all .3s;display:block;text-decoration:none;color:inherit}
        .seg-card:hover{transform:translateY(-4px);box-shadow:var(--shl)}
        @media(max-width:900px){.seg-grid{grid-template-columns:1fr}}
      `}</style>
    </>
  )
}
