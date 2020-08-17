import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webPackChunkName: "search" */ '../views/Search.vue'),
  },
  {
    path: '/projects/:projectId',
    name: 'Details',
    component: () => import(/* webPackChunkName: "details" */ '../views/Details.vue'),
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import(/* webPackChunkName: "signin" */ '../views/SignIn.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webPackChunkName: "dasboard" */ '../views/Dashboard.vue'),
  },
  {
    path: '/project/new',
    name: 'AddProject',
    component: () => import(/* webPackChunkName: "addProject" */ '../views/AddProject.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
