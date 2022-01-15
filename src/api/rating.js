import request from '../utils/request'

export function addRating(rating) {
  return request({
    url: '/rating',
    method: 'post',
    data: rating
  })
}

export function getRatingByCourse(params, courseId) {
  return request({
    url: `rating/course/${courseId}`,
    method: 'get',
    params
  })
}

export function getListbyUser(params, userId, teacherId) {
  return request({
    url: `rating/user/${userId}/${teacherId}`,
    method: 'get',
    params
  })
}

export function getCourseRatingNumber(courseId) {
  return request({
    url: `rating/course/${courseId}/rating`,
    method: 'get'
  })
}

