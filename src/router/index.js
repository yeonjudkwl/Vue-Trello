import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/board/:id',
    name: 'Board',
    component: () => import('@/views/boards/Board.vue'),
    children: [
      {
        path: 'card/:cid',
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
