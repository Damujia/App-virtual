import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home.vue'
import login from '@/views/login.vue'
import order from '@/components/order.vue'
import detail from '@/components/detail.vue'
import badinfo from '@/components/badinfo.vue'
import stockinfo from '@/components/stockinfo.vue'
import badditail from '@/components/badditail.vue'
import orderinfo from '@/components/orderinfo.vue'
import badmore from '@/components/badmore.vue'
import badrepairmore from '@/components/badrepairmore.vue'
import stockMore from '@/components/stockMore.vue'
import stockout from '@/components/stockout.vue'
import ordermore from '@/components/ordermore.vue'

// 主页


Vue.use(VueRouter)

const routes = [
  {
    name: 'default',
    path: '/',
    redirect: { name: 'home' }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: {name: 'order'},
    children: [
      {
        path: '/order',
        name: 'order',
        component: order
      },
      {
        path: '/detail',
        name: 'detail',
        component: detail
      },
      {
        path: '/badinfo',
        name: 'badinfo',
        component: badinfo
      },
      {
        path: '/stockinfo',
        name: 'stockinfo',
        component: stockinfo
      },
      {
        path: '/badditail',
        name: 'badditail',
        component: badditail
      },
      {
        path: '/orderinfo',
        name: 'orderinfo',
        component: orderinfo
      },
      {
        path: '/badmore',
        name: 'badmore',
        component: badmore
      },
      {
        path: '/badrepairmore',
        name: 'badrepairmore',
        component: badrepairmore
      },
      {
        path: '/stockMore',
        name: 'stockMore',
        component: stockMore
      },
      {
        path: '/stockout',
        name: 'stockout',
        component: stockout
      },
      {
        path: '/ordermore',
        name: 'ordermore',
        component: ordermore
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
