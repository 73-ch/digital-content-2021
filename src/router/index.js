import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home";
import Dummy from '@/views/Dummy.vue'
import Concept from '@/views/Concept.vue'
import Credit from '@/views/Credit.vue'
import CalibrationTest from '@/views/CalibrationTest.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dummy',
    name: 'Dummy',
    component: Dummy
  },
  {
    path: '/concept',
    name: 'Concept',
    component: Concept
  },
  {
    path: '/credit',
    name: 'Credit',
    component: Credit
  },
  {
    path: '/calibration-test',
    name: 'CalibrationTest',
    component: CalibrationTest
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
