<template>
  <div class="about">
    <div>
      This is a Quiz app built with
      <a href="https://opentdb.com"> Open Trivia Database </a> questions.
      <br>
      User data is stored on a MongoDB Atlas database.
    </div>
    <div v-if="user.username !== ''">
      <button @click.prevent="removeButtonClicked">Remove all my data</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import userService from '../services/users';

export default {
  name: 'About',

  data() {
    return {

    };
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  methods: {
    removeButtonClicked() {
      // eslint-disable-next-line no-alert
      const remove = window.confirm('Are you sure? This is irreversible');
      if (remove) {
        userService
          .remove(this.user.id, this.user)
          .then(() => {
            this.fillUser({
              username: '',
              password: '',
            });
            window.localStorage.clear();
            userService
              .getAll()
              .then((response) => {
                this.fillUsers(response);
              });
          });
      }
    },
    ...mapActions([
      'fillUsers',
      'fillUser',
    ]),
  },
};
</script>
