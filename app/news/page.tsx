import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import NewsGrid from '@/components/news/NewsGrid'
import NewsFilters from '@/components/news/NewsFilters'
import NewsPagination from '@/components/news/NewsPagination'
import { getAllNewsPosts, getNewsFiltersData } from '@/lib/sanity.queries'

export const metadata: Metadata = {
  title: 'Industry News for Community-owned Utilities | Hometown Connections',
  description: 'Stay informed with the latest news, updates, and insights from Hometown Connections and our partners serving community-owned utilities.',
}

export const revalidate = 60 // Revalidate every 60 seconds

interface NewsPageProps {
  searchParams: {
    page?: string
    solution?: string
    partner?: string
  }
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const page = Number(searchParams.page) || 1
  const utilitySolution = searchParams.solution
  const partner = searchParams.partner

  // Fetch news posts with filters
  const newsData = await getAllNewsPosts({
    page,
    perPage: 10,
    utilitySolution,
    partner,
  })

  // Fetch filter options
  const filtersData = await getNewsFiltersData()

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white pt-20 pb-20 sm:pt-24 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              News & Updates
            </h1>
            <p className="text-xl text-white/90">
              Industry news and insights for community-owned utilities
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="section bg-white">
        <Container>
          {/* Filters */}
          <NewsFilters partners={filtersData.partners} />

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {newsData.posts.length} of {newsData.totalPosts} posts
              {(utilitySolution || partner) && (
                <span className="font-semibold"> (filtered)</span>
              )}
            </p>
          </div>

          {/* News Grid */}
          <NewsGrid posts={newsData.posts} />

          {/* Pagination */}
          <NewsPagination
            currentPage={newsData.currentPage}
            totalPages={newsData.totalPages}
            hasNextPage={newsData.hasNextPage}
            hasPrevPage={newsData.hasPrevPage}
          />
        </Container>
      </section>

      {/* Contact Section */}
      <section className="section bg-gray-50">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                Contact Hometown Connections
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Have questions or want to learn more? Get in touch with our team.
              </p>

              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-700">
                    <span className="font-semibold">Email:</span>{' '}
                    <a href="mailto:info@hometownconnections.com" className="text-secondary hover:underline">
                      info@hometownconnections.com
                    </a>
                  </p>
                  <p className="text-gray-700 mt-2">
                    <span className="font-semibold">Phone:</span>{' '}
                    <a href="tel:704-336-9114" className="text-secondary hover:underline">
                      704-336-9114
                    </a>
                  </p>
                </div>

                <div className="pt-6">
                  <a
                    href="/contact"
                    className="block w-full px-8 py-4 rounded-lg bg-accent hover:bg-accent-dark text-white font-medium transition-colors text-center"
                  >
                    Send Us a Message
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
