import { createRouter, createWebHistory } from 'vue-router'
import broadCast from '@/views/broadCast.vue'
import Dummy from '@/views/Dummy.vue'
import Home from "@/views/Home";
import Concept from '@/views/Concept.vue'
import Credit from '@/views/Credit.vue'
import YoutubeViewer from "@/views/YoutubeViewer";
import YoutubeViewer2 from "@/views/YoutubeViewer2";

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
    path: '/viewer',
    name: 'Viewer',
    component: YoutubeViewer,
  },{
    path: '/viewer2',
    name: 'Viewer2',
    component: YoutubeViewer2,
  },
  {
    // それ以外はホーム画面に遷移
    path: '/:notFound(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
