import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import broadCast from '../views/broadCast.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/broadCast',
    name: 'broadCast',
    component: broadCast
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
