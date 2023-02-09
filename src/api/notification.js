import request from '../utils/request'

export function getByAdmin() {
  return request({
    url: `/notification/admin`,
    method: 'get'
  })
}

export function getByTeacher(teacherId) {
  return request({
    url: `/notification/teacher/${teacherId}`,
    method: 'get'
  })
}

export function getByUser(userId) {
  return request({
    url: `/notification/user/${userId}`,
    method: 'get'
  })
}

export function seenNotification(body) {
  return request({
    url: `/notification/seen`,
    method: 'put',
    data: body
  })
}
