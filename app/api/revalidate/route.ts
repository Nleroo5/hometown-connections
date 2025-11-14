import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // Verify the secret token
    const secret = req.headers.get('x-sanity-secret')

    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse the request body
    const body = await req.json()
    const { _type, slug } = body

    // Revalidate based on content type
    switch (_type) {
      case 'newsPost':
        revalidatePath('/resources/news')
        if (slug?.current) {
          revalidatePath(`/resources/news/${slug.current}`)
        }
        break

      case 'service':
        if (slug?.current) {
          revalidatePath(`/services/${slug.current}`)
        }
        revalidatePath('/') // Revalidate homepage when services change
        break

      case 'partner':
        revalidatePath('/partners')
        if (slug?.current) {
          revalidatePath(`/partners/${slug.current}`)
        }
        break

      case 'event':
        revalidatePath('/resources/events')
        if (slug?.current) {
          revalidatePath(`/resources/events/${slug.current}`)
        }
        break

      case 'resource':
        revalidatePath('/resources')
        break

      case 'teamMember':
        revalidatePath('/about/leadership')
        revalidatePath('/about/board')
        break

      case 'siteSettings':
        // Revalidate all pages when site settings change
        revalidatePath('/', 'layout')
        break

      default:
        // For any other type, revalidate the homepage
        revalidatePath('/')
    }

    // Always revalidate the homepage to reflect latest content
    revalidatePath('/')

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: _type,
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Error revalidating', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
