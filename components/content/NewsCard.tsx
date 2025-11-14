import Link from 'next/link'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { NewsPost } from '@/lib/types'
import { urlFor } from '@/lib/sanity.client'
import { formatDateShort, categoryToDisplayName, calculateReadTime } from '@/lib/utils'

interface NewsCardProps {
  post: NewsPost
}

export default function NewsCard({ post }: NewsCardProps) {
  const readTime = post.body ? calculateReadTime(JSON.stringify(post.body)) : 5

  return (
    <Link href={`/news/${post.slug.current}`}>
      <Card hover padding="none" className="h-full overflow-hidden">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative h-48 md:h-56 overflow-hidden">
            <Image
              src={urlFor(post.featuredImage).width(600).height(400).url()}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Category Badge Overlay */}
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="shadow-lg">
                {categoryToDisplayName(post.category)}
              </Badge>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Meta Info */}
          <div className="flex items-center text-sm text-gray-500 mb-3 gap-3">
            <time dateTime={post.publishedAt}>
              {formatDateShort(post.publishedAt)}
            </time>
            <span>•</span>
            <span>{readTime} min read</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Author */}
          {post.author && (
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              {post.author.photo ? (
                <Image
                  src={urlFor(post.author.photo).width(40).height(40).url()}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  {post.author.name.charAt(0)}
                </div>
              )}
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {post.author.name}
                </div>
                {post.author.role && (
                  <div className="text-xs text-gray-500">{post.author.role}</div>
                )}
              </div>
            </div>
          )}

          {/* Read More Link */}
          <div className="flex items-center text-primary font-medium mt-4 group">
            <span className="group-hover:mr-2 transition-all">Read More</span>
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
      </Card>
    </Link>
  )
}
