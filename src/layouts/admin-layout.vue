<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import logoImg from '../assets/images/logo bkk.png'

const router = useRouter()
const open = ref(false)

const menu = [
  {
    title: 'UTAMA',
    items: [
      { label: 'Dashboard', icon: 'bi-grid', to: '/admin', exact: true },
      { label: 'Data Alumni', icon: 'bi-people', to: '/admin/alumni' },
    ],
  },
  {
    title: 'KEMITRAAN & OPERASIONAL',
    items: [
      { label: 'Data Perusahaan', icon: 'bi-building', to: '/admin/perusahaan' },
      { label: 'Lowongan Kerja', icon: 'bi-briefcase', to: '/admin/lowongan' },
      { label: 'Lamaran', icon: 'bi-file-earmark-text', to: '/admin/lamaran' },
      { label: 'Jadwal Rekrutmen', icon: 'bi-calendar-event', to: '/admin/jadwal' },
      { label: 'Laporan Penempatan', icon: 'bi-bar-chart', to: '/admin/laporan' },
    ],
  },
  {
    title: 'PENGATURAN & INFORMASI',
    items: [
      { label: 'Pengumuman', icon: 'bi-megaphone', to: '/admin/pengumuman' },
      { label: 'Buat Akun', icon: 'bi-person-plus', to: '/admin/akun' },
    ],
  },
]

// Dashboard hanya menyala di /admin persis.
// Menu lain tetap menyala di sub-halamannya, mis. /admin/lowongan/tambah.
const linkProps = (item) =>
  item.exact
    ? { to: item.to, exactActiveClass: 'is-active' }
    : { to: item.to, activeClass: 'is-active' }

function keluar() {
  // nanti hapus token login (API Laravel: POST /api/logout)
  router.push('/login')
}
</script>

<template>
  <div class="admin">
    <div v-if="open" class="backdrop" @click="open = false"></div>

    <!-- Sidebar -->
    <aside class="side" :class="{ open }">
      <div class="brand">
        <img :src="logoImg" alt="Logo BKK" />
        <div>
          <strong>Bursa Kerja Khusus</strong>
          <small>SMKN 1 Purwosari</small>
        </div>
      </div>

      <nav class="nav">
        <div v-for="g in menu" :key="g.title" class="group">
          <p class="group__title">{{ g.title }}</p>
          <RouterLink
            v-for="item in g.items"
            :key="item.label"
            v-bind="linkProps(item)"
            class="link"
            @click="open = false"
          >
            <i class="bi" :class="item.icon"></i>
            {{ item.label }}
          </RouterLink>
        </div>
      </nav>

      <button type="button" class="logout" @click="keluar">
        <i class="bi bi-box-arrow-left"></i>
        Keluar
      </button>
    </aside>

    <!-- Area konten -->
    <div class="body">
      <header class="topbar">
        <button type="button" class="burger" aria-label="Menu" @click="open = !open">
          <i class="bi bi-list"></i>
        </button>

        <label class="search">
          <i class="bi bi-search"></i>
          <input type="search" placeholder="Cari alumni, lowongan, mitra..." />
        </label>

        <div class="topbar__right">
          <button type="button" class="icon-btn" aria-label="Pesan">
            <i class="bi bi-envelope"></i>
          </button>
          <button type="button" class="icon-btn" aria-label="Notifikasi">
            <i class="bi bi-bell"></i>
            <span class="dot"></span>
          </button>

          <div class="profile">
            <span class="avatar">DR</span>
            <div class="profile__text">
              <strong>Davina Revalita</strong>
              <small>Admin BKK</small>
            </div>
          </div>
        </div>
      </header>

      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin {
  display: grid;
  grid-template-columns: 210px 1fr;
  min-height: 100vh;
  background: #f5f7fb;
  color: #0f172a;
}

/* ---------- Sidebar ---------- */
.side {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-right: 1px solid #eef0f4;
  padding: 16px 12px;
  overflow-y: auto;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 6px 16px;
}

.brand img {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.brand strong {
  display: block;
  font-size: 11px;
  line-height: 1.2;
  color: #0b2a6f;
}

.brand small {
  font-size: 9px;
  color: #64748b;
}

.group {
  margin-bottom: 14px;
}

.group__title {
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #94a3b8;
  padding: 0 8px;
  margin-bottom: 6px;
}

.link {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  font-weight: 500;
  color: #475569;
  padding: 9px 10px;
  border-radius: 8px;
  transition: background 0.15s, color 0.15s;
}

.link i {
  font-size: 13px;
}

.link:hover {
  background: #f1f5f9;
}

.link.is-active {
  background: #eaf1fe;
  color: #1d4ed8;
  font-weight: 600;
}

.logout {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  font-family: inherit;
  font-size: 11px;
  font-weight: 500;
  color: #dc2626;
  background: #fef2f2;
  border: 0;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
}

.logout:hover {
  background: #fee2e2;
}

/* ---------- Topbar ---------- */
.body {
  min-width: 0;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 14px;
  background: #fff;
  border-bottom: 1px solid #eef0f4;
  padding: 10px 22px;
}

.burger {
  display: none;
  background: none;
  border: 0;
  font-size: 22px;
  cursor: pointer;
}

.search {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 280px;
  max-width: 100%;
  background: #f5f7fb;
  border: 1px solid #e8ecf2;
  border-radius: 8px;
  padding: 0 12px;
  color: #94a3b8;
}

.search input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  font-family: inherit;
  font-size: 11px;
  padding: 9px 0;
}

.topbar__right {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.icon-btn {
  position: relative;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  background: #fff;
  border: 1px solid #e8ecf2;
  border-radius: 8px;
  color: #475569;
  cursor: pointer;
}

.dot {
  position: absolute;
  top: 6px;
  right: 7px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ef4444;
}

.profile {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 6px;
}

.avatar {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 10px;
  font-weight: 700;
}

.profile__text strong {
  display: block;
  font-size: 10.5px;
  line-height: 1.2;
}

.profile__text small {
  font-size: 9px;
  color: #64748b;
}

.content {
  padding: 22px;
}

/* ---------- Responsif ---------- */
@media (max-width: 960px) {
  .admin {
    grid-template-columns: 1fr;
  }

  .side {
    position: fixed;
    z-index: 30;
    left: 0;
    width: 230px;
    transform: translateX(-100%);
    transition: transform 0.25s;
  }

  .side.open {
    transform: translateX(0);
  }

  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 20;
    background: rgba(15, 23, 42, 0.4);
  }

  .burger {
    display: block;
  }

  .profile__text {
    display: none;
  }
}
</style>