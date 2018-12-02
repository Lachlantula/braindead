<template>
  <div id="preferences">
    <div id="grid">
      <div id="left">
        <div id="list">
          <div class="codeSection">
            <h3>Preferences</h3>
            <ul>
              <router-link tag="li" to="/preferences"><i class="fas fa-palette"></i> Theming</router-link>
              <router-link tag="li" to="/preferences/typography"><i class="fas fa-font"></i> Typography</router-link>
              <router-link tag="li" to="/preferences/saves"><i class="fas fa-folder"></i> Saves</router-link>
              <router-link tag="li" to="/preferences/languages"><i class="fas fa-language"></i> Languages</router-link>
              <router-link tag="li" to="/preferences/developers"><i class="fas fa-code"></i> Developers</router-link>
            </ul>
          </div>
        </div>
        <div id="options">
          <router-link tag="button" to="/editor" id="editor">Return...</router-link>
        </div>
      </div>
      <div id="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'preferences',
  data() {
    return {
    };
  },
  components: {},
  methods: {},
};
</script>

<style scoped>
#preferences {
  height: calc(100% - 40px);
}
#grid {
  width: 100%;
  display: grid;
  height: 100%;
  grid-template-columns: 0.7fr 1fr;
}
#list {
  background: #4f65ad;
  color: #c6d4ff;
  height: calc(90% - 40px);
  padding-top: 20px;
  padding-bottom: 20px;
}
#list h3 {
  margin: 0;
}
#options {
  height: 10%;
  display: flex;
  background: #4f65ad;
}
#options button {
  height: 100%;
}
button {
  border: none;
  background: #4f65ad;
  color: #c6d4ff;
  font-family: 'Merriweather', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 10px;
  font-size: 1rem;
  transition: all 0.2s linear;
}
button:focus,
button:hover {
  outline: none;
  color: #4f65ad;
  background: #c6d4ff;
  font-family: 'Merriweather', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
button:hover {
  cursor: pointer;
}
#right {
  background: #c6d4ff;
  height: 100%;
}
.codeItem {
  background: #4f65ad;
  color: #c6d4ff;
  margin: 20px;
  padding: 10px;
  font-family: 'Inconsolata', monospace;
}
.codeItem input[type='text'] {
  background: #c6d4ff;
  color: #4f65ad;
  font-family: 'Merriweather', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  border: none;
  padding: 5px;
  transition: padding 0.2s linear;
}
.codeItem input[type='text']:focus {
  outline: none;
  padding: 7px;
}
.codeItem input[type='text']::selection {
  background: #7a82ab;
  color: #c6d4ff;
}
.codeSection {
  margin-left: 20px;
}
.codeSection ul {
  list-style-type: none;
  padding-left: 10px;
}
.codeSection li {
  display: table;
  background: #c6d4ff;
  color: #4f65ad;
  padding: 5px;
  margin-bottom: 5px;
}
.codeSection li:hover {
  cursor: pointer;
}
h3 {
  font-size: 1.3rem;
  margin-bottom: 0;
}
</style>
