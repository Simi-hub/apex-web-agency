import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// ─── Types ────────────────────────────────────────────────────────
export interface ContactPayload {
  name: string
  email: string
  company?: string
  service: string
  budget?: string
  message: string
}

type ValidationErrors = Partial<Record<keyof ContactPayload | 'general', string>>

// ─── Helpers ──────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validatePayload(body: Partial<ContactPayload>): ValidationErrors {
  const errors: ValidationErrors = {}
  if (!body.name?.trim())              errors.name    = 'Name is required.'
  if (!body.email?.trim())             errors.email   = 'Email is required.'
  else if (!EMAIL_RE.test(body.email)) errors.email   = 'Please enter a valid email address.'
  if (!body.service?.trim())           errors.service = 'Please select a service.'
  if (!body.message?.trim())           errors.message = 'Project brief is required.'
  else if (body.message.trim().length < 10)
                                       errors.message = 'Please provide a bit more detail (10+ characters).'
  return errors
}

// ─── Email templates ──────────────────────────────────────────────

/** HTML email sent to the agency inbox */
function agencyEmailHtml(p: ContactPayload): string {
  const safeMessage = p.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const rows = [
    ['Full Name', p.name],
    ['Email',     p.email],
    ['Company',   p.company || '—'],
    ['Service',   p.service],
    ['Budget',    p.budget  || '—'],
  ]
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>New Enquiry — Apex Web Agency</title></head>
<body style="margin:0;padding:0;background:#080808;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 20px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#141414;border-radius:8px;border:1px solid #2a2a2a;">
  <tr><td style="padding:36px 40px 28px;background:linear-gradient(135deg,#0e0e0e,#1a1600);border-bottom:1px solid rgba(201,162,39,0.2);">
    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#c9a227;font-weight:600;">Apex Web Agency</p>
    <h1 style="margin:0;font-size:22px;font-weight:300;color:#f5f5f5;">New Project Enquiry</h1>
  </td></tr>
  <tr><td style="padding:32px 40px;"><table width="100%" cellpadding="0" cellspacing="0">
    ${rows.map(([label, value]) =>
      `<tr><td style="padding:0 0 20px;">
        <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#6b6b7a;">${label}</p>
        <p style="margin:0;font-size:15px;color:#d4d4e0;">${value}</p>
      </td></tr>`
    ).join('')}
    <tr><td style="padding:20px 0 0;border-top:1px solid #2a2a2a;">
      <p style="margin:0 0 10px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#6b6b7a;">Project Brief</p>
      <p style="margin:0;font-size:15px;color:#d4d4e0;line-height:1.7;white-space:pre-wrap;">${safeMessage}</p>
    </td></tr>
  </table></td></tr>
  <tr><td style="padding:20px 40px 28px;border-top:1px solid #2a2a2a;">
    <p style="margin:0;font-size:11px;color:#6b6b7a;">Sent from the contact form at apexwebagency.com</p>
  </td></tr>
</table>
</td></tr></table></body></html>`
}

/** HTML auto-reply sent to the enquirer */
function autoReplyHtml(name: string): string {
  const firstName = name.split(' ')[0]
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>We received your message — Apex Web Agency</title></head>
<body style="margin:0;padding:0;background:#080808;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 20px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#141414;border-radius:8px;border:1px solid #2a2a2a;">
  <tr><td style="padding:36px 40px 28px;background:linear-gradient(135deg,#0e0e0e,#1a1600);border-bottom:1px solid rgba(201,162,39,0.2);">
    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#c9a227;font-weight:600;">Apex Web Agency</p>
    <h1 style="margin:0;font-size:22px;font-weight:300;color:#f5f5f5;">We&rsquo;ve received your message</h1>
  </td></tr>
  <tr><td style="padding:32px 40px;">
    <p style="margin:0 0 16px;font-size:15px;color:#d4d4e0;line-height:1.7;">Hi ${firstName},</p>
    <p style="margin:0 0 16px;font-size:15px;color:#a8a8b3;line-height:1.7;">
      Thank you for reaching out. We&rsquo;ve received your enquiry and a member of our team will be in touch within <strong style="color:#d4d4e0;">24 hours</strong>.
    </p>
    <p style="margin:0 0 32px;font-size:15px;color:#a8a8b3;line-height:1.7;">In the meantime, feel free to explore our work.</p>
    <a href="https://apexwebagency.com/#portfolio"
       style="display:inline-block;background:linear-gradient(135deg,#9a7a1a,#e8c04a,#9a7a1a);color:#080808;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;padding:14px 28px;border-radius:4px;">
      View Our Work
    </a>
  </td></tr>
  <tr><td style="padding:20px 40px 28px;border-top:1px solid #2a2a2a;">
    <p style="margin:0;font-size:12px;color:#6b6b7a;line-height:1.6;">
      Apex Web Agency &nbsp;|&nbsp; hello@apexwebagency.com<br/>
      <a href="https://apexwebagency.com" style="color:#c9a227;text-decoration:none;">apexwebagency.com</a>
    </p>
  </td></tr>
</table>
</td></tr></table></body></html>`
}

// ─── Route Handler ────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Parse
  let body: Partial<ContactPayload>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, errors: { general: 'Invalid request body.' } },
      { status: 400 }
    )
  }

  // 2. Validate
  const errors = validatePayload(body)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 422 })
  }

  const payload = body as ContactPayload

  // 3. Guard: API key must be configured
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[Contact] RESEND_API_KEY is not set.')
    return NextResponse.json(
      { success: false, errors: { general: 'Email service is not configured.' } },
      { status: 503 }
    )
  }

  // 4. Send via Resend
  const resend = new Resend(apiKey)
  const AGENCY_EMAIL = process.env.AGENCY_EMAIL ?? 'similoluwaodubajo@gmail.com'
  // Use your verified Resend domain in production.
  // While testing, 'onboarding@resend.dev' works without domain verification.
  const FROM_ADDRESS  = process.env.FROM_ADDRESS  ?? 'onboarding@resend.dev'

 try {
  const test = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'delivered@resend.dev',
    subject: 'TEST EMAIL',
    html: '<strong>This is a test email</strong>',
  })

  console.log('TEST RESULT:', test)

  return NextResponse.json({
    success: true,
    test,
  })
} catch (err) {
  console.error('EMAIL ERROR:', err)

  return NextResponse.json(
    {
      success: false,
      error: 'Email failed',
    },
    { status: 500 }
  )
}