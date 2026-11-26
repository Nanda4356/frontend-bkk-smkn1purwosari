
<script setup>
import logoImg from '../assets/images/logo bkk.png'

defineProps({
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <div class="auth">
    <div class="auth__card">
      <div class="auth__content">
        <img :src="logoImg" alt="Logo BKK" class="auth__logo" />

        <h1>Welcome To BKK SMKN 1 Purwosari</h1>

        <p class="auth__lead">{{ subtitle }}</p>

        <slot />

        <p class="auth__terms">
          Dengan mendaftar, Anda menyetujui
          <a href="#">Ketentuan Layanan</a> &amp;
          <a href="#">Kebijakan Privasi</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #fff4e3;
}

.auth__card {
  width: 100%;
  max-width: 390px;
  padding: 32px 30px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 8px 35px rgba(0, 0, 0, 0.07);
}

.auth__content {
  width: 100%;
  text-align: center;
}

.auth__logo {
  width: 55px;
  height: 55px;
  object-fit: contain;
  margin-bottom: 12px;
}

.auth__content h1 {
  font-size: 21px;
  font-weight: 600;
  line-height: 1.3;
  color: #111827;
  margin: 0 0 8px;
}

.auth__lead {
  font-size: 11px;
  line-height: 1.6;
  color: var(--text);
  margin: 0 0 20px;
}

.auth__terms {
  font-size: 9px;
  line-height: 1.5;
  color: var(--muted);
  margin: 18px 0 0;
}

.auth__terms a {
  color: #111827;
  font-weight: 600;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth {
    padding: 16px;
  }

  .auth__card {
    padding: 28px 22px;
  }
}
</style>
