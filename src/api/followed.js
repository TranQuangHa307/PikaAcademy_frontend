import request from '../utils/request'

export function followedTeacher(follow) {
  return request({
    url: `/followed/`,
    method: 'post',
    data: follow
  })
}

export function getListbyTeacher(params, teacher_id) {
  return request({
    url: `/followed/teacher/${teacher_id}/follower`,
    method: 'get',
    params
  })
}
