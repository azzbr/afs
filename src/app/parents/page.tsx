'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import {
  Phone, Mail, Clock, Bus, Shirt, UtensilsCrossed, Users, BookOpen,
  ChevronDown, ArrowRight, ArrowLeft, Sparkles, GraduationCap,
  Calendar, MessageCircle, FileText, AlertCircle, CheckCircle, Globe,
} from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

const WA_URL = 'https://wa.me/97317612221?text=Hello%2C%20I%27m%20a%20parent%20at%20Al%20Fajer%20School%20and%20have%20a%20question.'

const content = {
  en: {
    hero: {
      tag: 'Parent Hub',
      title: 'Everything You Need',
      titleAccent: 'In One Place',
      subtitle: 'Resources, contacts, and information to help you stay connected with your child\'s school journey.',
    },
    quickActions: {
      tag: 'Quick Actions',
      title: 'What Can We Help With?',
      items: [
        { icon: GraduationCap, label: 'Enroll a Child',   desc: 'Apply for the 2025–2026 academic year',   href: '/admissions',  color: 'from-brand-blue to-blue-700',    bg: 'bg-brand-blue/8',  text: 'text-brand-blue' },
        { icon: MessageCircle, label: 'WhatsApp Us',      desc: 'Chat with the school office directly',     href: WA_URL,         color: 'from-[#25D366] to-[#1aad55]',   bg: 'bg-[#25D366]/10', text: 'text-[#25D366]', external: true },
        { icon: Phone,         label: 'Call the Office',  desc: '+973 1761 2221  ·  Sun–Thu 7AM–3:30PM',  href: 'tel:+97317612221', color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50',  text: 'text-emerald-700', external: true },
        { icon: Calendar,      label: 'View Calendar',    desc: 'Academic dates, holidays & events',        href: '/calendar',    color: 'from-violet-500 to-purple-600',  bg: 'bg-violet-50',   text: 'text-violet-700' },
      ],
    },
    essentials: {
      tag: 'Essential Info',
      title: 'Daily School Life',
      items: [
        { icon: Clock,          title: 'School Hours',    color: 'from-brand-blue to-blue-700',   detail: 'Students: 7:00 AM – 2:30 PM\nAdmin Office: 7:00 AM – 3:30 PM\nSunday – Thursday' },
        { icon: Bus,            title: 'School Bus',      color: 'from-amber-400 to-orange-500',  detail: 'Available for major Bahrain areas.\nContact the office for current routes,\ntimetables, and fees.' },
        { icon: Shirt,          title: 'Uniform',         color: 'from-violet-500 to-purple-600', detail: 'School uniform is required for all\nstudents. Available from the school\noffice at nominal cost.' },
        { icon: UtensilsCrossed,title: 'Canteen',         color: 'from-emerald-400 to-teal-600',  detail: 'On-campus canteen offers healthy\ndaily options. Lunch orders can be\nplaced at the start of each week.' },
      ],
    },
    contacts: {
      tag: 'Contacts',
      title: 'Who to Reach',
      items: [
        { role: 'School Office',       desc: 'General enquiries, absences, daily matters', phone: '+973 1761 2221', email: 'info@afs.edu.bh',       hours: 'Sun–Thu, 7:00 AM – 3:30 PM' },
        { role: 'Admissions',          desc: 'Enrollment, new applications, tours',        phone: '+973 1761 2221', email: 'info@afs.edu.bh',       hours: 'Sun–Thu, 7:30 AM – 3:00 PM' },
        { role: "Principal's Office",  desc: 'Academic concerns, formal matters',          phone: '+973 1761 2221', email: 'info@afs.edu.bh',       hours: 'By appointment' },
      ],
    },
    policies: {
      tag: 'School Policies',
      title: 'Good to Know',
      items: [
        { icon: CheckCircle, title: 'Attendance',   desc: 'Students are expected to maintain at least 95% attendance. Absences must be reported to the office before 8:00 AM on the day.' },
        { icon: Shirt,       title: 'Uniform',      desc: 'Full school uniform is compulsory every day. No modifications are permitted. Lost uniform items can be reported to the office.' },
        { icon: AlertCircle, title: 'Electronics',  desc: 'Mobile phones and personal electronics are not permitted during school hours. Devices will be held at the office until pickup.' },
        { icon: Users,       title: 'Behaviour',    desc: 'AFS upholds a respectful, inclusive environment. Bullying or disruptive behaviour is addressed through our school behaviour policy.' },
        { icon: Globe,       title: 'Communication',desc: 'All official communication is through WhatsApp parent groups and email. Ensure your contact details are always up to date.' },
        { icon: BookOpen,    title: 'Homework',     desc: 'Homework is assigned regularly across all grades. Parents are encouraged to support a consistent daily study routine at home.' },
      ],
    },
    faq: {
      tag: 'FAQ',
      title: 'Parent Questions',
      items: [
        { q: 'How do I report my child\'s absence?',           a: 'Call or WhatsApp the school office before 8:00 AM on the day of absence at +973 1761 2221. An absence note or doctor\'s certificate may be required for extended absences.' },
        { q: 'When are parent-teacher meetings held?',          a: 'Parent-teacher meetings are held twice per term. Exact dates are shared via the parent WhatsApp groups and the school calendar at least two weeks in advance.' },
        { q: 'How do I update my contact information?',        a: 'Email info@afs.edu.bh or visit the admin office in person. Keeping your contact details current ensures you receive all school communications.' },
        { q: 'Is there a parent portal or app?',               a: 'A dedicated parent portal is currently in development. In the meantime, all communication is managed via WhatsApp parent groups and direct contact with the office.' },
        { q: 'How do I join my child\'s class WhatsApp group?',a: "Contact your child's class teacher or the school office at the start of the academic year. You will be added to the relevant group once verified." },
        { q: 'What happens if my child is unwell at school?',  a: 'The school nurse will assess your child and contact you immediately if needed. Please ensure your emergency contact details are always current with the office.' },
      ],
    },
    links: {
      tag: 'Explore',
      title: 'Helpful Pages',
      items: [
        { label: 'Academic Programs',  href: '/academics',  icon: BookOpen   },
        { label: 'Admissions',         href: '/admissions', icon: FileText   },
        { label: 'School Calendar',    href: '/calendar',   icon: Calendar   },
        { label: 'School Fees',        href: '/fees',       icon: GraduationCap },
        { label: 'Photo Gallery',      href: '/gallery',    icon: Globe      },
        { label: 'News & Events',      href: '/news',       icon: Sparkles   },
      ],
    },
    cta: { title: 'Have a Question?', subtitle: "We're always happy to hear from AFS families.", wa: 'Chat on WhatsApp', email: 'Send an Email' },
  },
  ar: {
    hero: {
      tag: 'مركز الأهالي',
      title: 'كل ما تحتاجه',
      titleAccent: 'في مكان واحد',
      subtitle: 'موارد ومعلومات ومعلومات اتصال لمساعدتك على البقاء على تواصل مع رحلة طفلك الدراسية.',
    },
    quickActions: {
      tag: 'إجراءات سريعة',
      title: 'كيف يمكننا مساعدتك؟',
      items: [
        { icon: GraduationCap, label: 'تسجيل طفل',     desc: 'تقدم للعام الدراسي 2025–2026',             href: '/admissions',  color: 'from-brand-blue to-blue-700',  bg: 'bg-brand-blue/8', text: 'text-brand-blue' },
        { icon: MessageCircle, label: 'واتساب',          desc: 'تحدث مع مكتب المدرسة مباشرة',              href: WA_URL,         color: 'from-[#25D366] to-[#1aad55]', bg: 'bg-[#25D366]/10', text: 'text-[#25D366]', external: true },
        { icon: Phone,         label: 'اتصل بالمكتب',   desc: '+973 1761 2221  ·  الأحد–الخميس 7ص–3:30م', href: 'tel:+97317612221', color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50', text: 'text-emerald-700', external: true },
        { icon: Calendar,      label: 'التقويم المدرسي', desc: 'المواعيد والإجازات والفعاليات',              href: '/calendar',    color: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', text: 'text-violet-700' },
      ],
    },
    essentials: {
      tag: 'معلومات أساسية',
      title: 'الحياة اليومية في المدرسة',
      items: [
        { icon: Clock,          title: 'أوقات الدوام',  color: 'from-brand-blue to-blue-700',   detail: 'الطلاب: 7:00 ص – 2:30 م\nالمكتب الإداري: 7:00 ص – 3:30 م\nالأحد – الخميس' },
        { icon: Bus,            title: 'الحافلة المدرسية', color: 'from-amber-400 to-orange-500', detail: 'متاحة لمناطق رئيسية في البحرين.\nتواصل مع المكتب للاستفسار عن المسارات\nوالجداول الزمنية والرسوم.' },
        { icon: Shirt,          title: 'الزي المدرسي',  color: 'from-violet-500 to-purple-600', detail: 'الزي المدرسي إلزامي لجميع الطلاب.\nمتاح من مكتب المدرسة\nبتكلفة رمزية.' },
        { icon: UtensilsCrossed,title: 'الكافيتيريا',   color: 'from-emerald-400 to-teal-600',  detail: 'تقدم الكافيتيريا خيارات صحية يومية.\nيمكن طلب الغداء في بداية\nكل أسبوع.' },
      ],
    },
    contacts: {
      tag: 'جهات الاتصال',
      title: 'من تتواصل معه',
      items: [
        { role: 'مكتب المدرسة',   desc: 'الاستفسارات العامة والغيابات والشؤون اليومية', phone: '+973 1761 2221', email: 'info@afs.edu.bh', hours: 'الأحد–الخميس، 7:00 ص – 3:30 م' },
        { role: 'القبول والتسجيل', desc: 'التسجيل والطلبات الجديدة والجولات',             phone: '+973 1761 2221', email: 'info@afs.edu.bh', hours: 'الأحد–الخميس، 7:30 ص – 3:00 م' },
        { role: 'مكتب المديرة',    desc: 'الشؤون الأكاديمية والمسائل الرسمية',            phone: '+973 1761 2221', email: 'info@afs.edu.bh', hours: 'بموعد مسبق' },
      ],
    },
    policies: {
      tag: 'سياسات المدرسة',
      title: 'معلومات مهمة',
      items: [
        { icon: CheckCircle, title: 'الحضور',         desc: 'يُتوقع من الطلاب الحفاظ على حضور لا يقل عن 95٪. يجب الإبلاغ عن الغياب قبل 8:00 ص في يوم الغياب.' },
        { icon: Shirt,       title: 'الزي المدرسي',   desc: 'ارتداء الزي الرسمي إلزامي في جميع الأيام. لا يُسمح بأي تعديلات. يمكن الإبلاغ عن فقدان الزي للمكتب.' },
        { icon: AlertCircle, title: 'الأجهزة الإلكترونية', desc: 'لا يُسمح بالهواتف والأجهزة الشخصية خلال أوقات الدراسة. ستُحتجز الأجهزة في المكتب حتى موعد الانصراف.' },
        { icon: Users,       title: 'السلوك',         desc: 'تلتزم الفجر ببيئة محترمة وشاملة. يُعالج التنمر والسلوك المخل وفق سياسة السلوك المدرسية.' },
        { icon: Globe,       title: 'التواصل',        desc: 'يتم التواصل الرسمي عبر مجموعات واتساب وإيميلات الأهالي. احرص على تحديث بياناتك دائماً.' },
        { icon: BookOpen,    title: 'الواجبات المنزلية', desc: 'تُعطى الواجبات المنزلية بانتظام في جميع الصفوف. يُشجع الأهالي على دعم روتين مذاكرة يومي منتظم.' },
      ],
    },
    faq: {
      tag: 'أسئلة شائعة',
      title: 'أسئلة الأهالي',
      items: [
        { q: 'كيف أبلغ عن غياب طفلي؟',                     a: 'اتصل أو أرسل واتساب لمكتب المدرسة قبل 8:00 ص في يوم الغياب على +973 1761 2221. قد تُطلب مذكرة غياب أو شهادة طبية للغيابات الممتدة.' },
        { q: 'متى تُعقد اجتماعات أولياء الأمور والمعلمين؟', a: 'تُعقد مرتين في كل فصل دراسي. تُشارك المواعيد الدقيقة عبر مجموعات واتساب وتقويم المدرسة قبل أسبوعين على الأقل.' },
        { q: 'كيف أحدّث بيانات الاتصال الخاصة بي؟',         a: 'أرسل بريداً إلى info@afs.edu.bh أو قم بزيارة المكتب الإداري. الحفاظ على بياناتك محدّثة يضمن وصول جميع مراسلات المدرسة.' },
        { q: 'هل يوجد تطبيق أو بوابة للأهالي؟',             a: 'بوابة الأهالي المخصصة قيد التطوير حالياً. في الوقت الحالي يتم التواصل عبر مجموعات واتساب والتواصل المباشر مع المكتب.' },
        { q: 'كيف أنضم إلى مجموعة واتساب صف طفلي؟',        a: 'تواصل مع معلم الفصل أو مكتب المدرسة في بداية العام الدراسي وستُضاف إلى المجموعة المناسبة بعد التحقق.' },
        { q: 'ماذا يحدث إذا أُصيب طفلي بمرض في المدرسة؟',  a: 'ستتولى ممرضة المدرسة تقييم الحالة وستتواصل معك فوراً عند الحاجة. احرص دائماً على تحديث بيانات الطوارئ لدى المكتب.' },
      ],
    },
    links: {
      tag: 'استكشف',
      title: 'صفحات مفيدة',
      items: [
        { label: 'البرامج الأكاديمية',   href: '/academics',  icon: BookOpen   },
        { label: 'القبول والتسجيل',      href: '/admissions', icon: FileText   },
        { label: 'التقويم المدرسي',       href: '/calendar',   icon: Calendar   },
        { label: 'الرسوم الدراسية',      href: '/fees',       icon: GraduationCap },
        { label: 'معرض الصور',           href: '/gallery',    icon: Globe      },
        { label: 'الأخبار والفعاليات',   href: '/news',       icon: Sparkles   },
      ],
    },
    cta: { title: 'هل لديك سؤال؟', subtitle: 'يسعدنا دائماً التواصل مع أسر الفجر.', wa: 'تحدث معنا على واتساب', email: 'أرسل بريداً إلكترونياً' },
  },
}

export default function ParentsPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const isRTL = lang === 'ar'
  const c = content[lang]
  const Arr = isRTL ? ArrowLeft : ArrowRight
  useScrollReveal()

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen">
      <Header lang={lang} onLangChange={setLang} />
      <main>

        {/* ── Hero ── */}
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

        {/* ── Quick Actions ── */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag">{c.quickActions.tag}</span>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.quickActions.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {c.quickActions.items.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  data-reveal="scale"
                  data-delay={String(i * 100)}
                  className={clsx('group relative rounded-3xl p-6 border border-neutral-100 bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 overflow-hidden', isRTL && 'text-right')}
                >
                  <div className={clsx('w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm', item.color)}>
                    <item.icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold text-neutral-900 text-sm mb-1">{item.label}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">{item.desc}</p>
                  <div className={clsx('flex items-center gap-1.5 mt-3 font-semibold text-xs group-hover:gap-2.5 transition-all duration-200', item.text, isRTL && 'flex-row-reverse')}>
                    {isRTL ? 'انتقل' : 'Go'} <Arr size={11} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Daily Essentials ── */}
        <section className="section-padding bg-neutral-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-brand-blue/3 rounded-full blur-3xl pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag">{c.essentials.tag}</span>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.essentials.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {c.essentials.items.map((item, i) => (
                <div
                  key={item.title}
                  data-reveal
                  data-delay={String(i * 100)}
                  className={clsx('group relative rounded-3xl p-6 bg-white border border-neutral-100 hover:shadow-[0_20px_60px_rgba(0,0,0,0.09)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden cursor-default', isRTL && 'text-right')}
                >
                  <div className={clsx('w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm', item.color)}>
                    <item.icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold text-neutral-900 text-sm mb-2">{item.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed whitespace-pre-line">{item.detail}</p>
                  <div className={clsx('absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-400', item.color)} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contacts ── */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag">{c.contacts.tag}</span>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.contacts.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {c.contacts.items.map((item, i) => (
                <div
                  key={item.role}
                  data-reveal
                  data-delay={String(i * 120)}
                  className={clsx('group relative rounded-3xl p-7 bg-white border border-neutral-100 hover:shadow-[0_20px_60px_rgba(0,40,255,0.08)] hover:border-brand-blue/20 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden', isRTL && 'text-right')}
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <h3 className="font-bold text-neutral-900 text-sm mb-1">{item.role}</h3>
                  <p className="text-neutral-500 text-xs mb-4">{item.desc}</p>
                  <div className="space-y-2">
                    <a href={`tel:${item.phone.replace(/\s/g, '')}`} className={clsx('flex items-center gap-2 text-xs text-neutral-600 hover:text-brand-blue transition-colors', isRTL && 'flex-row-reverse')}>
                      <Phone size={12} className="text-brand-blue flex-shrink-0" /> {item.phone}
                    </a>
                    <a href={`mailto:${item.email}`} className={clsx('flex items-center gap-2 text-xs text-neutral-600 hover:text-brand-blue transition-colors', isRTL && 'flex-row-reverse')}>
                      <Mail size={12} className="text-brand-blue flex-shrink-0" /> {item.email}
                    </a>
                    <div className={clsx('flex items-center gap-2 text-xs text-neutral-400', isRTL && 'flex-row-reverse')}>
                      <Clock size={12} className="flex-shrink-0" /> {item.hours}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── School Policies ── */}
        <section className="section-padding bg-neutral-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-blue/3 rounded-full blur-3xl pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag">{c.policies.tag}</span>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.policies.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {c.policies.items.map((item, i) => (
                <div
                  key={item.title}
                  data-reveal
                  data-delay={String((i % 3) * 100)}
                  className={clsx('group relative rounded-2xl p-6 bg-white border border-neutral-100 hover:border-brand-blue/20 hover:shadow-[0_12px_40px_rgba(0,40,255,0.07)] transition-all duration-400 hover:-translate-y-1 overflow-hidden', isRTL && 'text-right')}
                >
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className={clsx('flex items-start gap-3', isRTL && 'flex-row-reverse')}>
                    <div className="w-9 h-9 rounded-xl bg-brand-blue/8 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue/15 transition-colors">
                      <item.icon size={15} className="text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 text-sm mb-1">{item.title}</h3>
                      <p className="text-neutral-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag">{c.faq.tag}</span>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.faq.title}</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {c.faq.items.map((item, i) => (
                <div
                  key={i}
                  data-reveal
                  data-delay={String(i * 70)}
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
                    <ChevronDown size={16} className={clsx('flex-shrink-0 text-neutral-400 transition-transform duration-300', openFaq === i ? 'rotate-180 text-brand-blue' : 'group-hover:text-brand-blue')} />
                  </button>
                  <div className={clsx('overflow-hidden transition-all duration-400', openFaq === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0')}>
                    <p className={clsx('px-6 pb-5 text-sm text-neutral-500 leading-relaxed border-t border-neutral-50 pt-3', isRTL && 'text-right')}>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Helpful Links ── */}
        <section className="section-padding bg-neutral-50 relative overflow-hidden">
          <div className="container-custom relative z-10">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag">{c.links.tag}</span>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.links.title}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {c.links.items.map((item, i) => (
                <Link
                  key={item.label}
                  href={item.href}
                  data-reveal="scale"
                  data-delay={String(i * 60)}
                  className={clsx('group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-neutral-100 hover:border-brand-blue/25 hover:shadow-[0_12px_40px_rgba(0,40,255,0.08)] hover:-translate-y-1.5 transition-all duration-400 text-center overflow-hidden relative', isRTL && 'text-center')}
                >
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/8 flex items-center justify-center group-hover:bg-brand-blue/15 group-hover:scale-110 transition-all duration-300">
                    <item.icon size={16} className="text-brand-blue" />
                  </div>
                  <span className="text-xs font-bold text-neutral-700 group-hover:text-brand-blue transition-colors leading-tight">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mesh-bg noise relative overflow-hidden py-24">
          <div className="absolute inset-0 pointer-events-none">
            <div className="animate-pulse-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-blue/18 blur-[100px] rounded-full" />
            <div className="absolute inset-0 dot-pattern opacity-18" />
          </div>
          <div className="container-custom relative z-10 text-center" data-reveal="scale">
            <h2 className={clsx('text-3xl md:text-4xl font-bold text-white mb-4', !isRTL && 'font-playfair')}>{c.cta.title}</h2>
            <p className="text-white/60 mb-10 max-w-md mx-auto">{c.cta.subtitle}</p>
            <div className={clsx('flex flex-wrap gap-4 justify-center', isRTL && 'flex-row-reverse')}>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-btn inline-flex items-center gap-2.5 px-8 py-4 bg-[#25D366] text-white font-bold rounded-2xl text-sm hover:shadow-[0_0_50px_rgba(37,211,102,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                <WhatsAppIcon size={16} /> {c.cta.wa}
              </a>
              <a
                href="mailto:info@afs.edu.bh"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/25 text-white font-semibold rounded-2xl text-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
              >
                <Mail size={15} /> {c.cta.email}
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
