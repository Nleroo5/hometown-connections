import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPartner, getAllPartners } from '@/lib/sanity.queries'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { PortableText } from '@portabletext/react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const partners = await getAllPartners()
  return partners.map((partner: any) => ({
    slug: partner.slug.current,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const partner = await getPartner(params.slug)

  if (!partner) {
    return {
      title: 'Partner Not Found',
    }
  }

  return {
    title: `${partner.companyName} | Partners | Hometown Connections`,
    description: partner.description,
  }
}

// Portable Text components for rendering
const portableTextComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-6 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 leading-relaxed mb-4">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
        {children}
      </ul>
    ),
  },
}

export default async function PartnerPage({ params }: Props) {
  const partner = await getPartner(params.slug)

  if (!partner) {
    notFound()
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <Container className="relative">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-white text-sm">
              <Link href="/" className="hover:text-secondary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/partners" className="hover:text-secondary transition-colors">
                Partners
              </Link>
              <span>/</span>
              <span className="text-white">{partner.companyName}</span>
            </div>
          </div>

          <div className="max-w-4xl">
            {/* Partner Logo */}
            {partner.logo?.asset?.url && (
              <div className="mb-6 bg-white/10 backdrop-blur-sm rounded-lg p-6 inline-block">
                <img
                  src={partner.logo.asset.url}
                  alt={partner.logo.alt || partner.companyName}
                  className="h-24 w-auto object-contain"
                />
              </div>
            )}

            {/* Partner Name */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {partner.companyName}
            </h1>

            {/* Tagline */}
            {partner.tagline && (
              <p className="text-2xl text-white mb-6">
                {partner.tagline}
              </p>
            )}

            {/* Short Description */}
            <p className="text-xl text-white leading-relaxed">
              {partner.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Column */}
            <div className="lg:col-span-2">
              {/* Full Description */}
              {partner.fullDescription && partner.fullDescription.length > 0 && (
                <div className="prose prose-lg max-w-none mb-12">
                  <PortableText
                    value={partner.fullDescription}
                    components={portableTextComponents}
                  />
                </div>
              )}

              {/* Key Features/Highlights */}
              {partner.keyFeatures && partner.keyFeatures.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Key Features & Services
                  </h2>
                  <ul className="space-y-3">
                    {partner.keyFeatures.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Services Provided */}
              {partner.servicesProvided && partner.servicesProvided.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Services Offered
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {partner.servicesProvided.map((service: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonials */}
              {partner.testimonials && partner.testimonials.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Client Testimonials
                  </h2>
                  <div className="space-y-6">
                    {partner.testimonials.map((testimonial: any, index: number) => (
                      <div key={index} className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-xl border-l-4 border-secondary">
                        <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                        <div className="text-sm">
                          <p className="font-semibold text-gray-900">{testimonial.author}</p>
                          {testimonial.authorTitle && (
                            <p className="text-gray-600">{testimonial.authorTitle}</p>
                          )}
                          {testimonial.company && (
                            <p className="text-gray-600">{testimonial.company}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Clients List */}
              {partner.clients && partner.clients.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Notable Clients
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {partner.clients.map((client: string, index: number) => (
                      <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {client}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Video */}
              {partner.videoUrl && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Featured Video
                  </h2>
                  <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                    <iframe
                      src={partner.videoUrl.replace('watch?v=', 'embed/')}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Card */}
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 mb-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>

                {/* Primary Contact */}
                {partner.contactPerson && (
                  <div className="mb-6">
                    {partner.contactPerson.photo?.asset?.url && (
                      <img
                        src={partner.contactPerson.photo.asset.url}
                        alt={partner.contactPerson.name}
                        className="w-20 h-20 rounded-full object-cover mb-3"
                      />
                    )}
                    <p className="font-semibold text-gray-900">{partner.contactPerson.name}</p>
                    {partner.contactPerson.title && (
                      <p className="text-sm text-gray-600 mb-2">{partner.contactPerson.title}</p>
                    )}
                    {partner.contactPerson.email && (
                      <a href={`mailto:${partner.contactPerson.email}`} className="text-sm text-primary hover:underline block mb-1">
                        {partner.contactPerson.email}
                      </a>
                    )}
                    {partner.contactPerson.phone && (
                      <a href={`tel:${partner.contactPerson.phone}`} className="text-sm text-primary hover:underline block">
                        {partner.contactPerson.phone}
                      </a>
                    )}
                  </div>
                )}

                {/* Additional Contacts */}
                {partner.additionalContacts && partner.additionalContacts.length > 0 && (
                  <div className="mb-6 pt-6 border-t border-gray-200">
                    {partner.additionalContacts.map((contact: any, index: number) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <p className="font-semibold text-gray-900">{contact.name}</p>
                        {contact.title && (
                          <p className="text-sm text-gray-600 mb-1">{contact.title}</p>
                        )}
                        {contact.email && (
                          <a href={`mailto:${contact.email}`} className="text-sm text-primary hover:underline block">
                            {contact.email}
                          </a>
                        )}
                        {contact.phone && (
                          <a href={`tel:${contact.phone}`} className="text-sm text-primary hover:underline block">
                            {contact.phone}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Company Address */}
                {partner.companyAddress && (
                  <div className="mb-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-line">{partner.companyAddress}</p>
                  </div>
                )}

                {/* Website Button */}
                {partner.website && (
                  <Button href={partner.website} variant="primary" fullWidth className="mb-4" target="_blank">
                    Visit Website
                  </Button>
                )}

                {/* Contact HTC */}
                <Button href="/contact" variant="outline" fullWidth>
                  Contact Hometown Connections
                </Button>
              </div>

              {/* Statistics */}
              {partner.statistics && partner.statistics.length > 0 && (
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Statistics</h3>
                  <div className="space-y-4">
                    {partner.statistics.map((stat: any, index: number) => (
                      <div key={index}>
                        <div className="text-3xl font-bold text-primary">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              {partner.resources && partner.resources.length > 0 && (
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Resources & Downloads</h3>
                  <div className="space-y-3">
                    {partner.resources.map((resource: any, index: number) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                      >
                        <div className="flex-shrink-0">
                          {resource.type === 'PDF' && (
                            <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                          )}
                          {resource.type === 'Video' && (
                            <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                            </svg>
                          )}
                          {resource.type === 'Link' && (
                            <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                            </svg>
                          )}
                          {(resource.type === 'Webinar' || resource.type === 'Case Study') && (
                            <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                            {resource.title}
                          </p>
                          <p className="text-xs text-gray-500">{resource.type}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Back to Partners CTA */}
      <section className="py-12 bg-gray-50">
        <Container>
          <div className="text-center">
            <Button href="/partners" variant="outline" size="lg">
              ← Back to All Partners
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
