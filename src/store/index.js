import Vue from 'vue'
import Vuex from 'vuex'
import Admin from './admin/modules/admin'
import User from './user/modules/user'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isLoading: false
  },
  mutations: {
    SET_LOADING: (state) => {
      state.isLoading = true
    },
    SET_DONE_LOADING: (state) => {
      state.isLoading = false
    }
  },
  modules: {
    Admin,
    User
  }
})
