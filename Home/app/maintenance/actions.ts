'use server'

import sgMail from '@sendgrid/mail'

export type FormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>')
}

export async function sendContactEmail(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  const subject = (formData.get('subject') as string | null)?.trim() ?? ''
  const message = (formData.get('message') as string | null)?.trim() ?? ''

  if (!name || !email || !message) {
    return { status: 'error', message: 'Please fill in all required fields.' }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  const apiKey = process.env.SENDGRID_API_KEY
  const toEmail = process.env.SUPPORT_EMAIL
  const fromEmail = process.env.SENDGRID_FROM_EMAIL

  if (!apiKey || !toEmail || !fromEmail) {
    console.error('Missing env vars: SENDGRID_API_KEY, SUPPORT_EMAIL, or SENDGRID_FROM_EMAIL')
    return {
      status: 'error',
      message: 'Email service is not configured. Please try again later.',
    }
  }

  sgMail.setApiKey(apiKey)

  try {
    await sgMail.send({
      to: toEmail,
      from: fromEmail,
      replyTo: email,
      subject: subject ? `[ZIT Contact] ${subject}` : `[ZIT Contact] Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}${subject ? `\nSubject: ${subject}` : ''}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; color: #0C0C0C;">
          <div style="background: #000054; padding: 20px 24px;">
            <h2 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 800;">
              New message — Zongea Institute of Technology
            </h2>
          </div>
          <div style="padding: 24px; background: #f8f5ef; border: 1px solid #e5e1d8;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; color: #6B6660; width: 80px; vertical-align: top;">Name</td>
                <td style="padding: 8px 0;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; color: #6B6660; vertical-align: top;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #000054;">${escapeHtml(email)}</a></td>
              </tr>
              ${subject ? `<tr><td style="padding: 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; color: #6B6660; vertical-align: top;">Subject</td><td style="padding: 8px 0;">${escapeHtml(subject)}</td></tr>` : ''}
            </table>
            <div style="border-top: 2px solid #D4900A; padding-top: 20px;">
              <p style="white-space: pre-wrap; line-height: 1.7; margin: 0;">${escapeHtml(message)}</p>
            </div>
          </div>
          <div style="padding: 12px 24px; background: #ede9e0; font-size: 11px; color: #6B6660;">
            Sent from the Zongea Institute of Technology website contact form.
          </div>
        </div>
      `,
    })

    return { status: 'success' }
  } catch (err) {
    console.error('SendGrid error:', err)
    return {
      status: 'error',
      message: 'Failed to send your message. Please try again later.',
    }
  }
}
