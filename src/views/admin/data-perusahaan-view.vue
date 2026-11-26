<script setup>
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'bkk-perusahaan-v2'
const BASE = { total: 48, lowongan: 32, aktif: 20, nonaktif: 12 }

/* ---------- data awal ---------- */
const pool = [
  ['Operator Produksi', 'Full Time'],
  ['Quality Control', 'Full Time'],
  ['Staff Administrasi', 'Full Time'],
  ['Teknisi Mesin', 'Kontrak'],
  ['Desainer Grafis', 'Magang'],
  ['Admin Gudang', 'Part Time'],
]
function gen(n, k) {
  return Array.from({ length: n }, (_, i) => ({
    id: k * 100 + i,
    posisi: pool[(k + i) % pool.length][0],
    tipe: pool[(k + i) % pool.length][1],
    batas: `2026-12-${String(10 + i * 3).padStart(2, '0')}`,
    pelamar: ((k * 7 + i * 11) % 40) + 10,
    status: i === n - 1 && k % 3 === 0 ? 'Ditutup' : 'Aktif',
  }))
}

// [id, nama, email, telp, bidang, mitraSejak, alamat, terdaftar, jumlahLowongan]
const raw = [
  [1, 'PT Maju Jaya', 'hrd@majujaya.co.id', '0812-3456-7890', 'Perdagangan & Distribusi', '2023', 'Jl. Raya Purwosari No. 21, Pasuruan, Jawa Timur 67162', '2026-11-12', 3],
  [2, 'CV Teknologi Mandiri', 'hrd@teknologimj.co.id', '0821-1234-5678', 'Teknologi Informasi', '2024', 'Jl. Diponegoro No. 8, Pandaan, Pasuruan, Jawa Timur 67156', '2026-11-15', 2],
  [3, 'PT Industri Sejahtera', 'recruitment@industri.co.id', '0857-9876-5432', 'Manufaktur', '2022', 'Kawasan Industri PIER Blok C-12, Rembang, Pasuruan', '2026-11-18', 0],
  [4, 'PT Astra Honda Motor', 'recruitment@ahm.co.id', '(021) 789-9000', 'Industri Manufaktur Otomotif', '2024', 'Jl. Laksda Yos Sudarso, Sunter I, Tanjung Priok, Kota Jakarta Utara, DKI Jakarta 14350', '2026-11-20', 3],
  [5, 'CV Barkah Mandiri', 'info@barkahmandiri.id', '0813-9871-2245', 'Jasa & Konstruksi', '2025', 'Jl. Gajah Mada No. 45, Purwosari, Pasuruan', '2026-11-22', 1],
  [6, 'PT Nusantara Digital', 'hrd@nusantaradigital.id', '0811-2233-4455', 'Teknologi Informasi', '2024', 'Jl. Ahmad Yani No. 90, Surabaya, Jawa Timur', '2026-11-02', 2],
  [7, 'PT Sinar Abadi', 'karir@sinarabadi.co.id', '0822-3344-5566', 'Manufaktur', '2023', 'Jl. Industri Raya No. 5, Sidoarjo, Jawa Timur', '2026-11-03', 1],
  [8, 'CV Karya Bersama', 'info@karyabersama.id', '0815-6677-8899', 'Jasa & Konstruksi', '2025', 'Jl. Pahlawan No. 12, Bangil, Pasuruan', '2026-11-04', 0],
  [9, 'PT Mega Elektronik', 'hrd@megaelektronik.co.id', '(031) 555-1234', 'Elektronik', '2021', 'Jl. Rungkut Industri No. 33, Surabaya, Jawa Timur', '2026-11-05', 4],
  [10, 'PT Jaya Konstruksi', 'recruit@jayakonstruksi.co.id', '0856-1122-3344', 'Konstruksi', '2022', 'Jl. Raya Malang No. 101, Singosari, Malang', '2026-11-06', 2],
  [11, 'CV Cahaya Media', 'hello@cahayamedia.id', '0838-9988-7766', 'Media & Kreatif', '2025', 'Jl. Veteran No. 7, Pasuruan, Jawa Timur', '2026-11-08', 1],
  [12, 'PT Bumi Persada', 'hrd@bumipersada.co.id', '0877-4455-6677', 'Agribisnis', '2023', 'Jl. Raya Nongkojajar No. 18, Pasuruan', '2026-11-09', 0],
  [13, 'PT Tirta Sentosa', 'karir@tirtasentosa.co.id', '0819-8765-4321', 'Industri Minuman', '2022', 'Jl. Raya Prigen No. 3, Pandaan, Pasuruan', '2026-11-10', 3],
  [14, 'CV Prima Otomotif', 'info@primaotomotif.id', '0852-3210-9876', 'Otomotif', '2024', 'Jl. Soekarno Hatta No. 60, Malang', '2026-11-11', 1],
  [15, 'PT Garuda Logistik', 'hrd@garudalogistik.co.id', '0831-5678-1234', 'Logistik & Transportasi', '2023', 'Jl. Tanjung Perak Barat No. 14, Surabaya', '2026-11-13', 2],
]

