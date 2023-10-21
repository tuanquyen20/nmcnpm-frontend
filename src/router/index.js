import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'; // Nếu store nằm ở thư mục gốc của dự án


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
    meta: {
      requiresAdmin: true,
    },
    children: [
      {
        path: '/rooms',
        name: 'rooms',
        meta: {
          requiresAdmin: true,

        },
        component: () => import(/* webpackChunkName: "about" */ '../components/Rooms.vue')
      },
      {
        path: '/room-types',
        name: 'room-types',
        meta: {
          requiresAdmin: true,

        },
        component: () => import(/* webpackChunkName: "about" */ '../components/RoomTypes.vue')
      },
      {
        path: '/orders',
        name: 'orders',
        meta: {
          requiresAdmin: true,

        },
        component: () => import(/* webpackChunkName: "about" */ '../components/Orders.vue')
      },
      {
        path: '/staffs',
        name: 'staffs',
        meta: {
          requiresAdmin: true,

        },
        component: () => import(/* webpackChunkName: "about" */ '../components/Staffs.vue')
      },
      {
        path: '/posts',
        name: 'posts',
        meta: {
          requiresAdmin: true,

        },
        component: () => import(/* webpackChunkName: "about" */ '../components/Posts.vue')
      },

      {
        path: '/users',
        name: 'users',
        meta: {
          requiresAdmin: true,

        },
        component: () => import(/* webpackChunkName: "about" */ '../components/Users.vue')
      },

      {
        path: '/my-posts',
        name: 'my-posts',
        meta: {
          requiresAdmin: true,

        },
        component: () => import(/* webpackChunkName: "about" */ '../components/MyPosts.vue')
      },
    ]
  },
  {
    path: '/posts/:id',
    name: 'post-page',
    component: () => import(/* webpackChunkName: "about" */ '../views/PostPage.vue')
  },

  {
    path: '/customer-dashboard',
    name: 'customer-dashboard',
    meta: {
      requiresCustomer: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/CustomerDashboard.vue'),
    children: [
      {
        path: '/my-posts-customer',
        name: 'my-posts-customer',
        meta: {
          requiresCustomer: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '../components/MyPostsCustomer.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdmin) {
    if (!store.state.isLogged) {
      next('/log-in');
    } else {
      if(store.state.isAdmin) {
        next();
      }
    }
  } else {
    if (to.meta.requiresCustomer) {
      if (!store.state.isLogged) {
        next('/log-in');
      } else {
        if(!store.state.isAdmin) {
          next();
        } 
      }
    } else {
      next();
    }
  }
});

export default router
