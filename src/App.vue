<template>
  <div id="app">
    <TheNavBar v-if="showNavBar" />
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TheNavBar from '@/components/TheNavBar.vue';
import { auth } from './lib/firebase';

export default {
  mounted() {
    this.checkSession();
  },
  computed: {
    ...mapState(['showNavBar'])
  },
  components: {
    TheNavBar
  },
  methods: {
    checkSession() {
      auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.$store.dispatch('setUser', authUser);
        } else {
          this.$store.dispatch('setUser', null);
        }
      });
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
}

body {
  background-color: rgb(234, 237, 237);
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
</style>
