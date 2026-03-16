# m3re-unicorn Project

## Project Structure

This is a monorepo containing a Vue 3 component library.

```
m3re-unicorn/
├── unicorn-lib/          # Vue 3 component library package
└── README.md
```

## Architecture Overview

### Technology Stack
- **Framework**: Vue 3 with Composition API
- **Build System**: Vite Plus
- **Language**: TypeScript (ES2023, DOM, strict mode)
- **Package Manager**: npm 11.11.1
- **Node**: >=18.0.0

### Module System
- Type: ES Modules (`"type": "module"`)
- Module Resolution: Bundler
- JSX: Preserved (Vue SFC handling)

### Path Aliases
- `@/*` → `src/*`

### Git
- Main branch: `main`
- Current status: Clean working directory
