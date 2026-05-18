'use client'

import { useState } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { MapPin, Phone, Mail, Clock, Sparkles, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const t = {
  en: {
    hero: { tag: 'Contact Us', title: "We'd Love to", titleAccent: 'Hear From You', subtitle: 'Reach out to us for admissions enquiries, general information, or to schedule a visit to our campus.' },
    info: {
      tag: 'Find Us', title: 'Get in Touch',
      items: [
        { icon: MapPin, label: 'Address',      value: 'Building 1754, Road 4627, Block 346, Saar, Bahrain', color: 'from-brand-blue to-blue-700' },
        { icon: Phone,  label: 'Phone',        value: '+973 1761 2221',                                      color: 'from-emerald-500 to-teal-600' },
        { icon: Mail,   label: 'Email',        value: 'info@afs.edu.bh',                                     color: 'from-amber-400 to-orange-500' },
        { icon: Clock,  label: 'Office Hours', value: 'Sunday – Thursday\n7:30 AM – 3:30 PM',                color: 'from-violet-500 to-purple-600' },
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
    hero: { tag: 'تواصل معنا', title: 'يسعدنا', titleAccent: 'التواصل معك', subtitle: 'تواصل معنا لاستفسارات القبول أو المعلومات العامة أو لتحديد موعد زيارة مدرستنا.' },
    info: {
      tag: 'موقعنا', title: 'تواصل معنا',
      items: [
        { icon: MapPin, label: 'العنوان',          value: 'مبنى 1754، طريق 4627، مجمع 346، صار، البحرين', color: 'from-brand-blue to-blue-700' },
        { icon: Phone,  label: 'الهاتف',           value: '+973 1761 2221',                                 color: 'from-emerald-500 to-teal-600' },
        { icon: Mail,   label: 'البريد الإلكتروني', value: 'info@afs.edu.bh',                               color: 'from-amber-400 to-orange-500' },
        { icon: Clock,  label: 'ساعات العمل',      value: 'الأحد – الخميس\n7:30 ص – 3:30 م',              color: 'from-violet-500 to-purple-600' },
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
  const [focused, setFocused] = useState<string | null>(null)
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

  const inputBase = (f: string, extra = '') =>
    clsx(
      'w-full px-4 pt-6 pb-2 rounded-xl border text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-blue/15 transition-all duration-200 bg-white',
      focused === f ? 'border-brand-blue' : 'border-neutral-200 hover:border-neutral-300',
      isRTL && 'text-right',
      extra,
    )

  const labelBase = clsx('absolute top-2 text-[10px] font-bold uppercase tracking-wide text-brand-blue pointer-events-none px-4', isRTL ? 'right-0' : 'left-0')

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

        {/* ── Info + Form ── */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-25 pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

              {/* Contact Info */}
              <div data-reveal="left">
                <span className="section-tag">{c.info.tag}</span>
                <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.info.title}</h2>
                <div className="space-y-4 mt-6">
                  {c.info.items.map((item, i) => (
                    <div
                      key={item.label}
                      data-reveal
                      data-delay={String(i * 90)}
                      className={clsx('group flex items-start gap-4 p-5 rounded-2xl bg-white border border-neutral-100 hover:border-brand-blue/20 hover:shadow-[0_12px_40px_rgba(0,40,255,0.07)] transition-all duration-400 hover:-translate-y-0.5 overflow-hidden relative', isRTL && 'flex-row-reverse')}
                    >
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                      <div className={clsx('w-11 h-11 rounded-2xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300', item.color)}>
                        <item.icon size={17} className="text-white" />
                      </div>
                      <div className={isRTL ? 'text-right' : ''}>
                        <div className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">{item.label}</div>
                        <div className="text-sm font-semibold text-neutral-800 whitespace-pre-line">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div data-reveal="right">
                <span className="section-tag">{c.form.tag}</span>
                <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.form.title}</h2>

                {submitted ? (
                  <div className="mt-6 rounded-3xl p-10 bg-white border border-neutral-100 text-center animate-scale-in">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                      <Mail size={28} className="text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-neutral-900 text-lg mb-2">{c.sent.title}</h3>
                    <p className="text-neutral-500 text-sm">{c.sent.body}</p>
                  </div>
                ) : (
                  <form className="mt-6 space-y-4" onSubmit={handleSubmit}>

                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <input id="f-name" type="text" required placeholder=" "
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                          className={inputBase('name')} />
                        <label htmlFor="f-name" className={labelBase}>{c.form.fields.name}</label>
                      </div>
                      <div className="relative">
                        <input id="f-email" type="email" required placeholder=" "
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                          className={inputBase('email')} />
                        <label htmlFor="f-email" className={labelBase}>{c.form.fields.email}</label>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <input id="f-phone" type="tel" placeholder=" "
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
                        className={inputBase('phone')} />
                      <label htmlFor="f-phone" className={labelBase}>{c.form.fields.phone}</label>
                    </div>

                    {/* Subject */}
                    <div className="relative">
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                        className={clsx(inputBase('subject', 'appearance-none cursor-pointer'))}
                      >
                        {c.form.subjects.map((s) => <option key={s}>{s}</option>)}
                      </select>
                      <label className={labelBase}>{c.form.fields.subject}</label>
                      <ChevronDown size={14} className={clsx('absolute top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none', isRTL ? 'left-4' : 'right-4')} />
                    </div>

                    {/* Message + char counter */}
                    <div className="relative">
                      <textarea id="f-msg" rows={5} required maxLength={MSG_MAX} placeholder=" "
                        value={formData.message}
                        onFocus={() => setFocused('msg')} onBlur={() => setFocused(null)}
                        onChange={(e) => { setMsgLen(e.target.value.length); setFormData(prev => ({ ...prev, message: e.target.value })) }}
                        className={clsx(inputBase('msg', 'pt-7 resize-none'))} />
                      <label htmlFor="f-msg" className={labelBase}>{c.form.fields.message}</label>
                      <span className={clsx(
                        'absolute bottom-3 text-[10px] font-medium tabular-nums',
                        msgLen > MSG_MAX * 0.9 ? 'text-red-400' : 'text-neutral-400',
                        isRTL ? 'left-4' : 'right-4',
                      )}>
                        {msgLen}/{MSG_MAX}
                      </span>
                    </div>

                    {error && (
                      <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9v4a1 1 0 102 0V9a1 1 0 10-2 0zm0-4a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
                        </svg>
                        <span>{error}</span>
                      </div>
                    )}

                    <button type="submit" disabled={loading} className="shimmer-btn ripple-btn w-full py-4 bg-brand-blue text-white font-bold rounded-xl text-sm hover:bg-brand-blue-dark hover:shadow-[0_8px_30px_rgba(0,40,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {loading && (
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      )}
                      {c.form.fields.btn}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Map ── */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className={clsx('mb-10', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag mx-auto">{c.map.tag}</span>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.map.title}</h2>
            </div>
            <div data-reveal="scale" className="rounded-3xl overflow-hidden border border-neutral-200 shadow-[0_8px_40px_rgba(0,0,0,0.07)] hover:shadow-[0_16px_60px_rgba(0,40,255,0.1)] transition-shadow duration-500">
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