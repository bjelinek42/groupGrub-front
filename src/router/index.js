import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";
import LogOut from "../views/LogOut.vue";
import RestaurantsIndex from "../views/RestaurantsIndex.vue";
import RestaurantNew from "../views/RestaurantNew.vue";
import UserProfile from "../views/UserProfile.vue";
import GroupShow from "../views/GroupShow.vue";
import RestaurantsSearch from "../views/RestaurantsSearch.vue";
import VoteView from "../views/VoteView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogOut
  },
  {
    path: '/users/group',
    name: 'groups',
    component: GroupShow
  },
  {
    path: '/users/:id',
    name: 'profile',
    component: UserProfile
  },
  {
    path: '/restaurants/search',
    name: 'restaurants search',
    component: RestaurantsSearch
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: RestaurantsIndex
  },
  {
    path: '/restaurants/new',
    name: 'restaurantnew',
    component: RestaurantNew
  },
  {
    path: '/vote_restaurants',
    name: 'VoteView',
    component: VoteView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
