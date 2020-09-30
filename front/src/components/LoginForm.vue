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
        <p v-if="passwordError && submitting">Passwords don't match / min length 8 characters</p>
        <p v-if="usernameError && submitting">Username taken / min length 3 characters</p>
        <p v-if="!passwordError && !usernameError && submitting">Registration ok</p>
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
      return this.newPassword !== this.newPasswordConfirm || this.newPassword.length < 8;
    },
    usernameTakenError() {
      let nameFree = false;
      this.$store.getters.users.forEach((user) => {
        if (user.username === this.newUsername) {
          nameFree = true;
        }
      });

      return nameFree || this.newUsername.length < 3;
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
      usernameError: false,
      submitting: false,
      success: true,
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
      this.$store.commit('TOGGLE_GAMEON', true);
    },
    registerButtonPressed() {
      this.register = true;
    },
    async handleRegister() {
      this.submitting = true;
      this.clearStatus();

      // check if username is available and if passwords match
      if (this.usernameTakenError) {
        this.usernameError = true;
        return;
      }
      if (this.passwordConfirmError) {
        this.passwordError = true;
        return;
      }

      // add user to database & other relevant locations
      const user = await userService.create({
        username: this.newUsername,
        password: this.newPassword,
      });
      if (user) {
        this.$store.commit('FILL_USER', user);
        this.$store.commit('FILL_USERS', this.$store.getters.users.concat(user));
        this.localUser = this.$store.getters.user;
        userService.setToken(user.token);
        window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      }

      // set error booleans and input values to init values
      this.passwordError = false;
      this.usernameError = false;
      this.success = true;
      this.submitting = false;
      this.register = false;
      this.newUsername = '';
      this.newPassword = '';
      this.newPasswordConfirm = '';
    },
    clearStatus() {
      this.success = false;
      this.passwordError = false;
      this.usernameError = false;
    },
  },
};

</script>

<style>

  form {
    width: 100%;
  }

</style>
