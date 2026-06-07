'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import PageHero from '@/components/PageHero/PageHero'
import SectionHeading from '@/components/SectionHeading/SectionHeading'
import { CheckCircle, Circle, ChevronDown, Phone, Mail, ArrowRight, ArrowLeft, Wallet, Shield, Clock, Users, Info } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const t = {
  en: {
    hero: { tag: 'Fee Structure', title: 'Transparent & Affordable', subtitle: 'We believe every family deserves clarity. Our fee structure is straightforward, competitive, and designed to make quality education accessible.', disclaimer: 'Fees listed are for the 2025–2026 academic year. Contact the admissions office for the most current fee schedule.' },
    included: {
      tag: "What's Included", title: 'Your Tuition Covers',
      items: [
        { title: 'Full Curriculum Instruction', desc: 'American curriculum taught by qualified teachers across all subjects — English, Math, Science, and more.' },
        { title: 'STAR 360 Assessments', desc: "Regular diagnostic assessments to track your child's academic growth and identify areas of support." },
        { title: 'Arabic & Islamic Studies', desc: 'Ministry of Education required subjects delivered by specialist Arabic teachers.' },
        { title: 'French Language', desc: 'French language instruction introduced from KG level, building a strong multilingual foundation.' },
        { title: 'Extracurricular Activities', desc: 'Arts, sports, drama, and enrichment clubs included as part of the school day.' },
        { title: 'Learning Materials', desc: 'Core textbooks and digital learning resources provided for all core subjects.' },
      ],
    },
    separate: {
      tag: 'Additional Costs', title: 'Charged Separately',
      items: [
        { title: 'School Transportation', desc: 'Bus service available covering major Bahrain areas. Fees vary by distance and route.' },
        { title: 'School Uniform', desc: 'Full uniform sets available from the school at nominal cost. See the uniform list at registration.' },
        { title: 'Lunch / Canteen', desc: 'Students may bring packed lunches or purchase from the school canteen. Canteen pricing varies.' },
        { title: 'Optional Enrichment', desc: 'Select after-school programs and specialist workshops may carry an additional fee.' },
      ],
    },
    payment: {
      tag: 'Payment Terms', title: 'How Fees Are Paid',
      terms: [
        { icon: Clock, label: 'Per Term', desc: 'Fees are payable per academic term. The school year is divided into three terms.' },
        { icon: Shield, label: 'Due Before Term', desc: "Tuition must be settled before the start of each term to confirm your child's place." },
        { icon: Users, label: 'Sibling Discount', desc: 'Families enrolling more than one child benefit from a sibling discount. Ask the admissions team for details.' },
        { icon: Wallet, label: 'Registration Fee', desc: 'A one-time registration fee applies for new students at the time of enrollment.' },
      ],
    },
    schedule: {
      tag: 'Fee Schedule', title: 'Request the Full Fee Schedule',
      subtitle: "We share detailed, up-to-date fee information directly with families during the admissions process. Contact our admissions office to receive the full fee schedule for your child's grade level.",
      cta: 'Contact Admissions', cta2: 'Call Us Now',
    },
    faq: {
      tag: 'FAQ', title: 'Fees — Common Questions',
      items: [
        { q: 'Are fees the same for all grade levels?', a: "Fees vary slightly by grade level. KG1–KG3 and Grades 1–5 have separate rate schedules. Contact the admissions office to receive a breakdown specific to your child's grade." },
        { q: 'Is there a registration fee, and is it refundable?', a: "Yes, a one-time registration fee is charged when a new student enrolls. This fee is non-refundable as it secures your child's place and covers administrative processing." },
        { q: 'What happens if fees are not paid before the term starts?', a: "To guarantee your child's continued enrollment, fees must be settled before the start of each term. Our admissions team is happy to discuss payment arrangements if needed." },
        { q: 'Do you offer any discounts or financial assistance?', a: 'A sibling discount is available for families with more than one child enrolled. For other financial assistance inquiries, please speak directly with the school Principal or Admissions Manager.' },
      ],
    },
    cta: { title: 'Get the Full Fee Schedule', subtitle: "Our admissions team will send you a complete, detailed fee breakdown for your child's grade level — no commitment required.", btn: 'Contact Admissions Office' },
  },
  ar: {
    hero: { tag: 'هيكل الرسوم', title: 'شفافية وتكلفة معقولة', subtitle: 'نؤمن بأن كل أسرة تستحق الوضوح. هيكل رسومنا مباشر وتنافسي ومصمم لجعل التعليم الجيد في متناول الجميع.', disclaimer: 'الرسوم المذكورة للعام الدراسي 2025-2026. تواصل مع مكتب القبول للحصول على جدول الرسوم الأحدث.' },
    included: {
      tag: 'ما يشمله', title: 'ما تشمله الرسوم الدراسية',
      items: [
        { title: 'التعليم الكامل للمنهج', desc: 'المنهج الأمريكي يدرّسه معلمون مؤهلون في جميع المواد — الإنجليزية والرياضيات والعلوم وغيرها.' },
        { title: 'تقييمات STAR 360', desc: 'تقييمات تشخيصية منتظمة لتتبع نمو طفلك الأكاديمي وتحديد مجالات الدعم.' },
        { title: 'اللغة العربية والدراسات الإسلامية', desc: 'المواد المطلوبة من وزارة التربية والتعليم يدرّسها معلمون عرب متخصصون.' },
        { title: 'اللغة الفرنسية', desc: 'تعليم اللغة الفرنسية يبدأ من مرحلة KG لبناء أساس متعدد اللغات.' },
        { title: 'الأنشطة اللاصفية', desc: 'الفنون والرياضة والمسرح ونوادي الإثراء مدرجة ضمن اليوم الدراسي.' },
        { title: 'المواد التعليمية', desc: 'الكتب المدرسية الأساسية وموارد التعلم الرقمية متوفرة لجميع المواد الأساسية.' },
      ],
    },
    separate: {
      tag: 'تكاليف إضافية', title: 'تُحسب بشكل منفصل',
      items: [
        { title: 'النقل المدرسي', desc: 'خدمة الحافلات متاحة تغطي المناطق الرئيسية في البحرين. تتفاوت الرسوم حسب المسافة والمسار.' },
        { title: 'الزي المدرسي', desc: 'طقم الزي الكامل متاح من المدرسة بتكلفة رمزية. راجع قائمة الزي عند التسجيل.' },
        { title: 'الغداء / الكانتين', desc: 'يمكن للطلاب إحضار وجبات معبأة أو الشراء من كانتين المدرسة. تتفاوت أسعار الكانتين.' },
        { title: 'برامج الإثراء الاختيارية', desc: 'بعض البرامج بعد الدراسة وورش العمل المتخصصة قد تتطلب رسومًا إضافية.' },
      ],
    },
    payment: {
      tag: 'شروط الدفع', title: 'كيفية سداد الرسوم',
      terms: [
        { icon: Clock, label: 'بالفصل الدراسي', desc: 'الرسوم مستحقة الدفع لكل فصل دراسي. السنة الدراسية مقسمة إلى ثلاثة فصول.' },
        { icon: Shield, label: 'قبل بدء الفصل', desc: 'يجب سداد الرسوم قبل بدء كل فصل دراسي لتأكيد مقعد طفلك.' },
        { icon: Users, label: 'خصم الأشقاء', desc: 'تستفيد الأسر التي تسجّل أكثر من طفل من خصم الأشقاء. اسأل فريق القبول للتفاصيل.' },
        { icon: Wallet, label: 'رسوم التسجيل', desc: 'رسوم تسجيل لمرة واحدة تُطبق على الطلاب الجدد عند التسجيل.' },
      ],
    },
    schedule: {
      tag: 'جدول الرسوم', title: 'اطلب جدول الرسوم الكامل',
      subtitle: 'نشارك معلومات الرسوم التفصيلية المحدّثة مباشرةً مع الأسر خلال عملية القبول. تواصل مع مكتب القبول للحصول على جدول الرسوم الكامل للمرحلة الدراسية لطفلك.',
      cta: 'تواصل مع القبول', cta2: 'اتصل بنا الآن',
    },
    faq: {
      tag: 'الأسئلة الشائعة', title: 'أسئلة شائعة حول الرسوم',
      items: [
        { q: 'هل الرسوم متساوية لجميع المراحل الدراسية؟', a: 'تتفاوت الرسوم قليلاً حسب المرحلة الدراسية. للمراحل KG1–KG3 والصف 1–5 جداول أسعار منفصلة. تواصل مع مكتب القبول للحصول على تفصيل خاص بمرحلة طفلك.' },
        { q: 'هل هناك رسوم تسجيل وهل هي قابلة للاسترداد؟', a: 'نعم، تُفرض رسوم تسجيل لمرة واحدة عند التحاق الطالب الجديد. هذه الرسوم غير قابلة للاسترداد إذ تضمن مقعد طفلك وتغطي الإجراءات الإدارية.' },
        { q: 'ماذا يحدث إذا لم تُسدَّد الرسوم قبل بدء الفصل؟', a: 'لضمان استمرار تسجيل طفلك، يجب سداد الرسوم قبل بدء كل فصل دراسي. فريق القبول لدينا يسعده مناقشة ترتيبات السداد إذا لزم الأمر.' },
        { q: 'هل تقدمون خصومات أو مساعدة مالية؟', a: 'يتوفر خصم الأشقاء للأسر التي لديها أكثر من طفل مسجل. للاستفسار عن المساعدة المالية، يُرجى التحدث مباشرةً مع مدير المدرسة أو مدير القبول.' },
      ],
    },
    cta: { title: 'احصل على جدول الرسوم الكامل', subtitle: 'سيرسل لك فريق القبول تفصيلاً كاملاً ودقيقاً للرسوم لمرحلة طفلك الدراسية — بدون أي التزام.', btn: 'تواصل مع مكتب القبول' },
  },
}

