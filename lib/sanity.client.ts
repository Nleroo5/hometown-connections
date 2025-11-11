import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true, // Enable CDN for production performance
  perspective: 'published',
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper to get optimized image URL
export function getImageUrl(source: SanityImageSource, width?: number, height?: number) {
  let imageUrl = urlFor(source).auto('format').quality(90)

  if (width) imageUrl = imageUrl.width(width)
  if (height) imageUrl = imageUrl.height(height)

  return imageUrl.url()
}
