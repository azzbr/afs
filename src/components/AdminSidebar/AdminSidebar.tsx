'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, DollarSign, BarChart2, Briefcase, CalendarDays, LogOut } from 'lucide-react'
import { clsx } from 'clsx'
import { LogoMark } from '@/components/Logo/Logo'

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
    <aside className="flex min-h-screen w-56 shrink-0 flex-col border-r border-white/10 bg-brand-800">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <LogoMark size={32} />
        <div>
          <div className="text-sm font-semibold leading-tight text-white">AFS Admin</div>
          <div className="text-xs leading-tight text-white/45">Content Manager</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              active === label
                ? 'bg-brand-600/25 text-white border border-brand-500/40'
                : 'text-white/55 hover:bg-white/5 hover:text-white',
            )}
          >
            <Icon size={16} className="shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 px-3 pb-5 pt-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/55 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut size={16} className="shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
