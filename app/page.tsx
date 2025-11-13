import Hero from '@/components/sections/Hero'
import MissionStatement from '@/components/sections/MissionStatement'
import ServicesGrid from '@/components/sections/ServicesGrid'
import NewsSection from '@/components/sections/NewsSection'
import PartnersSection from '@/components/sections/PartnersSection'
import EventsSection from '@/components/sections/EventsSection'
import CTASection from '@/components/sections/CTASection'
import { getHomepageData } from '@/lib/sanity.queries'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  const data = await getHomepageData()

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Continuous Gradient Background Section */}
      <div className="bg-gradient-to-b from-white via-blue-50/40 to-blue-100/70">
        {/* Mission Statement Section */}
        <MissionStatement />

        {/* Services Section */}
        {data.services && data.services.length > 0 && (
          <ServicesGrid services={data.services} showAll={false} />
        )}
      </div>

      {/* News Section */}
      {data.featuredNews && data.featuredNews.length > 0 && (
        <NewsSection posts={data.featuredNews} />
      )}

      {/* Partners Section */}
      {data.partners && data.partners.length > 0 && (
        <PartnersSection partners={data.partners} />
      )}

      {/* Events Section */}
      {data.upcomingEvents && data.upcomingEvents.length > 0 && (
        <EventsSection events={data.upcomingEvents} />
      )}

      {/* CTA Section */}
      <CTASection />
    </>
  )
}
