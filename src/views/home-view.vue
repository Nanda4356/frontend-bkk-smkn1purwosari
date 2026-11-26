
<script setup>
import Navbar from '../components/navbar.vue'
import HeroSection from '../components/hero-section.vue'
import FeatureCard from '../components/feature-card.vue'
import AboutSection from '../components/about-section.vue'
import JobSection from '../components/job-section.vue'
import PartnerSection from '../components/partner-section.vue'
import NewsSection from '../components/news-section.vue'
import CtaSection from '../components/cta-section.vue'
import FooterSection from '../components/footer-section.vue'

const cards = [
  {
    title: 'Lowongan Kerja',
    description: 'Temukan informasi lowongan kerja sesuai bidang keahlianmu.',
    linkText: 'Lihat Lowongan',
    href: '#lowongan',
    color: 'blue',
    icon: 'briefcase',
  },
  {
    title: 'Perusahaan Mitra',
    description: 'Kenali perusahaan yang bekerja sama dengan BKK sekolah.',
    linkText: 'Lihat Mitra',
    href: '#mitra',
    color: 'yellow',
    icon: 'building',
  },
  {
    title: 'Informasi Rekrutmen',
    description: 'Dapatkan informasi jadwal seleksi dan persyaratan rekrutmen.',
    linkText: 'Lihat Informasi',
    href: '#informasi',
    color: 'blue',
    icon: 'calendar',
  },
  {
    title: 'Layanan Alumni',
    description: 'Dapatkan akses layanan khusus dan informasi alumni.',
    linkText: 'Pelajari Layanan',
    href: '#alumni',
    color: 'yellow',
    icon: 'cap',
  },
]
</script>

<template>
  <Navbar />

  <main>
    <HeroSection />

    <section class="container cards">
      <FeatureCard
        v-for="c in cards"
        :key="c.title"
        :title="c.title"
        :description="c.description"
        :link-text="c.linkText"
        :href="c.href"
        :color="c.color"
      >
        <template #icon>
          <svg v-if="c.icon === 'briefcase'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            <path d="M2 13h20" />
          </svg>

          <svg v-else-if="c.icon === 'building'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <polyline points="14 3 14 8 19 8" />
            <line x1="9" y1="13" x2="15" y2="13" />
            <line x1="9" y1="17" x2="15" y2="17" />
          </svg>

          <svg v-else-if="c.icon === 'calendar'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <polyline points="9 16 11 18 15 14" />
          </svg>

          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 10L12 5 2 10l10 5 10-5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </template>
      </FeatureCard>
    </section>

    <AboutSection />
    <JobSection />
    <PartnerSection />
    <NewsSection />
    <CtaSection />
  </main>

  <FooterSection />
</template>

<style scoped>
.cards {
  max-width: 1260px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  align-items: stretch;
  padding-top: 20px;
  padding-bottom: 40px;
}

@media (max-width: 960px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .cards {
    grid-template-columns: 1fr;
  }
}
</style>
