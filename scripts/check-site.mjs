import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, relative, join } from 'node:path';

const root = resolve(process.env.YSEREIN_WIKI_OUT_DIR || process.env.SEREIN_WIKI_OUT_DIR || '.vitepress/dist');
const errors = [];
function walk(directory) {
  return readdirSync(directory).flatMap(name => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}
const files = existsSync(root) ? walk(root) : [];
const pages = files.filter(path => path.endsWith('.html'));
if (!pages.length) errors.push('No built HTML pages; run npm run build successfully before checking.');
for (const page of ['index.html', 'products/index.html', 'docs/index.html', 'downloads/index.html', 'support/index.html']) {
  if (!existsSync(join(root, page))) errors.push(`Required page missing: ${page}`);
}
const ids = new Map();
for (const path of pages) {
  const html = readFileSync(path, 'utf8');
  ids.set(path, new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])));
  if (/(?:HANDOFF|MEMORY|CONTENT_INVENTORY|KNOWN_FAILURES|TEST_EVIDENCE)\.html$/.test(path)) errors.push(`Internal page published: ${relative(root, path)}`);
  if (/<(?:h1|p)[^>]*>[^<]*(?:待补材料|正式发布资料待补|页面框架已建立)/.test(html)) errors.push(`Public writing placeholder: ${relative(root, path)}`);
}
let links = 0;
for (const path of pages) {
  const html = readFileSync(path, 'utf8');
  const current = new URL(relative(root, path), 'https://site.invalid/');
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const raw = match[1].replaceAll('&amp;', '&');
    if (!raw || /^(?:https?:|mailto:|data:|tel:|javascript:|\/\/)/.test(raw)) continue;
    const url = new URL(raw, current);
    const target = resolve(root, '.' + decodeURIComponent(url.pathname));
    if (!target.startsWith(root + '/') && target !== root) { errors.push(`Outside build root: ${raw}`); continue; }
    const candidates = [target, target + '.html', join(target, 'index.html')];
    const found = candidates.find(candidate => existsSync(candidate) && statSync(candidate).isFile());
    if (!found) { errors.push(`${relative(root, path)} → missing ${raw}`); continue; }
    links++;
    if (url.hash && found.endsWith('.html') && !ids.get(found)?.has(decodeURIComponent(url.hash.slice(1)))) errors.push(`${relative(root, path)} → missing anchor ${raw}`);
  }
}
const catalog = JSON.parse(readFileSync('.vitepress/data/releases.json', 'utf8'));
const assetIDs = new Set();
for (const asset of catalog.assets) {
  if (assetIDs.has(asset.id)) errors.push(`Duplicate asset: ${asset.id}`);
  assetIDs.add(asset.id);
  if (!/^[a-f0-9]{64}$/.test(asset.sha256) || !Number.isSafeInteger(asset.bytes) || asset.bytes <= 0 || !asset.version || !asset.file) errors.push(`Incomplete asset identity: ${asset.id}`);
  if (asset.url !== null && (!asset.url.startsWith('https://') || asset.availability !== 'public')) errors.push(`Inconsistent public asset: ${asset.id}`);
  if (asset.url === null && asset.availability !== 'contact') errors.push(`Missing asset recovery path: ${asset.id}`);
}
if (errors.length) {
  console.error([...new Set(errors)].join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checked ${pages.length} pages, ${links} internal links/assets and ${catalog.assets.length} download identities.`);
}
