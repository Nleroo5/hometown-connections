/**
 * List all services to see what we have
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
});

async function listServices() {
  try {
    const query = `*[_type == "service"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      order,
      _createdAt,
      "hasFullDesc": defined(fullDescription)
    }`;

    const services = await client.fetch(query);

    console.log(`\n📊 Total services: ${services.length}\n`);

    services.forEach((s, i) => {
      console.log(`${i + 1}. ${s.title}`);
      console.log(`   ID: ${s._id}`);
      console.log(`   Slug: ${s.slug}`);
      console.log(`   Order: ${s.order}`);
      console.log(`   Has Full Description: ${s.hasFullDesc}`);
      console.log(`   Created: ${s._createdAt}`);
      console.log('');
    });

  } catch (error) {
    console.error('Error:', error.message);
  }
}

listServices();
