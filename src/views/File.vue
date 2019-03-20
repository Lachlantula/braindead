<template>
  <div class="file">
    <ScriptName name="Greeting script"/>
    <Editor/>
    <Tip/>
  </div>
</template>

<script>
// @ is an alias to /src
import ScriptName from "@/components/ScriptName.vue";
import Editor from "@/components/Editor.vue";
import Tip from "@/components/Tip.vue";

export default {
  name: "file",
  components: {
    ScriptName,
    Editor,
    Tip
  }
};
</script>

<style lang="scss" scoped>
.file {
  padding-top: 10vh;
  padding-left: 10vw;
}
</style>

