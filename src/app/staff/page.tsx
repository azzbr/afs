'use client'

import { useState } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { Mail, Phone, Award, BookOpen, Globe, GraduationCap } from 'lucide-react'
import { clsx } from 'clsx'

const content = {
  en: {
    hero: {
      badge: 'Our People',
      title: 'Meet Our',
      titleHighlight: 'Dedicated Team',
      subtitle: 'Our educators bring passion, expertise, and care to every classroom — shaping curious minds and confident hearts.',
    },
    stats: [
      { value: '35+', label: 'Qualified Teachers' },
      { value: '12+', label: 'Years Avg. Experience' },
      { value: '8', label: 'Nationalities' },
      { value: '100%', label: 'Certified Educators' },
    ],
    leadership: {
      title: 'School Leadership',
      subtitle: 'Guiding our school with vision and care',
    },
    faculty: {
      title: 'Our Faculty',
      subtitle: 'Expert educators across every grade and subject',
    },
    departments: {
      title: 'Academic Departments',
      subtitle: 'Specialized teams delivering excellence',
    },
    join: {
      title: 'Join Our Team',
      subtitle: "We're always looking for passionate educators who want to make a difference.",
      cta: 'View Open Positions',
      email: 'careers@afs.edu.bh',
    },
    contact: 'Contact',
  },
  ar: {
    hero: {
      badge: 'فريقنا',
      title: 'تعرف على',
      titleHighlight: 'فريقنا المتميز',
      subtitle: 'يجلب معلمونا الشغف والخبرة والاهتمام إلى كل فصل دراسي — يشكّلون عقولاً فضولية وقلوباً واثقة.',
    },
    stats: [
      { value: '٣٥+', label: 'معلم مؤهل' },
      { value: '١٢+', label: 'سنة خبرة متوسطة' },
      { value: '٨', label: 'جنسيات' },
      { value: '١٠٠٪', label: 'مربون معتمدون' },
    ],
    leadership: {
      title: 'قيادة المدرسة',
      subtitle: 'توجيه مدرستنا برؤية واهتمام',
    },
    faculty: {
      title: 'هيئة التدريس',
      subtitle: 'معلمون متخصصون في جميع المراحل والمواد',
    },
    departments: {
      title: 'الأقسام الأكاديمية',
      subtitle: 'فرق متخصصة تقدم التميز',
    },
    join: {
      title: 'انضم إلى فريقنا',
      subtitle: 'نحن نبحث دائماً عن معلمين متحمسين يريدون إحداث فرق.',
      cta: 'عرض الوظائف المتاحة',
      email: 'careers@afs.edu.bh',
    },
    contact: 'تواصل',
  },
}

const leadership = [
  {
    name: { en: 'Ms. Fatima Al-Mannai', ar: 'الأستاذة فاطمة المناعي' },
    role: { en: 'School Principal', ar: 'مديرة المدرسة' },
    bio: {
      en: 'With over 20 years in education, Ms. Al-Mannai leads Al Fajer with a deep commitment to bilingual excellence, student well-being, and community partnership. She holds an M.Ed. from the University of Bahrain.',
      ar: 'بخبرة تمتد لأكثر من 20 عامًا في التعليم، تقود الأستاذة المناعي الفجر بالتزام عميق بالتميز ثنائي اللغة ورفاهية الطلاب وشراكة المجتمع. تحمل درجة الماجستير من جامعة البحرين.',
    },
    quals: ['M.Ed. University of Bahrain', 'Cambridge Leadership Certificate', 'MOE Certified Principal'],
    email: 'principal@afs.edu.bh',
    color: 'from-brand-blue to-brand-blue-dark',
    initials: 'FM',
  },
  {
    name: { en: 'Mr. Khalid Al-Rashid', ar: 'الأستاذ خالد الراشد' },
    role: { en: 'Vice Principal – Academics', ar: 'نائب المدير – الشؤون الأكاديمية' },
    bio: {
      en: 'Mr. Al-Rashid oversees curriculum development, teacher professional development, and academic assessment across all grade levels. He is a certified STAR 360 coordinator.',
      ar: 'يشرف الأستاذ الراشد على تطوير المناهج والتطوير المهني للمعلمين والتقييم الأكاديمي في جميع المراحل الدراسية. وهو منسق معتمد لـ STAR 360.',
    },
    quals: ['B.Ed. American University of Beirut', 'STAR 360 Coordinator', 'IB Trained'],
    email: 'vp.academics@afs.edu.bh',
    color: 'from-emerald-600 to-emerald-800',
    initials: 'KR',
  },
  {
    name: { en: 'Ms. Sara Hussain', ar: 'الأستاذة سارة حسين' },
    role: { en: 'Head of Student Affairs', ar: 'رئيسة شؤون الطلاب' },
    bio: {
      en: "Ms. Hussain champions student well-being, behavior support, and extracurricular activities. She coordinates the school's counseling program and parent communication.",
      ar: 'تدعم الأستاذة حسين رفاهية الطلاب والدعم السلوكي والأنشطة اللاصفية. تنسق برنامج الإرشاد المدرسي والتواصل مع أولياء الأمور.',
    },
    quals: ['B.Sc. Psychology, UOB', 'School Counselor Certificate', 'Child Safeguarding Trained'],
    email: 'student.affairs@afs.edu.bh',
    color: 'from-violet-600 to-violet-800',
    initials: 'SH',
  },
]

