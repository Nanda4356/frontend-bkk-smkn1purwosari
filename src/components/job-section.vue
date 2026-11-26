<script setup>
// Data contoh. Nanti ganti dengan data dari API Laravel (GET /api/lowongan)
const jobs = [
  {
    id: 1,
    title: 'Staff Administrasi',
    company: 'PT Astra',
    location: 'Jakarta',
    deadline: '30 September 2026',
    status: 'Tersedia',
    logo: 'job 1 bkk.png',
  },
  {
    id: 2,
    title: 'Operator Produksi',
    company: 'PT Indofood',
    location: 'Jakarta Selatan',
    deadline: '3 September 2026',
    status: 'Tersedia',
    logo: 'job 2 bkk.png',
  },
  {
    id: 3,
    title: 'Teknisi/ IT',
    company: 'PT Telkom Indonesia',
    location: 'Jakarta Selatan',
    deadline: '10 September 2026',
    status: 'Tersedia',
    logo: 'job 3 bkk.png',
  },
  {
    id: 4,
    title: 'Quality Control',
    company: 'PT Mayora Indah Tbk',
    location: 'Jakarta Barat',
    deadline: '25 November 2026',
    status: 'Tersedia',
    logo: 'job 4 bkk.png',
  },
]

// logo disimpan di src/assets/images/logos/
const logoUrl = (name) => new URL(`../assets/images/${name}`, import.meta.url).href
</script>

<template>
  <section id="lowongan" class="jobs">
    <div class="jobs__inner container">
      <header class="jobs__head">
        <span class="jobs__eyebrow">PELUANG KARIER</span>
        <h2>Lowongan Kerja Terbaru</h2>
        <p>Temukan peluang karier yang sesuai dengan kompetensi dan keahlianmu.</p>
      </header>

      <div class="jobs__grid">
        <article v-for="j in jobs" :key="j.id" class="job">
          <div class="job__logo">
            <img :src="logoUrl(j.logo)" :alt="`Logo ${j.company}`" />
          </div>

          <div class="job__main">
            <div class="job__top">
              <div>
                <h3>{{ j.title }}</h3>
                <p class="job__company">{{ j.company }}</p>
              </div>
              <span class="job__status">{{ j.status }}</span>
            </div>

            <p class="job__loc">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {{ j.location }}
            </p>

            <div class="job__bottom">
              <span class="job__deadline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10z" />
                </svg>
                Tutup {{ j.deadline }}
              </span>

              <a :href="`#lowongan-${j.id}`" class="job__btn">
                Lihat Detail
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>

      <div class="jobs__more">
        <a href="#semua-lowongan" class="jobs__all">
          Lihat Semua Lowongan
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.jobs {
  background: #f5f9ff;
  padding: 56px 0 64px;
}

.jobs__inner {
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
}

/* ---------- Header ---------- */
.jobs__head {
  text-align: center;
  margin-bottom: 36px;
}

.jobs__eyebrow {
  display: block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #ca8a04;
  margin-bottom: 8px;
}

.jobs__head h2 {
  font-size: clamp(24px, 3.2vw, 32px);
  font-weight: 800;
  color: #0b2a6f;
  margin-bottom: 8px;
}

.jobs__head p {
  font-size: 14px;
  color: var(--muted);
}

/* ---------- Grid kartu ---------- */
.jobs__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}

.job {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  background: #f6f1fc;
  border: 1px solid #ece4f7;
  border-radius: 14px;
  padding: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.job:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(11, 42, 111, 0.1);
}

.job__logo {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
  display: grid;
  place-items: center;
}

.job__logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.job__main {
  flex: 1;
  min-width: 0;
}

.job__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.job__top h3 {
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
}

.job__company {
  font-size: 12px;
  color: var(--text);
  margin-top: 2px;
}

.job__status {
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 500;
  color: var(--blue);
  background: #fff;
  border: 1px solid var(--blue);
  padding: 2px 14px;
  border-radius: 999px;
}

.job__loc {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--text);
  margin-top: 10px;
}

.job__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
}

.job__deadline {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10.5px;
  color: #0f172a;
  background: #fef3c7;
  border: 1px solid #f5c76a;
  padding: 7px 12px;
  border-radius: 8px;
}

.job__deadline svg {
  color: var(--blue);
}

.job__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  background: var(--blue);
  padding: 8px 16px;
  border-radius: 8px;
  transition: background 0.2s;
}

.job__btn:hover {
  background: var(--blue-dark);
}

/* ---------- Tombol bawah ---------- */
.jobs__more {
  display: flex;
  justify-content: center;
  margin-top: 36px;
}

.jobs__all {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--blue);
  background: #fff;
  border: 1px solid var(--blue);
  padding: 10px 28px;
  border-radius: 999px;
  transition: background 0.2s, color 0.2s;
}

.jobs__all:hover {
  background: var(--blue);
  color: #fff;
}

/* ---------- Responsif ---------- */
@media (max-width: 860px) {
  .jobs__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .job {
    flex-direction: column;
  }

  .job__bottom {
    flex-direction: column;
    align-items: stretch;
  }

  .job__btn {
    justify-content: center;
  }
}
</style>