<script>
export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      userId: localStorage.getItem('userId')
    };
  },
  created: function () { },
  methods: {},
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" Fantasy href="/">groupGrub</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <!-- <a class="nav-link active" aria-current="page" href="/users">Profile</a> -->
            <router-link class="nav-link active" aria-current="page" v-bind:to="`/users/${userId}`">Profile
            </router-link>
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link active" href="/groups/:id">Group</a> -->
            <router-link class="nav-link active" to="/users/group">Group</router-link>
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link active" href="/restaurants/search">Search Restaurants</a> -->
            <router-link class="nav-link active" to="/restaurants/search">Search Restaurants</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              Authentication
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="/login">Login</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/Logout">Logout</router-link>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li>
                <router-link class="dropdown-item" to="/signup">SignUp</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<style>
body {
  background-image: url('./assets/restaurant.png')
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.btn btn-primary {
  display: flex;
}
</style>
