const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
  useCdn: false,
})

const servicesContent = [
  {
    slug: 'advanced-metering-infrastructure',
    title: 'Advanced Metering Infrastructure',
    category: 'operations',
    order: 1,
    shortDescription: 'Scalable, lower risk, and cost-effective AMI pathway accessible to all community-owned utilities through turnkey managed service.',
    fullDescription: `Hometown Connections provides scalable, cost-effective AMI solutions specifically designed for community-owned utilities. The offering aims to make smart grid infrastructure accessible to all community-owned utilities through turnkey managed services combining meters, wireless communications, and systems integration.`,
    keyBenefits: [
      'Cost Reduction: Automates meter reads, service connects, and disconnects. Eliminates manual data entry errors and misreads from hard-to-access locations. Increases billing accuracy to recover lost revenue.',
      'Monitoring & Detection: Remote equipment status monitoring across distribution systems. Early identification of leaks, meter tampering, and theft.',
      'Customer Service Improvements: Real-time usage data access for service representatives. Automated messaging and web portal capabilities. Pay-as-you-go customer options. Smart city integration (lighting, EVs, microgeneration).',
      'Interoperable — Open standards with 27+ million deployed endpoints',
      'Secure — AES-256 encryption with unique keys per network element',
      'Future Proof — Over-the-air firmware upgrade capability',
      'Scalable — Distributed architecture supporting millions of elements',
      'Resilient — Utility-grade components with self-configuring, self-healing mesh networks',
      'Phased system scaling options',
      'Multi-vendor meter compatibility (Itron, Aclara/GE, L+G, Honeywell-Elster, and others)',
      'Aggregated wholesale purchasing savings',
      'No head-end upgrade charges',
      'Integration support for existing billing and SCADA systems'
    ]
  },
  {
    slug: 'strategic-planning',
    title: 'Strategic Planning',
    category: 'business-strategy',
    order: 2,
    shortDescription: 'Consulting support in strategy, board governance, managing risk, cybersecurity, customer care, finance, technology planning, and leadership development.',
    fullDescription: `Hometown Connections offers strategic planning specifically designed for public power utilities. The service helps leadership teams accomplish three essential objectives: defining organizational purpose, identifying key success strategies, and mobilizing staff talent toward priority initiatives.

The offering addresses the complex landscape utilities face today by providing experienced guidance through a structured planning methodology. Mark McCain, Executive Consultant for Strategic Planning at HCI, leads engagements that help municipal utilities of various sizes determine their most important strategic priorities.`,
    keyBenefits: [
      'Four-Phase Process: Brainstorm - Staff proposes potential goals and strategies via online survey, followed by refinement meetings',
      'Rank - Board and staff prioritize proposed goals and strategies through surveying',
      'Shortlist - Staff develops presentation materials with information and refined strategic options',
      'Decide - Board determines final Vision, Mission, Values, Goals, and Strategies with staff input',
      'Strong preliminary work before workshops',
      'Organization-wide engagement creating meaningful input and staff buy-in',
      'Well-developed goals and strategies requiring refinement rather than creation',
      'Efficient, effective decision-making processes',
      'Clear identification of organizational priorities'
    ]
  },
  {
    slug: 'operations',
    title: 'Operations',
    category: 'operations',
    order: 3,
    shortDescription: 'Comprehensive solutions for meter data management, distributed energy generation, and operational technology engineering & regulatory compliance.',
    fullDescription: `Hometown Connections offers engineering and operations solutions specifically designed for community-owned utilities. The service addresses critical customer demands including reduction in the frequency and duration of power outages, online payment options and management of emerging resources like solar energy and electric vehicles.

The organization provides innovative technologies and information systems in partnership with leading vendors to deliver operational improvements. Their approach focuses on scalable engineering and operational solutions that integrate with existing systems.`,
    keyBenefits: [
      'Meter Data Management (MDM): Unified Data Access - single view of accurate data to streamline operations across departments',
      'User-Friendly Interface: Mobile-compatible portal for accessing customer account, billing, and metering information',
      'Customer Empowerment: Track usage patterns, review historical data, and understand temperature impacts on costs',
      'Data Aggregation: Supports multiple metering methods for transformers, feeders, substations, rate classes, and zip codes',
      'Real-Time Alerts: Notifications via email or text for meter events and system status',
      'Advanced Analytics: Generates billing history graphs, virtual meters, and interval readings',
      'Weather Integration: Displays weather data alongside consumption charts',
      'AMI Health: Analyzes smart meter performance to identify invalid reads',
      'Revenue Protection: Detects non-technical losses, meter tampering, and consumption anomalies',
      'Customer Analysis: Provides load profiles for rate plan and demand response design',
      'Voltage Analysis: Monitors exceptions and phase imbalance across meters',
      'Line Loss Analysis: Reconciles wholesale purchases with sales at distribution levels',
      'Water Loss Analysis: Identifies unaccounted-for water loss and notifies customers of potential leaks',
      'Outage Analysis: Maps meter outages and improves reliability metrics (SAIDI, CAIDI)',
      'Transformer Load Analysis: Identifies overloaded and underutilized distribution transformers',
      'Microgrids/Distributed Energy Generation: Turnkey distributed generation with in-house engineering, procurement, construction, and commissioning',
      'OT Engineering & Regulatory Compliance: SCADA, ADMS, AMI, GIS, and OMS systems, plus NERC CIP and NIST Cyber Security compliance'
    ]
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    category: 'operations',
    order: 4,
    shortDescription: 'Comprehensive cyber and physical security solutions including risk assessments, penetration testing, network architecture reviews, and regulatory compliance.',
    fullDescription: `Hometown Connections offers cybersecurity solutions designed to protect community-owned utilities from sophisticated threats. The company addresses three critical defensive areas: cybersecurity programs, consulting services, and liability insurance.

Outsmart cybercriminals targeting utility networks, stealing customer records, and freezing utility databases for ransom by implementing comprehensive cyber defense strategies.

The organization recognizes that community utilities typically lack internal expertise, time, and budgets for robust programs. The company works to design infrastructure detecting and responding to threats before weaponization, partner with cost-effective IT/OT risk analysis providers, and assist with program development, operations, and financial protections.`,
    keyBenefits: [
      'Utility Cybersecurity Program: Comprehensive resource combining multiple solutions into one affordable defense system',
      'Cybersecurity Check-Up: Customized survey-style assessment, review of existing policies, and remote testing of high-risk web applications',
      'Physical Security Assessment: Evaluation of facility security controls including visitor verification, access systems, and surveillance',
      'IT/OT Integration Services: System architecture design, SCADA/GIS/OMS services, data management, and custom software development',
      'Training Programs: Cybersecurity training for board members, executive teams, and technical staff',
      'Dashboard view of utility cybersecurity posture',
      'Cost-effective vulnerability identification',
      'Demonstration of due diligence',
      'Maturation recommendations',
      'Cyber Liability Insurance: Protection for breaches involving customer and employee data',
      'Cybersecurity Workshop: Six-hour training sessions covering ransomware threats, threat awareness, vulnerability management, and incident response'
    ]
  },
  {
    slug: 'business-strategy',
    title: 'Business Strategy',
    category: 'business-strategy',
    order: 5,
    shortDescription: 'Organizational transformation, board governance, and technology planning to help utilities adapt and thrive in changing environments.',
    fullDescription: `Hometown Connections addresses the rapid changes affecting the utility industry through strategic planning support. The company helps community-owned utilities navigate challenges including customer-generated power, new service offerings like EV charging, workforce retention, customer service automation, and organizational readiness.

The core question we address: does the community-owned utility have the people, processes, technology, and finances to deal with all of the industry changes today and far into the future?

Hometown Connections aims to provide community-owned utilities with the strategic planning tools and confidence to thrive in this exciting yet complex environment.`,
    keyBenefits: [
      'Help utilities make sound business strategy and technology investment decisions',
      'Identify management best practices and refine strategic planning and governance',
      'Partner with experts on cost-effective, high-impact technology deployment',
      'Ensure long-term success',
      'Organizational Transformation: Business Operations Assessment identifying operational gaps and inefficiencies',
      'Enterprise Risk Management: Framework for understanding and integrating risk management into strategic planning',
      'Strategic Planning: Practical, step-by-step blueprint for adapting to market conditions and regulatory changes',
      'Board Governance: Education on industry conditions and training on working with utility staff',
      'Governing Board Development: Building and sustaining effective teams',
      'Duties and Responsibilities: Understanding legal obligations and key board responsibilities',
      'Voice of the Customer: Board role in representing stakeholders',
      'Performance Monitoring: Organizational performance monitoring and accountability',
      'Technology Planning: Functional and financial assessments for technology investments',
      'Technology Acquisition: RFP management and vendor coordination',
      'Technology Implementation: Project management oversight and system integration',
      'Technology Support: Employee training and business process integration'
    ]
  },
  {
    slug: 'customer-care',
    title: 'Customer Care',
    category: 'customer-care',
    order: 6,
    shortDescription: 'Billing and collections solutions, customer engagement platforms, and market research to promote satisfaction among customers and employees.',
    fullDescription: `Hometown Connections offers Customer Care solutions designed to help municipal utilities meet modern customer service expectations. The service enables utilities to deliver the high level of service and new programs your customers demand through accurate billing, quick response systems, personalized communications, and customer research-driven program design.

The offering acknowledges that public power utilities historically provided personal service, but smartphone-era customers now expect 24/7 account access and information about energy savings. Citizens seek new services supporting rooftop solar, electric vehicles, and other innovations.`,
    keyBenefits: [
      'Billing and Collections: Integrated Information Access with real-time data across departments',
      'Asset Management: Visibility over inventory with controls on project accounting and procurement',
      'Project Lifecycle Management: Ensures projects complete on schedule and within budget',
      'GIS Integration: Provides infrastructure visualization capabilities',
      'Mobile-Ready Operations: Field technicians access real-time information via mobile devices',
      'Customer Portal: Reduces paper costs and call volumes through web-based account access',
      'Data-Driven Decisions: Access to financial statements, reports, and dashboards',
      'System Integration: Eliminates duplicate data entry',
      'Cloud Deployment: Optional hosting removes hardware and software administration burden',
      'Customer Engagement: 4% increase in household efficiency and 400% increase in program participation',
      'Energy Advisor Basic: Mobile-friendly online calculator for personalized savings recommendations',
      'Energy Advisor Enterprise: Billing integration with home energy ratings and peer comparisons',
      'Envoy Suite: Personalized video messaging, energy alerts, summary reports, and email campaigns',
      'Market Research: Establish strategy decisions grounded in customer preferences',
      'Focus Groups and In-Depth Interviews: Professional facilitation for detailed topic exploration',
      'Digital Survey Options: Customizable web-based surveys for rapid insights',
      'Public Power Data Source: Continuous access to industry trends and consumer behavior analytics'
    ]
  },
  {
    slug: 'finance',
    title: 'Finance',
    category: 'finance',
    order: 7,
    shortDescription: 'Insurance, energy trading, and rate design services to help utilities manage risk and optimize financial performance.',
    fullDescription: `Hometown Connections offers financial solutions designed for community-owned utilities. The core offering addresses the sector's unique needs: Offer time-of-use ratemaking, maintain comprehensive and affordable insurance programs, and manage wholesale power requirements through strategic partnerships.

The service recognizes that effective financial system design and risk management serve as critical underpinnings to all utility projects, programs, and services. Investments in technology and new programs require proper alignment with budgeting, pricing, load management, risk management, and financial decisions.

Hometown Connections partners exclusively with providers that understand this sector of the industry and share our enthusiasm for supporting it.`,
    keyBenefits: [
      'Cost of Service and Rate Design: Strategic rate planning to meet long-term goals and cost recovery',
      'Rate structure identification for utilities with or without Advanced Metering Infrastructure',
      'Specialized valuation methodologies for rooftop solar customers and battery storage systems',
      'EV charging infrastructure rates and standards',
      'Rate evaluation mechanisms including time-of-use rates, real-time pricing, and peak demand calculations',
      'Economic development rates and standby rate structures',
      'Financial Planning and Long Term projections',
      'Insurance: 20 to 40% lower premiums through group purchasing',
      'ARGUS Property Insurance: All-Risk coverage including fire, flood, severe weather, terrorism, and mechanical/electrical failures',
      'Property & Casualty: Comprehensive packages including workers compensation and liability coverage',
      'Cyber Liability Insurance: Protection from liability and recovery costs from data breaches',
      'Environmental Insurance: Risk assessment and coverage for water resources and climate change risks',
      'Energy Trading & Risk: Customized portfolio management strategies aligned with utility objectives',
      'Market intelligence on regulatory and legislative developments',
      'Asset optimization to boost revenues and reduce customer costs',
      'Natural Gas Management: Complete trading, scheduling, and optimization services',
      'RTO Market Management: Portfolio management within Regional Transmission Organizations',
      'Advanced Analytics: Data-driven solutions converting smart meter information into actionable insights'
    ]
  },
  {
    slug: 'workforce',
    title: 'Workforce',
    category: 'workforce',
    order: 8,
    shortDescription: 'Leadership development, organizational effectiveness, and diversity & inclusion programs to build strong utility teams.',
    fullDescription: `Hometown Connections offers workforce solutions recognizing that the people who work for community-owned utilities are the industry's most important asset. Core offerings include Senior Leader & Frontline Leader Development, Organizational Effectiveness, Diversity & Inclusion, and Interim Personnel Staffing.

Leverage HR delivers the workforce development programs, bringing deep public sector experience to help organizations transition from where it is to where you need it to be.

Proven Benefits: Better Employee Retention, Easier Employee Attraction, Stronger Compliance, Greater Uniformity, Increased Performance and Innovation.`,
    keyBenefits: [
      'Senior Leader Development: Customized programs integrating assessments, career planning, mentoring, and coursework',
      'Senior Leadership Team Coaching: Transforms individual leaders into cohesive teams through custom workshops',
      'One-on-One Executive Coaching: Focuses on how leadership approaches impact others',
      'Frontline Leader Development: Leadership Essentials Training using head (knowledge), hands (application) and heart framework',
      'Field Operations Supervisor Training: Specialized programs addressing field-specific challenges',
      'Custom Team Workshops: Facilitated sessions targeting mission alignment and accountability enhancement',
      'Organizational Effectiveness: Fund the People Workshops using Attract, Retain, Develop framework',
      'Op Excellence: Evaluates candidate and employee experiences to identify opportunities and actions',
      'Change Management: Credentialed practitioners build awareness, address resistance, and establish reinforcement tactics',
      'Diversity & Inclusion: Inclusion to Innovation I2I program focused on psychological safety',
      'Allyship Incubator: Develops participants as organizational allies through facilitated dialogue',
      'DEI Strategy Development: Executive teams define priorities and establish measurable metrics',
      'Increased leader success rates',
      'Enhanced leadership team cohesion',
      'Development of forward-thinking leader coaches',
      'Strategic organizational alignment through skill building'
    ]
  }
]

async function updateServices() {
  console.log('🚀 Starting services content update...\n')

  let successCount = 0
  let errorCount = 0

  for (const service of servicesContent) {
    try {
      console.log(`📝 Updating: ${service.title}`)

      // Find the service by slug
      const query = `*[_type == "service" && slug.current == $slug][0]`
      const existingService = await client.fetch(query, { slug: service.slug })

      if (!existingService) {
        console.log(`   ⚠️  Service not found: ${service.slug}`)
        errorCount++
        continue
      }

      // Update the service
      await client
        .patch(existingService._id)
        .set({
          title: service.title,
          category: service.category,
          order: service.order,
          shortDescription: service.shortDescription,
          fullDescription: service.fullDescription,
          keyBenefits: service.keyBenefits,
        })
        .commit()

      console.log(`   ✅ Updated successfully`)
      successCount++

    } catch (error) {
      console.log(`   ❌ Error updating ${service.title}:`, error.message)
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log(`✅ Successfully updated: ${successCount} services`)
  if (errorCount > 0) {
    console.log(`❌ Failed to update: ${errorCount} services`)
  }
  console.log('='.repeat(50))
}

updateServices()
  .catch(err => {
    console.error('Fatal error:', err)
    process.exit(1)
  })
