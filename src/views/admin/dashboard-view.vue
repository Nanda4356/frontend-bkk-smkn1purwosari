<script setup>
import { ref, computed } from 'vue'

/* ============ GRAFIK KETERSERAPAN ============ */
// Data contoh. Nanti ganti dengan data dari API Laravel
const chartData = [
  { year: 2021, total: 380, bekerja: 240 },
  { year: 2022, total: 410, bekerja: 275 },
  { year: 2023, total: 450, bekerja: 330 },
  { year: 2024, total: 500, bekerja: 382 },
]

const chartMax = Math.max(...chartData.map((d) => d.total))

const bars = computed(() =>
  chartData.map((d) => ({
    ...d,
    totalH: (d.total / chartMax) * 100,
    bekerjaH: (d.bekerja / chartMax) * 100,
    percent: ((d.bekerja / d.total) * 100).toFixed(1),
  })),
)

const latest = computed(() => bars.value[bars.value.length - 1])

/* ============ PENGUMUMAN ============ */
const pengumuman = [
  {
    id: 1,
    tag: 'Rekrutmen',
    tone: 'blue',
    title: 'Rekrutmen PT Astra Honda Motor',
    desc: 'Walk-in interview dan tes kerja untuk lulusan SMKN 1 Purwosari tahun 2024.',
    date: '12 Okt 2024',
  },
  {
    id: 2,
    tag: 'Info Lain',
    tone: 'yellow',
    title: 'Pembekalan Program Magang & Kerja PT United Tractors Tbk',
    desc: 'Persiapkan berkas dan keterampilan kerja sebelum batas akhir pendaftaran.',
    date: '15 Okt 2024',
  },
]

/* ============ TABEL LAMARAN ============ */
const page = ref(1)
const perPage = 4
const total = 612

const lamaran = ref([
  { id: 1, name: 'Ahmad Fauzi', jurusan: 'TKJ', position: 'Teknisi Jaringan', company: 'PT Telkom Akses', date: '24 Des 2024', status: 'lolos' },
  { id: 2, name: 'Siti Nurhaliza', jurusan: 'RPL', position: 'Junior Web Developer', company: 'PT United Tractors', date: '21 Des 2024', status: 'lolos' },
  { id: 3, name: 'Dagus Prakoso', jurusan: 'AKT', position: 'Staff Akuntansi', company: 'PT Astra Honda Motor', date: '10 Des 2024', status: 'pending' },
  { id: 4, name: 'Rizky Aditya', jurusan: 'TKR', position: 'Operator Produksi', company: 'PT Indofood', date: '08 Des 2024', status: 'gagal' },
])

const statusMap = {
  lolos: { label: 'Lolos', cls: 'status--lolos' },
  pending: { label: 'Pending', cls: 'status--pending' },
  gagal: { label: 'Gagal', cls: 'status--gagal' },
}

const palette = [
  { bg: '#e0e9ff', fg: '#2563eb' },
  { bg: '#dcfce7', fg: '#16a34a' },
  { bg: '#ffedd5', fg: '#ea580c' },
  { bg: '#fce7f3', fg: '#db2777' },
]

function initials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function avatarStyle(name) {
  const c = palette[name.length % palette.length]
  return { background: c.bg, color: c.fg }
}

const pageCount = computed(() => Math.max(1, Math.ceil(total / perPage)))

// halaman aktif dan tetangganya, mis. 1 2 / 1 2 3 / 4 5 6
const pages = computed(() => {
  const end = Math.min(pageCount.value, Math.max(page.value + 1, 3))
  const list = []
  for (let p = Math.max(1, end - 2); p <= end; p++) list.push(p)
  return list
})

function go(p) {
  if (p < 1 || p > pageCount.value || p === page.value) return
  page.value = p
  // nanti: ambil data halaman baru dari API Laravel
}

