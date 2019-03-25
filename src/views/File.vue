<template>
  <div class="file">
    <ScriptName name="Greeting script"/>
    <Editor/>
    <NotificationContainer/>
  </div>
</template>

<script>
// @ is an alias to /src
import ScriptName from "@/components/ScriptName.vue";
import Editor from "@/components/Editor.vue";
import NotificationContainer from "@/components/NotificationContainer.vue";

export default {
  name: "File",
  components: {
    ScriptName,
    Editor,
    NotificationContainer
  }
};
</script>

<style lang="scss" scoped>
.file {
  padding-top: 10vh;
  padding-left: 10vw;
}
</style>

