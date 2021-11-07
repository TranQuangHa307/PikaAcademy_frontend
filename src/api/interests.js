import request from '../utils/request'

export function getAllInterests() {
  return request({
    url: '/interests/all',
    method: 'get'
  })
}

export function getInterestsList(params) {
  return request({
    url: '/interests',
    method: 'get',
    params
  })
}

export function getInterestsInfo(id) {
  return request({
    url: `/interests/${id}`,
    method: 'get'
  })
}

export function createInterests(interests) {
  return request({
    url: '/interests',
    method: 'post',
    data: interests
  })
}

export function updatedInterests(interests) {
  return request({
    url: `/interests/${interests.id}`,
    method: 'put',
    data: interests
  })
}

export function deleteInterests(interestsId) {
  return request({
    url: `/interests/${interestsId}`,
    method: 'delete'
  })
}
