'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { ArrowRight, ArrowLeft, CheckCircle, FileText, Calendar, Phone, Mail, Clock, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const t = {
  en: {
    hero: { tag: 'Admissions', title: 'Begin Your Child\'s', titleAccent: 'Journey at AFS', subtitle: 'We welcome applications for all grade levels from KG1 through Grade 5. Limited seats — apply early to secure your child\'s place.' },
    steps: {
      tag: 'How to Apply', title: 'Simple 4-Step Process',
      items: [
        { n: '01', icon: FileText, title: 'Submit Application', desc: 'Complete the online form or visit us in person. Provide basic family and student information.' },
        { n: '02', icon: Calendar, title: 'Schedule Assessment', desc: 'We will contact you to arrange a brief age-appropriate assessment and school tour.' },
        { n: '03', icon: CheckCircle, title: 'Receive Decision', desc: "You will receive our admissions decision within a few working days of the assessment." },
        { n: '04', icon: Phone, title: 'Confirm Enrollment', desc: 'Upon acceptance, complete enrollment paperwork and secure your child\'s place with a deposit.' },
      ],
    },
    requirements: {
      tag: 'What You Need', title: 'Required Documents',
      items: ['Child\'s Birth Certificate', 'Passport Copy (child & parents)', 'Previous School Report Card', 'Vaccination Record', 'Recent Passport Photo', 'CPR / Residency Permit Copy'],
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
    cta: { title: 'Secure Your Child\'s Spot', subtitle: 'Applications for 2025–2026 are now open. Seats are limited.', btn: 'Apply Now' },
  },
  ar: {
    hero: { tag: 'القبول', title: 'ابدأ رحلة طفلك', titleAccent: 'في مدرسة الفجر', subtitle: 'نرحب بالتقديم لجميع المراحل من KG1 حتى الصف الخامس. مقاعد محدودة — تقدم مبكراً.' },
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
    cta: { title: 'احجز مقعد طفلك', subtitle: 'التقديم للعام 2025–2026 مفتوح الآن. المقاعد محدودة.', btn: 'تقدم الآن' },
  },
}

