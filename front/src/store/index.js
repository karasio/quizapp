import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      password: '',
    },
  },
  getters: {
    user: (state) => state.user,
  },
  mutations: {
    FILL_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    fillUser(ctx, user) {
      ctx.commit('FILL_USER', user);
    },
  },
  modules: {
  },
});
