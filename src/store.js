import Vue from "vue";
import Vuex from "vuex";
import { stat } from "fs-extra-p";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    backgroundState: "not-running",
    notificationsToPing: [],
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
    },
    pingNotification(state, { emoji, title, description }) {
      state.notificationsToPing.push({
        emoji: emoji,
        title: title,
        description: description
      });
    }
  },
  getters: {
    checkBackgroundState: state => state.backgroundState,
    checkIfNotificationPinged: state => {
      if (state.notificationsToPing) {
        return "is-pinging";
      } else {
        return "not-pinging";
      }
    },
    getNotifications: state => {
      return state.notificationsToPing;
    }
  }
});
