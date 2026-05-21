import { PROFILE, BASE_URL, t } from './data.js';
import { saveLang } from './i18n.js';
import { toggleTheme } from './theme.js';
import { renderQr } from './qr.js';

const SVG = {
  moon:      `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`,
  sun:       `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`,
  linkedin:  `<path d="M8 11v7"/><path d="M8 8v.01"/><path d="M12 18v-7"/><path d="M12 14.5c0-2 1.2-3.5 3-3.5s3 1.2 3 3.5V18"/><path d="M5 4h14v16H5z"/>`,
  email:     `<path d="M4 5h16v14H4z"/><path d="m4 7 8 6 8-6"/>`,
  globe:     `<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/>`,
  instagram: `<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.2"/><path d="M17 7.2v.01"/>`,
};

function ic(name) {
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${SVG[name]}</svg>`;
}

const FADE_IDS = ['profile-title', 'profile-location', 'profile-summary',
                  'mobile-save-label', 'qr-scan-label', 'quick-links'];

const ANIM_OPTS = { duration: 150, easing: 'ease', fill: 'forwards' };

function langFade(nodes, cb) {
  const outs = nodes.map(n => n.animate([{ opacity: 1 }, { opacity: 0 }], ANIM_OPTS));
  Promise.all(outs.map(a => a.finished)).then(() => {
    cb();
    const ins = nodes.map(n => n.animate([{ opacity: 0 }, { opacity: 1 }], ANIM_OPTS));
    Promise.all(ins.map(a => a.finished)).then(() => ins.forEach(a => a.cancel()));
  });
}

export function setupControls(lang, theme) {
  const sel = document.getElementById('lang-select');
  if (sel) {
    sel.value = lang;
    sel.addEventListener('change', () => {
      const next = sel.value;
      saveLang(next);
      const nodes = FADE_IDS.map(id => document.getElementById(id)).filter(Boolean);
      langFade(nodes, () => updateContent(next));
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
    });
  }
}

function renderLinks(lang) {
  const tr = t(lang);
  const { linkedin, emailWork } = PROFILE;
  const items = [
    { label: tr.linkedin, href: `https://linkedin.com/in/${linkedin}`, icon: 'linkedin', external: true },
    { label: tr.email,    href: `mailto:${emailWork}`,                  icon: 'email',    external: false },
  ];
  const nav = document.getElementById('quick-links');
  if (!nav) return;
  nav.innerHTML = items.map(({ label, href, icon, external }) => {
    const attrs = external ? ` target="_blank" rel="noopener noreferrer"` : '';
    return `<a class="social-btn" href="${href}"${attrs} aria-label="${label}">${ic(icon)}${label}</a>`;
  }).join('');
}

export function updateContent(lang) {
  const tr = t(lang);
  const vcfUrl = BASE_URL + tr.vcf;

  const el = (id) => document.getElementById(id);
  const set = (id, val) => { const e = el(id); if (e) e.textContent = val; };

  set('profile-title',     tr.title);
  set('profile-location',  tr.location);
  set('profile-summary',   tr.summary);
  set('mobile-save-label', tr.save);
  set('qr-scan-label',     tr.scan);

  renderLinks(lang);

  const mSave = el('mobile-save');
  if (mSave) { mSave.href = vcfUrl; mSave.download = tr.vcf; }

  renderQr(vcfUrl);

  const sel = el('lang-select');
  if (sel && sel.value !== lang) sel.value = lang;

  document.documentElement.lang = lang.startsWith('zh') ? lang : lang.split('-')[0];
}
