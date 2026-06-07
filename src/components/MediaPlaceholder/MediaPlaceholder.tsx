import Image from 'next/image'
import { ImageIcon, type LucideIcon } from 'lucide-react'
import { clsx } from 'clsx'

type Tone = 'soft' | 'blue' | 'navy' | 'accent'

const toneStyles: Record<Tone, { bg: string; icon: string; ring: string; text: string }> = {
  soft: {
    bg: 'bg-gradient-to-br from-[#eef2fa] to-[#e1e8f4]',
    icon: 'text-brand-400',
    ring: 'bg-white/70',
    text: 'text-muted',
  },
  blue: {
    bg: 'bg-gradient-to-br from-brand-100 to-[#d4e0f8]',
    icon: 'text-brand-500',
    ring: 'bg-white/70',
    text: 'text-brand-700',
  },
  navy: {
    bg: 'bg-gradient-to-br from-brand-700 to-brand-800',
    icon: 'text-white/70',
    ring: 'bg-white/10',
    text: 'text-white/70',
  },
  accent: {
    bg: 'bg-gradient-to-br from-accent-100 to-[#f8e4b6]',
    icon: 'text-accent-600',
    ring: 'bg-white/70',
    text: 'text-accent-700',
  },
}

export interface MediaPlaceholderProps {
  /** When provided, a real image renders instead of the placeholder. */
  src?: string
  alt?: string
  /** lucide icon shown in the placeholder state */
  icon?: LucideIcon
  /** small label shown beneath the icon */
  label?: string
  tone?: Tone
  /** CSS aspect-ratio, e.g. "16/9", "4/3", "1/1", "3/4" */
  aspect?: string
  rounded?: string
  className?: string
  imgClassName?: string
  priority?: boolean
  sizes?: string
  /** optional overlay content (gradient scrim, captions, badges) */
  children?: React.ReactNode
}

/**
 * A photo-ready visual slot. Renders a tasteful neutral placeholder
 * (subtle tone + line icon + label) until a real `src` is supplied —
 * at which point it swaps to next/image with identical dimensions, so
 * dropping in real photography requires zero layout changes.
 */
export default function MediaPlaceholder({
  src,
  alt = '',
  icon: Icon = ImageIcon,
  label,
  tone = 'soft',
  aspect = '4/3',
  rounded = 'rounded-2xl',
  className,
  imgClassName,
  priority,
  sizes = '(max-width: 768px) 100vw, 33vw',
  children,
}: MediaPlaceholderProps) {
  const s = toneStyles[tone]

  return (
    <div
      className={clsx('relative overflow-hidden', rounded, !src && s.bg, className)}
      style={{ aspectRatio: aspect }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={clsx('object-cover', imgClassName)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
          <span className={clsx('flex h-12 w-12 items-center justify-center rounded-full', s.ring)}>
            <Icon className={s.icon} size={22} strokeWidth={1.75} />
          </span>
          {label && (
            <span className={clsx('text-xs font-semibold tracking-wide', s.text)}>{label}</span>
          )}
        </div>
      )}
      {children}
    </div>
  )
}
