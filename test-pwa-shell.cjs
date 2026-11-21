const fs = require('node:fs');
const assert = require('node:assert/strict');

const html = fs.readFileSync('app/app.html', 'utf8');
const sw = fs.readFileSync('app/sw.js', 'utf8');
const shellBlock = sw.match(/const SHELL = \[([\s\S]*?)\];/);
assert(shellBlock, 'Service worker SHELL array not found');
const cached = new Set(
  [...shellBlock[1].matchAll(/['"]([^'"]+)['"]/g)]
    .map(m => new URL(m[1], 'https://local.test/app/').pathname.replace(/^\/app\//, '').replace(/^\.\//, ''))
);

const refs = [...html.matchAll(/\b(?:src|href)=["']([^"']+)["']/gi)]
  .map(m => m[1])
  .filter(ref => !/^(?:[a-z]+:|\/\/|#|data:)/i.test(ref))
  .map(ref => new URL(ref, 'https://local.test/app/app.html').pathname.replace(/^\/app\//, ''));

const missing = [...new Set(refs)].filter(path => !cached.has(path) && path !== '');
assert.deepEqual(missing, [], 'Every local script, stylesheet, icon, and manifest used by app.html must be in the offline shell');

for (const file of [
  'data/images.js',
  'data/taj-records.js',
  'data/fig-text.js',
  'data/word-detail-layout.js',
  'data/pomegranate.js',
  'data/reviewed-records.js',
  'data/lst45.js',
  'data/afghan-embed.js'
]) assert(cached.has(file), file + ' must be precached for offline app startup');

assert.match(sw, /const VERSION = 'gk-shell-v\d+'/);
assert.match(sw, /cache\.addAll\(SHELL\)/);
console.log('Passed: every local app asset is in the offline shell, including all split data files.');
