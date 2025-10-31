/**
 * COMPREHENSIVE FINAL AUDIT
 * Verifies all data matches https://www.hometownconnections.com/
 * Date: 2025-10-31
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
  useCdn: false,
});

// Expected data from live site
const EXPECTED_DATA = {
  teamMembers: {
    count: 4,
    members: [
      { name: 'Marc Gerken, PE', role: 'President & CEO' },
      { name: 'Mark McCain', role: 'Executive Consultant / Strategic Planning' },
      { name: 'Nilaksh Kothari, PE', role: 'Executive Consultant' },
      { name: 'Annette DuPont-Ewing', role: 'Director of Marketing' }
    ]
  },
  boardMembers: {
    count: 6,
    members: [
      { name: 'Randy S. Howard', role: 'Board Chair' },
      { name: 'Brandon Renaud', role: 'Board Vice Chair' },
      { name: 'Ken Nolan', role: 'Treasurer' },
      { name: 'Jeff Haas', role: 'Secretary' },
      { name: 'Mark Ennis', role: '' },
      { name: 'Branndon Kelley', role: '' }
    ]
  },
  affiliates: {
    count: 34,
    coOwnerCount: 6
  }
};

async function auditTeamMembers() {
  console.log('\n📋 AUDITING TEAM MEMBERS...');
  console.log('═══════════════════════════════════════════════════\n');

  const query = `*[_type == "teamMember" && showOnTeamPage == true] | order(order asc) {
    name,
    role
  }`;

  const teamMembers = await client.fetch(query);

  console.log(`Expected: ${EXPECTED_DATA.teamMembers.count} team members`);
  console.log(`Found: ${teamMembers.length} team members\n`);

  let matches = 0;
  let mismatches = [];

  EXPECTED_DATA.teamMembers.members.forEach((expected, index) => {
    const actual = teamMembers[index];
    if (actual) {
      const nameMatch = actual.name === expected.name;
      const roleMatch = actual.role === expected.role;

      if (nameMatch && roleMatch) {
        matches++;
        console.log(`✅ ${expected.name} - ${expected.role}`);
      } else {
        mismatches.push({
          expected,
          actual,
          issue: !nameMatch ? 'name mismatch' : 'role mismatch'
        });
        console.log(`❌ MISMATCH:`);
        console.log(`   Expected: ${expected.name} - ${expected.role}`);
        console.log(`   Got: ${actual.name} - ${actual.role}`);
      }
    } else {
      mismatches.push({ expected, actual: null, issue: 'missing' });
      console.log(`❌ MISSING: ${expected.name}`);
    }
  });

  return {
    category: 'Team Members',
    expected: EXPECTED_DATA.teamMembers.count,
    actual: teamMembers.length,
    matches,
    mismatches,
    accuracy: (matches / EXPECTED_DATA.teamMembers.count) * 100
  };
}

async function auditBoardMembers() {
  console.log('\n📋 AUDITING BOARD MEMBERS...');
  console.log('═══════════════════════════════════════════════════\n');

  const query = `*[_type == "teamMember" && department == "board"] | order(order asc) {
    name,
    role
  }`;

  const boardMembers = await client.fetch(query);

  console.log(`Expected: ${EXPECTED_DATA.boardMembers.count} board members`);
  console.log(`Found: ${boardMembers.length} board members\n`);

  let matches = 0;
  let mismatches = [];

  EXPECTED_DATA.boardMembers.members.forEach((expected, index) => {
    const actual = boardMembers[index];
    if (actual) {
      const nameMatch = actual.name === expected.name;
      const roleMatch = actual.role === expected.role;

      if (nameMatch && roleMatch) {
        matches++;
        console.log(`✅ ${expected.name}${expected.role ? ' - ' + expected.role : ' (no title)'}`);
      } else {
        mismatches.push({
          expected,
          actual,
          issue: !nameMatch ? 'name mismatch' : 'role mismatch'
        });
        console.log(`❌ MISMATCH:`);
        console.log(`   Expected: ${expected.name}${expected.role ? ' - ' + expected.role : ' (no title)'}`);
        console.log(`   Got: ${actual.name}${actual.role ? ' - ' + actual.role : ' (no title)'}`);
      }
    } else {
      mismatches.push({ expected, actual: null, issue: 'missing' });
      console.log(`❌ MISSING: ${expected.name}`);
    }
  });

  return {
    category: 'Board Members',
    expected: EXPECTED_DATA.boardMembers.count,
    actual: boardMembers.length,
    matches,
    mismatches,
    accuracy: (matches / EXPECTED_DATA.boardMembers.count) * 100
  };
}

async function auditAffiliates() {
  console.log('\n📋 AUDITING AFFILIATES...');
  console.log('═══════════════════════════════════════════════════\n');

  const query = `*[_type == "affiliate"] {
    organizationName,
    isCoOwner,
    "state": address.state
  }`;

  const affiliates = await client.fetch(query);
  const coOwners = affiliates.filter(a => a.isCoOwner);

  console.log(`Expected: ${EXPECTED_DATA.affiliates.count} affiliates`);
  console.log(`Found: ${affiliates.length} affiliates`);
  console.log(`Expected: ${EXPECTED_DATA.affiliates.coOwnerCount} co-owners`);
  console.log(`Found: ${coOwners.length} co-owners\n`);

  const countMatch = affiliates.length === EXPECTED_DATA.affiliates.count;
  const coOwnerMatch = coOwners.length === EXPECTED_DATA.affiliates.coOwnerCount;

  if (countMatch && coOwnerMatch) {
    console.log('✅ Affiliate count matches expected');
    console.log('✅ Co-owner count matches expected');
  } else {
    if (!countMatch) {
      console.log(`❌ Affiliate count mismatch: Missing ${EXPECTED_DATA.affiliates.count - affiliates.length} affiliates`);
    }
    if (!coOwnerMatch) {
      console.log(`❌ Co-owner count mismatch: Expected ${EXPECTED_DATA.affiliates.coOwnerCount}, got ${coOwners.length}`);
    }
  }

  console.log('\nCo-owners found:');
  coOwners.forEach(co => {
    console.log(`  * ${co.organizationName} (${co.state})`);
  });

  return {
    category: 'Affiliates',
    expected: EXPECTED_DATA.affiliates.count,
    actual: affiliates.length,
    matches: countMatch && coOwnerMatch ? 1 : 0,
    mismatches: countMatch && coOwnerMatch ? [] : ['count mismatch'],
    accuracy: (affiliates.length / EXPECTED_DATA.affiliates.count) * 100,
    coOwnerAccuracy: (coOwners.length / EXPECTED_DATA.affiliates.coOwnerCount) * 100
  };
}

async function checkHeroContent() {
  console.log('\n📋 CHECKING HERO CONTENT...');
  console.log('═══════════════════════════════════════════════════\n');

  const heroFile = path.join(__dirname, '../components/sections/Hero.tsx');
  const content = fs.readFileSync(heroFile, 'utf8');

  const expectedTitle = 'A Single Source For Community-Owned Utility Solutions';
  const expectedSubtitle = 'Hometown Connections, Inc. is a national, non-profit utility services organization specializing in the unique challenges of community-owned utilities.';

  const titleMatch = content.includes(expectedTitle);
  const subtitleMatch = content.includes(expectedSubtitle);

  if (titleMatch) {
    console.log('✅ Hero title matches live site');
  } else {
    console.log('❌ Hero title does NOT match live site');
  }

  if (subtitleMatch) {
    console.log('✅ Hero subtitle matches live site');
  } else {
    console.log('❌ Hero subtitle does NOT match live site');
  }

  return {
    category: 'Hero Content',
    titleMatch,
    subtitleMatch,
    accuracy: (titleMatch && subtitleMatch) ? 100 : 50
  };
}

async function runFinalAudit() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║   HOMETOWN CONNECTIONS - COMPREHENSIVE AUDIT      ║');
  console.log('║   Verifying against: hometownconnections.com      ║');
  console.log('╚═══════════════════════════════════════════════════╝');

  try {
    const heroResults = await checkHeroContent();
    const teamResults = await auditTeamMembers();
    const boardResults = await auditBoardMembers();
    const affiliateResults = await auditAffiliates();

    // Final Summary
    console.log('\n\n╔═══════════════════════════════════════════════════╗');
    console.log('║              FINAL AUDIT SUMMARY                  ║');
    console.log('╚═══════════════════════════════════════════════════╝\n');

    console.log('📊 ACCURACY BREAKDOWN:\n');
    console.log(`   Hero Content:    ${heroResults.accuracy.toFixed(0)}%`);
    console.log(`   Team Members:    ${teamResults.accuracy.toFixed(0)}% (${teamResults.matches}/${teamResults.expected})`);
    console.log(`   Board Members:   ${boardResults.accuracy.toFixed(0)}% (${boardResults.matches}/${boardResults.expected})`);
    console.log(`   Affiliates:      ${affiliateResults.accuracy.toFixed(0)}% (${affiliateResults.actual}/${affiliateResults.expected})`);

    const overallAccuracy = (
      (heroResults.accuracy +
       teamResults.accuracy +
       boardResults.accuracy +
       affiliateResults.accuracy) / 4
    ).toFixed(1);

    console.log(`\n   ⭐ OVERALL ACCURACY: ${overallAccuracy}%\n`);

    if (overallAccuracy >= 100) {
      console.log('✅ ✅ ✅ PERFECT! All data matches live site exactly! ✅ ✅ ✅\n');
    } else if (overallAccuracy >= 95) {
      console.log('✅ Nearly perfect! Minor issues to resolve:\n');
      if (affiliateResults.accuracy < 100) {
        console.log(`   - Missing ${EXPECTED_DATA.affiliates.count - affiliateResults.actual} affiliates`);
        console.log('   - Run: node scripts/import-missing-affiliates.js\n');
      }
    } else {
      console.log('⚠️  Issues found that need attention:\n');
      if (teamResults.mismatches.length > 0) {
        console.log(`   - ${teamResults.mismatches.length} team member mismatches`);
      }
      if (boardResults.mismatches.length > 0) {
        console.log(`   - ${boardResults.mismatches.length} board member mismatches`);
      }
      if (affiliateResults.accuracy < 100) {
        console.log(`   - ${EXPECTED_DATA.affiliates.count - affiliateResults.actual} missing affiliates`);
      }
      console.log('');
    }

    console.log('═══════════════════════════════════════════════════\n');

    // Exit code based on accuracy
    if (overallAccuracy < 100) {
      process.exit(1);
    }

  } catch (error) {
    console.error('\n❌ Error during audit:', error.message);
    console.error('\nPossible causes:');
    console.error('  - Sanity token may be expired');
    console.error('  - Network connection issue');
    console.error('  - Sanity service unavailable\n');
    process.exit(1);
  }
}

runFinalAudit();
