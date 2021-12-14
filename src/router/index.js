import { createRouter, createWebHistory } from 'vue-router'
import broadCast from '@/views/broadCast.vue'
import Dummy from '@/views/Dummy.vue'
import Home from "@/views/Home";

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
  },
  {
    path: '/dummy',
    name: 'Dummy',
    component: Dummy
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
