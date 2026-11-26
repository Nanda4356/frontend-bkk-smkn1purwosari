<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div>
    <h1 class="ph__title">{{ route.meta.title }}</h1>
    <p class="ph__text">Halaman ini belum dibuat.</p>
  </div>
</template>

<style scoped>
.ph__title {
  font-size: 20px;
  font-weight: 800;
  color: #0b1f4d;
}

.ph__text {
  font-size: 11px;
  color: #64748b;
  margin-top: 4px;
}
</style>