# Sanity CMS - News Entry Guide

## Accessing Sanity Studio

1. **Local Development:**
   - Run `npm run dev`
   - Navigate to `http://localhost:3001/studio`

2. **Production (After Deployment):**
   - Navigate to `https://your-domain.com/studio`

## Adding a News Post

### Step 1: Navigate to News & Updates
1. Click "News & Updates" in the left sidebar
2. Click "Create New News & Updates" (+ button)

### Step 2: Required Fields

#### Basic Information
- **Title:** Enter the exact title from the original post
- **Slug:** Click "Generate" to auto-create from title
- **Category:** Select one:
  - Company News
  - Industry Updates
  - Partner News
  - Member Spotlight
  - Events
  - Resources

#### Publication
- **Published At:** Set the exact date/time from original post
  - Format: YYYY-MM-DD
  - Example: 2025-09-06 for September 6, 2025
- **Featured Post:** Check if should appear on homepage

#### Content
- **Excerpt:** 200 characters max summary (shows in grid view)
- **Featured Image:**
  - Upload image (recommended: 1200x800px)
  - **IMPORTANT:** Add Alt Text (required for accessibility)

#### Body Content
- Click "Add" in Body section
- Type or paste content
- Use formatting toolbar for:
  - Headings (H2, H3, H4)
  - Bold/Italic
  - Links
  - Lists
  - Images within content

### Step 3: New Filter Fields (IMPORTANT!)

#### Utility Solutions Tags
- Click "Add Utility Solutions"
- Select all relevant categories:
  - Advanced Metering Infrastructure
  - Board Governance
  - Cybersecurity Management
  - etc. (22 total options)
- These enable filtering on /news page

#### Related Partners
- Click "Add Related Partners"
- Search for partner name
- Select from list
- Add multiple if mentioned in article

#### Related Services
- Click "Add Related Services"
- Search for service
- Select from list
- Shows as links at bottom of article

### Step 4: SEO (Optional but Recommended)
- **SEO Title:** Custom title for search engines
- **SEO Description:** 160 characters max

### Step 5: Publish
- Click "Publish" button (top right)
- Post is now live!

---

## Content Entry Checklist

For each post from the original site, ensure you have:

- [ ] Exact title copied
- [ ] Correct publication date set
- [ ] Category selected
- [ ] Excerpt written (under 200 chars)
- [ ] Featured image uploaded with alt text
- [ ] Full body content entered
- [ ] Utility Solutions tags selected
- [ ] Related partners linked (if applicable)
- [ ] Related services linked (if applicable)
- [ ] SEO fields completed
- [ ] Published

---

## Tips for Efficiency

1. **Batch Entry:** Do 5-10 posts at a time
2. **Save Drafts:** Click "Save" to work on post later
3. **Preview:** Use Next.js dev server to preview posts
4. **Images:** Prepare all images before starting
5. **Tags:** Create a reference list of which tags apply to which posts

---

## Mapping Original Posts to Sanity

### Example: "Leverage HR is now Leverage Leadership!"

```
Title: Leverage HR is now Leverage Leadership!
Slug: leverage-hr-is-now-leverage-leadership
Category: Partner News
Published At: 2025-07-07T00:00:00.000Z
Featured: No
Excerpt: After nearly 20 years as Leverage HR, we are excited to announce our rebranding as Leverage Leadership—a name that truly reflects the heart of what we do!
Featured Image: [Upload logo/brand image] + Alt: "Leverage Leadership logo"
Body: [Full article content]
Utility Solutions:
  - Organizational Transformation
  - Strategic Planning
Related Partners: [Find Leverage Leadership in partner list]
```

---

## Common Issues & Solutions

**Problem:** "Slug already exists"
- Solution: Add a number or date to make unique

**Problem:** "Featured image required"
- Solution: Upload a placeholder image if original has none

**Problem:** "Can't find partner in list"
- Solution: Create partner first, then link in news post

**Problem:** "How to add PDFs?"
- Solution: In Body section, click "Add" → "File" → Upload PDF → Add description

---

## Quality Check Before Publishing

1. Preview the post on the live site
2. Check all links work
3. Verify images display correctly
4. Test filters (does post show when filtered?)
5. Check mobile view

---

## Next Steps

1. Start with 10 most recent posts
2. Test filtering with different combinations
3. Verify pagination works
4. Add remaining posts in batches

**Need Help?** Check Sanity documentation: https://www.sanity.io/docs
