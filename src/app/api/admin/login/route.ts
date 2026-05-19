import { NextResponse } from 'next/server'
import { signToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    const validUsername = process.env.ADMIN_USERNAME ?? 'admin'
    const validPassword = process.env.ADMIN_PASSWORD ?? ''

    if (username !== validUsername || password !== validPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = signToken({
      username,
      exp: Date.now() + 8 * 60 * 60 * 1000,
    })

    const response = NextResponse.json({ success: true })
    response.headers.set(
      'Set-Cookie',
      `afs-admin-session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=28800`
    )
    return response
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
