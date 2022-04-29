<script>
import axios from "axios";

export default {
  data: function () {
    return {
      store: [],
      cuisines: {}
    };
  },
  created: function () {
    // this.getApi();
  },
  methods: {
    getApi: function () {
      axios.get("/restaurants/search").then((response) => {
        this.store = response.data;
        this.cuisines = this.store.cuisine;
        console.log("in get api", response.data, this.cuisines);
      });
    },
  },
};
</script>

<template>
  <div>
    <button v-on:click="getApi()">GET API</button>
    <div v-for="restaurant in store" v-bind:key="restaurant.location_id">
      <h1>Location Id: {{ restaurant.location_id }}</h1>
      <h1>Name: {{ restaurant.name }}</h1>
      <h1>Type: {{ restaurant.category.name }}, {{ restaurant.subcategory[0].name }}</h1>
      <h1>Address: {{ restaurant.address }}</h1>
      <h1>Rating: {{ restaurant.rating }}/5</h1>
      <h1>Price: {{ restaurant.price_level }}</h1>
      <!-- <h1>Hours: {{ restaurant.hours.week_ranges }}</h1> -->
      <div v-for="cuisine in restaurant.cuisine" v-bind:key="cuisine.key">
        <h1>Cuisines: {{ cuisine.name }}</h1>
      </div>
      <!-- <h1>Dietary Restrictions: {{ restaurant.dietary_restrictions }}</h1> -->
      <h2>Reserve a Table: <img v-bind:src="restaurant.reserve_info.provider_img" v-bind:alt="None"></h2>
    </div>
  </div>
</template>

<style>
</style>