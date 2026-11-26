<script setup>
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'bkk-lamaran-v2'
const BASE = { total: 128, menunggu: 24, seleksi: 46, diterima: 38 }

const statusList = ['Menunggu Diproses', 'Diproses', 'Wawancara', 'Diterima', 'Ditolak']
const statusClass = {
  'Menunggu Diproses': 'wait',
  Diproses: 'proc',
  Wawancara: 'intv',
  Diterima: 'ok',
  Ditolak: 'no',
}

/* ---------- data awal ---------- */
const seed = [
  {
    id: 1,
    nama: 'Andi Saputra',
    nisn: '0054236910',
    jurusan: 'RPL',
    telp: '0812-1111-2201',
    lowongan: 'Web Developer',
    perusahaan: 'PT Maju Jaya',
    tanggal: '2026-11-20',
    status: 'Menunggu Diproses',
    catatan: '',
    cv: 'CV_Andi_Saputra.pdf',
    cvUkuran: '2.4 MB',
    tahun: 2025,
    penutupan: '2026-11-30',
    diperbarui: '2026-11-20',
  },
  {
    id: 2,
    nama: 'Siti Amelia',
    nisn: '0061284452',
    jurusan: 'Multimedia',
    telp: '0821-2222-3302',
    lowongan: 'UI/UX Designer',
    perusahaan: 'CV Teknologi Mandiri',
    tanggal: '2026-11-21',
    status: 'Wawancara',
    catatan: 'Jadwal wawancara 28 November 2026 pukul 09.00 WIB.',
    cv: 'CV_Siti_Amelia.pdf',
    cvUkuran: '1.8 MB',
    tahun: 2026,
    penutupan: '2026-11-29',
    diperbarui: '2026-11-24',
  },
  {
    id: 3,
    nama: 'Budi Santoso',
    nisn: '0058231943',
    jurusan: 'Akuntansi',
    telp: '0857-3333-4403',
    lowongan: 'Staff Administrasi',
    perusahaan: 'PT Industri Sejahtera',
    tanggal: '2026-11-22',
    status: 'Diterima',
    catatan: 'Dinyatakan diterima. Mulai bekerja 1 Desember 2026.',
    cv: 'CV_Budi_Santoso.pdf',
    cvUkuran: '1.2 MB',
    tahun: 2024,
    penutupan: '2026-11-10',
    diperbarui: '2026-11-25',
  },
  {
    id: 4,
    nama: 'Rina Aprilia',
    nisn: '0059124401',
    jurusan: 'RPL',
    telp: '0813-4444-5505',
    lowongan: 'Web Developer',
    perusahaan: 'PT Maju Jaya',
    tanggal: '2026-11-23',
    status: 'Diproses',
    catatan: 'Berkas sedang diseleksi oleh pihak perusahaan.',
    cv: 'CV_Rina_Aprilia.pdf',
    cvUkuran: '2.0 MB',
    tahun: 2026,
    penutupan: '2026-11-30',
    diperbarui: '2026-11-24',
  },
  {
    id: 5,
    nama: 'Dimas Wahyu Pratama',
    nisn: '0053918251',
    jurusan: 'TKJ',
    telp: '0852-5555-6606',
    lowongan: 'Network Administrator',
    perusahaan: 'CV Berkah Mandiri',
    tanggal: '2026-11-24',
    status: 'Ditolak',
    catatan: 'Belum memenuhi kualifikasi pengalaman yang dibutuhkan.',
    cv: 'CV_Dimas_Wahyu.pdf',
    cvUkuran: '1.5 MB',
    tahun: 2025,
    penutupan: '2026-12-04',
    diperbarui: '2026-11-25',
  },
]

function load() {
  try {
    const r = localStorage.getItem(STORAGE_KEY)
    if (r) return JSON.parse(r)
  } catch (e) {}
  return JSON.parse(JSON.stringify(seed))
}

const list = ref(load())

watch(
  list,
  (v) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
    } catch (e) {}
  },
  { deep: true },
)

