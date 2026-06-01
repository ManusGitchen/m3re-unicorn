<template>
  <div v-if="shouldShow" class="checkout-suggestion card card-color-info">
    <div class="card-content">
      <h4 class="card-title">💡 Checkout Suggestion</h4>
      <div v-if="isBogeyNumber" class="checkout-suggestion__bogey">
        ⚠️ Bogey number - no direct checkout possible
      </div>
      <div v-else-if="suggestions.length > 0" class="checkout-suggestion__list">
        <div
          v-for="(suggestion, index) in suggestions"
          :key="index"
          class="checkout-suggestion__item"
        >
          {{ suggestion.description }}
        </div>
      </div>
      <div v-else class="checkout-suggestion__none">
        Set up for a checkout
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCheckout } from '@/composables/useCheckout'

const props = defineProps<{
  score: number
}>()

const { getCheckoutSuggestions, isBogey } = useCheckout()

const shouldShow = computed(() => props.score <= 170 && props.score > 1)
const isBogeyNumber = computed(() => isBogey(props.score))
const suggestions = computed(() => getCheckoutSuggestions(props.score))
</script>

<style scoped>
.checkout-suggestion {
  background-color: var(--color-info-tint);
}

.checkout-suggestion__bogey {
  color: var(--color-warning);
  font-weight: var(--typography-font-weight-semibold);
}

.checkout-suggestion__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.checkout-suggestion__item {
  padding: var(--spacing-xs);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  font-family: var(--typography-font-family-monospace);
}

.checkout-suggestion__none {
  color: var(--color-text-secondary);
  font-style: italic;
}
</style>
