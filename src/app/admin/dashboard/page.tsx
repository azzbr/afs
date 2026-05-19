'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar/AdminSidebar'
import { DollarSign, BarChart2, Briefcase, CalendarDays, Clock } from 'lucide-react'

interface Summary {
  feesCount: number
  feesUpdated: string
  statsUpdated: string
  careersCount: number
  careersUpdated: string | null
  eventsCount: number
  eventsUpdated: string | null
}

function fmt(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-BH', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function DashboardPage() {
  const [data, setData] = useState<Summary | null>(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/fees').then(r => r.json()),
      fetch('/api/admin/stats').then(r => r.json()),
      fetch('/api/admin/careers').then(r => r.json()),
      fetch('/api/admin/calendar').then(r => r.json()),
    ]).then(([fees, stats, careers, calendar]) => {
      setData({
        feesCount: fees.grades?.length ?? 0,
        feesUpdated: fees.updatedAt ?? null,
        statsUpdated: stats.updatedAt ?? null,
        careersCount: (careers as {active:boolean}[]).filter(c => c.active).length,
        careersUpdated: careers.length ? careers[0].postedAt : null,
        eventsCount: (calendar as unknown[]).length,
        eventsUpdated: calendar.length ? calendar[0].date : null,
      })
    }).catch(() => {})
  }, [])

  const cards = [
    { label: 'Fee Grades', value: data?.feesCount ?? '—', icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', updated: data?.feesUpdated ?? null, href: '/admin/fees' },
    { label: 'Stats Configured', value: data ? '5' : '—', icon: BarChart2, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', updated: data?.statsUpdated ?? null, href: '/admin/stats' },
    { label: 'Active Careers', value: data?.careersCount ?? '—', icon: Briefcase, color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20', updated: data?.careersUpdated ?? null, href: '/admin/careers' },
    { label: 'Calendar Events', value: data?.eventsCount ?? '—', icon: CalendarDays, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', updated: data?.eventsUpdated ?? null, href: '/admin/calendar' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar active="Dashboard" />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Overview of all editable content on the AFS website.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          {cards.map(({ label, value, icon: Icon, color, bg, updated, href }) => (
            <a key={label} href={href} className={`rounded-xl border p-5 ${bg} hover:brightness-110 transition block`}>
              <div className="flex items-start justify-between mb-4">
                <span className={`text-sm font-medium text-gray-300`}>{label}</span>
                <Icon size={18} className={color} />
              </div>
              <div className="text-3xl font-bold text-gray-100 mb-2">{value}</div>
              {updated && (
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock size={11} />
                  Updated {fmt(updated)}
                </div>
              )}
            </a>
          ))}
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-sm font-semibold text-gray-300 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Edit Fees', href: '/admin/fees' },
              { label: 'Edit Stats', href: '/admin/stats' },
              { label: 'Manage Careers', href: '/admin/careers' },
              { label: 'Manage Calendar', href: '/admin/calendar' },
            ].map(({ label, href }) => (
              <a key={href} href={href} className="text-center px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-sm font-semibold text-gray-300 mb-2">Default Credentials</h2>
          <p className="text-xs text-gray-500">Username: <code className="text-gray-300 bg-gray-800 px-1.5 py-0.5 rounded">admin</code> · Password set in <code className="text-gray-300 bg-gray-800 px-1.5 py-0.5 rounded">.env.local</code>. Change <code className="text-gray-300 bg-gray-800 px-1.5 py-0.5 rounded">ADMIN_PASSWORD</code> to update.</p>
        </div>
      </main>
    </div>
  )
}
