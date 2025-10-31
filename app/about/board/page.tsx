import { Metadata } from 'next'
import { getBoardMembers } from '@/lib/sanity.queries'
import Container from '@/components/ui/Container'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Board Members | Hometown Connections',
  description: 'Meet the Hometown Connections Board of Directors.',
}

interface BoardMember {
  _id: string
  name: string
  role: string
  photo?: any
  order: number
}

export default async function BoardPage() {
  const boardMembers: BoardMember[] = await getBoardMembers()

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-futuristic text-white py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Board Members
            </h1>
            <p className="text-xl text-gray-200">
              Our Board of Directors provides strategic leadership and governance for Hometown Connections
            </p>
          </div>
        </Container>
      </section>

      {/* Board Members Grid - MATCHES LIVE SITE: Only photo, name, and title */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {boardMembers.map((member) => (
              <div
                key={member._id}
                className="text-center group"
              >
                {/* Photo */}
                <div className="mb-4 overflow-hidden rounded-lg aspect-square bg-gray-100 border-2 border-gray-200 group-hover:border-secondary/30 transition-all">
                  {member.photo?.asset?.url ? (
                    <img
                      src={member.photo.asset.url}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary/10 to-accent/10">
                      <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center">
                        <span className="text-3xl font-bold text-secondary">
                          {member.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .substring(0, 2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Name - ONLY NAME AND TITLE, NOTHING ELSE */}
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-accent transition-colors">
                  {member.name}
                </h3>

                {/* Title */}
                <p className="text-sm text-gray-600 mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {boardMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No board members found. Please add board members in Sanity Studio.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Learn More About Hometown Connections
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover how our organization serves community-owned utilities across the nation with strategic solutions and partnerships.
            </p>
            <a
              href="/about"
              className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              About Us
            </a>
          </div>
        </Container>
      </section>
    </main>
    <Footer />
    </>
  )
}
