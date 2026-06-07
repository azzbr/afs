import { clsx } from 'clsx'

interface PageHeroProps {
  tag?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  isRTL?: boolean
  align?: 'left' | 'center'
  children?: React.ReactNode
}

/** Standard inner-page hero on the "dawn" gradient. */
export default function PageHero({
  tag,
  title,
  subtitle,
  isRTL = false,
  align = 'center',
  children,
}: PageHeroProps) {
  const centered = align === 'center'
  return (
    <section className="dawn-hero relative overflow-hidden text-white">
      <div className="absolute inset-0 grid-faint opacity-40 pointer-events-none" />
      <div className="container-custom relative py-16 md:py-20">
        <div
          className={clsx(
            'max-w-3xl',
            centered ? 'mx-auto text-center' : isRTL ? 'text-right' : 'text-left',
          )}
        >
          {tag && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-400">
              {tag}
            </span>
          )}
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] text-balance md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className={clsx('mt-5 text-base leading-relaxed text-white/70 md:text-lg', centered && 'mx-auto max-w-2xl')}>
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  )
}
