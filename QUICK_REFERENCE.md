# Quick Reference Guide

Common commands and tasks for the Hometown Connections website.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Type checking
npm run type-check

# Lint code
npm run lint
```

## Access URLs

- **Website:** http://localhost:3000
- **Sanity Studio:** http://localhost:3000/studio
- **API - Revalidate:** http://localhost:3000/api/revalidate
- **API - Contact:** http://localhost:3000/api/contact

## File Locations

### Configuration
- **Environment:** `.env.local`
- **Tailwind:** `tailwind.config.ts`
- **Next.js:** `next.config.js`
- **Sanity:** `sanity.config.ts`
- **TypeScript:** `tsconfig.json`

### Components
- **Layout:** `components/layout/`
- **Sections:** `components/sections/`
- **UI:** `components/ui/`
- **Content:** `components/content/`

### Pages
- **Homepage:** `app/page.tsx`
- **Layout:** `app/layout.tsx`
- **Studio:** `app/studio/[[...index]]/page.tsx`
- **API Routes:** `app/api/*/route.ts`

### Content Management
- **Schemas:** `schemas/`
- **Queries:** `lib/sanity.queries.ts`
- **Client:** `lib/sanity.client.ts`

## Common Tasks

### Add a New Page

1. Create file in `app/` directory:
```tsx
// app/about/page.tsx
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Your content */}
      </main>
      <Footer />
    </>
  )
}
```

2. Add route to navigation in `components/layout/Header.tsx`

### Add a New Component

1. Create component file:
```tsx
// components/ui/NewComponent.tsx
interface NewComponentProps {
  title: string
}

export default function NewComponent({ title }: NewComponentProps) {
  return <div>{title}</div>
}
```

2. Import and use:
```tsx
import NewComponent from '@/components/ui/NewComponent'

<NewComponent title="Hello" />
```

### Add a New Sanity Schema

1. Create schema file:
```ts
// schemas/newType.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'newType',
  title: 'New Type',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
```

2. Add to `schemas/index.ts`:
```ts
import newType from './newType'

export const schemaTypes = [
  // ... existing types
  newType,
]
```

3. Add to Sanity Studio structure in `sanity.config.ts`

### Fetch Data from Sanity

1. Add query to `lib/sanity.queries.ts`:
```ts
export const NEW_QUERY = `*[_type == "newType"] {
  _id,
  title,
  // ... other fields
}`

export async function getNewData() {
  return await client.fetch(NEW_QUERY)
}
```

2. Use in page:
```tsx
import { getNewData } from '@/lib/sanity.queries'

export default async function Page() {
  const data = await getNewData()
  return <div>{/* Use data */}</div>
}
```

### Style with Tailwind

```tsx
// Use utility classes
<div className="bg-primary text-white px-4 py-2 rounded-lg">
  Content
</div>

// Use custom classes from globals.css
<button className="btn btn-primary">
  Click Me
</button>

// Responsive design
<div className="text-sm md:text-base lg:text-lg">
  Responsive Text
</div>
```

### Add Environment Variable

1. Add to `.env.local`:
```env
NEW_VARIABLE=value
```

2. Add to `.env.example`:
```env
NEW_VARIABLE=your_value_here
```

3. Use in code:
```ts
const value = process.env.NEW_VARIABLE
```

For client-side, prefix with `NEXT_PUBLIC_`:
```env
NEXT_PUBLIC_NEW_VARIABLE=value
```

## Sanity Studio

### Publish Content
1. Open Studio at `/studio`
2. Select content type
3. Fill in fields
4. Click **Publish** (not just Save)

### Featured Content
- News posts: Check "Featured Post"
- Partners: Check "Featured Partner"
- This shows content on homepage

### Unpublish Content
1. Open document
2. Click **••• menu**
3. Select **Unpublish**

### Delete Content
1. Open document
2. Click **••• menu**
3. Select **Delete**
4. Confirm deletion

## Deployment (Vercel)

### Initial Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Production Deploy
```bash
vercel --prod
```

### Environment Variables
1. Go to Vercel Dashboard
2. Select project
3. Go to Settings → Environment Variables
4. Add all variables from `.env.local`

## Troubleshooting

### Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

### Clear Node Modules
```bash
rm -rf node_modules
npm install
```

### Fix TypeScript Errors
```bash
npm run type-check
```

### Port Already in Use
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill

# Or use different port
npm run dev -- -p 3001
```

### Sanity Studio Not Loading
1. Check CORS origins in Sanity dashboard
2. Verify Project ID in `.env.local`
3. Clear browser cache

### Images Not Loading
1. Check image is uploaded in Sanity
2. Verify `cdn.sanity.io` in `next.config.js`
3. Wait for CDN processing (may take 30 seconds)

## Useful Snippets

### Image Component
```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.client'

<Image
  src={urlFor(image).width(800).height(600).url()}
  alt={image.alt}
  width={800}
  height={600}
  className="rounded-lg"
/>
```

### Link Component
```tsx
import Link from 'next/link'

<Link
  href="/about"
  className="text-primary hover:text-primary-dark"
>
  About Us
</Link>
```

### Button Component
```tsx
import Button from '@/components/ui/Button'

<Button
  href="/contact"
  variant="primary"
  size="lg"
>
  Contact Us
</Button>
```

### Card Component
```tsx
import Card from '@/components/ui/Card'

<Card hover padding="lg">
  <h3>Title</h3>
  <p>Content</p>
</Card>
```

### Container Component
```tsx
import Container from '@/components/ui/Container'

<Container>
  {/* Content will be centered and responsive */}
</Container>
```

## Git Commands

```bash
# Check status
git status

# Add files
git add .

# Commit
git commit -m "Your message"

# Push
git push origin main

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main
```

## Performance Optimization

### Image Optimization
- Use Next.js Image component
- Specify width and height
- Use appropriate formats (WebP)
- Lazy load below-fold images

### Code Splitting
- Use dynamic imports for heavy components
- Implement React Suspense boundaries

### Caching
- ISR revalidation (set in page.tsx)
- Edge caching via Vercel
- Static generation for unchanging pages

## SEO Best Practices

1. **Use proper heading hierarchy** (h1 → h2 → h3)
2. **Add alt text to all images**
3. **Write descriptive meta descriptions** (150-160 characters)
4. **Use semantic HTML** (header, nav, main, article, etc.)
5. **Implement structured data** (JSON-LD)
6. **Create XML sitemap**
7. **Optimize page load speed**
8. **Make site mobile-friendly**

## Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Sanity Docs:** https://www.sanity.io/docs
- **Tailwind Docs:** https://tailwindcss.com/docs
- **React Docs:** https://react.dev
- **TypeScript Docs:** https://www.typescriptlang.org/docs

---

Keep this file handy for quick reference during development!
