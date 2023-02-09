import request from '../utils/request'

export function login(data) {
  const bodyFormData = new FormData()
  bodyFormData.set('email', data.email)
  bodyFormData.set('password', data.password)
  return request({
    url: '/teacher/login',
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
    url: '/teacher/change-password',
    method: 'post',
    data: bodyFormData
  })
}

export function getTeacherMe() {
  return request({
    url: '/teacher/me',
    method: 'get'
  })
}

export function getAllTeacher() {
  return request({
    url: '/teacher/all',
    method: 'get'
  })
}

export function getTeacherList(params) {
  return request({
    url: '/teacher',
    method: 'get',
    params
  })
}

export function getTeacherInfo(id) {
  return request({
    url: `/teacher/${id}`,
    method: 'get'
  })
}

export function addTeacher(teacher) {
  return request({
    url: '/teacher',
    method: 'post',
    data: teacher
  })
}

export function updateTeacher(teacherId, teacher) {
  return request({
    url: `/teacher/${teacherId}`,
    method: 'put',
    data: teacher
  })
}

export function deleteTeacher(teacherId) {
  return request({
    url: `/teacher/${teacherId}`,
    method: 'delete'
  })
}

export function getUserListByTecherId(params, teacherId) {
  return request({
    url: `/teacher/${teacherId}/users`,
    method: 'get',
    params
  })
}

export function getCourseListByTeacherUserId(params, teacherId, userId) {
  return request({
    url: `/teacher/${teacherId}/user/${userId}/course`,
    method: 'get',
    params
  })
}

export function signUpCheck(data) {
  const bodyFormData = new FormData()
  bodyFormData.set('email', data)
  return request({
    url: '/teacher/sign-up/check',
    method: 'post',
    data: bodyFormData
  })
}

export function signUp(teacher) {
  return request({
    url: '/teacher/sign-up',
    method: 'post',
    data: teacher
  })
}

export function getAllInActive() {
  return request({
    url: '/teacher/inactive',
    method: 'get'
  })
}

export function activeTeacher(teacherId) {
  return request({
    url: `/teacher/${teacherId}/active`,
    method: 'put'
  })
}

export function getCourseListByTeacherId(params) {
  return request({
    url: `/teacher/${params.teacher_id}/courses`,
    method: 'get',
    params
  })
}
