import { store } from '../../store/index'
import { getTeacherMe } from '../../api/teacher'

import { getToken } from '../../utils/auth'
export default async function auth({ next, router }) {
  try {
    const teacherInfo = getToken() ? await getTeacherMe() : null
    store.commit('Teacher/SET_MY_INFO', teacherInfo)
    if (!teacherInfo) {
      return router.push({ name: 'loginTeacher' })
    }
  } catch (e) {
    store.commit('Teacher/SET_MY_INFO', null)
  }
  return next()
}
