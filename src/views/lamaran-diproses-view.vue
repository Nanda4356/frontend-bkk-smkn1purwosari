<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
// nanti dipakai untuk ambil data dari API Laravel: GET /api/lamaran/{id}
const lamaranId = route.params.id

// Data contoh. Ganti dengan response API.
const lamaran = {
  id: lamaranId,
  status: 'diproses', // dikirim | diproses | selesai
  position: 'Staff Administrasi',
  tanggalLamar: '15 November 2026',
  company: {
    name: 'PT Maju Jaya',
    location: 'Purwosari, Kab. Pasuruan',
    website: 'www.majujaya.co.id',
  },
  dates: {
    dikirim: '15 November 2026',
    diproses: '16 November 2026',
  },
  pesan:
    'Terima kasih telah melamar posisi Staff Administrasi di PT Maju Jaya. Saat ini berkas administrasi Anda sedang dalam tahap peninjauan oleh tim rekrutmen kami.',
}

const rekomendasi = [
  { id: 1, title: 'Staff Admin Gudang', company: 'PT Sumber Makmur Pasuruan', type: 'Full Time', salary: 'Rp 3.2 - 3.8 jt' },
  { id: 2, title: 'Operator Data Entry', company: 'CV Global Mandiri Logistik', type: 'Kontrak', salary: 'Rp 3.0 - 3.5 jt' },
]

// Teks banner sesuai status
const statusInfo = {
  dikirim: {
    title: 'Lamaran Terkirim',
    text: 'Lamaran kamu sudah diterima dan menunggu giliran untuk ditinjau oleh tim HRD.',
  },
  diproses: {
    title: 'Lamaran Sedang Diproses',
    text: `Berkas lamaran kamu sedang ditinjau dan diverifikasi oleh tim HRD ${lamaran.company.name}. Harap periksa berkas dan pantau notifikasi secara berkala.`,
  },
  selesai: {
    title: 'Seleksi Administrasi Selesai',
    text: 'Hasil seleksi administrasi sudah keluar. Cek notifikasi untuk informasi selanjutnya.',
  },
}

const banner = computed(() => statusInfo[lamaran.status])

// Riwayat lamaran: step sebelum status aktif = done, step aktif = current, sisanya pending
const order = ['dikirim', 'diproses', 'selesai']
const steps = computed(() => {
  const active = order.indexOf(lamaran.status)
  const list = [
    { key: 'dikirim', title: 'Lamaran Dikirim', note: lamaran.dates.dikirim },
    { key: 'diproses', title: 'Lamaran Diproses', note: `${lamaran.dates.diproses} (Sedang Berlangsung)` },
    { key: 'selesai', title: 'Seleksi Administrasi / Keputusan', note: 'Menunggu hasil peninjauan berkas' },
  ]
  return list.map((s, i) => ({
    ...s,
    state: i < active ? 'done' : i === active ? 'current' : 'pending',
  }))
})
</script>

<template>
  <div class="page">
    <div class="layout">
      <!-- ============ SIDEBAR ============ -->
      <aside class="side">
        <!-- Perusahaan -->
        <section class="box company">
          <div class="company__head">
            <span class="company__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="4" y="3" width="16" height="18" rx="1" />
                <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
              </svg>
            </span>
            <div>
              <h3>{{ lamaran.company.name }}</h3>
              <span class="verified">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Mitra Resmi BKK
              </span>
            </div>
          </div>

          <ul class="company__info">
            <li>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {{ lamaran.company.location }}
            </li>
            <li>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
              </svg>
              {{ lamaran.company.website }}
            </li>
          </ul>
        </section>

        <!-- Rekomendasi -->
        <section class="box reko">
          <div class="reko__head">
            <h4><i></i>Rekomendasi BKK</h4>
            <span class="pill pill--blue">Tersedia</span>
          </div>

          <div v-for="r in rekomendasi" :key="r.id" class="reko__item">
            <div class="reko__top">
              <strong>{{ r.title }}</strong>
              <span class="tag">{{ r.type }}</span>
            </div>
            <p>{{ r.company }}</p>
            <div class="reko__foot">
              <span>{{ r.salary }}</span>
              <a href="#" class="reko__apply">
                Lamar
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <!-- Bantuan -->
        <section class="box help">
          <h4>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#1d6fc2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Butuh bantuan?
          </h4>
          <p>Hubungi tim BKK SMKN 1 Purwosari untuk konsultasi seputar lamaran.</p>
          <a href="https://wa.me/6280000000000" target="_blank" rel="noopener" class="help__btn">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Chat WhatsApp BKK
          </a>
        </section>
      </aside>

      <!-- ============ KONTEN UTAMA ============ -->
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9" />
              <polyline points="12 7 12 12 15 14" />
            </svg>
          </span>
          <div>
            <h3>{{ banner.title }}</h3>
            <p>{{ banner.text }}</p>
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
              <li v-for="s in steps" :key="s.key" :class="`timeline__item timeline__item--${s.state}`">
                <span class="dot">
                  <svg v-if="s.state === 'done'" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <svg v-else-if="s.state === 'current'" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 7 12 12 15 14" />
                  </svg>
                </span>
                <div>
                  <strong>{{ s.title }}</strong>
                  <small>{{ s.note }}</small>
                </div>
              </li>
            </ol>
          </section>

          <section class="panel">
            <div class="panel__row">
              <h3 class="panel__title"><i></i>Jadwal Tes &amp; Wawancara</h3>
              <span class="pill pill--soft">Menunggu Konfirmasi</span>
            </div>

            <div class="empty">
              <span class="empty__icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                  <rect x="10" y="14" width="4" height="4" rx="0.5" />
                </svg>
              </span>
              <strong>Jadwal Belum Ditentukan</strong>
              <p>
                Jadwal tes tertulis &amp; wawancara akan ditentukan setelah berkas
                lamaran Anda dinyatakan lolos seleksi administrasi.
              </p>
            </div>

            <div class="notice">
              <span class="notice__icon">i</span>
              <div>
                <strong>Informasi Penting</strong>
                <p>
                  Notifikasi hasil seleksi administrasi akan dikirimkan melalui
                  email dan portal BKK dalam 2–3 hari kerja.
                </p>
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

