<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      restaurants: [],
      user: {},
      group: {},
      deleteSuccessful: "",
      errors: [],
    };
  },
  created: function () {
    this.showProfile()
  },
  methods: {
    showProfile: function () {
      var userId = localStorage.getItem(userId)
      axios.get(`/users/${userId}`).then(response => {
        console.log('showing profile', response.data)
        this.restaurants = response.data.restaurants
        console.log(this.restaurants)
        this.user = response.data.user
        this.group = response.data.group
      })
        .catch((error) => {
          console.log("Show Profile Error", error.response);
          this.errors = error.response;
        });
    },
    groupPage: function () {
      this.$router.push(`/users/group`)
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
    },
    seeMap: function (restaurant) {
      window.open(`https://maps.google.com/?q=${restaurant.address}`)
    }
  },
};
</script>

<template>
  <div class="home">
    <ul v-if="errors.length > 0">
      <li style="color:red">{{ errors.statusText }}: {{ errors.data.message }}</li>
    </ul>
    <h1>Your Profile</h1>
    <h2>Username: {{ this.user.name }}</h2>
    <h2>Group: {{ this.group.name }} <button type="button" class="pad btn btn-primary" @click="groupPage()">View Group
        Page</button></h2>
    <!-- <button @click="goToCurrentVote()">Go to current vote</button> -->
    <h3 color="red">{{ this.deleteSuccessful }}</h3>
    <button type="button" class="pad btn btn-warning" @click="addRestaurant()">Add Restaurant to Favorites</button>
    <h2 class="pad">My Favorite Restaurants</h2>
    <div class=" pad row row-cols-1 row-cols-md-5 g-4">
      <div class="col mx-auto" v-for="restaurant in restaurants" v-bind:key="restaurant.location_id">
        <div class="card h-100">
          <img class="card-img-top" v-if="restaurant.image"><img v-bind:src="restaurant.image">
          <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <p class="card-text">{{ restaurant.address }}</p>
            <p><button type="button" class="btn btn-primary" @click="seeMap(restaurant)">Map</button></p>
            <div class="container">
              <div class="row align-items-start">
                <div class="col">
                  <u>Cuisines</u>
                  <p class="card-text">{{ restaurant.cuisines }}</p>
                </div>
                <div class="col" v-if="restaurant.schedule">
                  Sunday:
                  <div v-for="time in restaurant.schedule[0]" v-bind:key="time">
                    <div v-if="time.open_time">
                      {{ time["open_time"] }} - {{ time["close_time"] }}
                    </div>
                    <div v-else>Closed</div>
                  </div>
                  Monday:
                  <div v-for="time in restaurant.schedule[1]" v-bind:key="time">
                    <div v-if="time.open_time">
                      {{ time["open_time"] }} - {{ time["close_time"] }}
                    </div>
                    <div v-else>Closed</div>
                  </div>
                  Tuesday:
                  <div v-for="time in restaurant.schedule[2]" v-bind:key="time">
                    <div v-if="time.open_time">
                      {{ time["open_time"] }} - {{ time["close_time"] }}
                    </div>
                    <div v-else>Closed</div>
                  </div>
                  Wednesday:
                  <div v-for="time in restaurant.schedule[3]" v-bind:key="time">
                    <div v-if="time.open_time">
                      {{ time["open_time"] }} - {{ time["close_time"] }}
                    </div>
                    <div v-else>Closed</div>
                  </div>
                  Thursday:
                  <div v-for="time in restaurant.schedule[4]" v-bind:key="time">
                    <div v-if="time.open_time">
                      {{ time["open_time"] }} - {{ time["close_time"] }}
                    </div>
                    <div v-else>Closed</div>
                  </div>
                  Friday:
                  <div v-for="time in restaurant.schedule[5]" v-bind:key="time">
                    <div v-if="time.open_time">
                      {{ time["open_time"] }} - {{ time["close_time"] }}
                    </div>
                    <div v-else>Closed</div>
                  </div>
                  Saturday:
                  <div v-for="time in restaurant.schedule[6]" v-bind:key="time">
                    <div v-if="time.open_time">
                      {{ time["open_time"] }} - {{ time["close_time"] }}
                    </div>
                    <div v-else>Closed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-danger" @click="deleteRestaurant(restaurant)">Delete from
              Favorites</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.home {
  margin: 20px;
}

.pad {
  margin: 10px;
}
</style>