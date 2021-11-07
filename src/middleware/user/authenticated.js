import { getToken } from '../../utils/auth'
import { store } from '../../store/index'
import { getUserMe, getCartUser } from '../../api/user'

export default async function auth({ next, router }) {
  const hasToken = getToken()
  if (!hasToken) {
    return router.push({ name: 'loginUser' })
  }
  try {
    const userInfo = await getUserMe()
    if (userInfo) {
      const userCart = await getCartUser(userInfo.id)
      console.log(userCart)
      store.commit('User/SET_MY_CART', userCart)
    }
    store.commit('User/SET_MY_INFO', userInfo)
  } catch (e) {
    store.commit('User/SET_MY_INFO', {})
    store.commit('User/SET_MY_CART', {})
  }
  return next()
}
