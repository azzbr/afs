'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { clsx } from 'clsx'

interface FloatingCTAProps {
  lang?: 'en' | 'ar'
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

const WA_MESSAGE_EN = 'Hello, I\'m interested in learning more about Al Fajer Private School and enrollment for my child.'
const WA_MESSAGE_AR = 'مرحباً، أود الاستفسار عن مدرسة الفجر الخاصة والتسجيل لطفلي.'

export default function FloatingCTA({ lang = 'en' }: FloatingCTAProps) {
  const [visible, setVisible] = useState(false)
  const isRTL = lang === 'ar'

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const applyLabel = lang === 'ar' ? 'سجّل الآن' : 'Apply Now'
  const waLabel    = lang === 'ar' ? 'واتساب'   : 'WhatsApp'
  const Arr        = isRTL ? ArrowLeft : ArrowRight

  const waMsg = encodeURIComponent(lang === 'ar' ? WA_MESSAGE_AR : WA_MESSAGE_EN)
  const waUrl = `https://wa.me/97317612221?text=${waMsg}`

  return (
    <div
      className={clsx(
        'fixed bottom-7 z-[150] flex flex-col items-end gap-3 transition-all duration-500',
        isRTL ? 'left-5 items-start' : 'right-5 items-end',
      )}
    >
      {/* Apply Now — appears on scroll */}
      <div className={clsx(
        'transition-all duration-500',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
      )}>
        <Link
          href="/admissions"
          className="group relative flex items-center gap-2 px-5 py-3 rounded-2xl bg-brand-gold text-neutral-900 font-bold text-sm shadow-[0_8px_30px_rgba(255,200,0,0.45)] hover:shadow-[0_12px_50px_rgba(255,200,0,0.7)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-in-out" />
          <span className="relative z-10">{applyLabel}</span>
          <Arr size={14} className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>

      {/* WhatsApp — always visible after initial paint */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={waLabel}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#25D366] text-white font-bold text-sm shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_50px_rgba(37,211,102,0.65)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-in-out" />
        <span className="relative z-10 flex-shrink-0"><WhatsAppIcon size={18} /></span>
        <span className="relative z-10 hidden sm:block">{waLabel}</span>
      </a>
    </div>
  )
}
