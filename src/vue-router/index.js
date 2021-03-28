import Vue from 'vue'
import VueRouter from 'vue-router'
import { vueRoutes } from './vueRoutes'
import { store, vuexTypes } from '@/vuex'
import _get from 'lodash/get'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: vueRoutes.app,
    },
    {
      path: '/sign-in',
      name: vueRoutes.signIn.name,
      component: _ => import('@/vue/pages/SignIn'),
      beforeEnter: authPageGuard,
    },
    {
      path: '/sign-up',
      name: vueRoutes.signUp.name,
      component: _ => import('@/vue/pages/SignUp'),
      beforeEnter: authPageGuard,
    },
    {
      path: '/',
      name: vueRoutes.app.name,
      component: _ => import('@/vue/AppContent'),
      beforeEnter: redirectRouteGuard,
      children: [
        {
          path: '/dashboard',
          name: vueRoutes.dashboard.name,
          component: _ => import('@/vue/pages/Dashboard'),
          beforeEnter: inAppRouteGuard,
        },
        {
          path: '/marketplace',
          name: vueRoutes.marketplace.name,
          component: _ => import('@/vue/pages/Marketplace'),
          redirect: vueRoutes.marketplaceList,
          children: [
            {
              path: '/marketplace/list',
              name: vueRoutes.marketplaceList.name,
              component: _ => import('@/vue/pages/Marketplace/MarketplaceList'),
              beforeEnter: inAppRouteGuard,
            },
          ],
        },
      ],
    },
  ],
})

function redirectRouteGuard (to, from, next) {
  const isLoggedIn = store.getters[vuexTypes.isLoggedIn]

  if (isLoggedIn) {
    if (to.name === vueRoutes.app.name) {
      next(vueRoutes.dashboard)
    } else {
      next()
    }
  } else {
    next(vueRoutes.signIn)
  }
}

function authPageGuard (to, from, next) {
  const isLoggedIn = store.getters[vuexTypes.isLoggedIn]
  isLoggedIn ? next(vueRoutes.app) : next()
}

function inAppRouteGuard (to, from, next) {
  const isAccountCorporate = store.getters[vuexTypes.isAccountCorporate]
  const isAccountGeneral = store.getters[vuexTypes.isAccountGeneral]

  const isCorporateRouter = _get(to, 'meta.isCorporateOnly')
  const isGeneralRouter = _get(to, 'meta.isGeneralOnly')

  const isDisabled = _get(to, 'meta.isDisabled')

  if (isDisabled) {
    next(vueRoutes.app)
  } else if (isAccountCorporate && isCorporateRouter) {
    next()
  } else if (isAccountGeneral && isGeneralRouter) {
    next()
  } else if (!isCorporateRouter && !isGeneralRouter) {
    next()
  } else {
    next(vueRoutes.app)
  }
}

export default router
