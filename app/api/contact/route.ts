import { NextResponse } from 'next/server'
import { z } from 'zod'

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2),
  title: z.string().min(2).optional(),
  organization: z.string().min(2),
  city: z.string().min(2).optional(),
  state: z.string().min(1).optional(),
  phone: z.string(),
  email: z.string().email(),
  contactMethod: z.enum(['phone', 'email']).optional(),
  subject: z.string().min(3).optional(),
  message: z.string().min(10),
  captcha: z.boolean().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = contactSchema.parse(body)

    // TODO: Implement your email service here
    // Options:
    // 1. Send email via SendGrid, Resend, AWS SES
    // 2. Save to database
    // 3. Send to CRM (HubSpot, Salesforce)
    // 4. Save to Sanity CMS

    // For now, we'll just log the data
    console.log('Contact form submission:', validatedData)

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Form submitted successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.issues,
        },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your request',
      },
      { status: 500 }
    )
  }
}
