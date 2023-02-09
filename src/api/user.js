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

export function loginGoogle(idToken, urlImg) {
  const bodyFormData = new FormData()
  bodyFormData.set('googleToken', idToken)
  bodyFormData.set('userPictureUrl', urlImg)
  return request({
    url: '/user/google_auth',
    method: 'post',
    data: bodyFormData
  })
}

export function changePassword(data) {
  const bodyFormData = new FormData()
  bodyFormData.set('id', data.id)
  bodyFormData.set('current_pw', data.currentPassword)
  bodyFormData.set('new_pw', data.newPassword)
  bodyFormData.set('confirm_pw', data.confirmPassword)
  return request({
    url: '/user/change-password',
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

export function userPurchaseCourse(params) {
  return request({
    url: '/user/user-purchase-course',
    method: 'post',
    data: params
  })
}

export function deleteUser(userId) {
  return request({
    url: `/user/${userId}`,
    method: 'delete'
  })
}
