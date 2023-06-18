import { createRouter, createWebHashHistory } from 'vue-router'
import index from '../views/index.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    props: true,
    // beforeEnter: (to, from, next) => {
    //   // 在返回到 index.vue 时调用 App.vue 的方法
    //   if (from.name === 'login') {
    //     // 如果是从 login.vue 返回到 index.vue
    //     App.methods.performActionOnIndex();
    //   }
    //   next();
    // }
  },
  {
    path: '/resources',
    name: 'resources',
    component: () => import(/* webpackChunkName: "resources" */ '../views/resources.vue'),
    props: true
  },
  {
    path: '/videos',
    name: 'videos',
    component: () => import(/* webpackChunkName: "videos" */ '../views/videos.vue'),
    props: true
  },
  {
    path: '/docs',
    name: 'docs',
    component: () => import(/* webpackChunkName: "docs" */ '../views/docs.vue'),
    props: true
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import(/* webpackChunkName: "posts" */ '../views/posts.vue'),
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    props: true
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register.vue'),
    props: true
  },  {
    path: '/Vue',
    name: 'Vue',
    component: () => import(/* webpackChunkName: "Vue" */ '../App.vue'),
    props: true
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
