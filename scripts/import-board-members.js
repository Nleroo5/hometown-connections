/**
 * Import Board Members for Hometown Connections
 * Data sourced from: https://www.hometownconnections.com/about/board-members/
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

// Real board members from Hometown Connections website - EXACTLY AS SHOWN ON LIVE SITE
// Source: https://www.hometownconnections.com/about/board-members/
const boardMembersData = [
  {
    name: 'Randy S. Howard',
    role: 'Board Chair',
    department: 'board',
    showOnTeamPage: false, // Board members shown on separate page
    order: 1,
  },
  {
    name: 'Brandon Renaud',
    role: 'Board Vice Chair',
    department: 'board',
    showOnTeamPage: false,
    order: 2,
  },
  {
    name: 'Ken Nolan',
    role: 'Treasurer',
    department: 'board',
    showOnTeamPage: false,
    order: 3,
  },
  {
    name: 'Jeff Haas',
    role: 'Secretary',
    department: 'board',
    showOnTeamPage: false,
    order: 4,
  },
  {
    name: 'Mark Ennis',
    role: '', // No title on live site
    department: 'board',
    showOnTeamPage: false,
    order: 5,
  },
  {
    name: 'Branndon Kelley',
    role: '', // No title on live site
    department: 'board',
    showOnTeamPage: false,
    order: 6,
  },
];

async function importBoardMembers() {
  console.log('🚀 Starting Board Members Import...\n');
  console.log(`📊 Total board members to import: ${boardMembersData.length}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const member of boardMembersData) {
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
  console.log('✅ BOARD MEMBERS IMPORT COMPLETE');
  console.log('═══════════════════════════════════════════════════\n');
  console.log('📊 Import Summary:');
  console.log(`   Total Board Members: ${boardMembersData.length}`);
  console.log(`   ✅ Successfully Imported: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📈 Success Rate: ${((successCount / boardMembersData.length) * 100).toFixed(1)}%`);
  console.log('\n🎯 Next Steps:');
  console.log('   1. Add board member photos in Sanity Studio');
  console.log('   2. View board members at /about/board');
  console.log('\n');

  if (errorCount > 0) {
    process.exit(1);
  }
}

importBoardMembers();
