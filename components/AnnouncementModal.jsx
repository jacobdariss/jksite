'use client'
import { useEffect, useState } from 'react'

const COLORS = {
  orange: { bg: 'linear-gradient(135deg,#E85D04,#FF9A3C)', text: '#fff', btn: 'rgba(255,255,255,.2)', btnText: '#fff', btnBorder: 'rgba(255,255,255,.4)' },
  navy:   { bg: 'linear-gradient(135deg,#1E2A3A,#2D3F56)', text: '#fff', btn: 'rgba(255,255,255,.15)', btnText: '#fff', btnBorder: 'rgba(255,255,255,.3)' },
  violet: { bg: 'linear-gradient(135deg,#6B4C9A,#9B6CC8)', text: '#fff', btn: 'rgba(255,255,255,.2)', btnText: '#fff', btnBorder: 'rgba(255,255,255,.4)' },
  green:  { bg: 'linear-gradient(135deg,#16A34A,#22C55E)', text: '#fff', btn: 'rgba(255,255,255,.2)', btnText: '#fff', btnBorder: 'rgba(255,255,255,.4)' },
}

export default function AnnouncementModal({ announcement }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!announcement) return

    // Vérifier si l'annonce a déjà été fermée
    if (announcement.show_once) {
      const key = `jokko_ann_${announcement.id}`
      if (localStorage.getItem(key)) return
    }

    // Vérifier les dates
    const now = new Date()
    if (announcement.start_date && new Date(announcement.start_date) > now) return
    if (announcement.end_date   && new Date(announcement.end_date)   < now) return

    // Délai d'apparition : 1.5s après le chargement
    const timer = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [announcement])

  if (!visible || !announcement) return null

  const cc = COLORS[announcement.color] || COLORS.orange

  const close = () => {
    setVisible(false)
    if (announcement.show_once) {
      localStorage.setItem(`jokko_ann_${announcement.id}`, '1')
    }
  }

  return (
    <div
      onClick={e => e.target === e.currentTarget && close()}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, animation: 'fadeIn .25s ease',
      }}
    >
      <div style={{
        background: cc.bg,
        borderRadius: 20, width: '100%', maxWidth: 480,
        padding: '32px 28px', position: 'relative', overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,.3)',
        animation: 'slideUp .3s ease',
      }}>
        {/* Cercles décoratifs */}
        <div style={{ position:'absolute', top:-40, right:-40, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,.08)' }} />
        <div style={{ position:'absolute', bottom:-30, left:-30, width:100, height:100, borderRadius:'50%', background:'rgba(0,0,0,.08)' }} />

        {/* Bouton fermer */}
        <button
          onClick={close}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(255,255,255,.2)', border: 'none', cursor: 'pointer',
            width: 32, height: 32, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '1rem', zIndex: 1,
          }}
        >
          ✕
        </button>

        {/* Contenu */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontFamily: 'var(--fd)', fontSize: 'clamp(1.2rem,3vw,1.6rem)',
            fontWeight: 700, color: cc.text, marginBottom: 12, lineHeight: 1.3,
          }}>
            {announcement.title}
          </h2>

          <p style={{
            fontSize: '.92rem', color: cc.text, opacity: .88,
            lineHeight: 1.7, marginBottom: 24,
          }}>
            {announcement.message}
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {announcement.cta_label && announcement.cta_url && (
              <a
                href={announcement.cta_url}
                onClick={close}
                className="btn btn-lg"
                style={{
                  background: '#fff', color: '#E85D04',
                  fontWeight: 700, textDecoration: 'none',
                  border: 'none',
                }}
              >
                {announcement.cta_label} →
              </a>
            )}
            <button
              onClick={close}
              className="btn btn-lg"
              style={{
                background: cc.btn, color: cc.btnText,
                border: `1.5px solid ${cc.btnBorder}`,
                cursor: 'pointer',
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { transform:translateY(20px);opacity:0 } to { transform:translateY(0);opacity:1 } }
      `}</style>
    </div>
  )
}
