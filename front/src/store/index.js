import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      username: '',
      password: '',
    },
    users: [],
  },
  getters: {
    user: (state) => state.user,
    users: (state) => state.users,
  },
  mutations: {
    FILL_USER(state, user) {
      state.user = user;
    },
    FILL_USERS(state, users) {
      state.users = users;
    },
  },
  actions: {
    fillUser(ctx, user) {
      ctx.commit('FILL_USER', user);
    },
    fillUsers(ctx, users) {
      ctx.commit('FILL_USERS', users);
    },
  },
  modules: {
  },
});
