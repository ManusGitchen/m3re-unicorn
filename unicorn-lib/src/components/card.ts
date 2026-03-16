import { defineComponent } from 'vue'

type Variant = 'default' | 'elevated' | 'outlined' | 'transparent' | 'success' | 'warning' | 'error' | 'info'
type ImagePosition = 'top' | 'bottom' | 'left' | 'right'
type RainbowAccent = 'top' | 'right' | 'bottom' | 'left'

const Card = defineComponent({
    name: 'Card',
    props: {
        variant: {
            type: String as () => Variant,
            default: 'default',
        },
        title: {
            type: String,
            default: undefined,
        },
        subtitle: {
            type: String,
            default: undefined,
        },
        imagePosition: {
            type: String as () => ImagePosition,
            default: 'top',
        },
        aspectRatio: {
            type: String,
            default: undefined,
        },
        rainbowBorder: {
            type: Boolean,
            default: false,
        },
        rainbowColors: {
            type: String,
            default: undefined,
        },
        rainbowAccent: {
            type: String as () => RainbowAccent,
            default: undefined,
        },
    },
    setup(props, { slots }) {
        const classes = {
            'card': true,
            [`card-${props.variant}`]: true,
            [`card-image-${props.imagePosition}`]: !!slots.image,
        }

        const wrapperClasses = {
            'card-rainbow-wrapper': props.rainbowBorder && props.variant === 'outlined',
            [`card-rainbow-accent-${props.rainbowAccent}`]: props.rainbowBorder && props.variant === 'outlined' && props.rainbowAccent,
        }

        const gradientStyle = props.rainbowBorder && props.variant === 'outlined' ? {
            '--rainbow-colors': props.rainbowColors || 'var(--color-primary) 50%, var(--color-secondary) 50%',
        } : {}

        return { classes, wrapperClasses, gradientStyle }
    },
    template: `
    <div :class="wrapperClasses" :style="gradientStyle">
      <div :class="classes" v-bind="$attrs">
        <div v-if="$slots.image" class="card-image" :style="aspectRatio ? { aspectRatio } : {}">
          <slot name="image" />
        </div>

        <div class="card-content">
          <h2 v-if="title || $slots.title" class="card-title">
            <slot name="title">{{ title }}</slot>
          </h2>

          <h3 v-if="subtitle || $slots.subtitle" class="card-subtitle">
            <slot name="subtitle">{{ subtitle }}</slot>
          </h3>

          <div v-if="$slots.default" class="card-body">
            <slot />
          </div>
        </div>

        <div v-if="$slots.actions" class="card-actions">
          <slot name="actions" />
        </div>
      </div>
    </div>
  `,
})

export { Card }

export interface CardProps {
    variant?: Variant
    title?: string
    subtitle?: string
    imagePosition?: ImagePosition
    aspectRatio?: string
    rainbowBorder?: boolean
    rainbowColors?: string
    rainbowAccent?: RainbowAccent
}

export type { Variant, ImagePosition, RainbowAccent }
