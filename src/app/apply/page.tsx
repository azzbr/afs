'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import PageHero from '@/components/PageHero/PageHero'
import {
  User, Users, FileText, CheckCircle, ArrowRight, ArrowLeft,
  GraduationCap, AlertCircle, Loader2, Check,
} from 'lucide-react'
import { clsx } from 'clsx'

const grades = ['KG1', 'KG2', 'KG3', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5']
const gradesAr = ['KG1', 'KG2', 'KG3', 'الصف 1', 'الصف 2', 'الصف 3', 'الصف 4', 'الصف 5']
const sources = ['Social Media', 'Friend / Family', 'Google Search', 'School Event', 'Billboard / Advertisement', 'Other']
const sourcesAr = ['وسائل التواصل الاجتماعي', 'صديق / عائلة', 'بحث جوجل', 'فعالية مدرسية', 'إعلان', 'أخرى']

const steps = {
  en: [
    { icon: User, label: 'Student', desc: 'Basic student details' },
    { icon: Users, label: 'Parents', desc: 'Guardian information' },
    { icon: FileText, label: 'Documents', desc: 'Checklist & notes' },
    { icon: CheckCircle, label: 'Review', desc: 'Confirm & submit' },
  ],
  ar: [
    { icon: User, label: 'الطالب', desc: 'بيانات الطالب الأساسية' },
    { icon: Users, label: 'الوالدان', desc: 'بيانات ولي الأمر' },
    { icon: FileText, label: 'المستندات', desc: 'قائمة التحقق والملاحظات' },
    { icon: CheckCircle, label: 'المراجعة', desc: 'التأكيد والإرسال' },
  ],
}

const docs = {
  en: [
    { key: 'birth', label: "Child's Birth Certificate" },
    { key: 'passport', label: 'Passport Copy (child & parents)' },
    { key: 'report', label: 'Previous School Report Card (not required for KG)' },
    { key: 'vaccine', label: 'Vaccination Record' },
    { key: 'photo', label: 'Recent Passport-Size Photo' },
    { key: 'cpr', label: 'CPR / Residency Permit Copy' },
  ],
  ar: [
    { key: 'birth', label: 'شهادة ميلاد الطفل' },
    { key: 'passport', label: 'نسخة جواز السفر (الطفل والوالدان)' },
    { key: 'report', label: 'كشف درجات المدرسة السابقة (غير مطلوب للروضة)' },
    { key: 'vaccine', label: 'سجل التطعيمات' },
    { key: 'photo', label: 'صورة شخصية حديثة' },
    { key: 'cpr', label: 'نسخة CPR / تصريح الإقامة' },
  ],
}

type DocKey = 'birth' | 'passport' | 'report' | 'vaccine' | 'photo' | 'cpr'

interface StudentForm {
  firstName: string; lastName: string; firstNameAr: string; lastNameAr: string
  dob: string; gender: string; nationality: string; grade: string; previousSchool: string
}
interface ParentForm {
  fatherName: string; motherName: string; primaryPhone: string
  secondaryPhone: string; email: string; address: string; source: string
}

const emptyStudent: StudentForm = {
  firstName: '', lastName: '', firstNameAr: '', lastNameAr: '',
  dob: '', gender: '', nationality: '', grade: '', previousSchool: '',
}
const emptyParent: ParentForm = {
  fatherName: '', motherName: '', primaryPhone: '', secondaryPhone: '',
  email: '', address: '', source: '',
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1.5 block text-xs font-semibold text-muted">
      {children}{required && <span className="ml-0.5 text-[#C0392B]">*</span>}
    </label>
  )
}

