import request from '../utils/request'

export function addComment(courseId, comment) {
  return request({
    url: `/comment/course/${courseId}`,
    method: 'post',
    data: comment
  })
}

export function getCommentListByCourse(params, courseId) {
  return request({
    url: `comment/course/${courseId}`,
    method: 'get',
    params
  })
}

export function addReplyComment(commentId, replyComment) {
  return request({
    url: `/comment/${commentId}/reply`,
    method: 'post',
    data: replyComment
  })
}
