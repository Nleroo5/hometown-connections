const { createClient } = require('@sanity/client');

// Initialize Sanity client
const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
  useCdn: false,
});

async function auditAffiliates() {
  console.log('=== AFFILIATE IMPORT AUDIT ===\n');

  try {
    // Fetch all affiliates from Sanity
    const query = `*[_type == "affiliate"] | order(address.state asc) {
      _id,
      organizationName,
      address,
      primaryContact,
      websiteUrl,
      isCoOwner,
      statesServed,
      isActive
    }`;

    const affiliates = await client.fetch(query);

    console.log(`Total affiliates in Sanity: ${affiliates.length}\n`);

    // Group by state
    const byState = {};
    affiliates.forEach(aff => {
      const state = aff.address.state;
      if (!byState[state]) byState[state] = [];
      byState[state].push(aff);
    });

    console.log('=== BREAKDOWN BY STATE ===');
    Object.keys(byState).sort().forEach(state => {
      console.log(`${state}: ${byState[state].length} affiliate(s)`);
      byState[state].forEach(aff => {
        console.log(`  - ${aff.organizationName}${aff.isCoOwner ? ' *' : ''}`);
      });
    });

    // Co-owner count
    const coOwners = affiliates.filter(a => a.isCoOwner);
    console.log(`\n=== CO-OWNERS ===`);
    console.log(`Total co-owners: ${coOwners.length}`);
    coOwners.forEach(co => {
      console.log(`  - ${co.organizationName} (${co.address.state})`);
    });

    // States served coverage
    const allStatesServed = new Set();
    affiliates.forEach(aff => {
      aff.statesServed.forEach(state => allStatesServed.add(state));
    });
    console.log(`\n=== COVERAGE ===`);
    console.log(`States with affiliate coverage: ${allStatesServed.size}`);
    console.log(`States: ${Array.from(allStatesServed).sort().join(', ')}`);

    // Data validation
    console.log(`\n=== DATA VALIDATION ===`);
    let validationIssues = 0;

    affiliates.forEach(aff => {
      const issues = [];

      // Check required fields
      if (!aff.organizationName) issues.push('Missing organization name');
      if (!aff.address) issues.push('Missing address');
      if (!aff.primaryContact) issues.push('Missing primary contact');
      if (!aff.websiteUrl) issues.push('Missing website URL');
      if (!aff.statesServed || aff.statesServed.length === 0) issues.push('No states served');

      // Check address fields
      if (aff.address) {
        if (!aff.address.street) issues.push('Missing street address');
        if (!aff.address.city) issues.push('Missing city');
        if (!aff.address.state) issues.push('Missing state');
        if (!aff.address.zipCode) issues.push('Missing zip code');
      }

      // Check contact fields
      if (aff.primaryContact) {
        if (!aff.primaryContact.name) issues.push('Missing contact name');
        if (!aff.primaryContact.title) issues.push('Missing contact title');
        if (!aff.primaryContact.phone) issues.push('Missing contact phone');
        if (!aff.primaryContact.email) issues.push('Missing contact email');
      }

      if (issues.length > 0) {
        console.log(`❌ ${aff.organizationName}:`);
        issues.forEach(issue => console.log(`   - ${issue}`));
        validationIssues += issues.length;
      }
    });

    if (validationIssues === 0) {
      console.log('✅ All affiliates have complete data!');
    } else {
      console.log(`⚠️  Found ${validationIssues} validation issue(s)`);
    }

    // Summary
    console.log(`\n=== FINAL SUMMARY ===`);
    console.log(`Total Affiliates: ${affiliates.length}`);
    console.log(`Co-owners: ${coOwners.length}`);
    console.log(`States Covered: ${allStatesServed.size}`);
    console.log(`Data Quality: ${validationIssues === 0 ? '100% Complete' : `${validationIssues} issues found`}`);
    console.log(`\n✅ Audit complete!`);

  } catch (error) {
    console.error('Error during audit:', error);
  }
}

// Run the audit
auditAffiliates().catch(console.error);
