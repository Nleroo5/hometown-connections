/**
 * Change AMI service slug from 'advanced-metering-infrastructure' to 'ami'
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
});

async function changeSlug() {
  console.log('🔄 Changing AMI slug to "ami"\n');

  try {
    const service = await client.fetch(`*[_type == "service" && title == "Advanced Metering Infrastructure"][0]{_id,title,"currentSlug":slug.current}`);

    if (!service) {
      console.log('❌ Service not found');
      return;
    }

    console.log(`📄 Found: ${service.title}`);
    console.log(`   Current slug: ${service.currentSlug}`);

    await client
      .patch(service._id)
      .set({
        slug: {
          _type: 'slug',
          current: 'ami'
        }
      })
      .commit();

    console.log(`   ✅ Changed slug to: ami\n`);
    console.log('🎉 Successfully updated slug!');
    console.log('✅ Page now accessible at: /services/ami');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

changeSlug().catch(console.error);
