import { store } from '../../store/index'
import { getToken } from '../../utils/auth'
import { getAdminInfo } from '../../api/admin'

export default async function auth({ next, router }) {
  try {
    const adminInfo = getToken() ? await getAdminInfo() : null
    store.commit('Admin/SET_MY_INFO', adminInfo)
    if (adminInfo) return router.push({ name: 'dashBoardManeger' })
    else return router.push({ name: 'loginAdmin' })
  } catch (e) {
    store.commit('Admin/SET_MY_INFO', {})
  }
  return next()
}
