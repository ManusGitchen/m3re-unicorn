# components/ - Vue Components

## Component Architecture

### File Organization
Each component has two files:
- `[component].ts` - Vue component definition
- `[component].css` - Component styles

### Component Pattern
```typescript
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'

const Component = defineComponent({
  name: 'ComponentName',
  props: {
    // Typed props with PropType or type assertions
  },
  setup(props, { slots, attrs }) {
    // Composition API logic
    // Computed classes, reactive state
    return { /* exposed */ }
  },
  template: `...`, // Inline template string
})

export { Component }
export interface ComponentProps { /* ... */ }
export type { /* Type exports */ }
```

### Components

#### Button (`button.ts`)
- **Props**: `variant` (primary/secondary/danger), `size` (sm/md/lg), `disabled`
- **Classes**: Dynamic class binding with computed properties
- **Styling**: `button.css` with BEM-like classes (`btn`, `btn-{variant}`, `btn-{size}`)

#### Card (`card.ts`)
- **Props**: `variant`, `title`, `subtitle`, `imagePosition`, `aspectRatio`, `rainbowBorder`, `rainbowColors`, `rainbowAccent`
- **Slots**: `image`, `title`, `subtitle`, `default`, `actions`
- **Features**:
  - Flexible image positioning (top/bottom/left/right)
  - Rainbow border gradient wrapper for outlined variant
  - Custom aspect ratio for images
  - Theme variants (default/elevated/outlined/transparent/semantic colors)
- **Styling**: `card.css` with layout system and rainbow border effects
