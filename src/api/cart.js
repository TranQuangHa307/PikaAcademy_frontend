import request from '../utils/request'

export function addCart(cart) {
  return request({
    url: '/cart',
    method: 'post',
    data: cart
  })
}

export function getListCartCourse(cartId) {
  return request({
    url: `/cart/${cartId}/course`,
    method: 'get'
  })
}

export function addToCart(params) {
  return request({
    url: '/cart/course',
    method: 'post',
    data: params
  })
}

export function deleteCourseCart(courseCartId) {
  return request({
    url: `/cart/course/${courseCartId}`,
    method: 'delete'
  })
}
