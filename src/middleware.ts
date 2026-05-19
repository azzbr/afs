import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Edge-compatible HMAC verification using Web Crypto API
async function isValid(token: string, secret: string): Promise<boolean> {
  try {
    const [data, sig] = token.split('.')
    if (!data || !sig) return false

    const enc = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    )
    // Convert base64url sig to ArrayBuffer
    const sigBytes = Uint8Array.from(atob(sig.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(data))
    if (!valid) return false

    const payload = JSON.parse(atob(data.replace(/-/g, '+').replace(/_/g, '/')))
    return !payload.exp || Date.now() <= payload.exp
  } catch { return false }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (!pathname.startsWith('/admin') || pathname === '/admin/login') {
    return NextResponse.next()
  }
  const token = request.cookies.get('afs-admin-session')?.value
  const secret = process.env.ADMIN_SESSION_SECRET ?? 'fallback-secret'
  if (!token || !(await isValid(token, secret))) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*'] }