function Input({ value, onChange, ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input value={value} onChange={onChange} className="field" {...rest} />
}

function Select({ value, onChange, children, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select value={value} onChange={onChange} className="field cursor-pointer appearance-none" {...rest}>
      {children}
    </select>
  )
}

export default function ApplyPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [step, setStep] = useState(0)
  const [student, setStudent] = useState<StudentForm>(emptyStudent)
  const [parent, setParent] = useState<ParentForm>(emptyParent)
  const [checkedDocs, setCheckedDocs] = useState<Record<DocKey, boolean>>({
    birth: false, passport: false, report: false, vaccine: false, photo: false, cpr: false,
  })
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [refNumber, setRefNumber] = useState('')

  const isRTL = lang === 'ar'
  const Arr = isRTL ? ArrowLeft : ArrowRight
  const stepList = steps[lang]
  const docList = docs[lang]
  const gradeList = isRTL ? gradesAr : grades

  const su = (k: keyof StudentForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setStudent(p => ({ ...p, [k]: e.target.value }))
  const pu = (k: keyof ParentForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setParent(p => ({ ...p, [k]: e.target.value }))

  const canNext = () => {
    if (step === 0) return !!(student.firstName && student.lastName && student.dob && student.gender && student.nationality && student.grade)
    if (step === 1) return !!(parent.primaryPhone && parent.email && (parent.fatherName || parent.motherName))
    return true
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student, parent, documents: checkedDocs, notes }),
      })
      const data = await res.json()
      if (!res.ok) {
        setSubmitError(data.error || 'Submission failed. Please try again.')
        setSubmitting(false)
      } else {
        setRefNumber(data.ref)
        setSubmitted(true)
      }
    } catch {
      setSubmitError('Network error. Please check your connection.')
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-canvas">
        <Header lang={lang} onLangChange={setLang} />
        <main className="flex min-h-[80vh] items-center bg-soft py-24">
          <div className="container-custom">
            <div className="mx-auto max-w-lg text-center animate-scale-in">
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-50 text-[#2E7D54]">
                <CheckCircle size={36} />
              </span>
              <h1 className="mb-3 mt-6 font-display text-3xl font-bold text-ink">
                {isRTL ? 'تم استلام طلبك!' : 'Application Received!'}
              </h1>
              <p className="mb-2 text-muted">
                {isRTL ? 'سيتواصل معك فريق القبول في غضون 2–3 أيام عمل.' : 'Our admissions team will be in touch within 2–3 business days.'}
              </p>
              <div className="mb-8 mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 shadow-card">
                <span className="text-xs font-medium text-muted">{isRTL ? 'رقم المرجع:' : 'Reference:'}</span>
                <span className="font-mono text-sm font-bold text-brand-600">{refNumber}</span>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/" className="btn-primary px-6 py-3 text-sm">{isRTL ? 'العودة للرئيسية' : 'Back to Home'}</Link>
                <Link href="/contact" className="btn-outline px-6 py-3 text-sm">{isRTL ? 'تواصل معنا' : 'Contact Us'}</Link>
              </div>
            </div>
          </div>
        </main>
        <Footer lang={lang} />
      </div>
    )
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-canvas">
      <Header lang={lang} onLangChange={setLang} />
      <main>
        <PageHero
          tag={isRTL ? 'طلب القبول' : 'Enrollment Application'}
          title={isRTL ? 'ابدأ رحلة طفلك في مدرسة الفجر' : "Start Your Child's Journey at AFS"}
          subtitle={isRTL ? 'أكمل النموذج أدناه — سيتواصل معك فريق القبول في غضون يومي عمل.' : 'Complete the form below — our admissions team will follow up within 2 business days.'}
          isRTL={isRTL}
          align="left"
        />

        <section className="section-padding dawn-soft">
          <div className="container-custom mx-auto max-w-3xl">

            {/* Step indicator */}
            <div className="mb-10">
              <div className={clsx('flex items-center', isRTL && 'flex-row-reverse')}>
                {stepList.map((s, i) => (
                  <div key={s.label} className={clsx('flex flex-1 items-center', isRTL && 'flex-row-reverse')}>
                    <button
                      onClick={() => i < step && setStep(i)}
                      className={clsx('flex flex-shrink-0 flex-col items-center gap-1', i < step && 'cursor-pointer')}
                    >
                      <span className={clsx(
                        'grid h-10 w-10 place-items-center rounded-xl text-sm font-bold transition-colors',
                        step === i ? 'bg-brand-600 text-white' : i < step ? 'bg-brand-600 text-white' : 'border border-line bg-white text-faint',
                      )}>
                        {i < step ? <Check size={16} /> : <s.icon size={16} />}
                      </span>
                      <span className={clsx('hidden text-[10px] font-bold sm:block', step >= i ? 'text-brand-600' : 'text-faint')}>{s.label}</span>
                    </button>
                    {i < stepList.length - 1 && (
                      <div className={clsx('mx-2 h-0.5 flex-1 transition-colors', i < step ? 'bg-brand-400' : 'bg-line')} />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <span className="text-xs font-medium text-faint">
                  {isRTL ? `خطوة ${step + 1} من ${stepList.length}` : `Step ${step + 1} of ${stepList.length}`}{' — '}{stepList[step].desc}
                </span>
              </div>
            </div>

            {/* Card */}
            <div className="card p-8 md:p-10">

              {/* STEP 0 */}
              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="mb-1 font-display text-xl font-bold text-ink">{isRTL ? 'بيانات الطالب' : 'Student Information'}</h2>
                    <p className="text-sm text-muted">{isRTL ? 'الأسماء كما في جواز السفر أو شهادة الميلاد' : 'Names as they appear on passport or birth certificate'}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div><FieldLabel required>{isRTL ? 'الاسم الأول (إنجليزي)' : 'First Name (English)'}</FieldLabel><Input value={student.firstName} onChange={su('firstName')} placeholder="e.g. Ahmad" required /></div>
                    <div><FieldLabel required>{isRTL ? 'اسم العائلة (إنجليزي)' : 'Last Name (English)'}</FieldLabel><Input value={student.lastName} onChange={su('lastName')} placeholder="e.g. Al-Dosari" required /></div>
                    <div><FieldLabel>{isRTL ? 'الاسم الأول (عربي)' : 'First Name (Arabic)'}</FieldLabel><Input value={student.firstNameAr} onChange={su('firstNameAr')} placeholder="مثال: أحمد" dir="rtl" /></div>
                    <div><FieldLabel>{isRTL ? 'اسم العائلة (عربي)' : 'Last Name (Arabic)'}</FieldLabel><Input value={student.lastNameAr} onChange={su('lastNameAr')} placeholder="مثال: الدوسري" dir="rtl" /></div>
                    <div><FieldLabel required>{isRTL ? 'تاريخ الميلاد' : 'Date of Birth'}</FieldLabel><Input type="date" value={student.dob} onChange={su('dob')} required /></div>
                    <div>
                      <FieldLabel required>{isRTL ? 'الجنس' : 'Gender'}</FieldLabel>
                      <Select value={student.gender} onChange={su('gender')} required>
                        <option value="">{isRTL ? '— اختر —' : '— Select —'}</option>
                        <option value="male">{isRTL ? 'ذكر' : 'Male'}</option>
                        <option value="female">{isRTL ? 'أنثى' : 'Female'}</option>
                      </Select>
                    </div>
                    <div><FieldLabel required>{isRTL ? 'الجنسية' : 'Nationality'}</FieldLabel><Input value={student.nationality} onChange={su('nationality')} placeholder={isRTL ? 'مثال: بحريني' : 'e.g. Bahraini'} required /></div>
                    <div>
                      <FieldLabel required>{isRTL ? 'الصف المطلوب' : 'Grade Applying For'}</FieldLabel>
                      <Select value={student.grade} onChange={su('grade')} required>
                        <option value="">{isRTL ? '— اختر الصف —' : '— Select Grade —'}</option>
                        {gradeList.map((g) => <option key={g} value={g}>{g}</option>)}
                      </Select>
                    </div>
                  </div>
                  <div><FieldLabel>{isRTL ? 'المدرسة السابقة (إن وجدت)' : 'Previous School Attended (if any)'}</FieldLabel><Input value={student.previousSchool} onChange={su('previousSchool')} placeholder={isRTL ? 'اتركه فارغاً للطلاب الجدد' : 'Leave blank for new students'} /></div>
                </div>
              )}

              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="mb-1 font-display text-xl font-bold text-ink">{isRTL ? 'بيانات ولي الأمر' : 'Parent / Guardian Information'}</h2>
                    <p className="text-sm text-muted">{isRTL ? 'يكفي تعبئة أحد الوالدين كجهة اتصال رئيسية' : 'At least one parent name is required as the primary contact'}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div><FieldLabel>{isRTL ? 'اسم الأب (كامل)' : "Father's Full Name"}</FieldLabel><Input value={parent.fatherName} onChange={pu('fatherName')} placeholder={isRTL ? 'الاسم الكامل' : 'Full name'} /></div>
                    <div><FieldLabel>{isRTL ? 'اسم الأم (كامل)' : "Mother's Full Name"}</FieldLabel><Input value={parent.motherName} onChange={pu('motherName')} placeholder={isRTL ? 'الاسم الكامل' : 'Full name'} /></div>
                    <div><FieldLabel required>{isRTL ? 'رقم الهاتف الرئيسي' : 'Primary Phone Number'}</FieldLabel><Input type="tel" value={parent.primaryPhone} onChange={pu('primaryPhone')} placeholder="+973 XXXX XXXX" required /></div>
                    <div><FieldLabel>{isRTL ? 'رقم هاتف بديل' : 'Secondary Phone (optional)'}</FieldLabel><Input type="tel" value={parent.secondaryPhone} onChange={pu('secondaryPhone')} placeholder="+973 XXXX XXXX" /></div>
                    <div className="sm:col-span-2"><FieldLabel required>{isRTL ? 'البريد الإلكتروني' : 'Email Address'}</FieldLabel><Input type="email" value={parent.email} onChange={pu('email')} placeholder="name@example.com" required /></div>
                    <div className="sm:col-span-2"><FieldLabel>{isRTL ? 'منطقة السكن' : 'Area of Residence'}</FieldLabel><Input value={parent.address} onChange={pu('address')} placeholder={isRTL ? 'مثال: صار، بربر، الرفاع...' : 'e.g. Saar, Barbar, Riffa...'} /></div>
                    <div className="sm:col-span-2">
                      <FieldLabel>{isRTL ? 'كيف سمعت عن الفجر؟' : 'How did you hear about AFS?'}</FieldLabel>
                      <Select value={parent.source} onChange={pu('source')}>
                        <option value="">{isRTL ? '— اختر —' : '— Select —'}</option>
                        {(isRTL ? sourcesAr : sources).map((s) => <option key={s} value={s}>{s}</option>)}
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-1 font-display text-xl font-bold text-ink">{isRTL ? 'قائمة المستندات' : 'Documents Checklist'}</h2>
                    <p className="text-sm text-muted">{isRTL ? 'يرجى الإشارة إلى المستندات المتوفرة لديك. ستحتاج إلى إحضارها عند زيارة المدرسة.' : 'Tick the documents you have ready. You will need to bring originals to the school visit.'}</p>
                  </div>
                  <div className="space-y-3">
                    {docList.map((doc) => {
                      const checked = checkedDocs[doc.key as DocKey]
                      return (
                        <label key={doc.key} className={clsx('flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors', checked ? 'border-brand-300 bg-brand-50' : 'border-line bg-white hover:border-brand-200', isRTL && 'flex-row-reverse')}>
                          <span className={clsx('grid h-5 w-5 flex-shrink-0 place-items-center rounded-md border-2 transition-colors', checked ? 'border-brand-600 bg-brand-600' : 'border-line')}>
                            {checked && <Check size={12} className="text-white" strokeWidth={3} />}
                          </span>
                          <input type="checkbox" className="hidden" checked={checked} onChange={(e) => setCheckedDocs(p => ({ ...p, [doc.key]: e.target.checked }))} />
                          <span className="text-sm font-medium text-ink">{doc.label}</span>
                        </label>
                      )
                    })}
                  </div>
                  <div>
                    <FieldLabel>{isRTL ? 'ملاحظات إضافية (اختياري)' : 'Additional Notes (optional)'}</FieldLabel>
                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={isRTL ? 'أي احتياجات خاصة، حالات طبية، أو أسئلة للفريق الأكاديمي...' : 'Any special needs, medical conditions, or questions for the admissions team...'}
                      className={clsx('field resize-none', isRTL && 'text-right')}
                    />
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-1 font-display text-xl font-bold text-ink">{isRTL ? 'مراجعة الطلب' : 'Review & Submit'}</h2>
                    <p className="text-sm text-muted">{isRTL ? 'يرجى مراجعة البيانات قبل الإرسال.' : 'Please review your information before submitting.'}</p>
                  </div>

                  {[
                    {
                      icon: GraduationCap, title: isRTL ? 'الطالب' : 'Student',
                      rows: [
                        [isRTL ? 'الاسم' : 'Name', `${student.firstName} ${student.lastName}`],
                        [isRTL ? 'تاريخ الميلاد' : 'Date of Birth', student.dob],
                        [isRTL ? 'الجنس' : 'Gender', student.gender],
                        [isRTL ? 'الجنسية' : 'Nationality', student.nationality],
                        [isRTL ? 'الصف المطلوب' : 'Grade', student.grade],
                        [isRTL ? 'المدرسة السابقة' : 'Prev. School', student.previousSchool || (isRTL ? 'لا يوجد' : 'N/A')],
                      ],
                    },
                    {
                      icon: Users, title: isRTL ? 'الوالدان' : 'Parent / Guardian',
                      rows: [
                        [isRTL ? 'الأب' : 'Father', parent.fatherName || '—'],
                        [isRTL ? 'الأم' : 'Mother', parent.motherName || '—'],
                        [isRTL ? 'الهاتف' : 'Phone', parent.primaryPhone],
                        [isRTL ? 'البريد' : 'Email', parent.email],
                        [isRTL ? 'المنطقة' : 'Area', parent.address || '—'],
                      ],
                    },
                  ].map((block) => (
                    <div key={block.title} className={clsx('rounded-xl border border-line p-5', isRTL && 'text-right')}>
                      <div className={clsx('mb-3 flex items-center gap-2', isRTL && 'flex-row-reverse')}>
                        <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand-600"><block.icon size={13} /></span>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-faint">{block.title}</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {block.rows.map(([k, v]) => (
                          <div key={k}>
                            <span className="text-xs text-faint">{k}</span>
                            <div className="break-words font-semibold text-ink">{v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className={clsx('rounded-xl border border-line p-5', isRTL && 'text-right')}>
                    <div className={clsx('mb-3 flex items-center gap-2', isRTL && 'flex-row-reverse')}>
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand-600"><FileText size={13} /></span>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-faint">{isRTL ? 'المستندات المتوفرة' : 'Documents Ready'}</h3>
                    </div>
                    <div className={clsx('flex flex-wrap gap-2', isRTL && 'justify-end')}>
                      {docList.filter((d) => checkedDocs[d.key as DocKey]).map((d) => (
                        <span key={d.key} className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700">
                          <Check size={10} /> {d.label.split('(')[0].trim()}
                        </span>
                      ))}
                      {!Object.values(checkedDocs).some(Boolean) && (
                        <span className="text-xs text-faint">{isRTL ? 'لم يتم تحديد أي مستند' : 'No documents checked'}</span>
                      )}
                    </div>
                  </div>

                  {submitError && (
                    <div className={clsx('flex items-center gap-2.5 rounded-xl border border-[#f3c9c4] bg-[#fdecea] p-4 text-sm text-[#C0392B]', isRTL && 'flex-row-reverse text-right')}>
                      <AlertCircle size={16} className="flex-shrink-0" /> {submitError}
                    </div>
                  )}

                  <p className="text-xs leading-relaxed text-faint">
                    {isRTL ? 'بالإرسال توافق على التواصل معك من قِبل فريق القبول في مدرسة الفجر الخاصة.' : 'By submitting, you agree to be contacted by the Al Fajer Private School admissions team regarding this application.'}
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className={clsx('mt-8 flex items-center justify-between border-t border-line pt-6', isRTL && 'flex-row-reverse')}>
                {step > 0 ? (
                  <button onClick={() => setStep(s => s - 1)} className={clsx('btn-outline px-5 py-2.5 text-sm', isRTL && 'flex-row-reverse')}>
                    {isRTL ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}{isRTL ? 'السابق' : 'Back'}
                  </button>
                ) : (
                  <Link href="/admissions" className="text-sm text-faint transition-colors hover:text-brand-600">
                    {isRTL ? 'صفحة القبول' : 'Admissions info'}
                  </Link>
                )}

                {step < 3 ? (
                  <button
                    onClick={() => canNext() && setStep(s => s + 1)}
                    disabled={!canNext()}
                    className="btn-primary px-6 py-3 disabled:cursor-not-allowed disabled:bg-line disabled:text-faint disabled:shadow-none"
                  >
                    {isRTL ? 'التالي' : 'Next'} <Arr size={15} />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={submitting} className="btn-secondary px-8 py-3 disabled:cursor-not-allowed disabled:opacity-70">
                    {submitting
                      ? <><Loader2 size={15} className="animate-spin" />{isRTL ? 'جارٍ الإرسال...' : 'Submitting...'}</>
                      : <>{isRTL ? 'أرسل الطلب' : 'Submit Application'} <Arr size={15} /></>}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
