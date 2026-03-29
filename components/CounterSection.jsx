'use client'
import { useEffect, useRef, useState } from 'react'

// Anime un seul compteur de 0 à target au scroll
function Counter({ prefix = '', target, suffix = '', decimal = false, label }) {
  const [display, setDisplay] = useState(prefix + (decimal ? '0.00' : '0') + suffix)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const run = () => {
      if (started.current) return
      started.current = true

      const duration = 1600
      const start = performance.now()

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4)
        const current = ease * target
        setDisplay(
          prefix +
          (decimal ? current.toFixed(2) : Math.floor(current).toString()) +
          suffix
        )
        if (progress < 1) requestAnimationFrame(tick)
      }

      requestAnimationFrame(tick)
    }

    const obs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) run() },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)

    // Si déjà visible au chargement
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) setTimeout(run, 300)

    return () => obs.disconnect()
  }, [target, prefix, suffix, decimal])

  return (
    <div ref={ref} style={{ background: '#fff', borderRadius: 'var(--rx)', padding: '28px 16px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,.04)' }}>
      <div style={{ fontFamily: 'var(--fd)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--o)', minWidth: '4ch', display: 'inline-block' }}>
        {display}
      </div>
      <div style={{ fontSize: '.72rem', color: 'var(--bm)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginTop: 4 }}>
        {label}
      </div>
    </div>
  )
}

const COUNTERS = [
  { prefix: '+', target: 350, suffix: '',     decimal: false, label: 'Services Actifs' },
  { prefix: '',  target: 99.95, suffix: '%',  decimal: true,  label: 'Uptime garanti' },
  { prefix: '',  target: 12,   suffix: '',    decimal: false,  label: 'Offres cloud' },
  { prefix: '',  target: 24,   suffix: '/7',  decimal: false,  label: 'Support dédié' },
  { prefix: '',  target: 100,  suffix: '%',   decimal: false,  label: 'Données au Sénégal' },
]

export default function CounterSection() {
  return (
    <section style={{ padding: '60px 0', background: 'var(--ow)', borderTop: '1px solid var(--bd)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div className="label" style={{ justifyContent: 'center' }}>En chiffres</div>
          <h2 className="title">Jokko en quelques chiffres</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16 }}>
          {COUNTERS.map(c => <Counter key={c.label} {...c} />)}
        </div>
      </div>
      <style>{`@media(max-width:768px){section .container [style*="repeat(5,1fr)"]{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  )
}
