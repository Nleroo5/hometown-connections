/**
 * Delete all services created on Oct 31, 2025
 * Keep only the Nov 2, 2025 services with exact content from old site
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
});

// IDs of old services from Oct 31 to delete
const oldServiceIds = [
  'CLZyEnOmHFQ0HoyBtEY1XM', // Operations
  'CLZyEnOmHFQ0HoyBtEY1eI', // Cybersecurity
  'CLZyEnOmHFQ0HoyBtEY1iS', // Business Strategy
  'VzElbecBTke30RM0jBgYWj', // Customer Care
  'CLZyEnOmHFQ0HoyBtEY1sA', // Finance
  'CLZyEnOmHFQ0HoyBtEY2Xm', // Workforce
];

async function deleteOldServices() {
  console.log('🗑️  Deleting 6 old services from Oct 31...\n');

  let deleted = 0;

  for (const id of oldServiceIds) {
    try {
      await client.delete(id);
      console.log(`✅ Deleted: ${id}`);
      deleted++;
    } catch (error) {
      console.error(`❌ Error deleting ${id}:`, error.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`🎉 Deleted ${deleted} old services`);
  console.log('='.repeat(60));
  console.log('\n✅ Remaining: 8 new services with exact content from old site');
  console.log('\n📋 Next: Run verify-services.js to confirm');
}

deleteOldServices().catch(console.error);
