#!/usr/bin/env node
/**
 * Write dist/sitemap.xml from the indexable pages in dist/. Runs as
 * `predeploy`, so a new page is in the sitemap before it goes live.
 * No <lastmod>: the file only changes when the page set changes.
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DIST_DIR, listPages } from './lib/site-pages.mjs';

/** Pure: page URLs -> sitemap XML. */
export function sitemapXml(urls) {
  const entries = urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const urls = listPages().map((page) => page.url);
  writeFileSync(join(DIST_DIR, 'sitemap.xml'), sitemapXml(urls));
  console.log(`sitemap: ${urls.length} URL(s) written to dist/sitemap.xml`);
}
