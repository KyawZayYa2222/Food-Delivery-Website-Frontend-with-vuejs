import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import './assets/fontawesome/css/all.css'
import VueRouter from 'vue-router'
import { logout } from './logout.js'
import { userAuth, adminAuth, preventRepeatAuth } from './authenticate'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config'

import TemplateIndex from './admin/TemplateIndex'
import DashboardLayout from './admin/layout/DashboardLayout'
import CategoryLayout from './admin/layout/CategoryLayout'
import ProductLayout from './admin/layout/ProductLayout'
import OrderLayout from './admin/layout/OrderLayout'
import ProfileLayout from './admin/layout/ProfileLayout'
import RegisterLayout from './admin/layout/RegisterLayout'
import ContactLayout from './admin/layout/ContactLayout'
import GiveawayLayout from './admin/layout/GiveawayLayout'
import PromotionLayout from './admin/layout/PromotionLayout'
import PromotionList from './admin/components/PromotionList'
import PromotionCreate from './admin/components/PromotionCreate'
import PromotionUpdate from './admin/components/PromotionUpdate'
import ProductCreate from './admin/components/ProductCreate'
import ProductUpdate from './admin/components/ProductUpdate'
import ProductList from './admin/components/ProductList'

import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import ServicePage from './pages/ServicePage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CartPage from './pages/CartPage'
import ProfilePage from './pages/ProfilePage'
import Toasted from 'vue-toasted'

// firebase 
initializeApp(firebaseConfig);

Vue.use(Toasted, {
  position: 'top-right',
  duration: 2500,
  keepOnHover: true,
})

Vue.use(VueRouter);

// routes 
const routes = [
  // Admin routes 
    {
      path: '/admin',
      name: 'admin',
      beforeEnter: adminAuth,
      component: TemplateIndex,
      children: [
        {
        name: 'dashboard',
        path: '',
        component: DashboardLayout,
        },
        {
          name: 'adminCategory',
          path: 'category',
          component: CategoryLayout,
        },
        {
          name: 'adminGiveaway',
          path: 'giveaway',
          component: GiveawayLayout,
        },
        {
          name: 'adminPromotion',
          path: 'promotion',
          component: PromotionLayout,
          children: [
            {
              name: 'adminPromotionList',
              path: 'list',
              component: PromotionList
            },
            {
              name: 'adminPromotionCreate',
              path: 'create',
              component: PromotionCreate,
            },
            {
              name: 'adminPromotionUpdate',
              path: ':id/update', 
              component: PromotionUpdate,
            }
          ]
        },
        {
          name: 'adminProduct',
          path: 'product',
          component: ProductLayout,
          children: [
            {
              name: 'adminProductList',
              path: 'list',
              component: ProductList,
            },
            {
              name: 'adminProductCreate',
              path: 'create',
              component: ProductCreate,
            },
            {
              name: 'adminProductUpdate',
              path: ':id/update',
              component: ProductUpdate,
            },
          ]
        },
        {
          name: 'adminOrder',
          path: 'order',
          component: OrderLayout,
        },
        {
          name: 'adminProfile',
          path: 'profile',
          component: ProfileLayout,
        },
        {
          name: 'adminRegister',
          path: 'register',
          component: RegisterLayout,
        },
        {
          name: 'adminContact',
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
