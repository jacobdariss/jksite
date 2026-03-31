import { NextResponse } from 'next/server'

const APPLY_URL = 'https://manage.jokko.africa/modules/addons/jokko_partner/api/apply.php'
const SECRET    = process.env.JPN_TRACKING_SECRET || ''

export async function POST(req) {
  try {
    const body = await req.json()

    const res = await fetch(APPLY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-JPN-Secret': SECRET,
      },
      body: JSON.stringify({ ...body, secret: SECRET }),
    })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('[apply]', err)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur. Contactez partenaires@jokko.africa' },
      { status: 500 }
    )
  }
}
