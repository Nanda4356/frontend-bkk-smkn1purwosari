<script setup>
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'bkk-alumni-v3'
const TOTAL_DESAIN = 1250
const BASE = { terbaru: 530, menunggu: 335, verified: 915 }
const TAHUN_TERBARU = 2026

const jurusanMap = {
  RPL: 'Rekayasa Perangkat Lunak',
  TKJ: 'Teknik Komputer dan Jaringan',
  DKV: 'Desain Komunikasi Visual',
  MM: 'Multimedia',
  TPL: 'Teknik Pengelasan',
  OTKP: 'Otomatisasi dan Tata Kelola Perkantoran',
  AKT: 'Akuntansi',
}
const jurusanKode = Object.keys(jurusanMap)

/* ---------- data awal ---------- */
const seed = [
  {
    id: 1,
    nama: 'Andi Saputra',
    nisn: '0061234501',
    jurusan: 'RPL',
    tahun: 2026,
    telp: '0812-1111-2201',
    alamat: 'Desa Purwosari, Kec. Purwosari, Pasuruan',
    verified: true,
    cv: { nama: 'CV_AndiSaputra.pdf', ukuran: '1.2MB' },
    diperbarui: '2026-05-20',
  },
  {
    id: 2,
    nama: 'Siti Rahmawati',
    nisn: '0061234502',
    jurusan: 'TKJ',
    tahun: 2026,
    telp: '0821-2222-3302',
    alamat: 'Desa Kejapanan, Kec. Gempol, Pasuruan',
    verified: true,
    cv: { nama: 'CV_SitiRahmawati.pdf', ukuran: '0.9MB' },
    diperbarui: '2026-05-21',
  },
  {
    id: 3,
    nama: 'Budi Santoso',
    nisn: '0061234503',
    jurusan: 'DKV',
    tahun: 2025,
    telp: '0857-3333-4403',
    alamat: 'Desa Sukorejo, Kec. Sukorejo, Pasuruan',
    verified: false,
    cv: null,
    diperbarui: '2026-05-18',
  },
  {
    id: 4,
    nama: 'Nanda Rezqy Agyun Putra',
    nisn: '0064920183',
    jurusan: 'RPL',
    tahun: 2026,
    telp: '0812-3456-7890',
    alamat: 'Desa Bakalan, Kec. Purwosari, Pasuruan',
    verified: true,
    cv: { nama: 'CV_NandaRezqy.pdf', ukuran: '1.4MB' },
    diperbarui: '2026-05-24',
  },
  {
    id: 5,
    nama: 'Dewi Anggraini',
    nisn: '0061234505',
    jurusan: 'AKT',
    tahun: 2024,
    telp: '0813-4444-5505',
    alamat: 'Desa Cangkringmalang, Kec. Beji, Pasuruan',
    verified: true,
    cv: { nama: 'CV_DewiAnggraini.pdf', ukuran: '0.8MB' },
    diperbarui: '2026-05-15',
  },
  {
    id: 6,
    nama: 'Rizky Pratama',
    nisn: '0061234506',
    jurusan: 'MM',
    tahun: 2026,
    telp: '0852-5555-6606',
    alamat: 'Desa Kebonagung, Kec. Pandaan, Pasuruan',
    verified: false,
    cv: null,
    diperbarui: '2026-05-19',
  },
  {
    id: 7,
    nama: 'Maya Putri Lestari',
    nisn: '0061234507',
    jurusan: 'OTKP',
    tahun: 2025,
    telp: '0838-6666-7707',
    alamat: 'Desa Karangjati, Kec. Pandaan, Pasuruan',
    verified: true,
    cv: { nama: 'CV_MayaPutri.pdf', ukuran: '1.1MB' },
    diperbarui: '2026-05-10',
  },
  {
    id: 8,
    nama: 'Fajar Ramadhan',
    nisn: '0061234508',
    jurusan: 'TKJ',
    tahun: 2026,
    telp: '0877-7777-8808',
    alamat: 'Desa Wonosari, Kec. Purwodadi, Pasuruan',
    verified: true,
    cv: { nama: 'CV_FajarRamadhan.pdf', ukuran: '1.2MB' },
    diperbarui: '2026-05-12',
  },
  {
    id: 9,
    nama: 'Lina Marlina',
    nisn: '0061234509',
    jurusan: 'RPL',
    tahun: 2024,
    telp: '0819-8888-9909',
    alamat: 'Desa Bulusari, Kec. Gempol, Pasuruan',
    verified: false,
    cv: null,
    diperbarui: '2026-05-09',
  },
  {
    id: 10,
    nama: 'Galih Prasetyo',
    nisn: '0061234510',
    jurusan: 'TPL',
    tahun: 2025,
    telp: '0831-9999-1010',
    alamat: 'Desa Pucangsari, Kec. Pandaan, Pasuruan',
    verified: true,
    cv: { nama: 'CV_GalihPrasetyo.pdf', ukuran: '1.0MB' },
    diperbarui: '2026-05-08',
  },
  {
    id: 11,
    nama: 'Ayu Wulandari',
    nisn: '0061234511',
    jurusan: 'DKV',
    tahun: 2026,
    telp: '0856-1212-1111',
    alamat: 'Desa Ngerong, Kec. Gempol, Pasuruan',
    verified: true,
    cv: { nama: 'CV_AyuWulandari.pdf', ukuran: '2.0MB' },
    diperbarui: '2026-05-22',
  },
  {
    id: 12,
    nama: 'Rendi Kurniawan',
    nisn: '0061234512',
    jurusan: 'MM',
    tahun: 2025,
    telp: '0822-1313-1212',
    alamat: 'Desa Sidogiri, Kec. Kraton, Pasuruan',
    verified: false,
    cv: null,
    diperbarui: '2026-05-07',
  },
  {
    id: 13,
    nama: 'Putri Ayu Ningsih',
    nisn: '0061234513',
    jurusan: 'AKT',
    tahun: 2026,
    telp: '0815-1414-1313',
    alamat: 'Desa Tambakrejo, Kec. Purwosari, Pasuruan',
    verified: true,
    cv: { nama: 'CV_PutriAyu.pdf', ukuran: '0.7MB' },
    diperbarui: '2026-05-23',
  },
  {
    id: 14,
    nama: 'Dimas Aditya',
    nisn: '0061234514',
    jurusan: 'TKJ',
    tahun: 2024,
    telp: '0811-1515-1414',
    alamat: 'Desa Ledug, Kec. Prigen, Pasuruan',
    verified: true,
    cv: { nama: 'CV_DimasAditya.pdf', ukuran: '1.2MB' },
    diperbarui: '2026-05-06',
  },
  {
    id: 15,
    nama: 'Nurul Hidayah',
    nisn: '0061234515',
    jurusan: 'OTKP',
    tahun: 2026,
    telp: '0838-1616-1515',
    alamat: 'Desa Bakalan, Kec. Purwosari, Pasuruan',
    verified: false,
    cv: null,
    diperbarui: '2026-05-17',
  },
  {
    id: 16,
    nama: 'Yoga Permana',
    nisn: '0061234516',
    jurusan: 'RPL',
    tahun: 2025,
    telp: '0877-1717-1616',
    alamat: 'Desa Candiwates, Kec. Prigen, Pasuruan',
    verified: true,
    cv: { nama: 'CV_YogaPermana.pdf', ukuran: '1.3MB' },
    diperbarui: '2026-05-05',
  },
  {
    id: 17,
    nama: 'Intan Permatasari',
    nisn: '0061234517',
    jurusan: 'DKV',
    tahun: 2024,
    telp: '0852-1818-1717',
    alamat: 'Desa Semampir, Kec. Bangil, Pasuruan',
    verified: true,
    cv: { nama: 'CV_IntanPermata.pdf', ukuran: '1.5MB' },
    diperbarui: '2026-05-04',
  },
  {
    id: 18,
    nama: 'Hendra Wijaya',
    nisn: '0061234518',
    jurusan: 'TPL',
    tahun: 2026,
    telp: '0813-1919-1818',
    alamat: 'Desa Pohjentrek, Kec. Pohjentrek, Pasuruan',
    verified: false,
    cv: null,
    diperbarui: '2026-05-16',
  },
]

