<template>
  <div class="loading-spinner" :class="sizeClass">
    <div class="loading-spinner__circle"></div>
    <p v-if="message" class="loading-spinner__message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  size?: 'sm' | 'md' | 'lg'
  message?: string
}>()

const sizeClass = computed(() => {
  return `loading-spinner--${props.size || 'md'}`
})
</script>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
}

.loading-spinner__circle {
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-spinner--sm .loading-spinner__circle {
  width: 24px;
  height: 24px;
  border-width: 2px;
}

.loading-spinner--md .loading-spinner__circle {
  width: 40px;
  height: 40px;
  border-width: 3px;
}

.loading-spinner--lg .loading-spinner__circle {
  width: 64px;
  height: 64px;
  border-width: 4px;
}

.loading-spinner__message {
  color: var(--color-text-secondary);
  text-align: center;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