/* ============ AKTIVITAS ============ */
const aktivitas = [
  { id: 1, who: 'Admin', text: 'menambahkan lowongan baru PT Astra Honda Motor (Operator Mesin CNC).', time: '2 jam yang lalu', tone: 'blue' },
  { id: 2, who: 'Alumni Ahmad Fauzi', text: 'mengirim lamaran ke PT Telkom Akses.', time: '3 jam yang lalu', tone: 'gray' },
  { id: 3, who: 'Status lamaran Siti Nurhaliza', text: 'di PT United Tractors diperbarui menjadi "Lolos".', time: 'Kemarin', tone: 'blue' },
  { id: 4, who: 'Admin BKK', text: 'memperbarui kontribusi alumni Angkatan 2024.', time: '2 hari yang lalu', tone: 'blue' },
]
</script>

<template>
  <div class="dash">
    <!-- Judul -->
    <header class="title">
      <h1>Dashboard</h1>
      <p>Sistem Informasi Bursa Kerja Khusus (BKK) SMKN 1 Purwosari</p>
    </header>

    <!-- ============ 4 KARTU STATISTIK (isi bebas per kartu) ============ -->
    <section class="stats">
      <!-- Kartu 1 -->
      <article class="stat stat--primary">
        <div class="stat__top">
          <div>
            <p class="stat__title">Total Alumni Terdaftar</p>
            <h3 class="stat__value">2,845</h3>
          </div>
          <span class="stat__icon stat__icon--white"><i class="bi bi-people-fill"></i></span>
        </div>
        <div class="stat__foot">
          <span class="badge badge--glass">+12%</span>
          <span class="stat__note">dari periode tahun lalu</span>
        </div>
      </article>

      <!-- Kartu 2 -->
      <article class="stat">
        <div class="stat__top">
          <div>
            <p class="stat__title">Perusahaan Mitra (DUDI)</p>
            <h3 class="stat__value">148</h3>
          </div>
          <span class="stat__icon stat__icon--green"><i class="bi bi-building"></i></span>
        </div>
        <div class="stat__foot">
          <span class="badge badge--green">+8 mitra</span>
          <span class="stat__note">bergabung bulan ini</span>
        </div>
      </article>

      <!-- Kartu 3 -->
      <article class="stat">
        <div class="stat__top">
          <div>
            <p class="stat__title">Lowongan Kerja Aktif</p>
            <h3 class="stat__value">36</h3>
          </div>
          <span class="stat__icon stat__icon--blue"><i class="bi bi-briefcase"></i></span>
        </div>
        <div class="stat__foot">
          <span class="badge badge--green">+5 baru</span>
          <span class="stat__note">minggu ini</span>
        </div>
      </article>

      <!-- Kartu 4 -->
      <article class="stat">
        <div class="stat__top">
          <div>
            <p class="stat__title">Total Lamaran Masuk</p>
            <h3 class="stat__value">612</h3>
          </div>
          <span class="stat__icon stat__icon--orange"><i class="bi bi-file-earmark-text"></i></span>
        </div>
        <div class="stat__foot">
          <span class="badge badge--orange">94 lamaran</span>
          <span class="stat__note">perlu direview</span>
        </div>
      </article>
    </section>

    <!-- ============ BARIS ATAS: GRAFIK + PENGUMUMAN ============ -->
    <section class="row row--top">
      <!-- Grafik -->
      <article class="card">
        <header class="card__head">
          <div>
            <h3>Keterserapan Alumni</h3>
            <p class="card__sub chart__sub">
              Perbandingan jumlah lulusan dan alumni yang bekerja di dunia industri per tahun.
            </p>
          </div>
          <span class="pill">
            <strong>{{ latest.percent }}%</strong> Terserap di DUDI / Industri
          </span>
        </header>

        <div class="plot">
          <div v-for="b in bars" :key="b.year" class="plot__group">
            <div class="plot__bars">
              <div class="bar bar--total" :style="{ height: b.totalH + '%' }"></div>
              <div class="bar bar--work" :style="{ height: b.bekerjaH + '%' }">
                <span v-if="b.year === latest.year" class="bar__tip">{{ b.percent }}%</span>
              </div>
            </div>
            <span class="plot__year">{{ b.year }}</span>
          </div>
        </div>

        <footer class="chart__foot">
          <div class="legend">
            <span><i class="sw sw--work"></i>Alumni Bekerja</span>
            <span><i class="sw sw--total"></i>Total Alumni</span>
          </div>
          <small>Target keterserapan: 75% (Permulaan)</small>
        </footer>
      </article>

      <!-- Pengumuman -->
      <article class="card card--col">
        <header class="card__head">
          <h3>Pengumuman Terbaru</h3>
          <a href="#" class="link-blue">Lihat Semua</a>
        </header>

        <div v-for="n in pengumuman" :key="n.id" class="ann">
          <div class="ann__top">
            <span class="tag" :class="`tag--${n.tone}`">{{ n.tag }}</span>
            <small>{{ n.date }}</small>
          </div>
          <h4>{{ n.title }}</h4>
          <p>{{ n.desc }}</p>
        </div>

        <a href="#" class="ann__new">
          Buat Pengumuman Baru <i class="bi bi-plus-lg"></i>
        </a>
      </article>
    </section>

    <!-- ============ BARIS BAWAH: TABEL + AKTIVITAS ============ -->
    <section class="row row--bottom">
      <!-- Tabel lamaran -->
      <article class="card">
        <header class="card__head">
          <div>
            <h3>Lamaran Terbaru</h3>
            <p class="card__sub">Data pelamar alumni SMKN 1 Purwosari dalam seminggu terakhir.</p>
          </div>
          <a href="#" class="link-blue">Lihat Semua Lamaran ({{ total }})</a>
        </header>

        <div class="scroll">
          <table class="table">
            <caption class="sr-only">Daftar lamaran terbaru</caption>
            <colgroup>
              <col style="width: 26%" />
              <col style="width: 22%" />
              <col style="width: 20%" />
              <col style="width: 18%" />
              <col style="width: 14%" />
            </colgroup>

            <thead>
              <tr>
                <th scope="col">Nama Alumni</th>
                <th scope="col">Posisi Dilamar</th>
                <th scope="col">Nama Perusahaan</th>
                <th scope="col">Tanggal Melamar</th>
                <th scope="col" class="center">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="r in lamaran" :key="r.id">
                <td>
                  <div class="person">
                    <span class="avatar" :style="avatarStyle(r.name)">{{ initials(r.name) }}</span>
                    <div>
                      <strong>{{ r.name }}</strong>
                      <small>{{ r.jurusan }}</small>
                    </div>
                  </div>
                </td>
                <td>{{ r.position }}</td>
                <td>{{ r.company }}</td>
                <td class="muted">{{ r.date }}</td>
                <td class="center">
                  <span class="status" :class="statusMap[r.status].cls">
                    {{ statusMap[r.status].label }}
                  </span>
                </td>
              </tr>

              <tr v-if="!lamaran.length">
                <td colspan="5" class="empty">Belum ada lamaran.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <footer class="table__foot">
          <span>Menampilkan {{ lamaran.length }} dari {{ total }} data lamaran</span>

          <nav class="pager" aria-label="Paginasi">
            <button type="button" :disabled="page === 1" @click="go(page - 1)">Sebelumnya</button>
            <button
              v-for="p in pages"
              :key="p"
              type="button"
              :class="{ on: p === page }"
              @click="go(p)"
            >
              {{ p }}
            </button>
            <button type="button" :disabled="page === pageCount" @click="go(page + 1)">Berikutnya</button>
          </nav>
        </footer>
      </article>

      <!-- Aktivitas -->
      <article class="card card--col">
        <h3 class="card__title">Aktivitas Terbaru</h3>

        <ul class="act">
          <li v-for="a in aktivitas" :key="a.id" class="act__row">
            <span class="act__dot" :class="`act__dot--${a.tone}`"></span>
            <div>
              <p><strong>{{ a.who }}</strong> {{ a.text }}</p>
              <small>{{ a.time }}</small>
            </div>
          </li>
        </ul>

        <a href="#" class="act__more">
          Lihat Riwayat Lengkap <i class="bi bi-arrow-right"></i>
        </a>
      </article>
    </section>
  </div>