/* daftar perusahaan untuk saran isian (diambil dari halaman Data Perusahaan) */
function loadPerusahaan() {
  try {
    const r = JSON.parse(localStorage.getItem('bkk-perusahaan-v2') || 'null')
    if (Array.isArray(r) && r.length) return r.map((p) => p.nama)
  } catch (e) {}
  return ['PT Maju Jaya', 'CV Teknologi Mandiri', 'PT Industri Sejahtera', 'PT Astra Honda Motor', 'CV Barkah Mandiri']
}
const saranPerusahaan = ref(loadPerusahaan())

/* ---------- util ---------- */
const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

function tglPanjang(iso) {
  if (!iso) return '-'
  const [y, m, d] = iso.split('-')
  return `${Number(d)} ${BULAN[Number(m) - 1]} ${y}`
}

function today() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

function inisial(nama) {
  return nama
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((k) => k[0])
    .join('')
    .toUpperCase()
}

const warnaAvatar = ['a-blue', 'a-purple', 'a-green', 'a-orange', 'a-red']
const warna = (id, i = 0) => warnaAvatar[(Number(String(id).slice(-1)) + i) % warnaAvatar.length]

const fmt = (n) => new Intl.NumberFormat('id-ID').format(n)

/* ---------- statistik ---------- */
const cnt = (arr, fn) => arr.filter(fn).length
const isSeleksi = (l) => l.status === 'Diproses' || l.status === 'Wawancara'

const totalLamaran = computed(() => Math.max(0, BASE.total + list.value.length - seed.length))
const menunggu = computed(
  () => Math.max(0, BASE.menunggu + cnt(list.value, (l) => l.status === 'Menunggu Diproses') - cnt(seed, (l) => l.status === 'Menunggu Diproses')),
)
const seleksi = computed(() => Math.max(0, BASE.seleksi + cnt(list.value, isSeleksi) - cnt(seed, isSeleksi)))
const diterima = computed(
  () => Math.max(0, BASE.diterima + cnt(list.value, (l) => l.status === 'Diterima') - cnt(seed, (l) => l.status === 'Diterima')),
)

const stats = computed(() => [
  { no: '01', icon: 'bi-folder2', tone: 'blue', value: totalLamaran.value, label: 'Total Lamaran', foot: 'Jumlah seluruh lamaran yang masuk' },
  { no: '02', icon: 'bi-clock', tone: 'purple', value: menunggu.value, label: 'Menunggu Diproses', foot: 'Belum ditindaklanjuti Admin' },
  { no: '03', icon: 'bi-arrow-repeat', tone: 'green', value: seleksi.value, label: 'Dalam Proses Seleksi', foot: 'Tahap berkas & wawancara' },
  { no: '04', icon: 'bi-check-circle', tone: 'orange', value: diterima.value, label: 'Diterima Kerja', foot: 'Dinyatakan diterima mitra' },
])

/* ---------- cari, filter, paging ---------- */
const q = ref('')
const fStatus = ref('')
const fWaktu = ref('')
const filterOpen = ref(false)

const waktuOptions = [
  { v: '', t: 'Semua Waktu' },
  { v: '7', t: '7 Hari Terakhir' },
  { v: '30', t: '30 Hari Terakhir' },
  { v: 'bulan', t: 'Bulan Ini' },
]

function lolosWaktu(l) {
  if (!fWaktu.value) return true
  const sekarang = new Date(today())
  const tgl = new Date(l.tanggal)
  if (fWaktu.value === 'bulan') {
    return tgl.getMonth() === sekarang.getMonth() && tgl.getFullYear() === sekarang.getFullYear()
  }
  const selisih = (sekarang - tgl) / 86400000
  return selisih >= 0 && selisih <= Number(fWaktu.value)
}

const isFiltering = computed(() => !!(q.value.trim() || fStatus.value || fWaktu.value))

const filtered = computed(() => {
  const k = q.value.trim().toLowerCase()
  return list.value.filter((l) => {
    const cocok =
      !k ||
      l.nama.toLowerCase().includes(k) ||
      l.lowongan.toLowerCase().includes(k) ||
      l.perusahaan.toLowerCase().includes(k)
    return cocok && (!fStatus.value || l.status === fStatus.value) && lolosWaktu(l)
  })
})

const perPage = 5
const page = ref(1)
const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))
const rows = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))
const nomorAwal = computed(() => (page.value - 1) * perPage)

watch([q, fStatus, fWaktu], () => (page.value = 1))
watch(pages, (n) => {
  if (page.value > n) page.value = n
})

