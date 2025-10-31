/**
 * Import Site Settings for Hometown Connections
 * Data sourced from: https://www.hometownconnections.com/
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

const siteSettingsData = {
  _type: 'siteSettings',
  _id: 'siteSettings', // Singleton document
  siteName: 'Hometown Connections',
  tagline: 'Empowering Community Utilities',
  seoDescription: 'Hometown Connections, Inc. is a national, non-profit utility services organization specializing in the unique challenges of community-owned utilities.',
  primaryEmail: 'info@hometownconnections.com',
  copyrightText: `© ${new Date().getFullYear()} Hometown Connections, Inc. All rights reserved.`,
  announcementBar: {
    enabled: false,
    text: '',
    link: null,
    backgroundColor: '#003E6B',
  },
};

async function importSiteSettings() {
  console.log('🚀 Starting Site Settings Import...\n');

  try {
    // Check if site settings already exist
    const existing = await client.getDocument('siteSettings').catch(() => null);

    if (existing) {
      console.log('📝 Updating existing site settings...');
      await client
        .patch('siteSettings')
        .set(siteSettingsData)
        .commit();
      console.log('✅ Site settings updated successfully!\n');
    } else {
      console.log('📝 Creating new site settings...');
      await client.create(siteSettingsData);
      console.log('✅ Site settings created successfully!\n');
    }

    console.log('═══════════════════════════════════════════════════');
    console.log('✅ SITE SETTINGS IMPORT COMPLETE');
    console.log('═══════════════════════════════════════════════════\n');
    console.log('📊 Summary:');
    console.log(`   Site Name: ${siteSettingsData.siteName}`);
    console.log(`   Tagline: ${siteSettingsData.tagline}`);
    console.log(`   Email: ${siteSettingsData.primaryEmail}`);
    console.log('\n🎯 Next Steps:');
    console.log('   1. Add logo image in Sanity Studio');
    console.log('   2. Add address details in Sanity Studio');
    console.log('   3. Add social media links in Sanity Studio');
    console.log('\n');

  } catch (error) {
    console.error('❌ Error importing site settings:', error.message);
    process.exit(1);
  }
}

importSiteSettings();
