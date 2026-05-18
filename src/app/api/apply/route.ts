import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { student, parent, documents, notes } = body

    if (!student?.firstName || !student?.lastName || !student?.dob || !student?.grade) {
      return NextResponse.json({ error: 'Missing required student information' }, { status: 400 })
    }
    if (!parent?.primaryPhone || !parent?.email) {
      return NextResponse.json({ error: 'Missing required parent information' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(parent.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const ref = `AFS-${Date.now().toString(36).toUpperCase()}`

    // Log submission — in production replace with Resend/Nodemailer/SMTP
    console.log('Application received:', {
      ref,
      student,
      parent,
      documents,
      notes,
      submittedAt: new Date().toISOString(),
    })

    // TODO: Send confirmation email to parent and notification to admissions team
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({ ... })

    return NextResponse.json({ success: true, ref }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
