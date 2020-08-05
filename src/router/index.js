import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

  const requireAtuth = (to, from, next) => {
    // 로그인 후 이동할 페이지 설정
    const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
    store.getters.isAuth ? next() : next(loginPath)
  }
  const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: requireAtuth,
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/board/:id',
    name: 'Board',
    beforeEnter: requireAtuth,
    component: () => import('@/views/boards/Board.vue'),
    children: [
      {
        path: 'card/:cid',
        beforeEnter: requireAtuth,
        component: () => import('@/views/boards/Card.vue'),
      }
    ]

  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/accounts/Login.vue'),
  },
  {
    path: '*',
    component: () => import('@/views/NotFoundPage.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
