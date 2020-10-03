<template>
  <HighscoresTable :users="users"/>
</template>

<script>
import { mapState } from 'vuex';
import HighscoresTable from '../components/HighscoresTable.vue';

export default {
  name: 'Highscores',
  components: { HighscoresTable },
  computed: mapState(['users']),
};
</script>

<style scoped>

</style>
