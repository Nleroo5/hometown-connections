'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Container from '@/components/ui/Container'

// US States array
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
]

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  title: z.string().min(2, 'Title is required'),
  organization: z.string().min(2, 'Organization is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(1, 'Please select a state'),
  phone: z.string().regex(/^[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  contactMethod: z.enum(['phone', 'email'], { message: 'Please select a contact method' }),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  captcha: z.boolean().refine((val) => val === true, 'Please check the CAPTCHA box'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      contactMethod: 'email',
      captcha: false,
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white pt-8 pb-20 sm:pt-12 md:pt-16 md:pb-28">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="section bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-900 mb-1">Thank You!</h3>
                    <p className="text-green-800">
                      We've received your message and will contact you within one business day.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 sticky top-28">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Hometown Connections, Inc.
                  </h2>

                  <div className="space-y-6">
                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-secondary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                        <p className="text-gray-600 leading-relaxed">
                          651 Commerce Drive<br />
                          Roseville, CA 95678
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-secondary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                        <a
                          href="mailto:info@hometownconnections.com"
                          className="text-secondary hover:text-secondary-dark transition-colors"
                        >
                          info@hometownconnections.com
                        </a>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-secondary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Response Time</h3>
                        <p className="text-gray-600">
                          Within one business day
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name and Title Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-secondary'
                        } focus:outline-none focus:ring-2 transition-colors`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Title <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        {...register('title')}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-secondary'
                        } focus:outline-none focus:ring-2 transition-colors`}
                        placeholder="Manager"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Organization */}
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                      Organization <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="organization"
                      {...register('organization')}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.organization ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-secondary'
                      } focus:outline-none focus:ring-2 transition-colors`}
                      placeholder="Your Utility Company"
                    />
                    {errors.organization && (
                      <p className="mt-1 text-sm text-red-600">{errors.organization.message}</p>
                    )}
                  </div>

                  {/* City and State Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* City */}
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                        City <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        {...register('city')}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-secondary'
                        } focus:outline-none focus:ring-2 transition-colors`}
                        placeholder="Sacramento"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                      )}
                    </div>

                    {/* State */}
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                        State <span className="text-accent">*</span>
                      </label>
                      <select
                        id="state"
                        {...register('state')}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-secondary'
                        } focus:outline-none focus:ring-2 transition-colors`}
                      >
                        <option value="">Please Select</option>
                        {US_STATES.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone <span className="text-accent">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register('phone')}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-secondary'
                        } focus:outline-none focus:ring-2 transition-colors`}
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-secondary'
                        } focus:outline-none focus:ring-2 transition-colors`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Contact Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Please contact me by: <span className="text-accent">*</span>
                    </label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="phone"
                          {...register('contactMethod')}
                          className="w-4 h-4 text-secondary focus:ring-secondary border-gray-300"
                        />
                        <span className="text-gray-700">Phone</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="email"
                          {...register('contactMethod')}
                          className="w-4 h-4 text-secondary focus:ring-secondary border-gray-300"
                        />
                        <span className="text-gray-700">Email</span>
                      </label>
                    </div>
                    {errors.contactMethod && (
                      <p className="mt-1 text-sm text-red-600">{errors.contactMethod.message}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      {...register('subject')}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-secondary'
                      } focus:outline-none focus:ring-2 transition-colors`}
                      placeholder="How can we assist you?"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      How can we help you? <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      {...register('message')}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-secondary'
                      } focus:outline-none focus:ring-2 transition-colors resize-none`}
                      placeholder="Please describe your needs or questions..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  {/* CAPTCHA */}
                  <div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register('captcha')}
                          className="w-5 h-5 text-secondary focus:ring-secondary border-gray-300 rounded mt-0.5"
                        />
                        <span className="text-sm text-gray-700">
                          Please help us stop SPAM by checking this box to confirm you're human
                        </span>
                      </label>
                      {errors.captcha && (
                        <p className="mt-2 text-sm text-red-600">{errors.captcha.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm text-red-800">
                        There was an error submitting your form. Please try again or email us directly at{' '}
                        <a href="mailto:info@hometownconnections.com" className="font-semibold underline">
                          info@hometownconnections.com
                        </a>
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-8 py-4 rounded-lg bg-accent hover:bg-accent-dark text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
