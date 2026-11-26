<script setup>
// Data contoh. Nanti ganti dengan data dari API Laravel (GET /api/berita)
const latest = [
  {
    id: 1,
    badge: 'Kegiatan BKK',
    title: 'SMKN 1 Purwosari Jajaki Peluang Kerja di Jepang',
    date: '23 September 2026',
    image: 'news 1 bkk.png',
  },
  {
    id: 2,
    badge: 'Informasi Rekrutmen',
    title: 'Rekrutmen PT JIAEC Surabaya Digelar di SMKN 1 Purwosari',
    date: '5 Februari 2024',
    image: 'news 2 bkk.png',
  },
  {
    id: 3,
    badge: 'Kerja Sama',
    title: 'SMKN 1 Purwosari Jalin Kerja Sama dengan Alfamart',
    date: '10 Desember 2023',
    image: 'news 3 bkk.png',
  },
]

const featured = {
  badge: 'Terbaru 2026',
  title: 'Siswa SMKN 1 Purwosari Ikuti Sosialisasi Peluang Kerja Luar Negeri',
  excerpt:
    'Siswa SMKN 1 Purwosari mengikuti sosialisasi peluang kerja luar negeri yang diselenggarakan bersama Disnaker dan BP2MI Jawa Timur untuk mengenal peluang kerja luar negeri, orientasi migrasi aman, serta perlindungan hukum bagi calon pekerja migran.',
  image: 'news 4 bkk.png',
}

const others = [
  { id: 1, title: 'Sosialisasi Peluang Kerja Jepang', date: '3 Maret 2026', image: 'news 5 bkk.png' },
  { id: 2, title: 'Dokumentasi Kerja Sama SMK Dengan Mitra Industri', date: '28 Mei 2025', image: 'news 6 bkk.png' },
  { id: 3, title: 'Kunjungan Industri ke PT Amerta Indah Otsuka', date: '17 Februari 2025', image: 'news 7 bkk.png' },
]

// gambar disimpan di src/assets/images/news/
const img = (name) => new URL(`../assets/images/${name}`, import.meta.url).href
</script>

<template>
  <section id="informasi" class="news container">
    <!-- Baris 1: header + 3 berita terbaru -->
    <div class="news__top">
      <div class="news__intro">
        <span class="eyebrow"><i></i>UPDATE TERKINI</span>
        <h2>Informasi &amp; Berita</h2>
        <p>
          Berita dan informasi terbaru seputar kegiatan, lowongan, dan
          pengembangan karier alumni.
        </p>
        <a href="#semua-berita" class="news__btn">
          Lihat semua Berita
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>

      <article v-for="n in latest" :key="n.id" class="card">
        <div class="card__img">
          <img :src="img(n.image)" :alt="n.title" />
          <span class="badge">{{ n.badge }}</span>
        </div>
        <h3>{{ n.title }}</h3>
        <div class="card__foot">
          <span class="date">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10z" />
            </svg>
            {{ n.date }}
          </span>
          <svg class="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </article>
    </div>

    <!-- Baris 2: berita utama + berita lainnya -->
    <div class="featured">
      <div class="featured__img">
        <img :src="img(featured.image)" :alt="featured.title" />
        <span class="badge">{{ featured.badge }}</span>
      </div>

      <div class="featured__body">
        <span class="eyebrow"><i></i>BERITA UTAMA</span>
        <h3>{{ featured.title }}</h3>
        <p>{{ featured.excerpt }}</p>
        <a href="#berita-utama" class="featured__link">
          Baca Selengkapnya
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>

      <aside class="others">
        <div class="others__head">
          <strong>Berita lainnya</strong>
          <a href="#semua-berita">Lihat Semua ›</a>
        </div>

        <a v-for="o in others" :key="o.id" :href="`#berita-${o.id}`" class="other">
          <img :src="img(o.image)" :alt="o.title" />
          <div>
            <h4>{{ o.title }}</h4>
            <span class="date">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10z" />
              </svg>
              {{ o.date }}
            </span>
          </div>
        </a>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.news {
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 56px;
  padding-bottom: 40px;
}

/* ---------- Umum ---------- */
.eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #ca8a04;
  margin-bottom: 8px;
}

.eyebrow i {
  display: inline-block;
  width: 18px;
  height: 2px;
  background: #ca8a04;
}

.badge {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 9px;
  font-weight: 600;
  color: #fff;
  background: var(--blue);
  padding: 3px 10px;
  border-radius: 999px;
}

.date {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  color: var(--text);
}

.date svg {
  color: var(--blue);
}

/* ---------- Baris 1 ---------- */
.news__top {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  align-items: stretch;
}

.news__intro h2 {
  font-size: clamp(22px, 2.6vw, 28px);
  font-weight: 800;
  line-height: 1.2;
  color: #0b2a6f;
  margin-bottom: 10px;
}

.news__intro p {
  font-size: 13px;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 16px;
}

.news__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background: var(--blue);
  padding: 9px 20px;
  border-radius: 999px;
  transition: background 0.2s;
}

.news__btn:hover {
  background: var(--blue-dark);
}

.card {
  display: flex;
  flex-direction: column;
  background: #f7f8fa;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.card__img {
  position: relative;
  height: 110px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
}

.card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card h3 {
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
  color: #0f172a;
  margin-bottom: 10px;
}

.card__foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid #e5e7eb;
}

.arrow {
  color: var(--text);
}

/* ---------- Baris 2 ---------- */
.featured {
  display: grid;
  grid-template-columns: 1.15fr 1.1fr 0.8fr;
  gap: 28px;
  align-items: center;
  margin-top: 44px;
}

.featured__img {
  position: relative;
  height: 230px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.featured__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.featured__body h3 {
  font-size: 18px;
  font-weight: 800;
  line-height: 1.3;
  color: #0b2a6f;
  margin-bottom: 10px;
}

.featured__body p {
  font-size: 11px;
  line-height: 1.7;
  color: var(--text);
  margin-bottom: 14px;
}

.featured__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--blue);
}

.others {
  border-left: 1px solid #e5e7eb;
  padding-left: 22px;
}

.others__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  margin-bottom: 12px;
}

.others__head a {
  font-size: 9px;
  color: var(--blue);
}

.other {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 12px;
}

.other img {
  flex-shrink: 0;
  width: 54px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
}

.other h4 {
  font-size: 10px;
  font-weight: 600;
  line-height: 1.35;
  color: #0f172a;
  margin-bottom: 4px;
}

/* ---------- Responsif ---------- */
@media (max-width: 960px) {
  .news__top {
    grid-template-columns: repeat(2, 1fr);
  }

  .news__intro {
    grid-column: 1 / -1;
  }

  .featured {
    grid-template-columns: 1fr;
  }

  .others {
    border-left: 0;
    padding-left: 0;
  }
}

@media (max-width: 560px) {
  .news__top {
    grid-template-columns: 1fr;
  }
}
</style>