import Vue from "vue";
import VueRouter from 'vue-router'
import { logout } from './logout.js'
import { userAuth, adminAuth, preventRepeatAuth } from './authenticate.js'

import TemplateIndex from './admin/TemplateIndex'
import DashboardLayout from './admin/layout/DashboardLayout'
import CategoryLayout from './admin/layout/CategoryLayout'
import ProductLayout from './admin/layout/ProductLayout'
import OrderLayout from './admin/layout/OrderLayout'
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
import FeedbackLayout from './admin/layout/FeedbackLayout'
import SlideshowLayout from './admin/layout/SlideshowLayout'
import SlideshowList from './admin/components/SlideshowList'
import SlideshowView from './admin/components/SlideshowView'
import SlideshowCreate from './admin/components/SlideshowCreate'
import SlideshowUpdate from './admin/components/SlideshowUpdate'
import PaymentLayout from './admin/layout/PaymentLayout'

import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import ServicePage from './pages/ServicePage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CartPage from './pages/CartPage'
import ProfilePage from './pages/ProfilePage'

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
      {name: 'dashboard', path: '', component: DashboardLayout},
      {name: 'adminCategory', path: 'category', component: CategoryLayout},
      {name: 'adminGiveaway', path: 'giveaway', component: GiveawayLayout},
      {name: 'adminOrder', path: 'order', component: OrderLayout,},
      {name: 'adminPayment', path: 'payment', component: PaymentLayout,},
      {name: 'adminRegister', path: 'register', component: RegisterLayout},
      {name: 'adminContact', path: '/admin/contact', component: ContactLayout},
      {name: 'adminFeedback', path: '/admin/feedback', component: FeedbackLayout},
      {
        name: 'adminPromotion',
        path: 'promotion',
        component: PromotionLayout,
        children: [
          {name: 'adminPromotionList', path: 'list', component: PromotionList},
          {name: 'adminPromotionCreate', path: 'create', component: PromotionCreate},
          {name: 'adminPromotionUpdate', path: ':id/update', component: PromotionUpdate}
        ]
      },
      {
        name: 'adminProduct',
        path: 'product',
        component: ProductLayout,
        children: [
          {name: 'adminProductList', path: 'list', component: ProductList},
          {name: 'adminProductCreate', path: 'create', component: ProductCreate},
          {name: 'adminProductUpdate', path: ':id/update', component: ProductUpdate},
        ]
      },
      {
        name: 'adminSlideshow', 
        path: '/admin/slideshow',
        component: SlideshowLayout,
        children: [
          {name: 'adminSlideshowList', path: 'list', component: SlideshowList},
          {name: 'adminSlideshowView', path: '/view', component: SlideshowView, props: true},
          {name: 'adminSlideshowCreate', path: 'create', component: SlideshowCreate},
          {name: 'adminSlideshowUpdate', path: 'update', component: SlideshowUpdate, props: true},
        ]
      }
    ]
  },
  
// User routes 
  {path: '/', name: 'home', component: HomePage},
  {path: '/menu', name: 'menu', component: MenuPage},
  {path: '/service', name: 'service', component: ServicePage},
  {path: '/contact', name: 'contact', component: ContactPage},
  {path: '/login', name: 'login', beforeEnter: preventRepeatAuth, component: LoginPage},
  {path: '/register', name: 'register', beforeEnter: preventRepeatAuth, component: RegisterPage},
  {path: '/logout', name: 'logout', beforeEnter: logout},
  {path: '/cart', name: 'cart', component: CartPage, beforeEnter: userAuth},
  {path: '/profile', name: 'profile', component: ProfilePage, beforeEnter: userAuth},
]
  
const router = new VueRouter ({
  mode: 'history',
  routes
})

export default router;