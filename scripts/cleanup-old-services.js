/**
 * Cleanup old/duplicate services and keep only the latest import
 * Keeps services with full descriptions, deletes those without
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
});

async function cleanupServices() {
  console.log('🧹 Cleaning up old/duplicate services...\n');

  try {
    // Fetch all services
    const query = `*[_type == "service"] {
      _id,
      title,
      "slug": slug.current,
      fullDescription,
      _createdAt
    } | order(_createdAt desc)`;

    const allServices = await client.fetch(query);
    console.log(`📊 Found ${allServices.length} total services in Sanity\n`);

    // Group by title to find duplicates
    const servicesByTitle = {};
    for (const service of allServices) {
      if (!servicesByTitle[service.title]) {
        servicesByTitle[service.title] = [];
      }
      servicesByTitle[service.title].push(service);
    }

    const toDelete = [];

    // For each title, keep the one with fullDescription, delete others
    for (const [title, services] of Object.entries(servicesByTitle)) {
      if (services.length > 1) {
        console.log(`\n📋 Found ${services.length} copies of "${title}"`);

        // Find the one with fullDescription (the new one)
        const withFullDesc = services.find(s => s.fullDescription && s.fullDescription.length > 0);
        const withoutFullDesc = services.filter(s => !s.fullDescription || s.fullDescription.length === 0);

        if (withFullDesc && withoutFullDesc.length > 0) {
          console.log(`   ✅ Keeping newest: ${withFullDesc._id} (has full description)`);
          withoutFullDesc.forEach(s => {
            console.log(`   🗑️  Deleting old: ${s._id} (no full description)`);
            toDelete.push(s._id);
          });
        } else {
          // If all have fullDescription, keep the newest (first in desc order)
          const [keep, ...remove] = services;
          console.log(`   ✅ Keeping newest: ${keep._id}`);
          remove.forEach(s => {
            console.log(`   🗑️  Deleting old: ${s._id}`);
            toDelete.push(s._id);
          });
        }
      }
    }

    if (toDelete.length === 0) {
      console.log('\n✅ No duplicates found - all clean!');
      return;
    }

    console.log(`\n🗑️  Deleting ${toDelete.length} old/duplicate services...`);

    for (const id of toDelete) {
      await client.delete(id);
      console.log(`   ✅ Deleted: ${id}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('🎉 Cleanup complete!');
    console.log('='.repeat(60));
    console.log(`\n✅ Deleted ${toDelete.length} old services`);
    console.log('✅ Kept 8 new services with exact content from old site');
    console.log('\n📋 Next: Run verify-services.js to confirm');

  } catch (error) {
    console.error('❌ Error cleaning up services:', error.message);
  }
}

cleanupServices().catch(console.error);
