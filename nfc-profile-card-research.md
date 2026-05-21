# NFC Profile Card Research

Date: 2026-05-20

## Goal

Create a mobile-first, single-page profile card for NFC and QR sharing. It should show identity, title, contact channels, social links, and a one-tap vCard download. On desktop it can also show a QR code. On mobile, the QR code should be hidden and the primary "Add to Contacts" action should be sticky at the bottom.

The current repository is a very small Cloudflare Pages static site. The cleanest implementation should keep that property: static HTML/CSS/JS, no framework, no runtime dependency unless a future decision requires host-based routing or dynamic vCard generation.

## Executive Recommendation

Build a static profile card served from a short human subdomain. Current naming recommendation is `hi.tolgapol.com`; `card.tolgapol.com` remains the more formal fallback.

Use the NFC tag to open:

```text
https://hi.tolgapol.com/
```

Use a visible, explicit contact action:

```text
https://hi.tolgapol.com/tolga-polat.vcf
```

Do not auto-download the vCard on page load. Auto-triggered downloads are less trustworthy, can be blocked by browsers, and remove the chance to show context first. The page should open quickly, then the user taps "Add to Contacts".

## Domain and URL Strategy

Recommended subdomain:

```text
hi.tolgapol.com
```

Why:

- It is short, human, and reads naturally in the meeting moment.
- It makes the NFC notification feel less technical than `card`, `nfc`, or `vcard`.
- It is easy to say out loud and type manually.
- It still fits professional use because the content underneath is a contact card.

Strong fallback:

```text
card.tolgapol.com
```

Why:

- It is the clearest and most professional option.
- It describes the object, not the technology. `nfc.tolgapol.com` is too implementation-focused.
- It works for NFC, QR, email signature, and manual typing.
- It avoids the generic feel of `link.tolgapol.com` or `bio.tolgapol.com`.

Good alternatives:

- `hello.tolgapol.com`: warm and memorable, but a little longer than `hi`.
- `meet.tolgapol.com`: good for the introduction moment, but slightly more event-like.
- `save.tolgapol.com`: clear action, but narrower than the page experience.
- `add.tolgapol.com`: very direct for contacts, but a little utilitarian.
- `add-me.tolgapol.com`: memorable, but the hyphen is awkward to say and the phrase can feel less premium.
- `contact.tolgapol.com`: very clear, but longer in NFC notifications and QR URLs.
- `me.tolgapol.com`: short, but less professional.
- `tap.tolgapol.com`: strong for NFC, weaker for desktop/QR contexts.

Avoid:

- `nfc.tolgapol.com`: exposes implementation detail and feels like a utility endpoint.
- `vcard.tolgapol.com`: too narrow if the page includes photo, social links, and QR.
- `qr.tolgapol.com`: wrong primary mental model for NFC card use.

## Discoverability and Privacy

This cannot be truly private if it is public and usable from an NFC card. Anyone with the URL can open it. The goal should be "not indexed and not linked", not "secret".

Recommended controls:

- Do not link to the card from `tolgapol.com`.
- Do not include it in any sitemap.
- Add both HTML and HTTP noindex controls:

```html
<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
```

```text
X-Robots-Tag: noindex, nofollow, noarchive, nosnippet
```

- On Cloudflare Pages, add the header with a `_headers` file in the card output directory.
- Do not block the page in `robots.txt`; Google must be able to crawl the page to see `noindex`.
- Keep the root route clean. If stronger obscurity is desired, use a short private path such as `/p/tp-8f3k/`, but this makes the physical NFC card URL less elegant.

Privacy tiers:

| Tier | URL | Search risk | Usability | Recommendation |
| --- | --- | --- | --- | --- |
| Public but noindex | `hi.tolgapol.com/` | Low if unlinked | Best | Recommended |
| Obscure path + noindex | `hi.tolgapol.com/p/tp-8f3k/` | Lower | Slightly worse | Use if phone/email exposure is sensitive |
| Password/Cloudflare Access | Any | Very low | Bad for NFC recipients | Not suitable |
| Direct vCard endpoint | `hi.tolgapol.com/tolga-polat.vcf` | Low | No profile experience | Secondary action only |

## NFC Behavior

Use one HTTPS URL in the NFC tag, encoded as an NDEF URI record.

