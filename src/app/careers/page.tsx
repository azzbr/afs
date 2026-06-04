'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { MapPin, Clock, Briefcase, Mail, CheckCircle } from 'lucide-react'
import { clsx } from 'clsx'

interface Career {
  id: string
  titleEn: string; titleAr: string
  departmentEn: string; departmentAr: string
  typeEn: string; typeAr: string
  descriptionEn: string; descriptionAr: string
  requirementsEn: string[]; requirementsAr: string[]
  active: boolean
  postedAt: string
}

const content = {
  en: {
    badge: 'Join Our Team',
    title: 'Careers at',
    titleAccent: 'Al Fajer School',
    subtitle: 'We are always looking for passionate educators and staff who want to make a real difference in children\'s lives.',
    apply: 'Apply Now',
    requirements: 'Requirements',
    type: 'Type',
    department: 'Department',
    noJobs: 'No open positions at this time.',
    noJobsSub: 'Send your CV to careers@afs.edu.bh and we\'ll keep it on file.',
    posted: 'Posted',
    location: 'Barbar, Bahrain',
    perks: {
      title: 'Why Join AFS?',
      items: [
        { title: 'Collaborative Culture', desc: 'Work alongside a dedicated, multinational team of educators.' },
        { title: 'Professional Growth', desc: 'Annual CPD budget, workshops, and access to international training.' },
        { title: 'Supportive Leadership', desc: 'Open-door policy, regular feedback, and mentoring for all staff.' },
        { title: 'Competitive Package', desc: 'Competitive salary, annual airfare allowance, and medical insurance.' },
      ],
    },
  },
  ar: {
    badge: 'انضم إلى فريقنا',
    title: 'وظائف في',
    titleAccent: 'مدرسة الفجر',
    subtitle: 'نبحث دائماً عن معلمين وموظفين متحمسين يريدون إحداث فرق حقيقي في حياة الأطفال.',
    apply: 'تقدم الآن',
    requirements: 'المتطلبات',
    type: 'النوع',
    department: 'القسم',
    noJobs: 'لا توجد وظائف شاغرة حالياً.',
    noJobsSub: 'أرسل سيرتك الذاتية إلى careers@afs.edu.bh وسنحتفظ بها في ملفاتنا.',
    posted: 'تاريخ النشر',
    location: 'بربر، البحرين',
    perks: {
      title: 'لماذا تنضم إلى الفجر؟',
      items: [
        { title: 'بيئة تعاونية', desc: 'اعمل مع فريق متعدد الجنسيات من المعلمين المتفانين.' },
        { title: 'نمو مهني', desc: 'ميزانية سنوية للتطوير المهني وورش العمل والتدريب الدولي.' },
        { title: 'قيادة داعمة', desc: 'سياسة الباب المفتوح وتغذية راجعة منتظمة وإرشاد لجميع الموظفين.' },
        { title: 'حزمة تنافسية', desc: 'راتب تنافسي وبدل تذاكر سنوية وتأمين طبي.' },
      ],
    },
  },
}

