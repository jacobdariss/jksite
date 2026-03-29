'use client'
import { useState, useEffect } from 'react'

const SLIDES = [
  {
    tag: 'Datacenter Tier III+ · Sénégal',
    h1a: 'Une infrastructure ',
    h1em: 'souveraine',
    h1b: " au coeur de l'Afrique",
    desc: 'Datacenter certifié Tier III+ à Dakar. Vos données restent au Sénégal, protégées par une infrastructure de classe mondiale.',
    cta1: { label: 'Découvrir le datacenter →', href: '#dc' },
    cta2: { label: 'Voir nos offres', href: '#segments' },
    metrics: [{ v:'Tier III+',l:'Certification' },{ v:'100%',l:'Sénégal' },{ v:'99.95%',l:'Uptime' },{ v:'APDP',l:'Conforme' }],
    img: '/_assets/logos/datacenter.jpg',
    badge: 'Tier III+ Certifié',
    floatTitle: '100% Sénégal',
    floatSub: 'Données souveraines',
    bg: 'linear-gradient(160deg,#FFF7EE,#FFE8D0)',
    accent: '#E85D04',
  },
  {
    tag: 'Cloud Souverain · Paiements Africains',
    h1a: 'Avant de parler de technologie, ',
    h1em: 'parlons de vous.',
    h1b: '',
    desc: "La majorité des hébergeurs vendent des ressources. Pas des résultats. Jokko prend la responsabilité de votre continuité numérique.",
    cta1: { label: 'Découvrir nos solutions →', href: '#segments' },
    cta2: { label: 'Voir les offres', href: '#segments' },
    metrics: [{ v:'12',l:'Offres' },{ v:'10',l:'Pays Afrique' },{ v:'24/7',l:'Support' },{ v:'2 000',l:'FCFA/mois' }],
    img: '/_assets/logos/equipe-bureau.png',
    badge: 'Catalogue 2026',
    floatTitle: 'Actif en < 5 min',
    floatSub: 'Wave · Orange Money · CB · 10 pays',
    bg: 'linear-gradient(160deg,#F5F3FF,#EDE8F5)',
    accent: '#6B4C9A',
  },
  {
    tag: 'Segment Institution',
    h1a: 'Vos obligations sont ',
    h1em: 'non négociables.',
    h1b: ' Notre engagement aussi.',
    desc: 'Souveraineté totale des données, SLA avec pénalités, PRA documenté et testé, support 24/7 dédié.',
    cta1: { label: 'Offres Institution →', href: '/institution' },
    cta2: { label: 'Notre datacenter', href: '#dc' },
    metrics: [{ v:'99.95%',l:'Disponibilité' },{ v:'< 1h',l:'Incident' },{ v:'24/7',l:'Support dédié' },{ v:'PRA',l:'Testé 2x/an' }],
    img: '/_assets/logos/datacenter.jpg',
    badge: 'SLA + Pénalités',
    floatTitle: 'SLA 99.95%',
    floatSub: 'Pénalités contractuelles',
    bg: 'linear-gradient(160deg,#F3F0FA,#E8E0F5)',
    accent: '#6B4C9A',
  },
]

export default function HeroSlider() {
  const [cur, setCur] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setCur(c => (c + 1) % SLIDES.length), 6000)
    return () => clearInterval(t)
  }, [paused])

  const go = (n) => {
    setCur((n + SLIDES.length) % SLIDES.length)
    setPaused(true)
    setTimeout(() => setPaused(false), 8000)
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Track CSS */}
      <div style={{
        display: 'flex',
        transform: `translateX(-${cur * 100}%)`,
        transition: 'transform .6s cubic-bezier(.4,0,.2,1)',
      }}>
        {SLIDES.map((s, idx) => (
          <div key={idx} style={{ flex: '0 0 100%', minWidth: 0, background: s.bg }}>
            <div className="container" style={{ padding: '56px 24px 48px' }}>
              <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 48, alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${s.accent}18`, border: `1px solid ${s.accent}30`, borderRadius: 999, padding: '5px 14px', marginBottom: 16, fontSize: '.72rem', fontWeight: 700, color: s.accent }}>
                    {s.tag}
                  </div>
                  <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(2rem,4.5vw,3rem)', lineHeight: 1.1, fontWeight: 700, letterSpacing: '-.02em', marginBottom: 14 }}>
                    {s.h1a}<em style={{ color: s.accent, fontStyle: 'italic' }}>{s.h1em}</em>{s.h1b}
                  </h1>
                  <p style={{ fontSize: '.98rem', color: 'var(--bs)', lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>{s.desc}</p>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
                    <a href={s.cta1.href} className="btn btn-lg" style={{ background: s.accent, color: '#fff' }}>{s.cta1.label}</a>
                    <a href={s.cta2.href} className="btn btn-lg" style={{ background: 'transparent', color: s.accent, border: `1.5px solid ${s.accent}` }}>{s.cta2.label}</a>
                  </div>
                  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                    {s.metrics.map(m => (
                      <div key={m.l}>
                        <div style={{ fontFamily: 'var(--fd)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--b)' }}>{m.v}</div>
                        <div style={{ fontSize: '.72rem', color: 'var(--bm)', textTransform: 'uppercase', letterSpacing: '1px' }}>{m.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hero-img" style={{ position: 'relative' }}>
                  <div style={{ borderRadius: 'var(--rx)', overflow: 'hidden', boxShadow: 'var(--shl)', aspectRatio: '4/3', position: 'relative' }}>
                    <img src={s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,.65)', color: '#fff', fontSize: '.7rem', fontWeight: 700, padding: '4px 12px', borderRadius: 999 }}>{s.badge}</div>
                  </div>
                  <div style={{ position: 'absolute', bottom: -16, left: -16, background: '#fff', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shl)' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${s.accent},#FF8534)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '.8rem', fontWeight: 700 }}>{s.floatTitle}</div>
                      <div style={{ fontSize: '.68rem', color: 'var(--bm)' }}>{s.floatSub}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flèches */}
      <button onClick={() => go(cur - 1)} style={{ position:'absolute',top:'50%',transform:'translateY(-50%)',left:16,zIndex:10,background:'rgba(255,255,255,.85)',border:'none',width:40,height:40,borderRadius:'50%',fontSize:'1.3rem',cursor:'pointer',boxShadow:'0 2px 8px rgba(0,0,0,.12)',display:'flex',alignItems:'center',justifyContent:'center' }}>‹</button>
      <button onClick={() => go(cur + 1)} style={{ position:'absolute',top:'50%',transform:'translateY(-50%)',right:16,zIndex:10,background:'rgba(255,255,255,.85)',border:'none',width:40,height:40,borderRadius:'50%',fontSize:'1.3rem',cursor:'pointer',boxShadow:'0 2px 8px rgba(0,0,0,.12)',display:'flex',alignItems:'center',justifyContent:'center' }}>›</button>

      {/* Dots */}
      <div style={{ display:'flex',justifyContent:'center',gap:8,padding:'16px 0',background:'#fff' }}>
        {SLIDES.map((_,i) => (
          <button key={i} onClick={() => go(i)} style={{ width:i===cur?24:8,height:8,borderRadius:999,border:'none',background:i===cur?'var(--o)':'var(--bd)',cursor:'pointer',transition:'all .3s',padding:0 }} />
        ))}
      </div>

      <style>{`.hero-grid{grid-template-columns:1.1fr .9fr}@media(max-width:768px){.hero-grid{grid-template-columns:1fr!important}.hero-img{display:none!important}}`}</style>
    </div>
  )
}
