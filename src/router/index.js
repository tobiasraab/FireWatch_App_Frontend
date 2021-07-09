import { createRouter, createWebHashHistory } from 'vue-router'
import Login from './../views/Login.vue'
import Register from './../views/Register.vue'
import Dashboard from './../views/Dashboard.vue'
import AddForest from './../components/AddForest.vue'
import store from './../store/store'


const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/addForest',
    name: 'AddForest',
    component: AddForest
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// only logged in users can view the Dashboard
router.beforeEach((to, from, next) => {
  if((to.name === 'Dashboard' || to.name === 'AddForest') && !store.state.isAuthenticated){
    next({name: 'Login'})
  }
  else next()
})

export default router
