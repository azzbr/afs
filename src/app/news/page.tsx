'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { ArrowRight, ArrowLeft, Calendar, Tag, Clock } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const newsItems = [
  {
    id: 1, slug: 'star-360-assessment-results',
    category: 'Achievement', categoryAr: 'إنجاز',
    title: 'AFS Students Excel in STAR 360 Assessment',
    titleAr: 'طلاب الفجر يتفوقون في تقييم STAR 360',
    excerpt: 'Our students demonstrated exceptional growth in reading and mathematics in the latest STAR 360 assessment cycle, surpassing national benchmarks.',
    excerptAr: 'أظهر طلابنا نمواً استثنائياً في القراءة والرياضيات في دورة تقييم STAR 360 الأخيرة، متجاوزين المعايير الوطنية.',
    date: 'March 2025', dateAr: 'مارس 2025',
    color: 'from-brand-blue to-blue-700', emoji: '⭐', featured: true, readMin: 3,
  },
  {
    id: 2, slug: 'graduation-ceremony-2025',
    category: 'Event', categoryAr: 'فعالية',
    title: 'Annual Graduation Ceremony 2024–2025',
    titleAr: 'حفل التخرج السنوي 2024–2025',
    excerpt: 'We proudly celebrated our Grade 5 graduates at a heartwarming ceremony attended by families and staff.',
    excerptAr: 'احتفلنا بفخر بخريجي الصف الخامس في حفل دافئ حضره الأهالي وأعضاء هيئة التدريس.',
    date: 'June 2025', dateAr: 'يونيو 2025',
    color: 'from-amber-400 to-orange-500', emoji: '🎓', featured: false, readMin: 2,
  },
  {
    id: 3, slug: 'enrollment-open-2025-2026',
    category: 'Admissions', categoryAr: 'القبول',
    title: 'Enrollment Now Open for 2025–2026',
    titleAr: 'التسجيل مفتوح للعام 2025–2026',
    excerpt: "Applications for the upcoming academic year are now being accepted. Secure your child's place before seats fill up.",
    excerptAr: 'يتم الآن قبول طلبات العام الدراسي القادم. أمّن مقعد طفلك قبل امتلاء الأماكن.',
    date: 'January 2025', dateAr: 'يناير 2025',
    color: 'from-emerald-400 to-teal-600', emoji: '📋', featured: false, readMin: 2,
  },
  {
    id: 4, slug: 'cultural-day-2025',
    category: 'Event', categoryAr: 'فعالية',
    title: 'Cultural Day Celebrates Diversity',
    titleAr: 'يوم الثقافة يحتفل بالتنوع',
    excerpt: 'Students, parents, and teachers came together to celebrate the rich cultural tapestry of our school community.',
    excerptAr: 'اجتمع الطلاب والأهالي والمعلمون معاً للاحتفال بالنسيج الثقافي الغني لمجتمع مدرستنا.',
    date: 'February 2025', dateAr: 'فبراير 2025',
    color: 'from-rose-400 to-pink-600', emoji: '🌍', featured: false, readMin: 3,
  },
  {
    id: 5, slug: 'french-program-expands',
    category: 'Achievement', categoryAr: 'إنجاز',
    title: 'French Language Program Expands to KG',
    titleAr: 'برنامج اللغة الفرنسية يمتد إلى الروضة',
    excerpt: 'AFS is proud to announce the expansion of our trilingual program, introducing French immersion from KG1.',
    excerptAr: 'يسعد الفجر بالإعلان عن توسيع برنامجنا ثلاثي اللغات بإدخال الفرنسية منذ KG1.',
    date: 'September 2024', dateAr: 'سبتمبر 2024',
    color: 'from-violet-400 to-purple-600', emoji: '🇫🇷', featured: false, readMin: 2,
  },
  {
    id: 6, slug: 'parent-teacher-day',
    category: 'Community', categoryAr: 'مجتمع',
    title: 'Parent-Teacher Collaboration Day',
    titleAr: 'يوم التعاون بين الأهالي والمعلمين',
    excerpt: 'A productive day of workshops and discussions helped strengthen the partnership between AFS families and teachers.',
    excerptAr: 'يومٌ مثمر من ورش العمل والنقاشات ساعد على تعزيز الشراكة بين أسر الفجر والمعلمين.',
    date: 'November 2024', dateAr: 'نوفمبر 2024',
    color: 'from-cyan-400 to-blue-500', emoji: '🤝', featured: false, readMin: 2,
  },
]

