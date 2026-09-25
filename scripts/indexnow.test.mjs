import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { changedPages, payload } from './indexnow-submit.mjs';
import { isIndexable, listPages, urlForFile } from './lib/site-pages.mjs';
import { sitemapXml } from './sitemap.mjs';

function fixtureDist() {
  const dir = mkdtempSync(join(tmpdir(), 'dist-'));
  writeFileSync(join(dir, 'index.html'), '<title>home</title>');
  mkdirSync(join(dir, 'marketing-os'));
  writeFileSync(join(dir, 'marketing-os', 'index.html'), '<title>mos</title>');
  mkdirSync(join(dir, 'privacy'));
  writeFileSync(join(dir, 'privacy', 'index.html'), '<meta name="robots" content="noindex">');
  writeFileSync(join(dir, 'key.txt'), 'k');
  return dir;
}

test('should map index files to slash-terminated URLs when building page URLs', () => {
  assert.equal(urlForFile('index.html'), 'https://tolgapol.com/');
  assert.equal(urlForFile('marketing-os/index.html'), 'https://tolgapol.com/marketing-os/');
});

test('should skip a page when it carries a noindex robots meta', () => {
  assert.equal(isIndexable('<meta name="robots" content="noindex, follow">'), false);
  assert.equal(isIndexable('<meta name="description" content="noindex">'), true);
});

test('should list only indexable html pages when reading dist', () => {
  const urls = listPages(fixtureDist()).map((p) => p.url);
  assert.deepEqual(urls, ['https://tolgapol.com/', 'https://tolgapol.com/marketing-os/']);
});

test('should send every page when no manifest exists and only changed ones after', () => {
  const pages = listPages(fixtureDist());
  assert.equal(changedPages(pages, {}).length, 2);
  const manifest = { [pages[0].url]: pages[0].hash, [pages[1].url]: 'old' };
  assert.deepEqual(changedPages(pages, manifest).map((p) => p.url), [pages[1].url]);
});

test('should build the IndexNow body with the canonical host and key location', () => {
  assert.deepEqual(payload(['https://tolgapol.com/'], 'https://tolgapol.com', 'abc'), {
    host: 'tolgapol.com',
    key: 'abc',
    keyLocation: 'https://tolgapol.com/abc.txt',
    urlList: ['https://tolgapol.com/'],
  });
});

test('should emit one loc per URL when rendering the sitemap', () => {
  const xml = sitemapXml(['https://tolgapol.com/']);
  assert.match(xml, /<loc>https:\/\/tolgapol.com\/<\/loc>/);
  assert.equal(xml.match(/<url>/g).length, 1);
});
