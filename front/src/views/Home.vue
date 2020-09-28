<template>
  <div class="home">
    <LoginForm></LoginForm>
    <Quiz msg ="Quiz" />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '../components/LoginForm.vue';
import Quiz from '@/components/Quiz.vue';

export default {
  name: 'Home',
  components: {
    LoginForm,
    Quiz,
  },
};
</script>
