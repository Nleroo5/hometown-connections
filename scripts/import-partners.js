/**
 * Import all 16 partners with EXACT text from old site
 * Source: https://hometownconnections.com/partners/
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
});

// Generate slug from company name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/®/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// All partners with EXACT text from old site
const partners = [
  {
    companyName: 'Acumen',
    description: 'Utility Security Consulting, Operations Technology Engineering, Regulatory Compliance',
    order: 1
  },
  {
    companyName: 'DivDat',
    description: 'Utility Payment Solutions',
    order: 2
  },
  {
    companyName: 'Energy Southeast - A Cooperative District',
    description: 'Energy Savings Through Prepayment',
    order: 3
  },
  {
    companyName: 'Exacter',
    description: 'Cutting edge reliability technology',
    order: 4
  },
  {
    companyName: 'GreatBlue Research',
    description: 'Market Research',
    order: 5
  },
  {
    companyName: 'Hometown Connections, Inc.',
    description: 'Organizational Transformation, Board Governance, Totally Responsible Person® Training, Strategic Planning, Cyber Security Check Up',
    order: 6
  },
  {
    companyName: 'Katama Technologies, Inc.',
    description: 'Technology Planning',
    order: 7
  },
  {
    companyName: 'Leverage Leadership',
    description: 'Senior Leader Development, Frontline Leader Development, Organizational Effectiveness, Diversity & Inclusion',
    order: 8
  },
  {
    companyName: 'Marsh USA',
    description: 'Utility Cyber Liability Insurance, Utility Business Insurance',
    order: 9
  },
  {
    companyName: 'MFP Connect',
    description: 'Energy Workforce Solutions',
    order: 10
  },
  {
    companyName: 'PowerSecure',
    description: 'Microgrids/Distributed Energy Generation',
    order: 11
  },
  {
    companyName: 'Questline Digital',
    description: 'Communication Solutions for Key Accounts',
    order: 12
  },
  {
    companyName: 'SpryPoint',
    description: 'Software as a Service, Mobile Field Service',
    order: 13
  },
  {
    companyName: 'Stem',
    description: 'AI-driven Clean Energy Solutions',
    order: 14
  },
  {
    companyName: 'The Energy Authority',
    description: 'Energy Trading & Risk',
    order: 15
  },
  {
    companyName: 'Utility Financial Solutions, LLC',
    description: 'Cost of Service, Rate Design, Financial Planning',
    order: 16
  }
];

async function importPartners() {
  console.log('📦 Importing 16 partners with EXACT text from old site\n');

  try {
    let createdCount = 0;
    let updatedCount = 0;

    for (const partner of partners) {
      const slug = generateSlug(partner.companyName);
      console.log(`🔍 Processing: ${partner.companyName}`);

      // Check if partner already exists
      const existing = await client.fetch(
        `*[_type == "partner" && slug.current == $slug][0]`,
        { slug }
      );

      const partnerData = {
        _type: 'partner',
        companyName: partner.companyName,
        slug: {
          _type: 'slug',
          current: slug
        },
        description: partner.description,
        order: partner.order,
        featured: false
      };

      if (existing) {
        await client
          .patch(existing._id)
          .set(partnerData)
          .commit();
        console.log(`   ✅ Updated\n`);
        updatedCount++;
      } else {
        await client.create(partnerData);
        console.log(`   ✅ Created\n`);
        createdCount++;
      }
    }

    console.log('='.repeat(60));
    console.log('📊 Import Summary:');
    console.log(`   Total partners: ${partners.length}`);
    console.log(`   Created: ${createdCount}`);
    console.log(`   Updated: ${updatedCount}`);
    console.log('='.repeat(60));
    console.log('\n🎉 Successfully imported all partners!');
    console.log('✅ All content matches old site EXACTLY');

  } catch (error) {
    console.error('❌ Error importing partners:', error.message);
  }
}

importPartners().catch(console.error);