Do not encode the full vCard into the NFC tag. iPhone background NFC scanning is best aligned with URI records and supported URL schemes; Android also has explicit URI helpers for well-formed NDEF records. A URL also keeps the card editable after the physical NFC card is printed.

NFC content:

```text
https://hi.tolgapol.com/
```

Recommended tag type:

- NTAG215 or NTAG216 for comfort, even though the URL fits into smaller tags.
- Lock the tag after testing only if the printed card is final.
- Keep the URL stable; change page content server-side, not on the tag.

## vCard Strategy

Use a downloadable `.vcf` file with `Content-Type: text/vcard; charset=utf-8` and the `.vcf` extension.

The implemented card generates an Apple-compatible vCard 3.0 from `card-dist/profile-card-data.js`. QR code content is the full vCard payload, not `hi.tolgapol.com`. A static `card-dist/tolga-polat.vcf` exists as fallback, but browser download links are generated from the same data object used for the QR code.

Current standard direction:

- vCard 4.0 remains the latest major vCard revision, but Apple Contacts currently preserves phone, email, URL, and instant-message labels more reliably with its own vCard 3.0 export shape.
- RFC 9554 adds modern vCard properties including `PRONOUNS` and `SOCIALPROFILE`; `PRONOUNS` is retained as a best-effort line.
- The generator emits Apple-compatible `X-SOCIALPROFILE` lines rather than RFC `SOCIALPROFILE`, because the tested Apple parser maps these to native social profile services.
- QR error correction is set to `L` because the payload is a full vCard; this keeps the desktop QR less dense and easier to scan on screen.

Current generated baseline:

```text
BEGIN:VCARD
VERSION:3.0
N:Polat;Tolga;;;
FN:Tolga Polat
PRONOUNS;LANGUAGE=en;PREF=1:he/him
TITLE:Head of Digital Marketing
ROLE:Marketing leader
ORG:incehesap.com;
TEL;type=CELL;type=VOICE;type=pref:[stored in data file]
EMAIL;type=INTERNET;type=WORK;type=pref:[stored in data file]
EMAIL;type=INTERNET;type=HOME:[stored in data file]
URL;type=WORK;type=pref:https://incehesap.com
URL;type=HOME:https://tolgapol.com
BDAY:19920728
NOTE:Marketing leader building growth systems across digital strategy\, analytics\, automation\, and high-intent customer journeys.
X-SOCIALPROFILE;type=LinkedIn:https://linkedin.com/in/tolgapol
item1.IMPP;X-SERVICE-TYPE=WhatsApp:x-apple:[stored in data file]
item1.X-ABLabel:WhatsApp
REV:20260520T000000Z
END:VCARD
```

Optional fields to add after owner confirmation:

| Field | Rule |
| --- | --- |
| `PRONOUNS` | Add only if the user wants pronouns in saved contacts. |
| `ADR` | Add only if a public address should be stored. |
| `IMPP` | WhatsApp and LinkedIn are included. |
| `PHOTO` | Add only after a real image exists; inline base64 is most reliable for contact-photo import but should not be used in QR. |

Field guidance:

- Use E.164 phone format, for example `+905xxxxxxxxx`.
- Use `URL;type=WORK` for `incehesap.com` and `URL;type=HOME` for `tolgapol.com`; do not include `hi.tolgapol.com` as a contact website.
- Use `X-SOCIALPROFILE` for Apple Contacts social profile mapping.
- Avoid embedding a base64 photo in the vCard unless tested across iOS and Android; it increases file size and import fragility. Prefer the photo on the web page.
- Keep the vCard short. Contacts apps are inconsistent with long notes, many URLs, and custom fields.

## Page Content Model

Primary content:

- Name: Tolga Polat
- Title: Head of Digital Marketing
- Organization: incehesap.com
- Short positioning line: marketing leader building growth systems across digital strategy, analytics, automation, and high-intent customer journeys.
- Location: Istanbul, Turkey, if desired.
- Photo: optional; hidden by default for privacy and replaced with a monogram.
- Primary actions:
  - Add to Contacts
  - Email
  - Website
- Social actions:
  - LinkedIn
  - Instagram, X, GitHub, or other channels only if actively used.
- Desktop-only QR panel:
  - QR contains the full generated vCard payload.
  - Use the built-in QR generator by default; owner-supplied SVG is no longer required.

