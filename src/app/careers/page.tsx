'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import PageHero from '@/components/PageHero/PageHero'
import SectionHeading from '@/components/SectionHeading/SectionHeading'
import { MapPin, Clock, Briefcase, Mail, CheckCircle } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

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
    title: 'Careers at Al Fajer School',
    subtitle: "We are always looking for passionate educators and staff who want to make a real difference in children's lives.",
    apply: 'Apply Now',
    requirements: 'Requirements',
    noJobs: 'No open positions at this time.',
    noJobsSub: "Send your CV to careers@afs.edu.bh and we'll keep it on file.",
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
    closing: { title: "Don't see a fit?", body: "Send your CV and cover letter to our careers inbox and we'll reach out when a suitable role opens." },
  },
  ar: {
    badge: 'انضم إلى فريقنا',
    title: 'وظائف في مدرسة الفجر',
    subtitle: 'نبحث دائماً عن معلمين وموظفين متحمسين يريدون إحداث فرق حقيقي في حياة الأطفال.',
    apply: 'تقدم الآن',
    requirements: 'المتطلبات',
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
    closing: { title: 'لم تجد ما يناسبك؟', body: 'أرسل سيرتك الذاتية وخطاب التعريف إلى بريدنا الوظيفي وسنتواصل معك عند توفر فرصة مناسبة.' },
  },
}

export default function CareersPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(true)
  const isRTL = lang === 'ar'
  const t = content[lang]
  useScrollReveal()

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
    <div className="flex min-h-screen flex-col bg-canvas" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header lang={lang} onLangChange={setLang} />
      <main className="flex-1">
        <PageHero tag={t.badge} title={t.title} subtitle={t.subtitle} isRTL={isRTL} align="left" />

        {/* Perks */}
        <section className="section-padding bg-canvas">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-10">
              <SectionHeading title={t.perks.title} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {t.perks.items.map((item, i) => (
                <div key={i} data-reveal data-delay={String(i * 80)} className={clsx('card card-hover p-6', isRTL && 'text-right')}>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <CheckCircle size={18} />
                  </span>
                  <h3 className="mb-1 mt-3 text-sm font-semibold text-ink">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job listings */}
        <section className="section-padding dawn-soft">
          <div className="container-custom">
            {loading ? (
              <div className="py-16 text-center text-sm text-faint">{isRTL ? 'جاري التحميل…' : 'Loading positions…'}</div>
            ) : careers.length === 0 ? (
              <div className={clsx('mx-auto max-w-md card p-12 text-center', isRTL && 'text-right')}>
                <Briefcase size={40} className="mx-auto mb-4 text-brand-200" />
                <p className="mb-2 font-semibold text-ink">{t.noJobs}</p>
                <p className="text-sm text-muted">{t.noJobsSub}</p>
              </div>
            ) : (
              <div className="mx-auto max-w-3xl space-y-6">
                {careers.map(job => (
                  <div key={job.id} data-reveal className={clsx('card card-hover p-6', isRTL && 'text-right')}>
                    <div className={clsx('mb-3 flex flex-wrap items-start justify-between gap-3', isRTL && 'flex-row-reverse')}>
                      <div>
                        <h3 className="font-display text-lg font-bold text-ink">{lang === 'ar' ? job.titleAr : job.titleEn}</h3>
                        <p className="text-sm font-medium text-brand-600">{lang === 'ar' ? job.departmentAr : job.departmentEn}</p>
                      </div>
                      <a href={`mailto:careers@afs.edu.bh?subject=Application: ${job.titleEn}`} className="btn-primary shrink-0 px-5 py-2.5 text-sm">
                        <Mail size={14} />{t.apply}
                      </a>
                    </div>
                    <div className={clsx('mb-4 flex flex-wrap items-center gap-4 text-xs text-faint', isRTL && 'flex-row-reverse')}>
                      <span className="flex items-center gap-1"><Clock size={11} />{lang === 'ar' ? job.typeAr : job.typeEn}</span>
                      <span className="flex items-center gap-1"><MapPin size={11} />{t.location}</span>
                      <span>{t.posted}: {fmtDate(job.postedAt)}</span>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-muted">{lang === 'ar' ? job.descriptionAr : job.descriptionEn}</p>
                    {(lang === 'ar' ? job.requirementsAr : job.requirementsEn).filter(Boolean).length > 0 && (
                      <div>
                        <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-ink">{t.requirements}</h4>
                        <ul className="space-y-1.5">
                          {(lang === 'ar' ? job.requirementsAr : job.requirementsEn).filter(Boolean).map((req, i) => (
                            <li key={i} className={clsx('flex items-start gap-2 text-sm text-muted', isRTL && 'flex-row-reverse')}>
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-brand-700 py-16 text-white">
          <div className="container-custom text-center">
            <h2 className="mb-3 font-display text-2xl font-bold">{t.closing.title}</h2>
            <p className="mx-auto mb-6 max-w-md text-sm text-white/70">{t.closing.body}</p>
            <a href="mailto:careers@afs.edu.bh" className="btn-secondary px-7 py-3">
              <Mail size={16} /> careers@afs.edu.bh
            </a>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
