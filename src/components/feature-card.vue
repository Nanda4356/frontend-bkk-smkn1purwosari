<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  linkText: { type: String, default: 'Lihat Selengkapnya' },
  href: { type: String, default: '#' },
  color: { type: String, default: 'blue' },
})
</script>

<template>
  <article class="card">
    <div class="card__icon" :class="`card__icon--${color}`">
      <slot name="icon" />
    </div>

    <div class="card__body">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <a :href="href" class="card__link">{{ linkText }} →</a>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  height: 100%;
  background: #fff;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.card__icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: grid;
  place-items: center;
}

.card__icon--blue {
  background: #dbeafe;
  color: var(--blue);
}

.card__icon--yellow {
  background: #fef3c7;
  color: #d97706;
}

.card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.card__body h3 {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 4px;
}

.card__body p {
  font-size: 10.5px;
  line-height: 1.5;
  color: var(--muted);
  margin-bottom: 8px;
}

.card__link {
  margin-top: auto;
  font-size: 10.5px;
  font-weight: 600;
  color: var(--blue);
}
</style>