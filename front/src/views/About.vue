<template>
  <div class="about">
    <div id="aboutContainer">
      <div v-if="user.username !== ''">
        <button
          id="removedatabutton"
          @click.prevent="removeButtonClicked">
          Remove all my data
        </button>
      </div>
      <div>This is a Quiz app built with
        <a href="https://opentdb.com"> Open Trivia Database </a> questions.
      </div>
      <div>User data is stored on a MongoDB Atlas database.</div>
      <div>
      User data API description can be found
      <a href="https://gitlab.metropolia.fi/kjc/quiz/-/blob/master/back/README.md">here</a>.
      </div>
      <div>Project done by:</div>
      <div id="faces">
        <div class="faceslot">
          <img class="thumbs" src="https://avatars2.githubusercontent.com/u/45478379?s=460&u=780659dcba93aa907611cd278916a3134428036c&v=4"/>
          <br>
          <a href="https://github.com/karasio/">Katri Rasio</a>
        </div>
        <div class="faceslot">
          <img class="thumbs" src="http://placekitten.com/200/200"/>
          <br>
          <a href="https://github.com/christoffertoppe/">Christoffer Tverin Mellavuo</a>
        </div>
        <div class="faceslot">
          <img class="thumbs" src="https://avatars3.githubusercontent.com/u/28742639?s=460&u=184ca5018b1731e67213656faffedce1bde1f07f&v=4"/>
          <br>
          <a href="https://github.com/jvaarala/">Jesse Väärälä</a>
        </div>
      </div>
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

<style>
  #removedatabutton {
    margin-bottom: 0.5rem;
  }
  .thumbs {
    width: 10rem;
  }
  #faces {
    display: flex;
    padding: 1rem 1rem 1rem 1rem;
    width: 100%;
    text-align: center;
  }
  .faceslot {
    width: 33%;
  }
</style>
