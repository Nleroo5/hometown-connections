import Container from '@/components/ui/Container'
import NewsCard from '@/components/content/NewsCard'
import Button from '@/components/ui/Button'
import { NewsPost } from '@/lib/types'

interface NewsSectionProps {
  posts: NewsPost[]
}

export default function NewsSection({ posts }: NewsSectionProps) {
  return (
    <section className="section">
      <Container>
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest News & Updates
            </h2>
            <p className="text-xl text-gray-600">
              Stay informed with the latest industry insights, company news, and member success stories.
            </p>
          </div>
          <div className="hidden lg:block">
            <Button href="/news" variant="outline">
              View All News
            </Button>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {posts.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="text-center lg:hidden">
          <Button href="/news" variant="outline">
            View All News
          </Button>
        </div>
      </Container>
    </section>
  )
}
