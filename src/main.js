import { createApp } from 'vue'
// import Vue from 'vue'
// import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import router from './router'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

// Vue.use(BootstrapVue)

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })

createApp(App).use(router).mount('#app')
