import request from '../utils/request'

export function addSession(session) {
  return request({
    url: '/session',
    method: 'post',
    data: session
  })
}

export function updateSession(session) {
  return request({
    url: `/session/${session.id}`,
    method: 'put',
    data: session
  })
}

export function deleteSession(sessionId) {
  return request({
    url: `/session/${sessionId}`,
    method: 'delete'
  })
}
