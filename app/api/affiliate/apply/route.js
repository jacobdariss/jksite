import { NextResponse } from 'next/server'

// API REST officielle JPN v3.1.0 — POST /applications
const JPN_API    = 'https://manage.jokko.africa/modules/addons/jokko_partner/api/index.php/applications'
const JPN_TOKEN  = process.env.JPN_API_TOKEN || ''
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://api.jokko.africa'
const STRAPI_TK  = process.env.STRAPI_API_TOKEN || ''

export async function POST(req) {
  try {
    const body = await req.json()

    // 1. Tenter l'API REST JPN (Bearer Token)
    if (JPN_TOKEN) {
      try {
        const res = await fetch(JPN_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JPN_TOKEN}`,
          },
          body: JSON.stringify({
            company_name:          body.company_name,
            contact_name:          body.contact_name,
            email:                 body.email,
            phone:                 body.phone || '',
            country:               body.country || 'Sénégal',
            city:                  body.city || '',
            desired_type:          body.desired_type || 'affiliate',
            activity_description:  body.activity_description || '',
            channel_description:   body.channel_description || '',
            sector:                body.sector || '',
            zone:                  body.zone || '',
            has_legal_structure:   body.has_legal_structure ? 1 : 0,
            has_experience:        body.has_experience ? 1 : 0,
            accepts_conditions:    1,
            source:                'nextjs',
          }),
        })
        const text = await res.text()
        console.log('[apply] JPN API status:', res.status, text.substring(0, 300))
        if (res.ok) {
          try {
            const data = JSON.parse(text)
            if (data.success || data.id) {
              return NextResponse.json({
                success: true,
                message: "Votre candidature a bien été reçue. Notre équipe vous contactera sous 48h.",
                ref: data.id || data.ref || '',
              })
            }
          } catch {}
        }
      } catch (e) {
        console.error('[apply] JPN API error:', e.message)
      }
    }

    // 2. Fallback : enregistrer dans Strapi Contact
    if (STRAPI_TK) {
      const msg = [
        `Candidature partenaire`,
        `Type: ${body.desired_type || '?'}`,
        `Secteur: ${body.sector || '?'}`,
        `Zone: ${body.zone || '?'}`,
        `Activité: ${body.activity_description || '?'}`,
        `Pays/Ville: ${body.country || '?'} / ${body.city || '?'}`,
        `Structure légale: ${body.has_legal_structure ? 'Oui' : 'Non'}`,
        `Expérience: ${body.has_experience ? 'Oui' : 'Non'}`,
      ].join(' | ')

      await fetch(`${STRAPI_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${STRAPI_TK}`,
        },
        body: JSON.stringify({
          data: {
            name:    body.contact_name || '',
            email:   body.email || '',
            company: body.company_name || '',
            phone:   body.phone || '',
            subject: 'Candidature Partenaire',
            message: msg,
            publishedAt: new Date().toISOString(),
          },
        }),
      }).catch(e => console.error('[apply] Strapi fallback:', e.message))
    }

    return NextResponse.json({
      success: true,
      message: `Votre candidature a bien été reçue. Notre équipe vous contactera sous 48h à ${body.email}.`,
    })

  } catch (err) {
    console.error('[apply] Unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur. Contactez partenaires@jokko.africa' },
      { status: 500 }
    )
  }
}
