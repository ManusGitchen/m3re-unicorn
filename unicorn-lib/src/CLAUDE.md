# src/ - Source Code

## Structure

```
src/
├── components/          # Vue components
├── tokens/             # Design tokens (colors, typography)
├── index.ts            # Package entry point
└── styles.css          # Global styles
```

## Entry Point (`index.ts`)

Exports:
- All components with their TypeScript interfaces
- All design tokens (colors, typography)
- Imports global styles

## Global Styles (`styles.css`)

Import chain:
1. Design tokens (colors, typography CSS)
2. Component styles
3. Global resets and base styles
4. Theme-aware body/typography styles
