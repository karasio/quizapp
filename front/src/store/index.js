import Vue from 'vue';
import Vuex from 'vuex';
import userService from '../services/users';

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
    category: { id: 18, name: 'Science: Computers' },
    categories: [],
  },
  getters: {
    user: (state) => state.user,
    users: (state) => state.users,
    gameOn: (state) => state.gameOn,
    points: (state) => state.points,
    category: (state) => state.category,
    categories: (state) => state.categories,

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
      if (state.gameOn === false && state.points > state.user.highScore) {
        userService
          .update(state.user.id, { ...state.user, highScore: state.points })
          .then((response) => {
            state.user = response;
            userService.getAll()
              .then((res) => {
                state.users = res;
              });
          });
      }
    },
    INCREMENT_POINTS(state, n) {
      state.points += n;
    },
    RESET_POINTS(state) {
      state.points = 0;
    },
    FILL_CATEGORY(state, category) {
      state.category = category;
    },
    FILL_CATEGORIES(state, categories) {
      state.categories = categories;
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
    fillCategory(ctx, category) {
      ctx.commit('FILL_CATEGORY', category);
    },
    fillCategories(ctx, categories) {
      ctx.commit('FILL_CATEGORIES', categories);
    },
  },
  modules: {
  },
});
