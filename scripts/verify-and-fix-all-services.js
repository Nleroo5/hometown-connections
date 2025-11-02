/**
 * COMPREHENSIVE FIX: Verify and fix ALL service fullDescription blocks
 * Ensures every block and child has proper _type, _key, and structure
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
});

// Generate unique keys
function generateKey() {
  return Math.random().toString(36).substring(2, 15)
}

// Completely rebuild blocks with proper structure
function rebuildBlocks(blocks) {
  if (!blocks || !Array.isArray(blocks)) return [];

  return blocks.map(block => {
    // Ensure proper block structure
    const rebuiltBlock = {
      _type: 'block',
      _key: block._key || generateKey(),
      style: block.style || 'normal',
      markDefs: block.markDefs || [],
      children: [],
    };

    // Rebuild children
    if (block.children && Array.isArray(block.children)) {
      rebuiltBlock.children = block.children.map(child => ({
        _type: 'span',
        _key: child._key || generateKey(),
        text: child.text || '',
        marks: child.marks || [],
      }));
    } else {
      // If no children, create a default one
      rebuiltBlock.children = [{
        _type: 'span',
        _key: generateKey(),
        text: '',
        marks: [],
      }];
    }

    return rebuiltBlock;
  });
}

async function verifyAndFixAll() {
  console.log('🔧 COMPREHENSIVE FIX: Verifying and fixing ALL services\n');

  try {
    const query = `*[_type == "service"] {
      _id,
      title,
      fullDescription
    }`;

    const services = await client.fetch(query);
    console.log(`📊 Found ${services.length} services\n`);

    let fixedCount = 0;
    let issuesFound = 0;

    for (const service of services) {
      console.log(`🔍 Checking: ${service.title}`);

      if (!service.fullDescription || !Array.isArray(service.fullDescription)) {
        console.log('   ⚠️  No fullDescription, skipping\n');
        continue;
      }

      // Check for issues
      let hasIssues = false;
      for (const block of service.fullDescription) {
        if (!block._type || block._type === 'undefined' || !block._key) {
          hasIssues = true;
          issuesFound++;
          break;
        }
        if (block.children) {
          for (const child of block.children) {
            if (!child._type || child._type === 'undefined' || !child._key) {
              hasIssues = true;
              issuesFound++;
              break;
            }
          }
        }
      }

      if (hasIssues) {
        console.log('   ❌ Found issues - rebuilding blocks...');

        // Rebuild all blocks
        const rebuiltBlocks = rebuildBlocks(service.fullDescription);

        // Update the document
        await client
          .patch(service._id)
          .set({ fullDescription: rebuiltBlocks })
          .commit();

        console.log('   ✅ Fixed and rebuilt\n');
        fixedCount++;
      } else {
        console.log('   ✅ Already correct\n');
      }
    }

    console.log('='.repeat(60));
    console.log('📊 Summary:');
    console.log(`   Total services: ${services.length}`);
    console.log(`   Issues found: ${issuesFound}`);
    console.log(`   Fixed: ${fixedCount}`);
    console.log(`   Already correct: ${services.length - fixedCount}`);
    console.log('='.repeat(60));

    if (fixedCount > 0) {
      console.log('\n🎉 Successfully fixed all issues!');
      console.log('✅ All services should now render without errors');
    } else {
      console.log('\n✅ All services already have correct structure!');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

verifyAndFixAll().catch(console.error);
