import { createRouter, createWebHistory } from 'vue-router'
import GeocodeView from '../views/GeocodeView.vue'
import TabelJudete from '../views/TabelJudete.vue'
import Membri_Tabel from '../views/MembriTabel.vue'
import UserSettings from '../views/SetariProfil.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: GeocodeView
  },
  {
    path: '/tabel',
    name: 'Tabel Judete',
    component: TabelJudete
  },
  {
    path: '/membri',
    name: 'Membri Tabel',
    component: Membri_Tabel
  },
  {
    path: '/setariProfil',
    name: 'Setari Profil',
    component: UserSettings
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
