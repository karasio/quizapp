<template>
  <div class="home">
    <LoginForm></LoginForm>
    <Quiz msg ="Quiz" />
  </div>
</template>

<script>
// @ is an alias to /src
import Quiz from '@/components/Quiz.vue';
import LoginForm from '../components/LoginForm.vue';

export default {
  name: 'Home',
  components: {
    LoginForm,
    Quiz,
  },
};
</script>
