# Unicorn Vue 3 Component Library

A modern, type-safe Vue 3 component library built with TypeScript and optimized with VitePlus.

## ✨ Features

- **Vue 3.5.30** - Latest Vue 3 stable version
- **TypeScript** - Full type safety with strict mode
- **Tree-shakeable** - Only import what you use
- **ESM Bundle** - Modern ES modules format
- **Zero Runtime** - No unnecessary abstractions
- **Small Bundle** - ~1KB gzipped core

## 📦 Installation

Using npm:
```bash
npm install @your-org/unicorn vue@^3.5.30
```

Using pnpm:
```bash
pnpm add @your-org/unicorn vue@^3.5.30
```

Using yarn:
```bash
yarn add @your-org/unicorn vue@^3.5.30
```

## 🚀 Quick Start

### Basic Usage

```vue
<template>
  <div>
    <Button variant="primary" size="lg">
      Click Me
    </Button>
    
    <Card variant="elevated">
      <h3>Card Title</h3>
      <p>Card content goes here</p>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Button, Card } from '@your-org/unicorn'
</script>
```

### With TypeScript

```ts
import { Button, type ButtonProps } from '@your-org/unicorn'

const props: ButtonProps = {
  variant: 'primary',
  size: 'md',
  disabled: false
}
```

## 📚 Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Button` | `variant`, `size`, `disabled` | Customizable button component |
| `Card` | `variant` | Container component with variants |

### Button Component

```vue
<Button 
  variant="primary"    <!-- 'primary' \| 'secondary' \| 'danger' -->
  size="md"           <!-- 'sm' \| 'md' \| 'lg' -->
  disabled            <!-- boolean (optional) -->
  @click="handleClick"
>
  Button Text
</Button>
```

**Variants:** `primary` (default), `secondary`, `danger`  
**Sizes:** `sm`, `md` (default), `lg`

### Card Component

```vue
<Card variant="default">  <!-- 'default' | 'elevated' | 'outlined' -->
  Your content here
</Card>
```

**Variants:** `default`, `elevated`, `outlined`

## 🎨 Styling

Components use inline styles and scoped CSS. Customize by:

1. **CSS Variables** (recommended):
```css
:root {
  --btn-primary-bg: #3b82f6;
  --btn-primary-hover: #2563eb;
}
```

2. **Override with classes**:
```vue
<Button class="my-custom-button">Text</Button>
```

## 📖 Documentation

Full documentation: [docs link coming soon]

## 🧪 Development

### Install dependencies
```bash
npm install
```

### Development mode
```bash
npm run dev      # Watch mode rebuild
```

### Build
```bash
npm run build    # Production build
```

### Testing
```bash
npm run test     # Run tests
npm run typecheck # Type checking
```

## 🔧 Configuration

### TypeScript

If using TypeScript in your project, the library includes `.d.mts` type definitions automatically.

### Vue 3 Setup

Make sure your project has Vue 3.5.30+ installed:

```json
{
  "devDependencies": {
    "vue": "^3.5.30"
  }
}
```

## 📋 Requirements

- **Vue:** ^3.5.30
- **Node:** ^16 (for development)
- **Package Manager:** npm, yarn, or pnpm

## 🐛 Known Issues

- None currently. Report issues on [GitHub Issues](https://github.com/your-org/unicorn-lib/issues)

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## 🤝 Contributing

Contributions welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🔗 Links

- **GitHub:** https://github.com/your-org/unicorn-lib
- **npm:** https://www.npmjs.com/package/@your-org/unicorn
- **Issues:** https://github.com/your-org/unicorn-lib/issues
- **Discussions:** https://github.com/your-org/unicorn-lib/discussions

---

Built with ❤️ using Vue 3 & TypeScript