const jumlahTampil = computed(() => (isFiltering.value ? filtered.value.length : totalLamaran.value))
const dari = computed(() => (filtered.value.length ? nomorAwal.value + 1 : 0))
const sampai = computed(() => nomorAwal.value + rows.value.length)

function resetFilter() {
  q.value = ''
  fStatus.value = ''
  fWaktu.value = ''
  filterOpen.value = false
}

/* ---------- modal ---------- */
const alurMap = {
  'Menunggu Diproses': ['Lamaran Dikirim', 'Menunggu Diproses'],
  Diproses: ['Lamaran Dikirim', 'Diproses'],
  Wawancara: ['Lamaran Dikirim', 'Diproses', 'Wawancara'],
  Diterima: ['Lamaran Dikirim', 'Diproses', 'Wawancara', 'Diterima'],
  Ditolak: ['Lamaran Dikirim', 'Diproses', 'Ditolak'],
}

const catatanDefault = {
  'Menunggu Diproses': 'Lamaran menunggu pemeriksaan Admin.',
  Diproses: 'Lamaran sedang diproses oleh perusahaan.',
  Wawancara: 'Alumni dijadwalkan mengikuti wawancara.',
  Diterima: 'Alumni dinyatakan diterima oleh perusahaan.',
  Ditolak: 'Lamaran belum dapat dilanjutkan oleh perusahaan.',
}

const toast = ref('')
let toastTimer

function showToast(t) {
  toast.value = t
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.value = ''), 2600)
}

const modal = ref(null) // 'detail' | 'ubah'
const detailId = ref(null)
const detail = computed(() => list.value.find((l) => l.id === detailId.value))
const form = ref({})
const errors = ref({})

const alur = computed(() => {
  if (!detail.value) return []
  const jalur = alurMap[detail.value.status] || []
  return jalur.map((label, i) => ({
    label,
    cls: i === jalur.length - 1 ? statusClass[detail.value.status] : 'ok',
  }))
})

const catatanTerakhir = computed(() => {
  if (!detail.value) return ''
  return detail.value.catatan || catatanDefault[detail.value.status]
})

// nomor telepon disamarkan di detail sesuai desain
const maskTelp = (t) => `${(t || '').replace(/\D/g, '').slice(0, 4)}-xxxx`

function lihatCv() {
  showToast('Berkas contoh. File asli tersedia setelah terhubung ke server.')
}

function kirimKePerusahaan() {
  const i = list.value.findIndex((l) => l.id === detailId.value)
  if (i === -1) return
  list.value[i].status = 'Diproses'
  list.value[i].catatan = 'Lamaran telah dikirim ke perusahaan dan sedang diproses.'
  list.value[i].diperbarui = today()
  showToast('Lamaran berhasil dikirim ke perusahaan.')
}

function bukaDetail(l) {
  detailId.value = l.id
  modal.value = 'detail'
}

function bukaUbah(l) {
  saranPerusahaan.value = loadPerusahaan()
  form.value = JSON.parse(JSON.stringify(l))
  errors.value = {}
  modal.value = 'ubah'
}

function tutup() {
  modal.value = null
}

function batalForm() {
  modal.value = 'detail'
}

function validasi() {
  const e = {}
  const f = form.value
  if (!f.nama.trim()) e.nama = 'Nama alumni wajib diisi'
  if (!/^\d{10}$/.test(f.nisn)) e.nisn = 'NISN harus 10 digit angka'
  if (!f.jurusan.trim()) e.jurusan = 'Jurusan wajib diisi'
  if (f.telp.replace(/\D/g, '').length < 8) e.telp = 'No. telepon minimal 8 digit'
  if (!f.lowongan.trim()) e.lowongan = 'Nama lowongan wajib diisi'
  if (!f.perusahaan.trim()) e.perusahaan = 'Nama perusahaan wajib diisi'
  if (!/^\d{4}$/.test(String(f.tahun))) e.tahun = 'Isi tahun, contoh 2025'
  if (!f.tanggal) e.tanggal = 'Tanggal melamar wajib diisi'
  if (!f.penutupan) e.penutupan = 'Tanggal penutupan wajib diisi'
  errors.value = e
  return Object.keys(e).length === 0
}

