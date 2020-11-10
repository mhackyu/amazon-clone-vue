import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import { auth } from '../lib/firebase';
const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue');
const Login = () =>
  import(/* webpackChunkName: "login" */ '../views/Login.vue');
const Register = () =>
  import(/* webpackChunkName: "register" */ '../views/Register.vue');
const Checkout = () =>
  import(/* webpackChunkName: "checkout" */ '../views/Checkout.vue');
const Payment = () =>
  import(/* webpackChunkName: "payment" */ '../views/Payment.vue');
const Order = () =>
  import(/* webpackChunkName: "order" */ '../views/Order.vue');
const NotFound = () =>
  import(/* webpackChunkName: "notFound" */ '../views/404.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/orders',
    name: 'Order',
    component: Order,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    // Hide navbar component
    store.dispatch('showNavBar', false);
  } else {
    store.dispatch('showNavBar', true);
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (await !auth.currentUser) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
