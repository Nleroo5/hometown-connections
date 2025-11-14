import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Event } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import { formatDate, categoryToDisplayName } from '@/lib/utils'

interface EventsSectionProps {
  events: Event[]
}

export default function EventsSection({ events }: EventsSectionProps) {
  if (events.length === 0) return null

  return (
    <section className="section">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600">
            Join us for conferences, webinars, and training sessions designed to
            advance your utility operations.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {events.map((event) => (
            <Link key={event._id} href={event.registrationLink || '#'}>
              <Card hover padding="none" className="h-full overflow-hidden">
                {/* Featured Image */}
                {event.featuredImage && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={urlFor(event.featuredImage).width(600).height(400).url()}
                      alt={event.featuredImage.alt || event.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Event Type Badge */}
                  <Badge variant="accent" size="sm" className="mb-4">
                    {categoryToDisplayName(event.eventType)}
                  </Badge>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <time dateTime={event.startDate} className="text-sm font-medium">
                      {formatDate(event.startDate)}
                    </time>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    {event.isVirtual ? (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                        <span className="text-sm">Virtual Event</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
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
                        <span className="text-sm line-clamp-1">{event.location}</span>
                      </>
                    )}
                  </div>

                  {/* Registration CTA */}
                  {event.registrationLink && (
                    <Button
                      href={event.registrationLink}
                      variant="primary"
                      size="sm"
                      className="w-full"
                    >
                      Register Now
                    </Button>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>

      </Container>
    </section>
  )
}
