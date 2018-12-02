<template>
  <div id="developers">
    <section>
      <h1>Developers</h1>
    </section>
    <div class="dark">
      <section>
        <p><strong>Enable Hidden Areas</strong></p>
        <div class="check">
          <input id="addCheck" type="checkbox" v-model="addOption" @change="save">
          <span>Block Programming</span>
        </div>
        <div class="check">
          <input id="msdCheck" type="checkbox" v-model="msdOption" @change="save">
          <span>Manual Synonym Detection (MSD)</span>
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
  name: 'pref-developers',
  data() {
    return {
      addOption: false,
      msdOption: false,
    };
  },
  components: {},
  methods: {
    save() {
      const Store = require('electron-store');
      const store = new Store();
      store.set('addOption', this.addOption);
      store.set('msdOption', this.msdOption);
    },
  },
  mounted() {
    const Store = require('electron-store');
    const store = new Store();

    this.addOption = store.get('addOption');
    this.msdOption = store.get('msdOption');
  },
};
</script>

<style scoped>
#developers {
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