function load() {
  try {
    const r = localStorage.getItem(STORAGE_KEY)
    if (r) return JSON.parse(r)
  } catch (e) {}
  return JSON.parse(JSON.stringify(seed))
}
const alumni = ref(load())
watch(
  alumni,
  (v) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
    } catch (e) {}
  },
  { deep: true },
)

/* ---------- util ---------- */
const BULAN = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]
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
const fmt = (n) => new Intl.NumberFormat('id-ID').format(n)
function fmtUkuran(b) {
  if (b >= 1048576) return `${(b / 1048576).toFixed(1)}MB`
  return `${Math.max(1, Math.round(b / 1024))}KB`
}

/* ---------- statistik ---------- */
const cnt = (arr, fn) => arr.filter(fn).length
const isTerbaru = (a) => a.tahun === TAHUN_TERBARU
const isVerified = (a) => a.verified
const isMenunggu = (a) => !a.verified

// selisih data yang ditambah/dihapus admin dibanding data awal
const dTotal = computed(() => alumni.value.length - seed.length)
const dTerbaru = computed(() => cnt(alumni.value, isTerbaru) - cnt(seed, isTerbaru))
const dVerified = computed(() => cnt(alumni.value, isVerified) - cnt(seed, isVerified))
const dMenunggu = computed(() => cnt(alumni.value, isMenunggu) - cnt(seed, isMenunggu))

const totalAlumni = computed(() => TOTAL_DESAIN + dTotal.value)
const terbaru = computed(() => BASE.terbaru + dTerbaru.value)
const verified = computed(() => BASE.verified + dVerified.value)
const menunggu = computed(() => BASE.menunggu + dMenunggu.value)
const persenMenunggu = computed(() => Math.round((menunggu.value / totalAlumni.value) * 100))
const persenVerified = computed(() => Math.round((verified.value / totalAlumni.value) * 100))

