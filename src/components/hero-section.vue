
<script setup>
import heroImg from '../assets/images/hero bkk.png'
</script>

<template>
  <section id="beranda" class="hero container">
    <div
      class="hero__card"
      :style="{ backgroundImage: `url(${heroImg})` }"
    >
      <span class="hero__badge">
        Career Opportunities
      </span>

      <div class="hero__content">
        <h1>
          Your Future Career<br />
          Starts Here.
        </h1>

        <p>
          Jelajahi peluang karier dan temukan<br />
          masa depanmu.
        </p>

        <a href="#lowongan" class="hero__btn">
          Jelajahi Lowongan

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: 28px;
  max-width: 1260px;
  margin: 0 auto;

  /* Memberi jarak saat section dituju dari navbar */
  scroll-margin-top: 96px;
}

.hero__card {
  position: relative;
  height: 520px;
  border-radius: 20px;
  overflow: hidden;

  background-size: cover;
  background-position: center;

  display: flex;
  align-items: flex-end;

  padding: 60px 80px 80px;
  box-sizing: border-box;
}

/* Overlay gelap supaya teks putih terbaca */
.hero__card::before {
  content: '';
  position: absolute;
  inset: 0;

  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.55) 0%,
    rgba(0, 0, 0, 0.15) 70%,
    rgba(0, 0, 0, 0.05) 100%
  );
}

/* Badge */
.hero__badge {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 2;

  background: rgba(255, 255, 255, 0.92);
  color: var(--text);

  font-size: 12px;
  font-weight: 600;

  padding: 8px 18px;
  border-radius: 999px;
}

/* Konten hero */
.hero__content {
  position: relative;
  z-index: 2;
  color: #fff;
  max-width: 520px;
  transform: translateY(-25px);
}

.hero__content h1 {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 12px;
}

.hero__content p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 24px;
}

/* Tombol */
.hero__btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  background: var(--blue);
  color: #fff;

  font-size: 14px;
  font-weight: 600;

  padding: 12px 24px;
  border-radius: 10px;

  text-decoration: none;

  transition: background 0.2s, transform 0.2s;
}

.hero__btn:hover {
  background: var(--blue-dark);
  transform: translateY(-2px);
}

/* Tablet */
@media (max-width: 1024px) {
  .hero {
    width: calc(100% - 40px);
  }

  .hero__card {
    padding-left: 48px;
    padding-right: 48px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .hero {
    padding-top: 16px;
    scroll-margin-top: 84px;
  }

  .hero__card {
    height: 400px;
    border-radius: 16px;

    padding: 24px 24px 50px;

    background-position: center;
  }

  .hero__badge {
    top: 16px;
    right: 16px;

    font-size: 10px;
    padding: 7px 12px;
  }

  .hero__content h1 {
    font-size: 32px;
  }

  .hero__content p {
    font-size: 14px;
  }

  .hero__btn {
    font-size: 13px;
    padding: 11px 18px;
  }
}
</style>
