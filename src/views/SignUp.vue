<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
      groups: []
    };
  },
  created: function () {
    this.getGroups()
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    getGroups: function () {
      axios.get("/groups").then(response => {
        console.log(response.data)
        this.groups = response.data
      })
    }
  },
};
</script>

<template>
  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Name:</label>
        <input class="pad" type="text" v-model="newUserParams.name" />
      </div>
      <div>
        <label>Email:</label>
        <input class="pad" type="email" v-model="newUserParams.email" />
      </div>
      <div>
        <label>Password:</label>
        <input class="pad" type="password" v-model="newUserParams.password" />
      </div>
      <div>
        <label>Password confirmation:</label>
        <input class="pad" type="password" v-model="newUserParams.password_confirmation" />
      </div>
      <p>Select Group
        <select name="groups" id="groups" v-model="newUserParams.group_id">
          <option class="pad" v-for="group in groups" v-bind:key="group.id" v-bind:value="group.id">{{ group.name }}
          </option>
        </select>
      </p>
      <p><input class="pad btn btn-primary" type="submit" value="Submit" /></p>
    </form>
  </div>
</template>

<style>
.signup {
  margin: 15px;
}

.pad {
  margin: 10px;
}
</style>