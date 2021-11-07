import request from '../utils/request'

export function addChapter(chapter) {
  return request({
    url: '/chapter',
    method: 'post',
    data: chapter
  })
}

export function updateChapter(chapter) {
  return request({
    url: `/chapter/${chapter.id}`,
    method: 'put',
    data: chapter
  })
}

export function deleteChapter(chapterId) {
  return request({
    url: `/chapter/${chapterId}`,
    method: 'delete'
  })
}
