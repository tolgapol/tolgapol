import { detectLang } from './i18n.js';
import { detectTheme, applyTheme } from './theme.js';
import { setupControls, updateContent } from './render.js';

const theme = detectTheme();
applyTheme(theme);

const lang = detectLang();

setupControls(lang, theme);
updateContent(lang);
