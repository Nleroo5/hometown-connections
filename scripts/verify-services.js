/**
 * Verify all 8 services were imported correctly into Sanity
 * Checks titles, slugs, categories, and content existence
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
});

// Expected services from SERVICES_CONTENT.md
const expectedServices = [
  { title: 'Advanced Metering Infrastructure', slug: 'advanced-metering-infrastructure', category: 'operations', order: 1 },
  { title: 'Business Strategies & Solutions', slug: 'business-strategy', category: 'business-strategy', order: 2 },
  { title: 'Engineering & Operations Solutions', slug: 'operations', category: 'operations', order: 3 },
  { title: 'Customer Care Solutions', slug: 'customer-care', category: 'customer-care', order: 4 },
  { title: 'Cybersecurity Solutions', slug: 'cybersecurity', category: 'cybersecurity', order: 5 },
  { title: 'Financial Solutions, Energy Trading & Cost of Service Research', slug: 'finance', category: 'finance', order: 6 },
  { title: 'Workforce Solutions', slug: 'workforce', category: 'workforce', order: 7 },
  { title: 'Strategic Planning', slug: 'strategic-planning', category: 'business-strategy', order: 8 },
];

async function verifyServices() {
  console.log('🔍 Verifying all 8 services in Sanity...\n');

  try {
    // Fetch all services
    const query = `*[_type == "service"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      category,
      order,
      shortDescription,
      fullDescription,
      keyBenefits,
      seoTitle,
      seoDescription
    }`;

    const services = await client.fetch(query);

    console.log(`📊 Found ${services.length} services in Sanity\n`);

    if (services.length !== 8) {
      console.log('❌ ERROR: Expected 8 services but found ' + services.length);
      return;
    }

    let allCorrect = true;

    // Verify each service
    for (let i = 0; i < expectedServices.length; i++) {
      const expected = expectedServices[i];
      const actual = services[i];

      console.log(`\n${'='.repeat(60)}`);
      console.log(`Service ${i + 1}: ${expected.title}`);
      console.log('='.repeat(60));

      // Check title
      if (actual.title === expected.title) {
        console.log('✅ Title matches');
      } else {
        console.log(`❌ Title mismatch: "${actual.title}" vs "${expected.title}"`);
        allCorrect = false;
      }

      // Check slug
      if (actual.slug === expected.slug) {
        console.log('✅ Slug matches');
      } else {
        console.log(`❌ Slug mismatch: "${actual.slug}" vs "${expected.slug}"`);
        allCorrect = false;
      }

      // Check category
      if (actual.category === expected.category) {
        console.log('✅ Category matches');
      } else {
        console.log(`❌ Category mismatch: "${actual.category}" vs "${expected.category}"`);
        allCorrect = false;
      }

      // Check order
      if (actual.order === expected.order) {
        console.log('✅ Display order matches');
      } else {
        console.log(`❌ Order mismatch: ${actual.order} vs ${expected.order}`);
        allCorrect = false;
      }

      // Check content fields exist
      if (actual.shortDescription && actual.shortDescription.length > 0) {
        console.log(`✅ Short description exists (${actual.shortDescription.length} chars)`);
      } else {
        console.log('❌ Short description missing');
        allCorrect = false;
      }

      if (actual.fullDescription && actual.fullDescription.length > 0) {
        console.log(`✅ Full description exists (${actual.fullDescription.length} blocks)`);
      } else {
        console.log('❌ Full description missing');
        allCorrect = false;
      }

      if (actual.keyBenefits && actual.keyBenefits.length > 0) {
        console.log(`✅ Key benefits exist (${actual.keyBenefits.length} items)`);
      } else {
        console.log('❌ Key benefits missing');
        allCorrect = false;
      }

      if (actual.seoTitle) {
        console.log('✅ SEO title exists');
      } else {
        console.log('❌ SEO title missing');
        allCorrect = false;
      }

      if (actual.seoDescription) {
        console.log('✅ SEO description exists');
      } else {
        console.log('❌ SEO description missing');
        allCorrect = false;
      }
    }

    console.log('\n' + '='.repeat(60));
    if (allCorrect) {
      console.log('🎉 SUCCESS! All 8 services imported correctly!');
      console.log('='.repeat(60));
      console.log('\n✅ Verification Complete:');
      console.log('   • All 8 services present in Sanity');
      console.log('   • All titles match exactly');
      console.log('   • All slugs match exactly');
      console.log('   • All categories match exactly');
      console.log('   • All display orders match exactly');
      console.log('   • All content fields populated');
      console.log('\n📋 Next Steps:');
      console.log('   1. Visit http://localhost:3001/studio to view in Sanity Studio');
      console.log('   2. Visit http://localhost:3001/services to see them on the site');
      console.log('   3. Perform manual accuracy audit comparing content to old site');
    } else {
      console.log('❌ VERIFICATION FAILED - See errors above');
      console.log('='.repeat(60));
    }

  } catch (error) {
    console.error('❌ Error verifying services:', error.message);
  }
}

// Run verification
verifyServices().catch(console.error);
