import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.client'
import type { NewsPost } from '@/lib/types'

interface NewsGridProps {
  posts: NewsPost[]
}

export default function NewsGrid({ posts }: NewsGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600">No news posts found.</p>
        <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link
          key={post._id}
          href={`/news/${post.slug.current}`}
          className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-secondary/20"
        >
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative h-48 bg-gray-200 overflow-hidden">
              <Image
                src={urlFor(post.featuredImage).width(600).height(400).url()}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Date */}
            <time className="text-sm text-gray-500 font-medium">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-secondary transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Read More */}
            <div className="mt-4 flex items-center text-secondary font-semibold group-hover:gap-2 transition-all">
              <span>Read More</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
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
          </div>
        </Link>
      ))}
    </div>
  )
}
