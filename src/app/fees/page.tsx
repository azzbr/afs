'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { Sparkles, CheckCircle, XCircle, ChevronDown, ChevronUp, Phone, Mail, ArrowRight, ArrowLeft, DollarSign, Shield, Clock, Users } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const t = {
  en: {
    hero: {
      tag: 'Fee Structure',
      title: 'Transparent &',
      titleAccent: 'Affordable',
      subtitle: 'We believe every family deserves clarity. Our fee structure is straightforward, competitive, and designed to make quality education accessible.',
      disclaimer: 'Fees listed are for the 2025–2026 academic year. Contact the admissions office for the most current fee schedule.',
    },
    included: {
      tag: 'What\'s Included',
      title: 'Your Tuition Covers',
      items: [
        { title: 'Full Curriculum Instruction', desc: 'American curriculum taught by qualified teachers across all subjects — English, Math, Science, and more.' },
        { title: 'STAR 360 Assessments', desc: 'Regular diagnostic assessments to track your child\'s academic growth and identify areas of support.' },
        { title: 'Arabic & Islamic Studies', desc: 'Ministry of Education required subjects delivered by specialist Arabic teachers.' },
        { title: 'French Language', desc: 'French language instruction introduced from KG level, building a strong multilingual foundation.' },
        { title: 'Extracurricular Activities', desc: 'Arts, sports, drama, and enrichment clubs included as part of the school day.' },
        { title: 'Learning Materials', desc: 'Core textbooks and digital learning resources provided for all core subjects.' },
      ],
    },
    separate: {
      tag: 'Additional Costs',
      title: 'Charged Separately',
      items: [
        { title: 'School Transportation', desc: 'Bus service available covering major Bahrain areas. Fees vary by distance and route.' },
        { title: 'School Uniform', desc: 'Full uniform sets available from the school at nominal cost. See the uniform list at registration.' },
        { title: 'Lunch / Canteen', desc: 'Students may bring packed lunches or purchase from the school canteen. Canteen pricing varies.' },
        { title: 'Optional Enrichment', desc: 'Select after-school programs and specialist workshops may carry an additional fee.' },
      ],
    },
    payment: {
      tag: 'Payment Terms',
      title: 'How Fees Are Paid',
      terms: [
        { icon: Clock, label: 'Per Term', desc: 'Fees are payable per academic term. The school year is divided into three terms.' },
        { icon: Shield, label: 'Due Before Term', desc: 'Tuition must be settled before the start of each term to confirm your child\'s place.' },
        { icon: Users, label: 'Sibling Discount', desc: 'Families enrolling more than one child benefit from a sibling discount. Ask the admissions team for details.' },
        { icon: DollarSign, label: 'Registration Fee', desc: 'A one-time registration fee applies for new students at the time of enrollment.' },
      ],
    },
    schedule: {
      tag: 'Fee Schedule',
      title: 'Request the Full Fee Schedule',
      subtitle: 'We share detailed, up-to-date fee information directly with families during the admissions process. Contact our admissions office to receive the full fee schedule for your child\'s grade level.',
      cta: 'Contact Admissions',
      cta2: 'Call Us Now',
    },
    faq: {
      tag: 'FAQ',
      title: 'Fees — Common Questions',
      items: [
        {
          q: 'Are fees the same for all grade levels?',
          a: 'Fees vary slightly by grade level. KG1–KG3 and Grades 1–5 have separate rate schedules. Contact the admissions office to receive a breakdown specific to your child\'s grade.',
        },
        {
          q: 'Is there a registration fee, and is it refundable?',
          a: 'Yes, a one-time registration fee is charged when a new student enrolls. This fee is non-refundable as it secures your child\'s place and covers administrative processing.',
        },
        {
          q: 'What happens if fees are not paid before the term starts?',
          a: 'To guarantee your child\'s continued enrollment, fees must be settled before the start of each term. Our admissions team is happy to discuss payment arrangements if needed.',
        },
        {
          q: 'Do you offer any discounts or financial assistance?',
          a: 'A sibling discount is available for families with more than one child enrolled. For other financial assistance inquiries, please speak directly with the school Principal or Admissions Manager.',
        },
      ],
    },
    cta: {
      title: 'Get the Full Fee Schedule',
      subtitle: 'Our admissions team will send you a complete, detailed fee breakdown for your child\'s grade level — no commitment required.',
      btn: 'Contact Admissions Office',
    },
  },
  ar: {
    hero: {
      tag: 'هيكل الرسوم',
      title: 'شفافية',
      titleAccent: 'وتكلفة معقولة',
      subtitle: 'نؤمن بأن كل أسرة تستحق الوضوح. هيكل رسومنا مباشر وتنافسي ومصمم لجعل التعليم الجيد في متناول الجميع.',
      disclaimer: 'الرسوم المذكورة للعام الدراسي 2025-2026. تواصل مع مكتب القبول للحصول على جدول الرسوم الأحدث.',
    },
    included: {
      tag: 'ما يشمله',
      title: 'ما تشمله الرسوم الدراسية',
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
      tag: 'تكاليف إضافية',
      title: 'تُحسب بشكل منفصل',
      items: [
        { title: 'النقل المدرسي', desc: 'خدمة الحافلات متاحة تغطي المناطق الرئيسية في البحرين. تتفاوت الرسوم حسب المسافة والمسار.' },
        { title: 'الزي المدرسي', desc: 'طقم الزي الكامل متاح من المدرسة بتكلفة رمزية. راجع قائمة الزي عند التسجيل.' },
        { title: 'الغداء / الكانتين', desc: 'يمكن للطلاب إحضار وجبات معبأة أو الشراء من كانتين المدرسة. تتفاوت أسعار الكانتين.' },
        { title: 'برامج الإثراء الاختيارية', desc: 'بعض البرامج بعد الدراسة وورش العمل المتخصصة قد تتطلب رسومًا إضافية.' },
      ],
    },
    payment: {
      tag: 'شروط الدفع',
      title: 'كيفية سداد الرسوم',
      terms: [
        { icon: Clock, label: 'بالفصل الدراسي', desc: 'الرسوم مستحقة الدفع لكل فصل دراسي. السنة الدراسية مقسمة إلى ثلاثة فصول.' },
        { icon: Shield, label: 'قبل بدء الفصل', desc: 'يجب سداد الرسوم قبل بدء كل فصل دراسي لتأكيد مقعد طفلك.' },
        { icon: Users, label: 'خصم الأشقاء', desc: 'تستفيد الأسر التي تسجّل أكثر من طفل من خصم الأشقاء. اسأل فريق القبول للتفاصيل.' },
        { icon: DollarSign, label: 'رسوم التسجيل', desc: 'رسوم تسجيل لمرة واحدة تُطبق على الطلاب الجدد عند التسجيل.' },
      ],
    },
    schedule: {
      tag: 'جدول الرسوم',
      title: 'اطلب جدول الرسوم الكامل',
      subtitle: 'نشارك معلومات الرسوم التفصيلية المحدّثة مباشرةً مع الأسر خلال عملية القبول. تواصل مع مكتب القبول للحصول على جدول الرسوم الكامل للمرحلة الدراسية لطفلك.',
      cta: 'تواصل مع القبول',
      cta2: 'اتصل بنا الآن',
    },
    faq: {
      tag: 'الأسئلة الشائعة',
      title: 'أسئلة شائعة حول الرسوم',
      items: [
        {
          q: 'هل الرسوم متساوية لجميع المراحل الدراسية؟',
          a: 'تتفاوت الرسوم قليلاً حسب المرحلة الدراسية. للمراحل KG1–KG3 والصف 1–5 جداول أسعار منفصلة. تواصل مع مكتب القبول للحصول على تفصيل خاص بمرحلة طفلك.',
        },
        {
          q: 'هل هناك رسوم تسجيل وهل هي قابلة للاسترداد؟',
          a: 'نعم، تُفرض رسوم تسجيل لمرة واحدة عند التحاق الطالب الجديد. هذه الرسوم غير قابلة للاسترداد إذ تضمن مقعد طفلك وتغطي الإجراءات الإدارية.',
        },
        {
          q: 'ماذا يحدث إذا لم تُسدَّد الرسوم قبل بدء الفصل؟',
          a: 'لضمان استمرار تسجيل طفلك، يجب سداد الرسوم قبل بدء كل فصل دراسي. فريق القبول لدينا يسعده مناقشة ترتيبات السداد إذا لزم الأمر.',
        },
        {
          q: 'هل تقدمون خصومات أو مساعدة مالية؟',
          a: 'يتوفر خصم الأشقاء للأسر التي لديها أكثر من طفل مسجل. للاستفسار عن المساعدة المالية، يُرجى التحدث مباشرةً مع مدير المدرسة أو مدير القبول.',
        },
      ],
    },
    cta: {
      title: 'احصل على جدول الرسوم الكامل',
      subtitle: 'سيرسل لك فريق القبول تفصيلاً كاملاً ودقيقاً للرسوم لمرحلة طفلك الدراسية — بدون أي التزام.',
      btn: 'تواصل مع مكتب القبول',
    },
  },
}

