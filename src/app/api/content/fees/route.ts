import { NextResponse } from 'next/server'
import { readData } from '@/lib/data'

export async function GET() {
  try {
    const data = readData('fees.json')
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to load fees' }, { status: 500 })
  }
}
