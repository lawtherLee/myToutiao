import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/ ',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/ ',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/Home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import(/* webpackChunkName: 'QA' */ '@/views/QA')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import(/* webpackChunkName: 'Video' */ '@/views/Video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import(/* webpackChunkName: 'My' */ '@/views/My')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
