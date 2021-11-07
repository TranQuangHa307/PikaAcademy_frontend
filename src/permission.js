// import NProgress from 'nprogress'
// import { getToken } from './utils/admin/auth'
// import { router } from './router'
// import { store } from './store/index'
// import { getAccountInfo } from './api/admin/admin'
// NProgress.configure({ showSpinner: false })

// const whiteList = ['/admin/login']

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   //  document.title = getPageTitle(to.meta.title)

//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/admin/login') {
//       next({ path: '/admin/course' })
//       NProgress.done()
//     } else {
//       const arrPath = to.path.split('/')
//       store.state.Admin.titlePage.name = arrPath[2]
//       store.state.Admin.titlePage.url = to.path
//       const myInfo = await store.state.Admin.myInfo
//       if (!myInfo) {
//         try {
//           const accountInfo = await getAccountInfo()
//           store.commit('Admin/SET_MY_INFO', accountInfo)
//           console.log(store.state.Admin.myInfo)
//         } catch (e) {
//           store.commit('Admin/SET_MY_INFO', {})
//         }
//       }
//       next()
//     }
//   } else {
//     if (whiteList.includes(to.path)) {
//       next()
//     } else {
//       next(`/admin/login`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   NProgress.done()
// })
