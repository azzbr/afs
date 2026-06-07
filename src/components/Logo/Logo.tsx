import Link from 'next/link'
import { clsx } from 'clsx'

interface LogoProps {
  lang?: 'en' | 'ar'
  theme?: 'light' | 'dark'
  /** show the wordmark text next to the mark */
  showText?: boolean
  href?: string
  className?: string
}

/** The sunrise mark — "Al Fajer" means "the dawn": a sun rising over a horizon. */
export function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="afs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2C5CE0" />
          <stop offset="1" stopColor="#11317A" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#afs-sky)" />
      {/* rays */}
      <g stroke="#F7B71D" strokeWidth="2" strokeLinecap="round">
        <line x1="24" y1="8.5" x2="24" y2="13.5" />
        <line x1="13.5" y1="13" x2="16.8" y2="16.3" />
        <line x1="34.5" y1="13" x2="31.2" y2="16.3" />
      </g>
      {/* rising sun */}
      <path d="M14 30 A10 10 0 0 1 34 30 Z" fill="#F7B71D" />
      {/* horizon lines */}
      <line x1="9" y1="30" x2="39" y2="30" stroke="#F7B71D" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <line x1="11" y1="35" x2="37" y2="35" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.28" />
    </svg>
  )
}

export default function Logo({
  lang = 'en',
  theme = 'light',
  showText = true,
  href = '/',
  className,
}: LogoProps) {
  const isRTL = lang === 'ar'
  const dark = theme === 'dark'

  return (
    <Link
      href={href}
      className={clsx('group flex items-center gap-3 shrink-0', className)}
      aria-label="Al Fajer Private School"
    >
      <LogoMark size={40} className="transition-transform duration-300 group-hover:scale-105" />
      {showText && (
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <div
            className={clsx(
              'font-display font-bold text-[15px] leading-tight transition-colors',
              dark ? 'text-white group-hover:text-accent-400' : 'text-ink group-hover:text-brand-600',
            )}
          >
            {isRTL ? 'مدرسة الفجر' : 'Al Fajer'}
          </div>
          <div className={clsx('text-[11px] leading-tight', dark ? 'text-white/55' : 'text-faint')}>
            {isRTL ? 'مدرسة خاصة' : 'Private School'}
          </div>
        </div>
      )}
    </Link>
  )
}
