'use client'

import { useState, useEffect, useCallback } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { Sparkles, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
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
        <section className="mesh-bg noise relative overflow-hidden py-28 lg:py-36">
          <div className="absolute inset-0 pointer-events-none">
            <div className="animate-float-slow absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-brand-blue/20 blur-[110px]" />
            <div className="animate-pulse-glow absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-brand-gold/8 blur-[90px]" />
            <div className="absolute inset-0 dot-pattern opacity-25" />
          </div>
          <div className="container-custom relative z-10">
            <div className={clsx('max-w-2xl', isRTL && 'text-right')}>
              <div className={clsx('flex mb-5 animate-bounce-in', isRTL && 'justify-end')}>
                <span className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-2 text-white/65 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
                  <Sparkles size={11} className="text-brand-gold" />{c.hero.tag}
                </span>
              </div>
              <h1 className={clsx('font-bold leading-tight mb-5', !isRTL && 'font-playfair')}>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white/92 animate-slide-up" style={{ animationDelay: '100ms' }}>{c.hero.title}</span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-gradient-gold text-glow animate-slide-up" style={{ animationDelay: '250ms' }}>{c.hero.titleAccent}</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed animate-fade-in" style={{ animationDelay: '400ms' }}>{c.hero.subtitle}</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg viewBox="0 0 1440 70" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-full block">
              <path d="M0 70L1440 70L1440 25C1250 65 980 5 720 32C460 59 200 5 0 28L0 70Z" />
            </svg>
          </div>
        </section>

        {/* ── Filter + Grid ── */}
        <section className="section-padding bg-white">
          <div className="container-custom">

            {/* Filter tabs with item count badges */}
            <div className={clsx('flex flex-wrap gap-2 mb-12', isRTL ? 'justify-end' : 'justify-center')} data-reveal="fade">
              {cats.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => setActive(i)}
                  className={clsx(
                    'relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300',
                    active === i
                      ? 'bg-brand-blue text-white shadow-[0_4px_20px_rgba(0,40,255,0.35)] scale-105'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-800',
                  )}
                >
                  {cat}
                  <span className={clsx(
                    'text-xs font-bold px-1.5 py-0.5 rounded-full leading-none',
                    active === i ? 'bg-white/25 text-white' : 'bg-neutral-200 text-neutral-500',
                  )}>
                    {countFor(i)}
                  </span>
                </button>
              ))}
            </div>

            {/* Masonry-style grid */}
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {filtered.map((item, i) => (
                <div
                  key={item.id}
                  data-reveal="scale"
                  data-delay={String((i % 6) * 80)}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)] break-inside-avoid"
                  style={{ aspectRatio: item.size === 'large' ? '4/3' : '1/1' }}
                  onClick={() => openLightbox(i)}
                  role="button"
                  aria-label={lang === 'ar' ? item.titleAr : item.title}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
                >
                  <div className={clsx('absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110', item.color)} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl mb-3 drop-shadow-lg">{item.emoji}</span>
                    <span className="text-white/90 font-bold text-sm px-3 text-center">
                      {lang === 'ar' ? item.titleAr : item.title}
                    </span>
                  </div>

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-400" />

                  {/* Top row: category + zoom icon */}
                  <div className={clsx('absolute top-3 flex items-center justify-between w-full px-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0', isRTL && 'flex-row-reverse')}>
                    <span className="text-xs font-bold bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-3 py-1 text-white">
                      {lang === 'ar' ? item.categoryAr : item.category}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
                      <ZoomIn size={13} className="text-white" />
                    </div>
                  </div>

                  {/* Shimmer sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
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
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Panel — stop propagation so clicking inside doesn't close */}
          <div
            className="relative w-full max-w-2xl mx-4 rounded-3xl overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image area */}
            <div className={clsx('relative flex items-center justify-center bg-gradient-to-br', currentItem.color)}
              style={{ aspectRatio: '4/3' }}>
              <div className="animate-spin-slow absolute -top-16 -right-16 w-64 h-64 rounded-full border border-white/8 pointer-events-none" />
              <div className="animate-spin-slow absolute bottom-0 -left-10 w-40 h-40 rounded-full border border-white/8 pointer-events-none"
                style={{ animationDirection: 'reverse' }} />
              <span className="text-[8rem] drop-shadow-2xl select-none">{currentItem.emoji}</span>

              {/* Counter */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-1 text-white/80 text-xs font-semibold">
                {lightboxIdx + 1} {c.of} {filtered.length}
              </div>

              {/* Category badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <span className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 text-white text-xs font-bold">
                  {lang === 'ar' ? currentItem.categoryAr : currentItem.category}
                </span>
              </div>
            </div>

            {/* Caption bar */}
            <div className="bg-white px-6 py-4 flex items-center justify-between">
              <h3 className={clsx('font-bold text-neutral-900 text-base', !isRTL && 'font-playfair')}>
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
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm"
            aria-label={c.prev}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); isRTL ? goPrev() : goNext() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm"
            aria-label={c.next}
          >
            <ChevronRight size={20} />
          </button>

          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm"
            aria-label={c.close}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  )
}