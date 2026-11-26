<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const STORAGE_KEY = 'bkk-lowongan-v1'
const BASE = { total: 32, aktif: 20, nonaktif: 12, segera: 5 }
const tipeOptions = ['Full Time', 'Part Time', 'Kontrak', 'Magang']

/* ---------- data perusahaan (ambil dari halaman Data Perusahaan kalau ada) ---------- */
const defaultCompanies = [
  { nama: 'PT Maju Jaya', email: 'hrd@majujaya.co.id', telp: '0812-3456-7890', alamat: 'Jl. Raya Purwosari No. 21, Pasuruan, Jawa Timur 67162' },
  { nama: 'CV Teknologi Mandiri', email: 'hrd@teknologimj.co.id', telp: '0821-1234-5678', alamat: 'Jl. Diponegoro No. 8, Pandaan, Pasuruan, Jawa Timur 67156' },
  { nama: 'PT Industri Sejahtera', email: 'recruitment@industri.co.id', telp: '0857-9876-5432', alamat: 'Kawasan Industri PIER Blok C-12, Rembang, Pasuruan' },
  { nama: 'PT Astra Honda Motor', email: 'recruitment@ahm.co.id', telp: '(021) 789-9000', alamat: 'Jl. Laksda Yos Sudarso, Sunter I, Tanjung Priok, Kota Jakarta Utara, DKI Jakarta 14350' },
  { nama: 'CV Barkah Mandiri', email: 'info@barkahmandiri.id', telp: '0813-9871-2245', alamat: 'Jl. Gajah Mada No. 45, Purwosari, Pasuruan' },
]
function loadCompanies() {
  try {
    const r = JSON.parse(localStorage.getItem('bkk-perusahaan-v2') || 'null')
    if (Array.isArray(r) && r.length) {
      return r.map((p) => ({ nama: p.nama, email: p.email, telp: p.telp, alamat: p.alamat }))
    }
  } catch (e) {}
  return defaultCompanies
}
const companies = ref(loadCompanies())
const infoPerusahaan = (nama) => companies.value.find((c) => c.nama === nama)

/* ---------- data awal ---------- */
const desk = (posisi, pt, bidang) =>
  `${pt} membuka kesempatan bagi lulusan yang memiliki minat di bidang ${bidang} untuk bergabung sebagai ${posisi}.\nKandidat diharapkan memahami dasar-dasar pekerjaan, mampu bekerja secara kolaboratif, dan memiliki kemauan untuk terus belajar.`

// [id, posisi, perusahaan, tipe, kuota, penutupan, aktif, ditambahkan, diperbarui, bidang]
const raw = [
  [1, 'Web Developer', 'PT Maju Jaya', 'Full Time', 3, '2026-11-30', true, '2026-11-12', '2026-11-15', 'pengembangan website'],
  [2, 'UI/UX Designer', 'CV Teknologi Mandiri', 'Full Time', 3, '2026-11-29', true, '2026-11-14', '2026-11-16', 'desain antarmuka dan pengalaman pengguna'],
  [3, 'Staff Administrasi', 'PT Industri Sejahtera', 'Full Time', 2, '2026-11-10', false, '2026-10-03', '2026-11-10', 'administrasi perkantoran'],
  [4, 'Operator Produksi', 'PT Astra Honda Motor', 'Full Time', 10, '2026-12-20', true, '2026-11-18', '2026-11-18', 'manufaktur otomotif'],
  [5, 'Teknisi Jaringan', 'CV Barkah Mandiri', 'Kontrak', 2, '2026-12-04', true, '2026-11-10', '2026-11-12', 'jaringan komputer'],
]
const seed = raw.map(([id, posisi, perusahaan, tipe, kuota, penutupan, aktif, ditambahkan, diperbarui, bidang]) => ({
  id, posisi, perusahaan, tipe, kuota, penutupan, status: aktif ? 'Aktif' : 'Tidak Aktif', ditambahkan, diperbarui,
  deskripsi: id === 1
    ? 'PT Maju Jaya membuka kesempatan bagi lulusan yang memiliki minat di bidang pengembangan website untuk bergabung sebagai Web Developer.\nKandidat diharapkan memahami dasar pengembangan web, mampu bekerja secara kolaboratif, dan memiliki kemauan untuk terus belajar.'
    : desk(posisi, perusahaan, bidang),
}))

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
const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const BULAN_S = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
function tglPanjang(iso) {
  if (!iso) return '-'
  const [y, m, d] = iso.split('-')
  return `${Number(d)} ${BULAN[Number(m) - 1]} ${y}`
}
function tglPendek(iso) {
  if (!iso) return '-'
  const [y, m, d] = iso.split('-')
  return `${d} ${BULAN_S[Number(m) - 1]} ${y}`
}
function today() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}
// "segera berakhir" = lowongan aktif yang ditutup dalam 7 hari ke depan
function segera(l) {
  if (l.status !== 'Aktif') return false
  const sisa = (new Date(l.penutupan) - new Date(today())) / 86400000
  return sisa >= 0 && sisa <= 7
}

