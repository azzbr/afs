'use client'

import { useState } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import PageHero from '@/components/PageHero/PageHero'
import SectionHeading from '@/components/SectionHeading/SectionHeading'
import { MapPin, Phone, Mail, Clock, ChevronDown, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const t = {
  en: {
    hero: { tag: 'Contact Us', title: "We'd Love to Hear From You", subtitle: 'Reach out to us for admissions enquiries, general information, or to schedule a visit to our campus.' },
    info: {
      tag: 'Find Us', title: 'Get in Touch',
      items: [
        { icon: MapPin, label: 'Address', value: 'Building 1754, Road 4627, Block 346, Saar, Bahrain' },
        { icon: Phone, label: 'Phone', value: '+973 1761 2221' },
        { icon: Mail, label: 'Email', value: 'info@afs.edu.bh' },
        { icon: Clock, label: 'Office Hours', value: 'Sunday – Thursday\n7:30 AM – 3:30 PM' },
      ],
    },
    form: {
      tag: 'Send a Message', title: 'Contact Form',
      fields: { name: 'Full Name', email: 'Email Address', phone: 'Phone Number', subject: 'Subject', message: 'Your Message', btn: 'Send Message' },
      subjects: ['General Inquiry', 'Admissions', 'Academics', 'School Tour', 'Other'],
    },
    map: { tag: 'Our Location', title: 'Visit Us in Saar' },
    sent: { title: 'Message Sent!', body: "We'll be in touch soon." },
  },
  ar: {
    hero: { tag: 'تواصل معنا', title: 'يسعدنا التواصل معك', subtitle: 'تواصل معنا لاستفسارات القبول أو المعلومات العامة أو لتحديد موعد زيارة مدرستنا.' },
    info: {
      tag: 'موقعنا', title: 'تواصل معنا',
      items: [
        { icon: MapPin, label: 'العنوان', value: 'مبنى 1754، طريق 4627، مجمع 346، صار، البحرين' },
        { icon: Phone, label: 'الهاتف', value: '+973 1761 2221' },
        { icon: Mail, label: 'البريد الإلكتروني', value: 'info@afs.edu.bh' },
        { icon: Clock, label: 'ساعات العمل', value: 'الأحد – الخميس\n7:30 ص – 3:30 م' },
      ],
    },
    form: {
      tag: 'أرسل رسالة', title: 'نموذج الاتصال',
      fields: { name: 'الاسم الكامل', email: 'البريد الإلكتروني', phone: 'رقم الهاتف', subject: 'الموضوع', message: 'رسالتك', btn: 'أرسل الرسالة' },
      subjects: ['استفسار عام', 'القبول', 'الأكاديمية', 'جولة في المدرسة', 'أخرى'],
    },
    map: { tag: 'موقعنا', title: 'زورونا في صار' },
    sent: { title: 'تم الإرسال!', body: 'سنتواصل معك قريباً.' },
  },
}

const MSG_MAX = 500

export default function ContactPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [msgLen, setMsgLen] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: t.en.form.subjects[0], message: '' })
  const isRTL = lang === 'ar'
  const c = t[lang]
  useScrollReveal()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
      } else {
        setSubmitted(true)
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
      setLoading(false)
    }
  }

  const fieldClass = clsx('field', isRTL && 'text-right')
  const labelClass = clsx('mb-1.5 block text-xs font-semibold text-muted', isRTL && 'text-right')

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-canvas">
      <Header lang={lang} onLangChange={setLang} />
      <main>
        <PageHero tag={c.hero.tag} title={c.hero.title} subtitle={c.hero.subtitle} isRTL={isRTL} align="left" />

        {/* Info + Form */}
        <section className="section-padding bg-canvas">
          <div className="container-custom">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">

              {/* Info */}
              <div data-reveal="left">
                <SectionHeading tag={c.info.tag} title={c.info.title} align="left" isRTL={isRTL} className="mb-6" />
                <div className="space-y-4">
                  {c.info.items.map((item, i) => (
                    <div key={item.label} data-reveal data-delay={String(i * 70)} className={clsx('card flex items-start gap-4 p-5', isRTL && 'flex-row-reverse')}>
                      <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
                        <item.icon size={17} />
                      </span>
                      <div className={isRTL ? 'text-right' : ''}>
                        <div className="mb-1 text-xs font-bold uppercase tracking-wider text-faint">{item.label}</div>
                        <div className="whitespace-pre-line text-sm font-semibold text-ink" dir={item.icon === Phone ? 'ltr' : undefined}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div data-reveal="right">
                <SectionHeading tag={c.form.tag} title={c.form.title} align="left" isRTL={isRTL} className="mb-6" />
                {submitted ? (
                  <div className="card animate-scale-in p-10 text-center">
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-50 text-[#2E7D54]">
                      <CheckCircle size={28} />
                    </span>
                    <h3 className="mb-2 mt-4 font-display text-lg font-semibold text-ink">{c.sent.title}</h3>
                    <p className="text-sm text-muted">{c.sent.body}</p>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="f-name" className={labelClass}>{c.form.fields.name}</label>
                        <input id="f-name" type="text" required value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} className={fieldClass} />
                      </div>
                      <div>
                        <label htmlFor="f-email" className={labelClass}>{c.form.fields.email}</label>
                        <input id="f-email" type="email" required value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className={fieldClass} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="f-phone" className={labelClass}>{c.form.fields.phone}</label>
                      <input id="f-phone" type="tel" value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} className={fieldClass} />
                    </div>

                    <div>
                      <label htmlFor="f-subject" className={labelClass}>{c.form.fields.subject}</label>
                      <div className="relative">
                        <select id="f-subject" value={formData.subject}
                          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                          className={clsx(fieldClass, 'cursor-pointer appearance-none')}>
                          {c.form.subjects.map((s) => <option key={s}>{s}</option>)}
                        </select>
                        <ChevronDown size={15} className={clsx('pointer-events-none absolute top-1/2 -translate-y-1/2 text-faint', isRTL ? 'left-3' : 'right-3')} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="f-msg" className={labelClass}>{c.form.fields.message}</label>
                      <div className="relative">
                        <textarea id="f-msg" rows={5} required maxLength={MSG_MAX} value={formData.message}
                          onChange={(e) => { setMsgLen(e.target.value.length); setFormData(prev => ({ ...prev, message: e.target.value })) }}
                          className={clsx(fieldClass, 'resize-none')} />
                        <span className={clsx('absolute bottom-3 text-[10px] font-medium tabular-nums', msgLen > MSG_MAX * 0.9 ? 'text-[#C0392B]' : 'text-faint', isRTL ? 'left-3' : 'right-3')}>
                          {msgLen}/{MSG_MAX}
                        </span>
                      </div>
                    </div>

                    {error && (
                      <div className={clsx('flex items-start gap-3 rounded-xl border border-[#f3c9c4] bg-[#fdecea] p-4 text-sm text-[#C0392B]', isRTL && 'flex-row-reverse text-right')}>
                        <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <button type="submit" disabled={loading} className="btn-primary w-full py-4 disabled:cursor-not-allowed disabled:opacity-70">
                      {loading && <Loader2 size={16} className="animate-spin" />}
                      {c.form.fields.btn}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="section-padding dawn-soft">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-10">
              <SectionHeading tag={c.map.tag} title={c.map.title} isRTL={isRTL} />
            </div>
            <div data-reveal="scale" className="overflow-hidden rounded-2xl border border-line shadow-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.562!2d50.49152!3d26.21389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49af36e43e1c57%3A0x6b4b1b1de87f1a0b!2sSaar%2C%20Bahrain!5e0!3m2!1sen!2sbh!4v1700000000000!5m2!1sen!2sbh"
                width="100%"
                height="420"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Al Fajer School Location"
              />
            </div>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
