import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import { Icon } from '@iconify/vue'

type Variant = 'filled' | 'outlined' | 'soft' | 'soft-outlined' | 'rainbow-border' | 'glass' | 'glass-shiny'
type Color = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info' | 'neutral'
type Size = 'sm' | 'md' | 'lg'
type Rounded = 'sm' | 'md' | 'lg' | 'full'

const Tag = defineComponent({
  name: 'Tag',
  components: {
    Icon,
  },
  props: {
    variant: {
      type: String as PropType<Variant>,
      default: 'filled',
    },
    color: {
      type: String as PropType<Color>,
      default: 'primary',
    },
    size: {
      type: String as PropType<Size>,
      default: 'md',
    },
    rounded: {
      type: String as PropType<Rounded>,
      default: 'full',
    },
    dismissible: {
      type: Boolean,
      default: false,
    },
    prependIcon: {
      type: String,
      default: undefined,
    },
    appendIcon: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rainbowColors: {
      type: String,
      default: undefined,
    },
  },
  emits: ['dismiss'],
  setup(props, { slots, emit }) {
    const isRainbowBorder = props.variant === 'rainbow-border'

    const classes = computed(() => ({
      'tag': true,
      [`tag-${props.variant}`]: true,
      [`tag-color-${props.color}`]: true,
      [`tag-${props.size}`]: true,
      [`tag-rounded-${props.rounded}`]: true,
      'tag-disabled': props.disabled,
      'tag-dismissible': props.dismissible,
    }))

    const wrapperClasses = computed(() => ({
      'tag-rainbow-wrapper': isRainbowBorder,
    }))

    const gradientStyle = computed(() => {
      if (isRainbowBorder) {
        return {
          '--rainbow-colors': props.rainbowColors || 'var(--color-primary) 50%, var(--color-secondary) 50%',
        }
      }
      return {}
    })

    // Default icons for semantic colors
    const defaultPrependIcon = computed(() => {
      if (props.prependIcon) return props.prependIcon
      if (slots['prepend-icon']) return undefined

      // Only show default icons for filled, outlined, and soft-outlined variants
      if (props.variant === 'soft') return undefined

      switch (props.color) {
        case 'success':
          return 'mdi:check-circle'
        case 'error':
          return 'mdi:close-circle'
        case 'warning':
          return 'mdi:alert-circle'
        case 'info':
          return 'mdi:information'
        default:
          return undefined
      }
    })

    const handleDismiss = (event: Event) => {
      if (!props.disabled) {
        emit('dismiss', event)
      }
    }

    // Icon size based on tag size
    const iconSize = computed(() => {
      const sizes: Record<Size, string> = {
        sm: '12px',
        md: '14px',
        lg: '16px',
      }
      return sizes[props.size]
    })

    return {
      classes,
      wrapperClasses,
      gradientStyle,
      isRainbowBorder,
      defaultPrependIcon,
      handleDismiss,
      iconSize,
    }
  },
  template: `
    <div v-if="isRainbowBorder" :class="wrapperClasses" :style="gradientStyle">
      <span :class="classes">
        <span v-if="$slots['prepend-icon'] || defaultPrependIcon || prependIcon" class="tag-icon tag-icon-prepend">
          <slot name="prepend-icon">
            <Icon v-if="defaultPrependIcon || prependIcon" :icon="defaultPrependIcon || prependIcon" :width="iconSize" :height="iconSize" />
          </slot>
        </span>
        <span class="tag-content">
          <slot />
        </span>
        <span v-if="$slots['append-icon'] || appendIcon" class="tag-icon tag-icon-append">
          <slot name="append-icon">
            <Icon v-if="appendIcon" :icon="appendIcon" :width="iconSize" :height="iconSize" />
          </slot>
        </span>
        <button
          v-if="dismissible"
          type="button"
          class="tag-dismiss"
          :disabled="disabled"
          @click="handleDismiss"
          aria-label="Dismiss tag"
        >
          <Icon icon="mdi:close" :width="iconSize" :height="iconSize" />
        </button>
      </span>
    </div>
    <span v-else :class="classes">
      <span v-if="$slots['prepend-icon'] || defaultPrependIcon || prependIcon" class="tag-icon tag-icon-prepend">
        <slot name="prepend-icon">
          <Icon v-if="defaultPrependIcon || prependIcon" :icon="defaultPrependIcon || prependIcon" :width="iconSize" :height="iconSize" />
        </slot>
      </span>
      <span class="tag-content">
        <slot />
      </span>
      <span v-if="$slots['append-icon'] || appendIcon" class="tag-icon tag-icon-append">
        <slot name="append-icon">
          <Icon v-if="appendIcon" :icon="appendIcon" :width="iconSize" :height="iconSize" />
        </slot>
      </span>
      <button
        v-if="dismissible"
        type="button"
        class="tag-dismiss"
        :disabled="disabled"
        @click="handleDismiss"
        aria-label="Dismiss tag"
      >
        <Icon icon="mdi:close" :width="iconSize" :height="iconSize" />
      </button>
    </span>
  `,
})

export { Tag }

export interface TagProps {
  variant?: Variant
  color?: Color
  size?: Size
  rounded?: Rounded
  dismissible?: boolean
  prependIcon?: string
  appendIcon?: string
  disabled?: boolean
  rainbowColors?: string
}

export type { Variant, Color, Size, Rounded }
