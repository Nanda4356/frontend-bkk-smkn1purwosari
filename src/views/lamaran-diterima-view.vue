<script setup>
import { useRoute, RouterLink } from 'vue-router'
import LamaranSidebar from '../components/lamaran-sidebar.vue'

const route = useRoute()
// nanti dipakai untuk ambil data dari API Laravel: GET /api/lamaran/{id}
const lamaranId = route.params.id

// Data contoh. Ganti dengan response API.
const lamaran = {
  id: lamaranId,
  position: 'Staff Administrasi',
  tanggalLamar: '15 November 2026',
  company: {
    name: 'PT Maju Jaya',
    location: 'Purwosari, Kab. Pasuruan',
    website: 'www.majujaya.co.id',
  },
  riwayat: [
    { title: 'Lamaran Dikirim', date: '15 November 2026' },
    { title: 'Lamaran Diproses', date: '16 November 2026' },
    { title: 'Lamaran Diterima', date: '17 November 2026', final: true },
  ],
  jadwal: {
    tanggal: '20 November 2026',
    waktu: '09.00 WIB',
    lokasi: 'Kantor PT Maju Jaya',
    jenis: 'Tes Tertulis dan Wawancara',
  },
  catatan: 'Harap hadir 15 menit sebelum jadwal dimulai dan membawa dokumen yang diperlukan.',
  pesan:
    'Selamat! Kamu lolos seleksi administrasi. Silakan mengikuti tes dan wawancara sesuai jadwal yang telah ditentukan.',
}
</script>

<template>
  <div class="page">
    <div class="layout">
      <LamaranSidebar :company="lamaran.company" />

      <main class="main">
        <RouterLink to="/lamaran-saya" class="back">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Kembali ke Lamaran Saya
        </RouterLink>

        <h1>Detail Lamaran</h1>
        <p class="sub">Informasi perkembangan lamaran pekerjaan kamu.</p>

        <!-- Banner status -->
        <section class="banner">
          <span class="banner__icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <div>
            <h3>Lamaran Diterima</h3>
            <p>Selamat! Kamu lolos seleksi administrasi dan dapat melanjutkan ke tahap berikutnya.</p>
          </div>
        </section>

        <!-- Kartu posisi -->
        <section class="job">
          <span class="job__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="4" y="3" width="16" height="18" rx="1" />
              <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
            </svg>
          </span>
          <div>
            <h2>{{ lamaran.position }}</h2>
            <p class="job__company">{{ lamaran.company.name }}</p>
            <p class="job__date">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              Tanggal melamar: {{ lamaran.tanggalLamar }}
            </p>
          </div>
        </section>

        <!-- Riwayat + Jadwal -->
        <div class="duo">
          <section class="panel">
            <h3 class="panel__title"><i></i>Riwayat Lamaran</h3>

            <ol class="timeline">
              <li
                v-for="r in lamaran.riwayat"
                :key="r.title"
                :class="r.final ? 'timeline__item timeline__item--final' : 'timeline__item'"
              >
                <span class="dot">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div>
                  <strong>{{ r.title }}</strong>
                  <small>{{ r.date }}</small>
                </div>
              </li>
            </ol>
          </section>

          <section class="panel">
            <div class="panel__row">
              <h3 class="panel__title"><i></i>Jadwal Tes &amp; Wawancara</h3>
              <span class="pill pill--green">Jadwal Tersedia</span>
            </div>

            <ul class="schedule">
              <li>
                <span class="schedule__label">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  Tanggal
                </span>
                <strong>{{ lamaran.jadwal.tanggal }}</strong>
              </li>
              <li>
                <span class="schedule__label">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 7 12 12 15 14" />
                  </svg>
                  Waktu
                </span>
                <strong>{{ lamaran.jadwal.waktu }}</strong>
              </li>
              <li>
                <span class="schedule__label">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Lokasi
                </span>
                <strong>{{ lamaran.jadwal.lokasi }}</strong>
              </li>
              <li>
                <span class="schedule__label">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 11l3 3 8-8" />
                    <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h9" />
                  </svg>
                  Jenis Seleksi
                </span>
                <strong>{{ lamaran.jadwal.jenis }}</strong>
              </li>
            </ul>

            <div class="notice">
              <span class="notice__icon">i</span>
              <div>
                <strong>Informasi Penting</strong>
                <p>{{ lamaran.catatan }}</p>
              </div>
            </div>
          </section>
        </div>

        <!-- Pesan perusahaan -->
        <section class="message">
          <span class="message__icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          <div>
            <h3>Pesan dari Perusahaan</h3>
            <p>{{ lamaran.pesan }}</p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #fff;
  padding: 28px 24px 56px;
}

