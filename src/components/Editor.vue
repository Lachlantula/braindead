<template>
  <textarea
    class="editor"
    contenteditable="true"
    @focus="$store.commit('updateBackgroundState', 'editing')"
    @blur="$store.commit('updateBackgroundState', 'stopping')"
    placeholder="Say Hello World!"
  ></textarea>
</template>

<script>
export default {
  name: "Editor"
};
</script>

<style scoped lang="scss">
.editor {
  // Due to clean.
  border: none;
  resize: none;
  border-bottom: 0px hsl(0, 42%, 90%) solid;
  padding-top: 2vh;
  width: 50vw;
  transition: border-bottom 0.2s linear;
  padding-bottom: 2vh;
  color: hsl(190, 70%, 40%);
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 2.5;
  height: 75vh;
  margin: 0;
  background: none;
  font-family: "Objektiv Mk1", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &:focus {
    outline: none;
    border-bottom: 10px hsl(0, 42%, 90%) solid;
  }
}
</style>
