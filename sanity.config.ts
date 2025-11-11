import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'hometown-connections',
  title: 'Hometown Connections CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/studio',
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Site Settings - Singleton
            S.listItem()
              .title('Site Settings')
              .icon(() => '⚙️')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),

            // News & Updates
            S.listItem()
              .title('News & Updates')
              .icon(() => '📰')
              .child(
                S.documentTypeList('newsPost')
                  .title('News & Updates')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),

            // Services
            S.listItem()
              .title('Services')
              .icon(() => '🛠️')
              .child(
                S.documentTypeList('service')
                  .title('Services')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),

            // Partners
            S.listItem()
              .title('Partners')
              .icon(() => '🤝')
              .child(
                S.documentTypeList('partner')
                  .title('Partners')
                  .defaultOrdering([{ field: 'companyName', direction: 'asc' }])
              ),

            // Affiliates
            S.listItem()
              .title('Affiliates')
              .icon(() => '🌐')
              .child(
                S.documentTypeList('affiliate')
                  .title('Affiliates')
                  .defaultOrdering([{ field: 'address.state', direction: 'asc' }])
              ),

            // Events
            S.listItem()
              .title('Events')
              .icon(() => '📅')
              .child(
                S.documentTypeList('event')
                  .title('Events')
                  .defaultOrdering([{ field: 'startDate', direction: 'desc' }])
              ),

            // Resources
            S.listItem()
              .title('Resources')
              .icon(() => '📚')
              .child(
                S.documentTypeList('resource')
                  .title('Resources')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),

            // Team
            S.listItem()
              .title('Team Members')
              .icon(() => '👥')
              .child(
                S.documentTypeList('teamMember')
                  .title('Team Members')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
