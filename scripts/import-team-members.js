/**
 * Import Team Members for Hometown Connections
 * Data sourced from: https://www.hometownconnections.com/about/our-team/
 * Date: 2025-10-31
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  useCdn: false,
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
  apiVersion: '2024-01-01',
});

// Real team members from Hometown Connections website - EXACTLY AS SHOWN ON LIVE SITE
// Source: https://www.hometownconnections.com/about/our-team/
// ONLY 4 team members shown on live site (not 6)
const teamMembersData = [
  {
    name: 'Marc Gerken, PE',
    role: 'President & CEO',
    department: 'leadership',
    showOnTeamPage: true,
    order: 1,
  },
  {
    name: 'Mark McCain',
    role: 'Executive Consultant / Strategic Planning',
    department: 'leadership',
    showOnTeamPage: true,
    order: 2,
  },
  {
    name: 'Nilaksh Kothari, PE',
    role: 'Executive Consultant',
    department: 'technology',
    showOnTeamPage: true,
    order: 3,
  },
  {
    name: 'Annette DuPont-Ewing',
    role: 'Director of Marketing',
    department: 'business-development',
    showOnTeamPage: true,
    order: 4,
  },
];

async function importTeamMembers() {
  console.log('🚀 Starting Team Members Import...\n');
  console.log(`📊 Total team members to import: ${teamMembersData.length}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const member of teamMembersData) {
    try {
      const doc = {
        _type: 'teamMember',
        ...member,
        slug: {
          _type: 'slug',
          current: member.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, ''),
        },
      };

      await client.create(doc);
      successCount++;
      console.log(`✅ Imported: ${member.name} - ${member.role}`);
    } catch (error) {
      errorCount++;
      console.error(`❌ Error importing ${member.name}:`, error.message);
    }
  }

  console.log('\n═══════════════════════════════════════════════════');
  console.log('✅ TEAM MEMBERS IMPORT COMPLETE');
  console.log('═══════════════════════════════════════════════════\n');
  console.log('📊 Import Summary:');
  console.log(`   Total Team Members: ${teamMembersData.length}`);
  console.log(`   ✅ Successfully Imported: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📈 Success Rate: ${((successCount / teamMembersData.length) * 100).toFixed(1)}%`);
  console.log('\n🎯 Next Steps:');
  console.log('   1. Add team member photos in Sanity Studio');
  console.log('   2. Add full biographies in Sanity Studio');
  console.log('   3. Add LinkedIn URLs in Sanity Studio');
  console.log('\n');

  if (errorCount > 0) {
    process.exit(1);
  }
}

importTeamMembers();
