import Vue from 'vue';
import Router from 'vue-router';
// @ts-ignore
import store from 'store';
import Vuex from './store';
import login from './views/Login.vue';
import Home from './views/Weather.vue';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
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

router.beforeEach((to, from, next) => {
    document.title = 'Weather App | ' + to.name
    const user = store.get('user');
    if (user && to.path !== '/login') {
        Vuex.dispatch('setUser', user);
        next()
    }  else if (user && to.path === '/login') {
        next({name: 'Home'})
    } else if (to.path !== '/login') {
        next({path: '/login'});
    } else {
        next()
    }
})

export default router;
