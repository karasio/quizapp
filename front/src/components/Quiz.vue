<template>
    <div>
      Quiz
      <h2>{{decodeHtml(this.content.results[0].question)}}</h2>
      <b-form-group label="">
        <b-form-radio v-model="selected" name="some-radios" value="A">
          {{decodeHtml(this.content.results[0].correct_answer)}}
        </b-form-radio>
        <b-form-radio v-model="selected" name="some-radios" value="B">
          {{decodeHtml(this.content.results[0].incorrect_answers[0])}}
        </b-form-radio>
      </b-form-group>

      <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
    </div>
</template>

<script>
export default {
  name: 'Quiz',
  data() {
    return {
      content: Array,
    };
  },
  methods: {
    decodeHtml(html) {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    },
  },
  mounted() {
    const myHeaders = new Headers();
    myHeaders.append('Cookie', 'PHPSESSID=0ed9a39e9f8b1f8b4671ad784fcd582b');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'manual',
    };
    fetch('https://opentdb.com/api.php?amount=10&category=18',
      requestOptions).then((response) => response.json()).then((result) => {
      console.log(result);
      this.content = result;
    }).catch((error) => console.log('error', error));
  },
};
</script>

<style scoped>

</style>
