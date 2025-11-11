import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getService, getAllServices } from '@/lib/sanity.queries'
import Container from '@/components/ui/Container'
import { PortableText } from '@portabletext/react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const services = await getAllServices()
  return services.map((service: any) => ({
    slug: service.slug.current,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getService(params.slug)

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: service.seoTitle || `${service.title} | Hometown Connections`,
    description: service.seoDescription || service.shortDescription,
  }
}

// Portable Text components for rendering
const portableTextComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg md:text-xl font-bold text-gray-900 mt-6 mb-3">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 leading-relaxed mb-6">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="ml-4">{children}</li>,
    number: ({ children }: any) => <li className="ml-4">{children}</li>,
  },
}

export default async function ServicePage({ params }: Props) {
  const service = await getService(params.slug)

  if (!service) {
    notFound()
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white pt-8 pb-20 sm:pt-12 md:pt-16 md:pb-28">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <Container className="relative">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-white text-sm">
              <Link href="/" className="hover:text-secondary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/services" className="hover:text-secondary transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-white">{service.title}</span>
            </div>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {service.title}
            </h1>
            <p className="text-xl text-white leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Full Description */}
              {service.fullDescription && (
                <div className="mb-12">
                  <div className="text-gray-700">
                    <PortableText
                      value={service.fullDescription}
                      components={portableTextComponents}
                    />
                  </div>
                </div>
              )}

              {/* Key Benefits */}
              {service.keyBenefits && service.keyBenefits.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Key Benefits
                  </h2>
                  <div className="grid gap-4">
                    {service.keyBenefits.map((benefit: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-secondary rounded-full flex items-center justify-center mt-0.5">
                          <svg
                            className="w-4 h-4 text-white"
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
                        <p className="text-gray-700 flex-1 leading-relaxed">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Partners */}
              {service.relatedPartners && service.relatedPartners.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Our Partners for This Service
                  </h2>
                  <div className="grid gap-4">
                    {service.relatedPartners.map((partner: any) => (
                      <Link
                        key={partner.slug.current}
                        href={`/partners/${partner.slug.current}`}
                        className="flex items-center gap-6 p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all border border-gray-100 group"
                      >
                        {partner.logo && (
                          <div className="w-24 h-24 flex-shrink-0 bg-white rounded-lg p-2">
                            <img
                              src={partner.logo.asset?.url}
                              alt={partner.companyName}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                            {partner.companyName}
                          </h3>
                          {partner.description && (
                            <p className="text-gray-600 line-clamp-2">
                              {partner.description}
                            </p>
                          )}
                        </div>
                        <svg
                          className="w-6 h-6 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA Card */}
              <div className="bg-gradient-to-br from-primary to-primary/90 text-white p-8 rounded-xl shadow-xl sticky top-24">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Interested in This Service?
                </h3>
                <p className="text-white mb-6 leading-relaxed">
                  Let's discuss how we can help your utility succeed with {service.title.toLowerCase()}.
                </p>
                <a
                  href="/contact"
                  className="block w-full bg-white text-primary text-center px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors mb-4 shadow-md"
                >
                  Contact Us
                </a>
                <a
                  href="/services"
                  className="block w-full bg-primary/20 backdrop-blur-sm border-2 border-white text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  View All Services
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed">
              Contact us today to learn more about our {service.title.toLowerCase()} solutions and how we can support your utility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-md"
              >
                Contact Us
              </a>
              <a
                href="/affiliates"
                className="inline-block bg-primary/20 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Find an Affiliate
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
