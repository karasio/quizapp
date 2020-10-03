<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/highscores">Highscores</router-link> |
      <router-link to="/about">About</router-link>
      <LoginForm></LoginForm>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import userService from './services/users';
import LoginForm from './components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
  computed: {
    ...mapGetters([
      'user',
      'users',
      'gameOn',
    ]),
  },
  data() {
    return {
      methods: {
        ...mapActions([
          'fillUser',
          'fillUsers',
          'toggleGameOn',
        ]),
      },
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      const users = await userService.getAll();
      this.$store.commit('FILL_USERS', users);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 90%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
