import { NextResponse } from 'next/server'

const COOKIE_NAME   = 'jpn_ref'
const COOKIE_DOMAIN = '.jokko.africa'
const COOKIE_DAYS   = 30

export function middleware(request) {
  const { searchParams } = request.nextUrl
  const ref = (searchParams.get('ref') || searchParams.get('jpn_ref') || '').toUpperCase().replace(/[^A-Z0-9]/g, '')

  const response = NextResponse.next()

  if (ref && ref.length >= 4) {
    const existing = request.cookies.get(COOKIE_NAME)
    if (!existing) {
      response.cookies.set(COOKIE_NAME, ref, {
        domain:   COOKIE_DOMAIN,
        path:     '/',
        maxAge:   COOKIE_DAYS * 86400,
        secure:   true,
        httpOnly: false,
        sameSite: 'lax',
      })
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|_assets).*)'],
}
