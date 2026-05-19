import { NextResponse } from 'next/server'
import { readData, writeData } from '@/lib/data'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

function checkAuth(): boolean {
  const cookieStore = cookies()
  const token = cookieStore.get('afs-admin-session')?.value
  if (!token) return false
  return verifyToken(token) !== null
}

export async function GET() {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const data = readData('fees.json')
  return NextResponse.json(data)
}

export async function PUT(request: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await request.json()
  body.updatedAt = new Date().toISOString()
  writeData('fees.json', body)
  return NextResponse.json(body)
}
