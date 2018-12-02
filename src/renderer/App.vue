<template>
  <div id="main">
    <nav>
      <div id="logo">
        <p>Braindead</p>
      </div>
      <div id="settingsContainer">
        <router-link tag="i" class="fas fa-cog" to="/preferences" @click.native="dimNav"></router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'braindead',
  // On component load
  mounted() {
    // IPC for routing from main process
    this.$electron.ipcRenderer.on('redir', (e, route) => { // when signal is received...
      this.$router.push(route); // ...reroute!
    });
    // Dimming nav from main process
    this.$electron.ipcRenderer.on('dimNav', () => {
      this.dimNav();
    });
  },
  methods: {
    dimNav: () => {
      // Update styling
      document.querySelector('nav').style.background = '#333';
      document.querySelector('nav p').style.color = '#c6d4ff';
      document.querySelector('nav i').style.color = '#c6d4ff';
    },
  },
};
</script>

<style>
@import url('assets/fonts/Font Awesome/fontawesome-all.min.css');

@font-face {
  font-family: 'Merriweather';
  src: url('assets/fonts/Merriweather/Merriweather-Regular.ttf')
    format('truetype');
}
@font-face {
  font-family: 'Oswald';
  src: url('assets/fonts/Oswald/Oswald-Regular.ttf') format('truetype');
}
@font-face {
  font-family: 'Inconsolata';
  src: url('assets/fonts/Inconsolata/Inconsolata-Regular.ttf')
    format('truetype');
}

html,
body,
#main {
  height: 100%;
  margin: 0;
  font-family: 'Merriweather', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  cursor: default;
}
body {
  background: #7a82ab;
  user-select: none;
}
nav {
  height: 40px;
  background: #c6d4ff;
  -webkit-app-region: drag;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Oswald', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  transition: all 0.2s linear;
}
h1 {
  color: #fff;
}
p {
  color: #efefef;
}
#logo {
  width: 100%;
  text-align: center;
}
#logo p {
  color: #333;
}
#settingsContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
}
#settingsContainer i {
  margin-left: auto;
  margin-right: 10px;
  color: #333;
}
#settingsContainer i:hover {
  cursor: pointer;
  color: #4f65ad;
}
</style>