Avoid making this a full link-in-bio clone. The page should be a contact exchange surface, not a general directory of everything.

## UX and Design Direction

Design principle: premium, calm, fast, contact-first.

Mobile layout:

- Top: portrait/photo, name, title, short one-line positioning.
- Middle: compact contact rows with recognizable icons.
- Bottom: sticky "Add to Contacts" button with safe-area padding.
- Secondary actions remain reachable but visually quieter.
- No QR code on mobile.
- No page scroll on mobile; content scales down by breakpoint and viewport height.

Desktop layout:

- Full-screen profile surface with a two-zone layout:
  - Left: identity and contact actions.
  - Right: QR code and short scan label.
- Keep the page focused enough to feel like a contact exchange surface, not a portfolio page.
- Use a graphic editorial visual language instead of a boxed card composition.

Time-based theme:

- Use local device time:
  - Light: 07:00-18:59
  - Dark: 19:00-06:59
- Also respect `prefers-color-scheme` as a fallback if JavaScript is disabled.
- Do not add a visible theme toggle unless requested; this page should stay focused.

Visual style options:

1. Editorial Minimal
   - White/near-black backgrounds, sharp typography, restrained borders.
   - Best fit with the current site.

2. Glass Contact Card
   - Subtle translucent surface, small depth, soft photo treatment.
   - Good for NFC novelty, but easy to overdo.

3. Utility Card
   - Dense, very functional, almost Apple Contacts style.
   - Best for speed and clarity, less memorable.

Recommended direction: Editorial Contact Surface with optional portrait support and no boxed card container.

## Design Decision

Chosen direction: Editorial Contact Surface.

This should feel like a premium contact object, not a portfolio homepage and not a SaaS landing page. The first screen should answer four questions immediately: who this is, what he does, how to save the contact, and which channel to use next.

Mobile decisions:

- Use a single-screen layout with no page scroll.
- Put the portrait near the top, but keep name and title as the first readable signal.
- Use one primary sticky bottom action: `Add to Contacts`.
- Keep website, LinkedIn, GitHub, and work email as compact public actions. Phone and personal details stay in the vCard.
- Hide the QR entirely below tablet/desktop breakpoints.
- Use `padding-bottom: env(safe-area-inset-bottom)` for iPhone home indicator safety.

Desktop decisions:

- Use a full-page editorial composition: identity/actions on the left, QR on the right.
- Keep the QR large enough to scan from a laptop screen without zooming.
- Do not add a hero, timeline, portfolio section, or marketing copy.
- Keep the background quiet and let the portrait, name, and contact actions carry the page.

Visual decisions:

- Use an editorial serif display face with native sans-serif UI text.
- Use a black/off-white base with high-energy accent strips, not a generic card container.
- Day theme should be light, crisp, and paper-like.
- Night theme should be dark, graphic, and high-contrast.
- Use minimal motion only for first paint; respect `prefers-reduced-motion`.
- Avoid external icon libraries unless the implementation already has one; inline SVG icons are enough for this small static page.

Content decisions:

- Primary visible text should be English, matching the existing personal site.
- The button text should be direct: `Add to Contacts`.
- The page should not explain how NFC, QR, or vCard works.
- Social links should be curated, not exhaustive.

## Competitor Pattern Notes

Common patterns across modern digital business card tools:

- Recipient should not need an app.
- Sharing happens through link, QR, NFC, email, text, and sometimes wallet passes.
- QR codes are primarily useful for desktop, events, printed material, and fallback when NFC fails.
- Strong products separate the profile page from the saved contact file.
- The best pages prioritize a single save/contact action and keep social links secondary.

Relevant observed products:

- HiHello: broad sharing model; QR, link, NFC, AirDrop, Apple Watch, and no recipient app requirement.
- Blinq: QR, NFC, wallet, smartwatch, widget-style sharing; strong individual card use case.
- Popl: stronger team/event/lead-capture focus; useful reference, but too heavy for this personal site.
- Link-in-bio tools: good link hierarchy patterns, but too generic if copied directly.

## Implementation Approach

Preferred implementation:

- Add a separate static output directory, for example `card-dist/`.
- Create `card-dist/index.html`.
- Create `card-dist/profile-card-data.js`.
- Create `card-dist/tolga-polat.vcf`.
- Create `card-dist/_headers` with noindex and correct vCard MIME behavior where supported.
- Deploy with a separate Pages project, for example:

