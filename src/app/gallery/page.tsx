'use client'

import { useState, useEffect, useCallback } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const filters = {
  en: ['All', 'Classrooms', 'Events', 'Sports', 'Arts', 'Graduation'],
  ar: ['الكل', 'الفصول', 'الفعاليات', 'الرياضة', 'الفنون', 'التخرج'],
}

const galleryItems = [
  { id: 1,  category: 'Classrooms', categoryAr: 'الفصول',   title: 'Modern Classroom',     titleAr: 'فصل دراسي حديث',    color: 'from-blue-400 to-indigo-600',    size: 'large',  emoji: '📚' },
  { id: 2,  category: 'Events',     categoryAr: 'الفعاليات', title: 'Annual Day',            titleAr: 'اليوم السنوي',      color: 'from-amber-400 to-orange-500',   size: 'normal', emoji: '🎉' },
  { id: 3,  category: 'Sports',     categoryAr: 'الرياضة',   title: 'Sports Day',            titleAr: 'يوم الرياضة',       color: 'from-emerald-400 to-teal-600',   size: 'normal', emoji: '⚽' },
  { id: 4,  category: 'Arts',       categoryAr: 'الفنون',    title: 'Art Exhibition',        titleAr: 'معرض الفنون',       color: 'from-rose-400 to-pink-600',      size: 'large',  emoji: '🎨' },
  { id: 5,  category: 'Graduation', categoryAr: 'التخرج',    title: 'Graduation Ceremony',   titleAr: 'حفل التخرج',        color: 'from-violet-400 to-purple-600',  size: 'normal', emoji: '🎓' },
  { id: 6,  category: 'Classrooms', categoryAr: 'الفصول',   title: 'Science Lab',           titleAr: 'مختبر العلوم',      color: 'from-cyan-400 to-blue-500',      size: 'normal', emoji: '🔬' },
  { id: 7,  category: 'Events',     categoryAr: 'الفعاليات', title: 'Cultural Day',          titleAr: 'يوم الثقافة',       color: 'from-yellow-400 to-amber-500',   size: 'large',  emoji: '🌍' },
  { id: 8,  category: 'Sports',     categoryAr: 'الرياضة',   title: 'Basketball',            titleAr: 'كرة السلة',         color: 'from-orange-400 to-red-500',     size: 'normal', emoji: '🏀' },
  { id: 9,  category: 'Arts',       categoryAr: 'الفنون',    title: 'Drama Performance',     titleAr: 'عرض درامي',         color: 'from-fuchsia-400 to-purple-500', size: 'normal', emoji: '🎭' },
  { id: 10, category: 'Classrooms', categoryAr: 'الفصول',   title: 'Library Corner',        titleAr: 'ركن المكتبة',       color: 'from-sky-400 to-blue-600',       size: 'normal', emoji: '📖' },
  { id: 11, category: 'Events',     categoryAr: 'الفعاليات', title: 'National Day',          titleAr: 'اليوم الوطني',      color: 'from-red-400 to-rose-600',       size: 'normal', emoji: '🇧🇭' },
  { id: 12, category: 'Graduation', categoryAr: 'التخرج',    title: 'Awards Night',          titleAr: 'ليلة التكريم',      color: 'from-amber-500 to-yellow-400',   size: 'large',  emoji: '🏆' },
]

const t = {
  en: {
    hero: { tag: 'Gallery', title: 'Life at', titleAccent: 'Al Fajer School', subtitle: 'A glimpse into the vibrant, enriching daily life of our school community.' },
    empty: 'No photos in this category yet.',
    photos: 'Photos',
    prev: 'Previous',
    next: 'Next',
    close: 'Close',
    of: 'of',
  },
  ar: {
    hero: { tag: 'المعرض', title: 'الحياة في', titleAccent: 'مدرسة الفجر', subtitle: 'لمحة من الحياة اليومية النابضة والمثرية لمجتمع مدرستنا.' },
    empty: 'لا توجد صور في هذه الفئة بعد.',
    photos: 'صور',
    prev: 'السابق',
    next: 'التالي',
    close: 'إغلاق',
    of: 'من',
  },
}

