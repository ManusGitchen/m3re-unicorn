import { defineComponent } from 'vue'

type Variant = 'default' | 'elevated' | 'outlined' | 'transparent' | 'success' | 'warning' | 'error' | 'info'
type ImagePosition = 'top' | 'bottom' | 'left' | 'right'

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
    },
    setup(props, { slots }) {
        const classes = {
            'card': true,
            [`card-${props.variant}`]: true,
            [`card-image-${props.imagePosition}`]: !!slots.image,
        }

        return { classes }
    },
    template: `
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
  `,
})

export { Card }

export interface CardProps {
    variant?: Variant
    title?: string
    subtitle?: string
    imagePosition?: ImagePosition
    aspectRatio?: string
}

export type { Variant, ImagePosition }
