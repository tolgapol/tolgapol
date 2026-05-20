import { PROFILE } from './data.js';
import { detectLang } from './i18n.js';
import { detectTheme, applyTheme } from './theme.js';
import { buildControls, updateContent, renderLinks } from './render.js';

const theme = detectTheme();
applyTheme(theme);

const lang = detectLang();

renderLinks(PROFILE);
buildControls(lang, theme);
updateContent(lang);
