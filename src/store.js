import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    backgroundState: "not-running",
    editingFileName: false
  },
  mutations: {
    updateBackgroundState(state, source) {
      if (source === "stopping") {
        state.backgroundState = "not-running";
      } else if (source === "editing") {
        state.backgroundState = "is-editing";
      } else if (source === "running") {
        state.backgroundState = "is-running";
      }
    },
    updateEditingFileName(state) {
      state.editingFileName = !state.editingFileName;
    }
  },
  getters: {
    checkBackgroundState: state => state.backgroundState,
    checkIfEditingFileName: state => {
      if (state.editingFileName) {
        return "is-editing";
      } else {
        return "not-editing";
      }
    }
  }
});
