import { clsx } from 'clsx'

interface SectionHeadingProps {
  tag?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  align?: 'left' | 'center'
  isRTL?: boolean
  light?: boolean
  className?: string
}

/** Standardised section header: eyebrow tag + display title + optional subtitle. */
export default function SectionHeading({
  tag,
  title,
  subtitle,
  align = 'center',
  isRTL = false,
  light = false,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div
      className={clsx(
        'max-w-3xl',
        centered ? 'mx-auto text-center' : isRTL ? 'text-right' : 'text-left',
        className,
      )}
    >
      {tag && (
        <span
          className={clsx(
            'section-tag',
            light && 'bg-white/10 text-accent-300',
          )}
        >
          {tag}
        </span>
      )}
      <h2 className={clsx('section-title font-display text-balance', light && 'section-title-white')}>
        {title}
      </h2>
      {subtitle && (
        <p className={clsx('section-subtitle text-pretty', centered && 'mx-auto', light && 'text-white/70')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
