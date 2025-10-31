import Link from 'next/link'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { Service } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import { categoryToDisplayName } from '@/lib/utils'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.slug.current}`} className="group">
      <Card hover padding="lg" className="h-full group-hover:border-accent/20">
        <div className="flex flex-col h-full">
          {/* Icon */}
          {service.icon && (
            <div className="mb-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center p-3 group-hover:bg-secondary/20 transition-colors">
                <Image
                  src={urlFor(service.icon).width(64).height(64).url()}
                  alt={service.title}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
            {service.shortDescription}
          </p>

          {/* CTA Link */}
          <div className="flex items-center text-secondary font-medium group-hover:text-accent">
            <span className="group-hover:mr-2 transition-all">Learn More</span>
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
      </Card>
    </Link>
  )
}
