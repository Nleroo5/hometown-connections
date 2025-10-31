const { createClient } = require('@sanity/client');

// Initialize Sanity client
const client = createClient({
  projectId: '35wp30bx',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk3Oo3K0LyCCcZWKJIKAFXpBDnh27e5Ytv0xZOrFMrKDkzrGSakmOr906pStURZQFfGFlqMgIOxEhqXF1YQM4hIyB5mtctcy6TY98dQqQlnPQYErsLU5X8v0Yx5gwnvHImUYgNojJB2kc1MiHOLqMxjiQu50NyMUbPGq1GVx7vtk3R2lY2v1',
  useCdn: false,
});

// Affiliate data extracted from hometownconnections.com/affiliates
const affiliatesData = [
  {
    organizationName: 'Energy Southeast',
    isCoOwner: true,
    address: {
      street: '80 TechnaCenter Drive',
      city: 'Montgomery',
      state: 'AL',
      zipCode: '36117',
    },
    primaryContact: {
      name: 'Lisa Miller',
      title: 'Manager of External Affairs',
      phone: '800-239-2632 ext. 1118',
      email: 'lmiller@amea.com',
    },
    websiteUrl: 'https://www.amea.com/',
    statesServed: ['AL', 'MS'],
  },
  {
    organizationName: 'Northern California Power Agency',
    isCoOwner: true,
    address: {
      street: '651 Commerce Drive',
      city: 'Roseville',
      state: 'CA',
      zipCode: '95678',
    },
    primaryContact: {
      name: 'Linda Stone',
      title: 'Support Services Program Coordinator',
      phone: '916-781-4248',
      email: 'linda.stone@ncpa.com',
    },
    websiteUrl: 'http://www.ncpa.com/',
    statesServed: ['CA'],
  },
  {
    organizationName: 'Hometown Connections, Inc.',
    isCoOwner: false,
    address: {
      street: '651 Commerce Drive',
      city: 'Roseville',
      state: 'CA',
      zipCode: '95678',
    },
    primaryContact: {
      name: 'Annette DuPont-Ewing',
      title: 'Marketing Director',
      phone: '502-395-0082',
      email: 'acdupont-ewing@hometownconnections.com',
    },
    websiteUrl: 'https://www.hometownconnections.com/',
    statesServed: ['CA', 'CO', 'CT', 'GA', 'KY', 'ME', 'MA', 'NH', 'NJ', 'NY', 'RI', 'VT'],
  },
  {
    organizationName: 'Hometown Connections, Inc. (Colorado)',
    isCoOwner: false,
    address: {
      street: '651 Commerce Drive',
      city: 'Roseville',
      state: 'CA',
      zipCode: '95678',
    },
    primaryContact: {
      name: 'Marc Gerken',
      title: 'CEO',
      phone: '502-395-0082',
      email: 'mgerken@hometownconnections.com',
    },
    websiteUrl: 'https://www.hometownconnections.com/',
    statesServed: ['CO'],
  },
  {
    organizationName: 'NMPP Energy',
    isCoOwner: false,
    address: {
      street: '8377 Glynoaks Drive',
      city: 'Lincoln',
      state: 'NE',
      zipCode: '68516',
    },
    primaryContact: {
      name: 'Nicole Kubik',
      title: 'Member Relations Representative',
      phone: '402-473-8237',
      email: 'nkubik@nmppenergy.org',
    },
    websiteUrl: 'http://www.nmppenergy.org/',
    statesServed: ['CO', 'IA', 'NE', 'WY'],
  },
  {
    organizationName: 'Florida Municipal Electric Association',
    isCoOwner: false,
    address: {
      street: 'Box 10114',
      city: 'Tallahassee',
      state: 'FL',
      zipCode: '32302-0590',
    },
    primaryContact: {
      name: 'Amy Zubaly',
      title: 'Executive Director',
      phone: '850-251-6200',
      email: 'azubaly@flpublicpower.com',
    },
    websiteUrl: 'https://www.flpublicpower.com/',
    statesServed: ['FL'],
  },
  {
    organizationName: 'Illinois Municipal Electric Agency',
    isCoOwner: false,
    address: {
      street: '3400 Conifer Drive',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62711',
    },
    primaryContact: {
      name: 'Ed Cobau',
      title: 'Director-State Association Services & Communications',
      phone: '217-789-4632',
      email: 'ecobau@imea.org',
    },
    websiteUrl: 'http://www.imea.org/',
    statesServed: ['IL'],
  },
  {
    organizationName: 'Indiana Municipal Power Agency',
    isCoOwner: false,
    address: {
      street: '11601 North College Avenue',
      city: 'Carmel',
      state: 'IN',
      zipCode: '46032',
    },
    primaryContact: {
      name: 'Bryan Brackemyre',
      title: 'VP of Member Services',
      phone: '317-573-9955',
      email: 'bryanb@impa.com',
    },
    websiteUrl: 'https://www.impa.com/',
    statesServed: ['IN'],
  },
  {
    organizationName: 'Indiana Municipal Electric Association',
    isCoOwner: false,
    address: {
      street: '176 W. Logan St. Suite #225',
      city: 'Noblesville',
      state: 'IN',
      zipCode: '46060',
    },
    primaryContact: {
      name: 'Duane Richardson',
      title: 'Executive Director',
      phone: '765-366-5506',
      email: 'duane@imea.com',
    },
    websiteUrl: 'http://www.imea.com/aws/IMEA/pt/sp/home-page',
    statesServed: ['IN'],
  },
  {
    organizationName: 'Missouri River Energy Services',
    isCoOwner: false,
    address: {
      street: 'P.O. Box 88920',
      city: 'Sioux Falls',
      state: 'SD',
      zipCode: '57109-8920',
    },
    primaryContact: {
      name: 'Tim Blodgett',
      title: 'Vice President of Member Services & Communications',
      phone: '800-678-4042',
      email: 'tim.blodgett@mrenergy.com',
    },
    websiteUrl: 'https://www.mrenergy.com/',
    statesServed: ['IA', 'MN', 'ND', 'SD'],
  },
  {
    organizationName: 'American Municipal Power Inc. (AMP)',
    isCoOwner: true,
    address: {
      street: '1111 Schrock Road, Suite 100',
      city: 'Columbus',
      state: 'OH',
      zipCode: '43229',
    },
    primaryContact: {
      name: 'Harry E. Phillips',
      title: 'Director of Marketing / Member Relations',
      phone: '614-540-0846',
      email: 'hphillips@amppartners.org',
    },
    websiteUrl: 'https://www.amppartners.org/',
    statesServed: ['MI', 'OH', 'PA', 'VA', 'WV'],
  },
  {
    organizationName: 'Michigan Municipal Electric Association',
    isCoOwner: false,
    address: {
      street: '809 Centennial Way',
      city: 'Lansing',
      state: 'MI',
      zipCode: '48907',
    },
    primaryContact: {
      name: 'Katie Abraham',
      title: 'Executive Director',
      phone: '517-853-6680',
      email: 'kabraham@mpower.org',
    },
    websiteUrl: 'http://mmeanet.org/',
    statesServed: ['MI'],
  },
  {
    organizationName: 'Southern Minnesota Municipal Power Agency',
    isCoOwner: false,
    address: {
      street: '500 1st Avenue SW',
      city: 'Rochester',
      state: 'MN',
      zipCode: '55902',
    },
    primaryContact: {
      name: 'Joe Hoffman',
      title: 'Director--Agency and Government Relations and External Affairs Officer',
      phone: '507-292-6427',
      email: 'ja.hoffman@smmpa.org',
    },
    websiteUrl: 'https://smmpa.com/',
    statesServed: ['MN'],
  },
  {
    organizationName: 'Minnesota Municipal Utilities Association',
    isCoOwner: false,
    address: {
      street: '3025 Harbor Lane N, #400',
      city: 'Plymouth',
      state: 'MN',
      zipCode: '55447',
    },
    primaryContact: {
      name: 'Karleen Kos',
      title: 'Chief Executive Officer',
      phone: '763-746-0701',
      email: 'kkos@mmua.org',
    },
    websiteUrl: 'https://www.mmua.org/',
    statesServed: ['MN', 'ND'],
  },
  {
    organizationName: 'Missouri Public Utility Alliance',
    isCoOwner: true,
    address: {
      street: '2200 Maguire Blvd.',
      city: 'Columbia',
      state: 'MO',
      zipCode: '65201',
    },
    primaryContact: {
      name: 'Brandon Renaud',
      title: 'Manager- Business & Member Development',
      phone: '573-445-3279',
      email: 'brenaud@mpua.org',
    },
    websiteUrl: 'https://mpua.org/',
    statesServed: ['MO'],
  },
  {
    organizationName: 'ElectriCities of North Carolina',
    isCoOwner: false,
    address: {
      street: 'PO Box 29513',
      city: 'Raleigh',
      state: 'NC',
      zipCode: '27626-0513',
    },
    primaryContact: {
      name: 'Dale Odom',
      title: 'Manager, Retail Energy Services',
      phone: '336-250-4223',
      email: 'dodom@electricities.org',
    },
    websiteUrl: 'https://www.electricities.com/',
    statesServed: ['NC'],
  },
  {
    organizationName: 'Oklahoma Municipal Power Authority',
    isCoOwner: false,
    address: {
      street: 'P.O. Box 1960 Edmond',
      city: 'Edmond',
      state: 'OK',
      zipCode: '73083',
    },
    primaryContact: {
      name: 'Ryan Piersol',
      title: 'Member Services Representative',
      phone: '405-359-2518',
      email: 'rpiersol@ompa.com',
    },
    websiteUrl: 'http://ompa.com/',
    statesServed: ['OK'],
  },
  {
    organizationName: 'Oklahoma Municipal Alliance',
    isCoOwner: false,
    address: {
      street: '308 N.E. 27th Street',
      city: 'Oklahoma City',
      state: 'OK',
      zipCode: '73105',
    },
    primaryContact: {
      name: 'Tom Rider',
      title: 'General Manager',
      phone: '405-528-7564 ext 1',
      email: 'tom@okmainc.com',
    },
    websiteUrl: 'http://okmainc.com/',
    statesServed: ['OK'],
  },
  {
    organizationName: 'Piedmont Municipal Power Agency',
    isCoOwner: false,
    address: {
      street: '121 Village Drive',
      city: 'Greer',
      state: 'SC',
      zipCode: '29651',
    },
    primaryContact: {
      name: 'Mike Frazier',
      title: 'Director of Engineering and Power Supply',
      phone: '864-848-5409',
      email: 'MFrazier@pmpa.com',
    },
    websiteUrl: 'https://www.pmpa.com/',
    statesServed: ['SC'],
  },
  {
    organizationName: 'Missouri River Energy Services (SD)',
    isCoOwner: false,
    address: {
      street: 'P.O. Box 88920',
      city: 'Sioux Falls',
      state: 'SD',
      zipCode: '57109-8920',
    },
    primaryContact: {
      name: 'Brad Lingen',
      title: 'Smart Grid Technical Supervisor',
      phone: '605-330-6972',
      email: 'brad.lingen@mrenergy.com',
    },
    websiteUrl: 'https://www.mrenergy.com/',
    statesServed: ['SD'],
  },
  {
    organizationName: 'Tennessee Municipal Electric Power Association',
    isCoOwner: false,
    address: {
      street: '212 Overlook Circle, #205',
      city: 'Brentwood',
      state: 'TN',
      zipCode: '37027',
    },
    primaryContact: {
      name: 'Brian Solsbee',
      title: 'Executive Director',
      phone: '615-373-5738',
      email: 'bsolsbee@tmepa.org',
    },
    websiteUrl: 'https://tmepa.org/',
    statesServed: ['TN'],
  },
  {
    organizationName: 'Texas Public Power Association',
    isCoOwner: false,
    address: {
      street: 'PO Box 82768',
      city: 'Austin',
      state: 'TX',
      zipCode: '78708',
    },
    primaryContact: {
      name: 'Taylor Kilroy',
      title: 'Executive Director',
      phone: '512-472-5965 Ext. 15',
      email: 'tkilroy@tppa.com',
    },
    websiteUrl: 'https://www.tppa.com/',
    statesServed: ['TX'],
  },
  {
    organizationName: 'Vermont Public Power Supply Authority',
    isCoOwner: true,
    address: {
      street: 'P.O. Box 126',
      city: 'Waterbury Center',
      state: 'VT',
      zipCode: '05677',
    },
    primaryContact: {
      name: 'Ken Nolan',
      title: 'General Manager',
      phone: '802-882-8500',
      email: 'knolan@vppsa.com',
    },
    websiteUrl: 'https://vppsa.com/',
    statesServed: ['VT'],
  },
  {
    organizationName: 'Energy Northwest',
    isCoOwner: false,
    address: {
      street: 'P.O. Box 968',
      city: 'Richland',
      state: 'WA',
      zipCode: '99352-0968',
    },
    primaryContact: {
      name: 'Sarah Fussner',
      title: 'Workforce Development Program Coordinator, Energy Services & Development',
      phone: '509-377-4182',
      email: 'slfussner@energy-northwest.com',
    },
    websiteUrl: 'https://www.energy-northwest.com/Pages/default.aspx',
    statesServed: ['WA'],
  },
  {
    organizationName: 'Great Lakes Utilities',
    isCoOwner: true,
    address: {
      street: '1323 South 7th Street, P.O. Box 965',
      city: 'Manitowoc',
      state: 'WI',
      zipCode: '54221-0965',
    },
    primaryContact: {
      name: 'Nilaksh Kothari',
      title: 'Managing Director',
      phone: '920-686-4351',
      email: 'NKothari@mpu.org',
    },
    websiteUrl: 'http://greatlakesutilities.org/',
    statesServed: ['WI'],
  },
];

