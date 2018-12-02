<template>
  <div id="languages">
    <section>
      <h1>Languages</h1>
    </section>
    <div class="dark">
      <!--
      <section>
        <p><strong>Toggle Language Output</strong></p>
        <div class="check">
          <input id="pythonCheck" type="checkbox" v-model="pythonOutput" @change="save">
          <span>Python</span>
        </div>
        <div class="check">
          <input id="javascriptCheck" type="checkbox" v-model="javascriptOutput" @change="save">
          <span>JavaScript</span>
        </div>
        <div class="check">
          <input id="swiftCheck" type="checkbox" v-model="swiftOutput" @change="save">
          <span>Swift</span>
        </div>
      </section>
      -->
      <section>
        <p><strong>Pseudocode Output Format</strong></p>
        <div class="check" v-for="output in pseudoOutputs">
          <input :id="output" type="radio" name="pseudoOutput" :value="output" v-model="pseudoOutput" @change="save">
          <span>{{ output }}</span>
        </div>
      </section>
      <section>
        <p id="footerText">Changes automatically save.</p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pref-languages',
  data() {
    return {
      pythonOutput: true,
      javascriptOutput: true,
      swiftOutput: true,
      pseudoOutput: 'Braindead Export (.brnde)',
      pseudoOutputs: ['Braindead Export (.brnde)', 'Text File (.txt)', 'Plain Text (No Extension)'],
    };
  },
  components: {},
  methods: {
    save() {
      const Store = require('electron-store');
      const store = new Store();
      /*
      store.set('languages', {
        python: this.pythonOutput,
        javascript: this.javascriptOutput,
        swift: this.swiftOutput,
      });
      */
      store.set('pseudoOutput', this.pseudoOutput);
    },
  },
  mounted() {
    const Store = require('electron-store');
    const store = new Store();

    this.pseudoOutput = store.get('pseudoOutput');
    /*
    const langExports = store.get('languages');
    Object.keys(langExports).forEach((x) => {
      if (x === 'python') {
        this.pythonOutput = langExports[x];
      } else if (x === 'javascript') {
        this.javascriptOutput = langExports[x];
      } else {
        this.swiftOutput = langExports[x];
      }
    });
    */
  },
};
</script>

<style scoped>
#languages {
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
input[type='checkbox'],
input[type='radio'] {
  -webkit-appearance: none;
  padding: 10px;
  background: #7a82ab;
  /* outline: #4f65ad 2px solid; */
  transition: all 0.2s linear;
  display: inline-block;
}
input[type='checkbox']:checked,
input[type='radio']:checked {
  background: #68b79b;
}
input[type='checkbox']:focus,
input[type='radio']:focus {
  /* outline: #333 2px solid; */
  outline: none;
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
</style>