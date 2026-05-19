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

interface Career {
  id: string
  [key: string]: unknown
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await request.json()
  const careers = readData<Career[]>('careers.json')
  const index = careers.findIndex((c) => c.id === params.id)
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  careers[index] = { ...careers[index], ...body, id: params.id }
  writeData('careers.json', careers)
  return NextResponse.json(careers[index])
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const careers = readData<Career[]>('careers.json')
  const filtered = careers.filter((c) => c.id !== params.id)
  writeData('careers.json', filtered)
  return NextResponse.json({ success: true })
}
