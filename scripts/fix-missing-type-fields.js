/**
 * Fix missing _type fields in service fullDescription blocks
 * This ensures all blocks have _type: 'block' and all children have _type: 'span'
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
});

// Fix _type fields in blocks
function fixTypeFields(blocks) {
  if (!blocks || !Array.isArray(blocks)) return blocks;

  return blocks.map(block => {
    const updatedBlock = {
      ...block,
      _type: 'block', // Always ensure _type is 'block'
    };

    if (block.children && Array.isArray(block.children)) {
      updatedBlock.children = block.children.map(child => ({
        ...child,
        _type: 'span', // Always ensure child _type is 'span'
      }));
    }

    return updatedBlock;
  });
}

async function fixMissingTypes() {
  console.log('🔧 Fixing missing _type fields in all service documents...\n');

  try {
    const query = `*[_type == "service"] {
      _id,
      title,
      fullDescription
    }`;

    const services = await client.fetch(query);
    console.log(`📊 Found ${services.length} services to fix\n`);

    let updatedCount = 0;

    for (const service of services) {
      console.log(`🔍 Fixing: ${service.title}`);

      if (!service.fullDescription || !Array.isArray(service.fullDescription)) {
        console.log('   ⚠️  No fullDescription found, skipping\n');
        continue;
      }

      // Fix _type fields in all blocks
      const updatedBlocks = fixTypeFields(service.fullDescription);

      // Update the document
      await client
        .patch(service._id)
        .set({ fullDescription: updatedBlocks })
        .commit();

      console.log('   ✅ Fixed _type fields\n');
      updatedCount++;
    }

    console.log('='.repeat(60));
    console.log('📊 Summary:');
    console.log(`   Total services: ${services.length}`);
    console.log(`   Updated: ${updatedCount}`);
    console.log('='.repeat(60));

    if (updatedCount > 0) {
      console.log('\n🎉 Successfully fixed all _type fields!');
      console.log('✅ All services should now load correctly');
      console.log('✅ Refresh the AMI page to see the fix');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixMissingTypes().catch(console.error);