export default function AdmissionsPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const isRTL = lang === 'ar'
  const c = t[lang]
  const Arr = isRTL ? ArrowLeft : ArrowRight
  useScrollReveal()

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen">
      <Header lang={lang} onLangChange={setLang} />
      <main>

        {/* Hero */}
        <section className="hero-dark py-28 lg:py-36">
          <div className="container-custom">
            <div className={clsx('max-w-2xl', isRTL && 'text-right')}>
              <div className={clsx('flex mb-6', isRTL && 'justify-end')}>
                <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.hero.tag}</div>
              </div>
              <h1 className={clsx('font-bold leading-tight mb-5', !isRTL && 'font-playfair')}>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white">{c.hero.title}</span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-[var(--brand-gold-light)]">{c.hero.titleAccent}</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">{c.hero.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className={clsx('mb-14', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <div className={clsx('flex mb-4', isRTL ? 'justify-end' : 'justify-center')}>
                <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.steps.tag}</div>
              </div>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.steps.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.steps.items.map((step, i) => (
                <div
                  key={step.n}
                  data-reveal
                  data-delay={String(i * 120)}
                  className={clsx('border border-[var(--border)] bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 p-6', isRTL && 'text-right')}
                >
                  <div className={clsx('flex items-center gap-3 mb-5', isRTL && 'flex-row-reverse')}>
                    <div className="w-10 h-10 bg-[var(--brand-navy)] flex items-center justify-center flex-shrink-0">
                      <step.icon size={16} className="text-white" />
                    </div>
                    <span className="text-3xl font-bold text-[var(--border)] font-playfair">{step.n}</span>
                  </div>
                  <h3 className="font-bold text-[var(--ink)] text-sm mb-2">{step.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documents + Age grid */}
        <section className="section-padding section-cream">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Documents */}
              <div data-reveal="left">
                <div className={clsx('flex mb-4', isRTL && 'justify-end')}>
                  <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.requirements.tag}</div>
                </div>
                <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.requirements.title}</h2>
                <ul className="space-y-3 mt-6">
                  {c.requirements.items.map((item, i) => (
                    <li key={item} data-reveal data-delay={String(i * 80)} className={clsx('flex items-center gap-3 p-4 bg-white border border-[var(--border)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300', isRTL && 'flex-row-reverse')}>
                      <div className="w-8 h-8 bg-[var(--brand-navy)] flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={14} className="text-white" />
                      </div>
                      <span className="text-sm font-medium text-[var(--ink)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Ages */}
              <div data-reveal="right">
                <div className={clsx('flex mb-4', isRTL && 'justify-end')}>
                  <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.grades.tag}</div>
                </div>
                <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.grades.title}</h2>
                <div className="space-y-2 mt-6">
                  {c.grades.items.map((g, i) => (
                    <div key={g.grade} data-reveal data-delay={String(i * 60)} className={clsx('flex items-center justify-between p-3.5 bg-white border border-[var(--border)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300', isRTL && 'flex-row-reverse')}>
                      <div className={clsx('flex items-center gap-3', isRTL && 'flex-row-reverse')}>
                        <span className="w-14 text-center text-xs font-bold text-white bg-[var(--brand-navy)] py-1 px-2">{g.grade}</span>
                        <span className="text-sm text-[var(--ink)]">{g.age}</span>
                      </div>
                      <span className="text-xs text-neutral-400">{g.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact cards */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className={clsx('mb-10', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <div className={clsx('flex mb-4', isRTL ? 'justify-end' : 'justify-center')}>
                <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.contact.tag}</div>
              </div>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.contact.title}</h2>
              <p className="section-subtitle mx-auto text-center">{c.contact.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {c.contact.items.map((item, i) => (
                <div
                  key={item.label}
                  data-reveal
                  data-delay={String(i * 120)}
                  className={clsx('border border-[var(--border)] bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 p-7', isRTL && 'text-right')}
                >
                  <div className={clsx('flex items-start gap-4', isRTL && 'flex-row-reverse')}>
                    <div className="w-12 h-12 bg-[var(--brand-navy)] flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="text-sm font-semibold text-[var(--ink)]">{item.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section id="faq" className="section-padding section-cream">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <div className={clsx('flex mb-4', isRTL ? 'justify-end' : 'justify-center')}>
                <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.faq.tag}</div>
              </div>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.faq.title}</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {c.faq.items.map((item, i) => (
                <div
                  key={i}
                  data-reveal
                  data-delay={String(i * 80)}
                  className="border border-[var(--border)] bg-white overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={clsx(
                      'w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-sm transition-colors duration-200',
                      openFaq === i ? 'text-[var(--brand-navy)]' : 'text-[var(--ink)] hover:text-[var(--brand-navy)]',
                      isRTL && 'text-right flex-row-reverse',
                    )}
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={16}
                      className={clsx(
                        'flex-shrink-0 text-neutral-400 transition-transform duration-300',
                        openFaq === i ? 'rotate-180 text-[var(--brand-gold)]' : '',
                      )}
                    />
                  </button>
                  <div
                    className={clsx(
                      'overflow-hidden transition-all duration-300 ease-in-out',
                      openFaq === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0',
                    )}
                  >
                    <p className={clsx('px-6 pb-5 text-sm text-neutral-600 leading-relaxed border-t border-[var(--border)] pt-3', isRTL && 'text-right')}>
                      {item.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="hero-dark py-24">
          <div className="container-custom text-center" data-reveal="scale">
            <div className="inline-flex items-center gap-2 border border-white/20 px-5 py-2 mb-7 text-white/60 text-xs font-bold tracking-widest uppercase">
              2025–2026
            </div>
            <h2 className={clsx('text-3xl md:text-5xl font-bold text-white mb-4', !isRTL && 'font-playfair')}>{c.cta.title}</h2>
            <p className="text-white/60 mb-10 max-w-md mx-auto">{c.cta.subtitle}</p>
            <Link href="/apply" className="btn-primary inline-flex items-center gap-2">
              {c.cta.btn} <Arr size={16} />
            </Link>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
