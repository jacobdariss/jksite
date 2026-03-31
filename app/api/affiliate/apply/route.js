import { NextResponse } from 'next/server'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://api.jokko.africa'
const STRAPI_TK  = process.env.STRAPI_API_TOKEN || ''

export async function POST(req) {
  let body = {}
  try { body = await req.json() } catch {}

  // Enregistrer dans Strapi
  if (STRAPI_TK) {
    try {
      const r = await fetch(`${STRAPI_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${STRAPI_TK}`,
        },
        body: JSON.stringify({
          data: {
            name:    String(body.contact_name || ''),
            email:   String(body.email || ''),
            phone:   String(body.phone || ''),
            company: String(body.company_name || ''),
            subject: 'Candidature Partenaire',
            message: `Type: ${body.desired_type} | Secteur: ${body.sector} | Zone: ${body.zone} | ${body.activity_description}`,
            publishedAt: new Date().toISOString(),
          },
        }),
      })
      const txt = await r.text()
      console.log('[apply] Strapi:', r.status, txt.substring(0, 300))
    } catch (e) {
      console.error('[apply] Strapi error:', e.message)
    }
  } else {
    console.log('[apply] No STRAPI_TOKEN')
  }

  // Toujours retourner succès
  return NextResponse.json({
    success: true,
    message: `Candidature reçue. Notre équipe vous contactera sous 48h à ${body.email || 'votre adresse email'}.`,
  })
}
