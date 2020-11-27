/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  // 城市店铺管理首页
  {
    path: '/',
    name: 'shopHomepage',
    component: () => import(/* webpackChunkName: "shopHomepage" */ '../views/ShopHomepage/index.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/Test/index.vue')
  }
  // {
  //   path: '/404',
  //   name: 'error',
  //   meta: {
  //     title: '404'
  //   },
  //   component: () => import(/* webpackChunkName: 'error' */ '../views/Error.vue')
  // },
  // {
  //   path: '*', // 此处需特别注意置于最底部
  //   redirect: '/404'
  // }
  // {
  // path: '/',
  // component: () => import('@/views/layouts/index'),
  // redirect: '/home',
  // meta: {
  //   title: '首页',
  //   keepAlive: false
  // },
  // children: [
  //   {
  //     path: '/home',
  //     name: 'Home',
  //     component: () => import('@/views/home/index'),
  //     meta: { title: '首页', keepAlive: false }
  //   },
  //   {
  //     path: '/about',
  //     name: 'About',
  //     component: () => import('@/views/home/about'),
  //     meta: { title: '关于我', keepAlive: false }
  //   }
  // ]
  // }
]
