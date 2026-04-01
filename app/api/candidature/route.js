import { NextResponse } from 'next/server'

const WHMCS_APPLY_URL = 'https://manage.jokko.africa/modules/addons/jokko_partner/api/apply.php'
const SECRET          = process.env.JPN_TRACKING_SECRET || ''

export async function POST(req) {
  try {
    const body = await req.json()

    // Appel server-side vers WHMCS — pas de CORS
    const res = await fetch(WHMCS_APPLY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-JPN-Secret': SECRET,
      },
      body: JSON.stringify({ ...body, secret: SECRET }),
    })

    const data = await res.json()
    return NextResponse.json(data)

  } catch (e) {
    console.error('[candidature] proxy error:', e.message)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