const categoryBadge: Record<string, string> = {
  Achievement: 'bg-[var(--cream)] text-[var(--brand-navy)] border border-[var(--border)]',
  Event:       'bg-[var(--cream)] text-[var(--brand-gold)] border border-[var(--border)]',
  Admissions:  'bg-[var(--cream)] text-[var(--brand-navy)] border border-[var(--border)]',
  Community:   'bg-[var(--cream)] text-[var(--brand-navy)] border border-[var(--border)]',
}

const t = {
  en: {
    hero: { tag: 'News & Stories', title: 'Latest from', titleAccent: 'Al Fajer School', subtitle: 'Stay updated with the latest news, events, and achievements from our school community.' },
    filters: ['All', 'Achievement', 'Event', 'Admissions', 'Community'],
    readMore: 'Read More',
    featured: 'Featured',
    readMin: 'min read',
    noResults: 'No posts in this category yet.',
  },
  ar: {
    hero: { tag: 'أخبار وقصص', title: 'آخر أخبار', titleAccent: 'مدرسة الفجر', subtitle: 'ابق على اطلاع بأحدث الأخبار والفعاليات والإنجازات من مجتمع مدرستنا.' },
    filters: ['الكل', 'إنجاز', 'فعالية', 'القبول', 'مجتمع'],
    readMore: 'اقرأ المزيد',
    featured: 'مميز',
    readMin: 'د قراءة',
    noResults: 'لا توجد مقالات في هذه الفئة بعد.',
  },
}

