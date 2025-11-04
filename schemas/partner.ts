import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Partners',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'companyName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'servicesProvided',
      title: 'Services Provided',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of services this partner provides',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Partner',
      type: 'boolean',
      description: 'Show on homepage and featured sections',
      initialValue: false,
    }),
    defineField({
      name: 'contactPerson',
      title: 'Primary Contact Person',
      type: 'object',
      fields: [
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'title', type: 'string', title: 'Job Title' },
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'photo', type: 'image', title: 'Photo' },
      ],
    }),
    defineField({
      name: 'additionalContacts',
      title: 'Additional Contact Persons',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Name' },
          { name: 'title', type: 'string', title: 'Job Title' },
          { name: 'email', type: 'string', title: 'Email' },
          { name: 'phone', type: 'string', title: 'Phone' },
        ],
      }],
    }),
    defineField({
      name: 'companyAddress',
      title: 'Company Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline/Subtitle',
      type: 'string',
      description: 'Optional tagline displayed under company name',
    }),
    defineField({
      name: 'keyFeatures',
      title: 'Key Features/Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points of key features or highlights',
    }),
    defineField({
      name: 'testimonials',
      title: 'Client Testimonials',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'quote', type: 'text', title: 'Quote' },
          { name: 'author', type: 'string', title: 'Author Name' },
          { name: 'authorTitle', type: 'string', title: 'Author Title' },
          { name: 'company', type: 'string', title: 'Company' },
        ],
      }],
    }),
    defineField({
      name: 'resources',
      title: 'Resources & Downloads',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Resource Title' },
          { name: 'type', type: 'string', title: 'Type', options: { list: ['PDF', 'Video', 'Link', 'Webinar', 'Case Study'] } },
          { name: 'url', type: 'url', title: 'URL' },
        ],
      }],
    }),
    defineField({
      name: 'clients',
      title: 'Client List',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of notable clients or municipalities served',
    }),
    defineField({
      name: 'statistics',
      title: 'Key Statistics',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', type: 'string', title: 'Statistic Value' },
          { name: 'label', type: 'string', title: 'Statistic Label' },
        ],
      }],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Featured Video URL',
      type: 'url',
      description: 'YouTube or other video embed URL',
    }),
    defineField({
      name: 'partnerSince',
      title: 'Partner Since',
      type: 'date',
      description: 'When did this partnership begin?',
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'description',
      media: 'logo',
    },
  },
})
