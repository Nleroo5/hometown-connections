import { defineType, defineField } from 'sanity'

// US States for dropdown
const US_STATES = [
  { title: 'Alabama', value: 'AL' },
  { title: 'Alaska', value: 'AK' },
  { title: 'Arizona', value: 'AZ' },
  { title: 'Arkansas', value: 'AR' },
  { title: 'California', value: 'CA' },
  { title: 'Colorado', value: 'CO' },
  { title: 'Connecticut', value: 'CT' },
  { title: 'Delaware', value: 'DE' },
  { title: 'Florida', value: 'FL' },
  { title: 'Georgia', value: 'GA' },
  { title: 'Hawaii', value: 'HI' },
  { title: 'Idaho', value: 'ID' },
  { title: 'Illinois', value: 'IL' },
  { title: 'Indiana', value: 'IN' },
  { title: 'Iowa', value: 'IA' },
  { title: 'Kansas', value: 'KS' },
  { title: 'Kentucky', value: 'KY' },
  { title: 'Louisiana', value: 'LA' },
  { title: 'Maine', value: 'ME' },
  { title: 'Maryland', value: 'MD' },
  { title: 'Massachusetts', value: 'MA' },
  { title: 'Michigan', value: 'MI' },
  { title: 'Minnesota', value: 'MN' },
  { title: 'Mississippi', value: 'MS' },
  { title: 'Missouri', value: 'MO' },
  { title: 'Montana', value: 'MT' },
  { title: 'Nebraska', value: 'NE' },
  { title: 'Nevada', value: 'NV' },
  { title: 'New Hampshire', value: 'NH' },
  { title: 'New Jersey', value: 'NJ' },
  { title: 'New Mexico', value: 'NM' },
  { title: 'New York', value: 'NY' },
  { title: 'North Carolina', value: 'NC' },
  { title: 'North Dakota', value: 'ND' },
  { title: 'Ohio', value: 'OH' },
  { title: 'Oklahoma', value: 'OK' },
  { title: 'Oregon', value: 'OR' },
  { title: 'Pennsylvania', value: 'PA' },
  { title: 'Rhode Island', value: 'RI' },
  { title: 'South Carolina', value: 'SC' },
  { title: 'South Dakota', value: 'SD' },
  { title: 'Tennessee', value: 'TN' },
  { title: 'Texas', value: 'TX' },
  { title: 'Utah', value: 'UT' },
  { title: 'Vermont', value: 'VT' },
  { title: 'Virginia', value: 'VA' },
  { title: 'Washington', value: 'WA' },
  { title: 'West Virginia', value: 'WV' },
  { title: 'Wisconsin', value: 'WI' },
  { title: 'Wyoming', value: 'WY' },
]

export default defineType({
  name: 'affiliate',
  title: 'Affiliate',
  type: 'document',
  fields: [
    // Organization Information
    defineField({
      name: 'organizationName',
      title: 'Organization Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Full name of the affiliate organization',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Organization logo (optional)',
    }),

    // Address Information
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        {
          name: 'street',
          title: 'Street Address',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'state',
          title: 'State',
          type: 'string',
          options: {
            list: US_STATES,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'zipCode',
          title: 'Zip Code',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Primary Contact
    defineField({
      name: 'primaryContact',
      title: 'Primary Contact',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Contact Person Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'title',
          title: 'Title/Position',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
          validation: (Rule) => Rule.required().email(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Website
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({
        scheme: ['http', 'https'],
      }),
    }),

    // Classification
    defineField({
      name: 'isCoOwner',
      title: 'Co-owner of Hometown Connections',
      type: 'boolean',
      description: 'Check if this organization is a co-owner (will display with asterisk *)',
      initialValue: false,
    }),
    defineField({
      name: 'statesServed',
      title: 'States Served',
      type: 'array',
      of: [{
        type: 'string',
        options: {
          list: US_STATES,
        },
      }],
      validation: (Rule) => Rule.required().min(1),
      description: 'Select all states this affiliate serves',
    }),

    // Additional Information
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Additional information about the affiliate (optional)',
    }),

    // Status
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Uncheck to hide this affiliate from the public website',
      initialValue: true,
    }),

    // Order
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order for displaying affiliates (lower numbers appear first)',
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],

  preview: {
    select: {
      title: 'organizationName',
      state: 'address.state',
      isCoOwner: 'isCoOwner',
      logo: 'logo',
      isActive: 'isActive',
    },
    prepare({ title, state, isCoOwner, logo, isActive }) {
      return {
        title: `${title} ${isCoOwner ? '*' : ''}`,
        subtitle: `${state || 'No state'} ${!isActive ? '(Inactive)' : ''}`,
        media: logo,
      }
    },
  },

  orderings: [
    {
      title: 'State (A-Z)',
      name: 'stateAsc',
      by: [
        { field: 'address.state', direction: 'asc' },
        { field: 'organizationName', direction: 'asc' },
      ],
    },
    {
      title: 'Organization Name (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'organizationName', direction: 'asc' }],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'organizationName', direction: 'asc' },
      ],
    },
  ],
})
