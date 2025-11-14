import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import { PortableText } from '@portabletext/react'
import { getNewsPost, getAllNewsPosts } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.client'
import type { NewsPost, Service, Partner } from '@/lib/types'

export const revalidate = 60

interface NewsPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const newsData = await getAllNewsPosts({ perPage: 1000 })
  return newsData.posts.map((post: NewsPost) => ({
    slug: post.slug.current,
  }))
}

export async function generateMetadata({ params }: NewsPostPageProps): Promise<Metadata> {
  const post = await getNewsPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.seoTitle || `${post.title} | Hometown Connections`,
    description: post.seoDescription || post.excerpt,
  }
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const post = await getNewsPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white pt-20 pb-16 sm:pt-24 md:pt-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <Container className="relative">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link
                href="/news"
                className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to News
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <time className="text-lg">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
              {post.author && (
                <>
                  <span className="text-white/50">•</span>
                  <span>By {post.author.name}</span>
                </>
              )}
              {post.category && (
                <>
                  <span className="text-white/50">•</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    {post.category.replace('-', ' ')}
                  </span>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="section bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {post.featuredImage && (
              <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-12 shadow-xl">
                <Image
                  src={urlFor(post.featuredImage).width(1200).height(800).url()}
                  alt={post.featuredImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Article Body */}
            <article className="prose prose-lg max-w-none">
              {post.body && <PortableText value={post.body} />}
            </article>

            {/* Related Services */}
            {post.relatedServices && post.relatedServices.length > 0 && (
              <div className="mt-16 pt-12 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Related Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {post.relatedServices.map((service: Service) => (
                    <Link
                      key={service._id}
                      href={`/services/${service.slug.current}`}
                      className="group p-6 bg-gray-50 rounded-lg hover:bg-secondary/5 hover:border-secondary/20 border border-gray-200 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-secondary transition-colors mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {service.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Partners */}
            {post.relatedPartners && post.relatedPartners.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Featured Partners
                </h2>
                <div className="flex flex-wrap gap-4">
                  {post.relatedPartners.map((partner: Partner) => (
                    <Link
                      key={partner._id}
                      href={`/partners/${partner.slug.current}`}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-secondary hover:bg-secondary/5 transition-colors text-gray-700 hover:text-secondary font-medium"
                    >
                      {partner.companyName}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to News */}
            <div className="mt-16 pt-12 border-t border-gray-200">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-secondary hover:text-secondary-dark font-semibold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All News
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
