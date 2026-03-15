# Unicorn Library Setup Plan

## Overview
Building a modern TypeScript/Vue 3.5.30 component library using VitePlus following best practices from:
- https://viteplus.dev/guide/create
- Vue 3 Composition API + TypeScript patterns

## Current Status ✅
- ✅ Project scaffolded with `vp create vite:library`
- ✅ VitePlus configured with modern build setup
- ✅ TypeScript configured for Vue 3
- ✅ Vue 3.5.30 installed as peerDependency
- ✅ @vitejs/plugin-vue configured
- ✅ Package.json already has proper exports & types configuration
- ✅ Build successful with optimized tsdown bundler (tsgo disabled for Vue support)

## Architecture Goals
- **Tree-shakeable entries** - Each component is independently importable
- **Scoped styles** - Components with scoped CSS prevent style conflicts
- **Type-safe** - Full TypeScript support with Vue 3 DefineComponent types
- **Modern outputs** - ESM format only (tsdown handles optimization)
- **Vue 3 Composition API** - Modern Vue 3 patterns with setup function

## Key Features Implemented by VitePlus

### Package.json  
- ✅ `exports` field with conditional exports
- ✅ `types` pointing to `.d.mts` files  
- ✅ `files` limiting published content to `/dist`
- ✅ Proper entry points configuration

### Build System
- ✅ `vp pack` command (custom Vite + tsdown)
- ✅ tsdown for optimal bundling
- ✅ TypeScript strict mode
- ✅ Type declaration generation

## Setup Steps

### 1. Fix Build Warning
- Disable `tsgo` experimental feature in `tsdown.config.ts` temporarily if issues arise
- Current setup works, just has warning

### 2. Create Component Structure ✅
```
src/
├── index.ts              # Main entry point (exports all components)
├── components/
│   ├── Button/
│   │   └── index.ts      # Vue component with TypeScript
│   ├── Card/
│   │   └── index.ts      # Vue component with TypeScript
│   └── [more components]
├── types/
│   └── common.ts         # Shared types
└── demo.ts               # Demo application

tests/
├── components.test.ts
└── integration.test.ts
```

### 3. Add Vue 3 & Styling ✅
**Install dependencies:**
```bash
npm install -D vue@^3.5.30 @vitejs/plugin-vue@^5.2.0
```

**Configure as peer dependencies:** ✅
- Vue 3 is `peerDependencies` (not bundled)
- Added to `devDependencies` for development
- tsdown.config.ts marks Vue as external

### 4. Component Writing Strategy ✅
**TypeScript-based Vue Components:**
```typescript
import { defineComponent, computed } from 'vue'

const Button = defineComponent({
  name: 'Button',
  props: { variant: { type: String, default: 'primary' } },
  setup(props) {
    const classes = computed(() => ({ [`btn-${props.variant}`]: true }))
    return { classes }
  },
  template: `<button :class="classes"><slot /></button>`,
})
```

**Styling Approach:**
- Inline styles or external CSS
- Can use CSS modules or CSS-in-JS
- Scoped styles via Vue template binding
- Result: CSS tree-shaking works automatically

### 5. Configure Entry Points ✅
- `./` → main export (`dist/index.mjs`) - exports all components
- Type definitions automatically generated (`dist/index.d.mts`)
- Future: `./types` → type utils (`dist/types.mjs`)
- Future: `./*/` → subpath exports per component (optional)

### 6. Demo Page ✅
- `src/demo.ts` with demo Vue app
- `index.html` for demo page
- Import from main entry: `import { Button } from '../components/Button'`
- Run `npm run dev` to preview locally

### 7. Publishing
- Update `package.json` metadata (name, description, repo URL)
- Update `peerDependencies` to specify Vue 3 version range
- Set `private: false` for npm publication
- `npm run prepublishOnly` runs build automatically before publish

## Build Output Structure ✅
```
dist/
├── index.mjs       # Main bundle (1.04 kB gzipped)
└── index.d.mts     # Type definitions (1.86 kB gzipped)
```

## Vue 3 Setup with VitePlus

| Feature | Status | Details |
|---------|--------|----------|
| **Vue 3.5.30** | ✅ | Latest stable version, peerDependency |
| **TypeScript** | ✅ | Strict mode enabled with DefineComponent |
| **Build Tool** | ✅ | `vp pack` (tsdown) - optimized bundler |
| **Type Generation** | ✅ | Automatic `.d.mts` generation |
| **External Deps** | ✅ | Vue marked external (not bundled) |
| **Tree-shaking** | ✅ | Native support |
| **Demo App** | ✅ | Vue app in src/demo.ts |

## Next Steps

1. ✅ Install Vue 3.5.30 and @vitejs/plugin-vue
2. ✅ Configure tsdown for Vue (disable tsgo)
3. ✅ Create component structure (src/components/)
4. ✅ Create Button and Card components
5. ✅ Export components from index.ts
6. ✅ Test build output (successful)
7. ✅ Create demo app
8. → Add more components (Alert, Input, Dropdown, etc.)
9. → Write component tests with Vitest
10. → Publish to npm

## Documentation
- **COMPONENT_LIBRARY_GUIDE.md** - Complete guide for writing components
- **LIBRARY_SETUP_PLAN.md** - This architecture plan

## Resources
- VitePlus Docs: https://viteplus.dev
- Vue 3 Guide: https://vuejs.org/guide/
- TypeScript with Vue: https://vuejs.org/guide/typescript/
- Tsdown Docs: https://github.com/egoist/tsdown (bundler used internally)
