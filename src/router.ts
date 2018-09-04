import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import login from './views/initialLogin.vue';
import weather from './views/weather.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'weather',
      component: weather,
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: login,
    },
  ],
});
