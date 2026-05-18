'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Share2, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'

const articles = [
  {
    slug: 'star-360-assessment-results',
    category: 'Achievement', categoryAr: 'إنجاز',
    title: 'AFS Students Excel in STAR 360 Assessment',
    titleAr: 'طلاب الفجر يتفوقون في تقييم STAR 360',
    excerpt: 'Our students demonstrated exceptional growth in reading and mathematics in the latest STAR 360 assessment cycle, surpassing national benchmarks.',
    excerptAr: 'أظهر طلابنا نمواً استثنائياً في القراءة والرياضيات في دورة تقييم STAR 360 الأخيرة، متجاوزين المعايير الوطنية.',
    date: 'March 2025', dateAr: 'مارس 2025',
    color: 'from-brand-blue to-blue-700', emoji: '⭐', readMin: 3,
    body: {
      en: [
        "Al Fajer Private School is proud to announce outstanding results from the latest STAR 360 assessment cycle. Across all grade levels, AFS students demonstrated measurable, significant growth in both reading and mathematics — surpassing national and regional benchmarks.",
        "The Renaissance STAR 360 platform, used by thousands of schools worldwide, provides adaptive, evidence-based assessments that adjust to each student's level. This spring's results showed that over 78% of AFS students in Grades 1–5 scored at or above grade-level expectations in English Language Arts.",
        "In mathematics, the results were equally impressive. Grade 3 students showed an average growth percentile of 68, well above the national norm of 50. KG3 students demonstrated strong early numeracy foundations that are expected to translate into strong Grade 1 outcomes.",
        '"These results reflect the dedication of our teachers and the hard work of every student," said Ms. Fatima Al-Mannai, Principal of AFS. "We use STAR 360 not just to measure where students are, but to guide how we teach every day."',
        "Parents received individual STAR reports showing their child's Scaled Score, Grade Equivalent, and Percentile Rank. The school will hold parent information sessions in the coming weeks to help families understand the reports and how to support learning at home.",
      ],
      ar: [
        "تفخر مدرسة الفجر الخاصة بالإعلان عن نتائج متميزة من دورة تقييم STAR 360 الأخيرة. على مستوى جميع الصفوف، أظهر طلاب الفجر نمواً ملموساً وكبيراً في القراءة والرياضيات — متجاوزين المعايير الوطنية والإقليمية.",
        "منصة Renaissance STAR 360 المستخدمة في آلاف المدارس حول العالم توفر تقييمات تكيفية قائمة على الأدلة تتكيف مع مستوى كل طالب. أظهرت نتائج هذا الربيع أن أكثر من 78٪ من طلاب الفجر في الصفوف 1-5 حصلوا على درجات تساوي أو تتجاوز توقعات مستوى الصف في اللغة الإنجليزية.",
        "في الرياضيات، كانت النتائج مماثلة في تميزها. أظهر طلاب الصف الثالث متوسط نسبة نمو قدرها 68، وهو أعلى بكثير من المعيار الوطني البالغ 50. أظهر طلاب KG3 أسساً قوية في مهارات العد المبكر.",
        'قالت الأستاذة فاطمة المناعي، مديرة الفجر: "تعكس هذه النتائج تفاني معلمينا والعمل الجاد لكل طالب. نستخدم STAR 360 ليس فقط لقياس مستوى الطلاب، بل لتوجيه طريقة تدريسنا كل يوم."',
        "تلقى أولياء الأمور تقارير STAR الفردية التي تُظهر الدرجة المقياسية ومكافئ الصف والمئينية لأطفالهم. ستعقد المدرسة جلسات معلومات للآباء في الأسابيع القادمة.",
      ],
    },
  },
  {
    slug: 'graduation-ceremony-2025',
    category: 'Event', categoryAr: 'فعالية',
    title: 'Annual Graduation Ceremony 2024–2025',
    titleAr: 'حفل التخرج السنوي 2024–2025',
    excerpt: 'We proudly celebrated our Grade 5 graduates at a heartwarming ceremony attended by families and staff.',
    excerptAr: 'احتفلنا بفخر بخريجي الصف الخامس في حفل دافئ حضره الأهالي وأعضاء هيئة التدريس.',
    date: 'June 2025', dateAr: 'يونيو 2025',
    color: 'from-amber-400 to-orange-500', emoji: '🎓', readMin: 2,
    body: {
      en: [
        "Al Fajer Private School held its Annual Graduation Ceremony for the Class of 2024–2025 on June 12th. The hall was filled with the warmth of proud families, dedicated teachers, and beaming graduates who have grown so much over their years at AFS.",
        "This year's graduating class of 42 Grade 5 students received their certificates in a ceremony that included student performances, a speech by the school principal, and a special tribute to the outgoing class.",
        '"Today marks the end of one chapter and the beginning of an even more exciting one," said Principal Al-Mannai. "Each one of you carries AFS with you — the curiosity, the kindness, and the courage to learn."',
        "Students were recognized with academic excellence awards, citizenship awards, and special commendations for outstanding contribution to school life. The event concluded with a reception for families hosted by the Parents Committee.",
        "The school extends its heartfelt congratulations to all 2025 graduates and wishes them every success in the next stage of their journey.",
      ],
      ar: [
        "أقامت مدرسة الفجر الخاصة حفل التخرج السنوي للفوج 2024-2025 في 12 يونيو. امتلأت القاعة بدفء أسر فخورة ومعلمين متفانين وخريجين مشرقين نمو كثيراً خلال سنواتهم في الفجر.",
        "استلم فوج هذا العام المكون من 42 طالباً في الصف الخامس شهاداتهم في حفل تضمن عروضاً طلابية وكلمة مديرة المدرسة وتكريماً خاصاً للفوج المتخرج.",
        'قالت المديرة المناعي: "اليوم يمثل نهاية فصل وبداية فصل أكثر إثارة. كل منكم يحمل الفجر معه — الفضول والطيبة والشجاعة على التعلم."',
        "حظي الطلاب بجوائز التفوق الأكاديمي وجوائز المواطنة وتوصيات خاصة على المساهمة المتميزة في الحياة المدرسية. اختتم الحفل باستقبال للأسر نظمته لجنة أولياء الأمور.",
        "تتوجه المدرسة بأحر التهاني لجميع خريجي 2025 وتتمنى لهم كل النجاح في المرحلة القادمة.",
      ],
    },
  },
  {
    slug: 'enrollment-open-2025-2026',
    category: 'Admissions', categoryAr: 'القبول',
    title: 'Enrollment Now Open for 2025–2026',
    titleAr: 'التسجيل مفتوح للعام 2025–2026',
    excerpt: "Applications for the upcoming academic year are now being accepted. Secure your child's place before seats fill up.",
    excerptAr: 'يتم الآن قبول طلبات العام الدراسي القادم. أمّن مقعد طفلك قبل امتلاء الأماكن.',
    date: 'January 2025', dateAr: 'يناير 2025',
    color: 'from-emerald-400 to-teal-600', emoji: '📋', readMin: 2,
    body: {
      en: [
        "Al Fajer Private School is pleased to announce that enrollment for the 2025–2026 academic year is now open. We are accepting applications for all grade levels from KG1 through Grade 5.",
        "This year we have introduced a streamlined online application process, allowing families to complete the entire application from home. The new system includes a document upload portal and real-time status tracking.",
        "Seats are offered on a first-come, first-served basis, and historically fill quickly — especially for KG1 and KG2. Families who applied last year and were waitlisted are encouraged to reapply early.",
        "The required documents for enrollment include: child's birth certificate, passport copies (child and parents), most recent school report card, vaccination record, a recent passport-size photo, and a copy of the CPR/residency permit.",
        "To apply, visit the Admissions page on our website or contact the school office at +973 1761 2221 during school hours (Sunday–Thursday, 7:30am–3:30pm). Our admissions team is happy to guide you through the process.",
      ],
      ar: [
        "تسعد مدرسة الفجر الخاصة بالإعلان عن فتح باب التسجيل للعام الدراسي 2025-2026. نقبل الطلبات لجميع المراحل الدراسية من KG1 حتى الصف الخامس.",
        "هذا العام قدمنا عملية تقديم إلكترونية مبسطة تتيح للأسر إتمام طلب التسجيل بالكامل من المنزل. يتضمن النظام الجديد بوابة لرفع المستندات وتتبع الحالة في الوقت الفعلي.",
        "تُمنح المقاعد وفق مبدأ الأسبقية، وتمتلئ بسرعة تاريخياً — خاصةً في KG1 و KG2. نشجع الأسر التي تقدمت العام الماضي وكانت على قائمة الانتظار على إعادة التقديم مبكراً.",
        "المستندات المطلوبة للتسجيل تشمل: شهادة ميلاد الطفل، نسخ جواز السفر، كشف الدرجات الأخير، سجل التطعيمات، صورة حديثة وبطاقة الإقامة.",
        "للتقديم، تفضل بزيارة صفحة القبول في موقعنا أو تواصل مع مكتب المدرسة على +973 1761 2221 خلال ساعات الدوام (الأحد–الخميس، 7:30ص–3:30م).",
      ],
    },
  },
  {
    slug: 'cultural-day-2025',
    category: 'Event', categoryAr: 'فعالية',
    title: 'Cultural Day Celebrates Diversity',
    titleAr: 'يوم الثقافة يحتفل بالتنوع',
    excerpt: 'Students, parents, and teachers came together to celebrate the rich cultural tapestry of our school community.',
    excerptAr: 'اجتمع الطلاب والأهالي والمعلمون معاً للاحتفال بالنسيج الثقافي الغني لمجتمع مدرستنا.',
    date: 'February 2025', dateAr: 'فبراير 2025',
    color: 'from-rose-400 to-pink-600', emoji: '🌍', readMin: 3,
    body: {
      en: [
        "Al Fajer Private School's Annual Cultural Day brought together students, parents, and teachers in a vibrant celebration of the many nationalities and traditions that make up our school community.",
        "This year's theme, 'One World, Many Stories', saw students arrive in traditional dress representing over 15 different nationalities. The main hall was transformed into a global marketplace of food stalls, crafts, music, and storytelling.",
        "Each class prepared a cultural presentation that was shared with the entire school. Highlights included a traditional Bahraini Pearl Diving display, a Bollywood dance performance, a Filipino folk dance, and an Arabic calligraphy demonstration.",
        "The food fair — a much-anticipated annual tradition — featured dishes from across the globe, prepared by parent volunteers. Samosas, maamoul, spring rolls, and more were enjoyed by all.",
        '"Cultural Day reminds us that our diversity is our greatest strength," said Vice Principal Khalid Al-Rashid. "Our students grow up seeing the world through many different lenses — and that is a precious gift."',
      ],
      ar: [
        "جمع يوم الثقافة السنوي لمدرسة الفجر الخاصة الطلاب والأهالي والمعلمين في احتفال نابض بالجنسيات والتقاليد المتعددة التي تشكل مجتمع مدرستنا.",
        "شهد موضوع هذا العام 'عالم واحد، قصص كثيرة' وصول الطلاب بأزياء تقليدية تمثل أكثر من 15 جنسية مختلفة. تحول القاعة الرئيسية إلى سوق عالمي من أكشاك الطعام والحرف والموسيقى والقصص.",
        "أعدت كل فصل عرضاً ثقافياً شارك مع المدرسة بأكملها. من أبرز اللحظات: عرض الغوص البحريني التقليدي وأداء رقصة بوليوود والفولكلور الفلبيني وعرض الخط العربي.",
        "معرض الطعام — التقليد السنوي المنتظر — ضم أطباقاً من مختلف أنحاء العالم أعدها متطوعون من أولياء الأمور. استمتع الجميع بالسمبوسة والمعمول والسبرينغ رولز وغيرها.",
        'قال نائب المدير خالد الراشد: "يذكرنا يوم الثقافة بأن تنوعنا هو أعظم قوة لدينا. طلابنا ينشؤون وهم يرون العالم من خلال عدسات مختلفة - وهذه هبة ثمينة."',
      ],
    },
  },
  {
    slug: 'french-program-expands',
    category: 'Achievement', categoryAr: 'إنجاز',
    title: 'French Language Program Expands to KG',
    titleAr: 'برنامج اللغة الفرنسية يمتد إلى الروضة',
    excerpt: 'AFS is proud to announce the expansion of our trilingual program, introducing French immersion from KG1.',
    excerptAr: 'يسعد الفجر بالإعلان عن توسيع برنامجنا ثلاثي اللغات بإدخال الفرنسية منذ KG1.',
    date: 'September 2024', dateAr: 'سبتمبر 2024',
    color: 'from-violet-400 to-purple-600', emoji: '🇫🇷', readMin: 2,
    body: {
      en: [
        "Al Fajer Private School is proud to announce a significant milestone: the expansion of our trilingual education program to include formal French language instruction beginning in KG1.",
        "Previously introduced from Grade 1, French will now be woven into the KG program through play-based immersion, songs, stories, and conversational activities. Research consistently shows that early exposure to a third language, particularly during the foundational years, leads to stronger long-term language acquisition.",
        "The expansion is led by two new certified French-language educators who join the AFS faculty this academic year. The program is aligned with the CEFR (Common European Framework of Reference for Languages) and is designed to prepare students for more formal French instruction in higher grades.",
        '"At AFS, we believe that language is the key to opportunity," said Principal Al-Mannai. "Adding French from KG gives our students a powerful head start in a globalized world where multilingualism is a true competitive advantage."',
        "Parents of KG students will receive an information pack outlining the French curriculum, recommended at-home activities, and resources for supporting the language at home.",
      ],
      ar: [
        "تفخر مدرسة الفجر الخاصة بالإعلان عن معلم بارز: توسيع برنامج التعليم ثلاثي اللغات ليشمل تعليماً رسمياً للغة الفرنسية بدءاً من KG1.",
        "كانت الفرنسية تُدرَّس من الصف الأول سابقاً، وستُدمج الآن في برنامج الروضة من خلال الانغماس القائم على اللعب والأغاني والقصص والأنشطة التحادثية. تشير الأبحاث باستمرار إلى أن التعرض المبكر للغة ثالثة يؤدي إلى اكتساب لغوي أقوى على المدى البعيد.",
        "يقود التوسع معلمان جديدان معتمدان في اللغة الفرنسية ينضمان إلى هيئة تدريس الفجر هذا العام الدراسي. البرنامج متوافق مع CEFR ومصمم لإعداد الطلاب للتعليم الفرنسي الرسمي في المراحل العليا.",
        'قالت المديرة المناعي: "في الفجر، نؤمن بأن اللغة هي مفتاح الفرصة. إضافة الفرنسية منذ الروضة يمنح طلابنا ميزة كبيرة في عالم معولم تكون فيه التعددية اللغوية ميزة تنافسية حقيقية."',
        "سيتلقى أولياء أمور طلاب الروضة حزمة معلومات تحدد منهج الفرنسية والأنشطة المنزلية الموصى بها والموارد لدعم اللغة في البيت.",
      ],
    },
  },
  {
    slug: 'parent-teacher-day',
    category: 'Community', categoryAr: 'مجتمع',
    title: 'Parent-Teacher Collaboration Day',
    titleAr: 'يوم التعاون بين الأهالي والمعلمين',
    excerpt: 'A productive day of workshops and discussions helped strengthen the partnership between AFS families and teachers.',
    excerptAr: 'يومٌ مثمر من ورش العمل والنقاشات ساعد على تعزيز الشراكة بين أسر الفجر والمعلمين.',
    date: 'November 2024', dateAr: 'نوفمبر 2024',
    color: 'from-cyan-400 to-blue-500', emoji: '🤝', readMin: 2,
    body: {
      en: [
        "AFS hosted its annual Parent-Teacher Collaboration Day on November 14th, bringing together over 200 parents and all full-time staff for a day of workshops, dialogue, and partnership building.",
        "The event opened with a welcome address from Principal Al-Mannai, who emphasized the school's belief that parents and teachers are co-educators. 'When home and school work together, children thrive,' she said.",
        "Workshop sessions covered a wide range of topics including: Understanding STAR 360 Reports, Supporting Reading at Home, Managing Screen Time for Elementary-Age Children, and Introduction to the AFS Behavior Framework.",
        "The afternoon featured individual classroom visits and informal conversations between parents and teachers. The feedback session at the end of the day yielded over 80 constructive suggestions that will be reviewed by the school leadership team.",
        "The Parents Committee, which organized much of the day's logistics, expressed gratitude to all who attended. The next collaboration event is planned for March, ahead of the spring STAR 360 assessment cycle.",
      ],
      ar: [
        "استضافت الفجر يوم التعاون السنوي بين الأهالي والمعلمين في 14 نوفمبر، مجمعةً أكثر من 200 ولي أمر وجميع أعضاء هيئة التدريس ليوم من ورش العمل والحوار.",
        "افتتح الحدث بكلمة ترحيبية من المديرة المناعي التي أكدت إيمان المدرسة بأن الآباء والمعلمين شركاء في التربية. قالت: 'عندما يتعاون المنزل والمدرسة، يزدهر الأطفال.'",
        "غطت ورش العمل موضوعات متعددة منها: فهم تقارير STAR 360، ودعم القراءة في المنزل، وإدارة وقت الشاشة للأطفال، ومقدمة حول إطار السلوك في الفجر.",
        "تضمن بعد الظهر زيارات فردية للفصول الدراسية وحوارات غير رسمية بين الآباء والمعلمين. أسفرت جلسة التغذية الراجعة عن أكثر من 80 اقتراحاً بنّاءً ستراجعه قيادة المدرسة.",
        "أعربت لجنة أولياء الأمور عن امتنانها لجميع المشاركين. الفعالية التعاونية القادمة مخططة لشهر مارس قبيل دورة تقييم STAR 360 الربيعية.",
      ],
    },
  },
]

