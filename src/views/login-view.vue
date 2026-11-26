<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthLayout from '../components/auth-layout.vue'
import AuthSocial from '../components/auth-social.vue'

const form = ref({ email: '', password: '' })

function masuk() {
  // nanti dihubungkan ke API Laravel (POST /api/login)
  console.log('login:', form.value)
}
</script>

<template>
  <AuthLayout subtitle="Masuk untuk melihat dan melamar lowongan kerja dari perusahaan mitra SMKN 1 Purwosari.">
    <AuthSocial />

    <div class="auth-divider">Or</div>

    <form class="auth-form" @submit.prevent="masuk">
      <label class="auth-input">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 6L2 7" />
        </svg>
        <input v-model="form.email" type="email" placeholder="johndoe@gmail.com" required />
      </label>

      <label class="auth-input">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="7.5" cy="15.5" r="4.5" />
          <path d="m10.7 12.3 9.8-9.8M16 7l3 3M14 9l2 2" />
        </svg>
        <input v-model="form.password" type="password" placeholder="Masukkan password anda" required />
      </label>

      <button type="submit" class="auth-submit">Sign In</button>
    </form>

    <p class="auth-switch">
      Belum Memiliki Akun ? <RouterLink to="/register">Sign Up</RouterLink>
    </p>
  </AuthLayout>
</template>