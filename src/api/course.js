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
