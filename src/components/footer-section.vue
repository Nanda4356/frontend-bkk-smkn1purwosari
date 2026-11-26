<script setup>
import { ref } from 'vue'
import logoImg from '../assets/images/logo bkk.png'

const year = new Date().getFullYear()
const email = ref('')

const navigasi = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Visi & Misi', href: '#tentang' },
  { label: 'Lowongan Kerja', href: '#lowongan' },
  { label: 'Perusahaan Mitra', href: '#mitra' },
  { label: 'Informasi & Berita', href: '#berita' },
]

const informasi = [
  { label: 'Informasi Rekrutmen', href: '#informasi' },
  { label: 'Berita & Kegiatan', href: '#berita' },
  { label: 'Informasi Karier', href: '#informasi' },
  { label: 'Layanan Alumni', href: '#alumni' },
]

function kirim() {
  // nanti dihubungkan ke API Laravel (POST /api/subscribe)
  if (!email.value) return
  alert(`Terima kasih! Info terbaru akan dikirim ke ${email.value}`)
  email.value = ''
}
</script>

<template>
  <footer class="footer">
    <div class="footer__inner container">
      <div class="footer__grid">
        <!-- Brand -->
        <div class="footer__brand">
          <div class="footer__logo">
            <img :src="logoImg" alt="Logo BKK SMKN 1 Purwosari" />
            <strong>BKK SMKN 1 PURWOSARI</strong>
          </div>
          <p>
            Pusat informasi dan layanan karier untuk membantu siswa dan alumni
            menemukan peluang kerja sesuai kompetensi.
          </p>
        </div>

        <!-- Navigasi -->
        <nav class="footer__col">
          <h4>NAVIGASI</h4>
          <ul>
            <li v-for="n in navigasi" :key="n.label">
              <a :href="n.href">{{ n.label }}</a>
            </li>
          </ul>
        </nav>

        <!-- Informasi -->
        <nav class="footer__col">
          <h4>INFORMASI</h4>
          <ul>
            <li v-for="i in informasi" :key="i.label">
              <a :href="i.href">{{ i.label }}</a>
            </li>
          </ul>
        </nav>

        <!-- Newsletter -->
        <div class="footer__news">
          <h4>DAPATKAN INFO TERBARU</h4>
          <form @submit.prevent="kirim">
            <label class="footer__input">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 6L2 7" />
              </svg>
              <input v-model="email" type="email" placeholder="Masukkan Email Anda" required />
            </label>
            <button type="submit">Kirim Email</button>
          </form>
        </div>
      </div>

      <hr class="footer__line" />

      <div class="footer__bottom">
        <span>© {{ year }} BKK SMKN 1 Purwosari. All rights reserved.</span>

        <div class="footer__social">
          <a href="#" aria-label="Twitter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 5.9c-.7.3-1.5.5-2.4.6.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.7a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.8.1.5 1.6 2 2.8 3.8 2.9A8.2 8.2 0 0 1 2 18.5 11.6 11.6 0 0 0 8.3 20.3c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.2z" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 8V6.5c0-.7.2-1 1.2-1H17V2h-2.7C11.4 2 10 3.6 10 6v2H8v3.5h2V22h4V11.5h2.8L17.3 8H14z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #1a7fc4;
  color: #fff;
  padding: 44px 0 24px;
}

.footer__inner {
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
}

.footer__grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
  gap: 36px;
  align-items: start;
}

/* ---------- Brand ---------- */
.footer__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.footer__logo img {
  width: 44px;
  height: 44px;
  object-fit: contain;
}

.footer__logo strong {
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.footer__brand p {
  font-size: 12px;
  line-height: 1.7;
  max-width: 280px;
  opacity: 0.95;
}

/* ---------- Kolom link ---------- */
.footer h4 {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 14px;
}

.footer__col ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.footer__col a {
  font-size: 12px;
  opacity: 0.95;
  transition: opacity 0.2s, padding-left 0.2s;
}

.footer__col a:hover {
  opacity: 1;
  padding-left: 4px;
}

/* ---------- Newsletter ---------- */
.footer__news h4 {
  font-size: 10px;
}

.footer__input {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 6px;
  padding: 0 10px;
  margin-bottom: 10px;
}

.footer__input input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: 0;
  outline: 0;
  color: #fff;
  font-family: inherit;
  font-size: 11px;
  padding: 10px 0;
}

.footer__input input::placeholder {
  color: rgba(255, 255, 255, 0.85);
}

.footer__news button {
  width: 100%;
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background: #1d5fd8;
  border: 0;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  transition: background 0.2s;
}

.footer__news button:hover {
  background: #1648a8;
}

/* ---------- Bawah ---------- */
.footer__line {
  border: 0;
  height: 1px;
  margin: 28px 0 18px;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.7), transparent);
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-size: 11px;
}

.footer__social {
  display: flex;
  gap: 18px;
}

.footer__social a {
  display: grid;
  place-items: center;
  opacity: 0.95;
  transition: transform 0.2s, opacity 0.2s;
}

.footer__social a:hover {
  opacity: 1;
  transform: translateY(-2px);
}

/* ---------- Responsif ---------- */
@media (max-width: 960px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer__brand,
  .footer__news {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .footer__grid {
    grid-template-columns: 1fr;
  }

  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>