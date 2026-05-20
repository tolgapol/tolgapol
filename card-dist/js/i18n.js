import { LANGUAGES } from './data.js';

const KEY = 'tp-lang';

const MAP = {
  en: 'en', 'en-US': 'en', 'en-GB': 'en', 'en-AU': 'en', 'en-CA': 'en',
  tr: 'tr', 'tr-TR': 'tr',
  es: 'es', 'es-ES': 'es', 'es-MX': 'es', 'es-AR': 'es', 'es-CO': 'es',
  de: 'de', 'de-DE': 'de', 'de-AT': 'de', 'de-CH': 'de',
  fr: 'fr', 'fr-FR': 'fr', 'fr-BE': 'fr', 'fr-CA': 'fr', 'fr-CH': 'fr',
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
    if (MAP[base]) return MAP[base];
  }
  return 'en';
}

export function saveLang(lang) {
  localStorage.setItem(KEY, lang);
}
