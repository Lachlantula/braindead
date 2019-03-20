<template>
  <article class="tip" :class="this.$store.getters.checkIfEditingFileName">
    <h1 class="headline">SUGGESTION</h1>
    <p class="description">
      It's easy to get carried away with titles, but remember that concise titles are
      not only easier to read, they're easier to understand!
    </p>
  </article>
</template>

<script>
export default {
  name: "Tip",
  props: {
    name: String
  }
};
</script>

<style scoped lang="scss">
.tip {
  position: absolute;
  top: 10vh;
  width: 20vw;
  height: 15vh;
  padding: 25px;
  background: hsl(180, 80%, 80%);
  transition: right 0.5s ease-in-out;
}
.is-editing {
  right: 2vw;
}
.not-editing {
  right: -40vw;
}
.headline {
  color: hsl(190, 91%, 15%);
  font-size: 1.5rem;
}
.description {
  color: hsl(190, 70%, 30%);
  font-size: 1rem;
  line-height: 1.7;
  text-align: justify;
  font-weight: bold;
}
</style>
