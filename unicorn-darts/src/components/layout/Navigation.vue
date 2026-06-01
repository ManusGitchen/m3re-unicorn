<template>
  <nav class="navigation">
    <div class="navigation__container">
      <router-link to="/" class="navigation__logo">
        🎯 Unicorn Darts
      </router-link>

      <div class="navigation__links">
        <router-link to="/" class="navigation__link" active-class="navigation__link--active">
          Home
        </router-link>
        <router-link to="/players" class="navigation__link" active-class="navigation__link--active">
          Players
        </router-link>
        <router-link to="/history" class="navigation__link" active-class="navigation__link--active">
          History
        </router-link>
      </div>

      <button class="navigation__theme-toggle btn btn-sm" @click="$emit('theme-toggle')">
        🌓
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineEmits<{
  'theme-toggle': []
}>()
</script>

<style scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: var(--color-primary);
  color: white;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.navigation__container {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-md);
  gap: var(--spacing-lg);
}

.navigation__logo {
  font-size: 1.25rem;
  font-weight: var(--typography-font-weight-bold);
  color: white;
  text-decoration: none;
  white-space: nowrap;
}

.navigation__links {
  display: flex;
  gap: var(--spacing-md);
  flex: 1;
}

.navigation__link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 4px;
  transition: all 0.2s;
}

.navigation__link:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

.navigation__link--active {
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
}

.navigation__theme-toggle {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
}

@media (max-width: 768px) {
  .navigation__links {
    gap: var(--spacing-xs);
  }

  .navigation__link {
    padding: var(--spacing-xs);
    font-size: 0.875rem;
  }
}
</style>
