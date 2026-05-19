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

interface CalendarEvent {
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
  const events = readData<CalendarEvent[]>('calendar-events.json')
  const index = events.findIndex((e) => e.id === params.id)
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  events[index] = { ...events[index], ...body, id: params.id }
  writeData('calendar-events.json', events)
  return NextResponse.json(events[index])
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const events = readData<CalendarEvent[]>('calendar-events.json')
  const filtered = events.filter((e) => e.id !== params.id)
  writeData('calendar-events.json', filtered)
  return NextResponse.json({ success: true })
}
