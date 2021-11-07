import request from '../utils/request'

export function login(data) {
  const bodyFormData = new FormData()
  bodyFormData.set('email', data.email)
  bodyFormData.set('password', data.password)
  return request({
    url: '/user/login',
    method: 'post',
    data: bodyFormData
  })
}

export function signUpCheck(data) {
  const bodyFormData = new FormData()
  bodyFormData.set('email', data)
  return request({
    url: '/user/sign-up/check',
    method: 'post',
    data: bodyFormData
  })
}

export function signUp(user) {
  return request({
    url: '/user/sign-up',
    method: 'post',
    data: user
  })
}

export function addUser(user) {
  return request({
    url: '/user',
    method: 'post',
    data: user
  })
}

export function updateUser(userId, user) {
  return request({
    url: `/user/${userId}`,
    method: 'put',
    data: user
  })
}

export function getUserList(params) {
  return request({
    url: `/user`,
    method: 'get',
    params
  })
}

export function getUserInfo(id) {
  return request({
    url: `/user/${id}`,
    method: 'get'
  })
}

export function getUserMe() {
  return request({
    url: '/user/me',
    method: 'get'
  })
}

export function getListFavoriteCourse(userId, params) {
  return request({
    url: `/user/${userId}/user-like-course`,
    method: 'get',
    params
  })
}

export function getListPurchasedCourse(userId, params) {
  return request({
    url: `/user/${userId}/user-purchase-course`,
    method: 'get',
    params
  })
}

export function userLikeCourse(params) {
  return request({
    url: '/user/user-like-course',
    method: 'post',
    data: params
  })
}

export function getCartUser(userId) {
  return request({
    url: `/user/${userId}/user-cart`,
    method: 'get'
  })
}
