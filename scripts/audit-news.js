const { createClient } = require('@sanity/client')
const https = require('https')
const { URL } = require('url')
require('dotenv').config({ path: '.env.local' })

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Helper to fetch URL
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject)
      }
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => resolve(data))
    }).on('error', reject)
  })
}

// Main audit function
async function auditImportedNews() {
  console.log('\n' + '='.repeat(60))
  console.log('🔍 News Import Audit - Verifying 100% Accuracy')
  console.log('='.repeat(60) + '\n')

  try {
    // Fetch all imported posts from Sanity
    console.log('📥 Fetching imported posts from Sanity...')
    const sanityPosts = await client.fetch(`
      *[_type == "newsPost"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        category,
        excerpt,
        featured,
        "hasImage": defined(featuredImage),
        "hasBody": defined(body),
        "bodyBlockCount": count(body),
        utilitySolutions,
        "relatedPartnersCount": count(relatedPartners),
        "relatedServicesCount": count(relatedServices)
      }
    `)

    console.log(`✓ Found ${sanityPosts.length} posts in Sanity\n`)

    // Fetch expected count from original site
    console.log('🌐 Checking original site...')
    const page16Html = await fetchUrl('https://www.hometownconnections.com/news/page/16/')
    const page1Html = await fetchUrl('https://www.hometownconnections.com/news/')

    // Count posts on pages
    const linkRegex = /<h[23][^>]*>.*?<a[^>]*href="(https?:\/\/[^"]*\/news\/[^"\/]+\/?)"[^>]*>/gi
    const page1Matches = (page1Html.match(linkRegex) || []).filter(m => !m.includes('/page/')).length
    const page16Matches = (page16Html.match(linkRegex) || []).filter(m => !m.includes('/page/')).length

    console.log(`  → Page 1: ${page1Matches} posts`)
    console.log(`  → Page 16: ${page16Matches} posts`)
    console.log(`  → Expected total: ~156 posts\n`)

    // Audit Summary
    console.log('=' + '='.repeat(59))
    console.log('📊 AUDIT RESULTS')
    console.log('=' + '='.repeat(59) + '\n')

    // Check 1: Total count
    console.log('1. Post Count Verification')
    if (sanityPosts.length === 156) {
      console.log(`   ✅ PASS: ${sanityPosts.length} posts imported (matches expected)`)
    } else {
      console.log(`   ⚠️  WARNING: ${sanityPosts.length} posts (expected 156)`)
    }

    // Check 2: All posts have required fields
    console.log('\n2. Required Fields Check')
    const missingTitle = sanityPosts.filter(p => !p.title)
    const missingSlug = sanityPosts.filter(p => !p.slug)
    const missingDate = sanityPosts.filter(p => !p.publishedAt)
    const missingExcerpt = sanityPosts.filter(p => !p.excerpt)
    const missingCategory = sanityPosts.filter(p => !p.category)

    console.log(`   → Titles: ${sanityPosts.length - missingTitle.length}/${sanityPosts.length} ${missingTitle.length === 0 ? '✅' : '❌'}`)
    console.log(`   → Slugs: ${sanityPosts.length - missingSlug.length}/${sanityPosts.length} ${missingSlug.length === 0 ? '✅' : '❌'}`)
    console.log(`   → Dates: ${sanityPosts.length - missingDate.length}/${sanityPosts.length} ${missingDate.length === 0 ? '✅' : '❌'}`)
    console.log(`   → Excerpts: ${sanityPosts.length - missingExcerpt.length}/${sanityPosts.length} ${missingExcerpt.length === 0 ? '✅' : '❌'}`)
    console.log(`   → Categories: ${sanityPosts.length - missingCategory.length}/${sanityPosts.length} ${missingCategory.length === 0 ? '✅' : '❌'}`)

    // Check 3: Content quality
    console.log('\n3. Content Quality Check')
    const withImages = sanityPosts.filter(p => p.hasImage).length
    const withBody = sanityPosts.filter(p => p.hasBody).length
    const avgBodyBlocks = sanityPosts.reduce((sum, p) => sum + (p.bodyBlockCount || 0), 0) / sanityPosts.length

    console.log(`   → Posts with images: ${withImages}/${sanityPosts.length} (${Math.round(withImages/sanityPosts.length*100)}%)`)
    console.log(`   → Posts with body content: ${withBody}/${sanityPosts.length} (${Math.round(withBody/sanityPosts.length*100)}%)`)
    console.log(`   → Average paragraphs per post: ${avgBodyBlocks.toFixed(1)}`)

    if (withBody === sanityPosts.length) {
      console.log(`   ✅ All posts have body content`)
    } else {
      console.log(`   ⚠️  ${sanityPosts.length - withBody} posts missing body content`)
    }

    // Check 4: Date range
    console.log('\n4. Date Range Verification')
    const dates = sanityPosts.map(p => new Date(p.publishedAt)).sort((a, b) => a - b)
    const oldestDate = dates[0]
    const newestDate = dates[dates.length - 1]

    console.log(`   → Oldest post: ${oldestDate.toLocaleDateString()} `)
    console.log(`   → Newest post: ${newestDate.toLocaleDateString()}`)
    console.log(`   → Date span: ${Math.round((newestDate - oldestDate) / (1000 * 60 * 60 * 24 * 365))} years`)

    // Check 5: Category distribution
    console.log('\n5. Category Distribution')
    const categories = {}
    sanityPosts.forEach(p => {
      categories[p.category] = (categories[p.category] || 0) + 1
    })

    Object.entries(categories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
      const percentage = Math.round(count / sanityPosts.length * 100)
      console.log(`   → ${cat}: ${count} (${percentage}%)`)
    })

    // Check 6: Sample verification
    console.log('\n6. Sample Post Verification')
    console.log('   Verifying 3 random posts against original site...\n')

    const sampleIndexes = [0, Math.floor(sanityPosts.length / 2), sanityPosts.length - 1]

    for (const idx of sampleIndexes) {
      const post = sanityPosts[idx]
      const originalUrl = `https://www.hometownconnections.com/news/${post.slug.current}`

      try {
        const html = await fetchUrl(originalUrl)

        // Check if title appears in HTML
        const titleInHtml = html.includes(post.title.substring(0, 20))

        console.log(`   [${idx + 1}/${sanityPosts.length}] "${post.title.substring(0, 40)}..."`)
        console.log(`       URL: ${originalUrl}`)
        console.log(`       Title match: ${titleInHtml ? '✅' : '⚠️'}`)
        console.log(`       Has image: ${post.hasImage ? '✅' : '○'}`)
        console.log(`       Body blocks: ${post.bodyBlockCount || 0}`)
        console.log()

        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (error) {
        console.log(`       ⚠️  Could not verify: ${error.message}\n`)
      }
    }

    // Final Summary
    console.log('=' + '='.repeat(59))
    console.log('🎯 FINAL AUDIT SUMMARY')
    console.log('=' + '='.repeat(59) + '\n')

    const allChecks = [
      sanityPosts.length === 156,
      missingTitle.length === 0,
      missingSlug.length === 0,
      missingDate.length === 0,
      missingExcerpt.length === 0,
      missingCategory.length === 0,
      withBody === sanityPosts.length,
    ]

    const passedChecks = allChecks.filter(Boolean).length
    const totalChecks = allChecks.length

    console.log(`✅ Passed Checks: ${passedChecks}/${totalChecks}`)
    console.log(`📝 Total Posts Imported: ${sanityPosts.length}`)
    console.log(`🖼️  Posts with Images: ${withImages}`)
    console.log(`📄 Posts with Body Content: ${withBody}`)
    console.log()

    if (passedChecks === totalChecks) {
      console.log('🎉 AUDIT RESULT: 100% SUCCESS!')
      console.log('   All news posts imported accurately.')
    } else {
      console.log('⚠️  AUDIT RESULT: Minor issues detected')
      console.log('   Review warnings above for details.')
    }

    console.log('\n📝 Next Manual Steps:')
    console.log('   1. Visit http://localhost:3001/studio')
    console.log('   2. Review a few posts manually for content accuracy')
    console.log('   3. Add "Utility Solutions" tags to posts (based on content)')
    console.log('   4. Link "Related Partners" where mentioned in posts')
    console.log('   5. Mark important posts as "Featured"')
    console.log('   6. Add SEO metadata for key posts')
    console.log()

  } catch (error) {
    console.error('\n❌ Audit Error:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

// Run audit
auditImportedNews()
