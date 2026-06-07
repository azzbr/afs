'use client'

import { useState, useEffect, useCallback } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import PageHero from '@/components/PageHero/PageHero'
import MediaPlaceholder from '@/components/MediaPlaceholder/MediaPlaceholder'
import { X, ChevronLeft, ChevronRight, ZoomIn, BookOpen, Star, Trophy, Palette, GraduationCap, FlaskConical, Globe, Drama, Library, Flag, Award, type LucideIcon } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

type Tone = 'soft' | 'blue' | 'navy' | 'accent'

const filters = {
  en: ['All', 'Classrooms', 'Events', 'Sports', 'Arts', 'Graduation'],
  ar: ['الكل', 'الفصول', 'الفعاليات', 'الرياضة', 'الفنون', 'التخرج'],
}

interface GalleryItem {
  id: number; category: string; categoryAr: string; title: string; titleAr: string
  icon: LucideIcon; tone: Tone; size: 'large' | 'normal'
}

const galleryItems: GalleryItem[] = [
  { id: 1, category: 'Classrooms', categoryAr: 'الفصول', title: 'Modern Classroom', titleAr: 'فصل دراسي حديث', icon: BookOpen, tone: 'blue', size: 'large' },
  { id: 2, category: 'Events', categoryAr: 'الفعاليات', title: 'Annual Day', titleAr: 'اليوم السنوي', icon: Star, tone: 'accent', size: 'normal' },
  { id: 3, category: 'Sports', categoryAr: 'الرياضة', title: 'Sports Day', titleAr: 'يوم الرياضة', icon: Trophy, tone: 'soft', size: 'normal' },
  { id: 4, category: 'Arts', categoryAr: 'الفنون', title: 'Art Exhibition', titleAr: 'معرض الفنون', icon: Palette, tone: 'accent', size: 'large' },
  { id: 5, category: 'Graduation', categoryAr: 'التخرج', title: 'Graduation Ceremony', titleAr: 'حفل التخرج', icon: GraduationCap, tone: 'blue', size: 'normal' },
  { id: 6, category: 'Classrooms', categoryAr: 'الفصول', title: 'Science Lab', titleAr: 'مختبر العلوم', icon: FlaskConical, tone: 'soft', size: 'normal' },
  { id: 7, category: 'Events', categoryAr: 'الفعاليات', title: 'Cultural Day', titleAr: 'يوم الثقافة', icon: Globe, tone: 'blue', size: 'large' },
  { id: 8, category: 'Sports', categoryAr: 'الرياضة', title: 'Basketball', titleAr: 'كرة السلة', icon: Trophy, tone: 'soft', size: 'normal' },
  { id: 9, category: 'Arts', categoryAr: 'الفنون', title: 'Drama Performance', titleAr: 'عرض درامي', icon: Drama, tone: 'accent', size: 'normal' },
  { id: 10, category: 'Classrooms', categoryAr: 'الفصول', title: 'Library Corner', titleAr: 'ركن المكتبة', icon: Library, tone: 'blue', size: 'normal' },
  { id: 11, category: 'Events', categoryAr: 'الفعاليات', title: 'National Day', titleAr: 'اليوم الوطني', icon: Flag, tone: 'soft', size: 'normal' },
  { id: 12, category: 'Graduation', categoryAr: 'التخرج', title: 'Awards Night', titleAr: 'ليلة التكريم', icon: Award, tone: 'accent', size: 'large' },
]