</template>

<style scoped>
.dash {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ---------- Judul ---------- */
.title h1 {
  font-size: 20px;
  font-weight: 800;
  color: #0b1f4d;
  line-height: 1.2;
}

.title p {
  font-size: 10.5px;
  color: #64748b;
  margin-top: 2px;
}

/* ---------- Dasar kartu ---------- */
.card {
  background: #fff;
  border: 1px solid #eef0f4;
  border-radius: 12px;
  padding: 16px 18px;
}

.card--col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.card__head h3,
.card__title {
  font-size: 12px;
  font-weight: 700;
}

.card__title {
  margin-bottom: 4px;
}

.card__sub {
  font-size: 9px;
  color: #64748b;
  margin-top: 2px;
}

.link-blue {
  flex-shrink: 0;
  font-size: 9.5px;
  font-weight: 600;
  color: #2563eb;
}

/* ---------- Layout baris ---------- */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.row {
  display: grid;
  gap: 14px;
  align-items: stretch;
}

.row--top {
  grid-template-columns: 1.6fr 1fr;
}

.row--bottom {
  grid-template-columns: 1.7fr 1fr;
}

/* ---------- Kartu statistik ---------- */
.stat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  background: #fff;
  border: 1px solid #eef0f4;
  border-radius: 12px;
  padding: 16px;
}

