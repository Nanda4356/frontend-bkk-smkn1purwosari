<script setup>
import ctaImg from '../assets/images/cta bkk.png'
</script>

<template>
  <section class="cta container">
    <div class="cta__box">
      <div class="cta__text">
        <span class="eyebrow"><i></i>YOUR FUTURE STARTS HERE</span>
        <h2>Wujudkan Karier Impianmu, Mulai Langkahmu Bersama Kami</h2>
        <p>
          Temukan informasi lowongan kerja dan peluang karier terbaik untuk
          membuka jalan menuju masa depan yang lebih cerah.
        </p>
      </div>

      <div class="cta__img">
        <img :src="ctaImg" alt="SMKN 1 Purwosari" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 20px;
  padding-bottom: 60px;
}

.cta__box {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 24px;
  align-items: stretch;
  background: #dbeafe;
  border: 1px solid #cfe3f3;
  border-radius: 14px;
  overflow: hidden;
  padding: 0;
}

.cta__text {
  align-self: center;
  padding: 28px 0 28px 36px;
}

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

.cta__text h2 {
  font-size: clamp(20px, 2.6vw, 26px);
  font-weight: 800;
  line-height: 1.25;
  color: #0b2a6f;
  margin-bottom: 8px;
}

.cta__text p {
  font-size: 13px;
  line-height: 1.6;
  color: var(--text);
  max-width: 440px;
}

.cta__img {
  min-height: 170px;
  height: 100%;
}

.cta__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 760px) {
  .cta__box {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .cta__text {
    padding: 24px 20px;
  }

  .cta__img {
    min-height: 180px;
  }
}
</style>