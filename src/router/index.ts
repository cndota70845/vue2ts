import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/HTML',
        name: 'HTML',
        component: () => import('../views/HTML')
      },
      {
        path: '/LESS',
        name: 'LESS',
        component: () => import('../views/CSS/LESS')
      },
      {
        path: '/SASS',
        name: 'SASS',
        component: () => import('../views/CSS/SASS')
      },
      {
        path: '/Stylus',
        name: 'Stylus',
        component: () => import('../views/CSS/Stylus')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
