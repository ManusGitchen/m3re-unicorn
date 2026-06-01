<template>
  <div class="app-layout" :data-theme="theme">
    <Navigation @theme-toggle="toggleTheme" />
    <main class="app-layout__main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navigation from './Navigation.vue'

const theme = ref<'light' | 'dark'>('light')

onMounted(() => {
  // Load theme from localStorage
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
  if (savedTheme) {
    theme.value = savedTheme
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme.value = 'dark'
  }
})

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  background-color: var(--color-background);
  color: var(--color-text);
}

.app-layout__main {
  padding-top: 60px; /* Account for fixed nav */
}
</style>
