'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import PageHero from '@/components/PageHero/PageHero'
import MediaPlaceholder from '@/components/MediaPlaceholder/MediaPlaceholder'
import { ArrowRight, ArrowLeft, Calendar, Tag, Clock, Award, GraduationCap, FileText, Users, type LucideIcon } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

type Tone = 'soft' | 'blue' | 'navy' | 'accent'

const catMeta: Record<string, { icon: LucideIcon; tone: Tone }> = {
  Achievement: { icon: Award, tone: 'blue' },
  Event: { icon: GraduationCap, tone: 'accent' },
  Admissions: { icon: FileText, tone: 'soft' },
  Community: { icon: Users, tone: 'blue' },
}

const newsItems = [
  { id: 1, slug: 'star-360-assessment-results', category: 'Achievement', categoryAr: 'إنجاز', title: 'AFS Students Excel in STAR 360 Assessment', titleAr: 'طلاب الفجر يتفوقون في تقييم STAR 360', excerpt: 'Our students demonstrated exceptional growth in reading and mathematics in the latest STAR 360 assessment cycle, surpassing national benchmarks.', excerptAr: 'أظهر طلابنا نمواً استثنائياً في القراءة والرياضيات في دورة تقييم STAR 360 الأخيرة، متجاوزين المعايير الوطنية.', date: 'March 2025', dateAr: 'مارس 2025', featured: true, readMin: 3 },
  { id: 2, slug: 'graduation-ceremony-2025', category: 'Event', categoryAr: 'فعالية', title: 'Annual Graduation Ceremony 2024–2025', titleAr: 'حفل التخرج السنوي 2024–2025', excerpt: 'We proudly celebrated our Grade 5 graduates at a heartwarming ceremony attended by families and staff.', excerptAr: 'احتفلنا بفخر بخريجي الصف الخامس في حفل دافئ حضره الأهالي وأعضاء هيئة التدريس.', date: 'June 2025', dateAr: 'يونيو 2025', featured: false, readMin: 2 },
  { id: 3, slug: 'enrollment-open-2025-2026', category: 'Admissions', categoryAr: 'القبول', title: 'Enrollment Now Open for 2025–2026', titleAr: 'التسجيل مفتوح للعام 2025–2026', excerpt: "Applications for the upcoming academic year are now being accepted. Secure your child's place before seats fill up.", excerptAr: 'يتم الآن قبول طلبات العام الدراسي القادم. أمّن مقعد طفلك قبل امتلاء الأماكن.', date: 'January 2025', dateAr: 'يناير 2025', featured: false, readMin: 2 },
  { id: 4, slug: 'cultural-day-2025', category: 'Event', categoryAr: 'فعالية', title: 'Cultural Day Celebrates Diversity', titleAr: 'يوم الثقافة يحتفل بالتنوع', excerpt: 'Students, parents, and teachers came together to celebrate the rich cultural tapestry of our school community.', excerptAr: 'اجتمع الطلاب والأهالي والمعلمون معاً للاحتفال بالنسيج الثقافي الغني لمجتمع مدرستنا.', date: 'February 2025', dateAr: 'فبراير 2025', featured: false, readMin: 3 },
  { id: 5, slug: 'french-program-expands', category: 'Achievement', categoryAr: 'إنجاز', title: 'French Language Program Expands to KG', titleAr: 'برنامج اللغة الفرنسية يمتد إلى الروضة', excerpt: 'AFS is proud to announce the expansion of our trilingual program, introducing French immersion from KG1.', excerptAr: 'يسعد الفجر بالإعلان عن توسيع برنامجنا ثلاثي اللغات بإدخال الفرنسية منذ KG1.', date: 'September 2024', dateAr: 'سبتمبر 2024', featured: false, readMin: 2 },
  { id: 6, slug: 'parent-teacher-day', category: 'Community', categoryAr: 'مجتمع', title: 'Parent-Teacher Collaboration Day', titleAr: 'يوم التعاون بين الأهالي والمعلمين', excerpt: 'A productive day of workshops and discussions helped strengthen the partnership between AFS families and teachers.', excerptAr: 'يومٌ مثمر من ورش العمل والنقاشات ساعد على تعزيز الشراكة بين أسر الفجر والمعلمين.', date: 'November 2024', dateAr: 'نوفمبر 2024', featured: false, readMin: 2 },
]

const categoryChip: Record<string, string> = {
  Achievement: 'bg-brand-50 text-brand-600',
  Event: 'bg-accent-100 text-accent-700',
  Admissions: 'bg-brand-50 text-brand-600',
  Community: 'bg-brand-50 text-brand-600',
}

