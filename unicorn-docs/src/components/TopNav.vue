<script setup lang="ts">
defineProps<{
  theme: 'light' | 'dark'
}>()

const emit = defineEmits<{
  toggleTheme: []
  navigateHome: []
  navigateGettingStarted: []
}>()
</script>

<template>
  <nav class="top-nav">
    <div class="top-nav-content">
      <div class="top-nav-left">
        <h1 class="top-nav-logo" @click="emit('navigateHome')">
          🦄 Unicorn UI
        </h1>
        <div class="top-nav-links">
          <button class="top-nav-link" @click="emit('navigateHome')">
            Home
          </button>
          <button class="top-nav-link" @click="emit('navigateGettingStarted')">
            Getting Started
          </button>
        </div>
      </div>

      <div class="top-nav-right">
        <a
          href="https://github.com/m3re/unicorn-lib"
          target="_blank"
          rel="noopener noreferrer"
          class="top-nav-github"
          aria-label="GitHub Repository"
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </a>
        <button
          class="top-nav-theme-toggle"
          @click="emit('toggleTheme')"
          :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
        >
          <svg v-if="theme === 'light'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.top-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.top-nav-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.top-nav-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.top-nav-logo {
  margin: 0;
  font-size: 1.25rem;
  font-weight: var(--typography-font-weight-semibold);
  color: var(--color-text-primary);
  cursor: pointer;
  user-select: none;
  transition: color 0.2s;
}

.top-nav-logo:hover {
  color: var(--color-primary);
}

.top-nav-links {
  display: flex;
  gap: 0.5rem;
}

.top-nav-link {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  color: var(--color-text-muted);
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  font-family: inherit;
}

.top-nav-link:hover {
  color: var(--color-text-primary);
  background: var(--color-background-hover);
}

.top-nav-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.top-nav-github,
.top-nav-theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-sm);
  color: var(--color-text-muted);
  transition: all 0.2s;
  cursor: pointer;
}

.top-nav-github {
  text-decoration: none;
}

.top-nav-theme-toggle {
  background: none;
  border: none;
}

.top-nav-github:hover,
.top-nav-theme-toggle:hover {
  color: var(--color-text-primary);
  background: var(--color-background-hover);
}

@media (max-width: 768px) {
  .top-nav-links {
    display: none;
  }

  .top-nav-logo {
    font-size: 1.1rem;
  }
}
</style>