export default function NewsPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [activeFilter, setActiveFilter] = useState(0)
  const isRTL = lang === 'ar'
  const c = t[lang]
  const Arr = isRTL ? ArrowLeft : ArrowRight
  useScrollReveal()

  const featured = newsItems.find((n) => n.featured)!

  const filtered = useMemo(() => {
    const all = newsItems.filter((n) => !n.featured)
    if (activeFilter === 0) return all
    const filterCat = isRTL ? c.filters[activeFilter] : c.filters[activeFilter]
    return all.filter((n) => (isRTL ? n.categoryAr : n.category) === filterCat)
  }, [activeFilter, isRTL, c.filters])

  const countFor = (i: number) => {
    if (i === 0) return newsItems.filter((n) => !n.featured).length
    return newsItems.filter((n) => !n.featured && (isRTL ? n.categoryAr : n.category) === c.filters[i]).length
  }

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

        {/* ── Content ── */}
        <section className="section-padding bg-[var(--cream)]">
          <div className="container-custom">

            {/* Featured Post */}
            <div data-reveal="scale" className="mb-14">
              <Link
                href={`/news/${featured.slug}`}
                className={clsx(
                  'group overflow-hidden border border-[var(--border)] bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-300 block',
                  isRTL && 'text-right'
                )}
              >
                <div className="grid grid-cols-1 md:grid-cols-5">
                  {/* Visual placeholder */}
                  <div className={clsx(
                    'relative md:col-span-2 min-h-[200px] md:min-h-[280px] flex flex-col items-center justify-center bg-[var(--cream)] border-b md:border-b-0 overflow-hidden',
                    isRTL ? 'md:border-l border-[var(--border)]' : 'md:border-r border-[var(--border)]'
                  )}>
                    <span className="text-6xl mb-3">{featured.emoji}</span>
                    <span className="text-xs font-bold bg-[var(--brand-navy)] text-white rounded-full px-3 py-1">{c.featured}</span>
                  </div>
                  {/* Content */}
                  <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center bg-white">
                    <div className={clsx('flex flex-wrap items-center gap-3 mb-4', isRTL && 'flex-row-reverse')}>
                      <span className={clsx('inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full', categoryBadge[featured.category] || 'bg-[var(--cream)] text-[var(--ink)] border border-[var(--border)]')}>
                        <Tag size={10} />{lang === 'ar' ? featured.categoryAr : featured.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <Calendar size={10} />{lang === 'ar' ? featured.dateAr : featured.date}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-neutral-400">
                        <Clock size={10} />{featured.readMin} {c.readMin}
                      </span>
                    </div>
                    <h2 className={clsx('text-2xl md:text-3xl font-bold text-[var(--ink)] mb-4 leading-snug', !isRTL && 'font-playfair')}>
                      {lang === 'ar' ? featured.titleAr : featured.title}
                    </h2>
                    <p className="text-neutral-500 leading-relaxed mb-6 text-sm">
                      {lang === 'ar' ? featured.excerptAr : featured.excerpt}
                    </p>
                    <span className={clsx('inline-flex items-center gap-2 text-[var(--brand-gold)] font-semibold text-sm group-hover:gap-3 transition-all duration-200', isRTL && 'flex-row-reverse')}>
                      {c.readMore} <Arr size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Category filter tabs */}
            <div className={clsx('flex flex-wrap gap-2 mb-10', isRTL ? 'justify-end' : 'justify-start')} data-reveal="fade">
              {c.filters.map((f, i) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(i)}
                  className={clsx(
                    'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200',
                    activeFilter === i
                      ? 'bg-[var(--brand-navy)] text-white'
                      : 'bg-white border border-[var(--border)] text-neutral-600 hover:border-[var(--brand-gold)] hover:text-[var(--brand-navy)]',
                  )}
                >
                  {f}
                  <span className={clsx(
                    'text-xs font-bold px-1.5 py-0.5 rounded-full leading-none',
                    activeFilter === i ? 'bg-white/20 text-white' : 'bg-[var(--cream)] text-neutral-500',
                  )}>
                    {countFor(i)}
                  </span>
                </button>
              ))}
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-neutral-400">{c.noResults}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((item, i) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    data-reveal
                    data-delay={String((i % 3) * 120)}
                    className={clsx('group overflow-hidden border border-[var(--border)] bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 block', isRTL && 'text-right')}
                  >
                    {/* Visual placeholder */}
                    <div className="relative h-44 flex items-center justify-center bg-[var(--cream)] border-b border-[var(--border)]">
                      <span className="text-5xl">{item.emoji}</span>
                    </div>
                    {/* Content */}
                    <div className="p-6">
                      <div className={clsx('flex flex-wrap items-center gap-2.5 mb-3', isRTL && 'flex-row-reverse')}>
                        <span className={clsx('inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full', categoryBadge[item.category] || 'bg-[var(--cream)] text-[var(--ink)] border border-[var(--border)]')}>
                          <Tag size={9} />{lang === 'ar' ? item.categoryAr : item.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-neutral-400">
                          <Calendar size={9} />{lang === 'ar' ? item.dateAr : item.date}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-neutral-400">
                          <Clock size={9} />{item.readMin} {c.readMin}
                        </span>
                      </div>
                      <h3 className={clsx('font-bold text-[var(--ink)] text-base mb-2 leading-snug group-hover:text-[var(--brand-navy)] transition-colors duration-200', !isRTL && 'font-playfair')}>
                        {lang === 'ar' ? item.titleAr : item.title}
                      </h3>
                      <p className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-2">
                        {lang === 'ar' ? item.excerptAr : item.excerpt}
                      </p>
                      <span className={clsx('inline-flex items-center gap-1.5 text-[var(--brand-gold)] text-xs font-semibold group-hover:gap-2.5 transition-all duration-200', isRTL && 'flex-row-reverse')}>
                        {c.readMore} <Arr size={12} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
