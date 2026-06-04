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
        { icon: GraduationCap, label: 'Enroll a Child',   desc: 'Apply for the 2025–2026 academic year',   href: '/admissions',  text: 'text-[var(--brand-navy)]' },
        { icon: MessageCircle, label: 'WhatsApp Us',      desc: 'Chat with the school office directly',     href: WA_URL,         text: 'text-[#25D366]', external: true },
        { icon: Phone,         label: 'Call the Office',  desc: '+973 1761 2221  ·  Sun–Thu 7AM–3:30PM',  href: 'tel:+97317612221', text: 'text-[var(--brand-navy)]', external: true },
        { icon: Calendar,      label: 'View Calendar',    desc: 'Academic dates, holidays & events',        href: '/calendar',    text: 'text-[var(--brand-navy)]' },
      ],
    },
    essentials: {
      tag: 'Essential Info',
      title: 'Daily School Life',
      items: [
        { icon: Clock,          title: 'School Hours',       detail: 'Students: 7:00 AM – 2:30 PM\nAdmin Office: 7:00 AM – 3:30 PM\nSunday – Thursday' },
        { icon: Bus,            title: 'School Bus',         detail: 'Available for major Bahrain areas.\nContact the office for current routes,\ntimetables, and fees.' },
        { icon: Shirt,          title: 'Uniform',            detail: 'School uniform is required for all\nstudents. Available from the school\noffice at nominal cost.' },
        { icon: UtensilsCrossed,title: 'Canteen',            detail: 'On-campus canteen offers healthy\ndaily options. Lunch orders can be\nplaced at the start of each week.' },
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
        { icon: GraduationCap, label: 'تسجيل طفل',     desc: 'تقدم للعام الدراسي 2025–2026',             href: '/admissions',  text: 'text-[var(--brand-navy)]' },
        { icon: MessageCircle, label: 'واتساب',          desc: 'تحدث مع مكتب المدرسة مباشرة',              href: WA_URL,         text: 'text-[#25D366]', external: true },
        { icon: Phone,         label: 'اتصل بالمكتب',   desc: '+973 1761 2221  ·  الأحد–الخميس 7ص–3:30م', href: 'tel:+97317612221', text: 'text-[var(--brand-navy)]', external: true },
        { icon: Calendar,      label: 'التقويم المدرسي', desc: 'المواعيد والإجازات والفعاليات',              href: '/calendar',    text: 'text-[var(--brand-navy)]' },
      ],
    },
    essentials: {
      tag: 'معلومات أساسية',
      title: 'الحياة اليومية في المدرسة',
      items: [
        { icon: Clock,          title: 'أوقات الدوام',     detail: 'الطلاب: 7:00 ص – 2:30 م\nالمكتب الإداري: 7:00 ص – 3:30 م\nالأحد – الخميس' },
        { icon: Bus,            title: 'الحافلة المدرسية', detail: 'متاحة لمناطق رئيسية في البحرين.\nتواصل مع المكتب للاستفسار عن المسارات\nوالجداول الزمنية والرسوم.' },
        { icon: Shirt,          title: 'الزي المدرسي',     detail: 'الزي المدرسي إلزامي لجميع الطلاب.\nمتاح من مكتب المدرسة\nبتكلفة رمزية.' },
        { icon: UtensilsCrossed,title: 'الكافيتيريا',      detail: 'تقدم الكافيتيريا خيارات صحية يومية.\nيمكن طلب الغداء في بداية\nكل أسبوع.' },
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
        <section className="hero-dark relative overflow-hidden py-28 lg:py-36">
          <div className="container-custom relative z-10">
            <div className={clsx('max-w-2xl', isRTL && 'text-right')}>
              <div className={clsx('mb-5', isRTL && 'flex justify-end')}>
                <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>
                  {c.hero.tag}
                </div>
              </div>
              <h1 className={clsx('font-bold leading-tight mb-5', !isRTL && 'font-playfair')}>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white/92">{c.hero.title}</span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-[var(--brand-gold)]">{c.hero.titleAccent}</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed">{c.hero.subtitle}</p>
            </div>
          </div>
        </section>

        {/* ── Quick Actions ── */}
        <section className="section-padding bg-[var(--cream)]">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.quickActions.tag}</div>
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
                  className={clsx('group rounded-2xl p-6 border border-[var(--border)] bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300', isRTL && 'text-right')}
                >
                  <div className="w-11 h-11 rounded-lg bg-[var(--brand-navy)] flex items-center justify-center mb-4">
                    <item.icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold text-[var(--ink)] text-sm mb-1">{item.label}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">{item.desc}</p>
                  <div className={clsx('flex items-center gap-1.5 mt-3 font-semibold text-xs group-hover:gap-2.5 transition-all duration-200 text-[var(--brand-gold)]', isRTL && 'flex-row-reverse')}>
                    {isRTL ? 'انتقل' : 'Go'} <Arr size={11} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Daily Essentials ── */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.essentials.tag}</div>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.essentials.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {c.essentials.items.map((item, i) => (
                <div
                  key={item.title}
                  data-reveal
                  data-delay={String(i * 100)}
                  className={clsx('rounded-2xl p-6 border border-[var(--border)] bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 cursor-default', isRTL && 'text-right')}
                >
                  <div className="w-11 h-11 rounded-lg bg-[var(--brand-navy)] flex items-center justify-center mb-4">
                    <item.icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold text-[var(--ink)] text-sm mb-2">{item.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed whitespace-pre-line">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contacts ── */}
        <section className="section-padding bg-[var(--cream)]">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.contacts.tag}</div>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.contacts.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {c.contacts.items.map((item, i) => (
                <div
                  key={item.role}
                  data-reveal
                  data-delay={String(i * 120)}
                  className={clsx('rounded-2xl p-7 bg-white border border-[var(--border)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300', isRTL && 'text-right')}
                >
                  <div className="w-2 h-8 bg-[var(--brand-gold)] rounded-full mb-4" />
                  <h3 className="font-bold text-[var(--ink)] text-sm mb-1">{item.role}</h3>
                  <p className="text-neutral-500 text-xs mb-4">{item.desc}</p>
                  <div className="space-y-2">
                    <a href={`tel:${item.phone.replace(/\s/g, '')}`} className={clsx('flex items-center gap-2 text-xs text-neutral-600 hover:text-[var(--brand-navy)] transition-colors', isRTL && 'flex-row-reverse')}>
                      <Phone size={12} className="text-[var(--brand-gold)] flex-shrink-0" /> {item.phone}
                    </a>
                    <a href={`mailto:${item.email}`} className={clsx('flex items-center gap-2 text-xs text-neutral-600 hover:text-[var(--brand-navy)] transition-colors', isRTL && 'flex-row-reverse')}>
                      <Mail size={12} className="text-[var(--brand-gold)] flex-shrink-0" /> {item.email}
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
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.policies.tag}</div>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.policies.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {c.policies.items.map((item, i) => (
                <div
                  key={item.title}
                  data-reveal
                  data-delay={String((i % 3) * 100)}
                  className={clsx('rounded-2xl p-6 bg-white border border-[var(--border)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300', isRTL && 'text-right')}
                >
                  <div className={clsx('flex items-start gap-3', isRTL && 'flex-row-reverse')}>
                    <div className="w-9 h-9 rounded-lg bg-[var(--brand-navy)] flex items-center justify-center flex-shrink-0">
                      <item.icon size={15} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--ink)] text-sm mb-1">{item.title}</h3>
                      <p className="text-neutral-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section-padding bg-[var(--cream)]">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.faq.tag}</div>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.faq.title}</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {c.faq.items.map((item, i) => (
                <div
                  key={i}
                  data-reveal
                  data-delay={String(i * 70)}
                  className="rounded-2xl border border-[var(--border)] bg-white overflow-hidden"
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
                    <ChevronDown size={16} className={clsx('flex-shrink-0 text-neutral-400 transition-transform duration-300', openFaq === i && 'rotate-180 text-[var(--brand-gold)]')} />
                  </button>
                  <div className={clsx('overflow-hidden transition-all duration-400', openFaq === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0')}>
                    <p className={clsx('px-6 pb-5 text-sm text-neutral-500 leading-relaxed border-t border-[var(--border)] pt-3', isRTL && 'text-right')}>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Helpful Links ── */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.links.tag}</div>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.links.title}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {c.links.items.map((item, i) => (
                <Link
                  key={item.label}
                  href={item.href}
                  data-reveal="scale"
                  data-delay={String(i * 60)}
                  className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-[var(--border)] hover:border-[var(--brand-gold)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--brand-navy)] flex items-center justify-center group-hover:opacity-80 transition-opacity">
                    <item.icon size={16} className="text-white" />
                  </div>
                  <span className="text-xs font-bold text-[var(--ink)] group-hover:text-[var(--brand-navy)] transition-colors leading-tight">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="hero-dark relative overflow-hidden py-24">
          <div className="container-custom relative z-10 text-center" data-reveal="scale">
            <h2 className={clsx('text-3xl md:text-4xl font-bold text-white mb-4', !isRTL && 'font-playfair')}>{c.cta.title}</h2>
            <p className="text-white/60 mb-10 max-w-md mx-auto">{c.cta.subtitle}</p>
            <div className={clsx('flex flex-wrap gap-4 justify-center', isRTL && 'flex-row-reverse')}>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl text-sm hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5"
              >
                <WhatsAppIcon size={16} /> {c.cta.wa}
              </a>
              <a
                href="mailto:info@afs.edu.bh"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/25 text-white font-semibold rounded-xl text-sm hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
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
