const { createClient } = require('@sanity/client')
const https = require('https')
const http = require('http')
const { URL } = require('url')
const cheerio = require('cheerio')
require('dotenv').config({ path: '.env.local' })

// Initialize Sanity client with write permissions
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Helper function to fetch URL content
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    const lib = urlObj.protocol === 'https:' ? https : http

    lib.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject)
      }

      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => resolve(data))
    }).on('error', reject)
  })
}

// Helper to upload image to Sanity
async function uploadImageToSanity(imageUrl, altText = '') {
  try {
    console.log(`  → Uploading image: ${imageUrl.substring(0, 60)}...`)

    return new Promise((resolve, reject) => {
      // Handle protocol-relative URLs
      if (imageUrl.startsWith('//')) {
        imageUrl = 'https:' + imageUrl
      }

      const urlObj = new URL(imageUrl)
      const lib = urlObj.protocol === 'https:' ? https : http

      lib.get(imageUrl, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return uploadImageToSanity(res.headers.location, altText).then(resolve).catch(reject)
        }

        const contentType = res.headers['content-type'] || 'image/jpeg'
        const chunks = []

        res.on('data', (chunk) => chunks.push(chunk))
        res.on('end', async () => {
          try {
            const buffer = Buffer.concat(chunks)
            const asset = await client.assets.upload('image', buffer, {
              contentType,
              filename: imageUrl.split('/').pop()?.split('?')[0] || 'image.jpg',
            })

            resolve({
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: asset._id,
              },
              alt: altText || 'News post image',
            })
          } catch (err) {
            console.error(`  ✗ Upload failed: ${err.message}`)
            resolve(null)
          }
        })
      }).on('error', (err) => {
        console.error(`  ✗ Fetch failed: ${err.message}`)
        resolve(null)
      })
    })
  } catch (error) {
    console.error(`  ✗ Image error: ${error.message}`)
    return null
  }
}

// Convert HTML content to Portable Text blocks
function htmlToPortableText(html) {
  const $ = cheerio.load(html)
  const blocks = []

  // Remove scripts, styles, and navigation elements
  $('script, style, nav, .navigation').remove()

  function processElement(element) {
    const $el = $(element)
    const tagName = element.tagName?.toLowerCase()

    if (tagName === 'p') {
      const text = $el.text().trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: Math.random().toString(36).substring(7),
          style: 'normal',
          children: [{
            _type: 'span',
            _key: Math.random().toString(36).substring(7),
            text,
            marks: [],
          }],
          markDefs: [],
        })
      }
    } else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
      const text = $el.text().trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: Math.random().toString(36).substring(7),
          style: tagName,
          children: [{
            _type: 'span',
            _key: Math.random().toString(36).substring(7),
            text,
            marks: [],
          }],
          markDefs: [],
        })
      }
    } else if (tagName === 'ul' || tagName === 'ol') {
      $el.find('li').each((i, li) => {
        const text = $(li).text().trim()
        if (text) {
          blocks.push({
            _type: 'block',
            _key: Math.random().toString(36).substring(7),
            style: 'normal',
            listItem: tagName === 'ul' ? 'bullet' : 'number',
            children: [{
              _type: 'span',
              _key: Math.random().toString(36).substring(7),
              text,
              marks: [],
            }],
            markDefs: [],
          })
        }
      })
    } else {
      // Recursively process children
      $el.children().each((i, child) => {
        processElement(child)
      })
    }
  }

  $('body').children().each((i, el) => {
    processElement(el)
  })

  return blocks.length > 0 ? blocks : null
}

