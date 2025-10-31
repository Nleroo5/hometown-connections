/**
 * Update Sanity API Token in All Scripts
 * Usage: node scripts/update-token.js YOUR_NEW_TOKEN_HERE
 */

const fs = require('fs');
const path = require('path');

const newToken = process.argv[2];

if (!newToken) {
  console.error('❌ Error: Please provide a token as an argument');
  console.log('\nUsage: node scripts/update-token.js YOUR_NEW_TOKEN_HERE\n');
  console.log('To get a new token:');
  console.log('1. Go to http://localhost:3000/studio');
  console.log('2. Click on your project name → API → Tokens');
  console.log('3. Click "Add API token" → Set permissions to "Editor"');
  console.log('4. Copy the token and run this script again\n');
  process.exit(1);
}

if (!newToken.startsWith('sk')) {
  console.error('❌ Error: Invalid token format. Sanity tokens should start with "sk"');
  process.exit(1);
}

const scriptsDir = path.join(__dirname);
const scriptFiles = [
  'audit-affiliates.js',
  'import-affiliates.js',
  'import-board-members.js',
  'import-missing-affiliates.js',
  'import-services.js',
  'import-team-members.js'
];

console.log('🔧 Updating Sanity API tokens in all scripts...\n');

let updatedCount = 0;
let errorCount = 0;

scriptFiles.forEach(filename => {
  const filePath = path.join(scriptsDir, filename);

  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipped: ${filename} (file not found)`);
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the token line
    const tokenRegex = /token:\s*['"][^'"]*['"]/g;
    const matches = content.match(tokenRegex);

    if (matches && matches.length > 0) {
      content = content.replace(tokenRegex, `token: '${newToken}'`);
      fs.writeFileSync(filePath, content, 'utf8');
      updatedCount++;
      console.log(`✅ Updated: ${filename}`);
    } else {
      console.log(`⚠️  No token found in: ${filename}`);
    }
  } catch (error) {
    errorCount++;
    console.error(`❌ Error updating ${filename}:`, error.message);
  }
});

console.log('\n═══════════════════════════════════════════════════');
console.log('✅ TOKEN UPDATE COMPLETE');
console.log('═══════════════════════════════════════════════════\n');
console.log(`📊 Summary:`);
console.log(`   ✅ Updated: ${updatedCount} files`);
console.log(`   ❌ Errors: ${errorCount}`);
console.log('\n🎯 Next Steps:');
console.log('   1. Run: node scripts/import-missing-affiliates.js');
console.log('   2. Verify: node scripts/audit-affiliates.js');
console.log('   3. Should see 34 total affiliates\n');

if (errorCount > 0) {
  process.exit(1);
}
