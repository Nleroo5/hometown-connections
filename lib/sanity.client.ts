import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Disable CDN to always get fresh data
  perspective: 'published',
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
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
