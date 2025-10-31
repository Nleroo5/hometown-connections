/**
 * Import Missing Affiliates for Hometown Connections
 * Adding the 9 missing affiliates identified from live site audit
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

// Missing affiliates identified from live site audit (9 organizations)
const missingAffiliatesData = [
  // Connecticut - Hometown Connections
  {
    organizationName: 'Hometown Connections, Inc.',
    address: {
      street: '651 Commerce Drive',
      city: 'Roseville',
      state: 'CT',
      zipCode: '95678',
    },
    primaryContact: {
      name: 'Annette DuPont-Ewing',
      title: 'Marketing Director',
      phone: '502-395-0082',
      email: 'acdupont-ewing@hometownconnections.com',
    },
    websiteUrl: 'https://www.hometownconnections.com',
    isCoOwner: false,
    statesServed: ['CT'],
    isActive: true,
    description: 'Hometown Connections affiliate serving Connecticut utilities.',
  },
  // Georgia - Hometown Connections
  {
    organizationName: 'Hometown Connections, Inc.',
    address: {
      street: '651 Commerce Drive',
      city: 'Roseville',
      state: 'GA',
      zipCode: '95678',
    },
    primaryContact: {
      name: 'Annette DuPont-Ewing',
      title: 'Director of Marketing',
      phone: '502-395-0082',
      email: 'acdupont-ewing@hometownconnections.com',
    },
    websiteUrl: 'https://www.hometownconnections.com',
    isCoOwner: false,
    statesServed: ['GA'],
    isActive: true,
    description: 'Hometown Connections affiliate serving Georgia utilities.',
  },
  // Iowa - NMPP Energy
  {
    organizationName: 'NMPP Energy',
    address: {
      street: '8377 Glynoaks Drive',
      city: 'Lincoln',
      state: 'IA',
      zipCode: '68516',
    },
    primaryContact: {
      name: 'Nicole Kubik',
      title: 'Member Relations Representative',
      phone: '402-473-8237',
      email: 'nkubik@nmppenergy.org',
    },
    websiteUrl: 'http://www.nmppenergy.org/',
    isCoOwner: false,
    statesServed: ['IA', 'CO', 'NE', 'WY'],
    isActive: true,
    description: 'NMPP Energy serving Iowa and regional utilities.',
  },
  // Iowa - Missouri River Energy Services
  {
    organizationName: 'Missouri River Energy Services',
    address: {
      street: 'P.O. Box 88920',
      city: 'Sioux Falls',
      state: 'IA',
      zipCode: '57109-8920',
    },
    primaryContact: {
      name: 'Tim Blodgett',
      title: 'Vice President of Member Services & Communications',
      phone: '800-678-4042',
      email: 'tim.blodgett@mrenergy.com',
    },
    websiteUrl: 'https://www.mrenergy.com/',
    isCoOwner: false,
    statesServed: ['IA', 'MN', 'ND', 'SD'],
    isActive: true,
    description: 'Missouri River Energy Services serving Iowa and regional utilities.',
  },
  // Kentucky - Hometown Connections
  {
    organizationName: 'Hometown Connections',
    address: {
      street: '651 Commerce Drive',
      city: 'Roseville',
      state: 'KY',
      zipCode: '95678',
    },
    primaryContact: {
      name: 'Annette DuPont-Ewing',
      title: 'Marketing Director',
      phone: '502-395-0082',
      email: 'acdupont-ewing@hometownconnections.com',
    },
    websiteUrl: 'https://www.hometownconnections.com',
    isCoOwner: false,
    statesServed: ['KY'],
    isActive: true,
    description: 'Hometown Connections affiliate serving Kentucky utilities.',
  },
  // Maine - Hometown Connections
  {
    organizationName: 'Hometown Connections, Inc.',
    address: {
      street: '651 Commerce Drive',
      city: 'Roseville',
      state: 'ME',
      zipCode: '95678',
    },
    primaryContact: {
      name: 'Annette DuPont-Ewing',
      title: 'Marketing Director',
      phone: '502-395-0082',
      email: 'acdupont-ewing@hometownconnections.com',
    },
    websiteUrl: 'https://www.hometownconnections.com',
    isCoOwner: false,
    statesServed: ['ME'],
    isActive: true,
    description: 'Hometown Connections affiliate serving Maine utilities.',
  },
  // Massachusetts - Hometown Connections
  {
    organizationName: 'Hometown Connections, Inc.',
    address: {
      street: '651 Commerce Drive',
      city: 'Roseville',
      state: 'MA',
      zipCode: '95678',
    },
    primaryContact: {
      name: 'Annette DuPont-Ewing',
      title: 'Marketing Director',
      phone: '502-395-0082',
      email: 'acdupont-ewing@hometownconnections.com',
    },
    websiteUrl: 'https://www.hometownconnections.com',
    isCoOwner: false,
    statesServed: ['MA'],
    isActive: true,
    description: 'Hometown Connections affiliate serving Massachusetts utilities.',
  },
  // Minnesota - Missouri River Energy Services
  {
    organizationName: 'Missouri River Energy Services',
    address: {
      street: 'P.O. Box 88920',
      city: 'Sioux Falls',
      state: 'MN',
      zipCode: '57109-8920',
    },
    primaryContact: {
      name: 'Tim Blodgett',
      title: 'Vice President of Member Services & Communications',
      phone: '800-678-4042',
      email: 'tim.blodgett@mrenergy.com',
    },
    websiteUrl: 'https://www.mrenergy.com/',
    isCoOwner: false,
    statesServed: ['IA', 'MN', 'ND', 'SD'],
    isActive: true,
    description: 'Missouri River Energy Services serving Minnesota and regional utilities.',
  },
  // Mississippi - Energy Southeast (co-owner)
  {
    organizationName: 'Energy Southeast',
    address: {
      street: '80 TechnaCenter Drive',
      city: 'Montgomery',
      state: 'MS',
      zipCode: '36117',
    },
    primaryContact: {
      name: 'Lisa Miller',
      title: 'Manager of External Affairs',
      phone: '800-239-2632 ext. 1118',
      email: 'lmiller@amea.com',
    },
    websiteUrl: 'https://www.amea.com/',
    isCoOwner: true, // Co-owner
    statesServed: ['AL', 'MS'],
    isActive: true,
    description: 'Energy Southeast co-owner serving Mississippi utilities.',
  },
];

async function importMissingAffiliates() {
  console.log('🚀 Starting Missing Affiliates Import...\n');
  console.log(`📊 Total missing affiliates to import: ${missingAffiliatesData.length}\n`);

  let successCount = 0;
  let errorCount = 0;
  let duplicateCount = 0;

  for (const affiliate of missingAffiliatesData) {
    try {
      // Check if this affiliate already exists (by organization name and state)
      const existingQuery = `*[_type == "affiliate" && organizationName == $orgName && address.state == $state][0]`;
      const existing = await client.fetch(existingQuery, {
        orgName: affiliate.organizationName,
        state: affiliate.address.state,
      });

      if (existing) {
        console.log(`⚠️  Skipped (duplicate): ${affiliate.organizationName} (${affiliate.address.state})`);
        duplicateCount++;
        continue;
      }

      const doc = {
        _type: 'affiliate',
        ...affiliate,
      };

      await client.create(doc);
      successCount++;
      console.log(`✅ Imported: ${affiliate.organizationName} (${affiliate.address.state})${affiliate.isCoOwner ? ' *' : ''}`);
    } catch (error) {
      errorCount++;
      console.error(`❌ Error importing ${affiliate.organizationName}:`, error.message);
    }
  }

  console.log('\n═══════════════════════════════════════════════════');
  console.log('✅ MISSING AFFILIATES IMPORT COMPLETE');
  console.log('═══════════════════════════════════════════════════\n');
  console.log('📊 Import Summary:');
  console.log(`   Total to Import: ${missingAffiliatesData.length}`);
  console.log(`   ✅ Successfully Imported: ${successCount}`);
  console.log(`   ⚠️  Skipped (duplicates): ${duplicateCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📈 Success Rate: ${((successCount / (missingAffiliatesData.length - duplicateCount)) * 100).toFixed(1)}%`);
  console.log('\n🎯 Next Steps:');
  console.log('   1. Run audit script to verify total count: node scripts/audit-affiliates.js');
  console.log('   2. View affiliates at /affiliates');
  console.log('   3. Expected total after import: 34 unique organizations');
  console.log('\n');

  if (errorCount > 0) {
    process.exit(1);
  }
}

importMissingAffiliates();
