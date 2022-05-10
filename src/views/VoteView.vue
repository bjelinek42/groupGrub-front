<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      message: "Welcome to Vue.jsx!",
      voteRestaurants: [],
      restaurants: []
    };
  },
  created: function () {
    this.getVote
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
        console.log(response.data)
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
      <button @click="declareVote(restaurant)">Vote</button>
    </div>
    <button @click="getVote()">Click</button>
  </div>
</template>

<style>
</style>
