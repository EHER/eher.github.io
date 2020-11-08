new Vue({
  el: '#nescss',
  data() {
    return {
      scrollPos: 0,
    };
  },
  mounted() {
    document.addEventListener('scroll', () => {
      this.scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    });
  },
});

