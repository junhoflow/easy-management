import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/sign.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/usermain',
    component: () => import('../views/UserMain.vue')
  },
  {
    path: '/vuex',
    component: () => import('../views/vuex.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/admin_users',
    component: () => import('../views/Admin_users.vue')
  },
  {
    path: '/sign',
    component: () => import('../views/sign.vue')
  },
  {
    path: '/userInfo',
    component: () => import('../views/UserInfo.vue')
  },
  {
    path: '/register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/*',
    component: () => import('../views/e404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (Vue.prototype.$isFirebaseAuth) next()
})

export default router