const seed = raw.map(([id, nama, email, telp, bidang, sejak, alamat, terdaftar, n]) => ({
  id, nama, email, telp, bidang, sejak, alamat, terdaftar,
  diperbarui: terdaftar,
  mitra: 'Mitra Aktif',
  lowongan: gen(n, id),
}))

// Astra Honda: persis sesuai desain detail
seed[3].diperbarui = '2026-11-25'
seed[3].lowongan = [
  { id: 401, posisi: 'Operator Produksi', tipe: 'Full Time', batas: '2026-11-30', pelamar: 42, status: 'Aktif' },
  { id: 402, posisi: 'Quality Control', tipe: 'Full Time', batas: '2026-12-08', pelamar: 28, status: 'Aktif' },
  { id: 403, posisi: 'Staff Administrasi', tipe: 'Full Time', batas: '2026-10-10', pelamar: 35, status: 'Ditutup' },
]

const hitung = (arr, fn) => arr.reduce((a, p) => a + p.lowongan.filter(fn).length, 0)
const seedLow = hitung(seed, () => true)
const seedAktif = hitung(seed, (l) => l.status === 'Aktif')
const seedNon = hitung(seed, (l) => l.status !== 'Aktif')

function load() {
  try {
    const r = localStorage.getItem(STORAGE_KEY)
    if (r) return JSON.parse(r)
  } catch (e) {}
  return JSON.parse(JSON.stringify(seed))
}

const list = ref(load())
watch(list, (v) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
  } catch (e) {}
}, { deep: true })

/* ---------- util ---------- */
const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
function fmtTanggal(iso) {
  if (!iso) return '-'
  const [y, m, d] = iso.split('-')
  return `${Number(d)} ${BULAN[Number(m) - 1]} ${y}`
}
function today() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}
const totalPelamar = (p) => p.lowongan.reduce((a, l) => a + Number(l.pelamar || 0), 0)

/* ---------- statistik ---------- */
const totalPerusahaan = computed(() => BASE.total + list.value.length - seed.length)
const totalLowongan = computed(() => Math.max(0, BASE.lowongan + hitung(list.value, () => true) - seedLow))
const lowonganAktif = computed(() => Math.max(0, BASE.aktif + hitung(list.value, (l) => l.status === 'Aktif') - seedAktif))
const lowonganNonaktif = computed(() => Math.max(0, BASE.nonaktif + hitung(list.value, (l) => l.status !== 'Aktif') - seedNon))

const stats = computed(() => [
  { no: '01', icon: 'bi-buildings', tone: 'blue', value: totalPerusahaan.value, label: 'Total Perusahaan', foot: 'Perusahaan terdaftar' },
  { no: '02', icon: 'bi-briefcase', tone: 'purple', value: totalLowongan.value, label: 'Total Lowongan', foot: 'Seluruh lowongan' },
  { no: '03', icon: 'bi-check-circle', tone: 'green', value: lowonganAktif.value, label: 'Lowongan Aktif', foot: 'Masih berjalan' },
  { no: '04', icon: 'bi-slash-circle', tone: 'orange', value: lowonganNonaktif.value, label: 'Lowongan Tidak Aktif', foot: 'Sudah ditutup' },
])

/* ---------- cari, filter, paging ---------- */
const q = ref('')
const filter = ref('semua')
const filterOpen = ref(false)
const filterOptions = [
  { v: 'semua', t: 'Semua perusahaan' },
  { v: 'ada', t: 'Punya lowongan' },
  { v: 'kosong', t: 'Tanpa lowongan' },
]

const filtered = computed(() => {
  const k = q.value.trim().toLowerCase()
  return list.value.filter((p) => {
    const cocok = !k || [p.nama, p.email, p.telp].some((x) => x.toLowerCase().includes(k))
    const n = p.lowongan.length
    const f = filter.value === 'semua' || (filter.value === 'ada' ? n > 0 : n === 0)
    return cocok && f
  })
})

const perPage = 5
const page = ref(1)
const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))
const rows = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))
const nomorAwal = computed(() => (page.value - 1) * perPage)
watch([q, filter], () => (page.value = 1))
watch(pages, (n) => { if (page.value > n) page.value = n })

function pilihFilter(v) {
  filter.value = v
  filterOpen.value = false
}

/* ---------- modal ---------- */
const modal = ref(null) // 'detail' | 'tambah' | 'ubah' | 'hapus'
const detailId = ref(null)
const detail = computed(() => list.value.find((p) => p.id === detailId.value))
const form = ref({})
const errors = ref({})
const target = ref(null)

const tipeOptions = ['Full Time', 'Part Time', 'Kontrak', 'Magang']

