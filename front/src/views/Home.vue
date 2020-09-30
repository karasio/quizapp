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
          <p>Play again?</p>
          <button v-on:click="handleStart">Start game</button>
        </div>
      </div>
      <div v-else>
        <button v-on:click="handleStart">Start game</button>
      </div>
    </div>
    <div v-else>
      <h3>Log in to play!</h3>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Quiz from '@/components/Quiz.vue';
import Timer from '@/components/Timer.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    Quiz,
    Timer,
  },
  data() {
    return {
      startGame: false,
    };
  },
  computed: mapState(['gameOn', 'user']),
  // watch: {
  //   gameOn(newValue, oldValue) {
  //     console.log(`Upda ting from ${oldValue} to ${newValue}`);
  //
  //     // Do whatever makes sense now
  //     if (newValue === false) {
  //       console.log('rerender should happen');
  //     }
  //   },
  // },
  methods: {
    handleStart() {
      this.startGame = true;
      this.$store.commit('TOGGLE_GAMEON', true);
    },
  },
};
</script>
