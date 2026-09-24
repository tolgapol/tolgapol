#!/usr/bin/env node
/**
 * Tell IndexNow (Bing, Yandex, Seznam, Naver...) which public pages changed.
 * Chained after `wrangler pages deploy` in `npm run deploy`: the Pages project
 * has no Git integration, so the local deploy script is the only deploy path.
 *
 *   node scripts/indexnow-submit.mjs            # after a deploy
 *   node scripts/indexnow-submit.mjs --dry-run  # print the batch, send nothing
 *
 * "Changed" = a page whose dist/ hash differs from the last batch IndexNow
 * accepted (.indexnow/manifest.json, gitignored). A missing manifest (first
 * run, fresh clone) sends the full page list. The manifest is written only
 * after a 200/202, so a failed submission is retried on the next deploy.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { INDEXNOW_KEY, SITE_URL, listPages } from './lib/site-pages.mjs';

export const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MANIFEST = new URL('../.indexnow/manifest.json', import.meta.url).pathname;
const MAX_URLS = 10_000;
const KEY_POLL_ATTEMPTS = 12;
const KEY_POLL_DELAY_MS = 10_000;
const VERIFY_RETRY_DELAY_MS = 60_000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Pure: pages whose hash is new or differs from the manifest. */
export function changedPages(pages, manifest) {
  return pages.filter((page) => manifest[page.url] !== page.hash);
}

/** Pure: the JSON body the IndexNow batch endpoint expects. */
export function payload(urls, siteUrl = SITE_URL, key = INDEXNOW_KEY) {
  return { host: new URL(siteUrl).host, key, keyLocation: `${siteUrl}/${key}.txt`, urlList: urls };
}

function loadManifest() {
  return existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};
}

function saveManifest(manifest) {
  mkdirSync(dirname(MANIFEST), { recursive: true });
  writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
}

/** Pages serves index.html for unknown paths, so only the key body proves the deploy is live. */
async function waitForKeyFile(url) {
  for (let attempt = 1; attempt <= KEY_POLL_ATTEMPTS; attempt += 1) {
    const res = await fetch(url, { cache: 'no-store' }).catch(() => null);
    if (res?.ok && (await res.text()).trim() === INDEXNOW_KEY) return true;
    console.log(`indexnow: key file not live yet (attempt ${attempt}/${KEY_POLL_ATTEMPTS})`);
    if (attempt < KEY_POLL_ATTEMPTS) await sleep(KEY_POLL_DELAY_MS);
  }
  return false;
}

async function post(body) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  return { status: res.status, text: (await res.text()).slice(0, 300) };
}

/** A brand-new key can get 403 SiteVerificationNotCompleted once; retry a single time. */
async function submit(body) {
  let res = await post(body);
  if (res.status === 403) {
    console.log(`indexnow: 403 ${res.text}; retrying once in 60s`);
    await sleep(VERIFY_RETRY_DELAY_MS);
    res = await post(body);
  }
  console.log(`indexnow: HTTP ${res.status} ${res.text}`);
  return res.status === 200 || res.status === 202;
}

async function main(argv) {
  const manifest = loadManifest();
  const changed = changedPages(listPages(), manifest);
  if (changed.length === 0) {
    console.log('indexnow: no public page changed since the last submission');
    return 0;
  }
  const batch = changed.slice(0, MAX_URLS);
  const urls = batch.map((page) => page.url);
  const body = payload(urls);
  console.log(`indexnow: ${urls.length} URL(s)\n${urls.join('\n')}`);
  if (argv.includes('--dry-run')) return 0;

  if (!(await waitForKeyFile(body.keyLocation))) {
    console.error(`indexnow: ${body.keyLocation} does not serve the key; not submitting`);
    return 1;
  }
  if (!(await submit(body))) return 1;
  const next = { ...manifest };
  for (const page of batch) next[page.url] = page.hash;
  saveManifest(next);
  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).then(
    (code) => process.exit(code),
    (err) => {
      console.error(`indexnow: ${err.message}`);
      process.exit(1);
    },
  );
}
