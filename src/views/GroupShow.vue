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
    },
    goToVotePage: function () {
      this.$router.push("/vote_restaurants")
    },
    seeMap: function (winner) {
      window.open(`https://maps.google.com/?q=${winner.address}`)
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>Your Group</h1>
    <object width="20">
      <ul class="list-group">
        <li class="list-group-item"><b>{{ group.name }} Group Members</b></li>
        <li class="list-group-item" v-for="user in users" v-bind:key="user">{{ user.name }}</li>
      </ul>
    </object>
    <h3 v-if="this.allVotes === true">Most recent vote has concluded<p><button type="button" class="btn btn-warning"
          @click="generateVote()">Start New
          Vote</button></p>
    </h3>
    <div v-else>Voting currently in progress
      <p><button type="button" class="btn btn-warning" @click="goToVotePage()">Go To Vote</button></p>
    </div>
    <h2>Current Winner</h2>
    <div v-if="this.winner.name">
      <div class="row row-cols-1 row-cols-md-3">
        <div class="col mx-auto">
          <div class="card">
            <img v-bind:src='winner.image' class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">{{ winner.name }}</h5>
              <p class="card-text">{{ winner.address }}</p>
              <p><button type="button" class="btn btn-primary" @click="seeMap(winner)">Map</button></p>
              <p class="card-text">{{ winner.cuisines }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h2 v-else>No Previous Votes Recorded</h2>

  </div>
</template>

<style>
.list-group {
  width: 300px;
  margin: auto;
}
</style>