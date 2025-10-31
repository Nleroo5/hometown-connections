import { Metadata } from 'next'
import { getTeamMembers } from '@/lib/sanity.queries'
import Container from '@/components/ui/Container'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Our Team | Hometown Connections',
  description: 'Meet the dedicated team at Hometown Connections helping community-owned utilities succeed.',
}

interface TeamMember {
  _id: string
  name: string
  role: string
  photo?: any
  order: number
}

export default async function TeamPage() {
  const teamMembers: TeamMember[] = await getTeamMembers()

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
              Our Team
            </h1>
            <p className="text-xl text-gray-200">
              Meet the dedicated professionals helping community-owned utilities succeed across the nation
            </p>
          </div>
        </Container>
      </section>

      {/* Team Members Grid - MATCHES LIVE SITE: Only photo, name, and title */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
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
          {teamMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No team members found. Please add team members in Sanity Studio.
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
              Want to Work With Us?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our team is here to help your community-owned utility succeed. Get in touch to learn how we can support your organization.
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
    </main>
    <Footer />
    </>
  )
}
