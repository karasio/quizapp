<template>
  <div>
    <div>
      <h4>Current points: {{ points }}</h4>
    </div>
    <h2 v-if="this.content.length !== 0 ">{{decodeHtml(this.content.results[0].question)}}</h2>
    <div class="btn-group-vertical">
      <b-button style="margin: 10px 0 10px 0"
                v-for="answer in answers"
                :key="answer.answer"
                v-bind:style='{"background-color" : (isAnswered ? answer.color : "" )}'
                v-on:click="handleAnswerButton">
        {{decodeHtml(answer.answer)}}
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Quiz',
  data() {
    return {
      content: [],
      answers: [],
      quizToken: '',
      answered: false,
      buttonColor: '',
    };
  },
  methods: {
    decodeHtml(html) {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    },
    handleAnswerButton(event) {
      this.answered = true;
      setTimeout(() => {
        if (event.target.innerText === this.decodeHtml(this.content.results[0].correct_answer)) {
          this.$store.commit('INCREMENT_POINTS', 1);
          this.fetchQuestion();
        } else {
          this.$store.commit('TOGGLE_GAMEON', false);
        }
        this.answered = false;
      }, 1000);
    },
    fetchQuestion() {
      this.answers = [];

      const requestOptions = {
        method: 'GET',
        redirect: 'manual',
      };

      fetch(`https://opentdb.com/api.php?amount=1&category=${this.category.id}&token=${this.quizToken}`,
        requestOptions).then((response) => response.json()).then((result) => {
        this.content = result;
        this.answers.push({ answer: this.content.results[0].correct_answer, color: 'green' });
        result.results[0].incorrect_answers.forEach((a) => {
          this.answers.push({ answer: a, color: 'red' });
        });

        this.answers = this.shuffle(this.answers);
      }).catch((error) => console.log('error', error));
    },
    fetchToken() {
      const requestOptions = {
        method: 'GET',
        // headers: myHeaders,
        redirect: 'follow',
      };

      fetch('https://opentdb.com/api_token.php?command=request', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.quizToken = result.token;
          this.fetchQuestion();
        })
        .catch((error) => console.log('error', error));
    },
    shuffle(array) {
      let currentIndex = array.length;
      let temporaryValue;
      let randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        // eslint-disable-next-line no-param-reassign
        array[currentIndex] = array[randomIndex];
        // eslint-disable-next-line no-param-reassign
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
  },
  mounted() {
    this.fetchToken.call(this);
  },
  computed: {
    ...mapGetters(['gameOn', 'user', 'points', 'category']),
    isAnswered() {
      return this.answered;
    },
  },
};
</script>

<style scoped>

</style>