export default function CareersPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(true)
  const isRTL = lang === 'ar'
  const t = content[lang]

  useEffect(() => {
    fetch('/api/content/careers')
      .then(r => r.json())
      .then(data => { setCareers(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  function fmtDate(iso: string) {
    return new Date(iso).toLocaleDateString(lang === 'ar' ? 'ar-BH' : 'en-BH', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <div className={clsx('min-h-screen flex flex-col', isRTL && 'rtl')} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header lang={lang} onLangChange={setLang} />
      <main className="flex-1">

        {/* Hero */}
        <section className="hero-dark py-24">
          <div className="container-custom text-white">
            <div className={clsx('max-w-2xl', isRTL ? 'text-right mr-auto' : 'text-left')}>
              <div className={clsx('section-tag mb-6', isRTL && 'flex-row-reverse')}>
                {t.badge}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
                {t.title}{' '}
                <span style={{ color: 'var(--brand-gold)' }}>{t.titleAccent}</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">{t.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Perks */}
        <section className="py-16" style={{ background: 'var(--cream)' }}>
          <div className="container-custom">
            <h2 className={clsx('text-2xl font-bold font-playfair mb-8', isRTL ? 'text-right' : 'text-center')} style={{ color: 'var(--brand-navy)' }}>
              {t.perks.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {t.perks.items.map((item, i) => (
                <div
                  key={i}
                  className={clsx('border bg-white p-5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300', isRTL && 'text-right')}
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center mb-3"
                    style={{ background: 'var(--brand-navy)' }}
                  >
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--ink)' }}>{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--ink)', opacity: 0.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job listings */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            {loading ? (
              <div className="text-center py-20 text-sm" style={{ color: 'var(--ink)', opacity: 0.4 }}>
                Loading positions…
              </div>
            ) : careers.length === 0 ? (
              <div className={clsx('text-center py-20', isRTL && 'text-right')}>
                <Briefcase size={40} className="mx-auto mb-4" style={{ color: 'var(--border)' }} />
                <p className="font-medium mb-2" style={{ color: 'var(--ink)', opacity: 0.6 }}>{t.noJobs}</p>
                <p className="text-sm" style={{ color: 'var(--ink)', opacity: 0.4 }}>{t.noJobsSub}</p>
              </div>
            ) : (
              <div className="space-y-6 max-w-3xl mx-auto">
                {careers.map(job => (
                  <div
                    key={job.id}
                    className={clsx(
                      'border bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden',
                      isRTL ? 'text-right border-r-4' : 'border-l-4',
                    )}
                    style={{
                      borderColor: 'var(--border)',
                      ...(isRTL
                        ? { borderRightColor: 'var(--brand-gold)' }
                        : { borderLeftColor: 'var(--brand-gold)' }),
                    }}
                  >
                    <div className="p-6">
                      <div className={clsx('flex flex-wrap items-start justify-between gap-3 mb-3', isRTL && 'flex-row-reverse')}>
                        <div>
                          <h3 className="text-lg font-bold font-playfair" style={{ color: 'var(--ink)' }}>
                            {lang === 'ar' ? job.titleAr : job.titleEn}
                          </h3>
                          <p className="text-sm font-medium" style={{ color: 'var(--brand-gold)' }}>
                            {lang === 'ar' ? job.departmentAr : job.departmentEn}
                          </p>
                        </div>
                        <a
                          href={`mailto:careers@afs.edu.bh?subject=Application: ${job.titleEn}`}
                          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                          style={{ background: 'var(--brand-navy)', color: 'white' }}
                        >
                          <Mail size={14} />{t.apply}
                        </a>
                      </div>

                      <div className={clsx('flex flex-wrap items-center gap-4 text-xs mb-4', isRTL && 'flex-row-reverse')} style={{ color: 'var(--ink)', opacity: 0.5 }}>
                        <span className={clsx('flex items-center gap-1', isRTL && 'flex-row-reverse')}>
                          <Clock size={11} />{lang === 'ar' ? job.typeAr : job.typeEn}
                        </span>
                        <span className={clsx('flex items-center gap-1', isRTL && 'flex-row-reverse')}>
                          <MapPin size={11} />{t.location}
                        </span>
                        <span>{t.posted}: {fmtDate(job.postedAt)}</span>
                      </div>

                      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--ink)', opacity: 0.7 }}>
                        {lang === 'ar' ? job.descriptionAr : job.descriptionEn}
                      </p>

                      {(lang === 'ar' ? job.requirementsAr : job.requirementsEn).filter(Boolean).length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--ink)', opacity: 0.6 }}>
                            {t.requirements}
                          </h4>
                          <ul className="space-y-1.5">
                            {(lang === 'ar' ? job.requirementsAr : job.requirementsEn).filter(Boolean).map((req, i) => (
                              <li key={i} className={clsx('flex items-start gap-2 text-sm', isRTL && 'flex-row-reverse')} style={{ color: 'var(--ink)', opacity: 0.7 }}>
                                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: 'var(--brand-gold)' }} />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="hero-dark py-24">
          <div className="container-custom text-center text-white">
            <h2 className="text-2xl font-bold font-playfair mb-3">
              {lang === 'ar' ? 'لم تجد ما يناسبك؟' : "Don't see a fit?"}
            </h2>
            <p className="text-white/70 max-w-md mx-auto mb-6 text-sm">
              {lang === 'ar'
                ? 'أرسل سيرتك الذاتية وخطاب التعريف إلى بريدنا الوظيفي وسنتواصل معك عند توفر فرصة مناسبة.'
                : "Send your CV and cover letter to our careers inbox and we'll reach out when a suitable role opens."}
            </p>
            <a
              href="mailto:careers@afs.edu.bh"
              className="inline-flex items-center gap-2 px-7 py-3 font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'var(--brand-gold)', color: 'var(--cream)' }}
            >
              <Mail size={16} /> careers@afs.edu.bh
            </a>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