function formKosong() {
  return {
    id: null, nama: '', bidang: '', sejak: String(new Date().getFullYear()), mitra: 'Mitra Aktif',
    email: '', telp: '', alamat: '', terdaftar: today(), diperbarui: today(), lowongan: [],
  }
}
function bukaDetail(p) {
  detailId.value = p.id
  modal.value = 'detail'
}
function bukaTambah() {
  form.value = formKosong()
  errors.value = {}
  modal.value = 'tambah'
}
function bukaUbah(p) {
  form.value = JSON.parse(JSON.stringify(p))
  errors.value = {}
  modal.value = 'ubah'
}
function bukaHapus(p) {
  target.value = p
  modal.value = 'hapus'
}
function tutup() {
  modal.value = null
}

function tambahLowongan() {
  form.value.lowongan.push({ id: Date.now(), posisi: '', tipe: 'Full Time', batas: today(), pelamar: 0, status: 'Aktif' })
}
function hapusLowongan(i) {
  form.value.lowongan.splice(i, 1)
}

function validasi() {
  const e = {}
  const f = form.value
  if (!f.nama.trim()) e.nama = 'Nama perusahaan wajib diisi'
  if (!f.bidang.trim()) e.bidang = 'Bidang usaha wajib diisi'
  if (!/^\d{4}$/.test(String(f.sejak))) e.sejak = 'Isi tahun, contoh 2024'
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Format email tidak valid'
  if (f.telp.replace(/\D/g, '').length < 8) e.telp = 'No. telepon minimal 8 digit'
  if (!f.alamat.trim()) e.alamat = 'Alamat wajib diisi'
  if (f.lowongan.some((l) => !l.posisi.trim())) e.lowongan = 'Nama posisi lowongan wajib diisi'
  errors.value = e
  return Object.keys(e).length === 0
}

function simpan() {
  if (!validasi()) return
  const data = JSON.parse(JSON.stringify(form.value))
  data.nama = data.nama.trim()
  data.lowongan = data.lowongan.map((l) => ({ ...l, pelamar: Number(l.pelamar) || 0 }))
  data.diperbarui = today()
  if (modal.value === 'tambah') {
    data.id = Date.now()
    data.terdaftar = today()
    list.value.push(data)
    page.value = Math.ceil(filtered.value.length / perPage)
    tutup()
  } else {
    const i = list.value.findIndex((p) => p.id === data.id)
    if (i !== -1) list.value[i] = data
    detailId.value = data.id
    modal.value = 'detail'
  }
}

function hapus() {
  list.value = list.value.filter((p) => p.id !== target.value.id)
  tutup()
}
</script>

