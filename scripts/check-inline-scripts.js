'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const files = fs.readdirSync(root).filter(file => file.endsWith('.html'));
let failed = false;

for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
  scripts.forEach((match, index) => {
    try {
      new vm.Script(match[1], { filename: `${file}:inline-${index + 1}` });
    } catch (error) {
      failed = true;
      console.error(error.message);
    }
  });
}

if (failed) process.exitCode = 1;
else console.log(`Checked inline JavaScript in ${files.length} HTML files.`);
