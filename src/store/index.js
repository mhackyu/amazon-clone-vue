import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '../lib/firebase';
import httpClient from '../lib/httpClient';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showNavBar: true,
    user: null,
    basket: [],
    stripeClientSecret: ''
  },
  mutations: {
    SET_SHOW_NAVBAR(state, isShow) {
      state.showNavBar = isShow;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    ADD_PRODUCT(state, product) {
      state.basket.push(product);
    },
    REMOVE_PRODUCT(state, idx) {
      state.basket.splice(idx, 1);
    },
    SET_STRIPE_CLIENT_SECRET(state, clientSecret) {
      state.stripeClientSecret = clientSecret;
    },
    SET_BASKET(state, products) {
      state.basket = products;
    }
  },
  actions: {
    showNavBar({ commit }, isShow) {
      commit('SET_SHOW_NAVBAR', isShow);
    },
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
    async login({ commit }, { email, password }) {
      try {
        await auth.signInWithEmailAndPassword(email, password);
        commit('SET_USER', auth.currentUser);
        return Promise.resolve(true);
      } catch (error) {
        throw new Error(error);
      }
    },
    async register(_, { email, password }) {
      try {
        await auth.createUserWithEmailAndPassword(email, password);
        return Promise.resolve(true);
      } catch (error) {
        throw new Error(error);
      }
    },
    logout({ commit }) {
      auth.signOut();
      commit('SET_USER', null);
    },
    async addProduct({ commit, getters }, product) {
      commit('ADD_PRODUCT', product);
      try {
        const { data } = await httpClient.post(
          `/payments?total=${getters.basketTotal * 100}`
        );
        commit('SET_STRIPE_CLIENT_SECRET', data.clientSecret);
      } catch (error) {
        console.log('STRIPE PAYMENT INTENT ERROR:', error);
      }
    },
    async removeProduct({ commit, getters }, idx) {
      commit('REMOVE_PRODUCT', idx);
      try {
        const { data } = await httpClient.post(
          `/payments?total=${getters.basketTotal * 100}`
        );
        commit('SET_STRIPE_CLIENT_SECRET', data.clientSecret);
      } catch (error) {
        console.log('STRIPE PAYMENT INTENT ERROR:', error);
      }
    },
    emptyBasket({ commit }) {
      commit('SET_BASKET', []);
    }
  },
  getters: {
    basketTotal(state) {
      return state.basket.reduce((amount, item) => item.price + amount, 0);
    }
  }
});
