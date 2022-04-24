<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      message: "Your Profile",
      restaurants: [],
      user: {},
      group: {}
    };
  },
  created: function () {
    this.showProfile()
  },
  methods: {
    showProfile: function () {
      axios.get(`/users/:id`).then(response => {
        console.log('showing profile', response.data)
        this.restaurants = response.data.restaurants
        this.user = response.data.user
        this.group = response.data.group
        console.log(this.restaurants)
        console.log(this.user.name)
      })
    },
    groupPage: function () {
      this.$router.push(`/groups/${this.group.id}`)
    },
    addRestaurant: function () {
      this.$router.push(`/restaurants`)
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>Username: {{ this.user.name }}</h2>
    <h2>Group: {{ this.group.name }} <button @click="groupPage()">View Group Page</button></h2>
    <button @click="addRestaurant()">Add Restaurant to Favorites</button>
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