import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import { Icon } from '@iconify/vue'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'link' | 'rainbow-border'
type Color = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'full'

const Button = defineComponent({
    name: 'Button',
    components: {
        Icon,
    },
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
        icon: {
            type: String,
            default: undefined,
        },
        iconLeft: {
            type: String,
            default: undefined,
        },
        iconRight: {
            type: String,
            default: undefined,
        },
        rainbowColors: {
            type: String,
            default: undefined,
        },
        glass: {
            type: Boolean,
            default: false,
        },
        glassShiny: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { slots, attrs }) {
        const isRainbowBorder = props.variant === 'rainbow-border'

        // Determine if button is icon-only
        const isIconOnly = computed(() => {
            const hasIcon = !!(props.icon || props.iconLeft || props.iconRight || slots['icon-left'] || slots['icon-right'])
            const hasText = !!(slots.default)
            return hasIcon && !hasText
        })

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
            'btn-icon-only': isIconOnly.value,
            'btn-glass': props.glass && !props.glassShiny,
            'btn-glass-shiny': props.glassShiny,
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

        // Icon size based on button size
        const iconSize = computed(() => {
            const sizes: Record<Size, string> = {
                xs: '14px',
                sm: '16px',
                md: '20px',
                lg: '24px',
                xl: '28px',
            }
            return sizes[props.size]
        })

        return {
            classes,
            wrapperClasses,
            gradientStyle,
            componentTag,
            componentProps,
            isRainbowBorder,
            isIconOnly,
            iconSize,
        }
    },
    template: `
    <div v-if="isRainbowBorder" :class="wrapperClasses" :style="gradientStyle">
      <component :is="componentTag" v-bind="{ ...componentProps, ...$attrs }">
        <span v-if="loading" class="btn-spinner" aria-hidden="true"></span>
        <template v-else>
          <span v-if="$slots['icon-left'] || iconLeft" class="btn-icon btn-icon-left">
            <slot name="icon-left">
              <Icon v-if="iconLeft" :icon="iconLeft" :width="iconSize" :height="iconSize" />
            </slot>
          </span>
          <span v-if="icon && !iconLeft && !iconRight" class="btn-icon">
            <Icon :icon="icon" :width="iconSize" :height="iconSize" />
          </span>
          <span v-if="$slots.default" class="btn-content">
            <slot />
          </span>
          <span v-if="$slots['icon-right'] || iconRight" class="btn-icon btn-icon-right">
            <slot name="icon-right">
              <Icon v-if="iconRight" :icon="iconRight" :width="iconSize" :height="iconSize" />
            </slot>
          </span>
        </template>
      </component>
    </div>
    <component v-else :is="componentTag" v-bind="{ ...componentProps, ...$attrs }">
      <span v-if="loading" class="btn-spinner" aria-hidden="true"></span>
      <template v-else>
        <span v-if="$slots['icon-left'] || iconLeft" class="btn-icon btn-icon-left">
          <slot name="icon-left">
            <Icon v-if="iconLeft" :icon="iconLeft" :width="iconSize" :height="iconSize" />
          </slot>
        </span>
        <span v-if="icon && !iconLeft && !iconRight" class="btn-icon">
          <Icon :icon="icon" :width="iconSize" :height="iconSize" />
        </span>
        <span v-if="$slots.default" class="btn-content">
          <slot />
        </span>
        <span v-if="$slots['icon-right'] || iconRight" class="btn-icon btn-icon-right">
          <slot name="icon-right">
            <Icon v-if="iconRight" :icon="iconRight" :width="iconSize" :height="iconSize" />
          </slot>
        </span>
      </template>
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
    icon?: string
    iconLeft?: string
    iconRight?: string
    rainbowColors?: string
    glass?: boolean
    glassShiny?: boolean
}

export type { Variant, Color, Size, Rounded }
