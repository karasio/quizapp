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
    gameOn: true,
    points: 0,
  },
  getters: {
    user: (state) => state.user,
    users: (state) => state.users,
    gameOn: (state) => state.gameOn,
    points: (state) => state.points,
  },
  mutations: {
    FILL_USER(state, user) {
      state.user = user;
    },
    FILL_USERS(state, users) {
      state.users = users;
    },
    TOGGLE_GAMEON(state, gameOn) {
      state.gameOn = gameOn;
    },
    INCREMENT_POINTS(state, n) {
      state.points += n;
    },
    RESET_POINTS(state) {
      state.points = 0;
    },
  },
  actions: {
    fillUser(ctx, user) {
      ctx.commit('FILL_USER', user);
    },
    fillUsers(ctx, users) {
      ctx.commit('FILL_USERS', users);
    },
    toggleGameOn(ctx, gameOn) {
      ctx.commit('TOGGLE_GAMEON', gameOn);
    },
  },
  modules: {
  },
});