```text
wrangler pages deploy card-dist --project-name=tolgapol-hi
```

- Attach `hi.tolgapol.com` as a custom domain in Cloudflare Pages.

Why separate project:

- The existing root site remains untouched.
- The card can have its own noindex headers without affecting `tolgapol.com`.
- No host-based routing or Pages Functions are needed.
- The deploy surface stays static and easy to reason about.

Can this live inside the existing Cloudflare Pages project? Yes, but the tradeoff matters.

Cloudflare Pages custom domains attach to a project, not to a specific file or folder. If `hi.tolgapol.com` is attached to the existing `tolgapol` Pages project, it will serve the same deployed static output as `tolgapol.com`. To make the subdomain root show different content, one of these has to happen:

| Approach | Works? | Tradeoff |
| --- | --- | --- |
| Same project, `/card/` path | Yes | URL becomes `tolgapol.com/card/` or `hi.tolgapol.com/card/`, not the clean subdomain root. |
| Same project, host-based Pages Function rewrite | Yes | Adds runtime code just to route one static page. |
| Same project, Cloudflare redirect/rewrite rule | Yes | Works, but the behavior lives partly outside the repo. |
| Same project, JavaScript host detection | Technically yes | Weakest option: wrong initial HTML/meta, less clean noindex behavior, possible flicker. |
| Separate Pages project | Yes | One extra Pages project, but clean static hosting and isolated headers. |

Updated recommendation: use a separate Pages project if the card should live cleanly at `https://hi.tolgapol.com/`. Use the existing project only if keeping one Pages project is more important than having the simplest static architecture.

## Files Likely Needed Later

If approved, expected edits:

```text
card-dist/index.html
card-dist/profile-card-data.js
card-dist/tolga-polat.vcf
card-dist/_headers
package.json
```

`package.json` can get one extra deploy script:

```json
"deploy:card": "wrangler pages deploy card-dist --project-name=tolgapol-hi"
```

No new npm dependencies are required.

## Required Owner Inputs

Before implementation, collect exact values:

- Preferred subdomain: recommended `hi.tolgapol.com`, formal fallback `card.tolgapol.com`.
- Full display name.
- Exact title.
- Organization/company name, if it should appear in contacts.
- Phone number in E.164 format.
- Preferred email.
- Main website URL.
- LinkedIn URL.
- Other social URLs to include.
- City/country, if desired.
- Headshot image.
- Desktop QR SVG is not required; QR is generated from the vCard payload in the browser.
- Whether the phone number should be visible on the page, only inside the vCard, or omitted.

## Sources

- RFC 6350, vCard Format Specification: https://datatracker.ietf.org/doc/html/rfc6350
- Apple Support, import contacts from vCard on iPhone: https://support.apple.com/guide/iphone/iph356499f31/26/ios/26
- Apple iCloud help, vCard 3.0 and later import support: https://help.apple.com/icloud/es.lproj/mmfba7399f.html
- Google Contacts Help, Android VCF import: https://support.google.com/contacts/answer/15147365?co=GENIE.Platform%3DAndroid&hl=en
- Apple Developer, Core NFC background tag reading: https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading
- Android Developers, NdefRecord URI records: https://developer.android.com/reference/kotlin/android/nfc/NdefRecord.html
- Google Search Central, noindex: https://developers.google.com/search/docs/crawling-indexing/block-indexing
- Google Search Central, controlling content in Search: https://developers.google.com/search/docs/crawling-indexing/control-what-you-share
- Cloudflare Pages custom domains: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Cloudflare Pages custom headers: https://developers.cloudflare.com/pages/configuration/headers/
- HiHello sharing patterns: https://www.hihello.com/features/share-digital-business-cards
- Blinq digital business card sharing patterns: https://blinq.me/solutions/digital-business-card
- Popl digital business card/team patterns: https://popl.co/pages/digital-business-card

## Assumptions

- The card will be public but intentionally unindexed.
- The target audience is people who scan an NFC card in person.
- The owner prefers low-maintenance static hosting over dashboards, analytics, lead capture, or CRM features.
- The card should inherit the professional tone of the current site rather than become a colorful link-in-bio page.
