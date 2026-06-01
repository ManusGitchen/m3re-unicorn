<template>
  <AppLayout />
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
</script>

<style>
/* Global styles using unicorn-lib */
@import '../unicorn-lib/dist/style.css';

:root {
  --color-background-secondary: #f5f5f5;
}

[data-theme="dark"] {
  --color-background: #1a1a1a;
  --color-background-secondary: #2a2a2a;
  --color-text: #ffffff;
  --color-text-secondary: #cccccc;
  --color-border: #444444;
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Focus visible styles */
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Skip to main content link */
.skip-to-main {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: var(--spacing-sm);
  z-index: 1000;
}

.skip-to-main:focus {
  top: 0;
}

/* Ensure touch targets are at least 44px */
.btn {
  min-height: 44px;
  min-width: 44px;
}

@media (max-width: 768px) {
  .btn {
    padding: var(--spacing-sm) var(--spacing-md);
  }
}
</style>
