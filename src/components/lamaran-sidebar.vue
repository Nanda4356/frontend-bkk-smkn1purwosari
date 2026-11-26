<script setup>
defineProps({
  company: {
    type: Object,
    required: true, // { name, location, website }
  },
})

// Data contoh. Nanti ganti dengan data dari API Laravel (GET /api/lowongan/rekomendasi)
const rekomendasi = [
  { id: 1, title: 'Staff Admin Gudang', company: 'PT Sumber Makmur Pasuruan', type: 'Full Time', salary: 'Rp 3.2 - 3.8 jt' },
  { id: 2, title: 'Operator Data Entry', company: 'CV Global Mandiri Logistik', type: 'Kontrak', salary: 'Rp 3.0 - 3.5 jt' },
]

// ganti dengan nomor WhatsApp BKK sekolah
const waLink = 'https://wa.me/6280000000000'
</script>

<template>
  <aside class="side">
    <!-- Perusahaan -->
    <section class="box company">
      <div class="company__head">
        <span class="company__icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="3" width="16" height="18" rx="1" />
            <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
          </svg>
        </span>
        <div>
          <h3>{{ company.name }}</h3>
          <span class="verified">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Mitra Resmi BKK
          </span>
        </div>
      </div>

      <ul class="company__info">
        <li>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {{ company.location }}
        </li>
        <li>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
          </svg>
          {{ company.website }}
        </li>
      </ul>
    </section>

    <!-- Rekomendasi -->
    <section class="box reko">
      <div class="reko__head">
        <h4><i></i>Rekomendasi BKK</h4>
        <span class="pill">Tersedia</span>
      </div>

      <div v-for="r in rekomendasi" :key="r.id" class="reko__item">
        <div class="reko__top">
          <strong>{{ r.title }}</strong>
          <span class="tag">{{ r.type }}</span>
        </div>
        <p>{{ r.company }}</p>
        <div class="reko__foot">
          <span>{{ r.salary }}</span>
          <a href="#" class="reko__apply">
            Lamar
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Bantuan -->
    <section class="box help">
      <h4>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#1d6fc2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        Butuh bantuan?
      </h4>
      <p>Hubungi tim BKK SMKN 1 Purwosari untuk konsultasi seputar lamaran.</p>
      <a :href="waLink" target="_blank" rel="noopener" class="help__btn">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        Chat WhatsApp BKK
      </a>
    </section>
  </aside>
</template>

<style scoped>
.side {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.box {
  background: #f8f9fb;
  border: 1px solid #eef0f4;
  border-radius: 12px;
}

.company {
  padding: 16px;
}

.company__head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.company__icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: #dbeafe;
  color: #1d6fc2;
}

.company h3 {
  font-size: 12.5px;
  font-weight: 700;
  color: #0f172a;
}

.verified {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 9px;
  font-weight: 600;
  color: #1d6fc2;
  background: #e0edfb;
  padding: 2px 8px;
  border-radius: 999px;
  margin-top: 3px;
}

.company__info {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 10px;
  color: #475569;
}

.company__info li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reko {
  padding: 14px;
  background: #fff;
}

.reko__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.reko__head h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  color: #0f172a;
}

.reko__head i {
  display: inline-block;
  width: 3px;
  height: 14px;
  border-radius: 2px;
  background: #1d6fc2;
}

.pill {
  font-size: 8.5px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  color: #1d6fc2;
  background: #e0edfb;
}

.reko__item {
  border: 1px solid #eef0f4;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 8px;
}

.reko__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
}

.reko__top strong {
  font-size: 10.5px;
  color: #0f172a;
}

.tag {
  font-size: 8px;
  color: #475569;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  padding: 1px 6px;
  border-radius: 4px;
}

.reko__item p {
  font-size: 9px;
  color: #64748b;
  margin: 2px 0 8px;
}

.reko__foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #eef0f4;
  font-size: 10px;
  color: #0f172a;
}

.reko__apply {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 600;
  color: #1d6fc2;
}

.help {
  padding: 14px;
  background: #fff;
}

.help h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 6px;
}

.help p {
  font-size: 9px;
  line-height: 1.5;
  color: #64748b;
  margin-bottom: 10px;
}

.help__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 600;
  color: #1d6fc2;
  background: #e8f1fc;
  border: 1px solid #cfe0f5;
  border-radius: 6px;
  padding: 8px;
  transition: background 0.2s;
}

.help__btn:hover {
  background: #d8e8fa;
}
</style>