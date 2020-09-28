<template>
  <div class="row">
    <div v-if="this.localUser.name === '' ">
      <form @submit.prevent="handleLogin">
        <label class="col-md-2" for="username">username</label>
        <input
          class="col-md-3"
          id="username"
          type="text"
          ref="username"
          v-model="username"
        />
        <label for="password" class="col-md-2">password</label>
        <input
          class="col-md-3"
          id="password"
          type="password"
          ref="password"
          v-model="password"
        />
        <button class="col-md-2">Log in</button>
      </form>
    </div>
    <div v-else>
      <h3 >Hello {{ localUser.name }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  mounted() {
    this.checkUser();
  },
  data() {
    return {
      username: null,
      password: null,
      localUser: {},
    };
  },
  methods: {
    handleLogin() {
      const temp = {
        name: this.username,
        password: this.password,
      };
      console.log(temp);
      this.$store.commit('FILL_USER', temp);
      this.username = '';
      this.password = '';
      console.log(this.$store.getters.user);
      this.localUser = this.$store.getters.user;
    },
    checkUser() {
      this.localUser = this.$store.getters.user;
      console.log('this from mounted', this.localUser);
      console.log('this.localUser.name', this.localUser.name);
    },
  },
};

</script>

<style>

</style>
