import { NextResponse } from 'next/server'

const STRAPI_URL   = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://api.jokko.africa'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

export async function POST(request) {
  try {
    const body = await request.json()
    const { ref, referer, landing } = body
    if (!ref || ref.length < 4) return NextResponse.json({ ok: false }, { status: 400 })

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || ''

    await fetch(`${STRAPI_URL}/api/affiliate-clicks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          ref: ref.toUpperCase().replace(/[^A-Z0-9]/g, ''),
          ip_address: ip.substring(0, 45),
          referer: (referer || '').substring(0, 512),
          landing: (landing || '').substring(0, 512),
          clicked_at: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
        },
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
