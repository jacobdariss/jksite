'use client'
import { useEffect } from 'react'

const COOKIE_NAME   = 'jpn_ref'
const COOKIE_DOMAIN = '.jokko.africa'
const COOKIE_DAYS   = 30
const TRACKER_URL   = 'https://manage.jokko.africa/modules/addons/jokko_partner/track_api.php'

function getCookie(name) {
  const m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')
  return m ? m.pop() : ''
}

function setCookie(name, value) {
  const exp = new Date(Date.now() + COOKIE_DAYS * 864e5).toUTCString()
  document.cookie = `${name}=${value}; expires=${exp}; path=/; domain=${COOKIE_DOMAIN}; secure; SameSite=Lax`
}

function patchLinks(ref) {
  document.querySelectorAll('a[href*="manage.jokko.africa"]').forEach(a => {
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
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlRef = (params.get('ref') || params.get('jpn_ref') || '')
      .toUpperCase().replace(/[^A-Z0-9]/g, '')
    const cookieRef = getCookie(COOKIE_NAME)
    const ref = urlRef || cookieRef
    if (!ref || ref.length < 4) return

    // Poser/rafraîchir le cookie
    setCookie(COOKIE_NAME, ref)

    // Injecter ?ref= dans tous les liens manage
    patchLinks(ref)
    const observer = new MutationObserver(() => patchLinks(ref))
    observer.observe(document.body, { childList: true, subtree: true })

    // Notifier WHMCS si nouveau clic depuis URL
    if (urlRef) {
      const body = new URLSearchParams({
        ref,
        ip: '',
        ua: navigator.userAgent.substring(0, 512),
        referer: document.referrer.substring(0, 512),
        secret: process.env.NEXT_PUBLIC_TRACKING_SECRET || '',
        source: 'nextjs',
      })
      fetch(TRACKER_URL, { method: 'POST', body, mode: 'no-cors' }).catch(() => {})

      // Pixel local Strapi
      fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ref, referer: document.referrer, landing: window.location.href }),
      }).catch(() => {})
    }

    return () => observer.disconnect()
  }, [])

  return null
}
