
<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import logo from '../assets/images/logo bkk.png'

const open = ref(false)
const activeSection = ref('beranda')

const links = [
  { label: 'Beranda', href: '#beranda', id: 'beranda' },
  { label: 'Tentang Kami', href: '#tentang', id: 'tentang' },
  { label: 'Lowongan Kerja', href: '#lowongan', id: 'lowongan' },
  { label: 'Perusahaan Mitra', href: '#mitra', id: 'mitra' },
  { label: 'Informasi & Berita', href: '#informasi', id: 'informasi' },
]

let observer = null

function closeMenu() {
  open.value = false
}

function goToSection(id) {
  closeMenu()

  const target = document.getElementById(id)

  if (!target) {
    console.error(`Section dengan id "${id}" tidak ditemukan`)
    return
  }

  activeSection.value = id

  const navbarHeight = 68
  const targetPosition =
    target.getBoundingClientRect().top + window.scrollY

  window.scrollTo({
    top: Math.max(0, targetPosition - navbarHeight),
    behavior: 'smooth',
  })
}

function observeSections() {
  if (observer) {
    observer.disconnect()
  }

  const sections = links
    .map(link => document.getElementById(link.id))
    .filter(Boolean)

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => {
          return a.boundingClientRect.top - b.boundingClientRect.top
        })

      if (visible.length > 0) {
        activeSection.value = visible[0].target.id
      }
    },
    {
      root: null,
      rootMargin: '-15% 0px -70% 0px',
      threshold: 0,
    }
  )

  sections.forEach(section => observer.observe(section))
}

onMounted(async () => {
  await nextTick()
  observeSections()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <header class="navbar">
    <div class="navbar__container">
      <div class="navbar__inner">

        <a
          href="#beranda"
          class="navbar__brand"
          @click.prevent="goToSection('beranda')"
        >
          <img :src="logo" alt="Logo BKK" />

          <span class="navbar__brand-text">
            Bursa Kerja
            <span class="teks-khusus">Khusus</span>
          </span>
        </a>

        <nav
          class="navbar__menu"
          :class="{ 'is-open': open }"
        >
          <a
            v-for="link in links"
            :key="link.id"
            :href="link.href"
            :class="{ active: activeSection === link.id }"
            @click.prevent="goToSection(link.id)"
          >
            {{ link.label }}
          </a>

          <RouterLink
            to="/login"
            class="btn-login navbar__login-mobile"
            @click="closeMenu"
          >
            Login
          </RouterLink>
        </nav>

        <RouterLink
          to="/login"
          class="btn-login navbar__login-desktop"
        >
          Login
        </RouterLink>

        <button
          class="navbar__toggle"
          :class="{ 'is-active': open }"
          aria-label="Menu"
          :aria-expanded="open"
          @click="open = !open"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
}

.navbar__container {
  max-width: 1218px;
  width: calc(100% - 48px);
  margin: 0 auto;
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: 68px;
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.2;
  text-decoration: none;
}

.navbar__brand-text {
  color: #000274;
}

.navbar__brand .teks-khusus {
  display: block;
  color: #186da7;
}

.navbar__brand img {
  width: 44px;
  height: 44px;
  object-fit: contain;
}

.navbar__menu {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  height: 100%;
  font-size: 12px;
  font-weight: 500;
}

.navbar__menu a:not(.btn-login) {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  color: var(--text);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s;
}

.navbar__menu a:not(.btn-login)::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 14px;
  width: 100%;
  height: 2px;
  border-radius: 3px;
  background: var(--blue);
  transform: scaleX(0);
  transition: transform 0.25s ease;
}

.navbar__menu a:not(.btn-login):hover,
.navbar__menu a:not(.btn-login).active {
  color: var(--blue);
}

.navbar__menu a:not(.btn-login).active::after {
  transform: scaleX(1);
}

.btn-login {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--blue);
  color: #fff !important;
  font-size: 13px;
  font-weight: 600;
  padding: 11px 28px;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.2s;
  white-space: nowrap;
}

.btn-login:hover {
  background: var(--blue-dark);
}

.navbar__login-mobile {
  display: none;
}

.navbar__toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: 0;
  padding: 8px;
  cursor: pointer;
}

.navbar__toggle span {
  width: 24px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: 0.2s;
}

@media (max-width: 1024px) {
  .navbar__menu {
    gap: 20px;
  }

  .navbar__container {
    width: calc(100% - 40px);
  }
}

@media (max-width: 860px) {
  .navbar__inner {
    height: 68px;
  }

  .navbar__toggle {
    display: flex;
  }

  .navbar__login-desktop {
    display: none;
  }

  .navbar__login-mobile {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    margin-top: 12px;
  }

  .navbar__menu {
    position: absolute;
    top: 68px;
    left: 0;
    right: 0;
    height: auto;
    background: #fff;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 12px 24px 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    display: none;
  }

  .navbar__menu.is-open {
    display: flex;
  }

  .navbar__menu a:not(.btn-login) {
    height: auto;
    padding: 14px 0;
  }

  .navbar__menu a:not(.btn-login)::after {
    display: none;
  }
}

@media (max-width: 480px) {
  .navbar__container {
    width: calc(100% - 32px);
  }

  .navbar__brand img {
    width: 40px;
    height: 40px;
  }
}
</style>
