<script setup>
// Data contoh. Nanti ganti dengan data dari API Laravel (GET /api/mitra)
const partners = [
  {
    id: 1,
    name: 'PT Mayora Indah tbk',
    field: 'Pengolahan Makanan & Minuman',
    logo: 'partner 1 bkk.png',
  },
  {
    id: 2,
    name: 'PT Madusari Mas',
    field: 'Facility Management',
    logo: 'partner 2 bkk.png',
  },
  {
    id: 3,
    name: 'PT Guntner Ionesia',
    field: 'manufaktur mesin pendingin industri',
    logo: 'partner 3 bkk.png',
  },
  {
    id: 4,
    name: 'PT Astra International tbk',
    field: 'Industri Otomotif',
    logo: 'partner 4 bkk.png',
  },
]

// logo disimpan di src/assets/images/logos/
const logoUrl = (name) => new URL(`../assets/images/${name}`, import.meta.url).href
</script>

<template>
  <section id="mitra" class="partners">
    <div class="partners__inner container">
      <header class="partners__head">
        <span class="partners__eyebrow">JARINGAN KEMITRAAN</span>
        <h2>Perusahaan Mitra</h2>
        <p>Mengenal perusahaan yang bekerja sama dengan BKK SMKN 1 Purwosari.</p>
      </header>

      <div class="partners__grid">
        <article v-for="p in partners" :key="p.id" class="partner">
          <div class="partner__logo">
            <img :src="logoUrl(p.logo)" :alt="`Logo ${p.name}`" />
          </div>

          <h3>{{ p.name }}</h3>
          <hr class="partner__line" />
          <p>{{ p.field }}</p>
        </article>
      </div>

      <div class="partners__more">
        <a href="#semua-mitra" class="partners__btn">
          Lihat Semua Lowongan
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partners {
  background: #fff;
  padding: 56px 0 64px;
}

.partners__inner {
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
}

/* ---------- Header ---------- */
.partners__head {
  text-align: center;
  margin-bottom: 36px;
}

.partners__eyebrow {
  display: block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #ca8a04;
  margin-bottom: 8px;
}

.partners__head h2 {
  font-size: clamp(24px, 3.2vw, 32px);
  font-weight: 800;
  color: #0b2a6f;
  margin-bottom: 8px;
}

.partners__head p {
  font-size: 14px;
  color: var(--muted);
}

/* ---------- Grid kartu ---------- */
.partners__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}

.partner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #fff;
  border: 1px solid var(--blue);
  border-radius: 12px;
  padding: 26px 20px 22px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.partner:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(24, 125, 193, 0.15);
}

.partner__logo {
  width: 100%;
  height: 96px;
  display: grid;
  place-items: center;
  margin-bottom: 18px;
}

.partner__logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.partner h3 {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

.partner__line {
  width: 100%;
  border: 0;
  height: 1px;
  background: #cfe3f3;
  margin: 14px 0;
}

.partner p {
  font-size: 11px;
  color: var(--text);
  line-height: 1.5;
}

/* ---------- Tombol bawah ---------- */
.partners__more {
  display: flex;
  justify-content: center;
  margin-top: 36px;
}

.partners__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: var(--blue);
  padding: 10px 28px;
  border-radius: 999px;
  transition: background 0.2s, transform 0.2s;
}

.partners__btn:hover {
  background: var(--blue-dark);
  transform: translateY(-2px);
}

/* ---------- Responsif ---------- */
@media (max-width: 960px) {
  .partners__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .partners__grid {
    grid-template-columns: 1fr;
  }
}
</style>