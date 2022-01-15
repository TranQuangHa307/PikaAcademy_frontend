import request from '../utils/request'

export function transaction(params) {
  return request({
    url: '/transaction',
    method: 'post',
    data: params
  })
}

export function updateTransactionStatus(params) {
  return request({
    url: `/transaction/${params.id}`,
    method: 'put',
    data: params
  })
}

export function getTransactionList(params) {
  return request({
    url: '/transaction',
    method: 'get',
    params
  })
}

export function getTransactionListByStatus(status) {
  return request({
    url: `/transaction/status/${status}`
  })
}

export function getTransaction(transactionId) {
  return request({
    url: `/transaction/${transactionId}`,
    method: 'get'
  })
}

export function getTransactionCourseList(transactionId) {
  return request({
    url: `/transaction/${transactionId}/courses`,
    method: 'get'
  })
}

export function getTransactionListByTeacher(teacherId) {
  return request({
    url: `/transaction/teacher/${teacherId}`,
    method: 'get'
  })
}
