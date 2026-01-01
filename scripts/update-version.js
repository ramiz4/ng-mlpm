const fs = require('fs');
const path = require('path');

const version = process.argv[2];
const libPath = path.join(__dirname, '../projects/mlpm/package.json');

if (!version) {
  console.error('Please provide a version');
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(libPath, 'utf8'));
packageJson.version = version;
packageJson.peerDependencies['@angular/common'] = `^${version}`;
packageJson.peerDependencies['@angular/core'] = `^${version}`;

fs.writeFileSync(libPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log(`Updated library version to ${version}`);
