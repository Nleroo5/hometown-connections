const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDhn27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
});

async function checkStructure() {
  const service = await client.fetch(`*[_type == "service" && slug.current == "advanced-metering-infrastructure"][0] {
    title,
    fullDescription[0..2]
  }`);

  console.log(JSON.stringify(service, null, 2));
}

checkStructure();
