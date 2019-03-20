<template>
  <h1 class="script-name">
    <span class="hash">#</span>
    <span
      class="name"
      contenteditable="true"
      @focus="$store.commit('updateEditingFileName')"
      @blur="$store.commit('updateEditingFileName')"
    >{{ name }}</span>
  </h1>
</template>

<script>
export default {
  name: "ScriptName",
  props: {
    name: String
  }
};
</script>

<style scoped lang="scss">
.script-name {
  color: hsl(190, 91%, 25%);
  margin: 0;
  font-weight: 900;
  width: 70vw;
  .hash {
    color: hsl(185, 65%, 70%);
    font-size: 2.5rem;
    margin-right: 10px;
  }
  .name {
    transition: all 0.2s linear;
    font-size: 3rem;
    &:focus {
      outline: none;
      background: hsl(180, 40%, 90%);
      font-size: 5rem;
    }
  }
}
</style>
