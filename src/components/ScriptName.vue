<template>
  <h1 class="script-name">
    <span class="hash">#</span>
    <span
      class="name"
      contenteditable="true"
      @focus="updateFileNameProcedures"
      @keydown="checkFileNameLength"
      @blur="$store.commit('updateEditingFileName')"
      @keydown.enter.prevent
    >{{ name }}</span>
  </h1>
</template>

<script>
export default {
  name: "ScriptName",
  props: {
    name: String
  },
  data() {
    return {
      nameData: name,
      lengthPing: false
    };
  },
  methods: {
    updateFileNameProcedures() {
      this.$store.commit("updateEditingFileName");
    },
    checkFileNameLength() {
      this.nameData = document.querySelector(".name").innerHTML;
      const fileNameLength = this.nameData.length;
      if (fileNameLength > 20 && !this.lengthPing) {
        this.lengthPing = true;
        this.$store.commit("pingNotification", {
          emoji: "👩‍🏫",
          title: "TITLE RULE",
          description:
            "Your title is quite long; you should make it shorter so that it's easier to read!"
        });
      } else if (fileNameLength <= 40 && !this.lengthPing) {
        this.lengthPing = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.script-name {
  color: hsl(190, 91%, 25%);
  margin: 0;
  font-weight: 900;
  width: 60vw;
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
      &::selection {
        background: hsl(190, 91%, 25%);
        color: hsl(180, 40%, 90%);
      }
    }
  }
}
</style>
