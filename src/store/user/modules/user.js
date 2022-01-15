import { getRole, getToken, setToken, removeToken } from '../../../utils/auth'
import { login, getUserMe, getCartUser, loginGoogle } from '../../../api/user'
const state = () => ({
  token: getToken(),
  role: getRole(),
  myInfo: null,
  myCart: null,
  isLoading: false,
  searchKey: null
})

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_MY_INFO: (state, myInfo) => {
    state.myInfo = myInfo
  },
  SET_MY_CART: (state, myCart) => {
    state.myCart = myCart
  },
  SET_LOADING: (state) => {
    state.isLoading = true
  },
  SET_DONE_LOADING: (state) => {
    state.isLoading = false
  },
  ADD_CART: (state) => {
    state.myCart.cart_count += 1
  },
  REMOVE_CART: (state) => {
    state.myCart.cart_count -= 1
  }
}

function storeAuthentication(commit, credentials) {
  const token = credentials.access_token
  const role = credentials.user_role
  commit('SET_TOKEN', token)
  commit('SET_ROLE', role)
  setToken(token, role)
}

const actions = {
  async login({ commit }, loginData) {
    try {
      const { email, password } = loginData
      const data = await login({
        email: email.trim(),
        password
      })
      debugger
      await storeAuthentication(commit, data)
      try {
        const userInfo = await getUserMe()
        if (userInfo) {
          const userCart = await getCartUser(userInfo.id)
          commit('SET_MY_CART', userCart)
        }
        commit('SET_MY_INFO', userInfo)
      } catch (e) {
        commit('SET_MY_INFO', {})
        commit('SET_MY_CART', {})
      }
      return true
    } catch (e) {
      return null
    }
  },
  async loginGoogle({ commit }, loginData) {
    try {
      debugger
      const { idToken, userPictureUrl } = loginData
      const data = await loginGoogle(idToken, userPictureUrl)
      await storeAuthentication(commit, data)
      try {
        const userInfo = await getUserMe()
        if (userInfo) {
          const userCart = await getCartUser(userInfo.id)
          commit('SET_MY_CART', userCart)
        }
        commit('SET_MY_INFO', userInfo)
      } catch (e) {
        commit('SET_MY_INFO', {})
        commit('SET_MY_CART', {})
      }
      return true
    } catch (e) {
      return null
    }
  },

  logout({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_MY_INFO', null)
    commit('SET_MY_CART', null)
    removeToken()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
