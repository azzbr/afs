import { NextResponse } from 'next/server'
import { readData } from '@/lib/data'

export async function GET() {
  try {
    const data = readData('stats.json')
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 })
  }
}
