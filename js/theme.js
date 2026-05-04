/* =============================================
   GAME HUB — THEME.JS
   Dark/Light mode toggle with localStorage
   ============================================= */

const THEME_KEY = 'gamehub_theme';

const ThemeManager = {
  current: 'dark',

  init() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.current = saved || (prefersDark ? 'dark' : 'light');
    this.apply(this.current, false);
    this.bindToggle();
  },

  apply(theme, animate = true) {
    this.current = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.querySelector('.theme-icon').textContent = theme === 'dark' ? '◑' : '◐';
      btn.setAttribute('title', theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre');
    }

    if (animate) {
      document.body.classList.add('theme-transitioning');
      setTimeout(() => document.body.classList.remove('theme-transitioning'), 400);
    }
  },

  toggle() {
    const next = this.current === 'dark' ? 'light' : 'dark';
    this.apply(next);
    showToast(next === 'dark' ? '🌙 Mode sombre activé' : '☀️ Mode clair activé');
  },

  bindToggle() {
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', () => this.toggle());

    // Keyboard shortcut T
    document.addEventListener('keydown', (e) => {
      if (e.key === 't' && !e.target.closest('input, textarea')) {
        this.toggle();
      }
    });
  }
};
