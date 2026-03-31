import { NextResponse } from 'next/server'

const MKT_URL = 'https://manage.jokko.africa/modules/addons/jokko_partner/api/marketplace.php'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const params = new URLSearchParams({
      action:   searchParams.get('action')   || 'offers',
      limit:    searchParams.get('limit')    || '9',
      offset:   searchParams.get('offset')   || '0',
      ...(searchParams.get('search')   && { search:   searchParams.get('search') }),
      ...(searchParams.get('category') && { category: searchParams.get('category') }),
      ...(searchParams.get('slug')     && { slug:     searchParams.get('slug') }),
    })

    const res  = await fetch(`${MKT_URL}?${params}`)
    const text = await res.text()
    if (!text || text.trim() === '') {
      return NextResponse.json({ success: false, error: 'empty' }, { status: 502 })
    }
    const data = JSON.parse(text)
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
