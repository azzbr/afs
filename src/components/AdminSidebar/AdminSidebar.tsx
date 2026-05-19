'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, DollarSign, BarChart2, Briefcase, CalendarDays, LogOut } from 'lucide-react'
import { clsx } from 'clsx'

const navItems = [
  { label: 'Dashboard',  href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Fees',       href: '/admin/fees',       icon: DollarSign },
  { label: 'Stats',      href: '/admin/stats',      icon: BarChart2 },
  { label: 'Careers',    href: '/admin/careers',    icon: Briefcase },
  { label: 'Calendar',   href: '/admin/calendar',   icon: CalendarDays },
]

export default function AdminSidebar({ active }: { active: string }) {
  const router = useRouter()

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="w-56 shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-800">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">A</span>
        </div>
        <div>
          <div className="text-gray-100 font-semibold text-sm leading-tight">AFS Admin</div>
          <div className="text-gray-500 text-xs leading-tight">Content Manager</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              active === label
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30'
                : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800',
            )}
          >
            <Icon size={16} className="shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5 border-t border-gray-800 pt-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-colors w-full"
        >
          <LogOut size={16} className="shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
