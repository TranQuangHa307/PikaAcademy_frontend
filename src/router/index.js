import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../middleware/user/authenticated'
import notAuth from '../middleware/user/notAuthenticated'
import authAdmin from '../middleware/admin/authenticated'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  // eslint-disable-next-line arrow-spacing
  return originalPush.call(this, location).catch(()=>{})
}

export const router = new VueRouter({
  routes: [
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
      redirect: 'login',
      component: () => import('../views/admin/Layouts/Public'),
      children: [
        {
          path: '/admin/login',
          name: 'loginAdmin',
          component: () => import('../views/admin/Pages/Login')
        }
      ]
    },
    {
      path: '/admin',
      redirect: 'dashBoardManeger',
      component: () => import('../views/admin/Layouts/Default'),
      children: [
        {
          path: '/admin/dashboard',
          name: 'dashBoardManeger',
          component: () => import('../views/admin/Pages/Dashboard/Index'),
          meta: {
            middleware: authAdmin
          }
        }
      ]
    },
    {
      path: '/admin',
      redirect: 'transactionManeger',
      component: () => import('../views/admin/Layouts/Default'),
      children: [
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
        }
      ]
    },
    {
      path: '/admin',
      redirect: 'courseManeger',
      component: () => import('../views/admin/Layouts/Default'),
      children: [
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
          component: () => import('../views/admin/Pages/Course/Details'),
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
        }
      ]
    },
    {
      path: '/admin',
      redirect: 'intersets',
      component: () => import('../views/admin/Layouts/Default'),
      children: [
        {
          path: '/admin/interests',
          name: 'intersets',
          component: () => import('../views/admin/Pages/Interests/Index'),
          meta: {
            middleware: authAdmin
          }
        }
      ]
    },
    {
      path: '/admin',
      redirect: 'category',
      component: () => import('../views/admin/Layouts/Default'),
      children: [
        {
          path: '/admin/category',
          name: 'category',
          component: () => import('../views/admin/Pages/Category/Index'),
          meta: {
            middleware: authAdmin
          }
        }
      ]
    },
    {
      path: '/admin',
      redirect: 'teacher',
      component: () => import('../views/admin/Layouts/Default'),
      children: [
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
          component: () => import('../views/admin/Pages/Teacher/Details'),
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
        }
      ]
    },
    {
      path: '/admin',
      redirect: 'user',
      component: () => import('../views/admin/Layouts/Default.vue'),
      children: [
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
          redirect: 'userInformation',
          component: () => import('../views/admin/Pages/User/Details'),
          children: [
            {
              path: '/admin/user/:id',
              name: 'userInformation',
              component: () => import('../views/admin/Pages/User/Information'),
              meta: {
                middleware: authAdmin
              }
            },
            {
              path: '/admin/user/:id/learning',
              name: 'userLearning',
              component: () => import('../views/admin/Pages/User/Learning'),
              meta: {
                middleware: authAdmin
              }
            }
          ]
        }
      ]
    },
    { path: '*', redirect: '/admin/course' }
  ],
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
