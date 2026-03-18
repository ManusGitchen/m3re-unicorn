<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  language?: string
}>()

const copied = ref(false)

async function copyCode(event: Event) {
  const codeElement = (event.target as HTMLElement).closest('.code-block')?.querySelector('code')
  if (codeElement) {
    try {
      await navigator.clipboard.writeText(codeElement.textContent || '')
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
}
</script>

<template>
  <div class="code-block">
    <button
      class="copy-button"
      @click="copyCode"
      :aria-label="copied ? 'Copied!' : 'Copy code'"
    >
      <span v-if="copied" class="copy-feedback">✓ Copied!</span>
      <span v-else class="copy-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
      </span>
    </button>
    <pre><code><slot /></code></pre>
  </div>
</template>

<style scoped>
.code-block {
  position: relative;
  background: var(--color-background-contrast);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  padding: 1.25rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.copy-button {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  padding: 0.5rem;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-family: inherit;
}

.copy-button:hover {
  color: var(--color-text-primary);
  border-color: var(--color-primary);
  background: var(--color-background-hover);
}

.copy-button:active {
  transform: scale(0.95);
}

.copy-feedback {
  color: var(--color-success);
  font-weight: var(--typography-font-weight-medium);
}

.copy-icon {
  display: flex;
  align-items: center;
}

pre {
  margin: 0;
  overflow-x: auto;
}

code {
  font-family: var(--typography-font-family-monospace);
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--color-text-primary);
  display: block;
  white-space: pre;
}
</style>
