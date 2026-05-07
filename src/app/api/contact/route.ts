import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface ContactPayload {
  name: string
  email: string
  company?: string
  service: string
  budget?: string
  message: string
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json()

    const {
      name,
      email,
      service,
      message,
      company,
      budget,
    } = body

    // Validation
    const errors: Record<string, string> = {}

    if (!name?.trim()) {
      errors.name = 'Name is required.'
    }

    if (!email?.trim()) {
      errors.email = 'Email is required.'
    } else if (!validateEmail(email)) {
      errors.email = 'Invalid email address.'
    }

    if (!service?.trim()) {
      errors.service = 'Please select a service.'
    }

    if (!message?.trim()) {
      errors.message = 'Project brief is required.'
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors,
        },
        { status: 422 }
      )
    }

    // Send admin email
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'similoluwaodubajo@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Budget:</strong> ${budget || 'N/A'}</p>

        <h3>Message</h3>
        <p>${message}</p>
      `,
    })

    // Send auto reply
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'We received your message — Apex Web Agency',
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
          <h2>Hi ${name.split(' ')[0]},</h2>

          <p>
            Thank you for reaching out to Apex Web Agency.
          </p>

          <p>
            We've received your enquiry and a member of our team
            will get back to you within 24 hours.
          </p>

          <p>
            In the meantime, feel free to explore our recent work.
          </p>

          <br />

          <a
            href="https://apexwebagency.com"
            style="
              background:#000;
              color:#fff;
              padding:12px 20px;
              text-decoration:none;
              border-radius:6px;
              display:inline-block;
            "
          >
            Visit Website
          </a>

          <br /><br />

          <p>— Apex Web Agency</p>
        </div>
      `,
    })

    console.log('EMAIL RESULT:', result)

    console.log('[Contact Form] Submission received:', {
      name,
      email,
      service,
      company,
      budget,
      messageLength: message.length,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Message received. We'll be in touch within 24 hours.",
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('[Contact Form] Error:', err)

    return NextResponse.json(
      {
        success: false,
        errors: {
          general: 'Server error. Please try again.',
        },
      },
      { status: 500 }
    )
  }
}