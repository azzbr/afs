'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar/AdminSidebar'
import { Save, CheckCircle } from 'lucide-react'

interface StatsData {
  students: number
  teachers: number
  nationalities: number
  yearsEstablished: number
  satisfactionRate: number
  updatedAt: string
}

const inputCls = 'w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
const labelCls = 'block text-sm font-medium text-gray-300 mb-1.5'

const fields: { key: keyof StatsData; label: string; desc: string; suffix?: string }[] = [
  { key: 'students',         label: 'Total Students',        desc: 'Shown on homepage and about page' },
  { key: 'teachers',         label: 'Teaching Staff',         desc: 'Total qualified teachers' },
  { key: 'nationalities',    label: 'Student Nationalities',  desc: 'Number of nationalities represented' },
  { key: 'yearsEstablished', label: 'Years Established',      desc: 'How many years AFS has been operating' },
  { key: 'satisfactionRate', label: 'Satisfaction Rate',      desc: 'Parent satisfaction percentage', suffix: '%' },
]

export default function StatsAdminPage() {
  const [data, setData] = useState<StatsData | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(setData)
  }, [])

  function update(key: keyof StatsData, val: string) {
    if (!data) return
    setData({ ...data, [key]: key === 'updatedAt' ? val : Number(val) })
  }

  async function save() {
    if (!data) return
    setSaving(true); setError(''); setSaved(false)
    const res = await fetch('/api/admin/stats', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, updatedAt: new Date().toISOString() }),
    })
    setSaving(false)
    if (res.ok) { const d = await res.json(); setData(d); setSaved(true); setTimeout(() => setSaved(false), 3000) }
    else setError('Failed to save.')
  }

  if (!data) return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar active="Stats" />
      <main className="flex-1 p-8 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading…</div>
      </main>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar active="Stats" />
      <main className="flex-1 p-8 max-w-2xl">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">School Stats</h1>
            <p className="text-gray-400 text-sm mt-1">Numbers shown on the homepage, about page, and staff page.</p>
          </div>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
            {saved ? <><CheckCircle size={15} /> Saved</> : saving ? 'Saving…' : <><Save size={15} /> Save Changes</>}
          </button>
        </div>
        {error && <div className="mb-4 bg-red-900/30 border border-red-700/50 text-red-400 text-sm rounded-lg px-4 py-3">{error}</div>}

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-5">
          {fields.map(({ key, label, desc, suffix }) => (
            <div key={key}>
              <label className={labelCls}>{label}</label>
              <p className="text-xs text-gray-500 mb-2">{desc}</p>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max={suffix === '%' ? 100 : undefined}
                  className={`${inputCls} ${suffix ? 'pr-10' : ''}`}
                  value={data[key] as number}
                  onChange={e => update(key, e.target.value)}
                />
                {suffix && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{suffix}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-600 mt-4">
          Last updated: {new Date(data.updatedAt).toLocaleString('en-BH')}
        </p>
      </main>
    </div>
  )
}