<template>
  <div class="page" @click="filterOpen = false">
    <!-- header -->
    <header class="head">
      <div class="head__left">
        <span class="head__icon"><i class="bi bi-buildings"></i></span>
        <div>
          <h1>Data Perusahaan</h1>
          <p>Kelola informasi perusahaan yang terdaftar dan pantau lowongan kerja dari setiap perusahaan.</p>
        </div>
      </div>
      <nav class="crumb">
        <i class="bi bi-house-door"></i>
        <RouterLink to="/admin">Dashboard</RouterLink>
        <span>/</span>
        <b>Data Perusahaan</b>
      </nav>
    </header>

    <!-- statistik -->
    <section class="stats">
      <article v-for="s in stats" :key="s.label" class="stat">
        <div class="stat__top">
          <span class="stat__icon" :class="s.tone"><i class="bi" :class="s.icon"></i></span>
          <span class="stat__no">{{ s.no }}</span>
        </div>
        <strong class="stat__value" :class="s.tone">{{ s.value }}</strong>
        <span class="stat__label">{{ s.label }}</span>
        <small class="stat__foot">{{ s.foot }}</small>
      </article>
    </section>

    <!-- daftar -->
    <section class="panel">
      <div class="panel__head">
        <div class="panel__title">
          <i class="bar"></i>
          <h2>Daftar Perusahaan</h2>
          <span class="chip">{{ totalPerusahaan }} Perusahaan</span>
        </div>
        <button class="btn btn--primary" @click="bukaTambah"><i class="bi bi-plus-lg"></i> Tambah Perusahaan</button>
      </div>

      <div class="toolbar">
        <label class="search">
          <i class="bi bi-search"></i>
          <input v-model="q" type="text" placeholder="Cari nama perusahaan atau email..." />
        </label>
        <div class="filter" @click.stop>
          <button class="btn btn--ghost" @click="filterOpen = !filterOpen"><i class="bi bi-funnel"></i> Filter</button>
          <ul v-if="filterOpen" class="filter__menu">
            <li v-for="o in filterOptions" :key="o.v" :class="{ on: filter === o.v }" @click="pilihFilter(o.v)">{{ o.t }}</li>
          </ul>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <colgroup>
            <col style="width: 52px" />
            <col style="width: 22%" />
            <col style="width: 24%" />
            <col style="width: 15%" />
            <col style="width: 13%" />
            <col style="width: 13%" />
            <col style="width: 96px" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" class="c">No</th>
              <th scope="col">Nama Perusahaan</th>
              <th scope="col">Email</th>
              <th scope="col">No. Telepon</th>
              <th scope="col" class="c">Lowongan</th>
              <th scope="col">Terdaftar</th>
              <th scope="col" class="c">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, i) in rows" :key="p.id">
              <td class="c muted">{{ nomorAwal + i + 1 }}</td>
              <td class="nama">{{ p.nama }}</td>
              <td class="mono">{{ p.email }}</td>
              <td>{{ p.telp }}</td>
              <td class="c"><span class="pill" :class="{ zero: !p.lowongan.length }">{{ p.lowongan.length }} Lowongan</span></td>
              <td class="muted">{{ fmtTanggal(p.terdaftar) }}</td>
              <td class="c">
                <div class="aksi">
                  <button class="ic ic--view" title="Lihat" @click="bukaDetail(p)"><i class="bi bi-eye"></i></button>
                  <button class="ic ic--edit" title="Ubah" @click="bukaUbah(p)"><i class="bi bi-pencil"></i></button>
                  <button class="ic ic--del" title="Hapus" @click="bukaHapus(p)"><i class="bi bi-trash"></i></button>
                </div>
              </td>
            </tr>
            <tr v-if="!rows.length">
              <td colspan="7" class="empty">Data perusahaan tidak ditemukan.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pager">
        <button class="pg" :disabled="page === 1" @click="page--"><i class="bi bi-chevron-left"></i></button>
        <button v-for="n in pages" :key="n" class="pg" :class="{ on: n === page }" @click="page = n">{{ n }}</button>
        <button class="pg" :disabled="page === pages" @click="page++"><i class="bi bi-chevron-right"></i></button>
      </div>
    </section>

    <!-- ========== MODAL DETAIL ========== -->
    <div v-if="modal === 'detail' && detail" class="overlay" @click.self="tutup">
      <div class="modal modal--lg">
        <header class="m-head">
          <span class="m-head__icon"><i class="bi bi-building"></i></span>
          <div class="m-head__text">
            <h3>Detail Perusahaan</h3>
            <p>Informasi profil kemitraan dan lowongan kerja aktif</p>
          </div>
          <button class="m-close" aria-label="Tutup" @click="tutup"><i class="bi bi-x-lg"></i></button>
        </header>

        <div class="m-body">
          <!-- kartu profil -->
          <div class="profile">
            <span class="profile__logo"><i class="bi bi-building"></i></span>
            <div class="profile__info">
              <div class="profile__name">
                <b>{{ detail.nama }}</b>
                <span class="badge" :class="{ off: detail.mitra !== 'Mitra Aktif' }">
                  <i></i>{{ detail.mitra }}
                </span>
              </div>
              <small>{{ detail.bidang }} · Mitra sejak {{ detail.sejak }}</small>
            </div>
            <div class="profile__meta">
              <span class="meta"><i class="bi bi-briefcase"></i> {{ detail.lowongan.length }} Lowongan</span>
              <span class="meta"><i class="bi bi-people"></i> {{ totalPelamar(detail) }} Pelamar</span>
            </div>
          </div>

          <!-- kontak -->
          <div class="sec-title">
            <span>Informasi Kontak &amp; Alamat</span>
            <small>Data Resmi Terverifikasi</small>
          </div>
          <div class="kontak">
            <div class="box">
              <i class="bi bi-envelope"></i>
              <div><small>Email Rekrutmen</small><b>{{ detail.email }}</b></div>
            </div>
            <div class="box">
              <i class="bi bi-telephone"></i>
              <div><small>No. Telepon Kantor</small><b>{{ detail.telp }}</b></div>
            </div>
          </div>
          <div class="box box--full">
            <i class="bi bi-geo-alt"></i>
            <div><small>Alamat Kantor Pusat</small><b>{{ detail.alamat }}</b></div>
          </div>

          <!-- lowongan -->
          <div class="sec-title">
            <span>Daftar Lowongan Pekerjaan</span>
            <em class="count">{{ detail.lowongan.length }} Posisi</em>
          </div>
          <ul class="jobs">
            <li v-for="l in detail.lowongan" :key="l.id" class="job" :class="{ off: l.status !== 'Aktif' }">
              <div class="job__main">
                <div class="job__title">
                  <b>{{ l.posisi }}</b>
                  <span class="tag">{{ l.tipe }}</span>
                </div>
                <div class="job__meta">
                  <span><i class="bi bi-calendar-event"></i> Batas: {{ fmtTanggal(l.batas) }}</span>
                  <span><i class="bi bi-people"></i> {{ l.pelamar }} Pelamar</span>
                </div>
              </div>
              <span class="status" :class="{ off: l.status !== 'Aktif' }">{{ l.status }}</span>
              <i class="bi bi-chevron-right job__arrow"></i>
            </li>
            <li v-if="!detail.lowongan.length" class="job job--empty">Belum ada lowongan dari perusahaan ini.</li>
          </ul>
        </div>

        <footer class="m-foot">
          <small>Terdaftar: {{ fmtTanggal(detail.terdaftar) }} · Diperbarui: {{ fmtTanggal(detail.diperbarui) }}</small>
          <div class="m-foot__act">
            <button class="btn btn--ghost" @click="tutup">Tutup</button>
            <button class="btn btn--primary" @click="bukaUbah(detail)">
              <i class="bi bi-pencil-square"></i> Edit Data Perusahaan
            </button>
          </div>
        </footer>
      </div>
    </div>

    <!-- ========== MODAL TAMBAH / EDIT ========== -->
    <div v-if="modal === 'tambah' || modal === 'ubah'" class="overlay" @click.self="tutup">
      <form class="modal modal--lg" @submit.prevent="simpan">
        <header class="m-head">
          <span class="m-head__icon"><i class="bi bi-building"></i></span>
          <div class="m-head__text">
            <h3>{{ modal === 'tambah' ? 'Tambah Perusahaan' : 'Edit Data Perusahaan' }}</h3>
            <p>{{ modal === 'tambah' ? 'Lengkapi profil kemitraan dan lowongan perusahaan' : 'Perbarui profil kemitraan dan lowongan kerja' }}</p>
          </div>
          <button type="button" class="m-close" aria-label="Tutup" @click="tutup"><i class="bi bi-x-lg"></i></button>
        </header>

        <div class="m-body">
          <div class="sec-title"><span>Profil Perusahaan</span></div>
          <label class="field">
            <span>Nama Perusahaan</span>
            <input v-model="form.nama" placeholder="PT Astra Honda Motor" />
            <em v-if="errors.nama">{{ errors.nama }}</em>
          </label>
          <label class="field">
            <span>Bidang Usaha</span>
            <input v-model="form.bidang" placeholder="Industri Manufaktur Otomotif" />
            <em v-if="errors.bidang">{{ errors.bidang }}</em>
          </label>
          <div class="grid2">
            <label class="field">
              <span>Mitra Sejak (Tahun)</span>
              <input v-model="form.sejak" maxlength="4" placeholder="2024" />
              <em v-if="errors.sejak">{{ errors.sejak }}</em>
            </label>
            <label class="field">
              <span>Status Kemitraan</span>
              <select v-model="form.mitra">
                <option>Mitra Aktif</option>
                <option>Mitra Nonaktif</option>
              </select>
            </label>
          </div>

          <div class="sec-title"><span>Informasi Kontak &amp; Alamat</span></div>
          <div class="grid2">
            <label class="field">
              <span>Email Rekrutmen</span>
              <input v-model="form.email" placeholder="recruitment@ahm.co.id" />
              <em v-if="errors.email">{{ errors.email }}</em>
            </label>
            <label class="field">
              <span>No. Telepon Kantor</span>
              <input v-model="form.telp" placeholder="(021) 789-9000" />
              <em v-if="errors.telp">{{ errors.telp }}</em>
            </label>
          </div>
          <label class="field">
            <span>Alamat Kantor Pusat</span>
            <textarea v-model="form.alamat" rows="2" placeholder="Jl. Laksda Yos Sudarso, Sunter I, ..."></textarea>
            <em v-if="errors.alamat">{{ errors.alamat }}</em>
          </label>

          <div class="sec-title">
            <span>Daftar Lowongan Pekerjaan</span>
            <button type="button" class="btn-mini" @click="tambahLowongan"><i class="bi bi-plus-lg"></i> Tambah Posisi</button>
          </div>
          <em v-if="errors.lowongan" class="err">{{ errors.lowongan }}</em>

          <div v-for="(l, i) in form.lowongan" :key="l.id" class="lw">
            <div class="lw__row">
              <input v-model="l.posisi" class="lw__posisi" placeholder="Nama posisi, mis. Operator Produksi" />
              <button type="button" class="lw__del" title="Hapus posisi" @click="hapusLowongan(i)">
                <i class="bi bi-trash"></i>
              </button>
            </div>
            <div class="lw__grid">
              <label class="field">
                <span>Tipe</span>
                <select v-model="l.tipe">
                  <option v-for="t in tipeOptions" :key="t">{{ t }}</option>
                </select>
              </label>
              <label class="field">
                <span>Batas Pendaftaran</span>
                <input v-model="l.batas" type="date" />
              </label>
              <label class="field">
                <span>Pelamar</span>
                <input v-model="l.pelamar" type="number" min="0" />
              </label>
              <label class="field">
                <span>Status</span>
                <select v-model="l.status">
                  <option>Aktif</option>
                  <option>Ditutup</option>
                </select>
              </label>
            </div>
          </div>
          <p v-if="!form.lowongan.length" class="hint">Belum ada lowongan. Klik “Tambah Posisi” untuk menambahkan.</p>
        </div>

        <footer class="m-foot">
          <small>Terdaftar: {{ fmtTanggal(form.terdaftar) }} · Diperbarui: {{ fmtTanggal(form.diperbarui) }}</small>
          <div class="m-foot__act">
            <button type="button" class="btn btn--ghost" @click="modal === 'ubah' ? (modal = 'detail') : tutup()">Batal</button>
            <button type="submit" class="btn btn--primary"><i class="bi bi-check2"></i> Simpan Perubahan</button>
          </div>
        </footer>
      </form>
    </div>

    <!-- ========== MODAL HAPUS ========== -->
    <div v-if="modal === 'hapus'" class="overlay" @click.self="tutup">
      <div class="modal modal--sm">
        <div class="m-body m-body--pad">
          <h3 class="plain">Hapus Perusahaan?</h3>
          <p class="confirm">Data <b>{{ target.nama }}</b> beserta seluruh lowongannya akan dihapus dan tidak bisa dikembalikan.</p>
        </div>
        <footer class="m-foot m-foot--end">
          <button class="btn btn--ghost" @click="tutup">Batal</button>
          <button class="btn btn--danger" @click="hapus">Hapus</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { display: flex; flex-direction: column; gap: 18px; font-size: 12px; color: var(--text, #0f172a); }

/* header */
.head { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.head__left { display: flex; align-items: center; gap: 12px; }
.head__icon { width: 38px; height: 38px; border-radius: 10px; background: #e8f0ff; color: #2563eb; display: grid; place-items: center; font-size: 18px; flex-shrink: 0; }
.head h1 { font-size: 18px; font-weight: 700; line-height: 1.2; margin: 0; }
.head p { margin: 2px 0 0; font-size: 11px; color: var(--muted, #64748b); }
.crumb { display: flex; align-items: center; gap: 6px; font-size: 10px; color: var(--muted, #64748b); background: #fff; border: 1px solid #e5eaf3; border-radius: 8px; padding: 6px 10px; }
.crumb a:hover { color: #2563eb; }
.crumb b { color: var(--text, #0f172a); font-weight: 600; }

/* statistik */
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.stat { background: #fff; border: 1px solid #e5eaf3; border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04); }
.stat__top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.stat__icon { width: 24px; height: 24px; border-radius: 50%; display: grid; place-items: center; font-size: 12px; }
.stat__no { font-size: 8px; color: #94a3b8; background: #f1f5f9; border-radius: 5px; padding: 2px 6px; }
.stat__value { font-size: 24px; font-weight: 700; line-height: 1.1; }
.stat__label { font-size: 11px; font-weight: 600; margin-top: 4px; }
.stat__foot { font-size: 9px; color: var(--muted, #64748b); margin-top: 1px; }
.blue { color: #2563eb; } .stat__icon.blue { background: #e8f0ff; }
.purple { color: #7c3aed; } .stat__icon.purple { background: #f1eaff; }
.green { color: #16a34a; } .stat__icon.green { background: #e2f7ea; }
.orange { color: #f97316; } .stat__icon.orange { background: #ffefe0; }

/* panel */
.panel { background: #fff; border: 1px solid #e5eaf3; border-radius: 14px; padding: 16px 18px 18px; box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04); }
.panel__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 14px; }
.panel__title { display: flex; align-items: center; gap: 8px; }
.bar { width: 3px; height: 16px; border-radius: 3px; background: #2563eb; }
.panel__title h2 { font-size: 13px; font-weight: 700; margin: 0; }
.chip { font-size: 9px; font-weight: 600; color: #2563eb; background: #e8f0ff; border-radius: 999px; padding: 3px 8px; }

/* tombol */
.btn { display: inline-flex; align-items: center; gap: 6px; font: inherit; font-size: 11px; font-weight: 600; border: 1px solid transparent; border-radius: 8px; padding: 8px 14px; cursor: pointer; transition: 0.2s; }
.btn--primary { background: #2563eb; color: #fff; }
.btn--primary:hover { background: #1d4ed8; }
.btn--ghost { background: #fff; border-color: #dbe3f0; color: #475569; }
.btn--ghost:hover { background: #f8fafc; }
.btn--danger { background: #ef4444; color: #fff; }
.btn--danger:hover { background: #dc2626; }
.btn-mini { display: inline-flex; align-items: center; gap: 4px; font: inherit; font-size: 10px; font-weight: 600; color: #2563eb; background: #e8f0ff; border: 0; border-radius: 6px; padding: 4px 9px; cursor: pointer; text-transform: none; letter-spacing: 0; }
.btn-mini:hover { background: #d6e4ff; }

/* toolbar */
.toolbar { display: flex; gap: 10px; margin-bottom: 12px; }
.search { flex: 1; display: flex; align-items: center; gap: 8px; height: 34px; padding: 0 12px; background: #f8fafc; border: 1px solid #e5eaf3; border-radius: 8px; color: #94a3b8; }
.search input { flex: 1; border: 0; outline: 0; background: transparent; font: inherit; font-size: 11px; color: var(--text, #0f172a); }
.search:focus-within { border-color: #2563eb; }
.filter { position: relative; }
.filter .btn { height: 34px; }
.filter__menu { position: absolute; right: 0; top: calc(100% + 6px); z-index: 20; min-width: 160px; list-style: none; margin: 0; padding: 6px; background: #fff; border: 1px solid #e5eaf3; border-radius: 10px; box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12); }
.filter__menu li { padding: 8px 10px; border-radius: 6px; font-size: 11px; cursor: pointer; }
.filter__menu li:hover { background: #f1f5f9; }
.filter__menu li.on { background: #e8f0ff; color: #2563eb; font-weight: 600; }

/* tabel */
.table-wrap { overflow-x: auto; border-radius: 10px; }
table { width: 100%; min-width: 760px; border-collapse: collapse; table-layout: fixed; }
thead th { background: #f8fafc; font-size: 9px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #475569; text-align: left; padding: 11px 10px; border-top: 1px solid #eef2f8; border-bottom: 1px solid #eef2f8; }
tbody td { padding: 13px 10px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; font-size: 11px; }
tbody tr:hover { background: #fafcff; }
.c { text-align: center !important; }
.muted { color: var(--muted, #64748b); }
.nama { font-weight: 700; color: #0f172a; }
.mono { font-family: ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace; font-size: 10px; color: #475569; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pill { display: inline-block; font-size: 10px; font-weight: 600; color: #2563eb; background: #e8f0ff; border-radius: 999px; padding: 3px 9px; white-space: nowrap; }
.pill.zero { color: #64748b; background: #f1f5f9; }
.aksi { display: inline-flex; gap: 8px; }
.ic { border: 0; background: transparent; font-size: 13px; cursor: pointer; padding: 2px; transition: transform 0.15s; }
.ic:hover { transform: scale(1.18); }
.ic--view { color: #2563eb; } .ic--edit { color: #f59e0b; } .ic--del { color: #ef4444; }
.empty { text-align: center; color: var(--muted, #64748b); padding: 28px 0 !important; }

/* pager */
.pager { display: flex; gap: 6px; margin-top: 14px; }
.pg { min-width: 24px; height: 24px; display: grid; place-items: center; font: inherit; font-size: 10px; font-weight: 600; color: #475569; background: #fff; border: 1px solid #dbe3f0; border-radius: 6px; cursor: pointer; }
.pg:hover:not(:disabled) { border-color: #2563eb; color: #2563eb; }
.pg.on { background: #2563eb; border-color: #2563eb; color: #fff; }
.pg:disabled { opacity: 0.45; cursor: not-allowed; }

/* ===== modal umum ===== */
.overlay { position: fixed; inset: 0; z-index: 100; background: rgba(15, 23, 42, 0.45); display: grid; place-items: center; padding: 16px; }
.modal { width: 100%; max-height: calc(100vh - 32px); display: flex; flex-direction: column; background: #fff; border-radius: 16px; box-shadow: 0 24px 60px rgba(15, 23, 42, 0.25); overflow: hidden; font-size: 12px; }
.modal--lg { max-width: 600px; }
.modal--sm { max-width: 360px; }

.m-head { display: flex; align-items: center; gap: 12px; padding: 18px 22px; border-bottom: 1px solid #eef2f8; }
.m-head__icon { width: 34px; height: 34px; border-radius: 9px; background: #e8f0ff; color: #2563eb; display: grid; place-items: center; font-size: 16px; flex-shrink: 0; }
.m-head__text { flex: 1; min-width: 0; }
.m-head h3 { margin: 0; font-size: 14px; font-weight: 700; }
.m-head p { margin: 2px 0 0; font-size: 10px; color: var(--muted, #64748b); }
.m-close { border: 0; background: transparent; color: #64748b; font-size: 12px; width: 26px; height: 26px; border-radius: 6px; cursor: pointer; }
.m-close:hover { background: #f1f5f9; }

.m-body { flex: 1; overflow-y: auto; padding: 18px 22px; display: flex; flex-direction: column; gap: 12px; }
.m-body--pad { padding: 22px; gap: 8px; }
.plain { margin: 0; font-size: 14px; }
.confirm { margin: 0; font-size: 12px; color: #475569; line-height: 1.5; }

.m-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding: 14px 22px; border-top: 1px solid #eef2f8; background: #fff; }
.m-foot small { font-size: 9.5px; color: #94a3b8; }
.m-foot__act { display: flex; gap: 8px; }
.m-foot--end { justify-content: flex-end; }

/* profil */
.profile { display: flex; align-items: center; gap: 12px; padding: 14px; border: 1px solid #e5eaf3; border-radius: 12px; background: #fbfcff; flex-wrap: wrap; }
.profile__logo { width: 38px; height: 38px; border-radius: 9px; background: #2563eb; color: #fff; display: grid; place-items: center; font-size: 18px; flex-shrink: 0; }
.profile__info { flex: 1; min-width: 160px; display: flex; flex-direction: column; gap: 3px; }
.profile__name { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.profile__name b { font-size: 13px; }
.profile__info small { font-size: 10px; color: var(--muted, #64748b); }
.badge { display: inline-flex; align-items: center; gap: 5px; font-size: 9px; font-weight: 600; color: #15803d; background: #dcfce7; border-radius: 999px; padding: 2px 8px; }
.badge i { width: 5px; height: 5px; border-radius: 50%; background: #22c55e; }
.badge.off { color: #64748b; background: #f1f5f9; }
.badge.off i { background: #94a3b8; }
.profile__meta { display: flex; gap: 8px; }
.meta { display: inline-flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 600; color: #475569; background: #fff; border: 1px solid #e5eaf3; border-radius: 8px; padding: 6px 10px; white-space: nowrap; }
.meta i { color: #64748b; }

/* judul seksi */
.sec-title { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 4px; font-size: 9px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #475569; }
.sec-title small { font-size: 9px; font-weight: 500; letter-spacing: 0; text-transform: none; color: #94a3b8; }
.count { font-style: normal; font-size: 9px; font-weight: 600; letter-spacing: 0; text-transform: none; color: #475569; background: #f1f5f9; border-radius: 999px; padding: 2px 8px; }

/* kontak */
.kontak { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.box { display: flex; align-items: flex-start; gap: 10px; padding: 11px 12px; border: 1px solid #e5eaf3; border-radius: 10px; background: #fff; }
.box > i { color: #94a3b8; font-size: 13px; margin-top: 1px; }
.box div { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.box small { font-size: 8.5px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #94a3b8; }
.box b { font-size: 11px; font-weight: 600; color: #0f172a; word-break: break-word; line-height: 1.4; }

/* lowongan */
.jobs { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.job { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border: 1px solid #e5eaf3; border-radius: 10px; background: #fff; }
.job--empty { justify-content: center; color: #94a3b8; font-size: 11px; }
.job__main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
.job__title { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.job__title b { font-size: 12px; }
.tag { font-size: 8.5px; font-weight: 600; color: #475569; background: #f1f5f9; border: 1px solid #e5eaf3; border-radius: 5px; padding: 1px 6px; }
.job__meta { display: flex; gap: 14px; flex-wrap: wrap; font-size: 9.5px; color: #64748b; }
.job__meta i { margin-right: 3px; }
.status { font-size: 9px; font-weight: 700; color: #15803d; background: #dcfce7; border-radius: 6px; padding: 3px 9px; }
.status.off { color: #64748b; background: #e2e8f0; }
.job__arrow { color: #cbd5e1; font-size: 11px; }
.job.off { background: #f8fafc; }
.job.off .job__title b { color: #94a3b8; }
.job.off .job__meta { color: #94a3b8; }

/* form */
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.field { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.field span { font-size: 10px; font-weight: 600; color: #475569; }
.field input, .field select, .field textarea { width: 100%; padding: 0 10px; font: inherit; font-size: 11px; color: #0f172a; background: #fff; border: 1px solid #dbe3f0; border-radius: 8px; outline: 0; }
.field input, .field select { height: 34px; }
.field textarea { padding: 8px 10px; resize: vertical; line-height: 1.4; }
.field input:focus, .field select:focus, .field textarea:focus { border-color: #2563eb; }
.field em, .err { font-style: normal; font-size: 10px; color: #ef4444; }
.hint { margin: 0; font-size: 10.5px; color: #94a3b8; text-align: center; padding: 10px 0; }

.lw { display: flex; flex-direction: column; gap: 8px; padding: 12px; border: 1px solid #e5eaf3; border-radius: 10px; background: #fbfcff; }
.lw__row { display: flex; gap: 8px; }
.lw__posisi { flex: 1; height: 34px; padding: 0 10px; font: inherit; font-size: 11px; font-weight: 600; border: 1px solid #dbe3f0; border-radius: 8px; outline: 0; background: #fff; }
.lw__posisi:focus { border-color: #2563eb; }
.lw__del { width: 34px; height: 34px; border: 1px solid #fecaca; background: #fff; color: #ef4444; border-radius: 8px; cursor: pointer; }
.lw__del:hover { background: #fef2f2; }
.lw__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }

/* responsif */
@media (max-width: 1100px) { .stats { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) {
  .stats { grid-template-columns: 1fr; }
  .toolbar { flex-direction: column; }
  .kontak, .grid2 { grid-template-columns: 1fr; }
  .lw__grid { grid-template-columns: 1fr 1fr; }
  .profile__meta { width: 100%; }
}
</style>