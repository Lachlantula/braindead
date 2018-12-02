<template>
  <div id="saves">
    <section>
      <h1>Saves</h1>
    </section>
    <div class="dark">
      <section>
        <p><strong>Default Output Export Location</strong></p>
        <button @click="clickExportInput()">Choose a folder...</button>
        <input type="file" webkitdirectory id="outputExportPicker" @change="updateExportLocation();save();" />
        <p id="exportLocation">Current: {{ exportLocation }}</p>
      </section>
      <section>
        <p id="footerText">Changes automatically save.</p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pref-saves',
  data() {
    return {
      inputAutosave: false,
      outputAutosave: false,
      exportLocation: 'TO_CREATE',
    };
  },
  components: {},
  methods: {
    save() {
      const Store = require('electron-store');
      const store = new Store();
      store.set('exportLocation', this.exportLocation);
    },
    clickExportInput() {
      document.getElementById('outputExportPicker').click();
    },
    updateExportLocation() {
      this.exportLocation = document.getElementById('outputExportPicker').files[0].path;
    },
  },
  mounted() {
    const Store = require('electron-store');
    const store = new Store();

    this.exportLocation = store.get('exportLocation');

    if (this.exportLocation === 'TO_CREATE') {
      const os = require('os');
      const jetpack = require('fs-jetpack');
      const braindeadDir = `${os.homedir}/Braindead`;
      if (!jetpack.exists(braindeadDir)) {
        jetpack.dir(braindeadDir);
      }
      this.exportLocation = braindeadDir;
      store.set('exportLocation', this.exportLocation);
    }
  },
};
</script>

<style scoped>
#saves {
  height: 100%;
  display: flex;
  flex-direction: column;
}
p,
h1,
span {
  color: #4f65ad;
}
h1 {
  margin: 0;
}
p {
  font-size: 1.1rem;
}
input[type='checkbox'] {
  -webkit-appearance: none;
  padding: 10px;
  background: #7a82ab;
  /* outline: #4f65ad 2px solid; */
  transition: all 0.2s linear;
  display: inline-block;
}
input[type='checkbox']:checked {
  background: #68b79b;
}
input[type='checkbox']:focus {
  /* outline: #333 2px solid; */
  outline: none;
}
input[type='file'] {
  display: none;
}
.check {
  display: flex;
  align-items: center;
}
.check span {
  margin-left: 5px;
}
section {
  padding: 20px;
}
section p {
  margin-top: 0;
}
.dark section {
  padding-bottom: 0;
}
.dark {
  background: #333;
  flex: 1;
}
.dark p,
span {
  color: #c6d4ff;
}
#footerText {
  font-size: 0.7rem;
  color: #7a82ab;
}
button {
  border: none;
  background: #4f65ad;
  color: #c6d4ff;
  font-family: 'Merriweather', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 10px;
  font-size: 0.8rem;
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
#exportLocation {
  margin-top: 20px;
  margin-bottom: 0;
  font-size: 0.9rem;
}
</style>