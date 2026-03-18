<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TopNav from './components/TopNav.vue'
import SideNav from './components/SideNav.vue'
import HomePage from './pages/HomePage.vue'
import GettingStarted from './pages/GettingStarted.vue'
import ComponentPage from './pages/ComponentPage.vue'

type Page = 'home' | 'getting-started' | 'component'

const currentPage = ref<Page>('home')
const currentComponent = ref<string>('')
const theme = ref<'light' | 'dark'>('light')

onMounted(() => {
  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme.value = 'dark'
    document.documentElement.setAttribute('data-theme', 'dark')
  }
})

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
}

function navigateToHome() {
  currentPage.value = 'home'
}

function navigateToGettingStarted() {
  currentPage.value = 'getting-started'
}

function navigateToComponent(componentName: string) {
  currentPage.value = 'component'
  currentComponent.value = componentName
}
</script>

<template>
  <div class="app">
    <TopNav
      :theme="theme"
      @toggle-theme="toggleTheme"
      @navigate-home="navigateToHome"
      @navigate-getting-started="navigateToGettingStarted"
    />

    <div class="app-layout">
      <SideNav
        :current-component="currentComponent"
        @navigate-component="navigateToComponent"
      />

      <main class="app-content">
        <HomePage v-if="currentPage === 'home'" />
        <GettingStarted v-else-if="currentPage === 'getting-started'" />
        <ComponentPage
          v-else-if="currentPage === 'component'"
          :component-name="currentComponent"
        />
      </main>
    </div>
  </div>
</template>

<style>
@import 'unicorn-lib/style.css';

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--typography-font-family-primary);
  background: var(--color-background);
  color: var(--color-text);
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.app-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 768px) {
  .app-content {
    padding: 1rem;
  }
}
</style>
