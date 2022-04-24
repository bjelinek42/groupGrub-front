<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      message: "Your Group",
      winner: {}
    };
  },
  created: function () {
    this.showGroup()
  },
  methods: {
    showGroup: function () {
      axios.get(`/groups/1`).then(response => {
        console.log('showing group', response.data)
        this.winner = response.data
      })
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>Group Details Here</h2>
    <h2>Restaurant Pick</h2>
    <p>{{ winner.name }}</p>
    <p>{{ winner.address }}</p>
    <p><img v-bind:src='winner.image'></p>
  </div>
</template>

<style>
</style>