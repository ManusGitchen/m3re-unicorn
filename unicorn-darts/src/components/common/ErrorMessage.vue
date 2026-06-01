<template>
  <div class="error-message">
    <div class="error-message__icon">⚠️</div>
    <div class="error-message__content">
      <h4 v-if="title" class="error-message__title">{{ title }}</h4>
      <p class="error-message__text">{{ message }}</p>
      <button v-if="retry" class="btn btn-color-primary btn-sm" @click="$emit('retry')">
        Try Again
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  message: string
  retry?: boolean
}>()

defineEmits<{
  retry: []
}>()
</script>

<style scoped>
.error-message {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border-radius: 8px;
  background-color: var(--color-error-tint);
  border: 1px solid var(--color-error);
}

.error-message__icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.error-message__content {
  flex: 1;
}

.error-message__title {
  margin: 0 0 var(--spacing-xs);
  color: var(--color-error);
  font-weight: var(--typography-font-weight-semibold);
}

.error-message__text {
  margin: 0 0 var(--spacing-sm);
  color: var(--color-text);
}
</style>