const faculty = [
  { name: { en: 'Ms. Aisha Noor', ar: 'أعيشة نور' }, role: { en: 'KG1 & KG2 Lead Teacher', ar: 'معلمة أولى — KG1 و KG2' }, subject: { en: 'Early Childhood', ar: 'الطفولة المبكرة' }, exp: '9 yrs', lang: 'EN / AR' },
  { name: { en: 'Mr. James Doyle', ar: 'جيمس دويل' }, role: { en: 'Grade 1–2 English Teacher', ar: 'معلم إنجليزي — الصف ١–٢' }, subject: { en: 'English Language Arts', ar: 'اللغة الإنجليزية' }, exp: '11 yrs', lang: 'EN' },
  { name: { en: 'Ms. Mona Al-Zayani', ar: 'منى الزياني' }, role: { en: 'Arabic & Islamic Studies', ar: 'اللغة العربية والتربية الإسلامية' }, subject: { en: 'Arabic / Islamic', ar: 'عربي / إسلامية' }, exp: '14 yrs', lang: 'AR' },
  { name: { en: 'Mr. Yusuf Karimi', ar: 'يوسف كريمي' }, role: { en: 'Mathematics Lead — Gr. 3–5', ar: 'معلم الرياضيات — الصف ٣–٥' }, subject: { en: 'Mathematics', ar: 'الرياضيات' }, exp: '8 yrs', lang: 'EN / AR' },
  { name: { en: 'Ms. Priya Sharma', ar: 'بريا شارما' }, role: { en: 'Science Teacher — Gr. 1–5', ar: 'معلمة العلوم — الصف ١–٥' }, subject: { en: 'Science', ar: 'العلوم' }, exp: '7 yrs', lang: 'EN' },
  { name: { en: 'Mr. Hassan Al-Qassim', ar: 'حسن القاسم' }, role: { en: 'Social Studies & Civics', ar: 'الدراسات الاجتماعية' }, subject: { en: 'Social Studies', ar: 'اجتماعيات' }, exp: '10 yrs', lang: 'AR / EN' },
  { name: { en: 'Ms. Lena Fischer', ar: 'لينا فيشر' }, role: { en: 'Art & Design Teacher', ar: 'معلمة الفنون والتصميم' }, subject: { en: 'Visual Arts', ar: 'الفنون البصرية' }, exp: '6 yrs', lang: 'EN' },
  { name: { en: 'Mr. Ahmed Al-Balooshi', ar: 'أحمد البلوشي' }, role: { en: 'Physical Education', ar: 'التربية البدنية' }, subject: { en: 'P.E. & Sports', ar: 'التربية البدنية والرياضة' }, exp: '12 yrs', lang: 'AR / EN' },
  { name: { en: 'Ms. Nadia Karim', ar: 'نادية كريم' }, role: { en: 'Music & Performing Arts', ar: 'الموسيقى والفنون الأدائية' }, subject: { en: 'Music', ar: 'الموسيقى' }, exp: '5 yrs', lang: 'EN' },
]

const departments = [
  {
    icon: BookOpen,
    name: { en: 'English Language Arts', ar: 'اللغة الإنجليزية' },
    desc: { en: 'Reading, writing, phonics, and communication — building strong English foundations from KG through Grade 5.', ar: 'القراءة والكتابة وتأسيس لغوي قوي من الروضة حتى الصف الخامس.' },
    color: 'bg-blue-50 border-blue-100 text-blue-700',
    iconColor: 'text-blue-600',
    count: { en: '5 teachers', ar: '٥ معلمين' },
  },
  {
    icon: Globe,
    name: { en: 'Arabic & Islamic Studies', ar: 'العربية والإسلامية' },
    desc: { en: 'MOE-aligned Arabic language and Islamic education, with dedicated native-speaker teachers for all grades.', ar: 'تعليم عربي وإسلامي متوافق مع وزارة التربية، مع معلمين متحدثين بالعربية لجميع الصفوف.' },
    color: 'bg-emerald-50 border-emerald-100 text-emerald-700',
    iconColor: 'text-emerald-600',
    count: { en: '4 teachers', ar: '٤ معلمين' },
  },
  {
    icon: Award,
    name: { en: 'Mathematics', ar: 'الرياضيات' },
    desc: { en: 'Singapore Math-influenced curriculum building number sense, problem-solving, and mathematical thinking.', ar: 'منهج رياضيات مستوحى من سنغافورة يبني الإحساس بالأرقام وحل المشكلات والتفكير الرياضي.' },
    color: 'bg-amber-50 border-amber-100 text-amber-700',
    iconColor: 'text-amber-600',
    count: { en: '4 teachers', ar: '٤ معلمين' },
  },
  {
    icon: GraduationCap,
    name: { en: 'Science & Technology', ar: 'العلوم والتكنولوجيا' },
    desc: { en: 'Hands-on inquiry-based learning with dedicated lab time, coding basics, and STEM integration from Grade 1.', ar: 'تعلم قائم على الاستفسار مع وقت مخبري وأسس البرمجة وتكامل STEM من الصف الأول.' },
    color: 'bg-violet-50 border-violet-100 text-violet-700',
    iconColor: 'text-violet-600',
    count: { en: '3 teachers', ar: '٣ معلمين' },
  },
]

