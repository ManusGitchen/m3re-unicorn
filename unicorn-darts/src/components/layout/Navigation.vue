<template>
  <nav class="navigation">
    <div class="navigation__container">
      <router-link to="/" class="navigation__logo">
        🎯 Unicorn Darts
      </router-link>

      <!-- Desktop navigation -->
      <div class="navigation__links navigation__links--desktop">
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

      <div class="navigation__actions">
        <button class="navigation__theme-toggle btn btn-tertiary btn-icon-only btn-sm" @click="$emit('theme-toggle')" title="Toggle theme">
          🌓
        </button>

        <!-- Mobile hamburger button -->
        <button
          class="navigation__hamburger btn btn-tertiary btn-icon-only btn-sm"
          @click="toggleMenu"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle menu"
        >
          <span v-if="!isMenuOpen">☰</span>
          <span v-else>✕</span>
        </button>
      </div>
    </div>

    <!-- Mobile navigation menu -->
    <div class="navigation__mobile-menu" :class="{ 'navigation__mobile-menu--open': isMenuOpen }">
      <router-link
        to="/"
        class="navigation__mobile-link"
        active-class="navigation__mobile-link--active"
        @click="closeMenu"
      >
        Home
      </router-link>
      <router-link
        to="/players"
        class="navigation__mobile-link"
        active-class="navigation__mobile-link--active"
        @click="closeMenu"
      >
        Players
      </router-link>
      <router-link
        to="/history"
        class="navigation__mobile-link"
        active-class="navigation__mobile-link--active"
        @click="closeMenu"
      >
        History
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineEmits<{
  'theme-toggle': []
}>()

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}
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
  white-space: nowrap;
}

.navigation__link:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

.navigation__link--active {
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
}

.navigation__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.navigation__theme-toggle,
.navigation__hamburger {
  color: white;
  font-size: 1.25rem;
}

.navigation__theme-toggle:hover,
.navigation__hamburger:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.navigation__hamburger {
  display: none;
}

/* Mobile menu */
.navigation__mobile-menu {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background-color: var(--color-primary);
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
  gap: var(--spacing-xs);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
  z-index: 99;
}

.navigation__mobile-menu--open {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.navigation__mobile-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 4px;
  transition: all 0.2s;
  font-size: 1.125rem;
}

.navigation__mobile-link:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

.navigation__mobile-link--active {
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
}

/* Mobile styles */
@media (max-width: 768px) {
  .navigation__links--desktop {
    display: none;
  }

  .navigation__hamburger {
    display: inline-flex;
  }
}

/* Tablet and up */
@media (min-width: 769px) {
  .navigation__mobile-menu {
    display: none;
  }
}
</style>
