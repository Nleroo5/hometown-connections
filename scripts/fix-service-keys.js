/**
 * Fix missing _key properties in existing service fullDescription blocks
 * This adds the required _key to each block and child for Sanity compatibility
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
});

// Helper function to generate unique keys
function generateKey() {
  return Math.random().toString(36).substring(2, 15)
}

// Add keys to blocks and ensure _type is set
function addKeysToBlocks(blocks) {
  if (!blocks || !Array.isArray(blocks)) return blocks;

  return blocks.map(block => {
    const updatedBlock = {
      ...block,
      _type: block._type || 'block', // Ensure _type is always set
      _key: block._key || generateKey(),
      markDefs: block.markDefs || [],
    };

    if (block.children && Array.isArray(block.children)) {
      updatedBlock.children = block.children.map(child => ({
        ...child,
        _type: child._type || 'span', // Ensure child _type is always set
        _key: child._key || generateKey(),
        marks: child.marks || [],
      }));
    }

    return updatedBlock;
  });
}

async function fixServiceKeys() {
  console.log('🔧 Fixing missing _key properties in service documents...\n');

  try {
    // Fetch all services
    const query = `*[_type == "service"] {
      _id,
      _rev,
      title,
      fullDescription
    }`;

    const services = await client.fetch(query);
    console.log(`📊 Found ${services.length} services to check\n`);

    let updatedCount = 0;

    for (const service of services) {
      console.log(`🔍 Checking: ${service.title}`);

      if (!service.fullDescription || !Array.isArray(service.fullDescription)) {
        console.log('   ⚠️  No fullDescription found, skipping\n');
        continue;
      }

      // Check if keys are missing
      const needsUpdate = service.fullDescription.some(
        block => !block._key || (block.children && block.children.some(child => !child._key))
      );

      if (!needsUpdate) {
        console.log('   ✅ Already has keys, skipping\n');
        continue;
      }

      // Add keys to all blocks
      const updatedBlocks = addKeysToBlocks(service.fullDescription);

      // Update the document
      await client
        .patch(service._id)
        .set({ fullDescription: updatedBlocks })
        .commit();

      console.log('   ✅ Fixed missing keys\n');
      updatedCount++;
    }

    console.log('='.repeat(60));
    console.log('📊 Summary:');
    console.log(`   Total services: ${services.length}`);
    console.log(`   Updated: ${updatedCount}`);
    console.log(`   Already correct: ${services.length - updatedCount}`);
    console.log('='.repeat(60));

    if (updatedCount > 0) {
      console.log('\n🎉 Successfully fixed all missing keys!');
      console.log('✅ All services should now load correctly in Sanity Studio');
      console.log('✅ All service pages should now display on the website');
    } else {
      console.log('\n✅ All services already have correct keys!');
    }

  } catch (error) {
    console.error('❌ Error fixing keys:', error.message);
  }
}

fixServiceKeys().catch(console.error);
