import { getToken } from '../../utils/auth'
import { store } from '../../store/index'
import { getAdminInfo } from '../../api/admin'

export default async function auth({ next, router }) {
  const hasToken = getToken()
  if (!hasToken) {
    return router.push({ name: 'loginAdmin' })
  }
  try {
    const adminInfo = await getAdminInfo()
    store.commit('Admin/SET_MY_INFO', adminInfo)
  } catch (e) {
    store.commit('Admin/SET_MY_INFO', {})
  }
  return next()
}
