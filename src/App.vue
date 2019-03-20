<template>
  <div id="app" :class="this.$store.getters.checkBackgroundState">
    <router-view/>
  </div>
</template>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}
#app {
  transition: background 0.2s linear;
  font-family: "Objektiv Mk1", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  margin: 0;
}
.is-running {
  background: hsl(155, 80%, 80%);
}
.not-running {
  background: hsl(180, 41%, 95%);
}
.is-editing {
  background: hsl(180, 40%, 90%);
}
</style>
