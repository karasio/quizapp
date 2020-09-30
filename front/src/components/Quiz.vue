<template>
  <div>
    Quiz
    <h2>{{decodeHtml(this.content.results[0].question)}}</h2>
    <div class="btn-group-vertical">
      <b-button style="margin: 10px 0 10px 0"
                v-for="answer in answers" :key="answer" v-on:click="handleAnswerButton">
        {{decodeHtml(answer)}}
      </b-button>
    </div>
    <div>
      {{ points }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Quiz',
  data() {
    return {
      content: Array,
      answers: Array,
    };
  },
  methods: {
    decodeHtml(html) {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    },
    handleAnswerButton(event) {
      console.log(event);
      if (event.target.innerText === this.content.results[0].correct_answer) {
        console.log('Oikea vastaus');
        this.$store.commit('INCREMENT_POINTS', 1);
        this.fetchQuestion();
      } else {
        console.log('Väärä vastaus');
        this.$store.commit('RESET_POINTS');
        this.$store.commit('TOGGLE_GAMEON', false);
      }
    },
    fetchQuestion() {
      const myHeaders = new Headers();
      myHeaders.append('Cookie', 'PHPSESSID=0ed9a39e9f8b1f8b4671ad784fcd582b');

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'manual',
      };
      fetch('https://opentdb.com/api.php?amount=1&category=18',
        requestOptions).then((response) => response.json()).then((result) => {
        this.content = result;
        this.answers = this.content.results[0].incorrect_answers;
        this.answers.push(this.content.results[0].correct_answer);
      }).catch((error) => console.log('error', error));
    },
  },
  mounted() {
    this.fetchQuestion();
  },
  computed: mapState(['gameOn', 'user', 'points']),
};
</script>

<style scoped>

</style>
