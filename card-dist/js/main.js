import { PROFILE } from './data.js';
import { detectLang } from './i18n.js';
import { detectTheme, applyTheme } from './theme.js';
import { setupControls, renderLinks, updateContent } from './render.js';

const theme = detectTheme();
applyTheme(theme);

const lang = detectLang();

renderLinks(PROFILE);
setupControls(lang, theme);
updateContent(lang);
