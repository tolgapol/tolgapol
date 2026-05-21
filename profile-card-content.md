# Profile Card Content Guide

The profile card is data-driven. Edit this file for planning, but edit the real source below for the website:

```text
card-dist/profile-card-data.js
```

Changes in `profile-card-content.md` do not automatically change the HTML. Changes in `card-dist/profile-card-data.js` do.

## Active Data Source

| Purpose | File |
| --- | --- |
| Website profile content | `card-dist/profile-card-data.js` |
| Generated browser vCard source | `card-dist/profile-card-data.js` |
| QR payload source | Generated vCard from `card-dist/profile-card-data.js` |
| Static fallback vCard | `card-dist/tolga-polat.vcf` |
| Cloudflare noindex/header rules | `card-dist/_headers` |

## Current Decisions

| Field | Value |
| --- | --- |
| Subdomain | `hi.tolgapol.com` |
| Card URL | `https://hi.tolgapol.com/` |
| vCard format | Apple-compatible vCard 3.0 |
| vCard extensions | RFC 9554 `PRONOUNS` line retained as a best-effort extension |
| QR content | Full vCard payload, not URL |
| QR error correction | `L`, chosen to reduce density for the full vCard payload |
| Mobile primary action | Add to Contacts |
| Search indexing | `noindex, nofollow, noarchive, nosnippet` |
| Photo default | Hidden; monogram fallback |

## Extracted From `qrcode-tolgapol.svg`

| Field | Value |
| --- | --- |
| Name | Tolga Polat |
| Title | Head of Digital Marketing |
| Organization | incehesap.com |
| Phone | Stored in vCard; hidden on page |
| Work email | Stored in vCard; visible as a public action |
| Personal email | Stored in vCard; hidden on page |
| Work website | `https://incehesap.com`, stored as Work |
| Home website | `https://tolgapol.com`, stored as Home |
| Birthday | Stored in vCard; hidden on page |
| Social | X, LinkedIn, Instagram, GitHub |

## Fields Supported In `profile-card-data.js`

The page does not need to show every vCard field. Public page actions are controlled here:

```js
visibleLinks: ["website", "linkedin", "github", "work-email"]
```

Fields can stay in the generated vCard while remaining hidden from the page.

### Identity

- `firstName`
- `lastName`
- `additionalNames`
- `prefix`
- `suffix`
- `jobTitle`
- `role`
- `organization`
- `department`
- `pronouns`

Pronouns are emitted with the RFC 9554 `PRONOUNS` property:

```js
pronouns: [
  { value: "they/them", language: "en", pref: 1, type: "personal" }
]
```

Keep `pronouns: []` if this should not be included.

The current value is:

```js
pronouns: [{ value: "he/him", language: "en", pref: 1 }]
```

### Phone

Each phone supports:

- `label`: visible label, for example `Mobile`
- `type`: `cell`, `work`, `home`, `fax`, or `voice`
- `number`: preferably E.164, for example `+905551234567`
- `visible`: whether it appears on the web page

### Email

Each email supports:

- `label`: visible label, for example `Personal`
- `type`: `home`, `work`, or `internet`
- `email`
- `visible`: whether it appears on the web page

### Websites

Each website supports:

- `label`
- `url`
- `visible`

### Dates

- `birthday`: `YYYY-MM-DD`
- `dates`: list of `{ label, value }`
- Use `anniversary` as a label for `ANNIVERSARY`; other labels are emitted as Apple-compatible custom dates.

### Address

Address supports:

- `label`
- `type`: `work` or `home`
- `street`
- `locality`
- `region`
- `postalCode`
- `country`
- `formatted`: optional single-line fallback
- `visible`: whether it appears on the web page

### Note

- `note`: included in vCard.

### Social Media

- `twitter`: `@handle`, `handle`, or URL
- `linkedin`: `handle` or full LinkedIn profile URL
- `instagram`: `@handle`, `handle`, or URL
- `github`: `handle` or URL

The generated vCard uses Apple-compatible `X-SOCIALPROFILE` lines so Contacts shows native social labels where supported.

### Instant Messages

Each instant message supports:

- `service`: `whatsapp`, `linkedin`, `skype`, `jabber`, `facebook`, `aim`, `icq`, `msn`, or `yahoo`
- `username`
- `visible`

The current vCard includes WhatsApp and LinkedIn instant-message entries.

## Photo In vCard

The data model supports a vCard photo:

```js
photo: {
  includeInVCard: false,
  mediaType: "image/jpeg",
  url: "https://hi.tolgapol.com/assets/tolga-polat.jpg",
  data: ""
}
```

Set `includeInVCard` to `true` only after a real image exists. Inline `data` is the most reliable contact-photo import path, but it should not be used in the QR payload because it makes the QR code too dense.

## Photo

Photo is controlled here:

```js
display: {
  showPhoto: false,
  photoUrl: "assets/tolga-polat.jpg"
}
```

Set `showPhoto` to `true` after placing the image at:

```text
card-dist/assets/tolga-polat.jpg
```

If privacy matters, keep `showPhoto: false`; the page uses the monogram instead.
