const STORAGE_KEY = 'theme';

export function getEffectiveTheme(storedTheme, systemPrefersDark) {
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }
  return systemPrefersDark ? 'dark' : 'light';
}

export function getNextTheme(effectiveTheme) {
  return effectiveTheme === 'dark' ? 'light' : 'dark';
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

export function initThemeToggle(buttonEl) {
  const systemQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const updateLabel = (theme) => {
    buttonEl.setAttribute('aria-label', theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre');
  };

  const currentTheme = () => document.documentElement.getAttribute('data-theme')
    || getEffectiveTheme(localStorage.getItem(STORAGE_KEY), systemQuery.matches);

  buttonEl.addEventListener('click', () => {
    const next = getNextTheme(currentTheme());
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    updateLabel(next);
  });

  systemQuery.addEventListener('change', (event) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const next = event.matches ? 'dark' : 'light';
      applyTheme(next);
      updateLabel(next);
    }
  });

  updateLabel(currentTheme());
}