// Fetch all news post URLs from listing pages
async function fetchAllNewsUrls() {
  console.log('\n📰 Fetching news post URLs from listing pages...\n')

  const allUrls = new Set()
  let page = 1
  const maxPages = 16

  while (page <= maxPages) {
    try {
      console.log(`Scanning page ${page}/${maxPages}...`)
      const url = page === 1
        ? 'https://www.hometownconnections.com/news/'
        : `https://www.hometownconnections.com/news/page/${page}/`

      const html = await fetchUrl(url)

      // Find all news post links using regex
      const linkRegex = /<h[23][^>]*>.*?<a[^>]*href="(https?:\/\/[^"]*\/news\/[^"\/]+\/?)"[^>]*>([^<]+)<\/a>/gi
      let match
      let foundOnPage = 0

      while ((match = linkRegex.exec(html)) !== null) {
        const postUrl = match[1].replace(/\/$/, '') // Remove trailing slash
        const title = match[2].replace(/&#8217;/g, "'").replace(/&amp;/g, '&')

        if (!postUrl.includes('/page/')) {
          allUrls.add(postUrl)
          foundOnPage++
        }
      }

      console.log(`  → Found ${foundOnPage} posts`)

      if (foundOnPage === 0) {
        console.log(`  → No more posts found, stopping at page ${page}`)
        break
      }

      page++
      await new Promise(resolve => setTimeout(resolve, 300))
    } catch (error) {
      console.error(`✗ Error fetching page ${page}: ${error.message}`)
      break
    }
  }

  const urlArray = Array.from(allUrls)
  console.log(`\n✓ Found ${urlArray.length} unique post URLs\n`)
  return urlArray
}

// Scrape individual post page
async function scrapeNewsPost(url) {
  try {
    const html = await fetchUrl(url)
    const $ = cheerio.load(html)

    // Extract title
    const title = $('h1.entry-title, h1, article h1, .entry-header h1')
      .first()
      .text()
      .trim()
      .replace(/&#8217;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')

    if (!title) {
      throw new Error('No title found')
    }

    // Extract date
    let publishedAt = new Date().toISOString()
    const dateText = $('time[datetime], .entry-date, .published').first().text().trim() ||
                     $('.entry-meta').text().match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}/i)?.[0]

    if (dateText) {
      const parsedDate = new Date(dateText)
      if (!isNaN(parsedDate.getTime())) {
        publishedAt = parsedDate.toISOString()
      }
    }

    // Extract featured image
    let featuredImageUrl = null
    let featuredImageAlt = title
    const $img = $('.entry-content img, article img, .featured-image img, .post-image img').first()

    if ($img.length) {
      featuredImageUrl = $img.attr('src') || $img.attr('data-src')
      featuredImageAlt = $img.attr('alt') || title

      // Convert ShortPixel or other CDN URLs to original
      if (featuredImageUrl) {
        featuredImageUrl = featuredImageUrl
          .replace(/^https?:\/\/sp-ao\.shortpixel\.ai\/client\/[^\/]+\//, '')
          .split('?')[0]
      }
    }

    // Extract content
    const $content = $('.entry-content, article .content, .post-content').first()
    $content.find('.navigation, .sharedaddy, .jp-relatedposts').remove() // Remove social sharing

    const contentHtml = $content.html() || ''
    const body = htmlToPortableText(contentHtml)

    // Generate excerpt from content text
    const contentText = $content.text().trim()
    const excerpt = contentText.substring(0, 197).trim() + (contentText.length > 197 ? '...' : '')

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 96)

    // Determine category
    let category = 'company-news'
    const fullText = $('body').text().toLowerCase()

    if (fullText.includes('partner') || fullText.includes('partnership')) {
      category = 'partner-news'
    } else if (fullText.includes('newsletter')) {
      category = 'company-news'
    } else if (fullText.includes('event') || fullText.includes('conference')) {
      category = 'events'
    } else if (fullText.includes('award') || fullText.includes('wins')) {
      category = 'member-spotlight'
    }

    return {
      title,
      slug,
      publishedAt,
      excerpt,
      body,
      featuredImageUrl,
      featuredImageAlt,
      category,
      sourceUrl: url,
    }
  } catch (error) {
    console.error(`  ✗ Error scraping ${url}: ${error.message}`)
    return null
  }
}

