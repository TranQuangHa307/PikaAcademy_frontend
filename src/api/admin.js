import request from '../utils/request'

export function login(data) {
  const bodyFormData = new FormData()
  bodyFormData.set('username', data.username)
  bodyFormData.set('password', data.password)
  return request({
    url: '/admin/login',
    method: 'post',
    data: bodyFormData
  })
}

export function getAdminInfo() {
  return request({
    url: '/admin/me',
    method: 'get'
  })
}
