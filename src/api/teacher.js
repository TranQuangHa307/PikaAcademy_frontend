import request from '../utils/request'

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
