import { createRouter, createWebHashHistory } from 'vue-router'
import index from '../views/index.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/resources',
    name: 'resources',
    component: () => import(/* webpackChunkName: "resources" */ '../views/resources.vue')
  },
  {
    path: '/videos',
    name: 'videos',
    component: () => import(/* webpackChunkName: "videos" */ '../views/videos.vue')
  },
  {
    path: '/docs',
    name: 'docs',
    component: () => import(/* webpackChunkName: "docs" */ '../views/docs.vue')
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import(/* webpackChunkName: "posts" */ '../views/posts.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