/* ---------- statistik ---------- */
const cnt = (arr, fn) => arr.filter(fn).length
const aktifFn = (l) => l.status === 'Aktif'
const totalLowongan = computed(() => Math.max(0, BASE.total + list.value.length - seed.length))
const lowonganAktif = computed(() => Math.max(0, BASE.aktif + cnt(list.value, aktifFn) - cnt(seed, aktifFn)))
const lowonganNonaktif = computed(() => Math.max(0, BASE.nonaktif + cnt(list.value, (l) => !aktifFn(l)) - cnt(seed, (l) => !aktifFn(l))))
const segeraBerakhir = computed(() => Math.max(0, BASE.segera + cnt(list.value, segera) - cnt(seed, segera)))

const stats = computed(() => [
  { icon: 'bi-briefcase', tone: 'blue', value: totalLowongan.value, label: 'Total Lowongan', foot: 'Seluruh lowongan', dark: true },
  { icon: 'bi-check-circle', tone: 'blue', value: lowonganAktif.value, label: 'Lowongan Aktif', foot: 'Masih berjalan' },
  { icon: 'bi-x-circle', tone: 'green', value: lowonganNonaktif.value, label: 'Lowongan Tidak Aktif', foot: 'Sudah ditutup' },
  { icon: 'bi-clock-history', tone: 'orange', value: segeraBerakhir.value, label: 'Segera Berakhir', foot: 'Mendekati deadline' },
])

