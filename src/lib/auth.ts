import crypto from 'crypto'

const SECRET = process.env.ADMIN_SESSION_SECRET ?? 'fallback-secret'

export function signToken(payload: object): string {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = crypto.createHmac('sha256', SECRET).update(data).digest('base64url')
  return `${data}.${sig}`
}

export function verifyToken(token: string): Record<string, unknown> | null {
  try {
    const [data, sig] = token.split('.')
    const expected = crypto.createHmac('sha256', SECRET).update(data).digest('base64url')
    if (sig !== expected) return null
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString())
    if (payload.exp && Date.now() > payload.exp) return null
    return payload
  } catch {
    return null
  }
}

export function isAuthenticated(cookieHeader: string | null): boolean {
  if (!cookieHeader) return false
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => c.trim().split('=').map(decodeURIComponent))
  )
  const token = cookies['afs-admin-session']
  if (!token) return false
  return verifyToken(token) !== null
}
