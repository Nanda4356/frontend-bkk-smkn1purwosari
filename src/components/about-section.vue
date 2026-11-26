<script setup>
import aboutImg from '../assets/images/about bkk.png'
import visiImg from '../assets/images/visi-misi bkk.png'

const misi = [
  'Meningkatkan keterampilan teknis dan nonteknis siswa melalui pelatihan dan pembinaan karier.',
  'Menyediakan informasi lowongan kerja dan bimbingan persiapan memasuki dunia kerja.',
  'Memperluas kemitraan dengan perusahaan dan dunia industri untuk membuka peluang kerja serta magang.',
  'Menyelenggarakan kegiatan pendukung kesiapan kerja, seperti seminar, job fair, dan mentoring.',
]
</script>

<template>
  <section id="tentang" class="about container">
    <!-- Intro -->
    <div class="about__intro">
      <div class="about__image">
        <img :src="aboutImg" alt="Kegiatan BKK SMKN 1 Purwosari" />
      </div>

      <div class="about__content">
        <span class="about__eyebrow">WELCOME TO</span>
        <h2>BKK SMKN 1 PURWOSARI</h2>

        <p>
          Bursa Kerja Khusus (BKK) SMKN 1 Purwosari merupakan layanan yang
          menjembatani dunia pendidikan dengan dunia industri. BKK membantu siswa
          dan alumni memperoleh informasi lowongan kerja serta peluang karier yang
          sesuai dengan kompetensi dan keahlian mereka.
        </p>

        <p>
          Melalui kerja sama dengan berbagai perusahaan, BKK mendukung kesiapan
          lulusan untuk memasuki dunia kerja, mengembangkan keterampilan, dan
          meraih masa depan yang lebih baik.
        </p>

        <a href="#tentang-lengkap" class="about__btn">
          Pelajari Selengkapnya
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Visi & Misi -->
    <div class="vm">
      <span class="vm__eyebrow">VISI &amp; MISI</span>
      <h2 class="vm__title">Mewujudkan Lulusan Siap Kerja</h2>

      <div class="vm__grid">
        <!-- Visi -->
        <article class="visi" :style="{ backgroundImage: `url(${visiImg})` }">
          <span class="visi__num">01</span>

          <div class="vm__head">
            <span class="vm__icon vm__icon--glass">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            <div>
              <h3>VISI</h3>
              <small>Arah &amp; Tujuan</small>
            </div>
          </div>

          <div class="visi__body">
            <strong>Menjadi Jembatan Sukses Karier</strong>
            <p>
              Menjadi jembatan karier bagi siswa dan lulusan melalui pengembangan
              kompetensi, penguatan integritas, inovasi, serta penyediaan peluang
              kerja yang sesuai dengan kebutuhan dunia industri.
            </p>
          </div>
        </article>

        <!-- Misi -->
        <article class="misi">
          <div class="vm__head">
            <span class="vm__icon vm__icon--white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </span>
            <div>
              <h3>MISI</h3>
              <small>Langkah Nyata</small>
            </div>
            <span class="misi__num">02</span>
          </div>

          <hr class="misi__line" />

          <ul class="misi__list">
            <li v-for="m in misi" :key="m">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="8 12 11 15 16 9" />
              </svg>
              <span>{{ m }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  width: 100%;
  max-width: 1120px;        /* makin kecil = makin sempit & kelihatan di tengah */
  margin-left: auto;
  margin-right: auto;
  padding-top: 10px;
  padding-bottom: 60px;
}

/* ---------- Intro ---------- */
.about__intro {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 44px;
  align-items: center;
}

.about__image {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.about__image img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 320px;
  object-fit: cover;
}

.about__eyebrow {
  display: block;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #ca8a04;
  margin-bottom: 10px;
}

.about__content h2 {
  font-size: clamp(26px, 3.6vw, 34px);
  font-weight: 800;
  line-height: 1.15;
  color: #0b2a6f;
  margin-bottom: 16px;
}

.about__content p {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text);
  margin-bottom: 14px;
  max-width: 520px;
}

.about__btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  background: var(--blue);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 24px;
  border-radius: 999px;
  transition: background 0.2s, transform 0.2s;
}

.about__btn:hover {
  background: var(--blue-dark);
  transform: translateY(-2px);
}

/* ---------- Visi & Misi ---------- */
.vm {
  margin-top: 52px;
}

.vm__eyebrow {
  display: block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #ca8a04;
  margin-bottom: 6px;
}

.vm__title {
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 800;
  color: #0b2a6f;
  margin-bottom: 24px;
}

.vm__grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 22px;
  align-items: stretch;
}

.vm__head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.vm__head h3 {
  font-size: 15px;
  font-weight: 800;
  line-height: 1.2;
}

.vm__head small {
  font-size: 12px;
  opacity: 0.85;
}

.vm__icon {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: grid;
  place-items: center;
}

.vm__icon--glass {
  background: rgba(255, 255, 255, 0.92);
  color: var(--blue);
}

.vm__icon--white {
  background: #fff;
  color: var(--blue);
}

/* Visi */
.visi {
  position: relative;
  min-height: 340px;
  border-radius: 16px;
  overflow: hidden;
  padding: 26px 26px 26px 44%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 28px;
  color: #fff;
  background-size: cover;
  background-position: left center;
}

.visi__body {
  margin-top: 0;
}

.visi::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(24, 125, 193, 0) 0%,
    rgba(24, 125, 193, 0.5) 50%,
    rgba(24, 125, 193, 0.5) 100%
  );
}

.visi > * {
  position: relative;
  z-index: 1;
}

.visi__num {
  position: absolute !important;
  top: 18px;
  left: 22px;
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  opacity: 0.9;
}

.visi .vm__head {
  justify-content: flex-start;   /* sebelumnya center */
}

.visi__body strong {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
}

.visi__body p {
  font-size: 13px;
  line-height: 1.7;
  max-width: 420px;
}

/* Misi */
.misi {
  background: #dbeafe;
  border-radius: 16px;
  padding: 26px;
  color: #0b2a6f;
}

.misi__num {
  margin-left: auto;
  font-size: 22px;
  font-weight: 700;
  color: var(--blue);
  opacity: 0.6;
}

.misi__line {
  border: 0;
  height: 1px;
  background: linear-gradient(to right, var(--blue), transparent);
  margin: 18px 0;
}

.misi__list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.misi__list li {
  display: flex;
  gap: 10px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text);
}

.misi__list svg {
  flex-shrink: 0;
  margin-top: 3px;
  color: var(--blue);
}

/* ---------- Responsif ---------- */
@media (max-width: 860px) {
  .about__intro,
  .vm__grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .vm {
    margin-top: 44px;
  }
}
</style>