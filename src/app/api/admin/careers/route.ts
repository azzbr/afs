import { NextResponse } from 'next/server'
import { readData, writeData } from '@/lib/data'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import crypto from 'crypto'

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
  const data = readData('careers.json')
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await request.json()
  const careers = readData<unknown[]>('careers.json')
  const newItem = {
    ...body,
    id: crypto.randomUUID(),
    postedAt: new Date().toISOString(),
  }
  careers.push(newItem)
  writeData('careers.json', careers)
  return NextResponse.json(newItem, { status: 201 })
}
