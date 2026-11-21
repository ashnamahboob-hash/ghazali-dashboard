// Returns app/app.html with its local css/, js/ and data/ files put back inline,
// exactly where they originally were, so tests that inspect the whole page text
// (slicing between markers) keep working after app.html was split.
const fs = require('fs'), path = require('path');
const APP = path.join(__dirname, '..', 'app');
const raw = f => fs.readFileSync(path.join(APP, f), 'utf8');

// A data file holds one or more top-level statements, each starting with "const " or "var ".
function chunks(file) {
  const lines = raw(file).replace(/\n$/, '').split('\n'), out = [];
  for (const l of lines) {
    if (/^(const|var) /.test(l) || !out.length) out.push(l); else out[out.length - 1] += '\n' + l;
  }
  return out;
}

module.exports = function appSource() {
  const queues = {};
  const take = f => (queues[f] = queues[f] || chunks(f)).shift();
  const emblem = /^var APP_EMBLEM_SRC="([^"]+)";/.exec(raw('data/images.js'))[1];
  queues['data/images.js'] = chunks('data/images.js').slice(1);   // first chunk = emblem, put back below

  const readJs = f => {
    let t = raw(f).replace(/\n$/, '');
    t = t.replace(/\/\* moved to (data\/[\w.-]+) \*\//g, (m, d) => take(d));
    return t.split("'+APP_EMBLEM_SRC+'").join(emblem);
  };

  let html = raw('app.html');
  // data scripts that sit in front of a script were only moved out of it: drop the tags, readJs re-inserts the code
  html = html.replace(/<script src="data\/[\w.-]+"><\/script>\n/g, '');
  html = html.replace(/<script([^>]*?)\s+src="(js\/[^"]+)"([^>]*)><\/script>/g,
    (m, a, f, b) => `<script${a}${b}>\n${readJs(f)}\n</script>`);
  html = html.replace(/<link rel="stylesheet" href="(css\/[^"]+)"([^>]*)>/g,
    (m, f, rest) => `<style${rest}>\n${raw(f).replace(/\n$/, '')}\n</style>`);
  return html;
};
