import { PROFILE, BASE_URL, t } from './data.js';
import { saveLang } from './i18n.js';
import { toggleTheme } from './theme.js';
import { renderQr } from './qr.js';

const SVG = {
  moon:  `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`,
  sun:   `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`,
  link:  `<path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2a5 5 0 0 0 7.1 7.1l1.1-1.1"/>`,
  linkedin: `<path d="M8 11v7"/><path d="M8 8v.01"/><path d="M12 18v-7"/><path d="M12 14.5c0-2 1.2-3.5 3-3.5s3 1.2 3 3.5V18"/><path d="M5 4h14v16H5z"/>`,
  github:   `<path d="M15 22v-3.5a3.2 3.2 0 0 0-.9-2.5c3-.3 6.1-1.5 6.1-6.5a5 5 0 0 0-1.3-3.5 4.6 4.6 0 0 0-.1-3.4s-1.1-.3-3.6 1.3a12.4 12.4 0 0 0-6.4 0C6.3 1.8 5.2 2.1 5.2 2.1a4.6 4.6 0 0 0-.1 3.4 5 5 0 0 0-1.3 3.5c0 5 3.1 6.1 6.1 6.5a2.9 2.9 0 0 0-.9 2.1V22"/>`,
  instagram: `<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.2"/><path d="M17 7.2v.01"/>`,
  globe:    `<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/>`,
};

function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${SVG[name]}</svg>`;
}

export function setupControls(lang, theme) {
  const sel = document.getElementById('lang-select');
  if (sel) {
    sel.value = lang;
    sel.addEventListener('change', () => {
      saveLang(sel.value);
      updateContent(sel.value);
    });
  }

  const btn = document.getElementById('theme-toggle');
  const ico = document.getElementById('theme-icon');
  if (btn && ico) {
    ico.innerHTML = theme === 'dark' ? SVG.sun : SVG.moon;
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.addEventListener('click', () => {
      const next = toggleTheme();
      ico.innerHTML = next === 'dark' ? SVG.sun : SVG.moon;
      btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.content = next === 'light' ? '#fafafa' : '#09090b';
    });
  }
}

export function renderLinks() {
  const { personalUrl, linkedin, github, instagram } = PROFILE;
  const items = [
    { label: 'LinkedIn',    href: `https://linkedin.com/in/${linkedin}`,  icon: 'linkedin' },
    { label: 'tolgapol.com', href: personalUrl,                           icon: 'globe' },
    { label: 'GitHub',      href: `https://github.com/${github}`,         icon: 'github' },
    { label: 'Instagram',   href: `https://instagram.com/${instagram}`,   icon: 'instagram' },
  ];
  const nav = document.getElementById('quick-links');
  if (!nav) return;
  nav.innerHTML = items.map(({ label, href, icon: ic }) =>
    `<a class="social-btn" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label}">${icon(ic)}${label}</a>`
  ).join('');
}

export function updateContent(lang) {
  const tr = t(lang);
  const vcfUrl = BASE_URL + tr.vcf;

  const titleEl = document.getElementById('profile-title');
  if (titleEl) titleEl.textContent = tr.title;

  const saveLabel = document.getElementById('save-label');
  const mobileSaveLabel = document.getElementById('mobile-save-label');
  if (saveLabel) saveLabel.textContent = tr.save;
  if (mobileSaveLabel) mobileSaveLabel.textContent = tr.save;

  const qrLabel = document.getElementById('qr-scan-label');
  if (qrLabel) qrLabel.textContent = tr.scan;

  const dSave = document.getElementById('desktop-save');
  const mSave = document.getElementById('mobile-save');
  if (dSave) { dSave.href = vcfUrl; dSave.download = tr.vcf; }
  if (mSave) { mSave.href = vcfUrl; mSave.download = tr.vcf; }

  renderQr(vcfUrl);

  const sel = document.getElementById('lang-select');
  if (sel && sel.value !== lang) sel.value = lang;

  document.documentElement.lang = lang.startsWith('zh') ? lang : lang.split('-')[0];
}
