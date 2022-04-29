<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      message: "Restaurant List",
      restaurants: [],
      userRestaurants: []
    };
  },
  created: function () {
    this.indexRestaurants();
  },
  methods: {
    indexRestaurants: function () {
      axios.get(`/restaurants`).then(response => {
        console.log('index restaurants', response.data)
        this.restaurants = response.data.restaurants
        this.userRestaurants = response.data.user_restaurants
        console.log(this.userRestaurants)
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
      <p>{{ restaurant.address }}</p>
      <p><img v-bind:src="restaurant.image"></p>
    </div>
    <h2>My Restaurants</h2>
    <div v-for="userRestaurant in userRestaurants" v-bind:key="userRestaurant">
      <p>{{ userRestaurant.name }}</p>
      <p>{{ userRestaurant.address }}</p>
      <p><img v-bind:src="userRestaurant.image"></p>
    </div>
  </div>
</template>

<style>
</style>