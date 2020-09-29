<template>
  <div class="home" >
    <div class="row" v-if="this.$store.getters.user.username !== ''">
      <Timer class="col-md-3"/>
      <Quiz class="col-md-6" msg ="Quiz" />
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

export default {
  name: 'Home',
  components: {
    Quiz,
    Timer,
  },
};
</script>