const categoryColors: Record<string, string> = {
  Achievement: 'bg-brand-blue/8 text-brand-blue',
  Event:       'bg-amber-50 text-amber-600',
  Admissions:  'bg-emerald-50 text-emerald-600',
  Community:   'bg-cyan-50 text-cyan-600',
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const isRTL = lang === 'ar'
  const Arr = isRTL ? ArrowRight : ArrowLeft

  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  const otherArticles = articles.filter((a) => a.slug !== slug).slice(0, 3)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className={clsx('min-h-screen flex flex-col', isRTL && 'rtl')} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header lang={lang} onLangChange={setLang} />
      <main className="flex-1">

        {/* Hero */}
        <section className={clsx('relative bg-gradient-to-br overflow-hidden py-24', article.color)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] opacity-5 select-none pointer-events-none">
              {article.emoji}
            </div>
          </div>
          <div className="relative container-custom">
            {/* Breadcrumb */}
            <div className={clsx('flex items-center gap-2 text-white/60 text-xs mb-6', isRTL && 'flex-row-reverse')}>
              <Link href="/" className="hover:text-white transition-colors">{isRTL ? 'الرئيسية' : 'Home'}</Link>
              <ChevronRight size={12} className={clsx(isRTL && 'rotate-180')} />
              <Link href="/news" className="hover:text-white transition-colors">{isRTL ? 'الأخبار' : 'News'}</Link>
              <ChevronRight size={12} className={clsx(isRTL && 'rotate-180')} />
              <span className="text-white/40 truncate max-w-[200px]">{isRTL ? article.titleAr : article.title}</span>
            </div>

            <div className={clsx('max-w-3xl', isRTL && 'text-right')}>
              <div className={clsx('flex flex-wrap items-center gap-3 mb-5', isRTL && 'flex-row-reverse')}>
                <span className={clsx('inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-white/20 text-white border border-white/30')}>
                  <Tag size={10} />
                  {isRTL ? article.categoryAr : article.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/70">
                  <Calendar size={10} />
                  {isRTL ? article.dateAr : article.date}
                </span>
                <span className="flex items-center gap-1 text-xs text-white/70">
                  <Clock size={10} />
                  {article.readMin} {isRTL ? 'د قراءة' : 'min read'}
                </span>
              </div>
              <h1 className={clsx('text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6', !isRTL && 'font-playfair')}>
                {isRTL ? article.titleAr : article.title}
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">
                {isRTL ? article.excerptAr : article.excerpt}
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 50" fill="white" className="w-full block" preserveAspectRatio="none" height="40">
              <path d="M0,50 C360,0 1080,0 1440,50 L1440,50 L0,50 Z" />
            </svg>
          </div>
        </section>

        {/* Article body */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className={clsx('prose prose-lg max-w-none', isRTL && 'text-right')}>
                {(isRTL ? article.body.ar : article.body.en).map((para, i) => (
                  <p key={i} className="text-neutral-700 leading-relaxed mb-6 text-base">
                    {para}
                  </p>
                ))}
              </div>

              {/* Share + back */}
              <div className={clsx('flex flex-wrap items-center justify-between gap-4 mt-12 pt-8 border-t border-neutral-100', isRTL && 'flex-row-reverse')}>
                <Link
                  href="/news"
                  className={clsx('inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors', isRTL && 'flex-row-reverse')}
                >
                  <Arr size={14} />
                  {isRTL ? 'العودة إلى الأخبار' : 'Back to News'}
                </Link>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-blue transition-colors"
                >
                  <Share2 size={14} />
                  {isRTL ? 'مشاركة المقال' : 'Share Article'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* More articles */}
        {otherArticles.length > 0 && (
          <section className="py-16 bg-neutral-50 border-t border-neutral-100">
            <div className="container-custom">
              <h2 className={clsx('text-xl font-bold font-playfair text-neutral-900 mb-8', isRTL && 'text-right')}>
                {isRTL ? 'مقالات أخرى' : 'More Stories'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {otherArticles.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/news/${item.slug}`}
                    className={clsx('group rounded-2xl border border-neutral-100 bg-white hover:shadow-lg hover:border-brand-blue/20 transition-all duration-300 overflow-hidden hover:-translate-y-1', isRTL && 'text-right')}
                  >
                    <div className={clsx('h-28 bg-gradient-to-br flex items-center justify-center', item.color)}>
                      <span className="text-4xl">{item.emoji}</span>
                    </div>
                    <div className="p-4">
                      <span className={clsx('text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block', categoryColors[item.category] || 'bg-neutral-100 text-neutral-600')}>
                        {isRTL ? item.categoryAr : item.category}
                      </span>
                      <h3 className={clsx('font-semibold text-sm text-neutral-900 group-hover:text-brand-blue transition-colors leading-snug', !isRTL && 'font-playfair')}>
                        {isRTL ? item.titleAr : item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer lang={lang} />
    </div>
  )
}
