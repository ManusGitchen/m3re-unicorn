import { defineComponent, computed, ref, onMounted, onUnmounted } from 'vue'
import type { PropType } from 'vue'
import { Icon } from '@iconify/vue'

type NotificationType = 'snackbar' | 'banner' | 'in-context'
type NotificationVariant = 'success' | 'error' | 'warning' | 'info'
type NotificationPosition = 'static' | 'absolute' | 'fixed' | 'relative'
type NotificationPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'right-top'
  | 'right-center'
  | 'right-bottom'
  | 'custom'

const Notification = defineComponent({
  name: 'Notification',
  components: {
    Icon,
  },
  props: {
    type: {
      type: String as PropType<NotificationType>,
      default: 'snackbar',
    },
    variant: {
      type: String as PropType<NotificationVariant>,
      default: 'info',
    },
    message: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: undefined,
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
    autoDismiss: {
      type: Boolean,
      default: false,
    },
    timeout: {
      type: Number,
      default: 5000,
    },
    readMoreLink: {
      type: String,
      default: undefined,
    },
    readMoreText: {
      type: String,
      default: 'Read more',
    },
    // Positioning props
    position: {
      type: String as PropType<NotificationPosition>,
      default: 'static',
    },
    placement: {
      type: String as PropType<NotificationPlacement>,
      default: 'top-center',
    },
    anchor: {
      type: Object as PropType<HTMLElement | null>,
      default: null,
    },
    offsetX: {
      type: Number,
      default: 0,
    },
    offsetY: {
      type: Number,
      default: 0,
    },
    zIndex: {
      type: Number,
      default: 1000,
    },
  },
  emits: ['dismiss', 'read-more'],
  setup(props, { emit, slots }) {
    const isVisible = ref(true)
    let timeoutId: number | null = null

    // Default icons for each variant
    const defaultIcons: Record<NotificationVariant, string> = {
      success: 'mdi:check-circle',
      error: 'mdi:alert-circle',
      warning: 'mdi:alert',
      info: 'mdi:information',
    }

    const iconToDisplay = computed(() => {
      return props.icon || defaultIcons[props.variant]
    })

    // Computed classes
    const classes = computed(() => ({
      'notification': true,
      [`notification-${props.type}`]: true,
      [`notification-${props.variant}`]: true,
      'notification-positioned': props.position !== 'static',
      [`notification-${props.placement}`]: props.position !== 'static' && props.placement !== 'custom',
    }))

    // Computed inline styles for positioning
    const notificationStyle = computed(() => {
      if (props.position === 'static') return {}

      const baseStyle: Record<string, any> = {
        position: props.position,
        zIndex: props.zIndex,
      }

      // Anchor-based custom positioning
      if (props.anchor && props.placement === 'custom') {
        const rect = props.anchor.getBoundingClientRect()
        baseStyle.top = `${rect.bottom + props.offsetY}px`
        baseStyle.left = `${rect.left + props.offsetX}px`
      }

      return baseStyle
    })

    // Handle dismiss
    const handleDismiss = () => {
      isVisible.value = false
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
      emit('dismiss')
    }

    // Handle read more
    const handleReadMore = () => {
      emit('read-more')
    }

    // Auto-dismiss logic
    onMounted(() => {
      if (props.autoDismiss && props.timeout > 0) {
        timeoutId = window.setTimeout(() => {
          handleDismiss()
        }, props.timeout)
      }
    })

    onUnmounted(() => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
    })

    return {
      classes,
      notificationStyle,
      iconToDisplay,
      isVisible,
      handleDismiss,
      handleReadMore,
    }
  },
  template: `
    <div
      v-if="isVisible"
      :class="classes"
      :style="notificationStyle"
      role="alert"
      :aria-live="variant === 'error' ? 'assertive' : 'polite'"
      aria-atomic="true"
    >
      <div class="notification-icon" aria-hidden="true">
        <Icon :icon="iconToDisplay" width="20" height="20" />
      </div>

      <div class="notification-content">
        <span class="notification-message">{{ message }}</span>

        <a
          v-if="readMoreLink"
          :href="readMoreLink"
          class="notification-link"
          @click="handleReadMore"
        >
          {{ readMoreText }}
        </a>
      </div>

      <button
        v-if="dismissible"
        type="button"
        class="notification-dismiss"
        @click="handleDismiss"
        aria-label="Dismiss notification"
      >
        <Icon icon="mdi:close" width="18" height="18" />
      </button>
    </div>
  `,
})

export { Notification }

export interface NotificationProps {
  type?: NotificationType
  variant?: NotificationVariant
  message: string
  icon?: string
  dismissible?: boolean
  autoDismiss?: boolean
  timeout?: number
  readMoreLink?: string
  readMoreText?: string
  position?: NotificationPosition
  placement?: NotificationPlacement
  anchor?: HTMLElement | null
  offsetX?: number
  offsetY?: number
  zIndex?: number
}

export type { NotificationType, NotificationVariant, NotificationPosition, NotificationPlacement }
