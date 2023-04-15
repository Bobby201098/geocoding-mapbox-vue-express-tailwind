import { createRouter, createWebHistory } from 'vue-router'
import GeocodeView from '../views/GeocodeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: GeocodeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
