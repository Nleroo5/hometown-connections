# Hometown Connections Website

A modern, professional website for Hometown Connections built with Next.js 14, TypeScript, Tailwind CSS, and Sanity.io.

## Overview

Hometown Connections is a non-profit utility services organization serving 900+ community-owned utilities since 1998. This website showcases their services, partners, resources, and news while providing an easy-to-use content management system via Sanity Studio.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **CMS:** Sanity.io
- **Deployment:** Vercel (recommended)
- **Analytics:** Vercel Analytics, Google Analytics 4

## Features

- **Fully Responsive** - Mobile-first design that works on all devices
- **Content Management** - All content editable through Sanity Studio
- **SEO Optimized** - Meta tags, Open Graph, structured data
- **Performance** - Optimized images, code splitting, ISR
- **Accessibility** - WCAG 2.1 AA compliant
- **Modern UI** - Clean, professional design with smooth animations

## Project Structure

```
hometown-connections/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── contact/              # Contact form handler
│   │   └── revalidate/           # Sanity webhook handler
│   ├── studio/[[...index]]/      # Sanity Studio
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── layout/                   # Header, Footer
│   ├── sections/                 # Page sections
│   ├── ui/                       # UI components
│   └── content/                  # Content components
├── lib/                          # Utilities
│   ├── sanity.client.ts          # Sanity client config
│   ├── sanity.queries.ts         # GROQ queries
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Helper functions
├── schemas/                      # Sanity schemas
│   ├── index.ts                  # Schema exports
│   ├── siteSettings.ts           # Site configuration
│   ├── newsPost.ts               # News/blog posts
│   ├── service.ts                # Services
│   ├── partner.ts                # Partners
│   ├── resource.ts               # Resources
│   ├── event.ts                  # Events
│   └── teamMember.ts             # Team members
├── public/                       # Static assets
├── sanity.config.ts              # Sanity configuration
├── tailwind.config.ts            # Tailwind configuration
└── next.config.js                # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Sanity.io account (free tier available)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd hometown-connections
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Sanity Project

1. Go to [sanity.io](https://www.sanity.io/) and create a new project
2. Note your Project ID and Dataset name (usually "production")
3. Generate an API token with Editor permissions

### 4. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update the following variables:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token_here
SANITY_WEBHOOK_SECRET=generate_a_random_string

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Firebase (Optional - for forms)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 6. Access Sanity Studio

Navigate to [http://localhost:3000/studio](http://localhost:3000/studio) to access the CMS.

On first load, you'll need to:
1. Log in with your Sanity account
2. Add your localhost URL to allowed CORS origins in Sanity dashboard

## Content Management

### Sanity Studio

Access Sanity Studio at `/studio` to manage all content:

- **Site Settings:** Logo, contact info, social links
- **Services:** Add/edit services with descriptions, icons, benefits
- **News & Updates:** Blog posts and company updates
- **Partners:** Partner logos and information
- **Events:** Conferences, webinars, training sessions
- **Resources:** Whitepapers, guides, case studies
- **Team Members:** Leadership and staff profiles

### Content Types

#### Site Settings (Singleton)
Global site configuration including:
- Site name and tagline
- Logo and branding
- Contact information
- Social media links
- Announcement bar

#### Services
- Title and description
- Category (Business Strategy, Operations, etc.)
- Icon/illustration
- Key benefits
- Related partners and case studies
- SEO metadata

#### News Posts
- Title, excerpt, and full content
- Featured image
- Author (links to Team Member)
- Category
- Related services
- Publishing date

#### Partners
- Company name and logo
- Description
- Category
- Services provided
- Featured status

#### Events
- Event type (Conference, Webinar, etc.)
- Date, time, and location
- Virtual/in-person
- Registration link
- Agenda
- Organizers and sponsors

#### Resources
- Type (Whitepaper, Guide, etc.)
- File upload or external link
- Access level (Public/Members Only)
- Tags for filtering

#### Team Members
- Name, role, department
- Photo and biography
- Contact information
- LinkedIn profile

## Customization

### Design System

Colors, typography, and spacing are defined in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - CSS variables and utilities

### Components

All UI components are in `components/ui/`:
- `Button.tsx` - Reusable button component
- `Card.tsx` - Card container
- `Badge.tsx` - Category badges
- `Container.tsx` - Max-width container

### Styling

The project uses Tailwind CSS with custom utilities:

```css
/* Custom button styles */
.btn-primary - Primary button
.btn-secondary - Secondary button
.btn-accent - Accent button
.btn-outline - Outlined button

/* Layout utilities */
.container-custom - Centered container
.section - Standard section padding
.card - Card styling
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables from `.env.local`
5. Deploy

Vercel will automatically:
- Build and deploy your site
- Enable ISR (Incremental Static Regeneration)
- Set up preview deployments for branches
- Configure analytics

### Sanity Webhooks

After deploying, set up webhooks in Sanity:

1. Go to Sanity Dashboard → API → Webhooks
2. Create a new webhook:
   - URL: `https://your-domain.com/api/revalidate`
   - Dataset: `production`
   - Trigger on: Create, Update, Delete
   - HTTP method: POST
   - Secret: Use the value from `SANITY_WEBHOOK_SECRET`
   - Include drafts: No

This will automatically revalidate pages when content changes.

## SEO

### Metadata

Each page includes:
- Title and description
- Open Graph tags
- Twitter Card tags
- Canonical URLs

### Structured Data

JSON-LD structured data for:
- Organization
- Articles (news posts)
- Events
- Local Business

### Sitemap

Generate a sitemap at `/sitemap.xml` (implement in `app/sitemap.ts`)

### Robots.txt

Configure in `app/robots.ts`

## Performance

### Optimization Techniques

- **Image Optimization:** Next.js Image component with Sanity CDN
- **Code Splitting:** Automatic route-based splitting
- **ISR:** Incremental Static Regeneration (60-second revalidation)
- **Edge Caching:** Leverages Vercel Edge Network
- **Font Optimization:** Next.js font optimization

### Target Metrics

- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- Lighthouse Score: 95+

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | Yes |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | Yes |
| `SANITY_API_TOKEN` | Sanity API token | Yes |
| `SANITY_WEBHOOK_SECRET` | Webhook secret for revalidation | Yes |
| `NEXT_PUBLIC_SITE_URL` | Site URL | Yes |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | No |

## Troubleshooting

### Common Issues

**Issue:** Sanity Studio not loading
- **Solution:** Make sure your domain is added to CORS origins in Sanity dashboard

**Issue:** Images not displaying
- **Solution:** Verify `cdn.sanity.io` is added to `next.config.js` remote patterns

**Issue:** Content not updating
- **Solution:** Check webhook configuration and revalidation route

**Issue:** Build errors
- **Solution:** Run `npm run type-check` to identify TypeScript issues

## Support

For questions or issues:
- Review the documentation
- Check Sanity documentation: [sanity.io/docs](https://www.sanity.io/docs)
- Check Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)

## License

© 2025 Hometown Connections, Inc. All rights reserved.

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Sanity.io
