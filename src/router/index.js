import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/home-view.vue'
import LoginView from '../views/login-view.vue'
import RegisterView from '../views/register-view.vue'

import LamaranDiprosesView from '../views/lamaran-diproses-view.vue'
import LamaranDiterimaView from '../views/lamaran-diterima-view.vue'
import LamaranDitolakView from '../views/lamaran-ditolak-view.vue'

import AdminLayout from '../layouts/admin-layout.vue'
import DashboardView from '../views/admin/dashboard-view.vue'
import PlaceholderView from '../views/admin/placeholder-view.vue'
import AlumniView from '../views/admin/data-alumni-view.vue'
import PerusahaanView from '../views/admin/data-perusahaan-view.vue'
import LowonganView from '../views/admin/lowongan-view.vue'
import LamaranView from '../views/admin/lamaran-view.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },

    { path: '/lamaran/:id/diproses', name: 'lamaran-diproses', component: LamaranDiprosesView },
    { path: '/lamaran/:id/diterima', name: 'lamaran-diterima', component: LamaranDiterimaView },
    { path: '/lamaran/:id/ditolak', name: 'lamaran-ditolak', component: LamaranDitolakView },


    {
      path: '/admin',
      component: AdminLayout,
      children: [
        { path: '', name: 'admin-dashboard', component: DashboardView },
         { path: 'alumni', name: 'admin-alumni', component: AlumniView },
        { path: 'perusahaan', component: PerusahaanView },
        { path: 'lowongan', component: LowonganView },
        { path: 'lamaran', component: LamaranView },
        { path: 'jadwal', name: 'admin-jadwal', component: PlaceholderView, meta: { title: 'Jadwal Rekrutmen' } },
        { path: 'laporan', name: 'admin-laporan', component: PlaceholderView, meta: { title: 'Laporan Penempatan' } },
        { path: 'pengumuman', name: 'admin-pengumuman', component: PlaceholderView, meta: { title: 'Pengumuman' } },
        { path: 'akun', name: 'admin-akun', component: PlaceholderView, meta: { title: 'Buat Akun' } },
      ],
    },
  ],
})

export default router