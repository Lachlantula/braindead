<template>
  <div class="codeItem">
    <!-- Colour strip, represents type -->
    <div :class="attr.type" class="strip"></div>
    <!-- Types of item -->
    <div v-if="attr.type === 'iterate'" class="innerCodeItem">
      <!-- For loops -->
      for <input type="text" placeholder="4" /> in <input type="text" placeholder="6" /> ...
    </div>
    <div v-else-if="attr.type === 'say'" class="innerCodeItem">
      <!-- Printing -->
      say <input type="text" placeholder="Hello World!" />
    </div>
    <div v-else-if="attr.type === 'variable'" class="innerCodeItem">
      <!-- Setting variables -->
      set <input type="text" placeholder="x" /> to <input type="text" placeholder="y" />
    </div>
    <div v-else-if="attr.type === 'infinite'" class="innerCodeItem">
      <!-- Loop - by default forever -->
      loop <input type="text" v-model="foreverLoopTimes" /> <span v-if="foreverLoopTimes !== 'forever'">times</span> ...
    </div>
    <div v-else-if="attr.type === 'iterate2'" class="innerCodeItem">
      <!-- Loop - by default 5 times -->
      loop <input type="text" v-model="otherLoopTimes" /> <span v-if="otherLoopTimes !== 'forever'">times</span> ...
    </div>
    <div v-else-if="attr.type === 'end'" class="innerCodeItem">
      <!-- End loop -->
      end
    </div>
  </div>
</template>

<script>
export default {
  name: 'codeItem',
  props: ['attr'],
  data() {
    return {
      /* Remember: there is no interference if there are multiple loops using these variable
         as components keep their own data to themselves */
      foreverLoopTimes: 'forever',
      otherLoopTimes: 5,
    };
  },
};
</script>

<style scoped>
.codeItem {
  background: #4f65ad;
  color: #c6d4ff;
  margin: 10px;
  margin-top: 0px;
  font-family: 'Inconsolata', monospace;
  display: grid;
  grid-template-columns: 0.01fr 1fr;
  grid-gap: 10px;
}
.codeItem input[type='text'] {
  background: #c6d4ff;
  color: #4f65ad;
  font-family: 'Merriweather', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  border: none;
  padding: 5px;
  transition: all 0.2s linear;
}
.codeItem input[type='text']::-webkit-input-placeholder {
  color: #7a82ab;
}
.codeItem input[type='text']:focus {
  outline: none;
  background: #7a82ab;
  color: #efefef;
}
.codeItem input[type='text']::selection {
  background: #7a82ab;
  color: #c6d4ff;
}
.innerCodeItem {
  padding: 10px;
  padding-left: 0px;
}
.strip {
  padding: 5px;
}
.iterate,
.infinite,
.iterate2,
.end {
  background: #fff9a2;
}
.say {
  background: #f8aaff;
}
.variable {
  background: #8fffb4;
}
</style>
