<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      message: "Your Profile",
      restaurants: [],
      user: {}
    };
  },
  created: function () {
    this.showProfile()
  },
  methods: {
    showProfile: function () {
      axios.get(`/users/1`).then(response => {
        console.log('showing profile', response.data)
        this.restaurants = response.data.restaurants
        this.user = response.data.user
        console.log(this.restaurants)
        console.log(this.user.name)
      })
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>Username: {{ this.user.name }}</h2>
    <h2> Group: {{ this.user.group_id }}</h2>
    <div v-for="restaurant in restaurants" v-bind:key="restaurant">
      <p>{{ restaurant.name }}</p>
      <p>{{ restaurant.cuisines }}</p>
      <p>{{ restaurant.address }}</p>
      <p><img v-bind:src="restaurant.image"></p>
    </div>
  </div>
</template>

<style>
</style>