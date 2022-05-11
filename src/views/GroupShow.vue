<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      message: "Your Group",
      winner: {},
      group: {},
      users: {},
      allVotes: ""
    };
  },
  created: function () {
    this.showGroup()
  },
  methods: {
    showGroup: function () {
      axios.get(`/groups/1.json`).then(response => {
        console.log('showing group', response.data)
        if (response.data.winning_restaurant) {
          this.winner = response.data.winning_restaurant
        }
        this.group = response.data.group
        this.users = response.data.users
        this.allVotes = response.data.all_votes
        console.log(this.winner, this.group, this.users, this.allVotes)
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
    <div v-if="this.allVotes === true">Most recent vote has concluded</div>
    <div v-else>Voting currently in progress</div>
    <div v-if="this.winner.name">
      <h2>Current Winner</h2>
      <p>{{ winner.name }}</p>
      <p>{{ winner.address }}</p>
      <p><img v-bind:src='winner.image'></p>
    </div>
    <h2 v-else>No Previous Votes Recorded</h2>
    <button @click="generateVote()">Start New Vote</button>
  </div>
</template>

<style>
</style>