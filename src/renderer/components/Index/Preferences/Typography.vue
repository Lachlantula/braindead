<template>
  <div id="typography">
    <section>
      <h1>Typography</h1>
    </section>
    <div class="dark">
      <section>
        <p><strong>Coming soon.</strong></p>
        <p>Consider checking out the 'Saves' and 'Languages' preference menus.</p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pref-typography',
  data() {
    return {
    };
  },
  components: {},
  methods: {
  },
  mounted() {
  },
};
</script>

<style scoped>
#typography {
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