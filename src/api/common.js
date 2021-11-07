import request from '../utils/request'

export function uploadFile(file, folder = null) {
  const bodyFormData = new FormData()
  bodyFormData.set('file', file)
  bodyFormData.set('folder', folder)
  return request({
    url: '/common/file-upload',
    method: 'post',
    data: bodyFormData
  })
}
