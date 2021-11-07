import { getRole, getToken, setToken } from '../../../utils/auth'
import { login, getAdminInfo } from '../../../api/admin'
const state = () => ({
  token: getToken(),
  role: getRole(),
  myInfo: null,
  titlePage: '',
  isLoading: false
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
  SET_LOADING: (state) => {
    state.isLoading = true
  },
  SET_DONE_LOADING: (state) => {
    state.isLoading = false
  }
}

function storeAuthentication(commit, credentials) {
  debugger
  const token = credentials.access_token
  const role = credentials.user_role
  commit('SET_TOKEN', token)
  commit('SET_ROLE', role)
  setToken(token, role)
}

const actions = {
  async login({ commit }, loginData) {
    try {
      const { username, password } = loginData
      console.log(`username: ${username}`)
      console.log(`password: ${password}`)
      const data = await login({
        username: username.trim(),
        password
      })
      debugger
      await storeAuthentication(commit, data)
      try {
        const adminInfo = await getAdminInfo()
        commit('SET_MY_INFO', adminInfo)
      } catch (e) {
        commit('SET_MY_INFO', {})
      }
      return true
    } catch (error) {
      return false
    }
  },
  getInfo({ commit }, state) {
    if (state.myInfo) return state.myInfo
    else return null
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
