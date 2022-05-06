<script>
import axios from "axios";

export default {
  data: function () {
    return {
      restaurants: [],
      newRestaurantParams: {},
      weeklyHoursDone: []
    };
  },
  watch: {
    restaurants() {
      this.restaurants.forEach(restaurant => {
        if (restaurant.hours) {
          restaurant.hours.week_ranges = this.convertHours(restaurant)
          console.log(restaurant.hours.week_ranges)
        }
      })
    }
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
    },
    convertHours: function (restaurant) {
      console.log(restaurant)
      var schedule = restaurant.hours.week_ranges
      console.log(schedule)
      var weeklyHours = [];
      schedule.forEach(hours => {
        var dailyHours = [];
        if (hours.length === 0) {
          var open = "Closed";
          dailyHours.push(open);
        } else {
          hours.forEach(time => {
            var openHours = Math.floor((time.open_time) / 60);
            if (openHours / 12 > 1 && openHours / 12 != 2) {
              openHours = openHours - 12;
              var openPM = "pm";
            } else if (openHours === 12) {
              openPM = "pm";
            } else {
              if (openHours === 24) {
                openHours = 12;
              }
              openPM = "am";
            }
            var openMinutes = Math.floor(time.open_time % 60);
            if (openMinutes === 0) {
              openMinutes = `00`;
            }
            var closeHours = Math.floor(time.close_time / 60);
            if (closeHours === 0) {
              closeHours = 12
            }
            if (closeHours / 12 > 1 && closeHours / 12 != 2) {
              closeHours = closeHours - 12;
              var closePM = "pm";
            } else if (closeHours === 12) {
              closePM = "pm";
            } else {
              if (closeHours === 24) {
                closeHours = 12;
              }
              closePM = "am";
            }
            var closeMinutes = Math.floor(time.close_time % 60);
            if (closeMinutes === 0) {
              closeMinutes = `00`;
            }
            var open = `${openHours}:${openMinutes} ${openPM} - ${closeHours}:${closeMinutes} ${closePM}`;
            dailyHours.push(open);
          });
        }
        weeklyHours.push(dailyHours);
      });
      console.log(weeklyHours);
      this.weeklyHoursDone = weeklyHours
      return weeklyHours
    }
  },
};
</script>

<template>
  <button type="button" class="btn btn-primary" v-on:click="getApi()">GET API</button>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col" v-for="restaurant in restaurants" v-bind:key="restaurant.location_id">
      <div class="card h-100">
        <img v-bind:src="restaurant.photo.images.large.url" class="card-img-top" alt="...">
        <div class="card-body">
          <h2 class="card-title">Location Id: {{ restaurant.location_id }} | {{ restaurant.name }}</h2>
          <p class="card-text">{{ restaurant.address }}</p>
          <p class="card-text">Price: {{ restaurant.price_level }} | Rating: {{ restaurant.rating }}/5 <a
              v-bind:href="restaurant.web_url" target="_blank">Reviews</a></p>
          <div class="container">
            <div class="row align-items-start">
              <div class="col">
                <u>Cuisines</u>
                <div v-for="cuisine in restaurant.cuisine" v-bind:key="cuisine.key">
                  {{ cuisine.name }}
                </div>
              </div>
              <div class="col" v-if="restaurant.hours">
                Sunday:
                <div v-for="time in restaurant.hours.week_ranges[0]" v-bind:key="time">
                  {{ time }}
                </div>
                Monday:
                <div v-for="time in restaurant.hours.week_ranges[1]" v-bind:key="time">
                  {{ time }}
                </div>
                Tuesday:
                <div v-for="time in restaurant.hours.week_ranges[2]" v-bind:key="time">
                  {{ time }}
                </div>
                Wednesday:
                <div v-for="time in restaurant.hours.week_ranges[3]" v-bind:key="time">
                  {{ time }}
                </div>
                Thursday:
                <div v-for="time in restaurant.hours.week_ranges[4]" v-bind:key="time">
                  {{ time }}
                </div>
                Friday:
                <div v-for="time in restaurant.hours.week_ranges[5]" v-bind:key="time">
                  {{ time }}
                </div>
                Saturday:
                <div v-for="time in restaurant.hours.week_ranges[6]" v-bind:key="time">
                  {{ time }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <h4>Reserve a Table or Order Ahead:
            <p>{{ restaurant.phone }}</p>
            <a v-if="restaurant.reserve_info" v-bind:href="restaurant.reserve_info.url" target="_blank"> <img
                v-bind:src="restaurant.reserve_info.provider_img" alt="Click Here" style="width:300px"></a>
          </h4>
          <button class="btn btn-success" @click="createRestaurant(restaurant)"> Add To Favorites</button>
        </div>
      </div>
    </div>
  </div>
  <!-- <div>
    <button type="button" class="btn btn-primary" v-on:click="getApi()">GET API</button>
    <div v-for="restaurant in restaurants" v-bind:key="restaurant.location_id">
      <h1>Location Id: {{ restaurant.location_id }}</h1>
      <h1>Name: {{ restaurant.name }} </h1>
      <h1>Type: {{ restaurant.category.name }}, {{ restaurant.subcategory[0].name }}</h1>
      <h1>Address: {{ restaurant.address }}</h1>
      <h1>Rating: {{ restaurant.rating }}/5 <a v-bind:href="restaurant.web_url" target="_blank">Reviews</a></h1>
      <h1>Price: {{ restaurant.price_level }}</h1>
      <h1 v-if="restaurant.hours">
        Hours:
        <div v-for="time in restaurant.hours.week_ranges[0]" v-bind:key="time">
          Sunday: {{ time }}
        </div>
        <div v-for="time in restaurant.hours.week_ranges[1]" v-bind:key="time">
          Monday: {{ time }}
        </div>
        <div v-for="time in restaurant.hours.week_ranges[2]" v-bind:key="time">
          Tuesday: {{ time }}
        </div>
        <div v-for="time in restaurant.hours.week_ranges[3]" v-bind:key="time">
          Wednesday: {{ time }}
        </div>
        <div v-for="time in restaurant.hours.week_ranges[4]" v-bind:key="time">
          Thursday: {{ time }}
        </div>
        <div v-for="time in restaurant.hours.week_ranges[5]" v-bind:key="time">
          Friday: {{ time }}
        </div>
        <div v-for="time in restaurant.hours.week_ranges[6]" v-bind:key="time">
          Saturday: {{ time }}
        </div>
      </h1>
      <h1>Cuisines:</h1>
      <div v-for="cuisine in restaurant.cuisine" v-bind:key="cuisine.key">
        <h2>{{ cuisine.name }}</h2>
      </div>
      <h1>Dietary Restrictions: {{ restaurant.dietary_restrictions }}</h1>
      <h2 v-if="restaurant.reserve_info">Reserve a Table or Order Ahead:<a v-bind:href="restaurant.reserve_info.url"
          target="_blank"><img v-bind:src="restaurant.reserve_info.provider_img" alt="Click Here"
            style="width:300px"></a>
      </h2>
      <button @click="createRestaurant(restaurant)">Add To Favorites</button>
    </div>
  </div> -->
</template>

<style>
</style>