/* ---------- cari, filter, paging ---------- */
const q = ref('')
const filter = ref('semua')
const filterOpen = ref(false)
const filterOptions = [
  { v: 'semua', t: 'Semua lowongan' },
  { v: 'aktif', t: 'Aktif' },
  { v: 'nonaktif', t: 'Tidak Aktif' },
  { v: 'segera', t: 'Segera berakhir' },
]
const filtered = computed(() => {
  const k = q.value.trim().toLowerCase()
  return list.value.filter((l) => {
    const cocok = !k || l.posisi.toLowerCase().includes(k) || l.perusahaan.toLowerCase().includes(k)
    const f =
      filter.value === 'semua' ||
      (filter.value === 'aktif' && l.status === 'Aktif') ||
      (filter.value === 'nonaktif' && l.status !== 'Aktif') ||
      (filter.value === 'segera' && segera(l))
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
const detail = computed(() => list.value.find((l) => l.id === detailId.value))
const detailPT = computed(() => (detail.value ? infoPerusahaan(detail.value.perusahaan) : null))
const paragraf = computed(() => (detail.value ? detail.value.deskripsi.split('\n').filter(Boolean) : []))
const form = ref({})
const errors = ref({})
const target = ref(null)
const bodyEl = ref(null)

function formKosong() {
  return {
    id: null, posisi: '', perusahaan: companies.value[0]?.nama || '', tipe: 'Full Time', kuota: 1,
    penutupan: today(), status: 'Aktif', deskripsi: '', ditambahkan: today(), diperbarui: today(),
  }
}
function bukaDetail(l) {
  companies.value = loadCompanies()
  detailId.value = l.id
  modal.value = 'detail'
}
function bukaTambah() {
  companies.value = loadCompanies()
  form.value = formKosong()
  errors.value = {}
  modal.value = 'tambah'
}
function bukaUbah(l) {
  companies.value = loadCompanies()
  form.value = JSON.parse(JSON.stringify(l))
  errors.value = {}
  modal.value = 'ubah'
}
function bukaHapus(l) {
  target.value = l
  modal.value = 'hapus'
}
function tutup() {
  modal.value = null
}
function batalForm() {
  if (modal.value === 'ubah') modal.value = 'detail'
  else tutup()
}
async function keBawah() {
  await nextTick()
  bodyEl.value?.scrollTo({ top: bodyEl.value.scrollHeight, behavior: 'smooth' })
}

// nama perusahaan di pilihan form (termasuk yang sudah tersimpan tapi tak ada di daftar)
const opsiPerusahaan = computed(() => {
  const n = companies.value.map((c) => c.nama)
  if (form.value.perusahaan && !n.includes(form.value.perusahaan)) n.unshift(form.value.perusahaan)
  return n
})

function validasi() {
  const e = {}
  const f = form.value
  if (!f.posisi.trim()) e.posisi = 'Nama lowongan wajib diisi'
  if (!f.perusahaan) e.perusahaan = 'Pilih perusahaan'
  if (!f.kuota || Number(f.kuota) < 1) e.kuota = 'Kuota minimal 1'
  if (!f.penutupan) e.penutupan = 'Tanggal penutupan wajib diisi'
  else if (f.penutupan < f.ditambahkan) e.penutupan = 'Tidak boleh sebelum tanggal ditambahkan'
  if (f.deskripsi.trim().length < 20) e.deskripsi = 'Deskripsi minimal 20 karakter'
  errors.value = e
  return Object.keys(e).length === 0
}

function simpan() {
  if (!validasi()) return
  const data = JSON.parse(JSON.stringify(form.value))
  data.posisi = data.posisi.trim()
  data.deskripsi = data.deskripsi.trim()
  data.kuota = Number(data.kuota)
  data.diperbarui = today()
  if (modal.value === 'tambah') {
    data.id = Date.now()
    data.ditambahkan = today()
    list.value.push(data)
    q.value = ''
    filter.value = 'semua'
    page.value = Math.ceil(list.value.length / perPage)
    tutup()
  } else {
    const i = list.value.findIndex((l) => l.id === data.id)
    if (i !== -1) list.value[i] = data
    detailId.value = data.id
    modal.value = 'detail'
  }
}

function hapus() {
  list.value = list.value.filter((l) => l.id !== target.value.id)
  tutup()
}
</script>

<template>
  <div class="page" @click="filterOpen = false">
    <!-- header -->
    <header class="head">
      <div class="head__left">
        <span class="head__icon"><i class="bi bi-briefcase"></i></span>
        <div>
          <h1>Lowongan Kerja</h1>
          <p>Kelola informasi lowongan kerja yang tersedia dari perusahaan mitra untuk lulusan.</p>
        </div>
      </div>
      <nav class="crumb">
        <i class="bi bi-house-door"></i>
        <RouterLink to="/admin">Dashboard</RouterLink>
        <span>/</span>
        <b>Lowongan Kerja</b>
      </nav>
    </header>

    <!-- statistik -->
    <section class="stats">
      <article v-for="s in stats" :key="s.label" class="stat">
        <div class="stat__top">
          <span class="stat__icon" :class="s.tone"><i class="bi" :class="s.icon"></i></span>
          <span class="stat__dots"><i class="bi bi-three-dots"></i></span>
        </div>
        <strong class="stat__value" :class="s.dark ? 'dark' : s.tone">{{ s.value }}</strong>
        <span class="stat__label">{{ s.label }}</span>
        <small class="stat__foot">{{ s.foot }}</small>
      </article>
    </section>

    <!-- daftar -->
    <section class="panel">
      <div class="panel__head">
        <div class="panel__title">
          <i class="bar"></i>
          <h2>Daftar Lowongan</h2>
          <span class="chip">{{ totalLowongan }} Lowongan</span>
        </div>
        <button class="btn btn--primary" @click="bukaTambah"><i class="bi bi-plus-lg"></i> Tambah Lowongan</button>
      </div>

      <div class="toolbar">
        <label class="search">
          <i class="bi bi-search"></i>
          <input v-model="q" type="text" placeholder="Cari nama posisi, perusahaan..." />
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
            <col style="width: 48px" />
            <col style="width: 19%" />
            <col style="width: 21%" />
            <col style="width: 14%" />
            <col style="width: 14%" />
            <col style="width: 14%" />
            <col style="width: 96px" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" class="c">No</th>
              <th scope="col">Nama Lowongan</th>
              <th scope="col">Perusahaan</th>
              <th scope="col" class="c">Tanggal Penutupan</th>
              <th scope="col" class="c">Status / Kuota</th>
              <th scope="col" class="c">Tanggal Ditambahkan</th>
              <th scope="col" class="c">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(l, i) in rows" :key="l.id">
              <td class="c muted">{{ nomorAwal + i + 1 }}</td>
              <td class="nama">{{ l.posisi }}</td>
              <td>{{ l.perusahaan }}</td>
              <td class="c">{{ tglPendek(l.penutupan) }}</td>
              <td class="c">
                <span class="st" :class="l.status === 'Aktif' ? 'st--on' : 'st--off'">{{ l.status }}</span>
                <small class="kuota">Kuota {{ l.kuota }}</small>
              </td>
              <td class="c muted">{{ tglPendek(l.ditambahkan) }}</td>
              <td class="c">
                <div class="aksi">
                  <button class="ic ic--view" title="Lihat" @click="bukaDetail(l)"><i class="bi bi-eye"></i></button>
                  <button class="ic ic--edit" title="Ubah" @click="bukaUbah(l)"><i class="bi bi-pencil"></i></button>
                  <button class="ic ic--del" title="Hapus" @click="bukaHapus(l)"><i class="bi bi-trash"></i></button>
                </div>
              </td>
            </tr>
            <tr v-if="!rows.length">
              <td colspan="7" class="empty">Data lowongan tidak ditemukan.</td>
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
      <div class="modal">
        <header class="m-head">
          <div>
            <h3>Detail Lowongan Kerja</h3>
            <p>Informasi lengkap lowongan kerja</p>
          </div>
          <button class="m-close" aria-label="Tutup" @click="tutup"><i class="bi bi-x-lg"></i></button>
        </header>

        <div ref="bodyEl" class="m-body">
          <div class="title-row">
            <div>
              <h2 class="job-title">{{ detail.posisi }}</h2>
              <div class="job-company"><i class="bi bi-building"></i> {{ detail.perusahaan }}</div>
            </div>
            <span class="st" :class="detail.status === 'Aktif' ? 'st--on' : 'st--off'"><i></i>{{ detail.status }}</span>
          </div>

          <hr />

          <h4 class="sec">Informasi Lowongan</h4>
          <div class="kv">
            <div><small>Tanggal Penutupan</small><b>{{ tglPanjang(detail.penutupan) }}</b></div>
            <div><small>Tanggal Ditambahkan</small><b>{{ tglPanjang(detail.ditambahkan) }}</b></div>
            <div>
              <small>Status Lowongan</small>
              <span class="st st--sm" :class="detail.status === 'Aktif' ? 'st--on' : 'st--off'">{{ detail.status }}</span>
            </div>
            <div><small>Terakhir Diperbarui</small><b>{{ tglPanjang(detail.diperbarui) }}</b></div>
            <div><small>Tipe Pekerjaan</small><b>{{ detail.tipe }}</b></div>
            <div><small>Kuota</small><b>{{ detail.kuota }} orang</b></div>
          </div>

          <hr />

          <h4 class="sec">Deskripsi Lowongan</h4>
          <p v-for="(p, i) in paragraf" :key="i" class="desc">{{ p }}</p>

          <hr />

          <h4 class="sec">Informasi Perusahaan</h4>
          <ul class="pt">
            <li>
              <i class="bi bi-envelope"></i>
              <div><small>Email Perusahaan</small><b>{{ detailPT?.email || '-' }}</b></div>
            </li>
            <li>
              <i class="bi bi-telephone"></i>
              <div><small>Nomor Telepon</small><b>{{ detailPT?.telp || '-' }}</b></div>
            </li>
            <li>
              <i class="bi bi-geo-alt"></i>
              <div><small>Alamat Perusahaan</small><b>{{ detailPT?.alamat || 'Alamat belum tersimpan di database.' }}</b></div>
            </li>
          </ul>
        </div>

        <footer class="m-foot">
          <button class="down" title="Ke bawah" @click="keBawah"><i class="bi bi-arrow-down"></i></button>
          <div class="m-foot__act">
            <button class="btn btn--ghost" @click="tutup">Tutup</button>
            <button class="btn btn--primary" @click="bukaUbah(detail)"><i class="bi bi-pencil-square"></i> Edit Lowongan</button>
          </div>
        </footer>
      </div>
    </div>

    <!-- ========== MODAL TAMBAH / EDIT ========== -->
    <div v-if="modal === 'tambah' || modal === 'ubah'" class="overlay" @click.self="tutup">
      <form class="modal" @submit.prevent="simpan">
        <header class="m-head">
          <div>
            <h3>{{ modal === 'tambah' ? 'Tambah Lowongan Kerja' : 'Edit Lowongan Kerja' }}</h3>
            <p>{{ modal === 'tambah' ? 'Lengkapi informasi lowongan kerja' : 'Perbarui informasi lowongan kerja' }}</p>
          </div>
          <button type="button" class="m-close" aria-label="Tutup" @click="tutup"><i class="bi bi-x-lg"></i></button>
        </header>

        <div class="m-body">
          <h4 class="sec">Informasi Lowongan</h4>
          <label class="field">
            <span>Nama Lowongan</span>
            <input v-model="form.posisi" placeholder="Web Developer" />
            <em v-if="errors.posisi">{{ errors.posisi }}</em>
          </label>
          <label class="field">
            <span>Perusahaan</span>
            <select v-model="form.perusahaan">
              <option v-for="n in opsiPerusahaan" :key="n" :value="n">{{ n }}</option>
            </select>
            <em v-if="errors.perusahaan">{{ errors.perusahaan }}</em>
          </label>
          <div class="grid2">
            <label class="field">
              <span>Tipe Pekerjaan</span>
              <select v-model="form.tipe">
                <option v-for="t in tipeOptions" :key="t">{{ t }}</option>
              </select>
            </label>
            <label class="field">
              <span>Kuota (orang)</span>
              <input v-model="form.kuota" type="number" min="1" />
              <em v-if="errors.kuota">{{ errors.kuota }}</em>
            </label>
          </div>
          <div class="grid2">
            <label class="field">
              <span>Tanggal Penutupan</span>
              <input v-model="form.penutupan" type="date" />
              <em v-if="errors.penutupan">{{ errors.penutupan }}</em>
            </label>
            <label class="field">
              <span>Status Lowongan</span>
              <select v-model="form.status">
                <option>Aktif</option>
                <option>Tidak Aktif</option>
              </select>
            </label>
          </div>
          <div class="grid2">
            <label class="field">
              <span>Tanggal Ditambahkan</span>
              <input :value="tglPanjang(form.ditambahkan)" disabled />
            </label>
            <label class="field">
              <span>Terakhir Diperbarui</span>
              <input :value="tglPanjang(form.diperbarui)" disabled />
            </label>
          </div>

          <h4 class="sec">Deskripsi Lowongan</h4>
          <label class="field">
            <textarea v-model="form.deskripsi" rows="6" placeholder="Tulis deskripsi lowongan. Tekan Enter untuk membuat paragraf baru."></textarea>
            <em v-if="errors.deskripsi">{{ errors.deskripsi }}</em>
          </label>

          <h4 class="sec">Informasi Perusahaan</h4>
          <p class="note">Data perusahaan diambil otomatis dari menu Data Perusahaan.</p>
          <ul class="pt">
            <li>
              <i class="bi bi-envelope"></i>
              <div><small>Email Perusahaan</small><b>{{ infoPerusahaan(form.perusahaan)?.email || '-' }}</b></div>
            </li>
            <li>
              <i class="bi bi-telephone"></i>
              <div><small>Nomor Telepon</small><b>{{ infoPerusahaan(form.perusahaan)?.telp || '-' }}</b></div>
            </li>
            <li>
              <i class="bi bi-geo-alt"></i>
              <div><small>Alamat Perusahaan</small><b>{{ infoPerusahaan(form.perusahaan)?.alamat || '-' }}</b></div>
            </li>
          </ul>
        </div>

        <footer class="m-foot m-foot--end">
          <div class="m-foot__act">
            <button type="button" class="btn btn--ghost" @click="batalForm">Batal</button>
            <button type="submit" class="btn btn--primary"><i class="bi bi-check2"></i> Simpan Lowongan</button>
          </div>
        </footer>
      </form>
    </div>

    <!-- ========== MODAL HAPUS ========== -->
    <div v-if="modal === 'hapus'" class="overlay" @click.self="tutup">
      <div class="modal modal--sm">
        <div class="m-body">
          <h3 class="plain">Hapus Lowongan?</h3>
          <p class="confirm">Lowongan <b>{{ target.posisi }}</b> dari {{ target.perusahaan }} akan dihapus dan tidak bisa dikembalikan.</p>
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

.stat__dots {
  color: #cbd5e1;
  font-size: 12px;
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

.dark {
  color: #0f172a;
}

.blue {
  color: #2563eb;
}

.stat__icon.blue {
  background: #e8f0ff;
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
  padding: 16px 18px 18px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
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

.btn--danger {
  background: #ef4444;
  color: #fff;
}

.btn--danger:hover {
  background: #dc2626;
}

/* toolbar */
.toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.search {
  flex: 1;
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

.filter {
  position: relative;
}

.filter .btn {
  height: 34px;
}

.filter__menu {
  position: absolute;
  right: 0;
  top: calc(100% + 6px);
  z-index: 20;
  min-width: 170px;
  list-style: none;
  margin: 0;
  padding: 6px;
  background: #fff;
  border: 1px solid #e5eaf3;
  border-radius: 10px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
}

.filter__menu li {
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 11px;
  cursor: pointer;
}

.filter__menu li:hover {
  background: #f1f5f9;
}

.filter__menu li.on {
  background: #e8f0ff;
  color: #2563eb;
  font-weight: 600;
}

/* tabel */
.table-wrap {
  overflow-x: auto;
  border-radius: 10px;
}

table {
  width: 100%;
  min-width: 800px;
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
  padding: 13px 10px;
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

.kuota {
  display: block;
  margin-top: 3px;
  font-size: 9px;
  color: #94a3b8;
}

.st {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 9.5px;
  font-weight: 600;
  border-radius: 999px;
  padding: 3px 10px;
  white-space: nowrap;
}

.st i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.st--on {
  color: #15803d;
  background: #dcfce7;
  border: 1px solid #bbf0cd;
}

.st--off {
  color: #64748b;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
}

.st--sm {
  font-size: 9px;
  padding: 2px 9px;
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

.pager {
  display: flex;
  gap: 6px;
  margin-top: 14px;
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
  padding: 14px 22px;
  border-top: 1px solid #eef2f8;
  background: #fafbfe;
}

.m-foot--end {
  justify-content: flex-end;
}

.m-foot__act {
  display: flex;
  gap: 8px;
}

.down {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #dbe3f0;
  background: #fff;
  color: #475569;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 12px;
}

.down:hover {
  background: #f1f5f9;
}

/* detail */
.title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.job-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #2563eb;
  line-height: 1.2;
}

.job-company {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  font-size: 11.5px;
  font-weight: 600;
  color: #334155;
}

.job-company i {
  color: #64748b;
}

.sec {
  margin: 4px 0 0;
  font-size: 12px;
  font-weight: 700;
  color: #0f172a;
}

.kv {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 20px;
}

.kv > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
}

.kv small {
  font-size: 9.5px;
  color: #64748b;
}

.kv b {
  font-size: 12px;
  font-weight: 700;
}

.desc {
  margin: 0;
  font-size: 11px;
  line-height: 1.6;
  color: #334155;
}

.pt {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pt li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.pt li > i {
  color: #94a3b8;
  font-size: 13px;
  margin-top: 2px;
}

.pt div {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.pt small {
  font-size: 9.5px;
  color: #64748b;
}

.pt b {
  font-size: 11.5px;
  font-weight: 700;
  line-height: 1.4;
  word-break: break-word;
}

.note {
  margin: -4px 0 0;
  font-size: 10px;
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

.field input, .field select, .field textarea {
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

.field input, .field select {
  height: 34px;
}

.field textarea {
  padding: 8px 10px;
  resize: vertical;
  line-height: 1.5;
}

.field input:focus, .field select:focus, .field textarea:focus {
  border-color: #2563eb;
}

.field input:disabled {
  background: #f8fafc;
  color: #64748b;
}

.field em {
  font-style: normal;
  font-size: 10px;
  color: #ef4444;
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
  .toolbar {
    flex-direction: column;
  }
  .grid2, .kv {
    grid-template-columns: 1fr;
  }
}
</style>