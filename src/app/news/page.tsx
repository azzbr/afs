'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { ArrowRight, ArrowLeft, Sparkles, Calendar, Tag, Clock } from 'lucide-react'
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

const categoryColors: Record<string, string> = {
  Achievement: 'bg-brand-blue/8 text-brand-blue',
  Event:       'bg-amber-50 text-amber-600',
  Admissions:  'bg-emerald-50 text-emerald-600',
  Community:   'bg-cyan-50 text-cyan-600',
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
        <section className="mesh-bg noise relative overflow-hidden py-28 lg:py-36">
          <div className="absolute inset-0 pointer-events-none">
            <div className="animate-float-slow absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-blue/20 blur-[110px]" />
            <div className="animate-pulse-glow absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-brand-gold/8 blur-[90px]" />
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

        {/* ── Content ── */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-25 pointer-events-none" />
          <div className="container-custom relative z-10">

            {/* Featured Post */}
            <div data-reveal="scale" className="mb-14">
              <Link href={`/news/${featured.slug}`} className={clsx('group relative rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.14)] transition-all duration-500 block border border-neutral-100', isRTL && 'text-right')}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-blue" />
                <div className="grid grid-cols-1 md:grid-cols-5">
                  {/* Visual */}
                  <div className={clsx('relative md:col-span-2 min-h-[200px] md:min-h-[320px] flex items-center justify-center bg-gradient-to-br overflow-hidden', featured.color)}>
                    <div className="animate-spin-slow absolute -top-10 -right-10 w-40 h-40 rounded-full border border-white/10 pointer-events-none" />
                    <span className="text-7xl">{featured.emoji}</span>
                    <span className="absolute top-4 left-4 text-xs font-bold bg-white/15 border border-white/25 rounded-full px-3 py-1 text-white backdrop-blur-sm">{c.featured}</span>
                  </div>
                  {/* Content */}
                  <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center bg-white">
                    <div className={clsx('flex flex-wrap items-center gap-3 mb-4', isRTL && 'flex-row-reverse')}>
                      <span className={clsx('inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full', categoryColors[featured.category] || 'bg-neutral-100 text-neutral-600')}>
                        <Tag size={10} />{lang === 'ar' ? featured.categoryAr : featured.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <Calendar size={10} />{lang === 'ar' ? featured.dateAr : featured.date}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-neutral-400">
                        <Clock size={10} />{featured.readMin} {c.readMin}
                      </span>
                    </div>
                    <h2 className={clsx('text-2xl md:text-3xl font-bold text-neutral-900 mb-4 leading-snug', !isRTL && 'font-playfair')}>
                      {lang === 'ar' ? featured.titleAr : featured.title}
                    </h2>
                    <p className="text-neutral-500 leading-relaxed mb-6 text-sm">
                      {lang === 'ar' ? featured.excerptAr : featured.excerpt}
                    </p>
                    <span className={clsx('inline-flex items-center gap-2 text-brand-blue font-semibold text-sm group-hover:gap-3 transition-all duration-200', isRTL && 'flex-row-reverse')}>
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
                    'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300',
                    activeFilter === i
                      ? 'bg-brand-blue text-white shadow-[0_4px_16px_rgba(0,40,255,0.3)] scale-105'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200',
                  )}
                >
                  {f}
                  <span className={clsx(
                    'text-xs font-bold px-1.5 py-0.5 rounded-full leading-none',
                    activeFilter === i ? 'bg-white/25 text-white' : 'bg-neutral-200 text-neutral-500',
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
                    className={clsx('group relative rounded-3xl overflow-hidden border border-neutral-100 bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:border-neutral-200 hover:-translate-y-2 transition-all duration-500 block', isRTL && 'text-right')}
                  >
                    {/* Visual */}
                    <div className={clsx('relative h-44 flex items-center justify-center bg-gradient-to-br overflow-hidden', item.color)}>
                      <div className="animate-spin-slow absolute -top-8 -right-8 w-32 h-32 rounded-full border border-white/10 pointer-events-none" />
                      <span className="text-5xl">{item.emoji}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    </div>
                    {/* Content */}
                    <div className="p-6">
                      <div className={clsx('flex flex-wrap items-center gap-2.5 mb-3', isRTL && 'flex-row-reverse')}>
                        <span className={clsx('inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full', categoryColors[item.category] || 'bg-neutral-100 text-neutral-600')}>
                          <Tag size={9} />{lang === 'ar' ? item.categoryAr : item.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-neutral-400">
                          <Calendar size={9} />{lang === 'ar' ? item.dateAr : item.date}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-neutral-400">
                          <Clock size={9} />{item.readMin} {c.readMin}
                        </span>
                      </div>
                      <h3 className={clsx('font-bold text-neutral-900 text-base mb-2 leading-snug group-hover:text-brand-blue transition-colors duration-200', !isRTL && 'font-playfair')}>
                        {lang === 'ar' ? item.titleAr : item.title}
                      </h3>
                      <p className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-2">
                        {lang === 'ar' ? item.excerptAr : item.excerpt}
                      </p>
                      <span className={clsx('inline-flex items-center gap-1.5 text-brand-blue text-xs font-semibold group-hover:gap-2.5 transition-all duration-200', isRTL && 'flex-row-reverse')}>
                        {c.readMore} <Arr size={12} />
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
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