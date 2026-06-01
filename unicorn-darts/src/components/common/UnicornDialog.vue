<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div
        v-if="open"
        class="dialog-backdrop-unicorn"
        @click="handleBackdropClick"
      >
        <div
          class="dialog"
          :style="{ width }"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? 'dialog-title' : undefined"
          @click.stop
        >
          <div v-if="title" class="dialog-header">
            <h2 id="dialog-title" class="dialog-title">{{ title }}</h2>
            <button
              v-if="showClose"
              class="dialog-close"
              aria-label="Close dialog"
              @click="$emit('update:open', false)"
            >
              ×
            </button>
          </div>
          <div class="dialog-content">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean
  title?: string
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  showClose?: boolean
  width?: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

function handleBackdropClick() {
  if (props.closeOnBackdrop !== false) {
    emit('update:open', false)
  }
}

// Handle escape key
if (typeof window !== 'undefined') {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && props.open && props.closeOnEscape !== false) {
      emit('update:open', false)
    }
  })
}
</script>

<style>
/* Minimal styles - relies on unicorn-lib for .dialog-backdrop-unicorn */
.dialog-backdrop-unicorn {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-md);
  /* No background property - let unicorn-lib handle it */
}

.dialog {
  background: var(--color-background);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  width: 500px;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
}

.dialog-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: var(--typography-font-weight-bold);
}

.dialog-close {
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  color: var(--color-text-secondary);
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.dialog-close:hover {
  background: var(--color-neutral-black20);
  color: var(--color-text);
}

.dialog-content {
  padding: var(--spacing-lg);
}

/* Transition animations */
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-enter-active .dialog,
.dialog-leave-active .dialog {
  transition: transform 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from .dialog,
.dialog-leave-to .dialog {
  transform: scale(0.95);
}
</style>
