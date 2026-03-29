'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollRevealInit() {
  const pathname = usePathname()

  useEffect(() => {
    // Petit délai pour laisser les client components se monter
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal:not(.visible)')
      if (!els.length) return

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('visible')
              obs.unobserve(e.target)
            }
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      )

      els.forEach(el => obs.observe(el))

      // Révéler immédiatement les éléments déjà dans le viewport
      els.forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight - 20) {
          el.classList.add('visible')
          obs.unobserve(el)
        }
      })

      return () => obs.disconnect()
    }, 120)

    return () => clearTimeout(timer)
  }, [pathname]) // Se relance à chaque changement de page

  return null
}
