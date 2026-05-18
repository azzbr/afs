import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Log submission (in production, add email sending via Resend/Nodemailer/SMTP here)
    console.log('Contact form submission:', { name, email, phone, subject, message, timestamp: new Date().toISOString() })

    // TODO: Add email sending here. Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'website@afs.edu.bh',
    //   to: 'info@afs.edu.bh',
    //   subject: `Website Contact: ${subject} from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\n${message}`,
    // })

    return NextResponse.json({ success: true, message: 'Message received' }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
