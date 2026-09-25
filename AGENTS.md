# AGENTS.md - tolgapol.com

Static personal site. `dist/` is the site (hand-written HTML, committed); `card-dist/` is the
separate NFC card at hi.tolgapol.com. No build step, no framework.

## Commands

- `npm test` - node:test suite for the deploy scripts (`scripts/**/*.test.mjs`)
- `npm run dev` - serve `dist/` locally with wrangler
- `npm run deploy` - production deploy of tolgapol.com (see below)
- `npm run indexnow:dry` - print the URLs the next deploy would send to IndexNow
- `npm run deploy:card` - deploy `card-dist/` to the `tolgapol-hi` Pages project

## Deploy

The Cloudflare Pages projects `tolgapol` and `tolgapol-hi` have **no Git integration**:
pushing to GitHub deploys nothing. `npm run deploy` is the only production path:

1. `predeploy` regenerates `dist/sitemap.xml` from `dist/**/index.html` (noindex pages excluded).
2. `wrangler pages deploy dist --branch=main` publishes to production.
3. `scripts/indexnow-submit.mjs` waits until the key file is live, then submits the changed
   pages to IndexNow.

## SEO / IndexNow

- Indexable page = `dist/<dir>/index.html` without `<meta name="robots" content="noindex">`,
  served at `https://tolgapol.com/<dir>/` (Pages 308-redirects the no-slash form). One list,
  `scripts/lib/site-pages.mjs`, feeds both the sitemap and IndexNow.
- Key: `ab0779ff33b025dd0f3083b93a7615a3`, served from `dist/<key>.txt` (public by design).
  Changing it means renaming that file and updating `INDEXNOW_KEY`.
- "Changed" = content hash differs from the last accepted batch, kept in the gitignored
  `.indexnow/manifest.json`. A fresh clone has no manifest, so its first deploy sends every page.
- A failed submission fails `npm run deploy` after the site is already live; rerun
  `npm run indexnow`. 403 is retried once after 60 s (new-key verification); 422 means host mismatch.
- Unknown paths return `index.html` with 200 (SPA fallback), so a 200 is no proof a file exists.