.layout {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;
  align-items: start;
}

.job,
.panel,
.message {
  background: #f8f9fb;
  border: 1px solid #eef0f4;
  border-radius: 12px;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  font-size: 10.5px;
  font-weight: 600;
  color: #1d6fc2;
}

.main h1 {
  font-size: 26px;
  font-weight: 800;
  color: #0b1f4d;
  line-height: 1.1;
  margin-top: -4px;
}

.sub {
  font-size: 11px;
  color: #64748b;
  margin-top: -8px;
}

/* Banner hijau */
.banner {
  display: flex;
  gap: 14px;
  align-items: center;
  background: #d3f6e0;
  border: 1px solid #a8e6c1;
  border-radius: 12px;
  padding: 18px;
}

.banner__icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #16a34a;
  color: #fff;
}

.banner h3 {
  font-size: 13px;
  font-weight: 700;
  color: #15803d;
  margin-bottom: 4px;
}

.banner p {
  font-size: 10.5px;
  line-height: 1.6;
  color: #166534;
}

.job {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
}

.job__icon {
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: #dbeafe;
  color: #1d6fc2;
}

.job h2 {
  font-size: 17px;
  font-weight: 700;
  color: #0f172a;
}

.job__company {
  font-size: 12px;
  color: #475569;
  margin-top: 2px;
}

.job__date {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 9.5px;
  color: #64748b;
  margin-top: 8px;
}

.duo {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 14px;
  align-items: stretch;
}

.panel {
  padding: 18px;
}

.panel__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.panel__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  color: #0f172a;
}

.panel__title i {
  display: inline-block;
  width: 3px;
  height: 14px;
  border-radius: 2px;
  background: #1d6fc2;
}

.pill--green {
  font-size: 9.5px;
  font-weight: 600;
  color: #fff;
  background: #16a34a;
  padding: 4px 12px;
  border-radius: 999px;
}

/* Timeline */
.timeline {
  list-style: none;
  padding: 0;
  margin-top: 18px;
}

.timeline__item {
  position: relative;
  display: flex;
  gap: 12px;
  padding-bottom: 22px;
}

.timeline__item:last-child {
  padding-bottom: 0;
}

.timeline__item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 20px;
  bottom: 2px;
  width: 1.5px;
  background: #1d6fc2;
}

.dot {
  flex-shrink: 0;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #1d6fc2;
  z-index: 1;
}

.timeline__item strong {
  display: block;
  font-size: 11px;
  color: #0f172a;
}

.timeline__item small {
  font-size: 9.5px;
  color: #64748b;
}

.timeline__item--final .dot {
  background: #16a34a;
}

.timeline__item--final strong {
  color: #16a34a;
}

/* Jadwal */
.schedule {
  list-style: none;
  padding: 0;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.schedule li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-size: 10.5px;
}

.schedule__label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #475569;
}

.schedule li strong {
  color: #0f172a;
  font-weight: 700;
  text-align: right;
}

.notice {
  display: flex;
  gap: 10px;
  background: #e6f0fb;
  border: 1px solid #cfe0f5;
  border-radius: 10px;
  padding: 12px;
  margin-top: 16px;
}

.notice__icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: #1d6fc2;
}

.notice strong {
  display: block;
  font-size: 10px;
  color: #1d6fc2;
  margin-bottom: 2px;
}

.notice p {
  font-size: 9.5px;
  line-height: 1.5;
  color: #334155;
}

/* Pesan */
.message {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 18px;
}

.message__icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: #1d6fc2;
}

.message h3 {
  font-size: 12px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
}

.message p {
  font-size: 10.5px;
  line-height: 1.6;
  color: #475569;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .duo {
    grid-template-columns: 1fr;
  }
}
</style>