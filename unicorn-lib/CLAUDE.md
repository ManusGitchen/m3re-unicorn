# unicorn-lib - Vue 3 Component Library

## Package Structure

```
unicorn-lib/
├── src/
│   ├── components/          # Vue components
│   │   ├── button.ts       # Button component
│   │   ├── button.css
│   │   ├── card.ts         # Card component
│   │   └── card.css
│   ├── tokens/             # Design tokens
│   │   ├── colors.ts       # Color system & theming
│   │   ├── colors.css
│   │   ├── typography.ts   # Typography tokens
│   │   └── typography.css
│   ├── index.ts            # Main entry point
│   └── styles.css          # Global styles & imports
├── tests/
│   └── index.test.ts       # Test suite
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tsdown.config.ts
└── index.html              # Dev preview
```

## Architecture

### Component System
- **Framework**: Vue 3 with `defineComponent`
- **Props**: Typed with `PropType` or type assertions
- **Templates**: Inline template strings (no SFC)
- **Styling**: Separate CSS files, BEM-like naming

### Design Token System
- **Colors**: Programmatic generation with `adjustColor()` utility
  - Primary/Secondary color variations (base, light, dark)
  - Semantic colors (success, error, warning, info)
  - Theme system (light/dark) with CSS variables
  - Border widths, radius, styles
- **Typography**: Figma-extracted tokens
  - Font families, weights, sizes, line heights, letter spacing
  - Predefined typography styles

### Build Configuration
- **Bundler**: Vite Plus with tsdown
- **Output**:
  - Main: `./dist/index.mjs` (ESM)
  - Types: `./dist/index.d.mts`
  - CSS: `./src/tokens/typography.css` (exported separately)
- **External**: Vue 3 (peer dependency)
- **DTS**: Rollup-based type generation

### Export Structure
From `index.ts`:
- Components: `Button`, `Card` (with prop types)
- Typography tokens: All font/text-related exports
- Color tokens: All color/theme-related exports
- Global styles via `styles.css` import

### Styling Architecture
- CSS entry point: `src/styles.css`
- CSS imports chain: tokens → components
- CSS custom properties for theming
- Theme switching via `[data-theme="dark"]`

### Scripts
- `build`: Package build with Vite Plus
- `dev`: Watch mode for development
- `test`: Vitest test runner
- `typecheck`: TypeScript validation
- `prepublishOnly`: Auto-build before publish
