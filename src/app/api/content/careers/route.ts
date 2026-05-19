import { NextResponse } from 'next/server'
import { readData } from '@/lib/data'

interface Career {
  id: string
  active: boolean
  [key: string]: unknown
}

export async function GET() {
  const careers = readData<Career[]>('careers.json')
  const active = careers.filter((c) => c.active === true)
  return NextResponse.json(active)
}
