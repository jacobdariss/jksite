import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const url = 'https://manage.jokko.africa/modules/addons/jokko_partner/api/marketplace.php?action=offers&limit=3&offset=0&_=' + Date.now()
    const res  = await fetch(url, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
    })
    const text = await res.text()
    return NextResponse.json({
      status: res.status,
      cf_ray: res.headers.get('cf-ray'),
      body: text.substring(0, 2000) || '(empty)',
    })
  } catch (err) {
    return NextResponse.json({ error: err.message })
  }
}
