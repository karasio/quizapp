<template>
  <div>
    <b-table :items="users.sort(function (a, b) {
  return b.highScore - a.highScore;
})" :fields="['username','highScore']"/>
  </div>
</template>

<script>
export default {
  name: 'HighscoresTable',
  props: {
    users: Array,
  },
};
</script>

<style scoped>

</style>
