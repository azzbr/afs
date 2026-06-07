'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import PageHero from '@/components/PageHero/PageHero'
import SectionHeading from '@/components/SectionHeading/SectionHeading'
import { ArrowRight, ArrowLeft, CheckCircle, FileText, Calendar, Phone, Mail, Clock, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const t = {
  en: {
    hero: { tag: 'Admissions', title: "Begin Your Child's Journey at AFS", subtitle: "We welcome applications for all grade levels from KG1 through Grade 5. Limited seats — apply early to secure your child's place." },
    steps: {
      tag: 'How to Apply', title: 'Simple 4-Step Process',
      items: [
        { n: '01', icon: FileText, title: 'Submit Application', desc: 'Complete the online form or visit us in person. Provide basic family and student information.' },
        { n: '02', icon: Calendar, title: 'Schedule Assessment', desc: 'We will contact you to arrange a brief age-appropriate assessment and school tour.' },
        { n: '03', icon: CheckCircle, title: 'Receive Decision', desc: 'You will receive our admissions decision within a few working days of the assessment.' },
        { n: '04', icon: Phone, title: 'Confirm Enrollment', desc: "Upon acceptance, complete enrollment paperwork and secure your child's place with a deposit." },
      ],
    },
    requirements: {
      tag: 'What You Need', title: 'Required Documents',
      items: ["Child's Birth Certificate", 'Passport Copy (child & parents)', 'Previous School Report Card', 'Vaccination Record', 'Recent Passport Photo', 'CPR / Residency Permit Copy'],
    },
    grades: {
      tag: 'Grade Entry Ages', title: 'Age Requirements by Grade',
      items: [
        { grade: 'KG1', age: '2 years 9 months+', note: 'by Sept 1' },
        { grade: 'KG2', age: '3 years 9 months+', note: 'by Sept 1' },
        { grade: 'KG3', age: '4 years 9 months+', note: 'by Sept 1' },
        { grade: 'Grade 1', age: '5 years 9 months+', note: 'by Sept 1' },
        { grade: 'Grade 2', age: '6 years 9 months+', note: 'by Sept 1' },
        { grade: 'Grade 3', age: '7 years 9 months+', note: 'by Sept 1' },
        { grade: 'Grade 4', age: '8 years 9 months+', note: 'by Sept 1' },
        { grade: 'Grade 5', age: '9 years 9 months+', note: 'by Sept 1' },
      ],
    },
    contact: {
      tag: 'Get in Touch', title: 'Ready to Apply?',
      subtitle: 'Contact our admissions team — we are happy to answer your questions.',
      items: [
        { icon: Phone, label: 'Call Us', value: '+973 1761 2221' },
        { icon: Mail, label: 'Email Us', value: 'info@afs.edu.bh' },
        { icon: Clock, label: 'Office Hours', value: 'Sun–Thu, 7:30am–3:30pm' },
      ],
    },
    faq: {
      tag: 'FAQ',
      title: 'Common Questions',
      items: [
        { q: 'When does the academic year start?', a: 'The academic year at AFS typically begins in September and ends in June, following the Bahrain MOE calendar.' },
        { q: 'Is there a waiting list?', a: 'Yes, when capacity is reached we maintain a waiting list. Applying early gives your child the best chance of securing a place.' },
        { q: 'Do you offer a school bus service?', a: 'Yes, AFS provides a school bus service covering major areas in Bahrain. Contact the school office for route details and fees.' },
        { q: 'What is the language of instruction?', a: 'AFS uses a bilingual model — English for the American curriculum subjects and Arabic for MOE subjects, with French introduced from KG.' },
        { q: 'Are there extracurricular activities?', a: 'Yes, AFS offers a variety of after-school clubs including arts, sports, drama, and language enrichment programs.' },
        { q: 'How do I schedule a campus visit?', a: 'Call or email our admissions office during school hours (Sun–Thu, 7:30am–3:30pm) to arrange a personal tour.' },
      ],
    },
    cta: { tag: '2025–2026', title: "Secure Your Child's Spot", subtitle: 'Applications for 2025–2026 are now open. Seats are limited.', btn: 'Apply Now' },
    docsLabel: 'Documents', agesLabel: 'Ages',
  },
  ar: {
    hero: { tag: 'القبول', title: 'ابدأ رحلة طفلك في مدرسة الفجر', subtitle: 'نرحب بالتقديم لجميع المراحل من KG1 حتى الصف الخامس. مقاعد محدودة — تقدم مبكراً.' },
    steps: {
      tag: 'كيفية التقديم', title: 'عملية من 4 خطوات بسيطة',
      items: [
        { n: '01', icon: FileText, title: 'تقديم الطلب', desc: 'أكمل النموذج الإلكتروني أو قم بزيارتنا شخصياً. قدم معلومات الأسرة والطالب الأساسية.' },
        { n: '02', icon: Calendar, title: 'جدولة التقييم', desc: 'سنتصل بك لترتيب تقييم مناسب للعمر وجولة في المدرسة.' },
        { n: '03', icon: CheckCircle, title: 'استلام القرار', desc: 'ستتلقى قرار القبول في غضون أيام عمل قليلة بعد التقييم.' },
        { n: '04', icon: Phone, title: 'تأكيد التسجيل', desc: 'عند القبول، أكمل أوراق التسجيل وأمّن مقعد طفلك بدفع وديعة.' },
      ],
    },
    requirements: {
      tag: 'ما تحتاجه', title: 'المستندات المطلوبة',
      items: ['شهادة ميلاد الطفل', 'نسخة جواز السفر (الطفل والوالدان)', 'كشف درجات المدرسة السابقة', 'سجل التطعيمات', 'صورة جواز سفر حديثة', 'نسخة CPR / تصريح الإقامة'],
    },
    grades: {
      tag: 'أعمار القبول', title: 'متطلبات العمر حسب الصف',
      items: [
        { grade: 'KG1', age: '+سنتان 9 أشهر', note: 'قبل 1 سبتمبر' },
        { grade: 'KG2', age: '+ثلاث سنوات 9 أشهر', note: 'قبل 1 سبتمبر' },
        { grade: 'KG3', age: '+أربع سنوات 9 أشهر', note: 'قبل 1 سبتمبر' },
        { grade: 'الصف 1', age: '+خمس سنوات 9 أشهر', note: 'قبل 1 سبتمبر' },
        { grade: 'الصف 2', age: '+ست سنوات 9 أشهر', note: 'قبل 1 سبتمبر' },
        { grade: 'الصف 3', age: '+سبع سنوات 9 أشهر', note: 'قبل 1 سبتمبر' },
        { grade: 'الصف 4', age: '+ثماني سنوات 9 أشهر', note: 'قبل 1 سبتمبر' },
        { grade: 'الصف 5', age: '+تسع سنوات 9 أشهر', note: 'قبل 1 سبتمبر' },
      ],
    },
    contact: {
      tag: 'تواصل معنا', title: 'هل أنت مستعد للتقديم؟',
      subtitle: 'تواصل مع فريق القبول — يسعدنا الإجابة على أسئلتك.',
      items: [
        { icon: Phone, label: 'اتصل بنا', value: '+973 1761 2221' },
        { icon: Mail, label: 'راسلنا', value: 'info@afs.edu.bh' },
        { icon: Clock, label: 'ساعات العمل', value: 'الأحد–الخميس، 7:30ص–3:30م' },
      ],
    },
    faq: {
      tag: 'أسئلة شائعة',
      title: 'أسئلة متكررة',
      items: [
        { q: 'متى يبدأ العام الدراسي؟', a: 'يبدأ العام الدراسي في الفجر عادةً في سبتمبر وينتهي في يونيو وفقاً لتقويم وزارة التربية البحرينية.' },
        { q: 'هل توجد قائمة انتظار؟', a: 'نعم، عند امتلاء الطاقة الاستيعابية نحتفظ بقائمة انتظار. التقديم المبكر يمنح طفلك أفضل فرصة لتأمين مقعد.' },
        { q: 'هل توفرون خدمة حافلة مدرسية؟', a: 'نعم، تقدم الفجر خدمة حافلة تغطي المناطق الرئيسية في البحرين. تواصل مع مكتب المدرسة للحصول على تفاصيل المسارات.' },
        { q: 'ما هي لغة التدريس؟', a: 'تعتمد الفجر نموذجاً ثنائي اللغة — الإنجليزية لمواد المنهج الأمريكي والعربية لمواد الوزارة، مع إدخال الفرنسية من الروضة.' },
        { q: 'هل توجد أنشطة لامنهجية؟', a: 'نعم، تقدم الفجر مجموعة متنوعة من النوادي بعد الدراسة منها الفنون والرياضة والمسرح وبرامج إثراء اللغات.' },
        { q: 'كيف أجدول زيارة للحرم المدرسي؟', a: 'اتصل أو راسل مكتب القبول خلال ساعات الدوام (الأحد–الخميس، 7:30ص–3:30م) لترتيب جولة شخصية.' },
      ],
    },
    cta: { tag: '2025–2026', title: 'احجز مقعد طفلك', subtitle: 'التقديم للعام 2025–2026 مفتوح الآن. المقاعد محدودة.', btn: 'تقدم الآن' },
    docsLabel: 'المستندات', agesLabel: 'الأعمار',
  },
}

export default function AdmissionsPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const isRTL = lang === 'ar'
  const c = t[lang]
  const Arr = isRTL ? ArrowLeft : ArrowRight
  useScrollReveal()

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-canvas">
      <Header lang={lang} onLangChange={setLang} />
      <main>
        <PageHero tag={c.hero.tag} title={c.hero.title} subtitle={c.hero.subtitle} isRTL={isRTL} align="left" />

        {/* Steps */}
        <section className="section-padding bg-canvas">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-14">
              <SectionHeading tag={c.steps.tag} title={c.steps.title} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {c.steps.items.map((step, i) => (
                <div key={step.n} data-reveal data-delay={String(i * 100)} className={clsx('card card-hover p-6', isRTL && 'text-right')}>
                  <div className={clsx('flex items-center gap-3', isRTL && 'flex-row-reverse')}>
                    <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
                      <step.icon size={18} />
                    </span>
                    <span className="font-display text-2xl font-bold text-brand-100">{step.n}</span>
                  </div>
                  <h3 className="mb-2 mt-4 text-sm font-semibold text-ink">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-muted">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documents + Ages */}
        <section className="section-padding dawn-soft">
          <div className="container-custom">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div data-reveal="left">
                <SectionHeading tag={c.requirements.tag} title={c.requirements.title} align="left" isRTL={isRTL} className="mb-6" />
                <ul className="space-y-3">
                  {c.requirements.items.map((item, i) => (
                    <li key={item} data-reveal data-delay={String(i * 60)} className={clsx('flex items-center gap-3 rounded-xl border border-line bg-white p-4', isRTL && 'flex-row-reverse')}>
                      <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                        <CheckCircle size={15} />
                      </span>
                      <span className="text-sm font-medium text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div data-reveal="right">
                <SectionHeading tag={c.grades.tag} title={c.grades.title} align="left" isRTL={isRTL} className="mb-6" />
                <div className="space-y-2">
                  {c.grades.items.map((g, i) => (
                    <div key={g.grade} data-reveal data-delay={String(i * 50)} className={clsx('flex items-center justify-between rounded-xl border border-line bg-white p-3.5', isRTL && 'flex-row-reverse')}>
                      <div className={clsx('flex items-center gap-3', isRTL && 'flex-row-reverse')}>
                        <span className="w-16 rounded-lg bg-brand-50 px-2 py-1 text-center text-xs font-bold text-brand-600">{g.grade}</span>
                        <span className="text-sm text-ink">{g.age}</span>
                      </div>
                      <span className="text-xs text-faint">{g.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact cards */}
        <section className="section-padding bg-canvas">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-10">
              <SectionHeading tag={c.contact.tag} title={c.contact.title} subtitle={c.contact.subtitle} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {c.contact.items.map((item, i) => (
                <div key={item.label} data-reveal data-delay={String(i * 100)} className={clsx('card card-hover flex items-start gap-4 p-7', isRTL && 'flex-row-reverse text-right')}>
                  <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
                    <item.icon size={18} />
                  </span>
                  <div>
                    <div className="mb-1 text-xs font-bold uppercase tracking-wider text-faint">{item.label}</div>
                    <div className="text-sm font-semibold text-ink" dir={item.icon === Phone ? 'ltr' : undefined}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section-padding dawn-soft">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-12">
              <SectionHeading tag={c.faq.tag} title={c.faq.title} isRTL={isRTL} />
            </div>
            <div className="mx-auto max-w-3xl space-y-3">
              {c.faq.items.map((item, i) => (
                <div key={i} data-reveal data-delay={String(i * 50)} className="overflow-hidden rounded-xl border border-line bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={clsx(
                      'flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-semibold transition-colors',
                      openFaq === i ? 'text-brand-600' : 'text-ink hover:text-brand-600',
                      isRTL && 'flex-row-reverse text-right',
                    )}
                  >
                    <span>{item.q}</span>
                    <ChevronDown size={16} className={clsx('flex-shrink-0 text-faint transition-transform duration-300', openFaq === i && 'rotate-180 text-brand-600')} />
                  </button>
                  <div className={clsx('grid transition-all duration-300', openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                    <div className="overflow-hidden">
                      <p className={clsx('border-t border-line px-6 py-4 text-sm leading-relaxed text-muted', isRTL && 'text-right')}>{item.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="dawn-hero relative overflow-hidden py-24 text-white">
          <div className="absolute inset-0 grid-faint opacity-40 pointer-events-none" />
          <div data-reveal="scale" className="container-custom relative text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-bold uppercase tracking-widest text-accent-400">
              {c.cta.tag}
            </span>
            <h2 className="mt-6 font-display text-3xl font-bold md:text-5xl">{c.cta.title}</h2>
            <p className="mx-auto mb-10 mt-4 max-w-md text-white/70">{c.cta.subtitle}</p>
            <Link href="/apply" className="btn-secondary px-10 py-4">
              {c.cta.btn} <Arr size={16} />
            </Link>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
