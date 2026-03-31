import { NextResponse } from 'next/server'

const APPLY_URL = 'https://manage.jokko.africa/modules/addons/jokko_partner/api/apply.php'
const SECRET    = process.env.JPN_TRACKING_SECRET || ''

export async function POST(req) {
  try {
    const body = await req.json()

    let res, data

    try {
      res = await fetch(APPLY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-JPN-Secret': SECRET,
        },
        body: JSON.stringify({ ...body, secret: SECRET }),
      })
      const text = await res.text()
      console.log('[apply] WHMCS status:', res.status, 'body:', text.substring(0, 500))
      try {
        data = JSON.parse(text)
      } catch {
        // WHMCS not available or returned HTML — fallback to email notification
        data = null
      }
    } catch (fetchErr) {
      console.error('[apply] WHMCS unreachable:', fetchErr.message)
      data = null
    }

    // Si WHMCS répond correctement
    if (data && res.ok) {
      return NextResponse.json(data)
    }

    // Fallback : enregistrer dans Strapi Contact + retourner succès
    const STRAPI_URL   = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://api.jokko.africa'
    const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

    if (STRAPI_TOKEN) {
      await fetch(`${STRAPI_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            name: body.contact_name || '',
            email: body.email || '',
            company: body.company_name || '',
            phone: body.phone || '',
            message: `Candidature partenaire - Type: ${body.desired_type || '?'} | Secteur: ${body.sector || '?'} | Zone: ${body.zone || '?'} | Activité: ${body.activity_description || '?'}`,
            subject: 'Candidature Partenaire',
          },
        }),
      }).catch(e => console.error('[apply] Strapi fallback error:', e.message))
    }

    return NextResponse.json({
      success: true,
      message: "Votre candidature a bien été reçue. Notre équipe vous contactera sous 48h à l'adresse " + (body.email || ''),
    })

  } catch (err) {
    console.error('[apply] Unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur. Contactez partenaires@jokko.africa' },
      { status: 500 }
    )
  }
}
