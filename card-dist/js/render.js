import { LANGUAGES, LANG_LABELS, LANG_NAMES, BASE_URL, t } from './data.js';
import { saveLang } from './i18n.js';
import { toggleTheme } from './theme.js';
import { renderQr } from './qr.js';

const SVG = {
  moon: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  sun: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  save: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`,
  website: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></svg>`,
  linkedin: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 11v7"/><path d="M8 8v.01"/><path d="M12 18v-7"/><path d="M12 14.5c0-2 1.2-3.5 3-3.5s3 1.2 3 3.5V18"/><path d="M5 4h14v16H5z"/></svg>`,
  github: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-3.5a3.2 3.2 0 0 0-.9-2.5c3-.3 6.1-1.5 6.1-6.5a5 5 0 0 0-1.3-3.5 4.6 4.6 0 0 0-.1-3.4s-1.1-.3-3.6 1.3a12.4 12.4 0 0 0-6.4 0C6.3 1.8 5.2 2.1 5.2 2.1a4.6 4.6 0 0 0-.1 3.4 5 5 0 0 0-1.3 3.5c0 5 3.1 6.1 6.1 6.5a2.9 2.9 0 0 0-.9 2.1V22"/></svg>`,
  instagram: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.2"/><path d="M17 7.2v.01"/></svg>`,
};

function themeIcon(theme) {
  return theme === 'dark' ? SVG.sun : SVG.moon;
}

export function buildControls(lang, theme) {
  const el = document.getElementById('controls');
  if (!el) return;

  const langBtns = LANGUAGES.map(l =>
    `<button class="lang-btn${l === lang ? ' active' : ''}" data-lang="${l}" aria-pressed="${l === lang}" title="${LANG_NAMES[l]}">${LANG_LABELS[l]}</button>`
  ).join('');

  el.innerHTML = `
    <button class="ctrl-btn" id="theme-toggle" aria-label="Toggle theme">${themeIcon(theme)}</button>
    <div class="lang-switcher" role="group" aria-label="Select language">${langBtns}</div>
  `;

  el.querySelector('#theme-toggle').addEventListener('click', () => {
    const next = toggleTheme();
    el.querySelector('#theme-toggle').innerHTML = themeIcon(next);
  });

  el.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const l = btn.dataset.lang;
      saveLang(l);
      updateContent(l);
    });
  });
}

export function updateContent(lang) {
  const tr = t(lang);
  const vcfUrl = BASE_URL + tr.vcf;

  document.getElementById('profile-title').textContent = tr.title;
  document.getElementById('profile-summary').textContent = tr.summary;
  document.getElementById('save-label').textContent = tr.save;
  document.getElementById('mobile-save-label').textContent = tr.save;

  const qrLabel = document.getElementById('qr-scan-label');
  if (qrLabel) qrLabel.textContent = tr.scan;

  const dSave = document.getElementById('desktop-save');
  const mSave = document.getElementById('mobile-save');
  if (dSave) { dSave.href = vcfUrl; dSave.download = tr.vcf; }
  if (mSave) { mSave.href = vcfUrl; mSave.download = tr.vcf; }

  renderQr(vcfUrl);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  const htmlLang = lang.startsWith('zh') ? lang : lang.split('-')[0];
  document.documentElement.lang = htmlLang;
}

export function renderLinks(profile) {
  const { personalUrl, linkedin, github, instagram } = profile;
  const items = [
    { label: 'tolgapol.com', href: personalUrl, icon: 'website' },
    { label: 'LinkedIn', href: `https://linkedin.com/in/${linkedin}`, icon: 'linkedin' },
    { label: 'GitHub', href: `https://github.com/${github}`, icon: 'github' },
    { label: 'Instagram', href: `https://instagram.com/${instagram}`, icon: 'instagram' },
  ];
  const nav = document.getElementById('quick-links');
  if (!nav) return;
  nav.innerHTML = items.map(({ label, href, icon }) =>
    `<a class="quick-link" href="${href}" aria-label="${label}" title="${label}" target="_blank" rel="noopener noreferrer">${SVG[icon]}<span>${label}</span></a>`
  ).join('');
}
