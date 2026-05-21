import { LANGUAGES } from './data.js';

const KEY = 'tp-lang';

const MAP = {
  'zh-TW': 'zh-TW', 'zh-HK': 'zh-TW', 'zh-Hant': 'zh-TW',
  'zh-CN': 'zh-CN', zh: 'zh-CN', 'zh-Hans': 'zh-CN', 'zh-SG': 'zh-CN',
};

export function detectLang() {
  const saved = localStorage.getItem(KEY);
  if (saved && LANGUAGES.includes(saved)) return saved;
  const navLangs = navigator.languages?.length ? navigator.languages : [navigator.language || 'en'];
  for (const l of navLangs) {
    if (MAP[l]) return MAP[l];
    const base = l.split('-')[0];
    if (LANGUAGES.includes(base)) return base;
    if (MAP[base]) return MAP[base];
  }
  return 'en';
}

export function saveLang(lang) {
  localStorage.setItem(KEY, lang);
}
