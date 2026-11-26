<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import LamaranSidebar from '../components/lamaran-sidebar.vue'

const route = useRoute()
// nanti dipakai untuk ambil data dari API Laravel: GET /api/lamaran/{id}
const lamaranId = route.params.id

// Data contoh. Ganti dengan response API.
const lamaran = {
  id: lamaranId,
  pelamar: 'Nanda Rezqy Agyun Putra', // nanti dari user yang login
  position: 'Staff Administrasi',
  tanggalLamar: '15 November 2026',
  company: {
    name: 'PT Maju Jaya',
    location: 'Purwosari, Kab. Pasuruan',
    website: 'www.majujaya.co.id',
  },
  riwayat: [
    { title: 'Lamaran Dikirim', note: '15 November 2026', state: 'done' },
    { title: 'Lamaran Diproses', note: '16 November 2026', state: 'done' },
    {
      title: 'Tidak Lolos Seleksi Administrasi',
      note: '17 November 2026 • Berkas Belum Memenuhi Kriteria',
      state: 'rejected',
    },
  ],
}

const bannerText = computed(
  () =>
    `Terima kasih atas partisipasi kamu. Mohon maaf, saat ini kualifikasi kamu belum sesuai dengan kebutuhan posisi ${lamaran.position} di ${lamaran.company.name}. Jangan patah semangat dan coba lowongan lainnya!`,
)

const pesan = computed(
  () =>
    `Yth. ${lamaran.pelamar}, terima kasih telah melamar posisi ${lamaran.position} di ${lamaran.company.name}. Setelah melalui proses peninjauan berkas yang ketat, dengan berat hati kami menginformasikan bahwa saat ini kami belum dapat melanjutkan lamaran Anda ke tahap berikutnya karena kuota dan kualifikasi yang dibutuhkan belum terpenuhi. Kami mengapresiasi minat Anda dan mendoakan kesuksesan dalam perjalanan karier Anda.`,
)
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </span>
          <div>
            <h3>Lamaran Belum Berhasil</h3>
            <p>{{ bannerText }}</p>
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
                :class="`timeline__item timeline__item--${r.state}`"
              >
                <span class="dot">
                  <svg v-if="r.state === 'done'" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <svg v-else width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </span>
                <div>
                  <strong>{{ r.title }}</strong>
                  <small>{{ r.note }}</small>
                </div>
              </li>
            </ol>
          </section>

          <section class="panel">
            <div class="panel__row">
              <h3 class="panel__title"><i></i>Jadwal Tes &amp; Wawancara</h3>
              <span class="pill pill--gray">Tidak Tersedia</span>
            </div>

            <div class="empty">
              <span class="empty__icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                  <path d="m10 14 4 4M14 14l-4 4" />
                </svg>
              </span>
              <strong>Tahapan Seleksi Berakhir</strong>
              <p>
                Proses rekrutmen untuk posisi ini telah selesai. Jadwal tes dan
                wawancara ditiadakan untuk lamaran ini.
              </p>
            </div>

            <div class="reco">
              <span class="reco__icon">i</span>
              <div class="reco__body">
                <strong>Rekomendasi BKK</strong>
                <p>
                  Perbarui portofolio atau sertifikat keahlian Anda, lalu temukan
                  peluang karier lainnya yang sesuai.
                </p>
              </div>
              <RouterLink :to="{ path: '/', hash: '#lowongan' }" class="reco__btn">
                Jelajahi Lowongan Lainnya
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </RouterLink>
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
            <p>{{ pesan }}</p>
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

/* Banner merah */
.banner {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: #fde8e8;
  border: 1px solid #f7c1c1;
  border-radius: 12px;
  padding: 18px;
}

.banner__icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #dc2626;
  color: #fff;
}

.banner h3 {
  font-size: 13px;
  font-weight: 700;
  color: #dc2626;
  margin-bottom: 4px;
}

.banner p {
  font-size: 10.5px;
  line-height: 1.6;
  color: #7f1d1d;
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

.pill--gray {
  font-size: 9.5px;
  font-weight: 600;
  color: #475569;
  background: #e5e7eb;
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

/* garis menuju step yang ditolak berwarna merah */
.timeline__item:nth-last-child(2)::before {
  background: #dc2626;
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
  display: block;
  font-size: 9.5px;
  line-height: 1.4;
  color: #64748b;
}

.timeline__item--rejected .dot {
  background: #dc2626;
}

.timeline__item--rejected strong {
  color: #dc2626;
}

/* Tahapan berakhir */
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #eceef1;
  border: 1px solid #e2e5ea;
  border-radius: 10px;
  padding: 22px 28px;
  margin-top: 14px;
}

.empty__icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: #f8f9fb;
  color: #64748b;
  margin-bottom: 8px;
}

.empty strong {
  font-size: 11px;
  color: #0f172a;
  margin-bottom: 6px;
}

.empty p {
  font-size: 9px;
  line-height: 1.6;
  color: #64748b;
}

/* Rekomendasi BKK */
.reco {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #e6f0fb;
  border: 1px solid #cfe0f5;
  border-radius: 10px;
  padding: 12px;
  margin-top: 12px;
}

.reco__icon {
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

.reco__body {
  flex: 1;
  min-width: 0;
}

.reco__body strong {
  display: block;
  font-size: 10px;
  color: #1d6fc2;
  margin-bottom: 2px;
}

.reco__body p {
  font-size: 9.5px;
  line-height: 1.5;
  color: #334155;
}

.reco__btn {
  flex-shrink: 0;
  align-self: center;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 9.5px;
  font-weight: 600;
  color: #0f172a;
  background: #fff;
  border: 1px solid #d5dbe3;
  border-radius: 6px;
  padding: 7px 10px;
  transition: background 0.2s;
}

.reco__btn:hover {
  background: #f1f5f9;
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
  line-height: 1.7;
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

  .reco {
    flex-wrap: wrap;
  }

  .reco__btn {
    align-self: flex-start;
  }
}
</style>