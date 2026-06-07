'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar/AdminSidebar'
import { Plus, Pencil, Trash2, CheckCircle, X } from 'lucide-react'

interface CalEvent {
  id: string
  titleEn: string; titleAr: string
  date: string; endDate: string | null
  typeEn: string; typeAr: string
  descriptionEn: string; descriptionAr: string
}

const typeMap: Record<string, string> = {
  Holiday: 'عطلة', Event: 'فعالية', Assessment: 'تقييم', Meeting: 'اجتماع', Other: 'أخرى'
}

const blank: Omit<CalEvent, 'id'> = {
  titleEn: '', titleAr: '', date: '', endDate: null,
  typeEn: 'Event', typeAr: 'فعالية', descriptionEn: '', descriptionAr: '',
}

const inputCls = 'w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500'
const labelCls = 'block text-xs font-medium text-gray-400 mb-1'

const typeBadge: Record<string, string> = {
  Holiday: 'bg-red-500/15 text-red-400',
  Event: 'bg-blue-500/15 text-blue-400',
  Assessment: 'bg-amber-500/15 text-amber-400',
  Meeting: 'bg-violet-500/15 text-violet-400',
  Other: 'bg-gray-700 text-gray-400',
}

export default function CalendarAdminPage() {
  const [events, setEvents] = useState<CalEvent[]>([])
  const [editing, setEditing] = useState<Partial<CalEvent> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { fetch('/api/admin/calendar').then(r => r.json()).then(setEvents) }, [])

  function openNew() { setIsNew(true); setEditing({ ...blank }) }
  function openEdit(ev: CalEvent) { setIsNew(false); setEditing({ ...ev }) }
  function closeForm() { setEditing(null); setError('') }

  function set(field: string, val: string | null) {
    setEditing(prev => {
      const updated = { ...(prev ?? {}), [field]: val }
      if (field === 'typeEn') updated.typeAr = typeMap[val as string] ?? val as string
      return updated
    })
  }

  async function save() {
    if (!editing || !editing.titleEn || !editing.date) { setError('Title and date are required.'); return }
    setError('')
    const method = isNew ? 'POST' : 'PUT'
    const url = isNew ? '/api/admin/calendar' : `/api/admin/calendar/${editing.id}`
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })
    if (!res.ok) { setError('Failed to save.'); return }
    const updated = await res.json()
    setEvents(prev => isNew ? [...prev, updated].sort((a,b) => a.date.localeCompare(b.date)) : prev.map(e => e.id === updated.id ? updated : e))
    setSaved(true); setTimeout(() => setSaved(false), 2000)
    closeForm()
  }

  async function del(id: string) {
    if (!confirm('Delete this event?')) return
    const res = await fetch(`/api/admin/calendar/${id}`, { method: 'DELETE' })
    if (res.ok) setEvents(prev => prev.filter(e => e.id !== id))
  }

  function fmtDate(d: string) {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-BH', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar active="Calendar" />
      <main className="flex-1 p-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">Calendar Events</h1>
            <p className="text-gray-400 text-sm mt-1">Add holidays, events, assessments and meetings to the school calendar.</p>
          </div>
          <button onClick={openNew} className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
            <Plus size={15} /> Add Event
          </button>
        </div>

        {saved && <div className="mb-4 bg-green-900/30 border border-green-700/50 text-green-400 text-sm rounded-lg px-4 py-3 flex items-center gap-2"><CheckCircle size={14} /> Saved successfully.</div>}

        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">Event</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Date</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Type</th>
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 && (
                <tr><td colSpan={4} className="text-center text-gray-500 text-sm py-10">No events yet.</td></tr>
              )}
              {events.map(ev => (
                <tr key={ev.id} className="border-b border-gray-800/50 last:border-0">
                  <td className="px-6 py-3">
                    <div className="text-sm font-medium text-gray-200">{ev.titleEn}</div>
                    <div className="text-xs text-gray-500 mt-0.5" dir="rtl">{ev.titleAr}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {fmtDate(ev.date)}{ev.endDate ? ` – ${fmtDate(ev.endDate)}` : ''}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeBadge[ev.typeEn] ?? typeBadge.Other}`}>{ev.typeEn}</span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(ev)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-gray-700 transition-colors"><Pencil size={14} /></button>
                      <button onClick={() => del(ev.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editing && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-gray-200">{isNew ? 'New Event' : 'Edit Event'}</h2>
              <button onClick={closeForm} className="text-gray-500 hover:text-gray-300"><X size={16} /></button>
            </div>
            {error && <div className="mb-4 bg-red-900/30 border border-red-700/50 text-red-400 text-sm rounded-lg px-4 py-3">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div><label className={labelCls}>Title (English)</label><input className={inputCls} value={editing.titleEn ?? ''} onChange={e => set('titleEn', e.target.value)} /></div>
              <div><label className={labelCls}>Title (Arabic)</label><input className={`${inputCls} text-right`} dir="rtl" value={editing.titleAr ?? ''} onChange={e => set('titleAr', e.target.value)} /></div>
              <div>
                <label className={labelCls}>Start Date</label>
                <input type="date" className={inputCls} value={editing.date ?? ''} onChange={e => set('date', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>End Date (optional)</label>
                <input type="date" className={inputCls} value={editing.endDate ?? ''} onChange={e => set('endDate', e.target.value || null)} />
              </div>
              <div>
                <label className={labelCls}>Event Type</label>
                <select className={inputCls} value={editing.typeEn ?? 'Event'} onChange={e => set('typeEn', e.target.value)}>
                  {Object.keys(typeMap).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div><label className={labelCls}>Description (English)</label><textarea rows={3} className={inputCls} value={editing.descriptionEn ?? ''} onChange={e => set('descriptionEn', e.target.value)} /></div>
              <div><label className={labelCls}>Description (Arabic)</label><textarea rows={3} className={`${inputCls} text-right`} dir="rtl" value={editing.descriptionAr ?? ''} onChange={e => set('descriptionAr', e.target.value)} /></div>
            </div>

            <div className="flex gap-3 justify-end">
              <button onClick={closeForm} className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-colors">Cancel</button>
              <button onClick={save} className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
                <CheckCircle size={14} /> {isNew ? 'Create' : 'Update'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