async function importAffiliates() {
  console.log('Starting affiliate import...\n');
  console.log(`Total affiliates to import: ${affiliatesData.length}\n`);

  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  for (const affiliate of affiliatesData) {
    try {
      const doc = {
        _type: 'affiliate',
        organizationName: affiliate.organizationName,
        address: affiliate.address,
        primaryContact: affiliate.primaryContact,
        websiteUrl: affiliate.websiteUrl,
        isCoOwner: affiliate.isCoOwner,
        statesServed: affiliate.statesServed,
        isActive: true,
        order: successCount,
      };

      const result = await client.create(doc);
      successCount++;
      console.log(`✓ Imported: ${affiliate.organizationName} (${affiliate.address.state})`);
    } catch (error) {
      errorCount++;
      errors.push({
        affiliate: affiliate.organizationName,
        error: error.message,
      });
      console.error(`✗ Failed: ${affiliate.organizationName} - ${error.message}`);
    }
  }

  console.log('\n--- Import Summary ---');
  console.log(`Total Affiliates: ${affiliatesData.length}`);
  console.log(`Successfully Imported: ${successCount}`);
  console.log(`Failed: ${errorCount}`);
  console.log(`Co-owners: ${affiliatesData.filter(a => a.isCoOwner).length}`);

  if (errors.length > 0) {
    console.log('\n--- Errors ---');
    errors.forEach(e => console.log(`- ${e.affiliate}: ${e.error}`));
  }

  console.log('\n✓ Import complete! Check Sanity Studio to review the data.');
}

// Run the import
importAffiliates().catch(console.error);
