import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login.vue";
import Register from "../components/Register.vue";

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: "/Login",
    name: Login,
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: "/register",
    component: Register,
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
