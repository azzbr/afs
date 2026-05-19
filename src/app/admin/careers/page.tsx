'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar/AdminSidebar'
import { Plus, Pencil, Trash2, CheckCircle, X } from 'lucide-react'

interface Career {
  id: string
  titleEn: string; titleAr: string
  departmentEn: string; departmentAr: string
  typeEn: string; typeAr: string
  descriptionEn: string; descriptionAr: string
  requirementsEn: string[]; requirementsAr: string[]
  active: boolean
  postedAt: string
}

const blank: Omit<Career, 'id' | 'postedAt'> = {
  titleEn: '', titleAr: '', departmentEn: '', departmentAr: '',
  typeEn: 'Full-time', typeAr: 'دوام كامل',
  descriptionEn: '', descriptionAr: '',
  requirementsEn: [], requirementsAr: [], active: true,
}

const inputCls = 'w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
const labelCls = 'block text-xs font-medium text-gray-400 mb-1'

const typeMap: Record<string, string> = {
  'Full-time': 'دوام كامل', 'Part-time': 'دوام جزئي', 'Contract': 'عقد', 'Substitute': 'بديل'
}

export default function CareersAdminPage() {
  const [careers, setCareers] = useState<Career[]>([])
  const [editing, setEditing] = useState<Partial<Career> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { fetch('/api/admin/careers').then(r => r.json()).then(setCareers) }, [])

  function openNew() { setIsNew(true); setEditing({ ...blank }) }
  function openEdit(c: Career) { setIsNew(false); setEditing({ ...c }) }
  function closeForm() { setEditing(null); setError('') }

  function set(field: string, val: string | boolean | string[]) {
    setEditing(prev => {
      const updated = { ...(prev ?? {}), [field]: val }
      if (field === 'typeEn') updated.typeAr = typeMap[val as string] ?? val as string
      return updated
    })
  }

  async function save() {
    if (!editing) return
    setError('')
    const method = isNew ? 'POST' : 'PUT'
    const url = isNew ? '/api/admin/careers' : `/api/admin/careers/${editing.id}`
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })
    if (!res.ok) { setError('Failed to save.'); return }
    const updated = await res.json()
    setCareers(prev => isNew ? [...prev, updated] : prev.map(c => c.id === updated.id ? updated : c))
    setSaved(true); setTimeout(() => setSaved(false), 2000)
    closeForm()
  }

  async function toggleActive(c: Career) {
    const res = await fetch(`/api/admin/careers/${c.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...c, active: !c.active }),
    })
    if (res.ok) { const u = await res.json(); setCareers(prev => prev.map(x => x.id === u.id ? u : x)) }
  }

  async function del(id: string) {
    if (!confirm('Delete this career posting?')) return
    const res = await fetch(`/api/admin/careers/${id}`, { method: 'DELETE' })
    if (res.ok) setCareers(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar active="Careers" />
      <main className="flex-1 p-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">Career Postings</h1>
            <p className="text-gray-400 text-sm mt-1">Manage open positions shown on the public careers page.</p>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
            <Plus size={15} /> Add Position
          </button>
        </div>

        {saved && <div className="mb-4 bg-green-900/30 border border-green-700/50 text-green-400 text-sm rounded-lg px-4 py-3 flex items-center gap-2"><CheckCircle size={14} /> Saved successfully.</div>}

        {/* Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">Position</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Department</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Type</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {careers.length === 0 && (
                <tr><td colSpan={5} className="text-center text-gray-500 text-sm py-10">No career postings yet.</td></tr>
              )}
              {careers.map(c => (
                <tr key={c.id} className="border-b border-gray-800/50 last:border-0">
                  <td className="px-6 py-3">
                    <div className="text-sm font-medium text-gray-200">{c.titleEn}</div>
                    <div className="text-xs text-gray-500 mt-0.5" dir="rtl">{c.titleAr}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">{c.departmentEn}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{c.typeEn}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(c)} className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${c.active ? 'bg-green-500/15 text-green-400 hover:bg-green-500/25' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}>
                      {c.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-gray-700 transition-colors"><Pencil size={14} /></button>
                      <button onClick={() => del(c.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add / Edit form */}
        {editing && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-gray-200">{isNew ? 'New Position' : 'Edit Position'}</h2>
              <button onClick={closeForm} className="text-gray-500 hover:text-gray-300"><X size={16} /></button>
            </div>
            {error && <div className="mb-4 bg-red-900/30 border border-red-700/50 text-red-400 text-sm rounded-lg px-4 py-3">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div><label className={labelCls}>Title (English)</label><input className={inputCls} value={editing.titleEn ?? ''} onChange={e => set('titleEn', e.target.value)} /></div>
              <div><label className={labelCls}>Title (Arabic)</label><input className={`${inputCls} text-right`} dir="rtl" value={editing.titleAr ?? ''} onChange={e => set('titleAr', e.target.value)} /></div>
              <div><label className={labelCls}>Department (English)</label><input className={inputCls} value={editing.departmentEn ?? ''} onChange={e => set('departmentEn', e.target.value)} /></div>
              <div><label className={labelCls}>Department (Arabic)</label><input className={`${inputCls} text-right`} dir="rtl" value={editing.departmentAr ?? ''} onChange={e => set('departmentAr', e.target.value)} /></div>
              <div>
                <label className={labelCls}>Type</label>
                <select className={inputCls} value={editing.typeEn ?? 'Full-time'} onChange={e => set('typeEn', e.target.value)}>
                  {Object.keys(typeMap).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex items-end gap-3">
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input type="checkbox" checked={editing.active ?? true} onChange={e => set('active', e.target.checked)} className="w-4 h-4 rounded bg-gray-800 border-gray-600 accent-indigo-600" />
                  Active (visible on site)
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div><label className={labelCls}>Description (English)</label><textarea rows={4} className={inputCls} value={editing.descriptionEn ?? ''} onChange={e => set('descriptionEn', e.target.value)} /></div>
              <div><label className={labelCls}>Description (Arabic)</label><textarea rows={4} className={`${inputCls} text-right`} dir="rtl" value={editing.descriptionAr ?? ''} onChange={e => set('descriptionAr', e.target.value)} /></div>
              <div>
                <label className={labelCls}>Requirements (English) — one per line</label>
                <textarea rows={5} className={inputCls} value={(editing.requirementsEn ?? []).join('\n')} onChange={e => set('requirementsEn', e.target.value.split('\n'))} />
              </div>
              <div>
                <label className={labelCls}>Requirements (Arabic) — one per line</label>
                <textarea rows={5} className={`${inputCls} text-right`} dir="rtl" value={(editing.requirementsAr ?? []).join('\n')} onChange={e => set('requirementsAr', e.target.value.split('\n'))} />
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button onClick={closeForm} className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-colors">Cancel</button>
              <button onClick={save} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
                <CheckCircle size={14} /> {isNew ? 'Create' : 'Update'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
