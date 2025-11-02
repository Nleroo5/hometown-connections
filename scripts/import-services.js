/**
 * Import Services for Hometown Connections
 * EXACT content from old site - SERVICES_CONTENT.md
 * NO modifications, NO changes - 100% accurate migration
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
});

// Helper function to generate unique keys
function generateKey() {
  return Math.random().toString(36).substring(2, 15)
}

// Helper function to convert markdown-style text to PortableText blocks
function textToPortableText(text) {
  const lines = text.trim().split('\n\n')
  const blocks = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    // H2 headers (##)
    if (trimmed.startsWith('## ')) {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h2',
        children: [{ _type: 'span', _key: generateKey(), text: trimmed.substring(3), marks: [] }],
        markDefs: [],
      })
    }
    // H3 headers (###) - for Features, Solutions, etc
    else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h3',
        children: [{ _type: 'span', _key: generateKey(), text: trimmed.slice(2, -2), marks: [] }],
        markDefs: [],
      })
    }
    // Normal paragraphs
    else {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        children: [{ _type: 'span', _key: generateKey(), text: trimmed, marks: [] }],
        markDefs: [],
      })
    }
  }

  return blocks
}

// All 8 services with EXACT content from old site (SERVICES_CONTENT.md)
const services = [
  {
    title: 'Advanced Metering Infrastructure',
    slug: 'advanced-metering-infrastructure',
    category: 'operations',
    order: 1,
    shortDescription:
      'Better manage outages, service calls, distribution system maintenance, and the customer experience with Advanced Metering Infrastructure solutions from Hometown Connections.',
    fullDescription: `Better manage outages, service calls, distribution system maintenance, and the customer experience with Advanced Metering Infrastructure solutions from Hometown Connections.

Access scalable, lower-risk, cost-effective AMI deployment accessible to community-owned utilities through turnkey managed services featuring best-of-breed infrastructure (meters, wireless communications, applications, systems integrations).

For Ephrata, Pennsylvania, the AMI solution has led to improved efficiencies in billing because AMI eliminates manual meter readings and data entry errors.

## Reduce Costs

Automate meter reads, service connects and disconnects

Increase accuracy of meter reads and billing data

Eliminate misreads from hard-to-access locations

## Advanced Monitoring

Remote monitoring of meters, transponders, switches, equipment

Early identification of leaks and meter tampering/theft

## Communication & Customer Service

On-screen access to detailed usage data for representatives

Automated messaging and web portal access

Pay-as-you-go customer options

Smart city capabilities (lighting, microgeneration, vehicles, voltage control)

## Features

**Interoperable:** Open standards technology with over 27 million endpoints deployed

**Secure:** Industry leading authentication, authorization, and accountability through assignment of unique AES-256 encrypted security keys

**Future Proof:** Over-the-air firmware upgrades available

**Scalable:** Distributed architecture supporting millions of elements

**Resilient:** Utility-grade components; self-configuring mesh network

## Additional Benefits for Community-Owned Utilities

Scalable system expansion

Multiple meter vendor options (Itron, Aclara/GE, L+G, Honeywell-Elster, Master Meter, Badger, Neptune, Hersey, AMCO)

Aggregated wholesale purchasing savings

Deployment support across all project phases

No head-end system upgrade charges

Cybersecurity integration

Legacy system compatibility with integration support`,
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
    seoDescription:
      'Better manage outages, service calls, distribution system maintenance, and customer experience with AMI solutions from Hometown Connections.',
  },
  {
    title: 'Business Strategies & Solutions',
    slug: 'business-strategy',
    category: 'business-strategy',
    order: 2,
    shortDescription:
      'Transform your workforce and technology with strategic planning tools and confidence to thrive in a complex environment.',
    fullDescription: `The industry faces rapid transformation, with retail customers increasingly generating their own power and contributing to grids. Key questions include developing new business models, launching EV charging services, attracting skilled workforce, delivering customer service excellence, and ensuring community-owned utilities have adequate people, processes, technology, and finances.

Hometown Connections provides community-owned utilities with the strategic planning tools and confidence to thrive in this exciting yet complex environment.

## Transform my workforce and technology

**Organizational Transformation**

Works with governing bodies, executives, and staff across utilities nationwide with the common goal of strengthening public utilities and the value they bring to their local communities.

**Board Governance**

Helps utility boards and city council members serve as stewards, providing briefings on industry conditions, explaining roles/responsibilities, and delivering training on staff collaboration and success measurement.

**Technology Planning**

Katama Technologies (KTI) provides management consulting, planning, implementation, and support including financial planning and technology assessment/acquisition.

**Strategic Planning**

Key to meeting today's challenges and preparing for tomorrow's.

**Business Assessments**

Redesigned program designed to help utilities of all sizes.`,
    keyBenefits: [
      'Help utilities make sound business strategy and technology investment decisions',
      'Identify best practices and refine strategic planning and governance',
      'Partner with experts deploying utility technologies cost-effectively',
      'Ensure long-term success',
    ],
    seoTitle: 'Business Strategies for Public Utilities | Hometown Connections',
    seoDescription:
      "Strategic planning tools and confidence to help community-owned utilities thrive in today's complex environment.",
  },
  {
    title: 'Engineering & Operations Solutions',
    slug: 'operations',
    category: 'operations',
    order: 3,
    shortDescription:
      'Deliver innovative technologies and information systems for operational improvements that customers value through proven vendors.',
    fullDescription: `Community-owned utilities face complex demands including reducing outage frequency/duration, offering online payments, providing account access, managing consumption, and reducing costs. Utilities want support for solar, electric vehicles, battery storage, and emerging resources.

Hometown Connections delivers innovative technologies and information systems in partnership with leading vendors to provide operational improvements that customers value through proven vendors who understand the unique requirements of municipal utilities.

## Solutions

**Advanced Metering Infrastructure**

Offers critical improvements to utility operations and customer service with a managed service model that reduces management complexity and increases operation efficiency.

**Microgrids/Distributed Energy Generation**

PowerSecure provides standby power generation systems with in-house engineering, procurement, construction, and commissioning services.

**OT Engineering & Regulatory Compliance**

Acumen provides consulting for SCADA, ADMS, AMI, GIS, OMS systems and NERC/NIST compliance services.`,
    keyBenefits: [
      'Protecting service quality and financial benefits',
      'Fostering vendor relationships',
      'Designing budget-appropriate packages',
      'Providing hosted systems reducing costs',
      'Selecting integrable vendor solutions',
    ],
    seoTitle: 'Operations Solutions for Community-owned Utilities | Hometown Connections',
    seoDescription:
      'Engineering and operations solutions delivering innovative technologies through proven vendors for community-owned utilities.',
  },
  {
    title: 'Customer Care Solutions',
    slug: 'customer-care',
    category: 'customer-care',
    order: 4,
    shortDescription:
      'Deliver the high level of service and new programs your customers demand with customer engagement and market research solutions.',
    fullDescription: `Deliver the high level of service and new programs your customers demand with Customer Care solutions from Hometown Connections. Provide accurate billing and quick response to customer inquiries, distribute outbound personalized communications to customers, and let customer research drive utility program design.

Public power utilities have traditionally been known for delivering personal service to the customers in their communities, but modern consumer expectations have shifted dramatically with smartphones and online connectivity.

Citizens served by community utilities now expect 24/7 access to detailed account information, energy savings opportunities visibility, new utility services for rooftop solar and electric vehicles, and support for other energy innovations.

Hometown Connections offers partners and training to help utility personnel establish a culture of excellence in customer service across the organization.

## Solutions

**Customer Engagement**

Apogee Interactive provides web-based energy analysis and engagement software with on-line and outbound proactive, personalized communication to consumers.

**Market Research**

GreatBlue Research delivers satisfaction assessments, product awareness studies, and subscription access to industry trends and consumer preferences, habits, and expectations.

## Testimonial

"Lakeland Electric is advancing our customer's knowledge, choice, and involvement through technology." - Dave Kus, Assistant General Manager at Lakeland Electric`,
    keyBenefits: [
      'Excellence in customer service for municipal utilities',
      'Retaining community support and goodwill',
      '24/7 account access for customers',
      'Energy savings visibility',
      'Support for rooftop solar and EVs',
    ],
    seoTitle: 'Customer Care Solutions for Municipal Utilities | Hometown Connections',
    seoDescription:
      'Deliver high-level service and new programs with customer care solutions for community-owned utilities.',
  },
  {
    title: 'Cybersecurity Solutions',
    slug: 'cybersecurity',
    category: 'cybersecurity',
    order: 5,
    shortDescription:
      'Outsmart cybercriminals targeting utility networks with comprehensive cybersecurity programs, consulting, and liability insurance.',
    fullDescription: `Outsmart cybercriminals targeting utility networks, stealing customer records, and freezing utility databases for ransom with cybersecurity solutions from Hometown Connections.

Utilities face grave cybersecurity threats from sophisticated and relentless bad actors searching for ways to disrupt the delivery of electric, gas, water, and waste water services.

Hometown Connections provides three defensive lines: cybersecurity program, cybersecurity consulting, and cybersecurity liability insurance.

## Solutions

**Utility Cybersecurity Program**

A comprehensive resource offering solutions and a network of providers serving community-owned utilities and city governments.

**Utility Security Consulting**

Through partner Acumen, includes risk assessments, product assessments, penetration testing, network architecture reviews, system integration, education & training, and regulatory compliance.

**Utility Cyber Liability Insurance**

The Public Power program offers innovative risk assurance options for breaches of customer and employee data and protects against risks not covered by standard policies.

**Cybersecurity Workshop**

Six-hour sessions covering ransomware threats, threat awareness, vulnerability management, and incident response exercises.`,
    keyBenefits: [
      'Design infrastructure detecting and responding to threats before weaponization',
      'Partner with cost-effective IT/OT risk analysis providers',
      'Assist with security program development and financial protections',
    ],
    seoTitle: 'Cybersecurity Solutions for Public Utilities | Hometown Connections',
    seoDescription:
      'Comprehensive cybersecurity programs, consulting, and liability insurance to protect utility networks from cybercriminals.',
  },
  {
    title: 'Financial Solutions, Energy Trading & Cost of Service Research',
    slug: 'finance',
    category: 'finance',
    order: 6,
    shortDescription:
      'Implement time-of-use ratemaking, maintain comprehensive insurance programs, and manage wholesale power requirements effectively.',
    fullDescription: `Hometown Connections enables utilities to implement time-of-use ratemaking, maintain comprehensive and affordable insurance programs, and manage wholesale power requirements through partnerships with financial service specialists.

Effective financial system design and risk management serve as foundational elements for utility projects. Strategic investments in operations technology, customer service, and emerging programs like rooftop solar and EV charging succeed only when paired with appropriate budgeting, pricing, load management, risk management, and financial decisions.

## Solutions

**Cost of Service & Rate Design**

Utility Financial Solutions specializes in cost of service, rate design, and financial planning for municipal electric, water, wastewater, and telecommunications utilities.

**Insurance**

Marsh USA offers protection designed for community-owned utilities with lower rates and broader terms, including Property Insurance for Power Generators, Property & Casualty Insurance, and Environmental Insurance.

**Energy Trading & Risk**

The Energy Authority helps public power utilities lower rates, reduce risk, and remain competitive in a changing market by optimizing wholesale energy portfolios across 40+ utilities.`,
    keyBenefits: [
      'Understanding unique financial needs of community-owned utilities',
      'Lower rates and broader insurance terms',
      'Portfolio optimization across utilities',
    ],
    seoTitle: 'Financial Solutions for Community-owned Utilities | Hometown Connections',
    seoDescription:
      'Financial solutions including cost of service research, insurance programs, and energy trading for community-owned utilities.',
  },
  {
    title: 'Workforce Solutions',
    slug: 'workforce',
    category: 'workforce',
    order: 7,
    shortDescription:
      'Build your team with senior leader development, organizational effectiveness, diversity & inclusion, and interim staffing solutions.',
    fullDescription: `Employees at community-owned utilities represent the industry's most important asset. Hometown Connections delivers four key service areas: Senior Leader & Frontline Leader Development, Organizational Effectiveness, Diversity & Inclusion, and Interim Personnel Staffing.

Leverage HR provides solutions focused on strengthening organizational capacity to attract, develop, and lead employees and teams. The firm leverages deep public sector experience to help utilities transition toward their strategic goals.

## Solutions

**Senior Leader Development**

Executive coaching addressing key attitudes, skills, and knowledge for individual, team, and organizational success. Includes leadership development, coaching, and workshops.

**Frontline Leader Development**

Training for managers and supervisors to enhance mindset, skills, and capability for team engagement and performance.

**Organizational Effectiveness**

HR consulting ensuring critical processes deliver maximum value.

**Diversity & Inclusion**

Talent alignment strategies where different backgrounds and lived experiences strengthen problem-solving and innovation.`,
    keyBenefits: [
      'Better Employee Retention',
      'Easier Employee Attraction',
      'Stronger Compliance',
      'Greater Uniformity',
      'Increased Performance and Innovation',
    ],
    seoTitle: 'Workforce Solutions for Public Utilities | Hometown Connections',
    seoDescription:
      'Workforce development including leader training, organizational effectiveness, and diversity & inclusion for public utilities.',
  },
  {
    title: 'Strategic Planning',
    slug: 'strategic-planning',
    category: 'business-strategy',
    order: 8,
    shortDescription:
      "Define a compelling purpose, identify the most important strategies for success, and unleash your team's talents on what matters most.",
    fullDescription: `Utility leaders must define a compelling purpose for their organization, identify the most important strategies for success, and unleash their team's talents on what matters most.

These represent essential outcomes of effective strategic planning according to Mark McCain, Executive Consultant/Strategic Planning for Hometown Connections, Inc.

## The Process

**Brainstorm**

Staff brainstorms potential Goals and Strategies in an online survey and then meets to refine them

**Rank**

Governing board and staff rank potential Goals and Strategies in an online survey

**Shortlist**

Staff creates a PowerPoint with information and a shortlist of key Strategies to achieve Goals

**Decide**

With input from staff, governing board decides on Vision, Mission, Values, Goals and Strategies

## Benefits

Preliminary collaborative work creates valuable input and buy-in throughout organizations. Results enable utilities to identify their most important priorities and unleash their team's talents for organizational success.`,
    keyBenefits: [
      'Creates valuable input and buy-in throughout organizations',
      'Enables utilities to identify their most important priorities',
      "Unleashes team's talents for organizational success",
    ],
    seoTitle: 'Strategic Planning | Hometown Connections',
    seoDescription:
      "Define your organization's purpose, identify key strategies, and unleash your team's talents with strategic planning services.",
  },
];

async function importServices() {
  console.log('🚀 Starting service import with EXACT content from old site...\n')

  let successCount = 0
  let errorCount = 0

  for (const service of services) {
    try {
      console.log(`📝 Importing: ${service.title}`)

      // Convert fullDescription to PortableText
      const fullDescriptionBlocks = textToPortableText(service.fullDescription)

      // Create the service document
      const doc = {
        _type: 'service',
        title: service.title,
        slug: {
          _type: 'slug',
          current: service.slug,
        },
        category: service.category,
        order: service.order,
        shortDescription: service.shortDescription,
        fullDescription: fullDescriptionBlocks,
        keyBenefits: service.keyBenefits,
        seoTitle: service.seoTitle,
        seoDescription: service.seoDescription,
      }

      // Create and publish
      const result = await client.create(doc)
      console.log(`✅ Created: ${service.title} (ID: ${result._id})`)
      successCount++
    } catch (error) {
      console.error(`❌ Error importing ${service.title}:`, error.message)
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('📊 Import Summary:')
  console.log(`   ✅ Success: ${successCount}`)
  console.log(`   ❌ Errors: ${errorCount}`)
  console.log(`   📦 Total: ${services.length}`)
  console.log('='.repeat(60))

  if (successCount === services.length) {
    console.log('\n🎉 All services imported successfully!')
    console.log('\n📋 Next Steps:')
    console.log('   1. Visit http://localhost:3001/studio')
    console.log('   2. Verify all 8 services appear in the Services section')
    console.log('   3. Check each service has all content fields populated')
    console.log('   4. Visit http://localhost:3001/services to see them on the site')
  }
}

// Run the import
importServices().catch(console.error)