export default function StaffPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const t = content[lang]
  const isRTL = lang === 'ar'

  return (
    <div className={clsx('min-h-screen flex flex-col', isRTL && 'rtl')} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header lang={lang} onLangChange={setLang} />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative mesh-bg noise overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/90 via-brand-blue-dark/80 to-neutral-950/90" />
          <div className="relative container-custom py-24 text-center text-white">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-widest text-brand-gold mb-6">
              {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
              {t.hero.title}{' '}
              <span className="text-brand-gold">{t.hero.titleHighlight}</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">{t.hero.subtitle}</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" className="w-full fill-neutral-50" preserveAspectRatio="none" height="40">
              <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" />
            </svg>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-neutral-50 py-12 border-b border-neutral-100">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-bold font-playfair text-brand-blue mb-1">{s.value}</div>
                  <div className="text-sm text-neutral-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')}>
              <h2 className="text-3xl font-bold font-playfair text-neutral-900 mb-2">{t.leadership.title}</h2>
              <p className="text-neutral-500">{t.leadership.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadership.map((person) => (
                <div
                  key={person.email}
                  className="group rounded-2xl border border-neutral-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Avatar area */}
                  <div className={clsx('relative h-40 bg-gradient-to-br flex items-center justify-center', person.color)}>
                    <span className="text-4xl font-bold font-playfair text-white/90">{person.initials}</span>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-gold" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-neutral-900 font-playfair">{person.name[lang]}</h3>
                    <p className="text-brand-blue text-sm font-medium mb-3">{person.role[lang]}</p>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4">{person.bio[lang]}</p>
                    <ul className="space-y-1 mb-5">
                      {person.quals.map((q) => (
                        <li key={q} className="flex items-center gap-2 text-xs text-neutral-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                          {q}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`mailto:${person.email}`}
                      className="flex items-center gap-2 text-xs text-brand-blue hover:text-brand-blue-dark font-medium transition-colors"
                    >
                      <Mail size={13} />
                      {t.contact}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="py-20 bg-neutral-50">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')}>
              <h2 className="text-3xl font-bold font-playfair text-neutral-900 mb-2">{t.departments.title}</h2>
              <p className="text-neutral-500">{t.departments.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((dep) => {
                const Icon = dep.icon
                return (
                  <div
                    key={dep.name.en}
                    className={clsx('rounded-2xl border p-6 flex gap-4', dep.color)}
                  >
                    <div className={clsx('w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm', dep.iconColor)}>
                      <Icon size={22} />
                    </div>
                    <div className={clsx(isRTL && 'text-right')}>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-bold text-neutral-900">{dep.name[lang]}</h3>
                        <span className="text-xs font-medium opacity-70">{dep.count[lang]}</span>
                      </div>
                      <p className="text-sm text-neutral-600 leading-relaxed">{dep.desc[lang]}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Faculty Grid */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')}>
              <h2 className="text-3xl font-bold font-playfair text-neutral-900 mb-2">{t.faculty.title}</h2>
              <p className="text-neutral-500">{t.faculty.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {faculty.map((member) => (
                <div
                  key={member.name.en}
                  className="group rounded-2xl border border-neutral-100 bg-white hover:shadow-lg hover:border-brand-blue/20 transition-all duration-300 p-5 flex gap-4"
                >
                  {/* Initials avatar */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-dark flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold font-playfair">
                      {member.name.en.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </span>
                  </div>
                  <div className={clsx('flex-1 min-w-0', isRTL && 'text-right')}>
                    <h3 className="font-semibold text-neutral-900 text-sm leading-tight">{member.name[lang]}</h3>
                    <p className="text-brand-blue text-xs font-medium mt-0.5">{member.role[lang]}</p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
                        <BookOpen size={10} />
                        {member.subject[lang]}
                      </span>
                      <span className="text-xs text-neutral-400">{member.exp}</span>
                      <span className="inline-flex items-center gap-1 text-xs text-neutral-400">
                        <Globe size={10} />
                        {member.lang}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="py-20 bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold font-playfair mb-3">{t.join.title}</h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">{t.join.subtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`mailto:${t.join.email}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-gold text-neutral-900 font-semibold rounded-xl hover:bg-yellow-400 transition-colors"
              >
                <Mail size={16} />
                {t.join.cta}
              </a>
              <a
                href={`mailto:${t.join.email}`}
                className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
              >
                <Phone size={14} />
                {t.join.email}
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
