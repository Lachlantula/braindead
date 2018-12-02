const state = {
  pseudocode: '',
};

const mutations = {
  UPDATE_PSEUDO(state, val) {
    state.pseudocode = val;
  },
};

export default {
  state,
  mutations,
};
