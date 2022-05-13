<script>
export default {
  data: function () {
    return {
    };
  },
  created: function () { },
  methods: {
    toSignUp: function () {
      this.$router.push("/signup")
    },
    toLogIn: function () {
      this.$router.push("/login")
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>Welcome to groupGrub!</h1>
    <h2>We help you find a place to enjoy with a group,</h2>
    <h2>without all the back-and-forth descision making!</h2>
    <h3>To get started, navigate to the signup page <button @click="toSignUp()">here</button></h3>
    <h3>Or if you already have an account, you and log in <button @click="toLogIn()">here</button></h3>
  </div>
</template>

<style>
</style>