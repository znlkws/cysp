import { createRouter, createWebHashHistory } from 'vue-router'

const isOnlyCategory = location.href.indexOf('.cn') > -1

const routes = isOnlyCategory ? [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "main" */ '../views/category/Index.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
] : [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "main" */ '../views/home/Index.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import(/* webpackChunkName: "main" */ '../views/category/Index.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "main" */ '../views/contact/Index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "main" */ '../views/about/Index.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // ✅ 命中 /category 时，一定回到顶部
    if (to.path === '/category') {
      return { top: 0 }
    }

    // 浏览器前进 / 后退
    if (savedPosition) {
      return savedPosition
    }

    // 默认行为
    return { top: 0 }
  }
})

export default router