function FAQItem({ q, a, isRTL }: { q: string; a: string; isRTL: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <button
        onClick={() => setOpen(!open)}
        className={clsx('flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-semibold transition-colors', open ? 'text-brand-600' : 'text-ink hover:text-brand-600', isRTL && 'flex-row-reverse text-right')}
      >
        <span>{q}</span>
        <ChevronDown size={16} className={clsx('flex-shrink-0 text-faint transition-transform duration-300', open && 'rotate-180 text-brand-600')} />
      </button>
      <div className={clsx('grid transition-all duration-300', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
        <div className="overflow-hidden">
          <p className={clsx('border-t border-line px-6 py-4 text-sm leading-relaxed text-muted', isRTL && 'text-right')}>{a}</p>
        </div>
      </div>
    </div>
  )
}

interface FeeGrade { grade: string; gradeAr: string; annualFee: number; registrationFee: number }
interface FeesData { currency: string; siblingDiscount: string; paymentTerms: string; noteEn: string; noteAr: string; grades: FeeGrade[] }

export default function FeesPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [feesData, setFeesData] = useState<FeesData | null>(null)
  const isRTL = lang === 'ar'
  const c = t[lang]
  const Arr = isRTL ? ArrowLeft : ArrowRight
  useScrollReveal()

  useEffect(() => {
    fetch('/api/content/fees').then(r => r.json()).then(setFeesData).catch(() => {})
  }, [])

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-canvas">
      <Header lang={lang} onLangChange={setLang} />
      <main>
        <PageHero tag={c.hero.tag} title={c.hero.title} subtitle={c.hero.subtitle} isRTL={isRTL} align="left" />

        {/* Disclaimer */}
        <section className="border-b border-accent-200 bg-accent-100/60">
          <div className="container-custom py-4">
            <p className={clsx('flex items-center gap-2 text-xs font-medium text-accent-700', isRTL && 'flex-row-reverse text-right')}>
              <Info size={15} className="flex-shrink-0 text-accent-600" />
              {c.hero.disclaimer}
            </p>
          </div>
        </section>

        {/* Included */}
        <section className="section-padding bg-canvas">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-12">
              <SectionHeading tag={c.included.tag} title={c.included.title} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {c.included.items.map((item, i) => (
                <div key={item.title} data-reveal data-delay={String((i % 3) * 80)} className={clsx('card card-hover p-6', isRTL && 'text-right')}>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <CheckCircle size={18} />
                  </span>
                  <h3 className="mb-2 mt-3 text-sm font-semibold text-ink">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Separate */}
        <section className="section-padding dawn-soft">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-12">
              <SectionHeading tag={c.separate.tag} title={c.separate.title} isRTL={isRTL} />
            </div>
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
              {c.separate.items.map((item, i) => (
                <div key={item.title} data-reveal data-delay={String((i % 2) * 80)} className={clsx('card p-6', isRTL && 'text-right')}>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-100 text-accent-600">
                    <Circle size={18} />
                  </span>
                  <h3 className="mb-2 mt-3 text-sm font-semibold text-ink">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment terms */}
        <section className="section-padding bg-canvas">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-12">
              <SectionHeading tag={c.payment.tag} title={c.payment.title} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {c.payment.terms.map((term, i) => (
                <div key={term.label} data-reveal data-delay={String(i * 80)} className={clsx('card card-hover p-6', isRTL && 'text-right')}>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-white">
                    <term.icon size={18} />
                  </span>
                  <h3 className="mb-2 mt-3 text-sm font-semibold text-ink">{term.label}</h3>
                  <p className="text-xs leading-relaxed text-muted">{term.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Request schedule */}
        <section className="section-padding dawn-soft">
          <div className="container-custom">
            <div data-reveal="scale" className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-line shadow-card">
              <div className="bg-brand-700 p-10 text-center text-white">
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-accent-400">
                  {c.schedule.tag}
                </span>
                <h2 className="mb-4 font-display text-2xl font-bold md:text-3xl">{c.schedule.title}</h2>
                <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-white/70">{c.schedule.subtitle}</p>
                <div className={clsx('flex flex-col items-center justify-center gap-4 sm:flex-row', isRTL && 'sm:flex-row-reverse')}>
                  <Link href="/contact" className="btn-secondary px-7 py-3.5">
                    {c.schedule.cta} <Arr size={15} />
                  </Link>
                  <a href="tel:+97317612221" className="btn-ghost px-7 py-3.5">
                    <Phone size={14} />{c.schedule.cta2}
                  </a>
                </div>
              </div>
              <div className={clsx('flex flex-col items-center justify-center gap-6 bg-white p-6 text-xs text-muted sm:flex-row', isRTL && 'sm:flex-row-reverse')}>
                <span className={clsx('flex items-center gap-2', isRTL && 'flex-row-reverse')}><Phone size={13} className="text-brand-600" /><span dir="ltr">+973 1761 2221</span></span>
                <span className="hidden h-4 w-px bg-line sm:block" />
                <span className={clsx('flex items-center gap-2', isRTL && 'flex-row-reverse')}><Mail size={13} className="text-brand-600" />info@afs.edu.bh</span>
                <span className="hidden h-4 w-px bg-line sm:block" />
                <span className={clsx('flex items-center gap-2', isRTL && 'flex-row-reverse')}><Clock size={13} className="text-brand-600" />{isRTL ? 'الأحد – الخميس، 7:30ص – 3:30م' : 'Sun–Thu, 7:30am–3:30pm'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Live fee table */}
        {feesData && (
          <section className="section-padding bg-canvas">
            <div className="container-custom">
              <div data-reveal="fade" className="mb-10">
                <SectionHeading tag={isRTL ? 'جدول الرسوم' : 'Fee Schedule'} title={isRTL ? 'رسوم العام الدراسي 2025–2026' : '2025–2026 Academic Year Fees'} isRTL={isRTL} />
              </div>
              <div data-reveal="scale" className="overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-line bg-soft">
                      <th className={clsx('px-6 py-4 text-xs font-bold uppercase tracking-wider text-faint', isRTL ? 'text-right' : 'text-left')}>{isRTL ? 'الصف' : 'Grade'}</th>
                      <th className={clsx('px-6 py-4 text-xs font-bold uppercase tracking-wider text-faint', isRTL ? 'text-right' : 'text-left')}>{isRTL ? 'الرسوم السنوية' : 'Annual Tuition'}</th>
                      <th className={clsx('px-6 py-4 text-xs font-bold uppercase tracking-wider text-faint', isRTL ? 'text-right' : 'text-left')}>{isRTL ? 'رسوم التسجيل' : 'Registration Fee'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feesData.grades.map((g, i) => (
                      <tr key={g.grade} className={clsx('border-b border-line last:border-0', i % 2 === 1 && 'bg-soft/50')}>
                        <td className={clsx('px-6 py-4 text-sm font-semibold text-ink', isRTL && 'text-right')}>{isRTL ? g.gradeAr : g.grade}</td>
                        <td className={clsx('px-6 py-4', isRTL && 'text-right')}>
                          <span className="text-sm font-bold text-brand-600">{feesData.currency} {g.annualFee.toLocaleString()}</span>
                          <span className="ml-1 text-xs text-faint">{isRTL ? '/سنة' : '/year'}</span>
                        </td>
                        <td className={clsx('px-6 py-4 text-sm text-muted', isRTL && 'text-right')}>{feesData.currency} {g.registrationFee.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={clsx('mt-4 flex flex-wrap gap-x-8 gap-y-2 text-xs text-muted', isRTL ? 'justify-end' : 'justify-start')}>
                <span>{isRTL ? 'خصم الأشقاء:' : 'Sibling discount:'} <strong className="text-ink">{feesData.siblingDiscount}</strong></span>
                <span>{isRTL ? 'شروط الدفع:' : 'Payment terms:'} <strong className="text-ink">{feesData.paymentTerms}</strong></span>
              </div>
              {(isRTL ? feesData.noteAr : feesData.noteEn) && (
                <p className={clsx('mt-3 text-xs italic text-faint', isRTL && 'text-right')}>{isRTL ? feesData.noteAr : feesData.noteEn}</p>
              )}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="section-padding dawn-soft">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-12">
              <SectionHeading tag={c.faq.tag} title={c.faq.title} isRTL={isRTL} />
            </div>
            <div className="mx-auto max-w-2xl space-y-3">
              {c.faq.items.map((item, i) => (
                <div key={i} data-reveal data-delay={String(i * 50)}>
                  <FAQItem q={item.q} a={item.a} isRTL={isRTL} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="dawn-hero relative overflow-hidden py-20 text-white">
          <div className="absolute inset-0 grid-faint opacity-40 pointer-events-none" />
          <div data-reveal="fade" className="container-custom relative text-center">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">{c.cta.title}</h2>
            <p className="mx-auto mb-8 max-w-xl text-white/70">{c.cta.subtitle}</p>
            <Link href="/contact" className="btn-secondary px-8 py-4">
              {c.cta.btn} <Arr size={15} />
            </Link>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
