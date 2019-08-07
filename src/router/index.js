import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },
  {
    path: '/familyDoctor',
    component: Layout,
    redirect: '/familyDoctor/index',
    meta: { title: '家庭医生', icon: 'doctor'},
    children: [
      {
        path: 'index',
        name: 'familyDoctor',
        // redirect: 'index',
        component: () => import('@/views/familyDoctor/index'),
        meta: { title: '家庭医生', icon: 'doctor' }
      },
      {
        hidden: true,
        path: '/community/index/:orgId',
        name: 'communityInfo',
        // redirect: '/familyDoctor/community/index',
        component: () => import('@/views/familyDoctor/community/index'),
        meta: { title: '社区详细', icon: 'form' }
      },
      {
        hidden: true,
        path: '/teamDetail/index/:teamId/:orgId',
        name: 'teamDetail',
        // redirect: '/familyDoctor/teamDetail/index',
        component: () => import('@/views/familyDoctor/teamDetail/index'),
        meta: { title: '签约详细', icon: 'form' }
      },
      {
        hidden: true,
        path: '/agreement/index/:userId',
        name: 'agreement',
        // redirect: '/familyDoctor/teamDetail/index',
        component: () => import('@/views/familyDoctor/agreement/index'),
        meta: { title: '履约详细', icon: 'form' }
      }
    ]
  },
  {
    path: '/hospital',
    component: Layout,
    redirect: '/hospital',
    children: [
      {
        // hidden: true,
        path: 'index',
        name: 'hospital',
        component: () => import('@/views/hospital/index'),
        meta: { title: '医院', icon: 'hospital' }
      },
      {
        hidden: true,
        path: '/detail/index/:orgId',
        name: 'hospitalDetail',
        // redirect: '/familyDoctor/community/index',
        component: () => import('@/views/hospital/detail/index'),
        meta: { title: '医院详细', icon: 'form' }
      }
    ]
  },
  {
    path: '/bothWay',
    component: Layout,
    redirect: '/bothWay',
    children: [
      {
        path: 'index',
        name: 'bothWay',
        component: () => import('@/views/bothWay/index'),
        meta: { title: '双向转诊', icon: 'referral' }
      },
      {
        hidden: true,
        path: '/statistics/index',
        name: 'bothWayStatistics',
        // redirect: '/familyDoctor/community/index',
        component: () => import('@/views/bothWay/statistics/index'),
        meta: { title: '转诊统计', icon: 'form' }
      },
      {
        hidden: true,
        path: '/statistics/detail',
        name: 'bothWayStatisticsDetail',
        // redirect: '/familyDoctor/community/index',
        component: () => import('@/views/bothWay/statistics/detail'),
        meta: { title: '转诊统计详细', icon: 'form' }
      }
    ]
  },
  {
    path: '/healthRecord',
    component: Layout,
    redirect: '/healthRecord',
    children: [
      {
        path: 'index',
        name: 'HealthRecord',
        component: () => import('@/views/healthRecord/healthRecord'),
        meta: { title: '健康档案', icon: 'data' }
      }
    ]
  },
  {
    path: '/healthHut',
    component: Layout,
    redirect: '/healthHut',
    children: [
      {
        path: 'index',
        name: 'healthHut',
        component: () => import('@/views/healthHut/healthHut.vue'),
        meta: { title: '健康小屋', icon: 'hut' }
      }
    ]
  },
  {
    path: '/set',
    component: Layout,
    redirect: '/set',
    children: [
      {
        path: 'index',
        name: 'set',
        component: () => import('@/views/set/set'),
        meta: { title: '设置', icon: 'set' }
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
