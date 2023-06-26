import { createRouter, createWebHashHistory } from 'vue-router'
import index from '../views/index.vue'
// import background from '../views/testdemo.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    props: true,
  }, 
  //  {
  //   path: '/background',
  //   name: 'background',
  //   component: background,
  //   props: true,
  // },
  {
    path: '/background',
    name: 'background',
    component: () => import(/* webpackChunkName: "resources" */ '../views/testdemo.vue'),
    props: true
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
  }, {
    path: '/testdemo',
    name: 'testdemo',
    component: () => import(/* webpackChunkName: "tetestdemosta.vue" */ '../views/testdemo.vue'),
    props: true
  },
  {
    path: '/docDetail/:id',
    name: 'docDetail',
    component: () => import(/* webpackChunkName: "docDetail.vue" */ '../views/docDetail.vue'),
    props: true
  },
  {
    path: '/showMdDoc/:id',
    name: 'showMdDoc',
    component: () => import(/* webpackChunkName: "showMdDoc.vue" */ '../views/showMdDoc.vue'),
    props: true
  },
  {
    path: '/myDocs',
    name: 'myDocs',
    component: () => import(/* webpackChunkName: "myDocs.vue" */ '../views/myDocs.vue'),
    props: true
  },
  {
    path: '/docDetailUpdate/:id',
    name: 'docDetailUpdate',
    component: () => import(/* webpackChunkName: "docDetailUpdate.vue" */ '../views/docDetailUpdate.vue'),
    props: true
  },
  {
    path: '/paymentbutton',
    name: 'Paymentbutton',
    component: () => import(/* webpackChunkName: "Paymentbutton.vue" */ '../views/PaymentButton.vue'),
    props: true
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  // mode:'history'
  routes
})

export default router
