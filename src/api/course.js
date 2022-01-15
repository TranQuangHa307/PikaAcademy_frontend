import request from '../utils/request'

export function getAllCourse() {
  return request({
    url: '/course',
    method: 'get'
  })
}

export function getCourseList(params) {
  return request({
    url: '/course',
    method: 'get',
    params
  })
}

export function getCourseListByType(keyword, id) {
  const params = {
    keyword: keyword,
    id: id
  }
  return request({
    url: '/course/type',
    method: 'get',
    params
  })
}

export function getChapterList(courseId) {
  return request({
    url: `/course/${courseId}/chapter`,
    method: 'get'
  })
}

export function getCourseInfo(id, params = {}) {
  return request({
    url: `/course/${id}`,
    method: 'get',
    params
  })
}

export function addCourse(course) {
  return request({
    url: '/course',
    method: 'post',
    data: course
  })
}

export function updateCourse(id, course) {
  return request({
    url: `/course/${id}`,
    method: 'put',
    data: course
  })
}

export function deleteCourse(courseId) {
  return request({
    url: `/course/${courseId}`,
    method: 'delete'
  })
}

export function getUserListBuyCourse(params, course_id) {
  return request({
    url: `/course/${course_id}/users`,
    method: 'get',
    params
  })
}

export function getUsersLikeCourse(params, course_id) {
  return request({
    url: `/course/${course_id}/likes`,
    method: 'get',
    params
  })
}

export function getTopCourseByTeacher(teacherId, status) {
  return request({
    url: `/course/teacher/${teacherId}/top/${status}`,
    method: 'get'
  })
}

export function getMaterialByCourse(courseId) {
  return request({
    url: `/course/${courseId}/material`,
    method: 'get'
  })
}

export function getListPriceByCourse(courseId) {
  return request({
    url: `/course/${courseId}/price`,
    method: 'get'
  })
}

export function getListDiscountPromotion(courseId) {
  return request({
    url: `/course/${courseId}/discount-promotion`,
    method: 'get'
  })
}

export function getAllActive() {
  return request({
    url: '/course/inactive',
    method: 'get'
  })
}

export function activeCourse(courseId) {
  return request({
    url: `/course/${courseId}/active`,
    method: 'put'
  })
}

export function releaseCourse(courseId) {
  return request({
    url: `/course/${courseId}/release`,
    method: 'put'
  })
}
