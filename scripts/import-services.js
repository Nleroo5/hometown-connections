/**
 * Import Services for Hometown Connections
 * Data sourced from: https://www.hometownconnections.com/utility-solutions/
 * Date: 2025-10-31
 *
 * All 8 main service categories from the Utility Solutions menu
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  useCdn: false,
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
  apiVersion: '2024-01-01',
});

// Real services from Hometown Connections website - All 8 main categories
const servicesData = [
  {
    title: 'Advanced Metering Infrastructure',
    category: 'technology',
    order: 1,
    shortDescription: 'Scalable, lower risk, and cost-effective AMI pathway accessible to all community-owned utilities through turnkey managed service.',
    keyBenefits: [
      'Over-the-air firmware upgrades to all metering endpoints',
      'Self-configuring and self-healing mesh network',
      'Open standards with over 27 million endpoints deployed',
      'Meter to Data Center managed service program',
      'Improved efficiencies in billing and operations',
      'Enhanced outage management and service calls',
    ],
  },
  {
    title: 'Strategic Planning',
    category: 'business-strategy',
    order: 2,
    shortDescription: 'Consulting support in strategy, board governance, managing risk, cybersecurity, customer care, finance, technology planning, and leadership development.',
    keyBenefits: [
      'Focus on available resources and incremental improvements',
      'Design business strategies that fit utility budgets',
      'Research and on-site interviews for technology assessments',
      'Cross-functional workshops to define strengths and weaknesses',
      'Best practices to strengthen technology plans',
      'Assistance presenting to boards and government bodies',
    ],
  },
  {
    title: 'Operations',
    category: 'operations',
    order: 3,
    shortDescription: 'Comprehensive solutions for meter data management, distributed energy generation, and operational technology engineering & regulatory compliance.',
    keyBenefits: [
      'Single view of accurate data across departments',
      'Quick grouping and apportioning of energy consumption',
      'Precise validation, editing, and estimation standards',
      'Near real-time notifications of meter events',
      'Distributed power systems and microgrid integration',
      'Over 2 gigawatts of distributed generation installed',
    ],
  },
  {
    title: 'Cybersecurity',
    category: 'cybersecurity',
    order: 4,
    shortDescription: 'Comprehensive cyber and physical security solutions including risk assessments, penetration testing, network architecture reviews, and regulatory compliance.',
    keyBenefits: [
      'Cybersecurity Check Up and vulnerability assessments',
      'Risk assessments and product assessments',
      'Network architecture reviews and penetration testing',
      'Hands-on day-to-day routine security tasks',
      'Regulatory compliance support',
      'Cyber liability insurance coverage',
    ],
  },
  {
    title: 'Business Strategy',
    category: 'business-strategy',
    order: 5,
    shortDescription: 'Organizational transformation, board governance, and technology planning to help utilities adapt and thrive in changing environments.',
    keyBenefits: [
      'Organizational transformation consulting',
      'Board governance and strategic planning',
      'Technology roadmaps and new systems implementation',
      'Process re-design and optimization',
      'Managing organizational change',
      'Strategic partner and trusted resource services',
    ],
  },
  {
    title: 'Customer Care',
    category: 'customer-care',
    order: 6,
    shortDescription: 'Billing and collections solutions, customer engagement platforms, and market research to promote satisfaction among customers and employees.',
    keyBenefits: [
      'Multi-service billing (electric, water, gas, internet, etc.)',
      'Personalized outbound and proactive energy messaging',
      'Digital engagement platforms with measurable results',
      'Higher customer satisfaction scores',
      'Improved operational efficiency',
      'Reduced costs through automation',
    ],
  },
  {
    title: 'Finance',
    category: 'finance',
    order: 7,
    shortDescription: 'Cost of service studies, energy trading & risk management, and comprehensive utility business insurance with lower rates and broader terms.',
    keyBenefits: [
      'Cost of service studies and rate design',
      'Financial planning and special financial analysis',
      'Energy trading and risk management services',
      'Portfolio optimization in wholesale energy markets',
      'Property & casualty insurance for utilities',
      'Environmental and cyber liability insurance',
    ],
  },
  {
    title: 'Workforce',
    category: 'workforce',
    order: 8,
    shortDescription: 'Leadership development programs for senior leaders and frontline supervisors, organizational effectiveness, and diversity & inclusion initiatives.',
    keyBenefits: [
      'Senior leader development and coaching',
      'Frontline leader skill building',
      'Increased performance and innovation',
      'Improved employee retention',
      'Leadership team cohesion',
      'Inclusive excellence and organizational effectiveness',
    ],
  },
];

async function importServices() {
  console.log('🚀 Starting Services Import...\n');
  console.log(`📊 Total services to import: ${servicesData.length}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const service of servicesData) {
    try {
      const doc = {
        _type: 'service',
        ...service,
        slug: {
          _type: 'slug',
          current: service.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, ''),
        },
        ctaText: 'Learn More',
        ctaLink: '/contact',
      };

      await client.create(doc);
      successCount++;
      console.log(`✅ Imported: ${service.title}`);
    } catch (error) {
      errorCount++;
      console.error(`❌ Error importing ${service.title}:`, error.message);
    }
  }

  console.log('\n═══════════════════════════════════════════════════');
  console.log('✅ SERVICES IMPORT COMPLETE');
  console.log('═══════════════════════════════════════════════════\n');
  console.log('📊 Import Summary:');
  console.log(`   Total Services: ${servicesData.length}`);
  console.log(`   ✅ Successfully Imported: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📈 Success Rate: ${((successCount / servicesData.length) * 100).toFixed(1)}%`);
  console.log('\n📋 Services Imported:');
  servicesData.forEach((service, index) => {
    console.log(`   ${index + 1}. ${service.title}`);
  });
  console.log('\n🎯 Next Steps:');
  console.log('   1. Add service icons/images in Sanity Studio');
  console.log('   2. Add full descriptions with rich text in Sanity Studio');
  console.log('   3. Link related partners to services in Sanity Studio');
  console.log('\n');

  if (errorCount > 0) {
    process.exit(1);
  }
}

importServices();
