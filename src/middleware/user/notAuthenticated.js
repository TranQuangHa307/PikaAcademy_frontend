import { store } from '../../store/index'
import { getUserMe } from '../../api/user'

import { getToken } from '../../utils/auth'
export default async function auth({ next, router }) {
  try {
    const userInfo = getToken() ? await getUserMe() : null
    store.commit('User/SET_MY_INFO', userInfo)
  } catch (e) {
    store.commit('User/SET_MY_INFO', null)
  }
  return next()
}
