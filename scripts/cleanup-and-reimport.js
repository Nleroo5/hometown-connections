/**
 * Cleanup Old Data and Re-import Correct Data
 * This will delete old team/board members and re-import with correct data
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  useCdn: false,
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
  apiVersion: '2024-01-01',
});

async function deleteAllTeamAndBoard() {
  console.log('🗑️  Deleting all existing team and board members...\n');

  const query = `*[_type == "teamMember"]._id`;
  const ids = await client.fetch(query);

  console.log(`Found ${ids.length} team/board members to delete`);

  for (const id of ids) {
    try {
      await client.delete(id);
      console.log(`✅ Deleted: ${id}`);
    } catch (error) {
      console.error(`❌ Error deleting ${id}:`, error.message);
    }
  }

  console.log(`\n✅ Deleted ${ids.length} records\n`);
  return ids.length;
}

async function importTeamMembers() {
  console.log('📥 Importing team members...\n');

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

  let successCount = 0;

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
      console.log(`✅ Imported: ${member.name}`);
    } catch (error) {
      console.error(`❌ Error importing ${member.name}:`, error.message);
    }
  }

  console.log(`\n✅ Imported ${successCount}/${teamMembersData.length} team members\n`);
  return successCount;
}

async function importBoardMembers() {
  console.log('📥 Importing board members...\n');

  const boardMembersData = [
    {
      name: 'Randy S. Howard',
      role: 'Board Chair',
      department: 'board',
      showOnTeamPage: false,
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

  let successCount = 0;

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
      console.log(`✅ Imported: ${member.name}${member.role ? ' - ' + member.role : ' (no title)'}`);
    } catch (error) {
      console.error(`❌ Error importing ${member.name}:`, error.message);
    }
  }

  console.log(`\n✅ Imported ${successCount}/${boardMembersData.length} board members\n`);
  return successCount;
}

async function run() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║     CLEANUP AND RE-IMPORT TEAM/BOARD MEMBERS     ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  try {
    // Step 1: Delete all existing
    const deleted = await deleteAllTeamAndBoard();

    // Step 2: Import team members
    const teamImported = await importTeamMembers();

    // Step 3: Import board members
    const boardImported = await importBoardMembers();

    // Summary
    console.log('═══════════════════════════════════════════════════');
    console.log('✅ CLEANUP AND RE-IMPORT COMPLETE');
    console.log('═══════════════════════════════════════════════════\n');
    console.log(`📊 Summary:`);
    console.log(`   Deleted: ${deleted} old records`);
    console.log(`   Imported: ${teamImported} team members`);
    console.log(`   Imported: ${boardImported} board members`);
    console.log(`   Total: ${teamImported + boardImported} new records\n`);
    console.log('🎯 Next Steps:');
    console.log('   1. Run audit: node scripts/final-audit.js');
    console.log('   2. Team and Board should now show 100% accuracy\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

run();
