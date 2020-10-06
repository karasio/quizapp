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
      'points',
      'categories',
    ]),
  },
  data() {
    return {
    };
  },
  mounted() {
    this.getUsers();
    this.getCategories();
  },
  methods: {
    async getUsers() {
      const users = await userService.getAll();
      this.fillUsers(users);
    },
    async getCategories() {
      // https://opentdb.com/api_category.php
      const requestOptions = {
        method: 'GET',
        redirect: 'manual',
      };

      fetch('https://opentdb.com/api_category.php', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.fillCategories(result.trivia_categories);
        })
        .catch((error) => console.log('error', error));
    },
    ...mapActions([
      'fillUser',
      'fillUsers',
      'toggleGameOn',
      'fillCategories',
    ]),
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
  width: 100%;
  left: 50%;
  right: 50%;
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
