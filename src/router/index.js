import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';
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
    name: 'ViewProject',
    component: () => import(/* webPackChunkName: "viewProject" */ '../views/ViewProject.vue'),
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import(/* webPackChunkName: "signin" */ '../views/SignIn.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webPackChunkName: "dasboard" */ '../views/Dashboard.vue'),
  },
  {
    path: '/project/new',
    name: 'AddProject',
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webPackChunkName: "addProject" */ '../views/AddProject.vue'),
  },
  {
    path: '/projects/:projectId/edit',
    name: 'EditProject',
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webPackChunkName: "editProject" */ '../views/EditProject.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        next({
          name: 'SignIn',
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
  next();
});

export default router;