function simpan() {
  if (!validasi()) return
  const data = JSON.parse(JSON.stringify(form.value))
  data.nama = data.nama.trim()
  data.tahun = Number(data.tahun)
  data.catatan = data.catatan.trim()
  data.diperbarui = today()
  const i = list.value.findIndex((l) => l.id === data.id)
  if (i !== -1) list.value[i] = data
  detailId.value = data.id
  modal.value = 'detail'
}
</script>

<template>
  <div class="page" @click="filterOpen = false">
    <!-- header -->
    <header class="head">
      <div class="head__left">
        <span class="head__icon"><i class="bi bi-file-earmark-text"></i></span>
        <div>
          <h1>Lamaran Kerja</h1>
          <p>Kelola dan pantau proses lamaran kerja yang diajukan oleh alumni ke perusahaan melalui sistem BKK.</p>
        </div>
      </div>
      <nav class="crumb">
        <i class="bi bi-house-door"></i>
        <RouterLink to="/admin">Dashboard</RouterLink>
        <span>/</span>
        <b>Lamaran Kerja</b>
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
          <h2>Daftar Lamaran Masuk</h2>
          <span class="chip">{{ totalLamaran }} Lamaran</span>
        </div>
        <p class="panel__sub">Daftar alumni yang telah mengajukan lamaran pada lowongan kerja yang tersedia.</p>
      </div>

      <div class="toolbar">
        <label class="search">
          <i class="bi bi-search"></i>
          <input v-model="q" type="text" placeholder="Cari nama alumni, lowongan, atau perusahaan..." />
        </label>

        <select v-model="fStatus" class="sel">
          <option value="">Semua Status</option>
          <option v-for="s in statusList" :key="s" :value="s">{{ s }}</option>
        </select>

        <select v-model="fWaktu" class="sel">
          <option v-for="w in waktuOptions" :key="w.v" :value="w.v">{{ w.t }}</option>
        </select>

        <button class="btn btn--ghost" @click.stop="resetFilter"><i class="bi bi-funnel"></i> Filter</button>
      </div>

      <div class="table-wrap">
        <table>
          <colgroup>
            <col style="width: 48px" />
            <col style="width: 24%" />
            <col style="width: 16%" />
            <col style="width: 16%" />
            <col style="width: 13%" />
            <col style="width: 15%" />
            <col style="width: 76px" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" class="c">No</th>
              <th scope="col">Nama Alumni</th>
              <th scope="col">Lowongan</th>
              <th scope="col">Perusahaan</th>
              <th scope="col">Tanggal Melamar</th>
              <th scope="col">Status Lamaran</th>
              <th scope="col" class="c">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(l, i) in rows" :key="l.id">
              <td class="c muted">{{ nomorAwal + i + 1 }}</td>
              <td>
                <div class="alumni">
                  <span class="avatar" :class="warna(l.id, i)">{{ inisial(l.nama) }}</span>
                  <div class="alumni__info">
                    <b>{{ l.nama }}</b>
                    <small>NISN: {{ l.nisn }} • {{ l.jurusan }}</small>
                  </div>
                </div>
              </td>
              <td>{{ l.lowongan }}</td>
              <td>{{ l.perusahaan }}</td>
              <td>{{ tglPanjang(l.tanggal) }}</td>
              <td>
                <span class="status" :class="statusClass[l.status]"><i></i>{{ l.status }}</span>
              </td>
              <td class="c">
                <div class="aksi">
                  <button class="ic ic--view" title="Lihat" @click="bukaDetail(l)"><i class="bi bi-eye"></i></button>
                  <button class="ic ic--edit" title="Ubah" @click="bukaUbah(l)"><i class="bi bi-pencil-square"></i></button>
                </div>
              </td>
            </tr>
            <tr v-if="!rows.length">
              <td colspan="7" class="empty">Data lamaran tidak ditemukan.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="foot">
        <div class="pager">
          <button class="pg" :disabled="page === 1" @click="page--"><i class="bi bi-chevron-left"></i></button>
          <button v-for="n in pages" :key="n" class="pg" :class="{ on: n === page }" @click="page = n">{{ n }}</button>
          <button class="pg" :disabled="page === pages" @click="page++"><i class="bi bi-chevron-right"></i></button>
        </div>
        <small>Menampilkan {{ dari }}–{{ sampai }} dari {{ fmt(jumlahTampil) }} lamaran</small>
      </div>
    </section>

    <!-- ========== MODAL DETAIL ========== -->
    <div v-if="modal === 'detail' && detail" class="overlay" @click.self="tutup">
      <div class="modal">
        <header class="m-head m-head--cap">
          <h3>Detail Lamaran Kerja</h3>
          <button class="m-close" aria-label="Tutup" @click="tutup"><i class="bi bi-x-lg"></i></button>
        </header>

        <div class="m-body">
          <div class="title-row">
            <h2 class="name">{{ detail.nama }}</h2>
            <span class="status" :class="statusClass[detail.status]"><i></i>{{ detail.status }}</span>
          </div>

          <div class="cols">
            <section class="col">
              <h4 class="sec">Informasi Alumni</h4>
              <dl class="dl">
                <div><dt>NISN:</dt><dd>{{ detail.nisn }}</dd></div>
                <div><dt>Jurusan:</dt><dd>{{ detail.jurusan }}</dd></div>
                <div><dt>Tahun Lulus:</dt><dd>{{ detail.tahun }}</dd></div>
                <div><dt>Telepon:</dt><dd>{{ maskTelp(detail.telp) }}</dd></div>
              </dl>
            </section>

            <section class="col">
              <h4 class="sec">Informasi Lowongan</h4>
              <dl class="dl">
                <div><dt>Posisi:</dt><dd>{{ detail.lowongan }}</dd></div>
                <div><dt>Perusahaan:</dt><dd>{{ detail.perusahaan }}</dd></div>
                <div><dt>Penutupan:</dt><dd>{{ tglPanjang(detail.penutupan) }}</dd></div>
                <div><dt>Melamar:</dt><dd>{{ tglPanjang(detail.tanggal) }}</dd></div>
              </dl>
            </section>
          </div>

          <div v-if="detail.cv" class="file">
            <span class="file__icon"><i class="bi bi-file-earmark-pdf-fill"></i></span>
            <div class="file__info">
              <b>{{ detail.cv }}</b>
              <small>Dokumen lamaran • {{ detail.cvUkuran }}</small>
            </div>
            <button type="button" class="link" @click="lihatCv">
              Lihat CV <i class="bi bi-box-arrow-up-right"></i>
            </button>
          </div>
          <div v-else class="file file--empty">Belum ada dokumen terlampir.</div>

          <hr />

          <section>
            <h4 class="sec">Perkembangan Lamaran</h4>
            <div class="flow">
              <template v-for="(st, i) in alur" :key="st.label">
                <span class="status" :class="st.cls"><i></i>{{ st.label }}</span>
                <i v-if="i < alur.length - 1" class="bi bi-arrow-right flow__arrow"></i>
              </template>
            </div>
            <p class="note">{{ tglPanjang(detail.diperbarui) }} • {{ catatanTerakhir }}</p>
          </section>
        </div>

        <footer class="m-foot m-foot--end">
          <div class="m-foot__act">
            <button class="btn btn--ghost" @click="tutup">Tutup</button>
            <button v-if="detail.status === 'Menunggu Diproses'" class="btn btn--primary" @click="kirimKePerusahaan">
              <i class="bi bi-send"></i> Kirim ke Perusahaan
            </button>
            <button v-else class="btn btn--primary" @click="bukaUbah(detail)">
              <i class="bi bi-pencil-square"></i> Edit Lamaran
            </button>
          </div>
        </footer>
      </div>
    </div>

    <!-- ========== MODAL EDIT ========== -->
    <div v-if="modal === 'ubah'" class="overlay" @click.self="tutup">
      <form class="modal" @submit.prevent="simpan">
        <header class="m-head">
          <div>
            <h3>Edit Lamaran Kerja</h3>
            <p>Perbarui data lamaran dan status seleksi</p>
          </div>
          <button type="button" class="m-close" aria-label="Tutup" @click="tutup"><i class="bi bi-x-lg"></i></button>
        </header>

        <div class="m-body">
          <h4 class="sec">Informasi Alumni</h4>

          <label class="field">
            <span>Nama Lengkap</span>
            <input v-model="form.nama" placeholder="Andi Saputra" />
            <em v-if="errors.nama">{{ errors.nama }}</em>
          </label>

          <div class="grid2">
            <label class="field">
              <span>NISN</span>
              <input v-model="form.nisn" maxlength="10" inputmode="numeric" placeholder="0054236910" />
              <em v-if="errors.nisn">{{ errors.nisn }}</em>
            </label>
            <label class="field">
              <span>Jurusan</span>
              <input v-model="form.jurusan" placeholder="RPL" />
              <em v-if="errors.jurusan">{{ errors.jurusan }}</em>
            </label>
          </div>

          <div class="grid2">
            <label class="field">
              <span>Tahun Lulus</span>
              <input v-model="form.tahun" maxlength="4" inputmode="numeric" placeholder="2025" />
              <em v-if="errors.tahun">{{ errors.tahun }}</em>
            </label>
            <label class="field">
              <span>No. Telepon</span>
              <input v-model="form.telp" placeholder="0812-3456-7890" />
              <em v-if="errors.telp">{{ errors.telp }}</em>
            </label>
          </div>

          <h4 class="sec">Informasi Lamaran</h4>

          <div class="grid2">
            <label class="field">
              <span>Lowongan</span>
              <input v-model="form.lowongan" placeholder="Web Developer" />
              <em v-if="errors.lowongan">{{ errors.lowongan }}</em>
            </label>
            <label class="field">
              <span>Perusahaan</span>
              <input v-model="form.perusahaan" list="daftar-perusahaan" placeholder="PT Maju Jaya" />
              <datalist id="daftar-perusahaan">
                <option v-for="n in saranPerusahaan" :key="n" :value="n"></option>
              </datalist>
              <em v-if="errors.perusahaan">{{ errors.perusahaan }}</em>
            </label>
          </div>

          <div class="grid2">
            <label class="field">
              <span>Tanggal Melamar</span>
              <input v-model="form.tanggal" type="date" />
              <em v-if="errors.tanggal">{{ errors.tanggal }}</em>
            </label>
            <label class="field">
              <span>Tanggal Penutupan</span>
              <input v-model="form.penutupan" type="date" />
              <em v-if="errors.penutupan">{{ errors.penutupan }}</em>
            </label>
          </div>

          <label class="field">
            <span>Status Lamaran</span>
            <select v-model="form.status">
              <option v-for="s in statusList" :key="s">{{ s }}</option>
            </select>
          </label>

          <label class="field">
            <span>Nama Berkas CV</span>
            <input v-model="form.cv" placeholder="CV_Andi_Saputra.pdf" />
          </label>

          <h4 class="sec">Catatan Admin</h4>

          <label class="field">
            <textarea v-model="form.catatan" rows="4" placeholder="Tulis catatan untuk lamaran ini, misalnya jadwal wawancara atau alasan penolakan."></textarea>
          </label>
        </div>

        <footer class="m-foot">
          <small>Terakhir diperbarui: {{ tglPanjang(form.diperbarui) }}</small>
          <div class="m-foot__act">
            <button type="button" class="btn btn--ghost" @click="batalForm">Batal</button>
            <button type="submit" class="btn btn--primary"><i class="bi bi-check2"></i> Simpan Perubahan</button>
          </div>
        </footer>
      </form>
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
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.stat__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.stat__icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 12px;
}