/* ---------- cari, filter, paging ---------- */
const q = ref('')
const fJurusan = ref('')
const fTahun = ref('')
const tahunOptions = computed(() => {
  const semua = new Set(alumni.value.map((a) => a.tahun))
  return [...semua].sort((a, b) => b - a)
})

const isFiltering = computed(() => !!(q.value.trim() || fJurusan.value || fTahun.value))
const filtered = computed(() => {
  const k = q.value.trim().toLowerCase()
  return alumni.value.filter((a) => {
    const cocok = !k || a.nama.toLowerCase().includes(k) || a.nisn.includes(k)
    const cocokJurusan = !fJurusan.value || a.jurusan === fJurusan.value
    const cocokTahun = !fTahun.value || a.tahun === Number(fTahun.value)
    return cocok && cocokJurusan && cocokTahun
  })
})

const perPage = 6
const page = ref(1)
const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))
const pagedRows = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))
const nomorAwal = computed(() => (page.value - 1) * perPage)
watch([q, fJurusan, fTahun], () => (page.value = 1))
watch(pages, (n) => {
  if (page.value > n) page.value = n
})

const jumlahTampil = computed(() => {
  return isFiltering.value ? filtered.value.length : totalAlumni.value
})
const dari = computed(() => (filtered.value.length ? nomorAwal.value + 1 : 0))
const sampai = computed(() => nomorAwal.value + pagedRows.value.length)

/* ---------- modal ---------- */
const modal = ref(null) // 'detail' | 'tambah' | 'ubah' | 'hapus'
const detailId = ref(null)
const detail = computed(() => alumni.value.find((a) => a.id === detailId.value))
const form = ref({})
const errors = ref({})
const target = ref(null)
const toast = ref('')
let toastTimer

function showToast(t) {
  toast.value = t
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.value = ''), 2600)
}

function formKosong() {
  return {
    id: null,
    nama: '',
    nisn: '',
    jurusan: 'RPL',
    tahun: new Date().getFullYear(),
    telp: '',
    alamat: '',
    verified: false,
    cv: null,
    diperbarui: today(),
  }
}
function bukaDetail(a) {
  detailId.value = a.id
  modal.value = 'detail'
}
function bukaTambah() {
  form.value = formKosong()
  errors.value = {}
  modal.value = 'tambah'
}
function bukaUbah(a) {
  form.value = JSON.parse(JSON.stringify(a))
  errors.value = {}
  modal.value = 'ubah'
}
function bukaHapus(a) {
  target.value = a
  modal.value = 'hapus'
}
function tutup() {
  modal.value = null
}
function batalForm() {
  if (modal.value === 'ubah') modal.value = 'detail'
  else tutup()
}

function pilihBerkas(e) {
  const f = e.target.files?.[0]
  e.target.value = ''
  if (!f) return
  if (f.size > 2 * 1024 * 1024) {
    errors.value = { ...errors.value, cv: 'Ukuran berkas maksimal 2 MB' }
    return
  }
  const berkas = { nama: f.name, ukuran: fmtUkuran(f.size) }
  errors.value = { ...errors.value, cv: '' }
  if (f.size <= 300 * 1024) {
    const r = new FileReader()
    r.onload = () => (form.value.cv = { ...berkas, url: r.result })
    r.readAsDataURL(f)
  } else {
    form.value.cv = berkas
  }
}
function hapusBerkas() {
  form.value.cv = null
}
function unduh(c) {
  if (c?.url) {
    const a = document.createElement('a')
    a.href = c.url
    a.download = c.nama
    a.click()
  } else {
    showToast('Berkas contoh. File asli tersedia setelah terhubung ke server.')
  }
}

function validasi() {
  const e = {}
  const f = form.value
  if (!f.nama.trim()) e.nama = 'Nama lengkap wajib diisi'
  if (!/^\d{10}$/.test(f.nisn)) e.nisn = 'NISN harus 10 digit angka'
  else if (alumni.value.some((a) => a.nisn === f.nisn && a.id !== f.id)) {
    e.nisn = 'NISN sudah terdaftar'
  }
  if (!/^\d{4}$/.test(String(f.tahun))) e.tahun = 'Isi tahun, contoh 2026'
  if (f.telp.replace(/\D/g, '').length < 8) e.telp = 'No. telepon minimal 8 digit'
  if (!f.alamat.trim()) e.alamat = 'Alamat wajib diisi'
  errors.value = e
  return Object.keys(e).length === 0
}

