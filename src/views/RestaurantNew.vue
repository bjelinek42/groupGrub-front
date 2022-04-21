<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      message: "Create New Restaurant",
      newRestaurantParams: {},
      errors: []
    };
  },
  created: function () { },
  methods: {
    createRestaurant: function () {
      axios.post(`/restaurants`, this.newRestaurantParams).then(response => {
        console.log('in create', response.data)
      })
        .catch((error) => {
          console.log("restaurant create error", error.response);
          this.errors = error.response.data.errors;
        })
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <p>Name: <input type="text" v-model="newRestaurantParams.name"></p>
    <p>Cuisines: <input type="text" v-model="newRestaurantParams.cuisines"></p>
    <p>Address: <input type="text" v-model="newRestaurantParams.address"></p>
    <p>Image URL: <input type="text" v-model="newRestaurantParams.image"></p>
    <button @click="createRestaurant()">Add Restaurant</button>
    <p>{{ errors }}</p>
  </div>
</template>

<style>
</style>