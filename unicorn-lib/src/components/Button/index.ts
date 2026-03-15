import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'

type Variant = 'primary' | 'secondary' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const Button = defineComponent({
    name: 'Button',
    props: {
        variant: {
            type: String as PropType<Variant>,
            default: 'primary',
        },
        size: {
            type: String as PropType<Size>,
            default: 'md',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { slots, attrs }) {
        const classes = computed(() => ({
            'btn': true,
            [`btn-${props.variant}`]: true,
            [`btn-${props.size}`]: true,
            'btn-disabled': props.disabled,
        }))

        return {
            classes,
        }
    },
    template: `
    <button :class="classes" :disabled="disabled" v-bind="$attrs">
      <slot />
    </button>
  `,
})

export { Button }

export interface ButtonProps {
    variant?: Variant
    size?: Size
    disabled?: boolean
}

export type { Variant, Size }
