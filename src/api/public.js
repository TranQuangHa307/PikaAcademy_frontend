import request from '../utils/request'

export function getCourseListByType(params) {
  return request({
    url: '/api/course/type',
    method: 'get',
    params
  })
}

export function getTeacherList(params) {
  return request({
    url: '/api/teacher',
    method: 'get',
    params
  })
}

export function getTeacherInfo(teacherId) {
  return request({
    url: `/api/teacher/${teacherId}`,
    method: 'get'
  })
}

export function getCourseListOfTeacher(params) {
  return request({
    url: '/api/course/teacher',
    method: 'get',
    params
  })
}

export function getCourseList(params) {
  return request({
    url: '/api/course',
    method: 'get',
    params
  })
}

export function getCourseInfo(courseId, params) {
  return request({
    url: `/api/course/${courseId}`,
    method: 'get',
    params
  })
}

export function getAllInterests() {
  return request({
    url: '/api/interests',
    method: 'get'
  })
}

export function getInterestsInfo(interestsId) {
  return request({
    url: `/api/interests/${interestsId}`,
    method: 'get'
  })
}

export function getCategoriesByInterests(interests_id) {
  return request({
    url: `/api/interests/${interests_id}/categories`,
    method: 'get'
  })
}

export function getCategoryInfo(categoryId) {
  return request({
    url: `/api/category/${categoryId}`,
    method: 'get'
  })
}

export function getTeacherUserTotal(teacherId) {
  return request({
    url: `/api/teacher/${teacherId}/user/total`,
    method: 'get'
  })
}

export function getTeacherRating(teacherId) {
  return request({
    url: `/api/teacher/${teacherId}/rating`,
    method: 'get'
  })
}

export function getFollowed(userId, teacherId) {
  return request({
    url: `api/followed/user/${userId}/teacher/${teacherId}`,
    method: 'get'
  })
}

export function getTotalFollowers(teacherId) {
  return request({
    url: `api/followed/teacher/${teacherId}`,
    method: 'get'
  })
}