const t = {
  en: {
    hero: { tag: 'Gallery', title: 'Life at Al Fajer School', subtitle: 'A glimpse into the vibrant, enriching daily life of our school community.' },
    empty: 'No photos in this category yet.', prev: 'Previous', next: 'Next', close: 'Close', of: 'of',
  },
  ar: {
    hero: { tag: 'المعرض', title: 'الحياة في مدرسة الفجر', subtitle: 'لمحة من الحياة اليومية النابضة والمثرية لمجتمع مدرستنا.' },
    empty: 'لا توجد صور في هذه الفئة بعد.', prev: 'السابق', next: 'التالي', close: 'إغلاق', of: 'من',
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

  useEffect(() => {
    if (lightboxIdx === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') isRTL ? goNext() : goPrev()
      if (e.key === 'ArrowRight') isRTL ? goPrev() : goNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIdx, isRTL, goPrev, goNext, closeLightbox])

  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIdx])

  const currentItem = lightboxIdx !== null ? filtered[lightboxIdx] : null
  const countFor = (i: number) =>
    i === 0 ? galleryItems.length : galleryItems.filter((g) => (lang === 'ar' ? g.categoryAr : g.category) === cats[i]).length

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-canvas">
      <Header lang={lang} onLangChange={setLang} />
      <main>
        <PageHero tag={c.hero.tag} title={c.hero.title} subtitle={c.hero.subtitle} isRTL={isRTL} />

        <section className="section-padding bg-canvas">
          <div className="container-custom">

            {/* Filters */}
            <div data-reveal="fade" className={clsx('mb-12 flex flex-wrap gap-2', isRTL ? 'justify-end' : 'justify-center')}>
              {cats.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => setActive(i)}
                  className={clsx(
                    'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors',
                    active === i ? 'bg-brand-600 text-white' : 'bg-white border border-line text-muted hover:border-brand-300 hover:text-brand-600',
                  )}
                >
                  {cat}
                  <span className={clsx('rounded-full px-1.5 py-0.5 text-xs font-bold leading-none', active === i ? 'bg-white/25 text-white' : 'bg-soft text-faint')}>
                    {countFor(i)}
                  </span>
                </button>
              ))}
            </div>

            {/* Masonry grid */}
            <div className="columns-2 gap-4 space-y-4 md:columns-3">
              {filtered.map((item, i) => (
                <div
                  key={item.id}
                  data-reveal="scale"
                  data-delay={String((i % 6) * 70)}
                  className="group block break-inside-avoid cursor-pointer"
                  onClick={() => openLightbox(i)}
                  role="button"
                  aria-label={lang === 'ar' ? item.titleAr : item.title}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
                >
                  <MediaPlaceholder
                    aspect={item.size === 'large' ? '4/3' : '1/1'}
                    tone={item.tone}
                    icon={item.icon}
                    label={lang === 'ar' ? item.titleAr : item.title}
                    className="transition-shadow duration-300 group-hover:shadow-card-hover"
                  >
                    <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/15" />
                    <div className={clsx('absolute top-3 flex w-full items-center justify-between px-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100', isRTL && 'flex-row-reverse')}>
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-700 shadow-sm">
                        {lang === 'ar' ? item.categoryAr : item.category}
                      </span>
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-brand-700 shadow-sm">
                        <ZoomIn size={13} />
                      </span>
                    </div>
                  </MediaPlaceholder>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="py-20 text-center text-faint">{c.empty}</div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />

      {/* Lightbox */}
      {lightboxIdx !== null && currentItem && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-ink/90 p-4 animate-fade-in" onClick={closeLightbox}>
          <div className="relative mx-4 w-full max-w-2xl overflow-hidden rounded-2xl shadow-lift animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <MediaPlaceholder aspect="4/3" tone={currentItem.tone} icon={currentItem.icon} rounded="rounded-none">
              <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-ink/40 px-4 py-1 text-xs font-semibold text-white">
                {lightboxIdx + 1} {c.of} {filtered.length}
              </div>
            </MediaPlaceholder>
            <div className={clsx('flex items-center justify-between bg-white px-6 py-4', isRTL && 'flex-row-reverse')}>
              <h3 className="font-display text-base font-bold text-ink">{lang === 'ar' ? currentItem.titleAr : currentItem.title}</h3>
              <span className="text-xs font-medium text-faint">{lang === 'ar' ? currentItem.categoryAr : currentItem.category}</span>
            </div>
          </div>

          <button onClick={(e) => { e.stopPropagation(); isRTL ? goNext() : goPrev() }} className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20" aria-label={c.prev}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); isRTL ? goPrev() : goNext() }} className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20" aria-label={c.next}>
            <ChevronRight size={20} />
          </button>
          <button onClick={closeLightbox} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20" aria-label={c.close}>
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
