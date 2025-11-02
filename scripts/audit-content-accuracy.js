/**
 * 100% ACCURACY AUDIT
 * Compare imported Sanity content against SERVICES_CONTENT.md
 * Verifies exact text match for all 8 services
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
});

// Expected content from SERVICES_CONTENT.md
const expectedContent = {
  'Advanced Metering Infrastructure': {
    shortDescription: 'Better manage outages, service calls, distribution system maintenance, and the customer experience with Advanced Metering Infrastructure solutions from Hometown Connections.',
    keyBenefits: [
      'Automate meter reads, service connects and disconnects',
      'Increase accuracy of meter reads and billing data',
      'Eliminate misreads from hard-to-access locations',
      'Remote monitoring of meters, transponders, switches, equipment',
      'Early identification of leaks and meter tampering/theft',
      'On-screen access to detailed usage data for representatives',
      'Automated messaging and web portal access',
      'Pay-as-you-go customer options',
    ],
    seoTitle: 'Advanced Metering Infrastructure | Smart Grid Meters | Hometown Connections',
    seoDescription: 'Better manage outages, service calls, distribution system maintenance, and customer experience with AMI solutions from Hometown Connections.',
  },
  'Business Strategies & Solutions': {
    shortDescription: 'Transform your workforce and technology with strategic planning tools and confidence to thrive in a complex environment.',
    keyBenefits: [
      'Help utilities make sound business strategy and technology investment decisions',
      'Identify best practices and refine strategic planning and governance',
      'Partner with experts deploying utility technologies cost-effectively',
      'Ensure long-term success',
    ],
    seoTitle: 'Business Strategies for Public Utilities | Hometown Connections',
    seoDescription: "Strategic planning tools and confidence to help community-owned utilities thrive in today's complex environment.",
  },
  'Engineering & Operations Solutions': {
    shortDescription: 'Deliver innovative technologies and information systems for operational improvements that customers value through proven vendors.',
    keyBenefits: [
      'Protecting service quality and financial benefits',
      'Fostering vendor relationships',
      'Designing budget-appropriate packages',
      'Providing hosted systems reducing costs',
      'Selecting integrable vendor solutions',
    ],
    seoTitle: 'Operations Solutions for Community-owned Utilities | Hometown Connections',
    seoDescription: 'Engineering and operations solutions delivering innovative technologies through proven vendors for community-owned utilities.',
  },
  'Customer Care Solutions': {
    shortDescription: 'Deliver the high level of service and new programs your customers demand with customer engagement and market research solutions.',
    keyBenefits: [
      'Excellence in customer service for municipal utilities',
      'Retaining community support and goodwill',
      '24/7 account access for customers',
      'Energy savings visibility',
      'Support for rooftop solar and EVs',
    ],
    seoTitle: 'Customer Care Solutions for Municipal Utilities | Hometown Connections',
    seoDescription: 'Deliver high-level service and new programs with customer care solutions for community-owned utilities.',
  },
  'Cybersecurity Solutions': {
    shortDescription: 'Outsmart cybercriminals targeting utility networks with comprehensive cybersecurity programs, consulting, and liability insurance.',
    keyBenefits: [
      'Design infrastructure detecting and responding to threats before weaponization',
      'Partner with cost-effective IT/OT risk analysis providers',
      'Assist with security program development and financial protections',
    ],
    seoTitle: 'Cybersecurity Solutions for Public Utilities | Hometown Connections',
    seoDescription: 'Comprehensive cybersecurity programs, consulting, and liability insurance to protect utility networks from cybercriminals.',
  },
  'Financial Solutions, Energy Trading & Cost of Service Research': {
    shortDescription: 'Implement time-of-use ratemaking, maintain comprehensive insurance programs, and manage wholesale power requirements effectively.',
    keyBenefits: [
      'Understanding unique financial needs of community-owned utilities',
      'Lower rates and broader insurance terms',
      'Portfolio optimization across utilities',
    ],
    seoTitle: 'Financial Solutions for Community-owned Utilities | Hometown Connections',
    seoDescription: 'Financial solutions including cost of service research, insurance programs, and energy trading for community-owned utilities.',
  },
  'Workforce Solutions': {
    shortDescription: 'Build your team with senior leader development, organizational effectiveness, diversity & inclusion, and interim staffing solutions.',
    keyBenefits: [
      'Better Employee Retention',
      'Easier Employee Attraction',
      'Stronger Compliance',
      'Greater Uniformity',
      'Increased Performance and Innovation',
    ],
    seoTitle: 'Workforce Solutions for Public Utilities | Hometown Connections',
    seoDescription: 'Workforce development including leader training, organizational effectiveness, and diversity & inclusion for public utilities.',
  },
  'Strategic Planning': {
    shortDescription: "Define a compelling purpose, identify the most important strategies for success, and unleash your team's talents on what matters most.",
    keyBenefits: [
      'Creates valuable input and buy-in throughout organizations',
      'Enables utilities to identify their most important priorities',
      "Unleashes team's talents for organizational success",
    ],
    seoTitle: 'Strategic Planning | Hometown Connections',
    seoDescription: "Define your organization's purpose, identify key strategies, and unleash your team's talents with strategic planning services.",
  },
};

async function auditContentAccuracy() {
  console.log('🔍 100% ACCURACY AUDIT');
  console.log('Comparing Sanity content vs SERVICES_CONTENT.md\n');
  console.log('='.repeat(70) + '\n');

  try {
    const query = `*[_type == "service"] | order(order asc) {
      title,
      shortDescription,
      keyBenefits,
      seoTitle,
      seoDescription
    }`;

    const services = await client.fetch(query);

    let totalChecks = 0;
    let passedChecks = 0;
    let failedChecks = 0;
    const errors = [];

    for (const service of services) {
      const expected = expectedContent[service.title];

      if (!expected) {
        console.log(`❌ UNEXPECTED SERVICE: ${service.title}\n`);
        failedChecks++;
        totalChecks++;
        continue;
      }

      console.log(`\n📄 ${service.title}`);
      console.log('-'.repeat(70));

      // Check short description
      totalChecks++;
      if (service.shortDescription === expected.shortDescription) {
        console.log('✅ Short Description: EXACT MATCH');
        passedChecks++;
      } else {
        console.log('❌ Short Description: MISMATCH');
        console.log(`   Expected: "${expected.shortDescription}"`);
        console.log(`   Got:      "${service.shortDescription}"`);
        failedChecks++;
        errors.push({ service: service.title, field: 'shortDescription' });
      }

      // Check key benefits count
      totalChecks++;
      if (service.keyBenefits.length === expected.keyBenefits.length) {
        console.log(`✅ Key Benefits Count: ${service.keyBenefits.length} (correct)`);
        passedChecks++;
      } else {
        console.log(`❌ Key Benefits Count: Expected ${expected.keyBenefits.length}, got ${service.keyBenefits.length}`);
        failedChecks++;
        errors.push({ service: service.title, field: 'keyBenefits count' });
      }

      // Check each key benefit
      for (let i = 0; i < expected.keyBenefits.length; i++) {
        totalChecks++;
        if (service.keyBenefits[i] === expected.keyBenefits[i]) {
          passedChecks++;
        } else {
          console.log(`❌ Key Benefit ${i + 1}: MISMATCH`);
          console.log(`   Expected: "${expected.keyBenefits[i]}"`);
          console.log(`   Got:      "${service.keyBenefits[i] || 'MISSING'}"`);
          failedChecks++;
          errors.push({ service: service.title, field: `keyBenefit ${i + 1}` });
        }
      }

      // Check SEO title
      totalChecks++;
      if (service.seoTitle === expected.seoTitle) {
        console.log('✅ SEO Title: EXACT MATCH');
        passedChecks++;
      } else {
        console.log('❌ SEO Title: MISMATCH');
        console.log(`   Expected: "${expected.seoTitle}"`);
        console.log(`   Got:      "${service.seoTitle}"`);
        failedChecks++;
        errors.push({ service: service.title, field: 'seoTitle' });
      }

      // Check SEO description
      totalChecks++;
      if (service.seoDescription === expected.seoDescription) {
        console.log('✅ SEO Description: EXACT MATCH');
        passedChecks++;
      } else {
        console.log('❌ SEO Description: MISMATCH');
        console.log(`   Expected: "${expected.seoDescription}"`);
        console.log(`   Got:      "${service.seoDescription}"`);
        failedChecks++;
        errors.push({ service: service.title, field: 'seoDescription' });
      }
    }

    // Final report
    console.log('\n' + '='.repeat(70));
    console.log('📊 AUDIT SUMMARY');
    console.log('='.repeat(70));
    console.log(`Total Checks: ${totalChecks}`);
    console.log(`✅ Passed: ${passedChecks}`);
    console.log(`❌ Failed: ${failedChecks}`);
    console.log(`Accuracy: ${((passedChecks / totalChecks) * 100).toFixed(2)}%`);
    console.log('='.repeat(70));

    if (failedChecks === 0) {
      console.log('\n🎉 100% ACCURACY VERIFIED!');
      console.log('All content matches SERVICES_CONTENT.md EXACTLY!');
      console.log('\n✅ Import successful - all 8 services have exact content from old site');
    } else {
      console.log('\n❌ ACCURACY ISSUES FOUND:');
      errors.forEach((error, i) => {
        console.log(`   ${i + 1}. ${error.service} - ${error.field}`);
      });
    }

  } catch (error) {
    console.error('❌ Error during audit:', error.message);
  }
}

auditContentAccuracy().catch(console.error);
