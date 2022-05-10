<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      message: "Welcome to Vue.jsx!",
      voteRestaurants: [],
      restaurants: [],
      voteMessage: ""
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
      })
    },
    declareVote: function (restaurant) {
      console.log(restaurant)
      axios.patch(`/vote_restaurants/${restaurant.id}`).then(response => {
        this.voteMessage = response.data.message
      })
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>Vote for Restaurant</h1>
    <div v-for="restaurant in voteRestaurants" v-bind:key="restaurant.id">
      {{ restaurant.restaurant.name }}
      {{ restaurant.restaurant.address }}
      <p><button @click="declareVote(restaurant)">Vote</button></p>
    </div>
    <p>{{ this.voteMessage }}</p>
  </div>
</template>

<style>
</style>
