<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      message: "Welcome to Vue.jsx!",
      voteRestaurants: [],
      restaurants: [],
      voteMessage: "",
      voteEnded: false,
      group: {}
    };
  },
  created: function () {
    this.getVote()
  },
  methods: {
    getVote: function () {
      axios.get("/vote_restaurants.json").then(response => {
        console.log("getting vote", response.data)
        this.voteRestaurants = response.data
        this.group = response.data[0].group
        console.log(this.group)
      })
    },
    declareVote: function (restaurant) {
      console.log(restaurant)
      axios.patch(`/vote_restaurants/${restaurant.id}`).then(response => {
        this.voteMessage = response.data.message
        this.voteEnded = response.data.all_votes_in
      })
    },
    seeMap: function (restaurant) {
      window.open(`https://maps.google.com/?q=${restaurant.address}`)
    },
    groupPage: function () {
      this.$router.push(`/groups/${this.group.id}`)
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>Vote for Restaurant</h1>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col mx-auto" v-for="restaurant in voteRestaurants" v-bind:key="restaurant.id">
        <div class="card h-100">
          <div v-if="restaurant.restaurant.image">
            <img class="card-img-top" v-bind:src="restaurant.restaurant.image">
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ restaurant.restaurant.name }}</h5>
            <p class="card-text">{{ restaurant.restaurant.address }}</p>
            <p><button type="button" class="btn btn-primary" @click="seeMap(restaurant)">Map</button></p>
            <p class="card-text">{{ restaurant.restaurant.cuisines }}</p>
          </div>
          <div class="card-footer">
            <button @click="declareVote(restaurant)">Vote</button>
          </div>
        </div>
      </div>
    </div>
    <h2>{{ this.voteMessage }}</h2>
    <div v-if="voteEnded === true"><button type="button" class="btn btn-primary" @click="groupPage()">Go to Group
        Page</button></div>
  </div>
</template>

<style>
</style>