.box,
.job,
.panel,
.message {
  background: #f8f9fb;
  border: 1px solid #eef0f4;
  border-radius: 12px;
}

/* ---------- Sidebar ---------- */
.side {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.company {
  padding: 16px;
}

.company__head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.company__icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: #dbeafe;
  color: #1d6fc2;
}

.company h3 {
  font-size: 12.5px;
  font-weight: 700;
  color: #0f172a;
}

.verified {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 9px;
  font-weight: 600;
  color: #1d6fc2;
  background: #e0edfb;
  padding: 2px 8px;
  border-radius: 999px;
  margin-top: 3px;
}

.company__info {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 10px;
  color: #475569;
}

.company__info li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reko {
  padding: 14px;
  background: #fff;
}

.reko__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.reko__head h4,
.panel__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  color: #0f172a;
}

.reko__head i,
.panel__title i {
  display: inline-block;
  width: 3px;
  height: 14px;
  border-radius: 2px;
  background: #1d6fc2;
}

.pill {
  font-size: 8.5px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
}

.pill--blue {
  color: #1d6fc2;
  background: #e0edfb;
}

.pill--soft {
  color: #1d6fc2;
  background: #e0edfb;
  font-size: 9.5px;
  padding: 4px 12px;
}

.reko__item {
  border: 1px solid #eef0f4;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 8px;
}

.reko__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
}

.reko__top strong {
  font-size: 10.5px;
  color: #0f172a;
}

.tag {
  font-size: 8px;
  color: #475569;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  padding: 1px 6px;
  border-radius: 4px;
}

.reko__item p {
  font-size: 9px;
  color: #64748b;
  margin: 2px 0 8px;
}

.reko__foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #eef0f4;
  font-size: 10px;
  color: #0f172a;
}

.reko__apply {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 600;
  color: #1d6fc2;
}

.help {
  padding: 14px;
  background: #fff;
}

.help h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 6px;
}

.help p {
  font-size: 9px;
  line-height: 1.5;
  color: #64748b;
  margin-bottom: 10px;
}

.help__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 600;
  color: #1d6fc2;
  background: #e8f1fc;
  border: 1px solid #cfe0f5;
  border-radius: 6px;
  padding: 8px;
  transition: background 0.2s;
}

.help__btn:hover {
  background: #d8e8fa;
}

/* ---------- Konten utama ---------- */
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

.banner {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: #e6f0fb;
  border: 1px solid #cfe0f5;
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
  background: #1d6fc2;
  color: #fff;
}

.banner h3 {
  font-size: 13px;
  font-weight: 700;
  color: #1d6fc2;
  margin-bottom: 4px;
}

.banner p {
  font-size: 10.5px;
  line-height: 1.6;
  color: #334155;
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
  background: #d7dee8;
}

.dot {
  flex-shrink: 0;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #cbd5e1;
  z-index: 1;
}

.timeline__item--done .dot,
.timeline__item--current .dot {
  background: #1d6fc2;
}

.timeline__item--pending .dot {
  width: 9px;
  height: 9px;
  margin: 4px;
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

.timeline__item--current strong {
  color: #1d6fc2;
}

.timeline__item--pending strong {
  color: #64748b;
  font-weight: 500;
}

/* Jadwal */
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
  color: #1d6fc2;
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

.notice {
  display: flex;
  gap: 10px;
  background: #e6f0fb;
  border: 1px solid #cfe0f5;
  border-radius: 10px;
  padding: 12px;
  margin-top: 12px;
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
  background: #f8f9fb;
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

/* ---------- Responsif ---------- */
@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .side {
    order: 2;
  }
}

@media (max-width: 720px) {
  .duo {
    grid-template-columns: 1fr;
  }
}
</style>