import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  organization: string
  email: string
  phone?: string
  serviceInterest?: string
  message: string
  newsletter?: boolean
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactFormData = await req.json()

    // Validate required fields
    if (!body.name || !body.organization || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Send email using a service like SendGrid, Resend, or Nodemailer
    // 2. Save to database or CRM
    // 3. Send to Firebase, Airtable, or other backend

    // For now, just log the submission
    console.log('Contact form submission:', body)

    // Example: Send to an email service
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL,
    //   from: body.email,
    //   subject: `New Contact Form Submission from ${body.name}`,
    //   html: generateEmailHTML(body),
    // })

    // Example: Save to Firebase
    // await firebaseDB.collection('contacts').add({
    //   ...body,
    //   timestamp: new Date(),
    // })

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        error: 'Failed to submit form',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Helper function to generate email HTML
function generateEmailHTML(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #003E6B; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #003E6B; }
          .value { margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Organization:</div>
              <div class="value">${data.organization}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${data.email}</div>
            </div>
            ${data.phone ? `
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${data.phone}</div>
              </div>
            ` : ''}
            ${data.serviceInterest ? `
              <div class="field">
                <div class="label">Service Interest:</div>
                <div class="value">${data.serviceInterest}</div>
              </div>
            ` : ''}
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${data.message}</div>
            </div>
            ${data.newsletter ? `
              <div class="field">
                <div class="label">Newsletter Subscription:</div>
                <div class="value">Yes</div>
              </div>
            ` : ''}
          </div>
        </div>
      </body>
    </html>
  `
}
