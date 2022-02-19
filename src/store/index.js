import { createStore } from 'vuex'

export default createStore({
  state: {
    captionVisible: false,
  },
  mutations: {
    setCaptionVisible (state, val) {
      state.captionVisible = val;
    },
  },
  actions: {
  },
  modules: {
  }
})
