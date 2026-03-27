'use client'

const VALUES = [
  { title: 'Proximité', desc: 'Un interlocuteur clair. Support humain et local, en français, depuis Dakar.', img: '/_assets/logos/equipe-jokko.png' },
  { title: 'Souveraineté', desc: 'Vos données restent au Sénégal. Datacenter Tier III+, conformité APDP.', img: '/_assets/logos/datacenter.jpg' },
  { title: 'Fiabilité', desc: '99.95% de disponibilité. Monitoring IA 24/7, SLA formalisés.', img: '/_assets/logos/datacenter.jpg' },
  { title: 'Évolution', desc: 'Startup → Entreprise → Institution, sans migration brutale.', img: '/_assets/logos/evolution-laptop.png' },
]

export default function ValueCards() {
  return (
    <>
      <div className="val-grid">
        {VALUES.map(v => (
          <div key={v.title} className="val-card">
            <img src={v.img} alt={v.title} style={{ width:'100%',height:140,objectFit:'cover' }} />
            <div style={{ padding:18 }}>
              <h3 style={{ fontFamily:'var(--fd)',fontSize:'1rem',fontWeight:700,marginBottom:6 }}>{v.title}</h3>
              <p style={{ fontSize:'.84rem',color:'var(--bs)',lineHeight:1.55 }}>{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .val-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
        .val-card{background:#fff;border:1px solid var(--bd);border-radius:var(--rx);overflow:hidden;transition:.35s}
        .val-card:hover{transform:translateY(-5px);box-shadow:var(--shl);border-color:var(--obg2)}
        @media(max-width:900px){.val-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:500px){.val-grid{grid-template-columns:1fr}}
      `}</style>
    </>
  )
}
