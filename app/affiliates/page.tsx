import { client } from '@/lib/sanity.client'
import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Our Affiliates | Hometown Connections',
  description: 'Find Hometown Connections affiliates across the United States. Connect with local experts who understand your community.',
}

interface Contact {
  name: string
  title: string
  phone: string
  email: string
}

interface Address {
  street: string
  city: string
  state: string
  zipCode: string
}

interface Affiliate {
  _id: string
  organizationName: string
  address: Address
  primaryContact: Contact
  websiteUrl: string
  isCoOwner: boolean
  statesServed: string[]
  isActive: boolean
  description?: string
}

async function getAffiliates(): Promise<Affiliate[]> {
  const query = `*[_type == "affiliate" && isActive == true] | order(address.state asc, organizationName asc) {
    _id,
    organizationName,
    address,
    primaryContact,
    websiteUrl,
    isCoOwner,
    statesServed,
    isActive,
    description
  }`

  return client.fetch(query, {}, { next: { revalidate: 3600 } })
}

// US State abbreviations to full names
const STATE_NAMES: Record<string, string> = {
  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
  'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
  'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
  'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
  'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
  'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
  'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
  'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
  'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
  'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
  'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
  'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
  'WI': 'Wisconsin', 'WY': 'Wyoming'
}

export default async function AffiliatesPage() {
  const affiliates = await getAffiliates()

  // Group affiliates by state
  const affiliatesByState: Record<string, Affiliate[]> = {}
  affiliates.forEach(affiliate => {
    const state = affiliate.address.state
    if (!affiliatesByState[state]) {
      affiliatesByState[state] = []
    }
    affiliatesByState[state].push(affiliate)
  })

  const sortedStates = Object.keys(affiliatesByState).sort()

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-primary text-white pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                Our Affiliates
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed animate-fade-in">
                Connect with Hometown Connections affiliates across the United States. Our network of trusted partners delivers expertise and local knowledge.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 pt-8">
                <div className="text-center animate-fade-in">
                  <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">
                    {affiliates.length}
                  </div>
                  <div className="text-white/80 text-sm md:text-base">
                    Total Affiliates
                  </div>
                </div>
                <div className="text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
                  <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">
                    {sortedStates.length}
                  </div>
                  <div className="text-white/80 text-sm md:text-base">
                    States Served
                  </div>
                </div>
                <div className="text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">
                    {affiliates.filter(a => a.isCoOwner).length}
                  </div>
                  <div className="text-white/80 text-sm md:text-base">
                    Co-owners
                  </div>
                </div>
              </div>
            </div>
          </Container>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              <path
                d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        {/* Info Banner */}
        <section className="py-6 bg-white border-b border-gray-200">
          <Container>
            <div className="text-center">
              <p className="text-gray-600 text-sm md:text-base">
                <span className="text-accent font-bold">*</span> Denotes co-owner of Hometown Connections
              </p>
            </div>
          </Container>
        </section>

        {/* State Quick Navigation */}
        <section className="py-12 bg-gray-50">
          <Container>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Browse by State
              </h2>
              <p className="text-gray-600">
                Select a state to jump directly to affiliates in that region
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {sortedStates.map(stateCode => (
                <a
                  key={stateCode}
                  href={`#${stateCode}`}
                  className="inline-flex items-center justify-center px-4 py-2 bg-white hover:bg-primary hover:text-white text-gray-700 border border-gray-200 hover:border-primary rounded-lg transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
                >
                  {stateCode}
                </a>
              ))}
            </div>
          </Container>
        </section>

        {/* Affiliates by State */}
        <section className="section bg-white">
          <Container>
            <div className="space-y-16">
              {sortedStates.map((stateCode, stateIndex) => (
                <div
                  key={stateCode}
                  id={stateCode}
                  className="scroll-mt-24"
                >
                  <div className="mb-8">
                    <div className="flex items-center gap-4 mb-2">
                      <h2 className="text-3xl md:text-4xl font-bold text-primary">
                        {STATE_NAMES[stateCode] || stateCode}
                      </h2>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {affiliatesByState[stateCode].length} {affiliatesByState[stateCode].length === 1 ? 'Affiliate' : 'Affiliates'}
                      </span>
                    </div>
                    <div className="h-1 w-20 bg-gradient-to-r from-secondary to-accent rounded-full" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {affiliatesByState[stateCode].map((affiliate, index) => (
                      <div
                        key={affiliate._id}
                        className="card card-hover p-6 border border-gray-100 animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Header */}
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-start gap-2">
                            {affiliate.organizationName}
                            {affiliate.isCoOwner && (
                              <span className="text-accent text-2xl leading-none" title="Co-owner">*</span>
                            )}
                          </h3>
                        </div>

                        {/* Address */}
                        <div className="mb-4 text-gray-600">
                          <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div>
                              <p>{affiliate.address.street}</p>
                              <p>
                                {affiliate.address.city}, {affiliate.address.state}{' '}
                                {affiliate.address.zipCode}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Primary Contact */}
                        <div className="mb-4">
                          <p className="font-semibold text-gray-900 mb-1">
                            {affiliate.primaryContact.name}
                          </p>
                          <p className="text-sm text-gray-600 mb-3">
                            {affiliate.primaryContact.title}
                          </p>
                          <div className="space-y-2">
                            <a
                              href={`tel:${affiliate.primaryContact.phone.replace(/[^0-9+]/g, '')}`}
                              className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors group"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <span className="group-hover:underline">{affiliate.primaryContact.phone}</span>
                            </a>
                            <a
                              href={`mailto:${affiliate.primaryContact.email}`}
                              className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors group"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span className="group-hover:underline">{affiliate.primaryContact.email}</span>
                            </a>
                            <a
                              href={affiliate.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark transition-colors group"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                              </svg>
                              <span className="group-hover:underline">Visit Website</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="section bg-gradient-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          <Container className="relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Interested in Becoming an Affiliate?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join our network of trusted partners and help us empower community-owned utilities across the nation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  className="shadow-xl hover:shadow-2xl"
                >
                  Contact Us
                </Button>
                <Button
                  href="/about"
                  variant="outline"
                  size="lg"
                  className="bg-white/10 hover:bg-white hover:text-primary border-white/50 hover:border-white backdrop-blur-sm"
                >
                  Learn More About Us
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
