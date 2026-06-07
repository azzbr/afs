'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, ArrowRight } from 'lucide-react'

const STORAGE_KEY = 'afs-banner-dismissed-v1'

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    try { sessionStorage.setItem(STORAGE_KEY, '1') } catch { /* noop */ }
  }

  if (!visible) return null

  return (
    <div className="relative z-[200] w-full bg-brand-700 text-white">
      <div className="container-custom flex items-center justify-between gap-4 py-2.5">
        <p className="text-[13px] font-medium leading-snug min-w-0">
          <span className="text-accent-400 font-semibold">Admissions 2025–2026 open.</span>{' '}
          <span className="text-white/80">Limited seats available.</span>{' '}
          <Link
            href="/admissions"
            className="inline-flex items-center gap-1 font-semibold underline-offset-4 hover:underline"
          >
            Apply now
            <ArrowRight size={13} />
          </Link>
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="flex-shrink-0 grid h-7 w-7 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
