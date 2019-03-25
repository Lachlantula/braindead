<template>
  <div id="app" :class="this.$store.getters.checkBackgroundState">
    <div class="title-bar">
      <h1 class="title">Braindead</h1>
    </div>
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
.title-bar {
  background: hsl(190, 91%, 25%);
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-app-region: drag;
  user-select: none;
  .title {
    color: hsl(180, 29%, 72%);
    margin: 0;
    font-size: 12px;
    font-weight: black;
  }
}
</style>
