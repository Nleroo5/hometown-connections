import Container from '@/components/ui/Container'
import Link from 'next/link'

export default function FeaturedServices() {
  const featuredServices = [
    {
      title: 'Business Strategy',
      description: 'Strategic planning and business development solutions tailored for community-owned utilities.',
      slug: 'business-strategy',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: 'Advanced Metering Infrastructure',
      description: 'Modern metering solutions to optimize utility operations and enhance customer service.',
      slug: 'advanced-metering-infrastructure',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
    },
    {
      title: 'Cybersecurity Services',
      description: 'Comprehensive security solutions to protect your utility infrastructure and customer data.',
      slug: 'cybersecurity-services',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="section bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <Link
              key={index}
              href={`/services/${service.slug}`}
              className="group card card-hover p-8 bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-secondary/50 transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-20 h-20 bg-secondary/10 rounded-xl mb-6 mx-auto group-hover:bg-secondary/20 transition-colors duration-300">
                <div className="text-secondary">
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-secondary transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-center leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Learn More Link */}
              <div className="flex items-center justify-center gap-2 text-secondary font-semibold group-hover:gap-3 transition-all duration-300">
                <span>Learn More</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
