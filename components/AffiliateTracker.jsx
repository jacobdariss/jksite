'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const COOKIE_NAME   = 'jpn_ref'
const COOKIE_DOMAIN = '.jokko.africa'
const COOKIE_DAYS   = 30
const MANAGE_URL    = 'https://manage.jokko.africa'

function setCookie(name, value, days, domain) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${value}; expires=${expires}; path=/; domain=${domain}; secure; SameSite=Lax`
}

function getCookie(name) {
  const m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')
  return m ? m.pop() : ''
}

function patchLinks(ref) {
  document.querySelectorAll(`a[href*="${MANAGE_URL}"]`).forEach(a => {
    try {
      const u = new URL(a.href)
      if (!u.searchParams.get('ref')) {
        u.searchParams.set('ref', ref)
        a.href = u.toString()
      }
    } catch {}
  })
}

export default function AffiliateTracker() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const urlRef = (searchParams.get('ref') || searchParams.get('jpn_ref') || '')
      .replace(/[^A-Z0-9]/gi, '')
      .toUpperCase()

    const cookieRef = getCookie(COOKIE_NAME)
    const ref = urlRef || cookieRef
    if (!ref || ref.length < 4) return

    // Poser/rafraîchir le cookie cross-domain
    setCookie(COOKIE_NAME, ref, COOKIE_DAYS, COOKIE_DOMAIN)

    // Injecter ?ref= dans tous les liens manage.jokko.africa
    patchLinks(ref)
    const observer = new MutationObserver(() => patchLinks(ref))
    observer.observe(document.body, { childList: true, subtree: true })

    // Enregistrer le clic si nouveau ref depuis URL
    if (urlRef) {
      fetch('/api/affiliate/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ref,
          referer:  document.referrer || '',
          landing:  window.location.href,
        }),
      }).catch(() => {})
    }

    return () => observer.disconnect()
  }, [searchParams])

  return null
}
