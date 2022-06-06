<script>
import axios from "axios";

export default {
  data: function () {
    return {
      restaurants: [],
      newRestaurantParams: {},
      weeklyHoursDone: [],
      searchTerm: "",
      currentCity: {},
      cities: [],
      chosenCity: {},
      cuisines: "",
      selectCities: "",
      searchByName: false
    };
  },
  watch: {
    restaurants() {
      this.restaurants.forEach(restaurant => {
        if (restaurant.hours) {
          restaurant.hours.week_ranges = this.convertHours(restaurant)
          this.searchByName = true
        }
      })
    },
    cities() {
      this.selectCities = "Please select your city from the following:"
    },
  },
  created: function () {
  },
  methods: {
    getApi: function (city) {
      console.log("city", city)
      axios.get(`/restaurants/search?chosenCity=${city.location_id}`).then((response) => {
        this.restaurants = response.data;
        console.log("retrieving restaurants");

      });
    },
    createRestaurant: function (restaurant) {
      this.newRestaurantParams.location_id = restaurant.location_id
      this.newRestaurantParams.name = restaurant.name
      this.newRestaurantParams.address = restaurant.address
      this.newRestaurantParams.image = restaurant.photo.images.small.url
      this.cuisines = ""
      restaurant.cuisine.forEach(cuisine => {
        this.cuisines = this.cuisines + cuisine.name + ', '
      })
      this.cuisines = this.cuisines.slice(0, -2)
      this.newRestaurantParams.cuisines = this.cuisines
      axios.post(`/restaurants.json`, this.newRestaurantParams).then(response => {
        console.log('in create', response.data.message)
      })
        .catch((error) => {
          console.log("restaurant create error", error.response);
          this.errors = error.response.data.errors;
        })
    },
    findCity: function () {
      console.log(this.currentCity)
      axios.post("/restaurants/search", this.currentCity).then(response => {
        console.log(response.data)
        this.cities = response.data
      })

    },
    searchRestaurants: function () {
      return this.restaurants.filter(restaurant => {
        var lowerName = restaurant.name.toLowerCase();
        var lowerSearchTerm = this.searchTerm.toLowerCase()
        return lowerName.includes(lowerSearchTerm)
      })
    },
    convertHours: function (restaurant) {
      var schedule = restaurant.hours.week_ranges
      var weeklyHours = [];
      schedule.forEach(hours => {
        var dailyHours = [];
        if (hours.length === 0) {
          var open = "Closed";
          dailyHours.push(open);
        } else {
          hours.forEach(time => {
            var openTime = time.open_time;
            var openHours = convertHours(openTime);
            var openMinutes = convertMinutes(openTime);
            var closeTime = time.close_time;
            var closeHours = convertHours(closeTime);
            var closeMinutes = convertMinutes(closeTime);
            var open = `${openHours.hours}:${openMinutes} ${openHours.meridiam} - ${closeHours.hours}:${closeMinutes} ${closeHours.meridiam}`;
            dailyHours.push(open);
          });
        }
        weeklyHours.push(dailyHours);
      });

      this.weeklyHoursDone = weeklyHours;
      console.log(weeklyHours);

      function convertMinutes(time) {
        var minutes = Math.floor(time % 60);
        if (minutes === 0) {
          minutes = `00`;
        }
        return minutes;
      }
      function convertHours(time) {
        var hours = Math.floor((time) / 60);
        if (hours / 12 > 1 && hours / 12 !== 2) {
          hours = hours - 12;
          var meridiam = "pm";
        } else if (hours === 12) {
          meridiam = "pm";
        } else {
          if (hours === 24 || hours === 0) {
            hours = 12;
          }
          meridiam = "am";
        }
        return { "hours": hours, "meridiam": meridiam };
      }
    },
    seeMap: function (restaurant) {
      window.open(`https://maps.google.com/?q=${restaurant.address}`)
    }
  },
};
</script>

<template>
  <div class="margin">
    <p>Enter city you would like to seach: <input type="text" v-model="currentCity.currentCity"><button class="margin"
        @click="findCity()">Search Cities</button> </p>
    <p>{{ selectCities }}</p>
    <p v-for="city in cities" v-bind:key="city.location_id">
      {{ city.city }} <input type="button" value="Select" @click="getApi(city)">
    </p>
    <p v-if="searchByName === true">Search Restaurants by Name: <input type="text" v-model="searchTerm"> </p>
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <div class="col mx-auto" v-for="restaurant in searchRestaurants()" v-bind:key="restaurant.location_id">
        <div class='card h-100'>
          <div v-if="restaurant.photo">
            <img v-bind:src="restaurant.photo.images.small.url" class="card-img-top" alt="No Image">
          </div>
          <div class="card-body">
            <h2 class="card-title">{{ restaurant.name }}</h2>
            <p class="card-text">{{ restaurant.address }}</p>
            <p><button type="button" class="btn btn-primary" @click="seeMap(restaurant)">Map</button></p>
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
                  <div v-for="time in weeklyHoursDone[0]" v-bind:key="time">
                    {{ time }}
                  </div>
                  Monday:
                  <div v-for="time in weeklyHoursDone[1]" v-bind:key="time">
                    {{ time }}
                  </div>
                  Tuesday:
                  <div v-for="time in weeklyHoursDone[2]" v-bind:key="time">
                    {{ time }}
                  </div>
                  Wednesday:
                  <div v-for="time in weeklyHoursDone[3]" v-bind:key="time">
                    {{ time }}
                  </div>
                  Thursday:
                  <div v-for="time in weeklyHoursDone[4]" v-bind:key="time">
                    {{ time }}
                  </div>
                  Friday:
                  <div v-for="time in weeklyHoursDone[5]" v-bind:key="time">
                    {{ time }}
                  </div>
                  Saturday:
                  <div v-for="time in weeklyHoursDone[6]" v-bind:key="time">
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
  </div>
</template>

<style>
.margin {
  margin: 20px;
}
</style>