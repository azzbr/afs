'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar/AdminSidebar'
import { Save, CheckCircle } from 'lucide-react'

interface Grade { grade: string; gradeAr: string; annualFee: number; registrationFee: number }
interface FeesData {
  currency: string
  siblingDiscount: string
  paymentTerms: string
  noteEn: string
  noteAr: string
  updatedAt: string
  grades: Grade[]
}

const inputCls = 'w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent'
const labelCls = 'block text-xs font-medium text-gray-400 mb-1'

export default function FeesAdminPage() {
  const [data, setData] = useState<FeesData | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/fees').then(r => r.json()).then(setData)
  }, [])

  function updateGrade(i: number, field: keyof Grade, val: string) {
    if (!data) return
    const grades = [...data.grades]
    grades[i] = { ...grades[i], [field]: field.includes('Fee') ? Number(val) : val }
    setData({ ...data, grades })
  }

  async function save() {
    if (!data) return
    setSaving(true); setError(''); setSaved(false)
    const res = await fetch('/api/admin/fees', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, updatedAt: new Date().toISOString() }),
    })
    setSaving(false)
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000) }
    else setError('Failed to save. Please try again.')
  }

  if (!data) return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar active="Fees" />
      <main className="flex-1 p-8 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading…</div>
      </main>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar active="Fees" />
      <main className="flex-1 p-8 max-w-4xl">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">School Fees</h1>
            <p className="text-gray-400 text-sm mt-1">Update fee amounts, discounts, and notes. Changes appear live on the website.</p>
          </div>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 disabled:opacity-60 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
            {saved ? <><CheckCircle size={15} /> Saved</> : saving ? 'Saving…' : <><Save size={15} /> Save Changes</>}
          </button>
        </div>
        {error && <div className="mb-4 bg-red-900/30 border border-red-700/50 text-red-400 text-sm rounded-lg px-4 py-3">{error}</div>}

        {/* General settings */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-300 mb-4">General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className={labelCls}>Currency</label>
              <input className={inputCls} value={data.currency} onChange={e => setData({...data, currency: e.target.value})} />
            </div>
            <div>
              <label className={labelCls}>Sibling Discount</label>
              <input className={inputCls} value={data.siblingDiscount} onChange={e => setData({...data, siblingDiscount: e.target.value})} placeholder="e.g. 10%" />
            </div>
            <div>
              <label className={labelCls}>Payment Terms</label>
              <input className={inputCls} value={data.paymentTerms} onChange={e => setData({...data, paymentTerms: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Fee Note (English)</label>
              <textarea rows={2} className={inputCls} value={data.noteEn} onChange={e => setData({...data, noteEn: e.target.value})} />
            </div>
            <div>
              <label className={labelCls}>Fee Note (Arabic)</label>
              <textarea rows={2} className={`${inputCls} text-right`} dir="rtl" value={data.noteAr} onChange={e => setData({...data, noteAr: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Grade fee table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-sm font-semibold text-gray-300">Fee Schedule by Grade</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">Grade</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Grade (Arabic)</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Annual Fee (BHD)</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 pr-6">Registration Fee (BHD)</th>
                </tr>
              </thead>
              <tbody>
                {data.grades.map((g, i) => (
                  <tr key={g.grade} className="border-b border-gray-800/50 last:border-0">
                    <td className="px-6 py-3">
                      <input className={inputCls} value={g.grade} onChange={e => updateGrade(i, 'grade', e.target.value)} />
                    </td>
                    <td className="px-4 py-3">
                      <input className={`${inputCls} text-right`} dir="rtl" value={g.gradeAr} onChange={e => updateGrade(i, 'gradeAr', e.target.value)} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">BHD</span>
                        <input type="number" min="0" className={`${inputCls} pl-10`} value={g.annualFee} onChange={e => updateGrade(i, 'annualFee', e.target.value)} />
                      </div>
                    </td>
                    <td className="px-4 py-3 pr-6">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">BHD</span>
                        <input type="number" min="0" className={`${inputCls} pl-10`} value={g.registrationFee} onChange={e => updateGrade(i, 'registrationFee', e.target.value)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
