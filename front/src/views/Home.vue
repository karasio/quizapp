<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Quiz msg ="Quiz" />
  </div>
</template>

<script>
// @ is an alias to /src

import Quiz from '@/components/Quiz.vue';

export default {
  name: 'Home',
  components: {
    Quiz,
  },
};
</script>
