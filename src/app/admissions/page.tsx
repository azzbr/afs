'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { ArrowRight, ArrowLeft, CheckCircle, FileText, Calendar, Phone, Mail, Sparkles, Clock, ChevronDown } from 'lucide-react'
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

        {/* Steps — animated timeline */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-14', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag mx-auto">{c.steps.tag}</span>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.steps.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Connecting line */}
              <div className={clsx('hidden lg:block absolute top-10 h-px bg-gradient-to-r from-brand-blue/20 via-brand-blue/60 to-brand-blue/20', isRTL ? 'right-[10%] left-[10%]' : 'left-[10%] right-[10%]')} />
              {c.steps.items.map((step, i) => (
                <div
                  key={step.n}
                  data-reveal
                  data-delay={String(i * 120)}
                  className={clsx('group relative rounded-3xl p-6 bg-white border border-neutral-100 hover:shadow-[0_20px_60px_rgba(0,40,255,0.08)] hover:border-brand-blue/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden', isRTL && 'text-right')}
                >
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Step number */}
                  <div className={clsx('flex items-center gap-3 mb-4', isRTL && 'flex-row-reverse')}>
                    <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-blue to-blue-700 flex items-center justify-center shadow-brand group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <step.icon size={16} className="text-white" />
                      <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-2xl font-bold text-neutral-200 font-playfair">{step.n}</span>
                  </div>
                  <h3 className="font-bold text-neutral-900 text-sm mb-2">{step.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documents + Age grid */}
        <section className="section-padding bg-neutral-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/3 rounded-full blur-3xl pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Documents */}
              <div data-reveal="left">
                <span className="section-tag">{c.requirements.tag}</span>
                <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.requirements.title}</h2>
                <ul className="space-y-3 mt-6">
                  {c.requirements.items.map((item, i) => (
                    <li key={item} data-reveal data-delay={String(i * 80)} className={clsx('flex items-center gap-3 p-4 bg-white rounded-2xl border border-neutral-100 hover:border-brand-blue/20 hover:shadow-sm transition-all duration-300 group', isRTL && 'flex-row-reverse')}>
                      <div className="w-8 h-8 rounded-xl bg-brand-blue/8 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue/15 transition-colors">
                        <CheckCircle size={14} className="text-brand-blue" />
                      </div>
                      <span className="text-sm font-medium text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Ages */}
              <div data-reveal="right">
                <span className="section-tag">{c.grades.tag}</span>
                <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.grades.title}</h2>
                <div className="space-y-2 mt-6">
                  {c.grades.items.map((g, i) => (
                    <div key={g.grade} data-reveal data-delay={String(i * 60)} className={clsx('flex items-center justify-between p-3.5 bg-white rounded-2xl border border-neutral-100 hover:border-brand-blue/20 hover:shadow-sm transition-all duration-300 group', isRTL && 'flex-row-reverse')}>
                      <div className={clsx('flex items-center gap-3', isRTL && 'flex-row-reverse')}>
                        <span className="w-14 text-center text-xs font-bold text-brand-blue bg-brand-blue/8 rounded-xl py-1 px-2">{g.grade}</span>
                        <span className="text-sm text-neutral-700">{g.age}</span>
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
              <span className="section-tag mx-auto">{c.contact.tag}</span>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.contact.title}</h2>
              <p className="section-subtitle mx-auto text-center">{c.contact.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {c.contact.items.map((item, i) => (
                <div
                  key={item.label}
                  data-reveal
                  data-delay={String(i * 120)}
                  className={clsx('group relative rounded-3xl p-7 border border-neutral-100 bg-white hover:shadow-[0_20px_60px_rgba(0,40,255,0.09)] hover:border-brand-blue/20 transition-all duration-500 hover:-translate-y-1 overflow-hidden', isRTL && 'text-right')}
                >
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className={clsx('flex items-start gap-4', isRTL && 'flex-row-reverse')}>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue to-blue-700 flex items-center justify-center flex-shrink-0 shadow-brand group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="text-sm font-semibold text-neutral-800">{item.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ Accordion ── */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag mx-auto">{c.faq.tag}</span>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.faq.title}</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {c.faq.items.map((item, i) => (
                <div
                  key={i}
                  data-reveal
                  data-delay={String(i * 80)}
                  className="group rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:border-brand-blue/20 transition-colors duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={clsx(
                      'w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-sm transition-colors duration-200',
                      openFaq === i ? 'text-brand-blue' : 'text-neutral-800 hover:text-brand-blue',
                      isRTL && 'text-right flex-row-reverse',
                    )}
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={16}
                      className={clsx(
                        'flex-shrink-0 text-neutral-400 transition-transform duration-300',
                        openFaq === i ? 'rotate-180 text-brand-blue' : 'group-hover:text-brand-blue',
                      )}
                    />
                  </button>
                  <div
                    className={clsx(
                      'overflow-hidden transition-all duration-400 ease-in-out',
                      openFaq === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0',
                    )}
                  >
                    <p className={clsx('px-6 pb-5 text-sm text-neutral-500 leading-relaxed border-t border-neutral-50 pt-3', isRTL && 'text-right')}>
                      {item.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mesh-bg noise relative overflow-hidden py-28">
          <div className="absolute inset-0 pointer-events-none">
            <div className="animate-pulse-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-blue/18 blur-[100px] rounded-full" />
            <div className="absolute inset-0 dot-pattern opacity-18" />
          </div>
          <div className="container-custom relative z-10 text-center" data-reveal="scale">
            <span className="inline-flex items-center gap-2 bg-white/8 border border-white/14 rounded-full px-5 py-2 mb-7 text-white/55 text-xs font-bold tracking-widest uppercase">
              <Sparkles size={11} className="text-brand-gold animate-pulse" />
              2025–2026
            </span>
            <h2 className={clsx('text-3xl md:text-5xl font-bold text-white mb-4', !isRTL && 'font-playfair')}>{c.cta.title}</h2>
            <p className="text-white/55 mb-10 max-w-md mx-auto">{c.cta.subtitle}</p>
            <Link href="/contact" className="shimmer-btn ripple-btn inline-flex items-center gap-2 px-10 py-4 bg-brand-gold text-neutral-900 font-bold rounded-2xl text-sm hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-all duration-300 hover:-translate-y-1">
              {c.cta.btn} <Arr size={16} />
            </Link>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}