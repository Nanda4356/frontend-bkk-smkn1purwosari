<script setup>
// import bgImg from '../assets/images/auth-bg.png'
import logoImg from '../assets/images/logo bkk.png'

defineProps({
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <div class="auth">
    <div class="auth__card">
      <div class="auth__image">
        <img :src="bgImg" alt="SMKN 1 Purwosari" />
      </div>

      <div class="auth__panel">
        <div class="auth__content">
          <img :src="logoImg" alt="Logo BKK" class="auth__logo" />
          <h1>Welcome To BKK SMKN 1 Purwosari</h1>
          <p class="auth__lead">{{ subtitle }}</p>

          <slot />

          <p class="auth__terms">
            Dengan mendaftar, Anda menyetujui
            <a href="#">Ketentuan Layanan</a> &amp; <a href="#">Kebijakan Privasi</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #fff4e3;
  padding: 24px;
}

.auth__card {
  width: 100%;
  max-width: 980px;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 8px;
  background: #fff;
  border-radius: 6px;
  padding: 14px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
}

.auth__image {
  border-radius: 14px;
  overflow: hidden;
  min-height: 560px;
}

.auth__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.auth__panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 28px;
}

.auth__content {
  width: 100%;
  max-width: 360px;
  text-align: center;
}

.auth__logo {
  width: 56px;
  height: 56px;
  object-fit: contain;
  margin-bottom: 14px;
}

.auth__content h1 {
  font-size: 26px;
  font-weight: 500;
  line-height: 1.2;
  color: #111827;
  margin-bottom: 10px;
}

.auth__lead {
  font-size: 11px;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 18px;
}

.auth__terms {
  font-size: 10px;
  color: var(--muted);
  margin-top: 22px;
}

.auth__terms a {
  color: #111827;
  font-weight: 600;
  text-decoration: underline;
}

@media (max-width: 820px) {
  .auth__card {
    grid-template-columns: 1fr;
  }

  .auth__image {
    display: none;
  }
}
</style>

<!-- Gaya form dipakai bersama oleh halaman login & register (tidak scoped, class diawali "auth-") -->
<style>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
}

.auth-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.auth-input {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #d5dbe3;
  border-radius: 6px;
  padding: 0 10px;
  color: #6b7280;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.auth-input:focus-within {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(24, 125, 193, 0.12);
}

.auth-input svg {
  flex-shrink: 0;
}

.auth-input input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  font-family: inherit;
  font-size: 11px;
  color: #111827;
  padding: 10px 0;
}

.auth-input input::placeholder {
  color: #9ca3af;
}

.auth-error {
  font-size: 11px;
  color: #dc2626;
  text-align: left;
}

.auth-submit {
  width: 100%;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: var(--blue);
  border: 0;
  border-radius: 6px;
  padding: 11px;
  margin-top: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.auth-submit:hover {
  background: var(--blue-dark);
}

.auth-switch {
  font-size: 11px;
  color: #111827;
  margin-top: 14px;
}

.auth-switch a {
  color: var(--blue);
  font-weight: 600;
  text-decoration: underline;
}

.auth-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 10px;
  color: var(--muted);
  margin: 14px 0;
}

.auth-divider::before,
.auth-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}
</style>