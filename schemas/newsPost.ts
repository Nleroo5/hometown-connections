import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'newsPost',
  title: 'News & Updates',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Company News', value: 'company-news' },
          { title: 'Industry Updates', value: 'industry-updates' },
          { title: 'Partner News', value: 'partner-news' },
          { title: 'Member Spotlight', value: 'member-spotlight' },
          { title: 'Events', value: 'events' },
          { title: 'Resources', value: 'resources' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'teamMember' }],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          type: 'file',
          title: 'File',
          fields: [
            {
              name: 'description',
              type: 'string',
              title: 'Description',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'utilitySolutions',
      title: 'Utility Solutions',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Advanced Metering Infrastructure', value: 'advanced-metering-infrastructure' },
          { title: 'Board Governance', value: 'board-governance' },
          { title: 'Clean Energy Storage', value: 'clean-energy-storage' },
          { title: 'Cost of Service Research', value: 'cost-of-service-research' },
          { title: 'Customer Engagement', value: 'customer-engagement' },
          { title: 'Customer Information Systems', value: 'customer-information-systems' },
          { title: 'Cyber Liability Insurance', value: 'cyber-liability-insurance' },
          { title: 'Cybersecurity Management', value: 'cybersecurity-management' },
          { title: 'Digital Marketing/Technology Solutions', value: 'digital-marketing-technology-solutions' },
          { title: 'Energy Trading & Risk', value: 'energy-trading-risk' },
          { title: 'Engineering & Operations', value: 'engineering-operations' },
          { title: 'Infrastructure Management', value: 'infrastructure-management' },
          { title: 'Insurance', value: 'insurance' },
          { title: 'Interim Executive Placements', value: 'interim-executive-placements' },
          { title: 'Market Research', value: 'market-research' },
          { title: 'Microgrid/Distributed Energy Generation', value: 'microgrid-distributed-energy-generation' },
          { title: 'Organizational Transformation', value: 'organizational-transformation' },
          { title: 'OT Engineering & Regulatory Compliance', value: 'ot-engineering-regulatory-compliance' },
          { title: 'Strategic Planning', value: 'strategic-planning' },
          { title: 'Technology Planning', value: 'technology-planning' },
          { title: 'Utility Security Consulting', value: 'utility-security-consulting' },
          { title: 'Wholesale Energy Prepay', value: 'wholesale-energy-prepay' },
        ],
        layout: 'tags',
      },
      description: 'Select all relevant utility solution categories',
    }),
    defineField({
      name: 'relatedPartners',
      title: 'Related Partners',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'partner' }] }],
      description: 'Partners mentioned or featured in this news post',
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'featuredImage',
      publishedAt: 'publishedAt',
    },
    prepare({ title, subtitle, media, publishedAt }) {
      return {
        title,
        subtitle: `${subtitle} - ${new Date(publishedAt).toLocaleDateString()}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
})
