<template>
  <div class="home" >
    <div v-if="user.username !== ''">
      <div v-if="startGame">
        <div class="row" v-if="gameOn">
          <Timer class="col-md-3"/>
          <Quiz class="col-md-6" msg ="Quiz" />
        </div>
        <div v-else>
          <h3>Game ended!</h3>
          <h5>Final Score: {{ points }}</h5>
          <p>Play again?</p>
          <CategoryDropdown/>
          <button v-on:click="handleStart">Start game</button>
        </div>
      </div>
      <div v-else>
        <CategoryDropdown/>
        <button v-on:click="handleStart">Start game</button>
      </div>
    </div>
    <div v-else>
      <h3>Log in to play!</h3>
      <p>Sign in to have fun and determine who is the biggest know it all!</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';

import Quiz from '@/components/Quiz.vue';
import Timer from '@/components/Timer.vue';
import CategoryDropdown from '../components/CategoryDropdown.vue';

export default {
  name: 'Home',
  components: {
    CategoryDropdown,
    Quiz,
    Timer,
  },
  data() {
    return {
      startGame: false,
      // categories: [],
    };
  },
  mounted() {
  },
  computed: {
    ...mapGetters([
      'gameOn',
      'user',
      'points',
    ]),
  },
  methods: {
    handleStart() {
      this.$store.commit('RESET_POINTS');
      this.startGame = true;
      this.$store.commit('TOGGLE_GAMEON', true);
    },
  },
};
</script>
<style>
  @media (max-width:775px) {
    .col-md-3 {
      margin-left: auto;
      margin-right:auto;
    }
  }
</style>
