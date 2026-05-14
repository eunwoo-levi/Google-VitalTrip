const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const appDir = path.join(root, 'app');

const filesToKeep = ['_layout.tsx', 'index.tsx'];

fs.readdirSync(appDir).forEach((file) => {
  if (!filesToKeep.includes(file)) {
    fs.rmSync(path.join(appDir, file), { recursive: true, force: true });
    console.log(`Removed: ${file}`);
  }
});

console.log('Project reset complete.');
