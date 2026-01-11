new Vue({
  el: '#nescss',
  data() {
    return {
      scrollPos: 0,
    };
  },
  methods: {
    applyThemeOverride(theme) {
      if (theme === 'dark' || theme === 'light') {
        document.body.setAttribute('data-theme', theme);
      } else {
        document.body.removeAttribute('data-theme');
      }
    },
    toggleThemeOverride() {
      const current = document.body.getAttribute('data-theme');
      if (current === 'dark') {
        this.applyThemeOverride('light');
        return;
      }
      if (current === 'light') {
        this.applyThemeOverride('dark');
        return;
      }
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.applyThemeOverride(prefersDark ? 'light' : 'dark');
    },
    onThemeKeydown(event) {
      if (event.defaultPrevented) {
        return;
      }
      if (event.key && event.key.toLowerCase() === 't' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        this.toggleThemeOverride();
      }
    },
  },
  mounted() {
    document.addEventListener('scroll', () => {
      this.scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    });
    document.addEventListener('keydown', this.onThemeKeydown);
  },
});
