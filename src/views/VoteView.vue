<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      message: "Welcome to Vue.jsx!",
      restaurants: []
    };
  },
  created: function () {
    this.getVote
  },
  methods: {
    getVote: function () {
      axios.get("/vote_restaurants").then(response => {
        console.log("getting vote", response.data)
        this.restaurants = response.data
      })
    },
    declareVote: function (restaurant) {
      console.log(restaurant)
      // axios.patch("/vote_restaurant/")
      restaurant
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>Vote for Restaurant</h1>
    <div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
      {{ restaurant.name }}
      {{ restaurant.address }}
      <button @click="declareVote(restaurant)">Vote</button>
    </div>
    <button @click="getVote()">Click</button>
  </div>
</template>

<style>
</style>
