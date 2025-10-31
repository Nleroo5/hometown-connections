import Container from '@/components/ui/Container'
import ServiceCard from '@/components/content/ServiceCard'
import Button from '@/components/ui/Button'
import { Service } from '@/lib/types'

interface ServicesGridProps {
  services: Service[]
  showAll?: boolean
}

export default function ServicesGrid({ services, showAll = true }: ServicesGridProps) {
  const displayServices = showAll ? services : services.slice(0, 6)

  return (
    <section className="section bg-gray-50">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Solutions for Public Power
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            We provide end-to-end services to help community-owned utilities operate
            efficiently, securely, and sustainably.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayServices.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>

        {/* View All CTA */}
        {!showAll && services.length > 6 && (
          <div className="text-center">
            <Button href="/services" size="lg">
              View All Services
            </Button>
          </div>
        )}
      </Container>
    </section>
  )
}
