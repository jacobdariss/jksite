'use client'
import { useEffect } from 'react'

/**
 * Active la classe .visible sur tous les .reveal dans le viewport.
 * Usage : appeler useScrollReveal() dans n'importe quel client component.
 */
export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!els.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            obs.unobserve(e.target) // une fois suffit
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}
