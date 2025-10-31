import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
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
      <Header siteSettings={data.siteSettings} />
      <main className="pt-20">
        {/* Hero Section */}
        <Hero />

        {/* Services Section */}
        {data.services && data.services.length > 0 && (
          <ServicesGrid services={data.services} showAll={false} />
        )}

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
      </main>
      <Footer />
    </>
  )
}