function FAQItem({ q, a, isRTL }: { q: string; a: string; isRTL: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={clsx('border border-neutral-200 rounded-2xl overflow-hidden transition-all duration-300', open && 'border-brand-blue/30 shadow-[0_4px_20px_rgba(0,40,255,0.06)]')}>
      <button
        onClick={() => setOpen(!open)}
        className={clsx('w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-neutral-50 transition-colors', isRTL && 'flex-row-reverse text-right')}
      >
        <span className="font-semibold text-neutral-800 text-sm">{q}</span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/8 flex items-center justify-center text-brand-blue">
          {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </span>
      </button>
      {open && (
        <div className={clsx('px-6 pb-5 text-sm text-neutral-600 leading-relaxed bg-white border-t border-neutral-100', isRTL && 'text-right')}>
          <p className="pt-4">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FeesPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const isRTL = lang === 'ar'
  const c = t[lang]
  useScrollReveal()

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

        {/* ── Disclaimer banner ── */}
        <section className="bg-amber-50 border-b border-amber-100">
          <div className="container-custom py-4">
            <p className={clsx('text-amber-800 text-xs font-medium flex items-center gap-2', isRTL && 'flex-row-reverse text-right')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {c.hero.disclaimer}
            </p>
          </div>
        </section>

        {/* ── What's Included ── */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag mx-auto">{c.included.tag}</span>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.included.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {c.included.items.map((item, i) => (
                <div
                  key={item.title}
                  data-reveal
                  data-delay={String(i * 80)}
                  className={clsx(
                    'group p-6 rounded-2xl bg-white border border-neutral-100 hover:border-emerald-200 hover:shadow-[0_12px_40px_rgba(16,185,129,0.08)] transition-all duration-400 hover:-translate-y-1',
                    isRTL && 'text-right',
                  )}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                    <CheckCircle size={18} className="text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-neutral-800 text-sm mb-2">{item.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Charged Separately ── */}
        <section className="section-padding bg-neutral-50 relative overflow-hidden">
          <div className="container-custom relative z-10">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag mx-auto">{c.separate.tag}</span>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.separate.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {c.separate.items.map((item, i) => (
                <div
                  key={item.title}
                  data-reveal
                  data-delay={String(i * 80)}
                  className={clsx(
                    'group p-6 rounded-2xl bg-white border border-neutral-200 hover:border-orange-200 hover:shadow-[0_8px_30px_rgba(249,115,22,0.07)] transition-all duration-300',
                    isRTL && 'text-right',
                  )}
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                    <XCircle size={18} className="text-orange-500" />
                  </div>
                  <h3 className="font-bold text-neutral-800 text-sm mb-2">{item.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Payment Terms ── */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag mx-auto">{c.payment.tag}</span>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.payment.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.payment.terms.map((term, i) => (
                <div
                  key={term.label}
                  data-reveal
                  data-delay={String(i * 80)}
                  className={clsx(
                    'group p-6 rounded-2xl bg-gradient-to-br from-brand-blue/5 to-indigo-50 border border-brand-blue/10 hover:border-brand-blue/25 hover:shadow-[0_12px_40px_rgba(0,40,255,0.08)] transition-all duration-400 hover:-translate-y-1',
                    isRTL && 'text-right',
                  )}
                >
                  <div className="w-11 h-11 rounded-2xl bg-brand-blue/10 flex items-center justify-center mb-4 group-hover:bg-brand-blue/15 transition-colors">
                    <term.icon size={18} className="text-brand-blue" />
                  </div>
                  <h3 className="font-bold text-neutral-800 text-sm mb-2">{term.label}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">{term.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Request Fee Schedule ── */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden border border-neutral-200 shadow-[0_8px_40px_rgba(0,0,0,0.06)]" data-reveal="scale">
              <div className="bg-gradient-to-br from-brand-blue to-indigo-700 p-10 text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white/70 text-xs font-semibold tracking-widest uppercase mb-6">
                  <Sparkles size={11} className="text-brand-gold" />{c.schedule.tag}
                </div>
                <h2 className={clsx('text-2xl md:text-3xl font-bold text-white mb-4', !isRTL && 'font-playfair')}>{c.schedule.title}</h2>
                <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-xl mx-auto">{c.schedule.subtitle}</p>
                <div className={clsx('flex flex-col sm:flex-row items-center justify-center gap-4', isRTL && 'sm:flex-row-reverse')}>
                  <Link
                    href="/contact"
                    className={clsx(
                      'inline-flex items-center gap-2 bg-white text-brand-blue font-bold text-sm px-7 py-3.5 rounded-xl hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 transition-all duration-300',
                    )}
                  >
                    {c.schedule.cta}
                    {isRTL ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
                  </Link>
                  <a
                    href="tel:+97317612221"
                    className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Phone size={14} />
                    {c.schedule.cta2}
                  </a>
                </div>
              </div>
              <div className={clsx('bg-white p-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-neutral-500', isRTL && 'sm:flex-row-reverse')}>
                <div className={clsx('flex items-center gap-2', isRTL && 'flex-row-reverse')}>
                  <Phone size={13} className="text-brand-blue" />
                  <span>+973 1761 2221</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-neutral-200" />
                <div className={clsx('flex items-center gap-2', isRTL && 'flex-row-reverse')}>
                  <Mail size={13} className="text-brand-blue" />
                  <span>info@afs.edu.bh</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-neutral-200" />
                <div className={clsx('flex items-center gap-2', isRTL && 'flex-row-reverse')}>
                  <Clock size={13} className="text-brand-blue" />
                  <span>{isRTL ? 'الأحد – الخميس، 7:30ص – 3:30م' : 'Sun–Thu, 7:30am–3:30pm'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag mx-auto">{c.faq.tag}</span>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.faq.title}</h2>
            </div>
            <div className="max-w-2xl mx-auto space-y-3">
              {c.faq.items.map((item, i) => (
                <div key={i} data-reveal data-delay={String(i * 80)}>
                  <FAQItem q={item.q} a={item.a} isRTL={isRTL} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-padding mesh-bg noise relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-brand-blue/15 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[200px] rounded-full bg-brand-gold/8 blur-[80px]" />
          </div>
          <div className="container-custom relative z-10">
            <div className={clsx('max-w-2xl mx-auto text-center', isRTL && 'text-right')} data-reveal="fade">
              <h2 className={clsx('text-3xl md:text-4xl font-bold text-white mb-4', !isRTL && 'font-playfair')}>{c.cta.title}</h2>
              <p className="text-white/60 text-base mb-8">{c.cta.subtitle}</p>
              <Link
                href="/contact"
                className={clsx(
                  'shimmer-btn ripple-btn inline-flex items-center gap-2 bg-brand-gold text-neutral-900 font-bold text-sm px-8 py-4 rounded-xl hover:shadow-[0_8px_30px_rgba(255,193,7,0.4)] hover:-translate-y-0.5 transition-all duration-300',
                )}
              >
                {c.cta.btn}
                {isRTL ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
