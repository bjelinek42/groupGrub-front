<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      message: "Your Group",
      winner: {},
      group: {},
      users: {},
      all_votes: ""
    };
  },
  created: function () {
    this.showGroup()
  },
  methods: {
    showGroup: function () {
      axios.get(`/groups/1.json`).then(response => {
        console.log('showing group', response.data)
        if (response.data.winning_restaurant[0]) {
          this.winner = response.data.winning_restaurant[0]
        }
        this.group = response.data.group
        this.users = response.data.users
        console.log(this.winner, this.group, this.users)
      })
    },
    generateVote: function () {
      axios.post("/vote_restaurants").then(response => {
        console.log("generating vote", response.data)
        this.$router.push("/vote_restaurants")
      })
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>Group Details</h2>
    <h3>Group Name: {{ group.name }}</h3>
    <h3>Members: </h3>
    <div v-for="user in users" v-bind:key="user">
      <h3>{{ user.name }}</h3>
    </div>
    <div v-if="winner.name">
      <h2>Recent Winning Restaurant Pick</h2>
      <p>{{ winner.name }}</p>
      <p>{{ winner.address }}</p>
      <p><img v-bind:src='winner.image'></p>
    </div>
    <h2 v-else>No Recent Vote</h2>
    <button @click="generateVote()">Start New Vote</button>
  </div>
</template>

<style>
</style>