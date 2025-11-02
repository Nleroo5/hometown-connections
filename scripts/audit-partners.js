/**
 * 100% ACCURACY AUDIT - Partners
 * Verifies all 16 partners match old site EXACTLY
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Expected partners from old site
const expectedPartners = {
  'Acumen': 'Utility Security Consulting, Operations Technology Engineering, Regulatory Compliance',
  'DivDat': 'Utility Payment Solutions',
  'Energy Southeast - A Cooperative District': 'Energy Savings Through Prepayment',
  'Exacter': 'Cutting edge reliability technology',
  'GreatBlue Research': 'Market Research',
  'Hometown Connections, Inc.': 'Organizational Transformation, Board Governance, Totally Responsible Person® Training, Strategic Planning, Cyber Security Check Up',
  'Katama Technologies, Inc.': 'Technology Planning',
  'Leverage Leadership': 'Senior Leader Development, Frontline Leader Development, Organizational Effectiveness, Diversity & Inclusion',
  'Marsh USA': 'Utility Cyber Liability Insurance, Utility Business Insurance',
  'MFP Connect': 'Energy Workforce Solutions',
  'PowerSecure': 'Microgrids/Distributed Energy Generation',
  'Questline Digital': 'Communication Solutions for Key Accounts',
  'SpryPoint': 'Software as a Service, Mobile Field Service',
  'Stem': 'AI-driven Clean Energy Solutions',
  'The Energy Authority': 'Energy Trading & Risk',
  'Utility Financial Solutions, LLC': 'Cost of Service, Rate Design, Financial Planning'
};

async function auditPartners() {
  console.log('🔍 100% ACCURACY AUDIT - Partners');
  console.log('Comparing Sanity content vs old site\n');
  console.log('='.repeat(70) + '\n');

  try {
    const partners = await client.fetch(`*[_type == "partner"] | order(companyName asc){companyName,description}`);

    let totalChecks = 0;
    let passedChecks = 0;
    let failedChecks = 0;
    const errors = [];

    // Check count
    totalChecks++;
    if (partners.length === 16) {
      console.log(`✅ Partner Count: ${partners.length} (correct)\n`);
      passedChecks++;
    } else {
      console.log(`❌ Partner Count: Expected 16, got ${partners.length}\n`);
      failedChecks++;
      errors.push('Incorrect partner count');
    }

    // Check each partner
    for (const partner of partners) {
      const expectedDesc = expectedPartners[partner.companyName];

      if (!expectedDesc) {
        console.log(`❌ UNEXPECTED PARTNER: ${partner.companyName}\n`);
        failedChecks++;
        totalChecks++;
        continue;
      }

      console.log(`📄 ${partner.companyName}`);
      totalChecks++;

      if (partner.description === expectedDesc) {
        console.log(`   ✅ EXACT MATCH\n`);
        passedChecks++;
      } else {
        console.log(`   ❌ MISMATCH`);
        console.log(`   Expected: "${expectedDesc}"`);
        console.log(`   Got:      "${partner.description}"\n`);
        failedChecks++;
        errors.push(`${partner.companyName} - description mismatch`);
      }
    }

    // Check for missing partners
    for (const name in expectedPartners) {
      const found = partners.find(p => p.companyName === name);
      if (!found) {
        console.log(`❌ MISSING PARTNER: ${name}\n`);
        failedChecks++;
        totalChecks++;
        errors.push(`Missing partner: ${name}`);
      }
    }

    // Final report
    console.log('='.repeat(70));
    console.log('📊 AUDIT SUMMARY');
    console.log('='.repeat(70));
    console.log(`Total Checks: ${totalChecks}`);
    console.log(`✅ Passed: ${passedChecks}`);
    console.log(`❌ Failed: ${failedChecks}`);
    console.log(`Accuracy: ${((passedChecks / totalChecks) * 100).toFixed(2)}%`);
    console.log('='.repeat(70));

    if (failedChecks === 0) {
      console.log('\n🎉 100% ACCURACY VERIFIED!');
      console.log('All partners match old site EXACTLY!');
    } else {
      console.log('\n❌ ACCURACY ISSUES FOUND:');
      errors.forEach((error, i) => {
        console.log(`   ${i + 1}. ${error}`);
      });
    }

  } catch (error) {
    console.error('❌ Error during audit:', error.message);
  }
}

auditPartners().catch(console.error);
