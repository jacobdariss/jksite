import { NextResponse } from 'next/server'

const STRAPI_URL   = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://api.jokko.africa'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN
const WHMCS_URL    = 'https://manage.jokko.africa/modules/addons/jokko_partner/track_api.php'
const SECRET       = process.env.JPN_TRACKING_SECRET || ''

export async function POST(req) {
  try {
    const { ref, referer, landing } = await req.json()
    if (!ref || ref.length < 4) return NextResponse.json({ ok: false }, { status: 400 })

    const cleanRef = ref.replace(/[^A-Z0-9]/gi, '').toUpperCase()
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || ''
    const ua = req.headers.get('user-agent') || ''

    // 1. Enregistrer dans Strapi
    if (STRAPI_TOKEN) {
      await fetch(`${STRAPI_URL}/api/affiliate-clicks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            ref: cleanRef,
            ip_address: ip.substring(0, 45),
            referer: (referer || '').substring(0, 512),
            landing: (landing || '').substring(0, 512),
            clicked_at: new Date().toISOString(),
          },
        }),
      }).catch(() => {})
    }

    // 2. Notifier WHMCS (fire & forget)
    if (SECRET) {
      const body = new URLSearchParams({
        ref: cleanRef, ip, ua: ua.substring(0, 512),
        referer: (referer || '').substring(0, 512),
        secret: SECRET, source: 'nextjs',
      })
      fetch(WHMCS_URL, { method: 'POST', body }).catch(() => {})
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
