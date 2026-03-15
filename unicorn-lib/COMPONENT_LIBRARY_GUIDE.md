# Vue 3 Component Library Setup Guide

Welcome to the Unicorn component library! This is a modern Vue 3.5.30 component library built with VitePlus and TypeScript.

## 🚀 Quick Start

### Installation
```bash
# Install dependencies
npm install
```

### Development
```bash
# Watch mode (rebuilds on file changes)
npm run dev

# Run tests
npm run test

# Type check
npm run typecheck
```

### Building
```bash
# Build the library for production
npm run build

# This creates:
# - dist/index.mjs (ESM bundle)
# - dist/index.d.mts (TypeScript types)
```

## 📦 Project Structure

```
unicorn-lib/
├── src/
│   ├── components/              # Vue components
│   │   ├── Button/
│   │   │   └── index.ts         # Component definition
│   │   └── Card/
│   │       └── index.ts
│   ├── index.ts                 # Main library export
│   └── demo.ts                  # Demo app
├── dist/                        # Build output (generated)
├── package.json                 # Package metadata
├── vite.config.ts               # Vite configuration
├── tsdown.config.ts             # Build configuration
├── tsconfig.json                # TypeScript configuration
└── README.md
```

## 🛠️ Writing Components

Components are written using Vue 3's `defineComponent` with TypeScript:

### Basic Button Component Example

```typescript
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'

type Variant = 'primary' | 'secondary'

const Button = defineComponent({
  name: 'Button',
  props: {
    variant: {
      type: String as PropType<Variant>,
      default: 'primary',
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
      'btn-disabled': props.disabled,
    }))

    return { classes }
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
  disabled?: boolean
}
```

## 📝 Architecture Details

### Why TypeScript Components?

This library uses TypeScript-based Vue components (`defineComponent` with `template` strings) instead of Single File Components (.vue files) because:

1. **VitePlus Compatibility**: VitePlus's tsdown bundler is optimized for TypeScript packages
2. **Type Safety**: Full TypeScript integration without additional loaders
3. **Smaller Bundle**: Direct compilation without extra transformation steps
4. **Production Ready**: Well-supported pattern in Vue 3

### Component Best Practices

1. **Use Composition API Setup**
   ```typescript
   setup(props, { slots, attrs, emit }) {
     // Define reactive state, computed, methods here
     return { /* exposed values */ }
   }
   ```

2. **Type All Props**
   ```typescript
   props: {
     variant: { type: String as PropType<'primary' | 'secondary'>, default: 'primary' }
   }
   ```

3. **Export Type Interfaces**
   ```typescript
   export interface ButtonProps { variant?: 'primary' | 'secondary' }
   ```

4. **Document Props with JSDoc** (optional)
   ```typescript
   /**
    * The button variant
    * @default 'primary'
    */
   variant?: Variant
   ```

## 📦 Publishing to npm

When ready to publish:

1. **Update metadata** in `package.json`:
   ```json
   {
     "name": "@ManusGitchen/m3re-unicorn/unicorn-lib",
     "description": "Vue 3 component library",
     "repository": "https://github.com/ManusGitchen/m3re-unicorn/unicorn-lib",

     "private": false
   }
   ```

2. **Build and publish**:
   ```bash
   npm run build
   npm publish
   ```

   The `prepublishOnly` script automatically runs the build before publishing.

## 🎯 Key Configuration Files

### `tsdown.config.ts`
Configures the build process:
- Sets Vue as external dependency (not bundled)
- Enables type generation with rollupTypes
- Configures exports

### `vite.config.ts`
- Loads Vite plugin for Vue support
- Integrates with VitePlus build system

### `tsconfig.json`
- Strict TypeScript mode enabled
- DOM lib included for Vue types
- Proper module resolution

## 🔄 Component Lifecycle

All components support Vue 3's lifecycle hooks:

```typescript
defineComponent({
  setup() {
    onMounted(() => { /* ... */ })
    onUpdated(() => { /* ... */ })
    onBeforeUnmount(() => { /* ... */ })
  }
})
```

## 📚 Dependencies

- **Vue 3.5.30**: UI framework (peerDependency)
- **TypeScript 5.9.3**: Type safety
- **VitePlus**: Build optimization
- **Vitest**: Testing framework

## 🆘 Troubleshooting

### Build fails with import errors
- Ensure components are exported in `src/index.ts`
- Check that component files use `.ts` extension (not `.vue`)

### TypeScript errors with Vue
- Verify `tsconfig.json` includes DOM types: `"lib": ["es2023", "dom"]`
- Restart TypeScript server in your editor

### CSS not bundled
- Currently, styles should be in external CSS or CSS-in-JS
- Import/include CSS in consuming applications

## 🚀 Next Steps

1. **Add more components** in `src/components/`
2. **Update demo** in `src/demo.ts` to showcase new components
3. **Add tests** in `tests/` directory
4. **Document components** with JSDoc comments
5. **Set up GitHub Pages** for component documentation
6. **Publish to npm** when ready

## 📖 Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [VitePlus Guide](https://viteplus.dev/)
- [Vite Documentation](https://vitejs.dev/)

---

**Happy component building! 🦄**
