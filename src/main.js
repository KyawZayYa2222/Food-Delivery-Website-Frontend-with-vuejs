import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import './assets/fontawesome/css/all.css'
import VueRouter from 'vue-router'
import { logout } from './logout.js'
import { userAuth, adminAuth, preventRepeatAuth } from './authenticate'

import TemplateIndex from './admin/TemplateIndex'
import DashboardLayout from './admin/layout/DashboardLayout'
import CategoryLayout from './admin/layout/CategoryLayout'
import ProductLayout from './admin/layout/ProductLayout'
import OrderLayout from './admin/layout/OrderLayout'
import ProfileLayout from './admin/layout/ProfileLayout'
import RegisterLayout from './admin/layout/RegisterLayout'
import ContactLayout from './admin/layout/ContactLayout'
import ProductCreateLayout from './admin/layout/ProductCreateLayout'

import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import ServicePage from './pages/ServicePage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CartPage from './pages/CartPage'
import ProfilePage from './pages/ProfilePage'

Vue.use(VueRouter);



const routes = [
  // Admin routes 
    {
      path: '/admin',
      name: 'admin',
      beforeEnter: adminAuth,
      component: TemplateIndex,
      children: [
        {
        path: '',
        component: DashboardLayout,
        },
        {
          path: 'category',
          component: CategoryLayout,
        },
        {
          path: 'product',
          component: ProductLayout,
        },
        {
          path: 'product/create',
          component: ProductCreateLayout,
        },
        {
          path: 'order',
          component: OrderLayout,
        },
        {
          path: 'profile',
          component: ProfileLayout,
        },
        {
          path: 'register',
          component: RegisterLayout,
        },
        {
          path: '/admin/contact',
          component: ContactLayout,
        },
      ]
      
    },

  // User routes 
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuPage,
    },
    {
      path: '/service',
      name: 'service',
      component: ServicePage
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: preventRepeatAuth,
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      beforeEnter: preventRepeatAuth,
      component: RegisterPage
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: logout
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage,
      beforeEnter: userAuth
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
      beforeEnter: userAuth
    },
]

const router = new VueRouter ({
  mode: 'history',
  routes
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
