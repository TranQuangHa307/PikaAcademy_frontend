import axios from 'axios'
import { getToken, removeToken, getRole } from './auth'

const service = axios.create({
  baseURL: 'http://localhost:5000', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000000 // request timeout
})

service.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

service.interceptors.response.use(
  response => response.data,
  (error) => {
    const errCode = error.response.status
    if (errCode === 403) {
      const role = getRole()
      if (role === 'user') {
        removeToken()
        if (error.config.url !== '/login/admin') {
          window.location.href = '/login/admin'
        }
      }
      return Promise.reject(
        new Error('You are not authorized to perform this function')
      )
    }
    if (error.response.status === 400) {
      return Promise.reject(new Error(error.response.data.message))
    }
    if (errCode === 401) {
      removeToken()
      if (error.config.url !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default service
