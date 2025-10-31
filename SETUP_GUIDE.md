# Hometown Connections - Quick Setup Guide

This guide will help you get the Hometown Connections website up and running in under 15 minutes.

## Step 1: Install Dependencies (2 minutes)

```bash
npm install
```

## Step 2: Create Sanity Project (5 minutes)

### A. Create Account & Project

1. Go to [sanity.io](https://www.sanity.io/)
2. Click "Get started" and sign up (free)
3. Create a new project:
   - **Project name:** Hometown Connections
   - **Dataset:** production
   - **Schema:** Clean project with no predefined schema

### B. Get Your Project Credentials

1. After creating the project, you'll see your **Project ID**
2. Go to **Settings** → **API** → **Tokens**
3. Click **Add API Token**:
   - **Name:** Development Token
   - **Permissions:** Editor
   - **Copy the token** (you won't see it again!)

### C. Configure CORS Origins

1. In Sanity Dashboard, go to **Settings** → **API** → **CORS Origins**
2. Click **Add CORS Origin**
3. Add: `http://localhost:3000`
4. Check: **Allow credentials**

## Step 3: Configure Environment Variables (2 minutes)

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Open `.env.local` and update these required fields:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_from_step_2
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_from_step_2
SANITY_WEBHOOK_SECRET=any_random_string_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Tip:** For `SANITY_WEBHOOK_SECRET`, use any random string like: `my-secret-webhook-key-123`

## Step 4: Start Development Server (1 minute)

```bash
npm run dev
```

The site will be available at:
- **Website:** [http://localhost:3000](http://localhost:3000)
- **Sanity Studio:** [http://localhost:3000/studio](http://localhost:3000/studio)

## Step 5: Add Initial Content (5 minutes)

### A. Access Sanity Studio

1. Go to [http://localhost:3000/studio](http://localhost:3000/studio)
2. Log in with your Sanity account
3. You'll see the content management interface

### B. Configure Site Settings

1. Click **Site Settings** in the sidebar
2. Fill in:
   - **Site Name:** Hometown Connections
   - **Tagline:** Empowering Community Utilities
   - **SEO Description:** (150-160 characters about your organization)
   - **Logo:** Upload your logo image
   - **Primary Phone:** Your main phone number
   - **Primary Email:** Your main email
   - **Address:** Complete address fields
   - **Copyright Text:** © 2025 Hometown Connections, Inc. All rights reserved.

3. Click **Publish**

### C. Add Your First Service

1. Click **Services** in the sidebar
2. Click **Create** → **Service**
3. Fill in:
   - **Title:** Business Strategy
   - **Slug:** Click "Generate" (creates URL-friendly name)
   - **Category:** Business Strategy
   - **Display Order:** 1
   - **Short Description:** Brief 1-2 sentence description
   - **Icon:** Upload an icon/image (optional)

4. Click **Publish**

Repeat for other services (Operations, Cybersecurity, etc.)

### D. Add a News Post

1. Click **News & Updates** in the sidebar
2. Click **Create** → **News Post**
3. Fill in:
   - **Title:** Your article title
   - **Slug:** Click "Generate"
   - **Category:** Choose appropriate category
   - **Published At:** Select date/time
   - **Featured Post:** Check if you want it on homepage
   - **Excerpt:** 2-3 sentences summary
   - **Featured Image:** Upload image (1200x800px recommended)
   - **Body:** Add your article content

4. Click **Publish**

### E. Add a Partner

1. Click **Partners** in the sidebar
2. Click **Create** → **Partner**
3. Fill in:
   - **Company Name:** Partner company name
   - **Slug:** Click "Generate"
   - **Logo:** Upload logo (transparent PNG recommended)
   - **Category:** Select category
   - **Description:** Brief description
   - **Website:** Partner's website URL
   - **Featured Partner:** Check to show on homepage

4. Click **Publish**

## Step 6: View Your Live Site (1 minute)

1. Go to [http://localhost:3000](http://localhost:3000)
2. You should see:
   - Hero section with stats
   - Services grid (if you added services)
   - News section (if you added featured news)
   - Partners section (if you added featured partners)

## Troubleshooting

### Issue: Sanity Studio shows "Studio not found"

**Solution:**
- Check that your `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Verify you added `http://localhost:3000` to CORS origins in Sanity dashboard

### Issue: Images not loading

**Solution:**
- Verify images are uploaded in Sanity Studio
- Check `next.config.js` includes `cdn.sanity.io` in image domains
- Wait a few seconds for images to process on Sanity CDN

### Issue: Content not showing on homepage

**Solution:**
- Make sure you clicked **Publish** (not just Save as Draft)
- For news posts, check the **Featured Post** checkbox
- For partners, check the **Featured Partner** checkbox
- Refresh the page

### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill

# Or use a different port
npm run dev -- -p 3001
```

## Next Steps

### Content to Add

1. **Services** - Add all 7 service categories:
   - Business Strategy
   - Operations
   - Cybersecurity
   - Customer Care
   - Finance
   - Workforce Development
   - Technology Solutions

2. **Team Members** - Add leadership and staff
3. **Events** - Add upcoming conferences/webinars
4. **Resources** - Upload whitepapers, guides, case studies
5. **More News Posts** - Regular blog content

### Customize Design

Edit these files to customize appearance:
- `tailwind.config.ts` - Colors, fonts, spacing
- `app/globals.css` - Custom CSS and animations
- `components/sections/Hero.tsx` - Homepage hero section

### Deploy to Production

See the main [README.md](README.md) for deployment instructions with Vercel.

## Getting Help

- **Sanity Documentation:** [sanity.io/docs](https://www.sanity.io/docs)
- **Next.js Documentation:** [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS:** [tailwindcss.com/docs](https://tailwindcss.com/docs)

## Checklist

- [ ] Dependencies installed
- [ ] Sanity project created
- [ ] Environment variables configured
- [ ] Development server running
- [ ] Sanity Studio accessible
- [ ] Site settings configured
- [ ] At least 3 services added
- [ ] At least 1 news post published
- [ ] At least 3 partners added
- [ ] Homepage displays content correctly

---

**Congratulations!** You're ready to start building the Hometown Connections website. 🎉

For detailed documentation, see [README.md](README.md)