function simpan() {
  if (!validasi()) return
  const data = JSON.parse(JSON.stringify(form.value))
  data.nama = data.nama.trim()
  data.tahun = Number(data.tahun)
  data.diperbarui = today()
  if (modal.value === 'tambah') {
    data.id = Date.now()
    alumni.value.push(data)
    q.value = ''
    fJurusan.value = ''
    fTahun.value = ''
    page.value = Math.ceil(alumni.value.length / perPage)
    tutup()
  } else {
    const i = alumni.value.findIndex((a) => a.id === data.id)
    if (i !== -1) alumni.value[i] = data
    detailId.value = data.id
    modal.value = 'detail'
  }
}

function hapus() {
  alumni.value = alumni.value.filter((a) => a.id !== target.value.id)
  tutup()
}
</script>

<template>
  <div class="page">
    <!-- header -->
    <header class="head">
      <div class="head__left">
        <span class="head__icon"><i class="bi bi-mortarboard"></i></span>
        <div>
          <h1>Kelola Data Alumni</h1>
          <p>Kelola data alumni, verifikasi, dan dokumen pendukung dengan mudah.</p>
        </div>
      </div>
      <nav class="crumb">
        <i class="bi bi-house-door"></i>
        <RouterLink to="/admin">Dashboard</RouterLink>
        <span>/</span>
        <b>Data Alumni</b>
      </nav>
    </header>

    <!-- statistik -->
    <section class="stats">
      <article class="stat">
        <div class="stat__top">
          <span class="stat__icon blue"><i class="bi bi-people"></i></span>
          <span class="stat__badge blue">Aktif &amp; Terverifikasi</span>
        </div>
        <small class="stat__title">TOTAL ALUMNI TERDAFTAR</small>
        <strong class="stat__value">{{ fmt(totalAlumni) }} <span>alumni</span></strong>
        <small class="stat__foot">+{{ 48 + dTotal }} alumni baru di tahun 2026</small>
      </article>

      <article class="stat">
        <div class="stat__top">
          <span class="stat__icon purple"><i class="bi bi-mortarboard"></i></span>
          <span class="stat__badge purple">Angkatan Terbaru</span>
        </div>
        <small class="stat__title">TAHUN KELULUSAN TERBARU</small>
        <strong class="stat__value">{{ fmt(terbaru) }} <span>alumni</span></strong>
        <small class="stat__foot">Lulusan tahun 2026</small>
      </article>

      <article class="stat">
        <div class="stat__top">
          <span class="stat__icon orange"><i class="bi bi-hourglass-split"></i></span>
          <span class="stat__badge orange">{{ persenMenunggu }}%</span>
        </div>
        <small class="stat__title">MENUNGGU VERIFIKASI</small>
        <strong class="stat__value">{{ fmt(menunggu) }} <span>alumni</span></strong>
        <small class="stat__foot">Data alumni belum diverifikasi admin</small>
      </article>

      <article class="stat">
        <div class="stat__top">
          <span class="stat__icon green"><i class="bi bi-patch-check"></i></span>
          <span class="stat__badge green">{{ persenVerified }}%</span>
        </div>
        <small class="stat__title">DATA TERVERIFIKASI</small>
        <strong class="stat__value">{{ fmt(verified) }} <span>alumni</span></strong>
        <small class="stat__foot">Data alumni sudah terverifikasi</small>
      </article>
    </section>

    <!-- tabel -->
    <section class="panel">
      <div class="toolbar">
        <label class="search">
          <i class="bi bi-search"></i>
          <input v-model="q" type="text" placeholder="Cari nama atau NISN alumni..." />
        </label>
        <select v-model="fJurusan" class="sel">
          <option value="">Semua Jurusan</option>
          <option v-for="k in jurusanKode" :key="k" :value="k">{{ k }}</option>
        </select>
        <select v-model="fTahun" class="sel">
          <option value="">Semua Tahun</option>
          <option v-for="t in tahunOptions" :key="t" :value="t">{{ t }}</option>
        </select>
        <button class="btn btn--primary" @click="bukaTambah"><i class="bi bi-plus-lg"></i> Tambah Alumni</button>
      </div>

      <div class="table-wrap">
        <table>
          <colgroup>
            <col style="width: 50px" />
            <col style="width: 24%" />
            <col style="width: 14%" />
            <col style="width: 25%" />
            <col style="width: 9%" />
            <col style="width: 15%" />
            <col style="width: 96px" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" class="c">No.</th>
              <th scope="col">Nama Alumni</th>
              <th scope="col">NISN</th>
              <th scope="col">Jurusan</th>
              <th scope="col" class="c">Tahun</th>
              <th scope="col">No. Telepon</th>
              <th scope="col" class="c">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(a, i) in pagedRows" :key="a.id">
              <td class="c muted">{{ nomorAwal + i + 1 }}</td>
              <td class="nama">{{ a.nama }}</td>
              <td class="mono">{{ a.nisn }}</td>
              <td>
                <div class="jur">
                  <span class="kode">{{ a.jurusan }}</span>
                  <span class="jur__nama">{{ jurusanMap[a.jurusan] }}</span>
                </div>
              </td>
              <td class="c">{{ a.tahun }}</td>
              <td>{{ a.telp }}</td>
              <td class="c">
                <div class="aksi">
                  <button class="ic ic--view" title="Lihat" @click="bukaDetail(a)"><i class="bi bi-eye"></i></button>
                  <button class="ic ic--edit" title="Ubah" @click="bukaUbah(a)"><i class="bi bi-pencil"></i></button>
                  <button class="ic ic--del" title="Hapus" @click="bukaHapus(a)"><i class="bi bi-trash"></i></button>
                </div>
              </td>
            </tr>
            <tr v-if="!pagedRows.length">
              <td colspan="7" class="empty">Data alumni tidak ditemukan.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="foot">
        <small>Menampilkan {{ dari }}-{{ sampai }} dari {{ fmt(jumlahTampil) }} data</small>
        <div class="pager">
          <button class="pg" :disabled="page === 1" @click="page--"><i class="bi bi-chevron-left"></i></button>
          <button v-for="n in pages" :key="n" class="pg" :class="{ on: n === page }" @click="page = n">{{ n }}</button>
          <button class="pg" :disabled="page === pages" @click="page++"><i class="bi bi-chevron-right"></i></button>
        </div>
      </div>
    </section>

    <!-- ========== MODAL DETAIL ========== -->
    <div v-if="modal === 'detail' && detail" class="overlay" @click.self="tutup">
      <div class="modal">
        <header class="m-head">
          <h3>Detail Alumni</h3>
          <span class="m-chip">Profil Alumni</span>
          <button class="m-close" aria-label="Tutup" @click="tutup"><i class="bi bi-x-lg"></i></button>
        </header>

        <div class="m-body">
          <div class="profile">
            <span class="avatar">
              <i class="bi bi-person"></i>
              <em :class="{ off: !detail.verified }"></em>
            </span>
            <div class="profile__info">
              <b>{{ detail.nama }}</b>
              <small>Data Alumni</small>
            </div>
            <span class="vbadge" :class="{ off: !detail.verified }">
              <i></i>{{ detail.verified ? 'Terverifikasi' : 'Menunggu Verifikasi' }}
            </span>
          </div>

          <div class="sec-title">Informasi Pribadi</div>
          <div class="info">
            <div class="info__row info__row--head"><span>Informasi</span><span>Data</span></div>
            <div class="info__row"><span>Nama lengkap</span><b>{{ detail.nama }}</b></div>
            <div class="info__row"><span>NISN</span><b class="mono-b">{{ detail.nisn }}</b></div>
            <div class="info__row">
              <span>Jurusan</span>
              <div class="jur">
                <span class="kode kode--blue">{{ detail.jurusan }}</span>
                <small>({{ jurusanMap[detail.jurusan] }})</small>
              </div>
            </div>
            <div class="info__row"><span>Tahun lulus</span><b>{{ detail.tahun }}</b></div>
            <div class="info__row">
              <span>No. telepon</span>
              <div class="tel">{{ detail.telp }} <i class="bi bi-telephone"></i></div>
            </div>
            <div class="info__row"><span>Alamat</span><b>{{ detail.alamat }}</b></div>
          </div>

          <div class="sec-title sec-title--between">
            <span>Dokumen Alumni</span>
            <small>{{ detail.cv ? '1 Berkas Terlampir' : 'Belum ada berkas' }}</small>
          </div>
          <div v-if="detail.cv" class="file">
            <span class="file__icon"><i class="bi bi-file-earmark-pdf"></i></span>
            <div class="file__info">
              <b>{{ detail.cv.nama }}</b>
              <small>Dokumen CV alumni · {{ detail.cv.ukuran }}</small>
            </div>
            <button class="btn btn--ghost btn--sm" @click="unduh(detail.cv)"><i class="bi bi-download"></i> Unduh</button>
          </div>
          <div v-else class="file file--empty">Alumni ini belum mengunggah CV.</div>
        </div>

        <footer class="m-foot">
          <small>Terakhir diperbarui: {{ fmtTanggal(detail.diperbarui) }}</small>
          <div class="m-foot__act">
            <button class="btn btn--ghost" @click="tutup">Tutup</button>
            <button class="btn btn--primary" @click="bukaUbah(detail)"><i class="bi bi-pencil-square"></i> Edit Data</button>
          </div>
        </footer>
      </div>
    </div>

    <!-- ========== MODAL TAMBAH / EDIT ========== -->
    <div v-if="modal === 'tambah' || modal === 'ubah'" class="overlay" @click.self="tutup">
      <form class="modal" @submit.prevent="simpan">
        <header class="m-head">
          <h3>{{ modal === 'tambah' ? 'Tambah Alumni' : 'Edit Data Alumni' }}</h3>
          <span class="m-chip">Profil Alumni</span>
          <button type="button" class="m-close" aria-label="Tutup" @click="tutup"><i class="bi bi-x-lg"></i></button>
        </header>

        <div class="m-body">
          <div class="sec-title">Informasi Pribadi</div>
          <label class="field">
            <span>Nama Lengkap</span>
            <input v-model="form.nama" placeholder="Nanda Rezqy Agyun Putra" />
            <em v-if="errors.nama">{{ errors.nama }}</em>
          </label>
          <div class="grid2">
            <label class="field">
              <span>NISN</span>
              <input v-model="form.nisn" maxlength="10" inputmode="numeric" placeholder="0064920183" />
              <em v-if="errors.nisn">{{ errors.nisn }}</em>
            </label>
            <label class="field">
              <span>Tahun Lulus</span>
              <input v-model="form.tahun" maxlength="4" inputmode="numeric" placeholder="2026" />
              <em v-if="errors.tahun">{{ errors.tahun }}</em>
            </label>
          </div>
          <label class="field">
            <span>Jurusan</span>
            <select v-model="form.jurusan">
              <option v-for="k in jurusanKode" :key="k" :value="k">{{ k }} ({{ jurusanMap[k] }})</option>
            </select>
          </label>
          <div class="grid2">
            <label class="field">
              <span>No. Telepon</span>
              <input v-model="form.telp" placeholder="0812-3456-7890" />
              <em v-if="errors.telp">{{ errors.telp }}</em>
            </label>
            <label class="field">
              <span>Status Verifikasi</span>
              <select v-model="form.verified">
                <option :value="true">Terverifikasi</option>
                <option :value="false">Menunggu Verifikasi</option>
              </select>
            </label>
          </div>
          <label class="field">
            <span>Alamat</span>
            <textarea v-model="form.alamat" rows="2" placeholder="Desa Bakalan, Kec. Purwosari, Pasuruan"></textarea>
            <em v-if="errors.alamat">{{ errors.alamat }}</em>
          </label>

          <div class="sec-title sec-title--between">
            <span>Dokumen Alumni</span>
            <small>{{ form.cv ? '1 Berkas Terlampir' : 'Belum ada berkas' }}</small>
          </div>
          <div v-if="form.cv" class="file">
            <span class="file__icon"><i class="bi bi-file-earmark-pdf"></i></span>
            <div class="file__info">
              <b>{{ form.cv.nama }}</b>
              <small>Dokumen CV alumni · {{ form.cv.ukuran }}</small>
            </div>
            <button type="button" class="btn btn--danger-soft btn--sm" @click="hapusBerkas"><i class="bi bi-trash"></i> Hapus</button>
          </div>
          <label class="upload">
            <i class="bi bi-cloud-arrow-up"></i>
            <span>{{ form.cv ? 'Ganti berkas CV' : 'Unggah berkas CV' }}</span>
            <small>PDF / DOC / DOCX, maksimal 2 MB</small>
            <input type="file" accept=".pdf,.doc,.docx" hidden @change="pilihBerkas" />
          </label>
          <em v-if="errors.cv" class="err">{{ errors.cv }}</em>
        </div>

        <footer class="m-foot">
          <small>Terakhir diperbarui: {{ fmtTanggal(form.diperbarui) }}</small>
          <div class="m-foot__act">
            <button type="button" class="btn btn--ghost" @click="batalForm">Batal</button>
            <button type="submit" class="btn btn--primary"><i class="bi bi-check2"></i> Simpan Perubahan</button>
          </div>
        </footer>
      </form>
    </div>

    <!-- ========== MODAL HAPUS ========== -->
    <div v-if="modal === 'hapus'" class="overlay" @click.self="tutup">
      <div class="modal modal--sm">
        <div class="m-body">
          <h3 class="plain">Hapus Data Alumni?</h3>
          <p class="confirm">Data <b>{{ target.nama }}</b> beserta dokumennya akan dihapus dan tidak bisa dikembalikan.</p>
        </div>
        <footer class="m-foot m-foot--end">
          <button class="btn btn--ghost" @click="tutup">Batal</button>
          <button class="btn btn--danger" @click="hapus">Hapus</button>
        </footer>
      </div>
    </div>

    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  color: var(--text, #0f172a);
}

