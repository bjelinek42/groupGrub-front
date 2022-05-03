<script>
import axios from "axios";

export default {
  data: function () {
    return {
      restaurants: [],
      newRestaurantParams: {}
    };
  },
  created: function () {
    // this.getApi();
  },
  methods: {
    getApi: function () {
      axios.get("/restaurants/search").then((response) => {
        this.restaurants = response.data;
        console.log("in get api", response.data);
      });
    },
    createRestaurant: function (restaurant) {
      this.newRestaurantParams.location_id = restaurant.location_id
      this.newRestaurantParams.name = restaurant.name
      this.newRestaurantParams.address = restaurant.address
      // this.newRestaurantParams.cuisines = restaurant.cuisine
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
  <div>
    <button v-on:click="getApi()">GET API</button>
    <div v-for="restaurant in restaurants" v-bind:key="restaurant.location_id">
      <h1>Location Id: {{ restaurant.location_id }}</h1>
      <h1>Name: {{ restaurant.name }} </h1>
      <h1>Type: {{ restaurant.category.name }}, {{ restaurant.subcategory[0].name }}</h1>
      <h1>Address: {{ restaurant.address }}</h1>
      <h1>Rating: {{ restaurant.rating }}/5 <a v-bind:href="restaurant.web_url" target="_blank">Reviews</a></h1>
      <h1>Price: {{ restaurant.price_level }}</h1>
      <h1>Hours: Sunday: {{ restaurant.hours.week_ranges[0] }}
        Monday: {{ restaurant.hours.week_ranges[1] }}
        Tuesday: {{ restaurant.hours.week_ranges[2] }}
        Wednesday: {{ restaurant.hours.week_ranges[3] }}
        Thursday: {{ restaurant.hours.week_ranges[4] }}
        Friday: {{ restaurant.hours.week_ranges[5] }}
        Saturnday: {{ restaurant.hours.week_ranges[6] }}
      </h1>
      <h1>Cuisines:</h1>
      <div v-for=" cuisine in restaurant.cuisine" v-bind:key="cuisine.key">
        <h2>{{ cuisine.name }}</h2>
      </div>
      <!-- <h1>Dietary Restrictions: {{ restaurant.dietary_restrictions }}</h1> -->
      <h2>Reserve a Table:<a v-bind:href="restaurant.reserve_info.url" target="_blank"><img
            v-bind:src="restaurant.reserve_info.provider_img" v-bind:alt="None" style="width:300px"></a>
      </h2>
      <button @click="createRestaurant(restaurant)">Add To Favorites</button>
    </div>
  </div>
</template>

<style>
</style>