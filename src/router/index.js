import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home', 
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/log-in',
    name: 'log-in',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/admin-dashboard',
    name: 'admin-dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminDashboard.vue'),
    children: [
      {
        path: '/rooms',
        name: 'rooms',
        component: () => import(/* webpackChunkName: "about" */ '../components/Rooms.vue')
      },
      {
        path: '/room-types',
        name: 'room-types',
        component: () => import(/* webpackChunkName: "about" */ '../components/RoomTypes.vue')
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import(/* webpackChunkName: "about" */ '../components/Orders.vue')
      },
      {
        path: '/staffs',
        name: 'staffs',
        component: () => import(/* webpackChunkName: "about" */ '../components/Staffs.vue')
      },
      {
        path: '/posts',
        name: 'posts',
        component: () => import(/* webpackChunkName: "about" */ '../components/Posts.vue')
      },
    ]
  },
  {
    path: '/posts/:id',
    name: 'post-page',
    component: () => import(/* webpackChunkName: "about" */ '../views/PostPage.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
