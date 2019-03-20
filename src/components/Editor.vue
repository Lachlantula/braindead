<template>
  <main
    class="editor"
    contenteditable="true"
    @focus="$store.commit('updateBackgroundState', 'editing')"
    @blur="$store.commit('updateBackgroundState', 'stopping')"
  >
    <p class="line">Set phrase to Hello World!</p>
  </main>
</template>

<script>
export default {
  name: "Editor"
};
</script>

<style scoped lang="scss">
.editor {
  border-bottom: 0px hsl(0, 42%, 90%) solid;
  margin-top: 2vh;
  width: 50vw;
  transition: border-bottom 0.2s linear;
  padding-bottom: 2vh;
  &:focus {
    outline: none;
    border-bottom: 10px hsl(0, 42%, 90%) solid;
  }
  .line {
    color: hsl(190, 70%, 40%);
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 2.5;
    margin: 0;
  }
}
</style>
