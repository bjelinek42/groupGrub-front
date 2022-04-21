<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      message: "Restaurant List",
      restaurants: []
    };
  },
  created: function () {
    this.indexRestaurants();
  },
  methods: {
    indexRestaurants: function () {
      axios.get(`/restaurants`).then(response => {
        console.log('index restaurants', response.data)
        this.restaurants = response.data
      })
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
      <p>{{ restaurant.name }}</p>
      <p><img v-bind:src="restaurant.image"></p>
    </div>
  </div>
</template>

<style>
</style>