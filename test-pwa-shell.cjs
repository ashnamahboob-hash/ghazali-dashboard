const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const appDir = path.join(__dirname, 'app');
const shell = fs.readFileSync(path.join(appDir, 'sw.js'), 'utf8');
const appHtml = fs.readFileSync(path.join(appDir, 'app.html'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(appDir, 'manifest.webmanifest'), 'utf8'));

assert.match(shell, /const VERSION = 'gk-shell-v7';/);
const precache = shell.match(/const SHELL = \[([\s\S]*?)\];/);
assert.ok(precache, 'service-worker shell list exists');
for (const asset of [
  'index.html', 'app.html', 'accounts.js', 'account-utils.mjs',
  'ghazali-gemini.js?v=6', 'ghazali_all_100_plants_final.json',
  'js/afghan-plants.js', 'data/afghan-embed.js', 'css/afghan-plants.css',
  'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'
]) {
  assert.ok(precache[1].includes(asset), 'precache includes ' + asset);
}
for (const asset of [
  'index.html', 'app.html', 'accounts.js', 'account-utils.mjs',
  'ghazali-gemini.js', 'ghazali_all_100_plants_final.json',
  'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'
]) {
  assert.ok(fs.existsSync(path.join(appDir, asset)), 'deployed asset exists: ' + asset);
}
assert.ok(appHtml.includes('src="./ghazali-gemini.js?v=6"'), 'app and service-worker Gemini versions match');
assert.equal(manifest.start_url, 'app.html');
assert.equal(manifest.scope, './');
console.log('Passed: PWA precache references existing app assets, matching Gemini version and offline plant JSON.');
