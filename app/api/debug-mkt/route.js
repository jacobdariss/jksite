import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const url = 'https://manage.jokko.africa/modules/addons/jokko_partner/api/marketplace.php?action=offers&limit=3&offset=0'
    const res  = await fetch(url)
    const text = await res.text()
    return NextResponse.json({
      status: res.status,
      headers: Object.fromEntries(res.headers.entries()),
      body: text.substring(0, 2000),
    })
  } catch (err) {
    return NextResponse.json({ error: err.message })
  }
}