// Import posts to Sanity
async function importPostsToSanity(postUrls) {
  console.log('📤 Scraping and importing posts to Sanity CMS...\n')

  let successCount = 0
  let errorCount = 0
  let skipCount = 0

  for (let i = 0; i < postUrls.length; i++) {
    const url = postUrls[i]
    console.log(`\n[${i + 1}/${postUrls.length}] Processing: ${url}`)

    try {
      // Scrape the post
      const post = await scrapeNewsPost(url)

      if (!post) {
        console.log(`  ⊘ Skipped (failed to parse)`)
        skipCount++
        continue
      }

      console.log(`  Title: "${post.title}"`)
      console.log(`  Date: ${new Date(post.publishedAt).toLocaleDateString()}`)
      console.log(`  Category: ${post.category}`)

      // Check if already exists
      const existing = await client.fetch(
        `*[_type == "newsPost" && slug.current == $slug][0]`,
        { slug: post.slug }
      )

      if (existing) {
        console.log(`  → Post already exists, skipping`)
        skipCount++
        continue
      }

      // Upload featured image
      let featuredImage = null
      if (post.featuredImageUrl) {
        featuredImage = await uploadImageToSanity(post.featuredImageUrl, post.featuredImageAlt)
      }

      // Create Sanity document
      const sanityDoc = {
        _type: 'newsPost',
        title: post.title,
        slug: {
          _type: 'slug',
          current: post.slug,
        },
        publishedAt: post.publishedAt,
        category: post.category,
        featured: false,
        excerpt: post.excerpt,
        ...(post.body && { body: post.body }),
        ...(featuredImage && { featuredImage }),
      }

      await client.create(sanityDoc)
      console.log(`  ✓ Imported successfully`)
      successCount++

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1500))
    } catch (error) {
      console.error(`  ✗ Error: ${error.message}`)
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log(`📊 Import Summary:`)
  console.log(`   ✓ Imported: ${successCount}`)
  console.log(`   ⊘ Skipped: ${skipCount}`)
  console.log(`   ✗ Failed: ${errorCount}`)
  console.log(`   📝 Total Processed: ${postUrls.length}`)
  console.log('='.repeat(60) + '\n')

  return { successCount, skipCount, errorCount }
}

// Main execution
async function main() {
  console.log('\n' + '='.repeat(60))
  console.log('🚀 Hometown Connections - News Migration Script')
  console.log('='.repeat(60))

  try {
    // Verify Sanity connection
    console.log('\n🔑 Verifying Sanity credentials...')
    await client.fetch('*[_type == "newsPost"][0]')
    console.log('✓ Connected to Sanity\n')

    // Fetch all post URLs
    const postUrls = await fetchAllNewsUrls()

    if (postUrls.length === 0) {
      console.log('❌ No post URLs found.')
      process.exit(1)
    }

    // Ask for confirmation
    console.log(`\n⚠️  About to import ${postUrls.length} posts to Sanity.`)
    console.log('Press Ctrl+C within 5 seconds to cancel...\n')
    await new Promise(resolve => setTimeout(resolve, 5000))

    // Import all posts
    const result = await importPostsToSanity(postUrls)

    if (result.successCount > 0) {
      console.log('✅ Migration completed!')
      console.log('\n📝 Next steps:')
      console.log('   1. Visit http://localhost:3001/studio to review posts')
      console.log('   2. Add Utility Solutions tags to relevant posts')
      console.log('   3. Link Related Partners where mentioned')
      console.log('   4. Link Related Services where applicable')
      console.log('   5. Update SEO metadata for important posts')
      console.log('   6. Mark featured posts (checkbox in Studio)\n')
    } else {
      console.log('❌ No posts were successfully imported.')
      process.exit(1)
    }
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

// Run the script
main()
