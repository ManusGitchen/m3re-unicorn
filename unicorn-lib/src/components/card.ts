import { defineComponent } from 'vue'

type Variant = 'default' | 'elevated' | 'outlined'

const Card = defineComponent({
    name: 'Card',
    props: {
        variant: {
            type: String as () => Variant,
            default: 'default',
        },
    },
    setup(props, { slots, attrs }) {
        const classes = {
            'card': true,
            [`card-${props.variant}`]: true,
        }

        return { classes }
    },
    template: `
    <div :class="classes" v-bind="$attrs">
      <slot />
    </div>
  `,
})

export { Card }

export interface CardProps {
    variant?: Variant
}

export type { Variant }