/* header */
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.head__left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.head__icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #e8f0ff;
  color: #2563eb;
  display: grid;
  place-items: center;
  font-size: 18px;
  flex-shrink: 0;
}

.head h1 {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
}

.head p {
  margin: 2px 0 0;
  font-size: 11px;
  color: var(--muted, #64748b);
}

.crumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: var(--muted, #64748b);
  background: #fff;
  border: 1px solid #e5eaf3;
  border-radius: 8px;
  padding: 6px 10px;
}

.crumb a:hover {
  color: #2563eb;
}

.crumb b {
  color: var(--text, #0f172a);
  font-weight: 600;
}

/* statistik */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.stat {
  background: #fff;
  border: 1px solid #e5eaf3;
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.stat__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.stat__icon {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  font-size: 13px;
}

.stat__badge {
  font-size: 8.5px;
  font-weight: 600;
  border-radius: 999px;
  padding: 3px 8px;
}

.stat__title {
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #64748b;
}

.stat__value {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
}

.stat__value span {
  font-size: 11px;
  font-weight: 500;
  color: #64748b;
}

.stat__foot {
  font-size: 9px;
  color: var(--muted, #64748b);
}

.stat__icon.blue,
.stat__badge.blue {
  background: #e8f0ff;
  color: #2563eb;
}

.stat__icon.purple,
.stat__badge.purple {
  background: #f1eaff;
  color: #7c3aed;
}

.stat__icon.orange,
.stat__badge.orange {
  background: #ffefe0;
  color: #f97316;
}

.stat__icon.green,
.stat__badge.green {
  background: #e2f7ea;
  color: #16a34a;
}

/* panel + toolbar */
.panel {
  background: #fff;
  border: 1px solid #e5eaf3;
  border-radius: 14px;
  padding: 16px 18px 14px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.search {
  flex: 1;
  min-width: 200px;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding: 0 12px;
  background: #f8fafc;
  border: 1px solid #e5eaf3;
  border-radius: 8px;
  color: #94a3b8;
}

.search input {
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  font: inherit;
  font-size: 11px;
  color: var(--text, #0f172a);
}

.search:focus-within {
  border-color: #2563eb;
}

.sel {
  height: 34px;
  min-width: 120px;
  padding: 0 10px;
  font: inherit;
  font-size: 11px;
  color: #334155;
  background: #fff;
  border: 1px solid #dbe3f0;
  border-radius: 8px;
  outline: 0;
}

.sel:focus {
  border-color: #2563eb;
}

/* tombol */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font: inherit;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  transition: 0.2s;
}

.btn--sm {
  padding: 6px 11px;
  font-size: 10px;
}

.btn--primary {
  background: #2563eb;
  color: #fff;
}

.btn--primary:hover {
  background: #1d4ed8;
}

.btn--ghost {
  background: #fff;
  border-color: #dbe3f0;
  color: #334155;
}

.btn--ghost:hover {
  background: #f8fafc;
}

.btn--danger {
  background: #ef4444;
  color: #fff;
}

.btn--danger:hover {
  background: #dc2626;
}

.btn--danger-soft {
  background: #fff;
  border-color: #fecaca;
  color: #ef4444;
}

.btn--danger-soft:hover {
  background: #fef2f2;
}

/* tabel */
.table-wrap {
  overflow-x: auto;
  border-radius: 10px;
}

table {
  width: 100%;
  min-width: 780px;
  border-collapse: collapse;
  table-layout: fixed;
}

thead th {
  background: #f8fafc;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #475569;
  text-align: left;
  padding: 11px 10px;
  border-top: 1px solid #eef2f8;
  border-bottom: 1px solid #eef2f8;
}

tbody td {
  padding: 12px 10px;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
  font-size: 11px;
}

tbody tr:hover {
  background: #fafcff;
}

.c {
  text-align: center !important;
}

.muted {
  color: var(--muted, #64748b);
}

.nama {
  font-weight: 700;
}

.mono {
  font-family: ui-monospace, Menlo, Consolas, monospace;
  font-size: 10.5px;
  color: #475569;
}

.jur {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.jur__nama {
  font-size: 10px;
  color: #475569;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.kode {
  flex-shrink: 0;
  font-size: 9px;
  font-weight: 700;
  color: #2563eb;
  background: #e8f0ff;
  border-radius: 5px;
  padding: 3px 7px;
}

.aksi {
  display: inline-flex;
  gap: 8px;
}

.ic {
  border: 0;
  background: transparent;
  font-size: 13px;
  cursor: pointer;
  padding: 2px;
  transition: transform 0.15s;
}

.ic:hover {
  transform: scale(1.18);
}

.ic--view {
  color: #2563eb;
}

.ic--edit {
  color: #f59e0b;
}

.ic--del {
  color: #ef4444;
}

.empty {
  text-align: center;
  color: var(--muted, #64748b);
  padding: 28px 0 !important;
}

.foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 14px;
}

.foot small {
  font-size: 10px;
  color: var(--muted, #64748b);
}

.pager {
  display: flex;
  gap: 6px;
}

.pg {
  min-width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  font: inherit;
  font-size: 10px;
  font-weight: 600;
  color: #475569;
  background: #fff;
  border: 1px solid #dbe3f0;
  border-radius: 6px;
  cursor: pointer;
}

.pg:hover:not(:disabled) {
  border-color: #2563eb;
  color: #2563eb;
}

.pg.on {
  background: #2563eb;
  border-color: #2563eb;
  color: #fff;
}

.pg:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* ===== modal ===== */
.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(15, 23, 42, 0.45);
  display: grid;
  place-items: center;
  padding: 16px;
}

.modal {
  width: 100%;
  max-width: 480px;
  max-height: calc(100vh - 32px);
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.25);
  overflow: hidden;
  font-size: 12px;
}

.modal--sm {
  max-width: 360px;
}

.m-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 22px;
  border-bottom: 1px solid #eef2f8;
}

.m-head h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
}

.m-chip {
  font-size: 9px;
  font-weight: 600;
  color: #2563eb;
  background: #e8f0ff;
  border: 1px solid #cfe0ff;
  border-radius: 999px;
  padding: 2px 9px;
}

.m-close {
  margin-left: auto;
  border: 0;
  background: transparent;
  color: #64748b;
  font-size: 12px;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  cursor: pointer;
}

.m-close:hover {
  background: #f1f5f9;
}

.m-body {
  flex: 1;
  overflow-y: auto;
  padding: 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.plain {
  margin: 0 0 6px;
  font-size: 14px;
}

.confirm {
  margin: 0;
  font-size: 12px;
  color: #475569;
  line-height: 1.5;
}

.m-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 14px 22px;
  border-top: 1px solid #eef2f8;
  background: #fafbfe;
}

.m-foot small {
  font-size: 9.5px;
  color: #94a3b8;
}

.m-foot__act {
  display: flex;
  gap: 8px;
}

.m-foot--end {
  justify-content: flex-end;
}

/* profil */
.profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid #e5eaf3;
  border-radius: 12px;
  background: #fbfcff;
}

.avatar {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #2563eb;
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 20px;
  flex-shrink: 0;
}

.avatar em {
  position: absolute;
  right: -3px;
  bottom: -3px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid #fff;
}

.avatar em.off {
  background: #f59e0b;
}

.profile__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.profile__info b {
  font-size: 13px;
}

.profile__info small {
  font-size: 10px;
  color: var(--muted, #64748b);
}

.vbadge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 9px;
  font-weight: 600;
  color: #15803d;
  background: #dcfce7;
  border: 1px solid #bbf0cd;
  border-radius: 999px;
  padding: 3px 9px;
  white-space: nowrap;
}

.vbadge i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #22c55e;
}

.vbadge.off {
  color: #b45309;
  background: #fef3c7;
  border-color: #fde68a;
}

.vbadge.off i {
  background: #f59e0b;
}

.sec-title {
  margin-top: 4px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748b;
}

.sec-title--between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sec-title small {
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
  color: #94a3b8;
}

/* tabel informasi */
.info {
  border: 1px solid #e5eaf3;
  border-radius: 10px;
  overflow: hidden;
}

.info__row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 12px;
  align-items: center;
  padding: 11px 14px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 11px;
}

.info__row:last-child {
  border-bottom: 0;
}

.info__row > span {
  color: #64748b;
}

.info__row > b {
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
}

.info__row--head {
  background: #f8fafc;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 9px 14px;
}

.info__row--head span {
  color: #475569 !important;
}

.mono-b {
  font-family: ui-monospace, Menlo, Consolas, monospace;
  font-size: 10.5px !important;
  font-weight: 600 !important;
  color: #475569 !important;
}

.info .jur small {
  font-size: 10px;
  color: #64748b;
}

.kode--blue {
  background: #dbeafe;
}

.tel {
  color: #475569;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tel i {
  color: #94a3b8;
}

/* berkas */
.file {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid #e5eaf3;
  border-radius: 10px;
  background: #fff;
}

.file--empty {
  justify-content: center;
  color: #94a3b8;
  font-size: 11px;
  background: #fafbfe;
}

.file__icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: #fee2e2;
  color: #ef4444;
  display: grid;
  place-items: center;
  font-size: 15px;
  flex-shrink: 0;
}

