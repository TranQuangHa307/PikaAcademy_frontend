import { getToken } from '../../utils/auth'
import { store } from '../../store/index'
import { getUserMe } from '../../api/user'

export default async function auth({ next, router }) {
  const hasToken = getToken()
  if (!hasToken) {
    return router.push({ name: 'loginUser' })
  }
  try {
    const userInfo = await getUserMe()
    store.commit('User/SET_MY_INFO', userInfo)
  } catch (e) {
    store.commit('User/SET_MY_INFO', {})
  }
  return next()
}
