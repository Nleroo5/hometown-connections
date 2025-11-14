'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { Partner } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'

interface PartnersSectionProps {
  partners: Partner[]
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <section className="section bg-gray-50">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600">
            We collaborate with the best technology and service providers to deliver
            comprehensive solutions for your utility needs.
          </p>
        </div>

        {/* Partner Logos Grid */}
        <div
          className="relative overflow-hidden py-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {partners.map((partner) => (
              <Link
                key={partner._id}
                href={`/partners/${partner.slug.current}`}
                className="group"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center h-32">
                  <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                    <Image
                      src={urlFor(partner.logo).width(200).height(100).url()}
                      alt={partner.logo.alt || partner.companyName}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button href="/partners" variant="primary" size="lg">
            View All Partners
          </Button>
        </div>
      </Container>
    </section>
  )
}
