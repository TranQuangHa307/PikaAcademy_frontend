import request from '../utils/request'

export function getAllCategory() {
  return request({
    url: '/category/all',
    method: 'get'
  })
}

export function getCategoryList(params) {
  return request({
    url: '/category',
    method: 'get',
    params
  })
}

export function getCategoryInfo(id) {
  return request({
    url: `/category/${id}`,
    method: 'get'
  })
}

export function addCategory(category) {
  return request({
    url: '/category',
    method: 'post',
    data: category
  })
}

export function updateCategory(category) {
  return request({
    url: `/category/${category.id}`,
    method: 'put',
    data: category
  })
}

export function deleteCategory(categoryId) {
  return request({
    url: `/category/${categoryId}`,
    method: 'delete'
  })
}
