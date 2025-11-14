import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPartners } from '@/lib/sanity.queries'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Partners | Hometown Connections',
  description: 'Hometown Connections partners with leading industry vendors to provide innovative solutions in a cost-effective manner to meet the unique needs of community-owned utilities.',
}

interface Partner {
  _id: string
  companyName: string
  slug: { current: string }
  description: string
  logo?: any
  order: number
}

export default async function PartnersPage() {
  const partners: Partner[] = await getAllPartners()

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white pt-8 pb-20 sm:pt-12 md:pt-16 md:pb-28">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
              Partners
            </h1>
            <p className="text-xl text-white leading-relaxed">
              Hometown Connections partners with leading industry vendors to provide innovative solutions in a cost-effective manner to meet the unique needs of community-owned utilities. Each partner is thoroughly vetted to ensure quality and reliability.
            </p>
          </div>
        </Container>
      </section>

      {/* Partners Grid */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {partners.map((partner) => (
              <Link
                key={partner._id}
                href={`/partners/${partner.slug.current}`}
                className="group p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-secondary hover:shadow-xl transition-all duration-300"
              >
                {/* Partner Logo Placeholder */}
                {partner.logo?.asset?.url ? (
                  <div className="mb-4 h-20 flex items-center justify-center">
                    <img
                      src={partner.logo.asset.url}
                      alt={partner.logo.alt || partner.companyName}
                      className="max-h-20 w-auto object-contain"
                    />
                  </div>
                ) : (
                  <div className="mb-4 h-20 flex items-center justify-center bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg">
                    <span className="text-2xl font-bold text-secondary">
                      {partner.companyName
                        .split(' ')
                        .map((word) => word[0])
                        .join('')
                        .substring(0, 3)
                        .toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Partner Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {partner.companyName}
                </h3>

                {/* Partner Description */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {partner.description}
                </p>

                {/* Arrow Icon */}
                <div className="mt-4 flex items-center text-secondary group-hover:text-primary transition-colors">
                  <span className="text-sm font-semibold">Learn more</span>
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {partners.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No partners found. Please add partners in Sanity Studio.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Interested in Partnering With Us?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Join our network of trusted partners helping community-owned utilities succeed. Contact us to learn more about partnership opportunities.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