.file__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.file__info b {
  font-size: 11.5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file__info small {
  font-size: 9.5px;
  color: #94a3b8;
}

.upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 14px;
  border: 1.5px dashed #cbd5e1;
  border-radius: 10px;
  color: #475569;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  transition: 0.2s;
}

.upload:hover {
  border-color: #2563eb;
  background: #f5f9ff;
  color: #2563eb;
}

.upload i {
  font-size: 20px;
}

.upload small {
  font-size: 9.5px;
  font-weight: 400;
  color: #94a3b8;
}

/* form */
.grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.field span {
  font-size: 10px;
  font-weight: 600;
  color: #475569;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 0 10px;
  font: inherit;
  font-size: 11px;
  color: #0f172a;
  background: #fff;
  border: 1px solid #dbe3f0;
  border-radius: 8px;
  outline: 0;
}

.field input,
.field select {
  height: 34px;
}

.field textarea {
  padding: 8px 10px;
  resize: vertical;
  line-height: 1.4;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: #2563eb;
}

.field em,
.err {
  font-style: normal;
  font-size: 10px;
  color: #ef4444;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  z-index: 200;
  background: #0f172a;
  color: #fff;
  font-size: 11px;
  padding: 10px 16px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.3);
}

/* responsif */
@media (max-width: 1100px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .grid2 {
    grid-template-columns: 1fr;
  }

  .info__row {
    grid-template-columns: 1fr;
    gap: 3px;
  }

  .info__row--head {
    display: none;
  }

  .profile {
    flex-wrap: wrap;
  }
}
</style>