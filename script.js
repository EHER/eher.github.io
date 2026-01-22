const header = document.getElementById('site-header');
const themeToggle = document.querySelector('.theme-toggle input[type="checkbox"]');
const stickyOffset = 50;

const applyThemeOverride = (theme) => {
  if (theme === 'dark' || theme === 'light') {
    document.body.setAttribute('data-theme', theme);
    updateThemeToggle(theme);
    return;
  }
  document.body.removeAttribute('data-theme');
  updateThemeToggle(getPreferredTheme());
};

const getPreferredTheme = () => {
  if (document.body.getAttribute('data-theme') === 'dark') {
    return 'dark';
  }
  if (document.body.getAttribute('data-theme') === 'light') {
    return 'light';
  }
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

const updateThemeToggle = (theme) => {
  if (!themeToggle) {
    return;
  }
  themeToggle.checked = theme === 'dark';
};

const toggleThemeOverride = () => {
  const current = document.body.getAttribute('data-theme');
  if (current === 'dark') {
    applyThemeOverride('light');
    return;
  }
  if (current === 'light') {
    applyThemeOverride('dark');
    return;
  }
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyThemeOverride(prefersDark ? 'light' : 'dark');
};

const updateStickyHeader = () => {
  if (!header) {
    return;
  }
  const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
  header.classList.toggle('sticky', scrollPos > stickyOffset);
};

const onThemeKeydown = (event) => {
  if (event.defaultPrevented) {
    return;
  }
  if (event.key && event.key.toLowerCase() === 't' && !event.ctrlKey && !event.metaKey && !event.altKey) {
    toggleThemeOverride();
  }
};

const setupFallbackLink = (selector, dataKey) => {
  const links = document.querySelectorAll(selector);
  if (!links.length) {
    return;
  }
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const fallbackUrl = link.dataset[dataKey];
      if (!fallbackUrl) {
        return;
      }
      event.preventDefault();
      let shouldFallback = true;
      const cancelFallback = () => {
        shouldFallback = false;
      };
      window.addEventListener('blur', cancelFallback, { once: true });
      document.addEventListener('visibilitychange', cancelFallback, { once: true });
      window.location.href = link.href;
      window.setTimeout(() => {
        if (shouldFallback) {
          window.location.href = fallbackUrl;
        }
      }, 700);
    });
  });
};

document.addEventListener('scroll', updateStickyHeader);
document.addEventListener('keydown', onThemeKeydown);
if (themeToggle) {
  themeToggle.addEventListener('change', () => {
    applyThemeOverride(themeToggle.checked ? 'dark' : 'light');
  });
}
updateStickyHeader();
updateThemeToggle(getPreferredTheme());
setupFallbackLink('[data-xmpp-fallback]', 'xmppFallback');
setupFallbackLink('[data-irc-fallback]', 'ircFallback');
