const KEY = 'tp-theme';

export function detectTheme() {
  const saved = localStorage.getItem(KEY);
  if (saved === 'light' || saved === 'dark') return saved;

  const h = new Date().getHours();
  const isNight = h < 7 || h >= 18;
  const sysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return (isNight || sysDark) ? 'dark' : 'light';
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'light' ? '#fafafa' : '#09090b';
}

export function toggleTheme() {
  const current = document.documentElement.dataset.theme || 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem(KEY, next);
  return next;
}
