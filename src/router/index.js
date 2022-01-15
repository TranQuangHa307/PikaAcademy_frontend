import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../middleware/user/authenticated'
import notAuth from '../middleware/user/notAuthenticated'
import authAdmin from '../middleware/admin/authenticated'
import notAuthAdmin from '../middleware/admin/notAuthenticated'
import notAuthTeacher from '../middleware/teacher/notAuthenticated'
import authTeacher from '../middleware/teacher/authenticated'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  // eslint-disable-next-line arrow-spacing
  return originalPush.call(this, location).catch(()=>{})
}

export const router = new VueRouter({
  routes: [
    {
      path: '/teachermanager',
      redirect: { name: 'loginTeacher' },
      component: () => import('../views/teacher/Layouts/Public'),
      children: [
        {
          path: '/teachermanager/login',
          name: 'loginTeacher',
          component: () => import('../views/teacher/Pages/Login'),
          meta: {
            middleware: notAuthTeacher
          }
        }
      ]
    },
    {
      path: '/teachermanager',
      component: () => import('../views/teacher/Layouts/Default'),
      children: [
        {
          path: '/teachermanager/dashboard',
          name: 'dashBoardTeacherManeger',
          component: () => import('../views/teacher/Pages/Dashboard/Index'),
          meta: {
            middleware: authTeacher
          }
        },
        {
          path: '/teachermanager/course',
          name: 'courseTeacherManeger',
          component: () => import('../views/teacher/Pages/Course/Index'),
          meta: {
            middleware: authTeacher
          }
        },
        {
          path: '/teachermanager/course/add',
          name: 'addCourseTeacherManeger',
          component: () => import('../views/teacher/Pages/Course/Details'),
          meta: {
            middleware: authTeacher
          }
        },
        {
          path: '/teachermanager/course/:id',
          name: 'courseDetailTeacherManeger',
          component: () => import('../views/teacher/Pages/Course/Details'),
          meta: {
            middleware: authTeacher
          }
        },
        {
          path: '/teachermanager/user',
          name: 'userTeacherManeger',
          component: () => import('../views/teacher/Pages/User/Index'),
          meta: {
            middleware: authTeacher
          }
        },
        {
          path: '/teachermanager/follower',
          name: 'followerTeacherManeger',
          component: () => import('../views/teacher/Pages/Follower/Index'),
          meta: {
            middleware: authTeacher
          }
        },
        {
          path: '/teachermanager/profile',
          name: 'profileTeacherManeger',
          component: () => import('../views/teacher/Pages/Profile/Index'),
          meta: {
            middleware: authTeacher
          }
        }
      ]
    },
    {
      path: '/',
      redirect: 'home',
      component: () => import('../views/user/Layouts/Index'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/user/Pages/Home'),
          meta: {
            middleware: notAuth
          }
        },
        {
          path: '/course',
          name: 'search',
          component: () => import('../views/user/Pages/Search'),
          meta: {
            middleware: notAuth
          }
        },
        {
          path: '/course/:id',
          name: 'course',
          component: () => import('../views/user/Pages/Course'),
          meta: {
            middleware: notAuth
          }
        },
        {
          path: '/teacher/:id',
          name: 'teacherInfo',
          component: () => import('../views/user/Pages/Teacher'),
          meta: {
            middleware: notAuth
          }
        },
        {
          path: '/interests',
          name: 'interestsUser',
          component: () => import('../views/user/Pages/Interests'),
          meta: {
            middleware: notAuth
          }
        },
        {
          path: '/interests/:id',
          name: 'categoriesUser',
          component: () => import('../views/user/Pages/Category'),
          meta: {
            middleware: notAuth
          }
        },
        {
          path: '/interests/:interests_id/category/:category_id',
          name: 'courseListUser',
          component: () => import('../views/user/Pages/CourseListPage'),
          meta: {
            middleware: notAuth
          }
        },
        {
          path: '/wishlist',
          name: 'wishlistUser',
          component: () => import('../views/user/Pages/CourseListPage'),
          meta: {
            middleware: auth
          }
        },
        {
          path: '/cart',
          name: 'cartUser',
          component: () => import('../views/user/Pages/Cart'),
          meta: {
            middleware: auth
          }
        },
        {
          path: '/checkout/:id',
          name: 'checkoutUser',
          component: () => import('../views/user/Pages/Checkout'),
          meta: {
            middleware: auth
          }
        },
        {
          path: '/my-courses',
          name: 'myLearningUser',
          component: () => import('../views/user/Pages/CourseListPage'),
          meta: {
            middleware: auth
          }
        },
        {
          path: '/profile',
          name: 'profileUser',
          component: () => import('../views/user/Pages/Profile'),
          meta: {
            middleware: auth
          }
        },
        {
          path: '/mytransactions',
          name: 'myTransactions',
          component: () => import('../views/user/Pages/MyTransactions'),
          meta: {
            middleware: auth
          }
        },
        {
          path: '/teacher-register',
          name: 'teacherRegister',
          component: () => import('../views/user/Pages/TeacherRegis.vue'),
          meta: {
            middleware: auth
          }
        }
      ]
    },
    {
      path: '/',
      redirect: 'loginUser',
      component: () => import('../views/user/Layouts/Public'),
      children: [
        {
          path: '/login',
          name: 'loginUser',
          component: () => import('../views/user/Pages/Login')
        },
        {
          path: '/signup',
          name: 'signUpUser',
          component: () => import('../views/user/Pages/SignUp')
        }
      ]
    },
    {
      path: '/admin',
      redirect: { name: 'loginAdmin' },
      component: () => import('../views/admin/Layouts/Public'),
      children: [
        {
          path: '/admin/login',
          name: 'loginAdmin',
          component: () => import('../views/admin/Pages/Login'),
          meta: {
            middleware: notAuthAdmin
          }
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('../views/admin/Layouts/Default'),
      children: [
        {
          path: '/admin/dashboard',
          name: 'dashBoardManeger',
          component: () => import('../views/admin/Pages/Dashboard/Index'),
          meta: {
            middleware: authAdmin
          }
        },
        {
          path: '/admin/transaction',
          name: 'transactionManeger',
          component: () => import('../views/admin/Pages/Transaction/Index'),
          meta: {
            middleware: authAdmin
          }
        },
        {
          path: '/admin/transaction/:id',
          name: 'transactionDetailsManeger',
          component: () => import('../views/admin/Pages/Transaction/Details'),
          meta: {
            middleware: authAdmin
          }
        },
        {
          path: '/admin/course',
          name: 'courseManeger',
          component: () => import('../views/admin/Pages/Course/Index'),
          meta: {
            middleware: authAdmin
          }
        },
        {
          path: '/admin/course/add',
          name: 'addCourse',
          component: () => import('../views/admin/Pages/Course/Create'),
          meta: {
            middleware: authAdmin
          }
        },
        {
          path: '/admin/course/:id',
          name: 'courseDetail',
          component: () => import('../views/admin/Pages/Course/Details'),
          meta: {
            middleware: authAdmin
          }
        },
        {
          path: '/admin/interests',
          name: 'intersets',
          component: () => import('../views/admin/Pages/Interests/Index'),
          meta: {
            middleware: authAdmin
          }
        },
        {
          path: '/admin/category',
          name: 'category',
          component: () => import('../views/admin/Pages/Category/Index'),
          meta: {
            middleware: authAdmin
          }
        },
        {
          path: '/admin/teacher',
          name: 'teacher',
          component: () => import('../views/admin/Pages/Teacher/Index'),
          meta: {
            middleware: authAdmin
          }
        },
        {
          path: '/admin/teacher/add',
          name: 'addTeacher',
          component: () => import('../views/admin/Pages/Teacher/Create'),
          meta: {
            middleware: authAdmin
          }
        },
        {
          path: '/admin/teacher/:id',
          name: 'teacherDetail',
          component: () => import('../views/admin/Pages/Teacher/Details'),
          meta: {
            middleware: authAdmin
          }
        },
        {
          path: '/admin/user',
          name: 'user',
          component: () => import('../views/admin/Pages/User/Index.vue'),
          meta: {
            middleware: authAdmin
          }
        },
        {
          path: '/admin/user/add',
          name: 'addUser',
          component: () => import('../views/admin/Pages/User/Details'),
          meta: {
            middleware: authAdmin
          }
        },
        {
          path: '/admin/user/:id',
          name: 'userInformation',
          component: () => import('../views/admin/Pages/User/Details'),
          meta: {
            middleware: authAdmin
          }
        }
      ]
    },
    { path: '/admin', redirect: '/admin/course' }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  mode: 'history'
})

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters)
    // Than run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware]

    const context = {
      from,
      next,
      router,
      to
    }
    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({ ...context, next: nextMiddleware })
  }

  return next()
})
