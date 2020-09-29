<template>
  <div>
    <div v-if="this.localUser.username === ''  && !this.register">
      <form @submit.prevent="handleLogin">
        <input
          class="row-cols-md-3"
          id="username"
          type="text"
          ref="username"
          v-model="username"
          placeholder="username"
        />
        <input
          class="row-cols-md-3"
          id="password"
          type="password"
          ref="password"
          v-model="password"
          placeholder="password"
        />
        <button id="loginButton" class="row-cols-md-2">Log in</button>
      </form>
      <button
        id="registerButton"
        class="row-cols-md-2"
        v-on:click="registerButtonPressed"
      >Register</button>
    </div>
    <div v-else-if="this.register === true">
      <form @submit.prevent="handleRegister">
        <input
          class="row-cols-md-3"
          id="newUsername"
          type="text"
          ref="newUsername"
          v-model="newUsername"
          placeholder="username"
        />
        <input
          class="row-cols-md-3"
          v-model="newPassword"
          type="password"
          ref="newPassword"
          placeholder="password"
        />
        <input
          class="row-cols-md-3"
          v-model="newPasswordConfirm"
          type="password"
          ref="newPasswordConfirm"
          placeholder="confirm password"
          :class="{ 'has-error': submitting && passwordConfirmError }"
        />
        <button>Sign up</button>
        <p v-if="passwordError && submitting">Passwords don't match</p>
        <p v-if="!passwordError && submitting">Registration ok</p>
      </form>
    </div>
    <div v-else>
      <h3 >Hello {{ localUser.username }}</h3>
      <button v-on:click="handleLogout">Sign out</button>
    </div>
  </div>
</template>

<script>
import userService from '../services/users';
import loginService from '../services/login';

export default {
  name: 'LoginForm',
  mounted() {
    this.checkUser();
  },
  computed: {
    passwordConfirmError() {
      return this.newPassword !== this.newPasswordConfirm;
    },
  },
  data() {
    return {
      username: null,
      password: null,
      localUser: {},
      register: false,
      newUsername: null,
      newPassword: null,
      newPasswordConfirm: null,
      passwordError: false,
      submitting: false,
    };
  },
  methods: {
    async handleLogin() {
      const temp = {
        username: this.username,
        password: this.password,
      };

      try {
        const user = await loginService.login(temp);
        window.localStorage.setItem('loggedInUser', JSON.stringify(user));
        this.$store.commit('FILL_USER', user);
        userService.setToken(user.token);
        this.localUser = this.$store.getters.user;
        this.username = '';
        this.password = '';
      } catch (e) {
        console.log('Invalid username or password');
      }
    },
    checkUser() {
      const loggedInUser = window.localStorage.getItem('loggedInUser');
      console.log(window.localStorage.getItem('loggedInUser'));
      if (loggedInUser) {
        // check if client has stored user data
        this.localUser = JSON.parse(loggedInUser);
        this.$store.commit('FILL_USER', this.localUser);
      } else {
        // if no one is logged in, use empty user from store
        this.localUser = this.$store.getters.user;
      }
    },
    handleLogout() {
      this.localUser = {
        username: '',
        password: '',
      };
      this.$store.commit('FILL_USER', this.localUser);
      window.localStorage.clear();
    },
    registerButtonPressed() {
      console.log('trying to sign up');
      this.register = true;
    },
    handleRegister() {
      console.log('handle register');
      this.submitting = true;
      this.clearStatus();
      if (this.passwordConfirmError) {
        console.log('password error');
        this.passwordError = true;
        return;
      }

      this.error = false;
      this.success = true;
      this.submitting = false;
      this.register = false;
    },
    clearStatus() {
      this.success = false;
      this.error = false;
    },
  },
};

</script>

<style>

  form {
    width: 100%;
  }

</style>
