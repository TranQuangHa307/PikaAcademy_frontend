import { store } from '../../store/index'
import { getUserMe, getCartUser } from '../../api/user'

import { getToken } from '../../utils/auth'
export default async function auth({ next, router }) {
  try {
    console.log(getToken())
    const userInfo = getToken() ? await getUserMe() : null
    if (userInfo) {
      const userCart = await getCartUser(userInfo.id)
      store.commit('User/SET_MY_CART', userCart)
    }
    store.commit('User/SET_MY_INFO', userInfo)
  } catch (e) {
    store.commit('User/SET_MY_INFO', null)
    store.commit('User/SET_MY_CART', null)
  }
  return next()
}
