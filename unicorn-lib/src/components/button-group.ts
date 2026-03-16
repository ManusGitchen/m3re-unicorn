import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'

type Orientation = 'horizontal' | 'vertical'

const ButtonGroup = defineComponent({
    name: 'ButtonGroup',
    props: {
        orientation: {
            type: String as PropType<Orientation>,
            default: 'horizontal',
        },
        block: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const classes = computed(() => ({
            'btn-group': true,
            [`btn-group-${props.orientation}`]: true,
            'btn-group-block': props.block,
        }))

        return {
            classes,
        }
    },
    template: `
    <div :class="classes" role="group">
      <slot />
    </div>
  `,
})

export { ButtonGroup }

export interface ButtonGroupProps {
    orientation?: 'horizontal' | 'vertical'
    block?: boolean
}

export type { Orientation }
