<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthLayout from '../components/auth-layout.vue'
import AuthSocial from '../components/auth-social.vue'

const form = ref({
  username: '',
  nisn: '',
  email: '',
  password: '',
  password_confirmation: '',
})
const error = ref('')

function daftar() {
  error.value = ''

  if (form.value.password !== form.value.password_confirmation) {
    error.value = 'Konfirmasi password tidak sama.'
    return
  }

  // nanti dihubungkan ke API Laravel (POST /api/register)
  console.log('register:', form.value)
}
</script>

<template>
  <AuthLayout subtitle="Buat akun untuk mulai melamar lowongan kerja dari perusahaan mitra SMKN 1 Purwosari.">
    <AuthSocial compact />

    <form class="auth-form" @submit.prevent="daftar">
      <div class="auth-row">
        <label class="auth-input">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <input v-model="form.username" type="text" placeholder="Isi username anda" required />
        </label>

        <label class="auth-input">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="9" cy="11" r="2" />
            <path d="M15 9h3M15 13h3M6 17c.5-1.5 1.7-2 3-2s2.500.5 3 2" />
          </svg>
          <input v-model="form.nisn" type="text" inputmode="numeric" placeholder="Isi NISN anda" required />
        </label>
      </div>

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
        <input v-model="form.password" type="password" placeholder="Isi password anda" minlength="8" required />
      </label>

      <label class="auth-input">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="7.5" cy="15.5" r="4.5" />
          <path d="m10.7 12.3 9.8-9.8M16 7l3 3M14 9l2 2" />
        </svg>
        <input v-model="form.password_confirmation" type="password" placeholder="Konfirmasi password anda" required />
      </label>

      <p v-if="error" class="auth-error">{{ error }}</p>

      <button type="submit" class="auth-submit">Sign Up</button>
    </form>

    <p class="auth-switch">
      Sudah Memiliki Akun ? <RouterLink to="/login">Sign In</RouterLink>
    </p>
  </AuthLayout>
</template>