const t = {
  en: {
    hero: { tag: 'News & Stories', title: 'Latest from Al Fajer School', subtitle: 'Stay updated with the latest news, events, and achievements from our school community.' },
    filters: ['All', 'Achievement', 'Event', 'Admissions', 'Community'],
    readMore: 'Read More', featured: 'Featured', readMin: 'min read', noResults: 'No posts in this category yet.',
  },
  ar: {
    hero: { tag: 'أخبار وقصص', title: 'آخر أخبار مدرسة الفجر', subtitle: 'ابق على اطلاع بأحدث الأخبار والفعاليات والإنجازات من مجتمع مدرستنا.' },
    filters: ['الكل', 'إنجاز', 'فعالية', 'القبول', 'مجتمع'],
    readMore: 'اقرأ المزيد', featured: 'مميز', readMin: 'د قراءة', noResults: 'لا توجد مقالات في هذه الفئة بعد.',
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
  const featMeta = catMeta[featured.category]

  const filtered = useMemo(() => {
    const all = newsItems.filter((n) => !n.featured)
    if (activeFilter === 0) return all
    return all.filter((n) => (isRTL ? n.categoryAr : n.category) === c.filters[activeFilter])
  }, [activeFilter, isRTL, c.filters])

  const countFor = (i: number) => {
    if (i === 0) return newsItems.filter((n) => !n.featured).length
    return newsItems.filter((n) => !n.featured && (isRTL ? n.categoryAr : n.category) === c.filters[i]).length
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-canvas">
      <Header lang={lang} onLangChange={setLang} />
      <main>
        <PageHero tag={c.hero.tag} title={c.hero.title} subtitle={c.hero.subtitle} isRTL={isRTL} align="left" />

        <section className="section-padding bg-canvas">
          <div className="container-custom">

            {/* Featured */}
            <div data-reveal="scale" className="mb-14">
              <Link href={`/news/${featured.slug}`} className="group block overflow-hidden card card-hover">
                <div className="grid grid-cols-1 md:grid-cols-5">
                  <div className="relative md:col-span-2">
                    <MediaPlaceholder aspect="4/3" tone={featMeta.tone} icon={featMeta.icon} rounded="rounded-none" className="h-full">
                      <span className="absolute left-4 top-4 rounded-full bg-brand-700 px-3 py-1 text-xs font-bold text-white">{c.featured}</span>
                    </MediaPlaceholder>
                  </div>
                  <div className={clsx('flex flex-col justify-center p-8 md:col-span-3 md:p-10', isRTL && 'text-right')}>
                    <div className={clsx('mb-4 flex flex-wrap items-center gap-3', isRTL && 'flex-row-reverse')}>
                      <span className={clsx('inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold', categoryChip[featured.category])}>
                        <Tag size={10} />{lang === 'ar' ? featured.categoryAr : featured.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-faint"><Calendar size={10} />{lang === 'ar' ? featured.dateAr : featured.date}</span>
                      <span className="flex items-center gap-1 text-xs text-faint"><Clock size={10} />{featured.readMin} {c.readMin}</span>
                    </div>
                    <h2 className="mb-4 font-display text-2xl font-bold leading-snug text-ink md:text-3xl">{lang === 'ar' ? featured.titleAr : featured.title}</h2>
                    <p className="mb-6 text-sm leading-relaxed text-muted">{lang === 'ar' ? featured.excerptAr : featured.excerpt}</p>
                    <span className={clsx('inline-flex items-center gap-2 text-sm font-semibold text-brand-600', isRTL && 'flex-row-reverse')}>
                      {c.readMore} <Arr size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Filters */}
            <div data-reveal="fade" className={clsx('mb-10 flex flex-wrap gap-2', isRTL ? 'justify-end' : 'justify-start')}>
              {c.filters.map((f, i) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(i)}
                  className={clsx(
                    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                    activeFilter === i ? 'bg-brand-600 text-white' : 'bg-white border border-line text-muted hover:border-brand-300 hover:text-brand-600',
                  )}
                >
                  {f}
                  <span className={clsx('rounded-full px-1.5 py-0.5 text-xs font-bold leading-none', activeFilter === i ? 'bg-white/25 text-white' : 'bg-soft text-faint')}>
                    {countFor(i)}
                  </span>
                </button>
              ))}
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="py-20 text-center text-faint">{c.noResults}</div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((item, i) => {
                  const meta = catMeta[item.category]
                  return (
                    <Link key={item.id} href={`/news/${item.slug}`} data-reveal data-delay={String((i % 3) * 100)} className={clsx('group block overflow-hidden card card-hover', isRTL && 'text-right')}>
                      <MediaPlaceholder aspect="16/9" tone={meta.tone} icon={meta.icon} rounded="rounded-none" />
                      <div className="p-6">
                        <div className={clsx('mb-3 flex flex-wrap items-center gap-2.5', isRTL && 'flex-row-reverse')}>
                          <span className={clsx('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold', categoryChip[item.category])}>
                            <Tag size={9} />{lang === 'ar' ? item.categoryAr : item.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-faint"><Calendar size={9} />{lang === 'ar' ? item.dateAr : item.date}</span>
                        </div>
                        <h3 className="mb-2 font-display text-base font-semibold leading-snug text-ink transition-colors group-hover:text-brand-600">{lang === 'ar' ? item.titleAr : item.title}</h3>
                        <p className="mb-4 text-sm leading-relaxed text-muted line-clamp-2">{lang === 'ar' ? item.excerptAr : item.excerpt}</p>
                        <span className={clsx('inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600', isRTL && 'flex-row-reverse')}>
                          {c.readMore} <Arr size={12} />
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