.stat--primary {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  border-color: transparent;
  color: #fff;
}

.stat__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.stat__title {
  font-size: 10px;
  color: #64748b;
  margin-bottom: 4px;
}

.stat--primary .stat__title {
  color: #dbeafe;
}

.stat__value {
  font-size: 26px;
  font-weight: 800;
  line-height: 1.1;
}

.stat__icon {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: 13px;
}

.stat__icon--white {
  background: rgba(255, 255, 255, 0.95);
  color: #2563eb;
  border-radius: 8px;
}

.stat__icon--green {
  background: #dcfce7;
  color: #16a34a;
}

.stat__icon--blue {
  background: #e0e9ff;
  color: #2563eb;
}

.stat__icon--orange {
  background: #ffedd5;
  color: #ea580c;
}

.stat__foot {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 9px;
}

.stat__note {
  color: #64748b;
}

.stat--primary .stat__note {
  color: #dbeafe;
}

.badge {
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
}

.badge--glass {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.badge--green {
  background: #dcfce7;
  color: #15803d;
}

.badge--orange {
  background: #ffedd5;
  color: #c2410c;
}

/* ---------- Grafik ---------- */
.chart__sub {
  max-width: 260px;
}

.pill {
  flex-shrink: 0;
  font-size: 8.5px;
  color: #1d4ed8;
  background: #e8efff;
  padding: 5px 10px;
  border-radius: 999px;
}

.pill strong {
  font-weight: 800;
}

.plot {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 150px;
  margin-top: 14px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8ecf2;
  background-image: linear-gradient(#f1f4f8 1px, transparent 1px);
  background-size: 100% 25%;
}

.plot__group {
  position: relative;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.plot__bars {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 6px;
}

.bar {
  position: relative;
  width: 22px;
  border-radius: 4px 4px 0 0;
  transition: height 0.4s;
}

.bar--total {
  background: #e5e9f0;
}

.bar--work {
  background: #2563eb;
}

.bar__tip {
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 8px;
  font-weight: 700;
  color: #fff;
  background: #2563eb;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
}

.plot__year {
  position: absolute;
  bottom: -18px;
  font-size: 9px;
  color: #64748b;
}

.chart__foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  font-size: 9px;
  color: #64748b;
}

.legend {
  display: flex;
  gap: 14px;
}

.legend span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.sw {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.sw--work {
  background: #2563eb;
}

.sw--total {
  background: #cfd6e1;
}

/* ---------- Pengumuman ---------- */
.ann {
  background: #f8f9fb;
  border: 1px solid #eef0f4;
  border-radius: 10px;
  padding: 12px;
}

.ann__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.ann__top small {
  font-size: 8.5px;
  color: #94a3b8;
}

.tag {
  font-size: 8px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}

.tag--blue {
  background: #e0e9ff;
  color: #2563eb;
}

.tag--yellow {
  background: #fef3c7;
  color: #b45309;
}

.ann h4 {
  font-size: 10.5px;
  font-weight: 700;
  line-height: 1.35;
  margin-bottom: 3px;
}

.ann p {
  font-size: 9px;
  line-height: 1.5;
  color: #64748b;
}

.ann__new {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding: 6px;
  font-size: 10px;
  font-weight: 600;
  color: #2563eb;
}

.ann__new:hover {
  text-decoration: underline;
}

/* ---------- Tabel ---------- */
.card__head + .scroll {
  margin-top: 12px;
}

.scroll {
  overflow-x: auto;
}

.table {
  width: 100%;
  min-width: 620px;
  table-layout: fixed;
  border-collapse: collapse;
  font-size: 10px;
}

.table th {
  text-align: left;
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #94a3b8;
  padding: 8px 10px;
  border-bottom: 1px solid #eef0f4;
}

.table td {
  padding: 11px 10px;
  border-bottom: 1px solid #f3f5f8;
  color: #1e293b;
  vertical-align: middle;
}

.table tbody tr:last-child td {
  border-bottom: 0;
}

.table tbody tr:hover {
  background: #fafbfd;
}

.center {
  text-align: center !important;
}

.muted {
  color: #64748b !important;
}

.person {
  display: flex;
  align-items: center;
  gap: 10px;
}

.person strong {
  display: block;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.2;
}

.person small {
  font-size: 8.5px;
  color: #94a3b8;
}

.avatar {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: 9px;
  font-weight: 700;
}

.status {
  display: inline-block;
  min-width: 52px;
  font-size: 8.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  text-align: center;
}

.status--lolos {
  background: #dcfce7;
  color: #15803d;
}

.status--pending {
  background: #fef3c7;
  color: #b45309;
}

.status--gagal {
  background: #fee2e2;
  color: #b91c1c;
}

.empty {
  text-align: center;
  color: #94a3b8 !important;
  padding: 24px !important;
}

.table__foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
  font-size: 9px;
  color: #64748b;
}

.pager {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pager button {
  font-family: inherit;
  font-size: 9px;
  color: #475569;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  min-width: 26px;
  height: 26px;
  padding: 0 8px;
  cursor: pointer;
}

.pager button:hover:not(:disabled) {
  background: #f1f5f9;
}

.pager button.on {
  background: #2563eb;
  border-color: #2563eb;
  color: #fff;
}

.pager button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

/* ---------- Aktivitas ---------- */
.act {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.act__row {
  display: flex;
  gap: 10px;
}

.act__dot {
  flex-shrink: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-top: 4px;
}

.act__dot--blue {
  background: #2563eb;
}

.act__dot--gray {
  background: #94a3b8;
}

.act__row p {
  font-size: 9.5px;
  line-height: 1.5;
  color: #475569;
}

.act__row p strong {
  color: #2563eb;
  font-weight: 600;
}

.act__row small {
  font-size: 8.5px;
  color: #94a3b8;
}

.act__more {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding-top: 14px;
  font-size: 9.5px;
  font-weight: 600;
  color: #2563eb;
}

.act__more:hover {
  text-decoration: underline;
}

/* ---------- Responsif ---------- */
@media (max-width: 1100px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .row--top,
  .row--bottom {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .stats {
    grid-template-columns: 1fr;
  }
}
</style>