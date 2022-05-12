<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      message: "Your Profile",
      restaurants: [],
      user: {},
      group: {},
      deleteSuccessful: ""
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
      })
    },
    groupPage: function () {
      this.$router.push(`/groups/${this.group.id}`)
    },
    addRestaurant: function () {
      this.$router.push("/restaurants/search")
    },
    deleteRestaurant: function (restaurant) {
      console.log(this.restaurantUserParams)
      axios.delete(`/restaurant_users?user_id=${this.user.id}&restaurant_id=${restaurant.id}`).then(response => {
        console.log(response.data)
        this.deleteSuccessful = response.data.message
      })
      window.location.reload()
    },
    goToCurrentVote: function () {
      this.$router.push("/vote_restaurants")
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>Username: {{ this.user.name }}</h2>
    <h2>Group: {{ this.group.name }} <button @click="groupPage()">View Group Page</button></h2>
    <button @click="goToCurrentVote()">Go to current vote</button>
    <h3 color="red">{{ this.deleteSuccessful }}</h3>
    <button @click="addRestaurant()">Add Restaurant to Favorites</button>
    <h2>My Favorite Restaurants</h2>
    <div class="row row-cols-1 row-cols-md-5 g-4">
      <div class="col mx-auto" v-for="restaurant in restaurants" v-bind:key="restaurant.location_id">
        <div class="card h-100">
          <img class="card-img-top" v-if="restaurant.image"><img v-bind:src="restaurant.image">
          <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <p class="card-text">{{ restaurant.address }}</p>
            <p class="card-text">{{ restaurant.cuisines }}</p>
          </div>
          <div class="card-footer">
            <button @click="deleteRestaurant(restaurant)">Delete from Favorites</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>