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
      console.log(`TOOGLE_GAMEON kutsuttu ${state.gameOn}`);
      if (state.gameOn === false) {
        console.log('gameon == false');
        console.log(state.points, state.user.highScore);
        if (state.points > state.user.highScore) {
          console.log('points > highScore');
          state.user.highScore = state.points;
          userService.update(state.user.id, state.user);
          userService.getAll().then(
            // eslint-disable-next-line no-return-assign
            (response) => state.users = response,
          );
        }
      }
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
