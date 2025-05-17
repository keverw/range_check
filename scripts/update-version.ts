/**
 * This script updates the version number in README.md to match package.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';

// Get the root directory
const rootDir = resolve(__dirname, '..');

// Read package.json to get the version
const packageJsonPath = join(rootDir, 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

// Read the README.md file
const readmePath = join(rootDir, 'README.md');
let readmeContent = readFileSync(readmePath, 'utf8');

// Replace the version in the README.md
const versionRegex = /# Range Check v\d+\.\d+\.\d+/;
const newVersionHeader = `# Range Check v${version}`;

if (versionRegex.test(readmeContent)) {
  readmeContent = readmeContent.replace(versionRegex, newVersionHeader);

  // Write the updated content back to README.md
  writeFileSync(readmePath, readmeContent);

  console.log(`✅ Updated README.md version to v${version}`);
} else {
  console.error('❌ Could not find version header in README.md');
  process.exit(1);
}
