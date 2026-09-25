/**
 * The public, indexable pages of dist/: one source for the sitemap and for
 * IndexNow, so the two can never disagree about which URLs exist.
 *
 * A page is `<dir>/index.html` served at `https://tolgapol.com/<dir>/`
 * (Cloudflare Pages 308-redirects `/<dir>` to `/<dir>/`, so the slash form is
 * the URL that answers 200). Pages carrying `<meta name="robots" content=
 * "...noindex...">` are left out.
 */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

export const SITE_URL = 'https://tolgapol.com';
export const INDEXNOW_KEY = 'ab0779ff33b025dd0f3083b93a7615a3';
export const DIST_DIR = new URL('../../dist', import.meta.url).pathname;

const NOINDEX = /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i;

/** Pure: `privacy/index.html` -> `https://tolgapol.com/privacy/`. */
export function urlForFile(relPath, siteUrl = SITE_URL) {
  const dir = relPath.split(sep).join('/').replace(/index\.html$/, '');
  return `${siteUrl}/${dir}`;
}

/** Pure: true unless the HTML opts out of indexing. */
export function isIndexable(html) {
  return !NOINDEX.test(html);
}

function indexFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return indexFiles(path);
    return entry.name === 'index.html' ? [path] : [];
  });
}

/** Every indexable page with a content hash, sorted by URL. */
export function listPages(distDir = DIST_DIR, siteUrl = SITE_URL) {
  return indexFiles(distDir)
    .map((file) => ({ file, html: readFileSync(file, 'utf8') }))
    .filter(({ html }) => isIndexable(html))
    .map(({ file, html }) => ({
      url: urlForFile(relative(distDir, file), siteUrl),
      hash: createHash('sha256').update(html).digest('hex'),
    }))
    .sort((a, b) => a.url.localeCompare(b.url));
}
