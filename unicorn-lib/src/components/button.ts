import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'link' | 'rainbow-border'
type Color = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'full'

const Button = defineComponent({
    name: 'Button',
    props: {
        variant: {
            type: String as PropType<Variant>,
            default: 'primary',
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
            default: 'sm',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: false,
        },
        block: {
            type: Boolean,
            default: false,
        },
        href: {
            type: String,
            default: undefined,
        },
        to: {
            type: [String, Object],
            default: undefined,
        },
        type: {
            type: String as PropType<'button' | 'submit' | 'reset'>,
            default: 'button',
        },
        rainbowColors: {
            type: String,
            default: undefined,
        },
    },
    setup(props, { slots, attrs }) {
        const isRainbowBorder = props.variant === 'rainbow-border'

        const classes = computed(() => ({
            'btn': true,
            [`btn-${props.variant}`]: true,
            [`btn-color-${props.color}`]: true,
            [`btn-${props.size}`]: true,
            [`btn-rounded-${props.rounded}`]: true,
            'btn-disabled': props.disabled,
            'btn-loading': props.loading,
            'btn-active': props.active,
            'btn-block': props.block,
        }))

        const wrapperClasses = computed(() => ({
            'btn-rainbow-wrapper': isRainbowBorder,
        }))

        const gradientStyle = computed(() => {
            if (isRainbowBorder) {
                return {
                    '--rainbow-colors': props.rainbowColors || 'var(--color-primary) 50%, var(--color-secondary) 50%',
                }
            }
            return {}
        })

        const componentTag = computed(() => {
            if (props.href) return 'a'
            if (props.to) return 'router-link'
            return 'button'
        })

        const componentProps = computed(() => {
            const baseProps: Record<string, any> = {
                class: classes.value,
                disabled: props.disabled || props.loading,
            }

            if (props.href) {
                baseProps.href = props.href
            } else if (props.to) {
                baseProps.to = props.to
            } else {
                baseProps.type = props.type
            }

            return baseProps
        })

        return {
            classes,
            wrapperClasses,
            gradientStyle,
            componentTag,
            componentProps,
            isRainbowBorder,
        }
    },
    template: `
    <div v-if="isRainbowBorder" :class="wrapperClasses" :style="gradientStyle">
      <component :is="componentTag" v-bind="{ ...componentProps, ...$attrs }">
        <span v-if="loading" class="btn-spinner" aria-hidden="true"></span>
        <span v-else-if="$slots.default" :class="{ 'btn-content-hidden': loading }">
          <slot />
        </span>
      </component>
    </div>
    <component v-else :is="componentTag" v-bind="{ ...componentProps, ...$attrs }">
      <span v-if="loading" class="btn-spinner" aria-hidden="true"></span>
      <span v-else-if="$slots.default" :class="{ 'btn-content-hidden': loading }">
        <slot />
      </span>
    </component>
  `,
})

export { Button }

export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'rainbow-border'
    color?: 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info'
    size?: Size
    rounded?: Rounded
    disabled?: boolean
    loading?: boolean
    active?: boolean
    block?: boolean
    href?: string
    to?: string | object
    type?: 'button' | 'submit' | 'reset'
    rainbowColors?: string
}

export type { Variant, Color, Size, Rounded }
