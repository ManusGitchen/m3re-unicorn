import { defineComponent, computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type { PropType } from 'vue'
import { Icon } from '@iconify/vue'

type Variant = 'default' | 'fullscreen' | 'float-bottom' | 'float-top' | 'float-left' | 'float-right'
type Height = 'auto' | 'fixed' | 'fullscreen'

const Dialog = defineComponent({
  name: 'Dialog',
  components: {
    Icon,
  },
  props: {
    variant: {
      type: String as PropType<Variant>,
      default: 'default',
    },
    width: {
      type: String,
      default: undefined,
    },
    height: {
      type: String as PropType<Height>,
      default: 'auto',
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: undefined,
    },
    open: {
      type: Boolean,
      default: false,
    },
    closeOnBackdrop: {
      type: Boolean,
      default: true,
    },
    closeOnEscape: {
      type: Boolean,
      default: true,
    },
    unicorn: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:open', 'close', 'open'],
  setup(props, { slots, emit }) {
    const dialogRef = ref<HTMLElement | null>(null)
    const previousActiveElement = ref<HTMLElement | null>(null)
    const titleId = ref(`dialog-title-${Math.random().toString(36).substr(2, 9)}`)

    // Classes
    const backdropClasses = computed(() => ({
      'dialog-backdrop': true,
      'dialog-backdrop-open': props.open,
      'dialog-backdrop-unicorn': props.unicorn,
    }))

    const dialogClasses = computed(() => ({
      'dialog': true,
      [`dialog-${props.variant}`]: true,
      [`dialog-height-${props.height}`]: true,
      'dialog-open': props.open,
    }))

    const bodyClasses = computed(() => ({
      'dialog-body': true,
      'dialog-body-scrollable': props.scrollable,
    }))

    // Styles
    const dialogStyles = computed(() => {
      const styles: Record<string, string> = {}
      if (props.width && props.variant !== 'fullscreen') {
        styles.width = props.width
      }
      return styles
    })

    // Close dialog
    const closeDialog = () => {
      emit('update:open', false)
      emit('close')
    }

    // Handle backdrop click
    const handleBackdropClick = (event: MouseEvent) => {
      if (props.closeOnBackdrop && event.target === event.currentTarget) {
        closeDialog()
      }
    }

    // Handle escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (props.closeOnEscape && event.key === 'Escape' && props.open) {
        closeDialog()
      }
    }

    // Focus trap
    const getFocusableElements = (): HTMLElement[] => {
      if (!dialogRef.value) return []

      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ')

      return Array.from(dialogRef.value.querySelectorAll(focusableSelectors))
    }

    const handleTab = (event: KeyboardEvent) => {
      if (!props.open || event.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    // Watch open state
    watch(() => props.open, async (isOpen) => {
      if (isOpen) {
        // Store currently focused element
        previousActiveElement.value = document.activeElement as HTMLElement

        // Emit open event
        emit('open')

        // Wait for next tick to ensure DOM is updated
        await nextTick()

        // Move focus into dialog
        if (dialogRef.value) {
          const focusableElements = getFocusableElements()
          if (focusableElements.length > 0) {
            focusableElements[0].focus()
          } else {
            dialogRef.value.focus()
          }
        }

        // Prevent body scroll
        document.body.style.overflow = 'hidden'
      } else {
        // Restore focus to previously focused element
        if (previousActiveElement.value) {
          previousActiveElement.value.focus()
        }

        // Restore body scroll
        document.body.style.overflow = ''
      }
    })

    // Lifecycle
    onMounted(() => {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('keydown', handleTab)
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleTab)

      // Cleanup: restore body scroll if dialog is still open
      if (props.open) {
        document.body.style.overflow = ''
      }
    })

    return {
      backdropClasses,
      dialogClasses,
      bodyClasses,
      dialogStyles,
      dialogRef,
      titleId,
      closeDialog,
      handleBackdropClick,
    }
  },
  template: `
    <Teleport to="body">
      <Transition name="dialog-backdrop-fade">
        <div
          v-if="open"
          :class="backdropClasses"
          @click="handleBackdropClick"
        >
          <Transition :name="'dialog-' + variant">
            <div
              v-if="open"
              ref="dialogRef"
              :class="dialogClasses"
              :style="dialogStyles"
              role="dialog"
              aria-modal="true"
              :aria-labelledby="titleId"
              tabindex="-1"
            >
              <!-- Header -->
              <div v-if="$slots.header || title || $slots.title" class="dialog-header">
                <slot name="header">
                  <h2 :id="titleId" class="dialog-title">
                    <slot name="title">{{ title }}</slot>
                  </h2>
                  <button
                    type="button"
                    class="dialog-close"
                    @click="closeDialog"
                    aria-label="Close dialog"
                  >
                    <Icon icon="mdi:close" width="24" height="24" />
                  </button>
                </slot>
              </div>

              <!-- Body -->
              <div :class="bodyClasses">
                <slot />
              </div>

              <!-- Footer -->
              <div v-if="$slots.footer || $slots.actions" class="dialog-footer">
                <slot name="footer">
                  <slot name="actions">
                    <button type="button" class="btn btn-secondary btn-md" @click="closeDialog">
                      Cancel
                    </button>
                    <button type="button" class="btn btn-primary btn-md">
                      Submit
                    </button>
                  </slot>
                </slot>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  `,
})

export { Dialog }

export interface DialogProps {
  variant?: Variant
  width?: string
  height?: Height
  scrollable?: boolean
  title?: string
  open?: boolean
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  unicorn?: boolean
}

export type { Variant as DialogVariant, Height as DialogHeight }
