import { getToken } from '../../utils/auth'
import { store } from '../../store/index'
import { getAdminInfo } from '../../api/admin'

export default async function auth({ next, router }) {
  const hasToken = getToken()
  if (!hasToken) {
    return router.push({ name: 'loginAdmin' })
  }
  try {
    const adminInfo = getToken() ? await getAdminInfo() : null
    store.commit('Admin/SET_MY_INFO', adminInfo)
    if (adminInfo) return router.push({ name: 'dashBoardManeger' })
  } catch (e) {
    store.commit('Admin/SET_MY_INFO', {})
  }
  return next()
}
