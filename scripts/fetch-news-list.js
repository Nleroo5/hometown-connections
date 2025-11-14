// Quick script to debug HTML structure
const https = require('https')

https.get('https://www.hometownconnections.com/news/', (res) => {
  let data = ''
  res.on('data', chunk => { data += chunk })
  res.on('end', () => {
    // Find all h2/h3 headings that look like post titles
    const headingRegex = /<h[23][^>]*>.*?<a[^>]*href="([^"]*\/news\/[^"]+)"[^>]*>([^<]+)<\/a>.*?<\/h[23]>/gi
    let match
    let count = 0

    console.log('\n=== Found Post Links ===\n')
    while ((match = headingRegex.exec(data)) !== null && count < 5) {
      console.log(`${count + 1}. Title: ${match[2]}`)
      console.log(`   URL: ${match[1]}\n`)
      count++
    }

    if (count === 0) {
      console.log('No posts found. Trying alternative pattern...\n')

      // Try to find any links in the news section
      const anyNewsLink = /<a[^>]*href="(https?:\/\/[^"]*\/news\/[^"\/]+\/?)"[^>]*>([^<]+)<\/a>/gi
      let altMatch
      let altCount = 0

      console.log('=== Alternative News Links ===\n')
      while ((altMatch = anyNewsLink.exec(data)) !== null && altCount < 10) {
        if (!altMatch[1].includes('/page/')) {
          console.log(`${altCount + 1}. "${altMatch[2]}"`)
          console.log(`   ${altMatch[1]}\n`)
          altCount++
        }
      }
    }
  })
}).on('error', err => {
  console.error('Error:', err.message)
})