export default function GalleryPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [active, setActive] = useState(0)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const isRTL = lang === 'ar'
  const c = t[lang]
  const cats = filters[lang]
  useScrollReveal()

  const filtered = active === 0
    ? galleryItems
    : galleryItems.filter((g) => (lang === 'ar' ? g.categoryAr : g.category) === cats[active])

  const openLightbox = (idx: number) => setLightboxIdx(idx)

  const closeLightbox = useCallback(() => setLightboxIdx(null), [])

  const goPrev = useCallback(() => {
    setLightboxIdx((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length))
  }, [filtered.length])

  const goNext = useCallback(() => {
    setLightboxIdx((i) => (i === null ? null : (i + 1) % filtered.length))
  }, [filtered.length])

  /* Keyboard navigation */
  useEffect(() => {
    if (lightboxIdx === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft')  isRTL ? goNext() : goPrev()
      if (e.key === 'ArrowRight') isRTL ? goPrev() : goNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIdx, isRTL, goPrev, goNext, closeLightbox])

  /* Lock body scroll when lightbox is open */
  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIdx])

  const currentItem = lightboxIdx !== null ? filtered[lightboxIdx] : null

  /* Count per category */
  const countFor = (i: number) =>
    i === 0 ? galleryItems.length : galleryItems.filter((g) => (lang === 'ar' ? g.categoryAr : g.category) === cats[i]).length

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen">
      <Header lang={lang} onLangChange={setLang} />
      <main>

        {/* ── Hero ── */}
        <section className="hero-dark relative overflow-hidden py-28 lg:py-36">
          <div className="container-custom relative z-10">
            <div className={clsx('max-w-2xl', isRTL && 'text-right')}>
              <div className={clsx('mb-5', isRTL && 'flex justify-end')}>
                <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>
                  {c.hero.tag}
                </div>
              </div>
              <h1 className={clsx('font-bold leading-tight mb-5', !isRTL && 'font-playfair')}>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white/92">{c.hero.title}</span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-[var(--brand-gold)]">{c.hero.titleAccent}</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed">{c.hero.subtitle}</p>
            </div>
          </div>
        </section>

        {/* ── Filter + Grid ── */}
        <section className="section-padding bg-[var(--cream)]">
          <div className="container-custom">

            {/* Filter tabs with item count badges */}
            <div className={clsx('flex flex-wrap gap-2 mb-12', isRTL ? 'justify-end' : 'justify-center')} data-reveal="fade">
              {cats.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => setActive(i)}
                  className={clsx(
                    'relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200',
                    active === i
                      ? 'bg-[var(--brand-navy)] text-white'
                      : 'bg-white border border-[var(--border)] text-neutral-600 hover:border-[var(--brand-gold)] hover:text-[var(--brand-navy)]',
                  )}
                >
                  {cat}
                  <span className={clsx(
                    'text-xs font-bold px-1.5 py-0.5 rounded-full leading-none',
                    active === i ? 'bg-white/20 text-white' : 'bg-[var(--cream)] text-neutral-500',
                  )}>
                    {countFor(i)}
                  </span>
                </button>
              ))}
            </div>

            {/* Simple bordered grid */}
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {filtered.map((item, i) => (
                <div
                  key={item.id}
                  data-reveal="scale"
                  data-delay={String((i % 6) * 80)}
                  className="group relative overflow-hidden cursor-pointer border border-[var(--border)] bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 break-inside-avoid"
                  style={{ aspectRatio: item.size === 'large' ? '4/3' : '1/1' }}
                  onClick={() => openLightbox(i)}
                  role="button"
                  aria-label={lang === 'ar' ? item.titleAr : item.title}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
                >
                  {/* Neutral background with emoji */}
                  <div className="absolute inset-0 bg-[var(--cream)] flex flex-col items-center justify-center">
                    <span className="text-5xl mb-2">{item.emoji}</span>
                    <span className="text-[var(--ink)] font-semibold text-sm px-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {lang === 'ar' ? item.titleAr : item.title}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[var(--brand-navy)]/0 group-hover:bg-[var(--brand-navy)]/10 transition-all duration-300" />

                  {/* Top row: category + zoom icon */}
                  <div className={clsx('absolute top-3 flex items-center justify-between w-full px-3 opacity-0 group-hover:opacity-100 transition-all duration-200', isRTL && 'flex-row-reverse')}>
                    <span className="text-xs font-bold bg-white border border-[var(--border)] rounded-full px-3 py-1 text-[var(--brand-navy)]">
                      {lang === 'ar' ? item.categoryAr : item.category}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white border border-[var(--border)] flex items-center justify-center">
                      <ZoomIn size={13} className="text-[var(--brand-navy)]" />
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-20 text-neutral-400">{c.empty}</div>
              )}
            </div>
          </div>
        </section>

      </main>
      <Footer lang={lang} />

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && currentItem && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 backdrop-blur-sm animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Panel — stop propagation so clicking inside doesn't close */}
          <div
            className="relative w-full max-w-2xl mx-4 overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image area */}
            <div
              className="relative flex items-center justify-center bg-[var(--cream)]"
              style={{ aspectRatio: '4/3' }}
            >
              <span className="text-[8rem] select-none">{currentItem.emoji}</span>

              {/* Counter */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white border border-[var(--border)] rounded-full px-4 py-1 text-[var(--ink)] text-xs font-semibold">
                {lightboxIdx + 1} {c.of} {filtered.length}
              </div>

              {/* Category badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <span className="bg-[var(--brand-navy)] rounded-full px-4 py-1.5 text-white text-xs font-bold">
                  {lang === 'ar' ? currentItem.categoryAr : currentItem.category}
                </span>
              </div>
            </div>

            {/* Caption bar */}
            <div className="bg-white border-t border-[var(--border)] px-6 py-4 flex items-center justify-between">
              <h3 className={clsx('font-bold text-[var(--ink)] text-base', !isRTL && 'font-playfair')}>
                {lang === 'ar' ? currentItem.titleAr : currentItem.title}
              </h3>
              <span className="text-xs text-neutral-400 font-medium">
                {lang === 'ar' ? currentItem.categoryAr : currentItem.category}
              </span>
            </div>
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); isRTL ? goNext() : goPrev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-[var(--border)] flex items-center justify-center text-[var(--brand-navy)] transition-all duration-200 hover:shadow-md hover:scale-105"
            aria-label={c.prev}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); isRTL ? goPrev() : goNext() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-[var(--border)] flex items-center justify-center text-[var(--brand-navy)] transition-all duration-200 hover:shadow-md hover:scale-105"
            aria-label={c.next}
          >
            <ChevronRight size={20} />
          </button>

          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white border border-[var(--border)] flex items-center justify-center text-[var(--brand-navy)] transition-all duration-200 hover:shadow-md hover:scale-105"
            aria-label={c.close}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
