import { Metadata } from 'next'
import Link from 'next/link'
import { getAllServices } from '@/lib/sanity.queries'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Utility Solutions & Services | Hometown Connections',
  description: 'Comprehensive solutions for community-owned utilities including AMI, cybersecurity, operations, finance, and workforce development.',
}

interface Service {
  _id: string
  title: string
  slug: { current: string }
  category: string
  icon?: any
  shortDescription: string
}

const categoryColors: { [key: string]: string } = {
  'technology': 'from-blue-500 to-cyan-500',
  'business-strategy': 'from-purple-500 to-pink-500',
  'operations': 'from-green-500 to-emerald-500',
  'cybersecurity': 'from-red-500 to-orange-500',
  'customer-care': 'from-indigo-500 to-blue-500',
  'finance': 'from-yellow-500 to-orange-500',
  'workforce': 'from-teal-500 to-green-500',
}

export default async function ServicesPage() {
  const services: Service[] = await getAllServices()

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Utility Solutions
            </h1>
            <p className="text-xl text-white">
              Comprehensive services designed for the unique challenges of community-owned utilities
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                25+
              </div>
              <div className="text-white">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                8
              </div>
              <div className="text-white">Service Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                25
              </div>
              <div className="text-white">Affiliate Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                100%
              </div>
              <div className="text-white">Public Power Focus</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive range of solutions tailored for community-owned electric, water, gas, and wastewater utilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service._id}
                href={`/services/${service.slug.current}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Icon/Header */}
                <div
                  className={`h-32 bg-gradient-to-br ${
                    categoryColors[service.category] ||
                    'from-primary to-primary/80'
                  } flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                  <div className="relative z-10">
                    {service.icon ? (
                      <img
                        src={service.icon.asset?.url}
                        alt=""
                        className="w-16 h-16 object-contain"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {service.shortDescription}
                  </p>
                  <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                    <span>Learn More</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
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
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {services.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No services found. Please add services in Sanity Studio.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Utility?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Let's discuss how our solutions can help your community-owned utility succeed in today's evolving energy landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="/affiliates"
                className="inline-block bg-primary/20 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View Our Affiliates
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