.stat__no {
  font-size: 8px;
  color: #94a3b8;
  background: #f1f5f9;
  border-radius: 5px;
  padding: 2px 6px;
}

.stat__value {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.1;
}

.stat__label {
  font-size: 11px;
  font-weight: 600;
  margin-top: 4px;
}

.stat__foot {
  font-size: 9px;
  color: var(--muted, #64748b);
  margin-top: 1px;
}

.blue {
  color: #2563eb;
}

.stat__icon.blue {
  background: #e8f0ff;
}

.purple {
  color: #7c3aed;
}

.stat__icon.purple {
  background: #f1eaff;
}

.green {
  color: #16a34a;
}

.stat__icon.green {
  background: #e2f7ea;
}

.orange {
  color: #f97316;
}

.stat__icon.orange {
  background: #ffefe0;
}

/* panel */
.panel {
  background: #fff;
  border: 1px solid #e5eaf3;
  border-radius: 14px;
  padding: 16px 18px 14px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.panel__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  margin-bottom: 14px;
}

.panel__title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bar {
  width: 3px;
  height: 16px;
  border-radius: 3px;
  background: #2563eb;
}

.panel__title h2 {
  font-size: 13px;
  font-weight: 700;
  margin: 0;
}

.chip {
  font-size: 9px;
  font-weight: 600;
  color: #2563eb;
  background: #e8f0ff;
  border-radius: 999px;
  padding: 3px 8px;
}

.panel__sub {
  flex-basis: 100%;
  margin: 0 0 0 11px;
  font-size: 10px;
  color: #3b82f6;
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

/* toolbar */
.toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.search {
  flex: 1;
  min-width: 220px;
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

.toolbar .btn {
  height: 34px;
}

/* tabel */
.table-wrap {
  overflow-x: auto;
  border-radius: 10px;
}

table {
  width: 100%;
  min-width: 860px;
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

/* alumni + avatar */
.alumni {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.alumni__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.alumni__info b {
  font-size: 11px;
  font-weight: 700;
}

.alumni__info small {
  font-size: 9px;
  color: #94a3b8;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 9.5px;
  font-weight: 700;
  flex-shrink: 0;
}

.a-blue {
  background: #dbeafe;
  color: #2563eb;
}

.a-purple {
  background: #ede9fe;
  color: #7c3aed;
}

.a-green {
  background: #dcfce7;
  color: #16a34a;
}

.a-orange {
  background: #ffedd5;
  color: #ea580c;
}

.a-red {
  background: #fee2e2;
  color: #dc2626;
}

/* status */
.status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 9.5px;
  font-weight: 600;
  border-radius: 999px;
  padding: 3px 10px;
  white-space: nowrap;
}

.status i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.status--sm {
  font-size: 9px;
  padding: 2px 9px;
}

.status.wait {
  color: #b45309;
  background: #fef3c7;
  border: 1px solid #fde68a;
}

.status.proc {
  color: #2563eb;
  background: #dbeafe;
  border: 1px solid #bfdbfe;
}

.status.intv {
  color: #7c3aed;
  background: #ede9fe;
  border: 1px solid #ddd6fe;
}

.status.ok {
  color: #15803d;
  background: #dcfce7;
  border: 1px solid #bbf0cd;
}

.status.no {
  color: #dc2626;
  background: #fee2e2;
  border: 1px solid #fecaca;
}

/* aksi */
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

.empty {
  text-align: center;
  color: var(--muted, #64748b);
  padding: 28px 0 !important;
}

/* footer tabel */
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

.m-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 22px 14px;
}

.m-head h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
}

.m-head p {
  margin: 2px 0 0;
  font-size: 10px;
  color: var(--muted, #64748b);
}

.m-close {
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
  padding: 6px 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.m-body hr {
  border: 0;
  border-top: 1px solid #eef2f8;
  margin: 4px 0;
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

.m-foot--end {
  justify-content: flex-end;
}

.m-foot__act {
  display: flex;
  gap: 8px;
}

/* detail */
.m-head--cap {
  align-items: center;
}

.m-head--cap h3 {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748b;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.name {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  color: #0f172a;
}

.cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 4px;
}

.sec {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
  color: #0f172a;
}

.dl {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dl > div {
  display: flex;
  gap: 8px;
  font-size: 11px;
}

.dl dt {
  flex: 0 0 74px;
  color: #64748b;
}

.dl dd {
  margin: 0;
  font-weight: 600;
  color: #0f172a;
}

.file {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid #e5eaf3;
  border-radius: 10px;
  background: #fafbfe;
}

.file--empty {
  justify-content: center;
  font-size: 11px;
  color: #94a3b8;
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
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
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

.link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 0;
  background: transparent;
  font: inherit;
  font-size: 10.5px;
  font-weight: 600;
  color: #2563eb;
  cursor: pointer;
}

.link:hover {
  text-decoration: underline;
}

.flow {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.flow__arrow {
  font-size: 11px;
  color: #94a3b8;
}

.note {
  margin: 10px 0 0;
  font-size: 10.5px;
  color: #64748b;
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
  line-height: 1.5;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: #2563eb;
}

.field em {
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

  .grid2,
  .cols {
    grid-template-columns: 1fr;
  }

  .title-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>